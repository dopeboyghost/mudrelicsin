import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/archive";
import { formatPaise } from "@/lib/payments/use-stock";

export const Route = createFileRoute("/orders/$id")({
  validateSearch: (search: Record<string, unknown>) => ({ t: typeof search.t === "string" ? search.t : "" }),
  component: OrderPage,
});

type OrderView = {
  id: string;
  paymentId: string | null;
  name: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  items: { id: string; name: string; number: string; image: string; quantity: number; pricePaise: number }[];
  amountPaise: number;
  shippingPaise: number;
  taxPaise: number;
  status: string;
};

function OrderPage() {
  const { id } = Route.useParams();
  const { t } = Route.useSearch();
  const [order, setOrder] = useState<OrderView | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!t) {
      setError("This confirmation link is incomplete.");
      return;
    }
    let cancel = false;
    fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "read", orderId: id, token: t }),
    })
      .then(async (response) => ({ ok: response.ok, body: await response.json() }))
      .then((result) => {
        if (cancel) return;
        if (!result.ok) setError(result.body.error ?? "Order not found.");
        else setOrder(result.body.order);
      })
      .catch(() => {
        if (!cancel) setError("The order could not be opened.");
      });
    return () => {
      cancel = true;
    };
  }, [id, t]);

  const paid = order?.status === "PAID" || order?.status === "PROCESSING" || order?.status === "SHIPPED" || order?.status === "DELIVERED";

  return (
    <div className="archive-field min-h-dvh text-fg">
      <SiteHeader />
      <main className="on-swirl mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="font-mono text-xs tracking-widest text-gold">{paid ? "ORDER CONFIRMED" : "ORDER"}</p>
        <h1 className="mt-2 font-serif text-4xl text-parchment">{paid ? "The archive has the payment." : order ? order.status.replaceAll("_", " ") : "Looking up the order"}</h1>
        {error ? <p className="mt-6 text-sm text-gold">{error}</p> : null}
        {order ? (
          <div className="mt-8">
            {paid ? <p className="max-w-md text-sm leading-relaxed text-fg">Payment was verified. This piece is now held for dispatch from Kochi.</p> : <p className="max-w-md text-sm leading-relaxed text-fg">This order is not confirmed. Payment has not been verified.</p>}
            <dl className="mt-6 border-y border-forest font-mono text-sm">
              <Row label="Order" value={order.id} />
              <Row label="Status" value={order.status} />
              <Row label="Payment" value={order.paymentId ?? "Not verified"} />
              <Row label="Ship to" value={`${order.name}, ${order.address}, ${order.city}, ${order.state} ${order.pin}, ${order.country}`} />
              <Row label="Shipping" value={formatPaise(order.shippingPaise)} />
              {order.taxPaise > 0 ? <Row label="Tax" value={formatPaise(order.taxPaise)} /> : null}
              <Row label="Paid" value={paid ? formatPaise(order.amountPaise) : formatPaise(0)} />
            </dl>
            <ul className="mt-6 divide-y divide-forest border-y border-forest">
              {order.items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <img src={item.image} alt="" className="h-24 w-20 object-contain" />
                  <div>
                    <p className="font-mono text-xs text-gold">{item.number}</p>
                    <p className="font-display text-3xl leading-none">{item.name}</p>
                    <p className="mt-2 font-mono text-sm text-gold">{formatPaise(item.pricePaise)} · QTY {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <Link to="/" className="mt-8 inline-flex min-h-11 items-center font-mono text-xs tracking-widest text-gold">
          BACK TO THE ARCHIVE
        </Link>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <dt className="text-xs tracking-widest text-muted">{label.toUpperCase()}</dt>
      <dd className="max-w-[16rem] text-right text-parchment sm:max-w-md">{value}</dd>
    </div>
  );
}
