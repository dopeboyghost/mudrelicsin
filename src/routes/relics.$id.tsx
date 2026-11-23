import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, Turner } from "@/components/archive";
import { RelicEnquiry } from "@/components/whatsapp";
import { inr, relicById, relics } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { useStock } from "@/lib/payments/use-stock";

export const Route = createFileRoute("/relics/$id")({ component: RelicPage });

function RelicPage() {
  const { id } = Route.useParams();
  const relic = relicById(id);
  const cart = useCart();
  const stock = useStock(relic ? [relic.id] : []);

  if (!relic) {
    return (
      <main className="on-swirl mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-6 text-fg">
        <p className="font-serif text-4xl text-parchment">Not in the archive</p>
        <Link to="/" className="mt-6 inline-flex min-h-11 items-center font-mono text-sm text-gold">
          Back to the archive
        </Link>
      </main>
    );
  }

  const index = relics.findIndex((item) => item.id === relic.id);
  const previous = index > 0 ? relics[index - 1] : undefined;
  const next = index < relics.length - 1 ? relics[index + 1] : undefined;
  const held = cart.has(relic.id);
  const open = relic.status === "AVAILABLE" && !stock.blocked.has(relic.id);

  return (
    <div className="archive-field min-h-dvh text-fg">
      <SiteHeader />
      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <Turner relic={relic} />
          {relic.card ? (
            <figure className="mt-4 border border-forest bg-surface p-3">
              <img src={relic.card} alt={`${relic.name} archive card`} loading="lazy" decoding="async" className="w-full" />
              <figcaption className="mt-2 font-mono text-xs tracking-widest text-muted">ARCHIVE CARD</figcaption>
            </figure>
          ) : null}
        </div>
        <div className="on-swirl">
          {relic.number ? <p className="font-mono text-xs tracking-widest text-gold">{relic.number}</p> : null}
          <h1 className="mt-2 font-display text-5xl leading-none tracking-wide text-parchment sm:text-7xl">{relic.name}</h1>
          {relic.price != null ? <p className="mt-5 font-display text-4xl text-gold">{inr(relic.price)}</p> : null}
          {open && relic.price != null ? (
            held ? (
              <Link to="/cart" className="mt-5 inline-flex min-h-11 w-full items-center justify-center bg-blood font-mono text-xs tracking-widest text-parchment sm:w-auto sm:px-8">
                IN THE CART
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => cart.add(relic.id)}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center bg-blood font-mono text-xs tracking-widest text-parchment sm:w-auto sm:px-8"
              >
                ADD TO CART
              </button>
            )
          ) : relic.price != null ? (
            <p className="mt-5 font-mono text-xs tracking-widest text-muted">{relic.status}</p>
          ) : null}
          <RelicEnquiry relic={relic} />
          {relic.explain ? <p className="mt-6 max-w-md text-base leading-relaxed text-fg">{relic.explain}</p> : null}
          <dl className="mt-8 border-t border-forest font-mono text-sm">
            <Row label="Class" value={relic.category} />
            {relic.material ? <Row label="Material" value={relic.material} /> : null}
            <Row label="Edition" value={relic.edition} />
            {relic.condition ? <Row label="Condition" value={relic.condition} /> : null}
            {relic.price != null ? <Row label="Price" value={inr(relic.price)} /> : null}
            <Row label="Availability" value={open ? "Available" : relic.status === "SOLD" ? "Sold" : "Held"} />
            <Row label="Made by" value={`${relic.artistLabel} · ${relic.city}`} />
          </dl>
          {relic.lore ? (
            <div className="mt-8 border border-forest bg-surface p-4">
              <p className="font-mono text-xs tracking-widest text-gold">ARCHIVE NOTE</p>
              <p className="mt-3 text-sm leading-relaxed text-fg">{relic.lore}</p>
            </div>
          ) : null}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {previous ? (
              <Link to="/relics/$id" params={{ id: previous.id }} className="min-h-11 border border-forest px-3 py-3">
                <p className="font-mono text-xs text-muted">PREVIOUS</p>
                <p className="mt-1 font-display text-xl leading-none">{previous.name}</p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to="/relics/$id" params={{ id: next.id }} className="min-h-11 border border-forest px-3 py-3 text-right">
                <p className="font-mono text-xs text-muted">NEXT</p>
                <p className="mt-1 font-display text-xl leading-none">{next.name}</p>
              </Link>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-forest py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right text-parchment">{value}</dd>
    </div>
  );
}
