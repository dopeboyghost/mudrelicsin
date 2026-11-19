import { createFileRoute } from "@tanstack/react-router";
import { Band, RelicCard, Roll, SiteHeader } from "@/components/archive";
import { relics } from "@/data/catalog";

export const Route = createFileRoute("/")({ component: Home });

const oneOfOne = ["018", "009", "003"];

function Home() {
  const recovered = [...relics].slice(-6).reverse();
  const mutations = relics.filter((relic) => relic.kind === "lighter");
  const altars = relics.filter((relic) => relic.kind === "holder");
  const amulets = relics.filter((relic) => relic.kind === "ring" || relic.kind === "other");
  const singles = oneOfOne.map((id) => relics.find((relic) => relic.id === id)).filter((relic) => !!relic);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <SiteHeader />
      <main>
        <section className="archive-hero relative flex flex-col justify-end">
          <img src="/archive/found.jpg" alt="Handmade relics gathered on black cloth" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-bg/60" />
          <div className="relative px-4 py-8 sm:px-8 sm:py-12">
            <div className="gold-plate inline-flex max-w-full items-center gap-2 px-3 py-2">
              <img src="/eye-logo.png" alt="" className="h-10 w-auto sm:h-12" />
              <h1>
                <img src="/wordmark.png" alt="MUD RELICS" className="h-12 w-auto sm:h-16" />
              </h1>
            </div>
            <p className="mt-6 max-w-sm font-serif text-2xl leading-tight tracking-wide text-parchment uppercase sm:text-4xl">
              You didn't buy it. You found it.
            </p>
            <a href="#roll" className="mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment">
              ENTER THE ARCHIVE
            </a>
          </div>
        </section>

        <nav className="wing-nav flex gap-4 overflow-x-auto border-b border-forest bg-bg px-4 py-1 font-mono text-xs tracking-widest text-gold sm:px-6">
          <a href="#roll" className="inline-flex min-h-11 shrink-0 items-center">ROLL</a>
          <a href="#recovered" className="inline-flex min-h-11 shrink-0 items-center">RECOVERED</a>
          <a href="#mutations" className="inline-flex min-h-11 shrink-0 items-center">MUTATIONS</a>
          <a href="#altars" className="inline-flex min-h-11 shrink-0 items-center">ALTARS</a>
          <a href="#amulets" className="inline-flex min-h-11 shrink-0 items-center">AMULETS</a>
          <a href="#archive" className="inline-flex min-h-11 shrink-0 items-center">ARCHIVE</a>
        </nav>

        <section id="roll" className="archive-anchor border-b border-forest bg-bg">
          <Roll relics={relics} />
        </section>

        <section id="recovered" className="archive-anchor mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <p className="font-mono text-xs tracking-widest text-gold">01</p>
          <h2 className="mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl">Recently recovered</h2>
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
          <div>
            <p className="font-mono text-xs tracking-widest text-gold">THE ARCHIVE</p>
            <p className="mt-4 font-serif text-2xl leading-snug text-parchment sm:text-3xl">
              Some things are made. Some things are recovered. Some things should have stayed buried.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Handmade in Kochi by DBG and Paru. Air-dry clay, one of one. The cracks stay.
            </p>
          </div>
        </section>

        <Band id="mutations" index="02 · ORGANIC MUTATIONS" title="Organic mutations" note="Lighter cases. Painted, grown, and left strange." relics={mutations} />
        <Band id="altars" index="03 · ALTARS & VESSELS" title="Altars and vessels" note="Dishes for ash, a stick, or a lighter." relics={altars} />
        <Band id="amulets" index="04 · AMULETS & OBJECTS" title="Amulets and objects" note="A ring dish, and one sculpture that would not sit with the rest." relics={amulets} />

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <p className="font-mono text-xs tracking-widest text-gold">05 · ONE OF ONE</p>
          <h2 className="mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl">One of one</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {singles.map((relic) => (
              <li key={relic.id}>
                <RelicCard relic={relic} />
              </li>
            ))}
          </ul>
        </section>

        <section id="archive" className="archive-anchor mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="border-b border-forest pb-3">
            <p className="font-mono text-xs tracking-widest text-gold">06 · RELIC ARCHIVE</p>
            <h2 className="mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl">Relic archive</h2>
            <p className="mt-3 font-mono text-xs text-muted">{relics.length} OBJECTS · KOCHI</p>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {relics.map((relic) => (
              <li key={relic.id}>
                <RelicCard relic={relic} />
              </li>
            ))}
          </ul>
        </section>

        <section id="dispatch" className="border-t border-forest bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <p className="font-mono text-xs tracking-widest text-gold">ARCHIVE DISPATCH</p>
            <h2 className="mt-3 max-w-lg font-serif text-3xl leading-tight text-parchment">New recoveries leave Kochi in small numbers.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              There is no mailing list on this archive. The objects are the dispatch. Nothing here is charged until you settle it with the makers.
            </p>
            <a href="#archive" className="mt-6 inline-flex min-h-11 items-center border border-gold px-5 font-mono text-xs tracking-widest text-parchment">
              OPEN THE FULL ARCHIVE
            </a>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-8 sm:px-6">
        <p className="font-mono text-xs text-muted">DBG × PARU · KOCHI</p>
        <p className="font-mono text-xs text-gold">MUD RELICS</p>
      </footer>
    </div>
  );
}
