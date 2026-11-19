import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/archive";
import { useCart } from "@/lib/cart";
import { formatPaise } from "@/lib/payments/use-stock";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

type Line = { id: string; name: string; number: string; image: string; quantity: number; pricePaise: number };
type Quote = { lines: Line[]; subtotalPaise: number; shippingPaise: number; taxPaise: number; amountPaise: number };
type Customer = { name: string; email: string; phone: string; address: string; city: string; state: string; pin: string; country: string };

const emptyCustomer: Customer = { name: "", email: "", phone: "", address: "", city: "", state: "", pin: "", country: "India" };

type RazorpaySuccess = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayCheckout = { open: () => void; on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void };

function CheckoutPage() {
  const { ids, clear } = useCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [taxConfigured, setTaxConfigured] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [step, setStep] = useState<"details" | "review">("details");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ids.length === 0) return;
    let cancel = false;
    fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "quote", ids }),
    })
      .then(async (response) => ({ ok: response.ok, body: await response.json() }))
      .then((result) => {
        if (cancel) return;
        setConfigured(Boolean(result.body.paymentsConfigured));
        setTaxConfigured(Boolean(result.body.taxConfigured));
        if (result.body.quote) setQuote(result.body.quote);
        else setError(result.body.error ?? "These pieces could not be quoted.");
      })
      .catch(() => {
        if (!cancel) setError("The archive could not price this dispatch.");
      });
    return () => {
      cancel = true;
    };
  }, [ids]);

  function field(key: keyof Customer, label: string, type = "text", autoComplete = "on") {
    return (
      <label className="mt-4 block font-mono text-xs tracking-widest text-muted">
        {label}
        <input
          required
          type={type}
          autoComplete={autoComplete}
          value={customer[key]}
          onChange={(event) => setCustomer((current) => ({ ...current, [key]: event.target.value }))}
          className="mt-2 w-full border border-forest bg-black px-3 py-3 font-sans text-base text-parchment outline-none focus:border-gold"
        />
      </label>
    );
  }

  async function pay() {
    setBusy(true);
    setError("");
    let session: { orderId: string; token: string } | null = null;
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "create", ids, customer }),
      });
      const body = await response.json();
      if (!response.ok) {
        setError(body.error ?? "Payment did not start.");
        return;
      }
      session = { orderId: body.orderId, token: body.token };
      await openRazorpay(body, async (payment) => {
        const verified = await fetch("/api/checkout", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ action: "verify", orderId: body.orderId, token: body.token, ...payment }),
        });
        const result = await verified.json();
        if (!verified.ok || !result.paid) throw new Error(result.error ?? "Payment was not confirmed.");
        clear();
        navigate({ to: "/orders/$id", params: { id: body.orderId }, search: { t: body.token } });
      }, async () => {
        await fetch("/api/checkout", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ action: "cancel", orderId: body.orderId, token: body.token }),
        });
        session = null;
        setError("Checkout was closed. Nothing was charged.");
      });
    } catch (error) {
      if (session) {
        await fetch("/api/checkout", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ action: "cancel", orderId: session.orderId, token: session.token }),
        }).catch(() => undefined);
      }
      setError(error instanceof Error ? error.message : "Payment could not be opened.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="archive-field min-h-dvh text-fg">
      <SiteHeader />
      <main className="on-swirl mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="font-mono text-xs tracking-widest text-gold">CHECKOUT</p>
        <h1 className="mt-2 font-serif text-4xl text-parchment">Dispatch</h1>
        {ids.length === 0 ? (
          <div className="mt-10">
            <p className="text-base text-fg">The cart is empty.</p>
            <Link to="/" hash="archive" className="mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment">
              ENTER THE ARCHIVE
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section>
              {configured === false ? (
                <p className="border border-forest bg-surface p-4 text-sm leading-relaxed text-fg">
                  Razorpay is not connected on this archive yet. You can review the dispatch, but Pay now will not take money until the merchant keys are added.
                </p>
              ) : null}
              {step === "details" ? (
                <form
                  className="mt-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setError("");
                    setStep("review");
                  }}
                >
                  {field("name", "FULL NAME", "text", "name")}
                  {field("email", "EMAIL", "email", "email")}
                  {field("phone", "MOBILE NUMBER", "tel", "tel")}
                  {field("address", "SHIPPING ADDRESS", "text", "street-address")}
                  {field("city", "CITY", "text", "address-level2")}
                  {field("state", "STATE", "text", "address-level1")}
                  {field("pin", "PIN CODE", "text", "postal-code")}
                  {field("country", "COUNTRY", "text", "country-name")}
                  <button type="submit" className="mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment">
                    REVIEW ORDER
                  </button>
                </form>
              ) : (
                <div className="mt-4">
                  <dl className="border-y border-forest font-mono text-sm">
                    <Row label="Name" value={customer.name} />
                    <Row label="Email" value={customer.email} />
                    <Row label="Mobile" value={customer.phone} />
                    <Row label="Address" value={`${customer.address}, ${customer.city}, ${customer.state} ${customer.pin}, ${customer.country}`} />
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button type="button" onClick={() => setStep("details")} className="inline-flex min-h-11 items-center border border-gold px-5 font-mono text-xs tracking-widest text-parchment">
                      EDIT
                    </button>
                    <button type="button" disabled={busy || !quote} onClick={pay} className="inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment disabled:opacity-50">
                      {busy ? "OPENING" : "PAY NOW"}
                    </button>
                  </div>
                </div>
              )}
              {error ? <p className="mt-4 max-w-md text-sm leading-relaxed text-gold">{error}</p> : null}
            </section>
            <aside className="border border-forest bg-surface p-4">
              <p className="font-mono text-xs tracking-widest text-gold">ORDER</p>
              <ul className="mt-4 divide-y divide-forest">
                {(quote?.lines ?? []).map((line) => (
                  <li key={line.id} className="flex gap-3 py-3">
                    <img src={line.image} alt="" className="h-20 w-16 object-contain" />
                    <div>
                      <p className="font-mono text-xs text-gold">{line.number}</p>
                      <p className="font-display text-2xl leading-none">{line.name}</p>
                      <p className="mt-1 font-mono text-xs text-muted">QTY {line.quantity}</p>
                      <p className="font-mono text-sm text-gold">{formatPaise(line.pricePaise)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              {quote ? (
                <dl className="mt-4 border-t border-forest pt-3 font-mono text-sm">
                  <Row label="Items" value={formatPaise(quote.subtotalPaise)} />
                  <Row label="Shipping" value={formatPaise(quote.shippingPaise)} />
                  {taxConfigured ? <Row label="Tax" value={formatPaise(quote.taxPaise)} /> : null}
                  <div className="flex items-baseline justify-between py-2">
                    <dt className="text-xs tracking-widest text-muted">PAYABLE</dt>
                    <dd className="font-display text-3xl text-gold">{formatPaise(quote.amountPaise)}</dd>
                  </div>
                </dl>
              ) : (
                <p className="mt-4 text-sm text-muted">Pricing this dispatch.</p>
              )}
              <p className="mt-3 text-xs leading-relaxed text-muted">One of one. Quantity stays at 1. The payable amount is calculated on the server from the archive prices.</p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <dt className="text-xs tracking-widest text-muted">{label.toUpperCase()}</dt>
      <dd className="text-right text-parchment">{value}</dd>
    </div>
  );
}

async function openRazorpay(
  session: {
    keyId: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    razorpayOrderId: string;
    prefill: { name: string; email: string; contact: string };
  },
  onSuccess: (payment: RazorpaySuccess) => Promise<void>,
  onDismiss: () => Promise<void>,
) {
  await loadCheckout();
  const Razorpay = window.Razorpay;
  if (!Razorpay) throw new Error("missing checkout");
  await new Promise<void>((resolve, reject) => {
    const checkout: RazorpayCheckout = new Razorpay({
      key: session.keyId,
      amount: session.amount,
      currency: session.currency,
      name: session.name,
      description: session.description,
      order_id: session.razorpayOrderId,
      prefill: session.prefill,
      theme: { color: "#55E8FF" },
      handler: (response: RazorpaySuccess) => {
        onSuccess(response).then(resolve).catch(reject);
      },
      modal: {
        ondismiss: () => {
          onDismiss().finally(resolve);
        },
      },
    });
    checkout.on("payment.failed", (response) => {
      reject(new Error(response.error?.description || "Payment failed"));
    });
    checkout.open();
  });
}

function loadCheckout() {
  if (window.Razorpay) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay checkout failed to load"));
    document.body.appendChild(script);
  });
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayCheckout;
  }
}
