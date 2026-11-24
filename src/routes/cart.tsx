import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/archive";
import { inr, relicById } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { useStock } from "@/lib/payments/use-stock";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { ids, remove } = useCart();
  const held = ids.map((id) => relicById(id)).filter((relic) => !!relic);
  const stock = useStock(held.map((relic) => relic.id));
  const purchasable = held.filter((relic) => relic.status === "AVAILABLE" && relic.price != null && !stock.blocked.has(relic.id));
  const total = purchasable.reduce((sum, relic) => sum + (relic.price ?? 0), 0);

  return (
    <div className="archive-field min-h-dvh text-fg">
      <SiteHeader />
      <main className="cart-sheet on-swirl mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h1>
            <img src="/brand/cart-word.webp" alt="CART" className="cart-mark" />
          </h1>
          <p className="cart-held">{String(held.length).padStart(2, "0")}</p>
        </div>
        <p className="mt-4 font-serif text-2xl text-parchment">What you found</p>
        {held.length === 0 ? (
          <div className="mt-10">
            <p className="text-base leading-relaxed text-fg">The cart is empty.</p>
            <Link to="/" hash="archive" className="cart-checkout mt-6 inline-flex min-h-11 items-center px-5 font-mono text-xs tracking-widest">
              ENTER THE ARCHIVE
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-lines mt-8 divide-y divide-[rgba(85,232,255,0.35)] border-y border-[rgba(85,232,255,0.35)]">
              {held.map((relic) => {
                const blocked = relic.status !== "AVAILABLE" || stock.blocked.has(relic.id);
                return (
                  <li key={relic.id} className="flex gap-4 py-4">
                    <Link to="/relics/$id" params={{ id: relic.id }} className="block w-24 shrink-0 bg-black">
                      <img src={relic.image} alt="" className="aspect-[3/4] w-full object-contain" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      {relic.number ? <p className="font-mono text-xs tracking-widest text-gold">{relic.number}</p> : null}
                      <Link to="/relics/$id" params={{ id: relic.id }} className="mt-1 font-display text-3xl leading-none text-parchment">
                        {relic.name}
                      </Link>
                      <p className="mt-2 font-mono text-sm text-gold">{relic.price != null ? inr(relic.price) : ""}</p>
                      <p className="font-mono text-xs text-muted">QTY 1 · {relic.edition}</p>
                      {blocked ? <p className="mt-2 font-mono text-xs tracking-widest text-muted">NOT AVAILABLE</p> : null}
                      <button type="button" onClick={() => remove(relic.id)} className="cart-remove mt-auto inline-flex min-h-11 items-center self-start font-mono text-xs tracking-widest">
                        REMOVE
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex items-baseline justify-between">
              <p className="font-mono text-xs tracking-widest text-muted">ITEMS</p>
              <p className="font-display text-4xl text-gold">{inr(total)}</p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg">
              These are one of one, so the quantity stays at 1. Shipping is added at checkout only if a charge has been configured. Nothing is paid on this page.
            </p>
            {purchasable.length > 0 ? (
              <Link to="/checkout" className="cart-checkout mt-6 inline-flex min-h-11 items-center px-5 font-mono text-xs tracking-widest">
                CHECKOUT
              </Link>
            ) : null}
          </>
        )}
      </main>
    </div>
  );
}
