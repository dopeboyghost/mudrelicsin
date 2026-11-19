import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/archive";
import { inr, relicById } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { ids, remove } = useCart();
  const held = ids.map((id) => relicById(id)).filter((relic) => !!relic);
  const total = held.reduce((sum, relic) => sum + (relic.price ?? 0), 0);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="font-mono text-xs tracking-widest text-gold">CART</p>
        <h1 className="mt-2 font-serif text-4xl text-parchment">What you found</h1>
        {held.length === 0 ? (
          <div className="mt-10">
            <p className="text-base leading-relaxed text-muted">The cart is empty.</p>
            <Link to="/" hash="archive" className="mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment">
              ENTER THE ARCHIVE
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 divide-y divide-forest border-y border-forest">
              {held.map((relic) => (
                <li key={relic.id} className="flex gap-4 py-4">
                  <Link to="/relics/$id" params={{ id: relic.id }} className="block w-24 shrink-0 bg-surface">
                    <img src={relic.image} alt="" className="aspect-[3/4] w-full object-contain" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    {relic.number ? <p className="font-mono text-xs tracking-widest text-gold">{relic.number}</p> : null}
                    <Link to="/relics/$id" params={{ id: relic.id }} className="mt-1 font-display text-3xl leading-none">
                      {relic.name}
                    </Link>
                    <p className="mt-2 font-mono text-sm text-parchment">{relic.price != null ? inr(relic.price) : ""}</p>
                    <p className="font-mono text-xs text-muted">{relic.edition}</p>
                    <button type="button" onClick={() => remove(relic.id)} className="mt-auto inline-flex min-h-11 items-center self-start font-mono text-xs tracking-widest text-gold">
                      REMOVE
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-baseline justify-between">
              <p className="font-mono text-xs tracking-widest text-muted">TOTAL</p>
              <p className="font-display text-4xl text-gold">{inr(total)}</p>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              This cart does not charge a card. These are one of one. Payment stays with the archive — nothing here takes money, GST, or a shipping address.
            </p>
          </>
        )}
      </main>
    </div>
  );
}
