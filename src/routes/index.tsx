import { createFileRoute } from "@tanstack/react-router";
import { Band, RelicCard, Roll, SiteHeader } from "@/components/archive";
import { Radio } from "@/components/radio";
import { WhatsAppChatLink } from "@/components/whatsapp";
import { relics } from "@/data/catalog";

export const Route = createFileRoute("/")({ component: Home });

const oneOfOne = ["018", "009", "003"];

const flameCombos = new Set(["001", "002", "003", "004"]);
const catchallIds = new Set(["006", "009"]);
const vesselIds = new Set(["019", "025"]);
const smokeIds = new Set(["029"]);
const displayIds = new Set(["018"]);

const wings = [
  {
    id: "flame",
    label: "FLAME",
    index: "01 · FLAME",
    title: "Flame",
    note: "Sculpted lighter cases, strange little fire companions and lighter-and-ashtray combinations. Objects made to give an everyday flame an entirely different personality.",
    pick: (relic: (typeof relics)[number]) => relic.kind === "lighter" || flameCombos.has(relic.id),
  },
  {
    id: "catchalls",
    label: "CATCHALLS",
    index: "02 · CATCHALLS",
    title: "Catchalls",
    note: "Strange little landing places for the things you carry. Ring dishes, trinket trays, jewellery dishes and sculptural ashtrays.",
    pick: (relic: (typeof relics)[number]) => catchallIds.has(relic.id),
  },
  {
    id: "vessels",
    label: "VESSELS",
    index: "03 · VESSELS",
    title: "Vessels",
    note: "Containers from another dimension. Sculptural jars, unusual storage objects and curious little vessels designed to hold your treasures.",
    pick: (relic: (typeof relics)[number]) => vesselIds.has(relic.id),
  },
  {
    id: "smoke-rituals",
    label: "SMOKE RITUALS",
    index: "04 · SMOKE RITUALS",
    title: "Smoke rituals",
    note: "Objects for smoke, scent and slow moments. Incense holders and sculptural burners that turn everyday rituals into something unusual.",
    pick: (relic: (typeof relics)[number]) => smokeIds.has(relic.id),
  },
  {
    id: "display-relics",
    label: "DISPLAY RELICS",
    index: "05 · DISPLAY RELICS",
    title: "Display relics",
    note: "Give your favourite possessions a place of their own. Sculptural stands for chains, watches, necklaces and other treasured objects.",
    pick: (relic: (typeof relics)[number]) => displayIds.has(relic.id),
  },
  {
    id: "wearables",
    label: "WEARABLES",
    index: "06 · WEARABLES",
    title: "Wearables",
    note: "Tiny artifacts made to leave the archive. Handmade pendants, mutant faces, strange symbols, keychains and wearable curiosities.",
    pick: () => false,
  },
];

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
              You didn't buy it. You found it.
            </p>
            <a href="#roll" className="mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment">
              ENTER THE ARCHIVE
            </a>
          </div>
        </section>

        <nav className="wing-nav flex gap-4 overflow-x-auto border-b border-forest bg-bg px-4 py-1 font-mono text-xs tracking-widest text-gold sm:px-6">
          {wings.map((wing) => (
            <a key={wing.id} href={`#${wing.id}`} className="inline-flex min-h-11 shrink-0 items-center">
              {wing.label}
            </a>
          ))}
        </nav>

        <section id="roll" className="archive-anchor border-b border-forest bg-bg">
          <Roll relics={relics} />
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

        {wings.map((wing) => (
          <Band key={wing.id} id={wing.id} index={wing.index} title={wing.title} note={wing.note} relics={relics.filter(wing.pick)} />
        ))}

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="on-swirl">
            <p className="font-mono text-xs tracking-widest text-gold">05 · ONE OF ONE</p>
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

        <section id="archive" className="archive-anchor mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="on-swirl border-b border-forest pb-3">
            <p className="font-mono text-xs tracking-widest text-gold">06 · RELIC ARCHIVE</p>
            <h2 className="mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl">Relic archive</h2>
            <p className="mt-3 font-mono text-xs text-fg">{relics.length} OBJECTS · KOCHI</p>
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
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg">
              There is no mailing list on this archive. The objects are the dispatch. Nothing here is charged until you settle it with the makers.
            </p>
            <a href="#archive" className="mt-6 inline-flex min-h-11 items-center border border-gold px-5 font-mono text-xs tracking-widest text-parchment">
              OPEN THE FULL ARCHIVE
            </a>
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
