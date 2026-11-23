import { createFileRoute, Link } from "@tanstack/react-router";
import { RelicCard, Roll, SiteHeader } from "@/components/archive";
import { Radio } from "@/components/radio";
import { WhatsAppChatLink } from "@/components/whatsapp";
import { byNumber, relics } from "@/data/catalog";

export const Route = createFileRoute("/")({ component: Home });

const oneOfOne = ["018", "009", "003"];

function Home() {
  const recovered = [...relics].slice(-6).reverse();
  const singles = oneOfOne.map((id) => relics.find((relic) => relic.id === id)).filter((relic) => !!relic);

  return (
    <div className="archive-field min-h-dvh text-fg">
      <SiteHeader />
      <main>
        <section className="archive-hero relative flex flex-col justify-end">
          <img src="/archive/found.jpg" alt="Handmade relics gathered on black cloth" className="absolute inset-0 h-full w-full object-cover" />
          <div className="hero-scrim absolute inset-0" />
          <div className="relative px-4 py-8 sm:px-8 sm:py-12">
            <h1>
              <img src="/mud-relics-logo.webp" alt="MUD RELICS" className="brand-mark h-20 w-auto sm:h-28" />
            </h1>
            <p className="mt-6 max-w-sm font-serif text-2xl leading-tight tracking-wide text-parchment uppercase sm:text-4xl">
              You didn't buy it.
              <br />
              You found it.
            </p>
            <Link to="/archive" className="mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment">
              ENTER THE ARCHIVE
            </Link>
          </div>
        </section>

        <section id="roll" className="archive-anchor border-b border-forest bg-bg">
          <Roll relics={byNumber(relics)} />
        </section>

        <section id="recovered" className="archive-anchor mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="on-swirl">
            <p className="font-mono text-xs tracking-widest text-gold">01</p>
            <h2 className="mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl">Recently recovered</h2>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {recovered.map((relic) => (
              <li key={relic.id}>
                <RelicCard relic={relic} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2">
          <img src="/archive/chamber.jpg" alt="Lighter cases and a toothed ashtray in front of a skull" className="aspect-[3/4] w-full object-cover" />
          <div className="on-swirl">
            <p className="font-mono text-xs tracking-widest text-gold">THE ARCHIVE</p>
            <p className="mt-4 font-serif text-2xl leading-snug text-parchment sm:text-3xl">
              Some things are made. Some things are recovered. Some things should have stayed buried.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg">
              Handmade in Kochi by DBG and Paru. Air-dry clay, one of one. The cracks stay.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="on-swirl">
            <p className="font-mono text-xs tracking-widest text-gold">ONE OF ONE</p>
            <h2 className="mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl">One of one</h2>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {singles.map((relic) => (
              <li key={relic.id}>
                <RelicCard relic={relic} />
              </li>
            ))}
          </ul>
        </section>

        <Link to="/archive" className="block border-t border-forest bg-bg">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="font-mono text-xs tracking-widest text-gold">ARCHIVE</p>
            <h2 className="mt-3 font-serif text-4xl tracking-wide text-parchment sm:text-5xl">ARCHIVE</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg">
              A collection of recovered objects, handmade artifacts and unusual relics.
            </p>
            <span className="mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment">
              ENTER THE ARCHIVE →
            </span>
          </div>
        </Link>

        <section id="dispatch" className="border-t border-forest bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <p className="font-mono text-xs tracking-widest text-gold">ARCHIVE DISPATCH</p>
            <h2 className="mt-3 max-w-lg font-serif text-3xl leading-tight text-parchment">New recoveries leave Kochi in small numbers.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg">
              There is no mailing list on this archive. The objects are the dispatch. Nothing here is charged until you settle it with the makers.
            </p>
            <Link to="/archive" className="mt-6 inline-flex min-h-11 items-center border border-gold px-5 font-mono text-xs tracking-widest text-parchment">
              OPEN THE FULL ARCHIVE
            </Link>
          </div>
        </section>
      </main>
      <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <Radio />
      </div>
      <footer className="on-swirl mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted">DBG × PARU · KOCHI</p>
          <p className="font-mono text-xs text-gold">MUD RELICS</p>
        </div>
        <div className="mt-6 max-w-md border-t border-forest pt-6">
          <p className="text-sm leading-relaxed text-fg">Found something you like? Speak directly to us on WhatsApp.</p>
          <WhatsAppChatLink className="mt-4" />
        </div>
      </footer>
    </div>
  );
}
