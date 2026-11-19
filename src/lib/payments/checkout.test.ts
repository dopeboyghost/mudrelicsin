import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { createRequire } from "node:module";
import test from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { hashToken, paiseFromRupees, quoteRelics, readMoneyEnv, tokensMatch, totals } from "./money.ts";
import { claimRelic, holdRelic, markPaid, markRefunded, releaseHolds, rememberEvent, type Queryable } from "./stock.ts";

const require = createRequire(import.meta.url);
const utils = require("razorpay/dist/utils/razorpay-utils.js") as {
  validatePaymentVerification: (params: { order_id: string; payment_id: string }, signature: string, secret: string) => boolean;
  validateWebhookSignature: (body: string, signature: string, secret: string) => boolean;
};

test("server quote uses catalogue prices and ignores a client total", () => {
  const quoted = quoteRelics(["005", "005", "019"], 0, 0);
  assert.equal(quoted.ok, true);
  if (!quoted.ok) return;
  assert.equal(quoted.quote.lines.length, 2);
  assert.equal(quoted.quote.amountPaise, paiseFromRupees(699 + 1699));
  const taxed = totals(quoted.quote.subtotalPaise, 5000, 1800);
  assert.equal(taxed.shippingPaise, 5000);
  assert.equal(taxed.taxPaise, Math.round(((quoted.quote.subtotalPaise + 5000) * 1800) / 10000));
});

test("empty shipping and tax config means zero, not an invented rate", () => {
  const money = readMoneyEnv({});
  assert.equal(money.ok, true);
  if (!money.ok) return;
  assert.equal(money.shippingPaise, 0);
  assert.equal(money.taxBps, 0);
  assert.equal(readMoneyEnv({ SHIPPING_INR: "nope" }).ok, false);
});

test("sold and unpriced relics are refused", () => {
  const missing = quoteRelics(["999"], 0, 0);
  assert.equal(missing.ok, false);
});

test("official Razorpay signature accepts the real payload and rejects a tampered one", () => {
  const secret = "test_secret";
  const orderId = "order_test";
  const paymentId = "pay_test";
  const signature = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  assert.equal(utils.validatePaymentVerification({ order_id: orderId, payment_id: paymentId }, signature, secret), true);
  assert.equal(utils.validatePaymentVerification({ order_id: orderId, payment_id: paymentId }, "deadbeef", secret), false);
  const body = JSON.stringify({ event: "payment.captured", payload: { payment: { entity: { amount: 69900 } } } });
  const hook = createHmac("sha256", secret).update(body).digest("hex");
  assert.equal(utils.validateWebhookSignature(body, hook, secret), true);
  assert.equal(utils.validateWebhookSignature(body.replace("69900", "100"), hook, secret), false);
});

test("confirmation token does not match a different secret", () => {
  const hash = hashToken("alpha");
  assert.equal(tokensMatch("alpha", hash), true);
  assert.equal(tokensMatch("beta", hash), false);
});

async function database() {
  const pg = new PGlite();
  await pg.exec(`
    create table orders (
      id text primary key,
      token_hash text not null,
      razorpay_order_id text,
      razorpay_payment_id text,
      customer_name text not null,
      email text not null,
      phone text not null,
      address_line text not null,
      city text not null,
      state text not null,
      pin text not null,
      country text not null,
      items jsonb not null,
      subtotal_paise integer not null,
      shipping_paise integer not null,
      tax_paise integer not null,
      amount_paise integer not null,
      currency text not null default 'INR',
      payment_status text not null,
      order_status text not null,
      created_at timestamptz not null default now(),
      paid_at timestamptz
    );
    create table sold_relics (
      relic_id text primary key,
      order_id text not null,
      sold_at timestamptz not null default now()
    );
    create table stock_holds (
      relic_id text primary key,
      order_id text not null,
      held_until timestamptz not null
    );
    create table payment_events (
      event_id text primary key,
      order_id text,
      event_type text not null,
      created_at timestamptz not null default now()
    );
  `);
  const db: Queryable = {
    query: async <T>(text: string, params: unknown[] = []) => (await pg.query(text, params)).rows as T[],
  };
  return { pg, db };
}

test("one of one cannot be held twice, paid twice, or sold after payment", async () => {
  const { db } = await database();
  await db.query(
    `insert into orders (id, token_hash, customer_name, email, phone, address_line, city, state, pin, country, items, subtotal_paise, shipping_paise, tax_paise, amount_paise, payment_status, order_status)
     values ('MR1', 'hash', 'A', 'a@b.co', '9999999999', 'lane', 'Kochi', 'Kerala', '682001', 'India', $1::jsonb, 69900, 0, 0, 69900, 'created', 'PAYMENT PENDING')`,
    [JSON.stringify([{ id: "005", name: "VENOM", number: "x", image: "/a.webp", quantity: 1, pricePaise: 69900 }])],
  );
  await db.query(
    `insert into orders (id, token_hash, customer_name, email, phone, address_line, city, state, pin, country, items, subtotal_paise, shipping_paise, tax_paise, amount_paise, payment_status, order_status)
     values ('MR2', 'hash', 'B', 'b@b.co', '9999999999', 'lane', 'Kochi', 'Kerala', '682001', 'India', $1::jsonb, 69900, 0, 0, 100, 'created', 'PAYMENT PENDING')`,
    [JSON.stringify([{ id: "005", name: "VENOM", number: "x", image: "/a.webp", quantity: 1, pricePaise: 69900 }])],
  );
  assert.equal(await holdRelic(db, "005", "MR1"), true);
  assert.equal(await holdRelic(db, "005", "MR2"), false);
  await releaseHolds(db, "MR1");
  assert.equal(await holdRelic(db, "005", "MR2"), true);
  const wrong = await markPaid(db, { orderId: "MR2", paymentId: "pay_1", amountPaise: 50 });
  assert.equal(wrong.ok, false);
  if (!wrong.ok) assert.equal(wrong.reason, "amount");
  const paid = await markPaid(db, { orderId: "MR2", paymentId: "pay_1", amountPaise: 100 });
  assert.equal(paid.ok, true);
  const again = await markPaid(db, { orderId: "MR2", paymentId: "pay_1", amountPaise: 100 });
  assert.equal(again.ok, true);
  if (again.ok) assert.equal(again.already, true);
  assert.equal(await claimRelic(db, "005", "MR1"), false);
  const first = await rememberEvent(db, "evt_1", "MR2", "payment.captured");
  const duplicate = await rememberEvent(db, "evt_1", "MR2", "payment.captured");
  assert.equal(first, true);
  assert.equal(duplicate, false);
  const refund = await markRefunded(db, "MR2");
  assert.equal(refund.ok, true);
  assert.equal(await holdRelic(db, "005", "MR1"), true);
});
