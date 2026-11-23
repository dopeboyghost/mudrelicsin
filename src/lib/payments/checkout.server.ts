import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { env } from "@/lib/env.server";
import { hashToken, quoteRelics, readMoneyEnv, tokensMatch, type Line } from "./money";
import { blocking, holdRelic, markPaid, markRefunded, parseItems, releaseHolds, rememberEvent } from "./stock";

function hmacHex(secret: string, payload: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function hexMatch(expected: string, actual: string) {
  try {
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(actual, "hex");
    return a.length === b.length && a.length > 0 && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function paymentSignatureValid(orderId: string, paymentId: string, signature: string, secret: string) {
  return hexMatch(hmacHex(secret, `${orderId}|${paymentId}`), signature);
}

function webhookSignatureValid(body: string, signature: string, secret: string) {
  return hexMatch(hmacHex(secret, body), signature);
}

const customerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(8).max(20),
  address: z.string().trim().min(5).max(200),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2).max(60),
  pin: z.string().trim().min(4).max(10),
  country: z.string().trim().min(2).max(56).default("India"),
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function keys() {
  const keyId = env("RAZORPAY_KEY_ID") || env("VITE_RAZORPAY_KEY_ID") || env("NEXT_PUBLIC_RAZORPAY_KEY_ID");
  const keySecret = env("RAZORPAY_KEY_SECRET");
  const webhookSecret = env("RAZORPAY_WEBHOOK_SECRET");
  return { keyId, keySecret, webhookSecret, configured: Boolean(keyId && keySecret) };
}

function moneyEnv() {
  return readMoneyEnv({
    SHIPPING_INR: env("SHIPPING_INR"),
    TAX_BPS: env("TAX_BPS"),
  });
}

function phoneOk(phone: string, country: string) {
  const digits = phone.replace(/\D/g, "");
  if (country.toLowerCase() === "india") return digits.length === 10 || (digits.length === 12 && digits.startsWith("91"));
  return digits.length >= 8 && digits.length <= 15;
}

function pinOk(pin: string, country: string) {
  if (country.toLowerCase() === "india") return /^\d{6}$/.test(pin);
  return /^[a-zA-Z0-9 -]{4,10}$/.test(pin);
}

export async function handleStock(request: Request) {
  const ids = (new URL(request.url).searchParams.get("ids") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter((id) => /^\d{3}$/.test(id))
    .slice(0, 40);
  try {
    const sql = await getSql();
    const state = await blocking(sql, ids);
    return json(state);
  } catch (error) {
    console.error("[stock]", error instanceof Error ? error.message : "failed");
    return json({ sold: [], held: [], error: "unavailable" }, 503);
  }
}

export async function handleCheckout(request: Request) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  const action = typeof body === "object" && body && "action" in body ? String((body as { action: unknown }).action) : "";
  try {
    if (action === "quote") return await quote(body);
    if (action === "create") return await create(body);
    if (action === "verify") return await verify(body);
    if (action === "cancel") return await cancel(body);
    if (action === "read") return await read(body);
    return json({ error: "Unknown action." }, 400);
  } catch (error) {
    console.error("[checkout]", action, error instanceof Error ? error.message : "failed");
    return json({ error: "The archive could not complete that." }, 500);
  }
}

async function quote(body: unknown) {
  const parsed = z.object({ ids: z.array(z.string()).max(12) }).safeParse(body);
  if (!parsed.success) return json({ error: "Invalid cart." }, 400);
  const money = moneyEnv();
  if (!money.ok) return json({ error: money.error }, 500);
  const quoted = quoteRelics(parsed.data.ids, money.shippingPaise, money.taxBps);
  const sql = await getSql();
  const live = quoted.ok ? await blocking(sql, quoted.quote.lines.map((line) => line.id)) : { sold: [], held: [] };
  const blocked = [...live.sold, ...live.held];
  if (quoted.ok && blocked.length) {
    return json({ error: "One of these pieces is already held.", unavailable: blocked, paymentsConfigured: keys().configured }, 409);
  }
  return json({
    paymentsConfigured: keys().configured,
    taxConfigured: money.ok ? money.taxConfigured : false,
    ...(quoted.ok ? { quote: quoted.quote } : { error: quoted.error, unavailable: quoted.unavailable }),
  }, quoted.ok ? 200 : 409);
}

async function create(body: unknown) {
  const parsed = z.object({ ids: z.array(z.string()).max(12), customer: customerSchema }).safeParse(body);
  if (!parsed.success) return json({ error: "Check the shipping details." }, 400);
  const customer = parsed.data.customer;
  if (!phoneOk(customer.phone, customer.country) || !pinOk(customer.pin, customer.country)) {
    return json({ error: "Check the mobile number and PIN code." }, 400);
  }
  const creds = keys();
  if (!creds.configured || !creds.keyId || !creds.keySecret) {
    return json({ error: "Razorpay is not connected yet. No payment was taken.", code: "payments_not_configured" }, 503);
  }
  const money = moneyEnv();
  if (!money.ok) return json({ error: money.error }, 500);
  const quoted = quoteRelics(parsed.data.ids, money.shippingPaise, money.taxBps);
  if (!quoted.ok) return json({ error: quoted.error, unavailable: quoted.unavailable }, 409);

  const sql = await getSql();
  const orderId = `MR${randomBytes(5).toString("hex").toUpperCase()}`;
  const token = randomBytes(24).toString("hex");
  const held: string[] = [];
  try {
    await sql.query(
      `insert into orders (
         id, token_hash, customer_name, email, phone, address_line, city, state, pin, country,
         items, subtotal_paise, shipping_paise, tax_paise, amount_paise, currency, payment_status, order_status
       ) values (
         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
         $11::jsonb, $12, $13, $14, $15, 'INR', 'created', 'PAYMENT PENDING'
       )`,
      [
        orderId,
        hashToken(token),
        customer.name,
        customer.email,
        customer.phone,
        customer.address,
        customer.city,
        customer.state,
        customer.pin,
        customer.country,
        JSON.stringify(quoted.quote.lines),
        quoted.quote.subtotalPaise,
        quoted.quote.shippingPaise,
        quoted.quote.taxPaise,
        quoted.quote.amountPaise,
      ],
    );
    for (const line of quoted.quote.lines) {
      const ok = await holdRelic(sql, line.id, orderId);
      if (!ok) {
        await releaseHolds(sql, orderId);
        await sql.query(`update orders set order_status = 'CANCELLED', payment_status = 'cancelled' where id = $1`, [orderId]);
        return json({ error: `${line.name} is already held.`, unavailable: [line.id] }, 409);
      }
      held.push(line.id);
    }
    // Use the Worker's native fetch runtime. The Razorpay Node SDK relies on
    // Node HTTP APIs that can stall under Cloudflare Workers compatibility mode.
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        authorization: `Basic ${btoa(`${creds.keyId}:${creds.keySecret}`)}`,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        amount: quoted.quote.amountPaise,
        currency: "INR",
        receipt: orderId.slice(0, 40),
        notes: { mud_order: orderId },
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!razorpayResponse.ok) {
      throw new Error(`Razorpay order request failed (${razorpayResponse.status})`);
    }
    const remote = (await razorpayResponse.json()) as { id?: string };
    if (!remote.id) throw new Error("Razorpay order response did not include an ID.");
    await sql.query(`update orders set razorpay_order_id = $2, payment_status = 'created' where id = $1`, [orderId, remote.id]);
    return json({
      orderId,
      token,
      keyId: creds.keyId,
      razorpayOrderId: remote.id,
      amount: quoted.quote.amountPaise,
      currency: "INR",
      name: "MUD RELICS",
      description: quoted.quote.lines.map((line) => line.name).join(", ").slice(0, 200),
      prefill: { name: customer.name, email: customer.email, contact: customer.phone },
    });
  } catch (error) {
    await releaseHolds(sql, orderId).catch(() => undefined);
    await sql.query(`update orders set order_status = 'CANCELLED', payment_status = 'failed' where id = $1 and order_status = 'PAYMENT PENDING'`, [orderId]).catch(() => undefined);
    console.error("[checkout:create]", error instanceof Error ? error.message : "failed");
    return json({ error: "Razorpay did not open an order. Nothing was charged.", held }, 502);
  }
}

async function verify(body: unknown) {
  const parsed = z
    .object({
      orderId: z.string().min(4).max(40),
      token: z.string().min(16).max(80),
      razorpay_order_id: z.string().min(4).max(80),
      razorpay_payment_id: z.string().min(4).max(80),
      razorpay_signature: z.string().min(8).max(256),
    })
    .safeParse(body);
  if (!parsed.success) return json({ error: "Invalid payment response." }, 400);
  const creds = keys();
  if (!creds.keySecret) return json({ error: "Razorpay is not connected." }, 503);
  const sql = await getSql();
  const rows = await sql.query<{ id: string; token_hash: string; razorpay_order_id: string | null; amount_paise: number; order_status: string }>(
    `select id, token_hash, razorpay_order_id, amount_paise, order_status from orders where id = $1`,
    [parsed.data.orderId],
  );
  const order = rows[0];
  if (!order || !tokensMatch(parsed.data.token, order.token_hash)) return json({ error: "Order not found." }, 404);
  if (order.razorpay_order_id !== parsed.data.razorpay_order_id) return json({ error: "This payment does not match the order." }, 400);
  let signed = false;
  try {
    signed = paymentSignatureValid(parsed.data.razorpay_order_id, parsed.data.razorpay_payment_id, parsed.data.razorpay_signature, creds.keySecret);
  } catch {
    signed = false;
  }
  if (!signed) return json({ error: "Payment signature was rejected. The order is not paid." }, 400);
  const result = await markPaid(sql, {
    orderId: order.id,
    paymentId: parsed.data.razorpay_payment_id,
    amountPaise: Number(order.amount_paise),
  });
  if (!result.ok) return json({ error: "Payment could not be confirmed.", reason: result.reason, paid: false }, 409);
  return json({ paid: true, orderId: order.id, status: "PAID" });
}

async function cancel(body: unknown) {
  const parsed = z.object({ orderId: z.string().min(4).max(40), token: z.string().min(16).max(80) }).safeParse(body);
  if (!parsed.success) return json({ error: "Invalid request." }, 400);
  const sql = await getSql();
  const rows = await sql.query<{ token_hash: string; order_status: string }>(
    `select token_hash, order_status from orders where id = $1`,
    [parsed.data.orderId],
  );
  const order = rows[0];
  if (!order || !tokensMatch(parsed.data.token, order.token_hash)) return json({ error: "Order not found." }, 404);
  if (order.order_status === "PAID") return json({ error: "This order is already paid." }, 409);
  await releaseHolds(sql, parsed.data.orderId);
  await sql.query(
    `update orders set order_status = 'CANCELLED', payment_status = 'cancelled' where id = $1 and order_status = 'PAYMENT PENDING'`,
    [parsed.data.orderId],
  );
  return json({ cancelled: true });
}

async function read(body: unknown) {
  const parsed = z.object({ orderId: z.string().min(4).max(40), token: z.string().min(16).max(80) }).safeParse(body);
  if (!parsed.success) return json({ error: "This confirmation link is incomplete." }, 400);
  const sql = await getSql();
  const rows = await sql.query<{
    id: string;
    token_hash: string;
    razorpay_payment_id: string | null;
    customer_name: string;
    email: string;
    phone: string;
    address_line: string;
    city: string;
    state: string;
    pin: string;
    country: string;
    items: Line[] | string;
    subtotal_paise: number;
    shipping_paise: number;
    tax_paise: number;
    amount_paise: number;
    currency: string;
    payment_status: string;
    order_status: string;
    created_at: string | Date;
  }>(`select * from orders where id = $1`, [parsed.data.orderId]);
  const order = rows[0];
  if (!order || !tokensMatch(parsed.data.token, order.token_hash)) return json({ error: "Order not found." }, 404);
  return json({
    order: {
      id: order.id,
      paymentId: order.razorpay_payment_id,
      name: order.customer_name,
      email: order.email,
      phone: order.phone,
      address: order.address_line,
      city: order.city,
      state: order.state,
      pin: order.pin,
      country: order.country,
      items: parseItems(order.items),
      subtotalPaise: Number(order.subtotal_paise),
      shippingPaise: Number(order.shipping_paise),
      taxPaise: Number(order.tax_paise),
      amountPaise: Number(order.amount_paise),
      currency: order.currency,
      paymentStatus: order.payment_status,
      status: order.order_status,
      createdAt: new Date(order.created_at).toISOString(),
    },
  });
}

type WebhookPayment = {
  id?: string;
  order_id?: string;
  amount?: number;
  status?: string;
  notes?: { mud_order?: string };
};

export async function handleWebhook(request: Request) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  const secret = env("RAZORPAY_WEBHOOK_SECRET");
  if (!secret) return json({ error: "Webhook secret is not configured." }, 503);
  const raw = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  let valid = false;
  try {
    valid = webhookSignatureValid(raw, signature, secret);
  } catch {
    valid = false;
  }
  if (!valid) return json({ error: "Invalid webhook signature." }, 400);
  let event: { event?: string; payload?: { payment?: { entity?: WebhookPayment }; refund?: { entity?: { payment_id?: string } } } };
  try {
    event = JSON.parse(raw) as typeof event;
  } catch {
    return json({ error: "Invalid webhook body." }, 400);
  }
  const type = event.event ?? "unknown";
  const payment = event.payload?.payment?.entity;
  const eventId = request.headers.get("x-razorpay-event-id") || `${type}:${payment?.id ?? "none"}:${payment?.order_id ?? "none"}`;
  try {
    const sql = await getSql();
    const order = await findWebhookOrder(sql, payment);
    const fresh = await rememberEvent(sql, eventId, order?.id ?? null, type);
    if (!fresh) return json({ ok: true, duplicate: true });
    if (!order) return json({ error: "Order not stored yet." }, 500);
    if (type === "payment.captured" || type === "order.paid") {
      if (!payment?.id || typeof payment.amount !== "number") {
        await sql.query(`delete from payment_events where event_id = $1`, [eventId]);
        return json({ error: "Payment event was incomplete." }, 500);
      }
      const result = await markPaid(sql, {
        orderId: order.id,
        paymentId: payment.id,
        amountPaise: payment.amount,
      });
      if (!result.ok && result.reason === "amount") {
        await sql.query(`update orders set payment_status = 'amount_mismatch' where id = $1 and order_status <> 'PAID'`, [order.id]);
      }
      return json({ ok: result.ok, reason: result.ok ? "paid" : result.reason });
    }
    if (type === "payment.failed") {
      await sql.query(
        `update orders set payment_status = 'failed' where id = $1 and order_status = 'PAYMENT PENDING'`,
        [order.id],
      );
      return json({ ok: true, status: "failed" });
    }
    if (type === "refund.processed" || type === "payment.refunded") {
      const result = await markRefunded(sql, order.id);
      return json({ ok: result.ok, reason: result.ok ? "refunded" : result.reason });
    }
    return json({ ok: true, ignored: type });
  } catch (error) {
    console.error("[webhook]", error instanceof Error ? error.message : "failed");
    return json({ error: "Webhook was not stored." }, 500);
  }
}

