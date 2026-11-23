import { createFileRoute, Link } from "@tanstack/react-router";
import { Band, RelicCard, Roll, SiteHeader } from "@/components/archive";
import { Radio } from "@/components/radio";
import { WhatsAppChatLink } from "@/components/whatsapp";
import { byNumber, relics, type Relic } from "@/data/catalog";

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
    pick: (relic: Relic) => relic.kind === "lighter" || flameCombos.has(relic.id),
  },
  {
    id: "catchalls",
    label: "CATCHALLS",
    index: "02 · CATCHALLS",
    title: "Catchalls",
    note: "Strange little landing places for the things you carry. Ring dishes, trinket trays, jewellery dishes and sculptural ashtrays.",
    pick: (relic: Relic) => catchallIds.has(relic.id),
  },
  {
    id: "vessels",
    label: "VESSELS",
    index: "03 · VESSELS",
    title: "Vessels",
    note: "Containers from another dimension. Sculptural jars, unusual storage objects and curious little vessels designed to hold your treasures.",
    pick: (relic: Relic) => vesselIds.has(relic.id),
  },
  {
    id: "smoke-rituals",
    label: "SMOKE RITUALS",
    index: "04 · SMOKE RITUALS",
    title: "Smoke rituals",
    note: "Objects for smoke, scent and slow moments. Incense holders and sculptural burners that turn everyday rituals into something unusual.",
    pick: (relic: Relic) => smokeIds.has(relic.id),
  },
  {
    id: "display-relics",
    label: "DISPLAY RELICS",
    index: "05 · DISPLAY RELICS",
    title: "Display relics",
    note: "Give your favourite possessions a place of their own. Sculptural stands for chains, watches, necklaces and other treasured objects.",
    pick: (relic: Relic) => displayIds.has(relic.id),
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

const wingIds = new Set(wings.map((wing) => wing.id));

export const Route = createFileRoute("/archive")({
  validateSearch: (search: Record<string, unknown>) => {
    const wing = typeof search.wing === "string" && wingIds.has(search.wing) ? search.wing : undefined;
    return { wing };
  },
  component: ArchivePage,
});

function ArchivePage() {
  const { wing } = Route.useSearch();
  const shown = wings.filter((item) => !wing || item.id === wing);

  return (
    <div className="archive-field min-h-dvh text-fg">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="on-swirl">
            <p className="font-mono text-xs tracking-widest text-gold">CLASSIFIED COLLECTION</p>
            <h1 className="mt-3 font-serif text-5xl tracking-wide text-parchment sm:text-6xl">ARCHIVE</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg">
              A collection of recovered objects, handmade artifacts and unusual relics.
            </p>
            <p className="mt-3 font-mono text-xs text-muted">{relics.length} OBJECTS · KOCHI</p>
          </div>
        </section>

        {wing ? null : (
          <section className="archive-anchor border-y border-forest bg-bg">
            <Roll relics={byNumber(relics)} />
          </section>
        )}

        <nav className="wing-nav flex gap-4 overflow-x-auto border-b border-forest bg-bg px-4 py-1 font-mono text-xs tracking-widest text-white sm:px-6">
          <Link
            to="/archive"
            search={{ wing: undefined }}
            aria-current={wing ? undefined : "page"}
            className="inline-flex min-h-11 shrink-0 items-center"
          >
            ALL
          </Link>
          {wings.map((item) => (
            <Link
              key={item.id}
              to="/archive"
              search={{ wing: item.id }}
              aria-current={wing === item.id ? "page" : undefined}
              className="inline-flex min-h-11 shrink-0 items-center"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {shown.map((item) => (
          <Band key={item.id} id={item.id} index={item.index} title={item.title} note={item.note} relics={byNumber(relics.filter(item.pick))} />
        ))}

        {wing ? null : (
          <section className="archive-anchor mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="on-swirl border-b border-forest pb-3">
              <p className="font-mono text-xs tracking-widest text-gold">RELIC ARCHIVE</p>
              <h2 className="mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl">Every recovered object</h2>
              <p className="mt-3 font-mono text-xs text-fg">{relics.length} OBJECTS · KOCHI</p>
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {byNumber(relics).map((relic) => (
                <li key={relic.id}>
                  <RelicCard relic={relic} />
                </li>
              ))}
            </ul>
          </section>
        )}
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
