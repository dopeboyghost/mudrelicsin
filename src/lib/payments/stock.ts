import type { Line } from "./money.ts";

export type Queryable = {
  query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]>;
};

const HOLD = "15 minutes";

export async function blocking(db: Queryable, ids: string[]) {
  if (ids.length === 0) return { sold: [] as string[], held: [] as string[] };
  const sold = await db.query<{ relic_id: string }>(
    `select relic_id from sold_relics where relic_id = any($1::text[])`,
    [ids],
  );
  const held = await db.query<{ relic_id: string }>(
    `select relic_id from stock_holds where relic_id = any($1::text[]) and held_until > now()`,
    [ids],
  );
  return { sold: sold.map((row) => row.relic_id), held: held.map((row) => row.relic_id) };
}

export async function holdRelic(db: Queryable, relicId: string, orderId: string) {
  const rows = await db.query<{ relic_id: string }>(
    `insert into stock_holds (relic_id, order_id, held_until)
     select $1, $2, now() + interval '${HOLD}'
     where not exists (select 1 from sold_relics where relic_id = $1)
     on conflict (relic_id) do update
       set order_id = excluded.order_id,
           held_until = excluded.held_until
       where stock_holds.held_until <= now()
     returning relic_id`,
    [relicId, orderId],
  );
  return rows.length > 0;
}

export async function releaseHolds(db: Queryable, orderId: string) {
  await db.query(`delete from stock_holds where order_id = $1`, [orderId]);
}

export async function claimRelic(db: Queryable, relicId: string, orderId: string) {
  const rows = await db.query<{ relic_id: string }>(
    `insert into sold_relics (relic_id, order_id)
     values ($1, $2)
     on conflict (relic_id) do update
       set order_id = sold_relics.order_id
       where sold_relics.order_id = excluded.order_id
     returning relic_id`,
    [relicId, orderId],
  );
  return rows.length > 0;
}

export async function releaseSold(db: Queryable, orderId: string) {
  await db.query(`delete from sold_relics where order_id = $1`, [orderId]);
}

type OrderRow = {
  id: string;
  token_hash: string;
  razorpay_order_id: string | null;
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
};

export function parseItems(value: OrderRow["items"]): Line[] {
  const raw = typeof value === "string" ? JSON.parse(value) : value;
  return Array.isArray(raw) ? (raw as Line[]) : [];
}

export async function markPaid(db: Queryable, args: { orderId: string; paymentId: string; amountPaise: number }) {
  const rows = await db.query<OrderRow>(`select * from orders where id = $1`, [args.orderId]);
  const order = rows[0];
  if (!order) return { ok: false as const, reason: "missing" as const };
  if (order.order_status === "PAID") {
    if (order.razorpay_payment_id === args.paymentId) return { ok: true as const, already: true };
    return { ok: false as const, reason: "already_paid" as const };
  }
  if (Number(order.amount_paise) !== args.amountPaise) return { ok: false as const, reason: "amount" as const };
  const items = parseItems(order.items);
  for (const item of items) {
    const claimed = await claimRelic(db, item.id, order.id);
    if (!claimed) return { ok: false as const, reason: "stock" as const };
  }
  await db.query(
    `update orders
       set order_status = 'PAID',
           payment_status = 'captured',
           razorpay_payment_id = $2,
           paid_at = coalesce(paid_at, now())
     where id = $1 and order_status <> 'PAID'`,
    [order.id, args.paymentId],
  );
  await releaseHolds(db, order.id);
  return { ok: true as const, already: false };
}

export async function markRefunded(db: Queryable, orderId: string) {
  const rows = await db.query<{ order_status: string }>(`select order_status from orders where id = $1`, [orderId]);
  const status = rows[0]?.order_status;
  if (!status) return { ok: false as const, reason: "missing" as const };
  if (status === "REFUNDED") return { ok: true as const, already: true };
  if (status !== "PAID" && status !== "PROCESSING" && status !== "SHIPPED" && status !== "DELIVERED") {
    return { ok: false as const, reason: "not_paid" as const };
  }
  await releaseSold(db, orderId);
  await db.query(
    `update orders set order_status = 'REFUNDED', payment_status = 'refunded' where id = $1`,
    [orderId],
  );
  return { ok: true as const, already: false };
}

export async function rememberEvent(db: Queryable, eventId: string, orderId: string | null, eventType: string) {
  const rows = await db.query<{ event_id: string }>(
    `insert into payment_events (event_id, order_id, event_type)
     values ($1, $2, $3)
     on conflict (event_id) do nothing
     returning event_id`,
    [eventId, orderId, eventType],
  );
  return rows.length > 0;
}