async function findWebhookOrder(
  sql: Awaited<ReturnType<typeof getSql>>,
  payment: WebhookPayment | undefined,
) {
  if (payment?.order_id) {
    const byRemote = await sql.query<{ id: string; amount_paise: number; razorpay_payment_id: string | null }>(
      `select id, amount_paise, razorpay_payment_id from orders where razorpay_order_id = $1`,
      [payment.order_id],
    );
    if (byRemote[0]) return byRemote[0];
  }
  const note = payment?.notes?.mud_order;
  if (note) {
    const byNote = await sql.query<{ id: string; amount_paise: number; razorpay_payment_id: string | null }>(
      `select id, amount_paise, razorpay_payment_id from orders where id = $1`,
      [note],
    );
    if (byNote[0]) return byNote[0];
  }
  return null;
}

export async function handleCreateOrder(request: Request) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  return json({ error: "The payable amount is taken from the catalogue, not from the browser." }, 400);
}

export async function handleVerifyPayment(request: Request) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  const parsed = z
    .object({
      razorpay_order_id: z.string().min(4).max(80),
      razorpay_payment_id: z.string().min(4).max(80),
      razorpay_signature: z.string().min(8).max(256),
    })
    .safeParse(body);
  if (!parsed.success) return json({ error: "Missing payment fields." }, 400);
  const creds = keys();
  if (!creds.keySecret) return json({ error: "Razorpay is not connected." }, 503);
  let signed = false;
  try {
    signed = paymentSignatureValid(parsed.data.razorpay_order_id, parsed.data.razorpay_payment_id, parsed.data.razorpay_signature, creds.keySecret);
  } catch {
    signed = false;
  }
  if (!signed) return json({ success: false, error: "Payment signature was rejected." }, 400);
  try {
    const sql = await getSql();
    const rows = await sql.query<{ id: string; amount_paise: number; order_status: string }>(
      `select id, amount_paise, order_status from orders where razorpay_order_id = $1`,
      [parsed.data.razorpay_order_id],
    );
    const order = rows[0];
    if (order && order.order_status !== "PAID") {
      const result = await markPaid(sql, {
        orderId: order.id,
        paymentId: parsed.data.razorpay_payment_id,
        amountPaise: Number(order.amount_paise),
      });
      if (!result.ok) return json({ success: false, error: "Payment matched but the order was not marked paid.", reason: result.reason }, 409);
    }
  } catch (error) {
    console.error("[verify-payment]", error instanceof Error ? error.message : "failed");
    return json({ error: "Payment could not be recorded." }, 500);
  }
  return json({ success: true });
}
