-- Guest checkout orders. Readable only with the secret confirmation token.
-- No public list. Shipping addresses stay on the server.

create table if not exists orders (
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

create unique index if not exists orders_razorpay_order_id_idx
  on orders (razorpay_order_id)
  where razorpay_order_id is not null;

create table if not exists sold_relics (
  relic_id text primary key,
  order_id text not null,
  sold_at timestamptz not null default now()
);

create table if not exists stock_holds (
  relic_id text primary key,
  order_id text not null,
  held_until timestamptz not null
);

create table if not exists payment_events (
  event_id text primary key,
  order_id text,
  event_type text not null,
  created_at timestamptz not null default now()
);
