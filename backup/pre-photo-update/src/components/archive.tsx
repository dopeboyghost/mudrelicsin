import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { framesOf, inr, type Relic } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="gold-plate sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img src="/eye-logo.png" alt="" className="h-9 w-auto shrink-0 sm:h-11" />
          <img src="/wordmark.png" alt="MUD RELICS" className="h-11 w-auto sm:h-16" />
        </Link>
        <Link to="/cart" className="inline-flex min-h-11 shrink-0 items-center font-mono text-xs font-medium tracking-widest text-ink">
          CART{count > 0 ? ` · ${count}` : ""}
        </Link>
      </div>
    </header>
  );
}

function wrap(angle: number) {
  let value = ((angle % 360) + 360) % 360;
  if (value > 180) value -= 360;
  return value;
}

export function Roll({ relics }: { relics: Relic[] }) {
  const navigate = useNavigate();
  const count = relics.length;
  const angle = useRef(0);
  const target = useRef(0);
  const idle = useRef(0);
  const drag = useRef<{ x: number; a: number } | null>(null);
  const moved = useRef(false);
  const [shown, setShown] = useState(0);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const size = wide ? 220 : 148;
  const step = 360 / count;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let then = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - then) / 1000);
      then = now;
      if (!drag.current) {
        idle.current += dt;
        if (idle.current > 2.6) {
          idle.current = 0;
          target.current += step;
        }
        const delta = wrap(target.current - angle.current);
        angle.current += delta * Math.min(1, dt * 3);
        setShown(angle.current);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [step]);

  const index = (Math.round(-shown / step) % count + count) % count;
  const front = relics[index];

  return (
    <section className="relative overflow-hidden">
      <div
        className="relative h-[28rem] touch-none select-none sm:h-[36rem]"
        style={{ perspective: "1100px" }}
        onPointerDown={(event) => {
          moved.current = false;
          drag.current = { x: event.clientX, a: angle.current };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const dx = event.clientX - drag.current.x;
          if (Math.abs(dx) > 6) moved.current = true;
          angle.current = drag.current.a + dx * 0.28;
          target.current = angle.current;
          setShown(angle.current);
        }}
        onPointerUp={() => {
          drag.current = null;
          const snapped = Math.round(angle.current / step) * step;
          target.current = snapped;
          idle.current = 0;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div className="absolute top-1/2 left-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
          {relics.map((relic, i) => {
            const place = wrap(i * step + shown) / step;
            const distance = Math.abs(place);
            const x = place * (wide ? size * 1.38 : size * 1.42);
            const rot = -place * 34;
            const z = -distance * 80;
            const scale = Math.max(0.62, 1 - distance * 0.24);
            return (
              <button
                key={relic.id}
                type="button"
                className="absolute top-0 left-0"
                style={{
                  width: size,
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale}) translate(-50%, -50%)`,
                  transformStyle: "preserve-3d",
                  zIndex: Math.round(100 - distance * 10),
                  opacity: distance > 1.25 ? 0 : distance > 0.35 ? 0.8 : 1,
                  pointerEvents: distance > 0.45 ? "none" : "auto",
                }}
                onClick={() => {
                  if (!moved.current) navigate({ to: "/relics/$id", params: { id: relic.id } });
                }}
              >
                <img
                  src={relic.image}
                  alt={relic.name}
                  draggable={false}
                  className="relic-float aspect-[3/4] w-full object-contain"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center">
        <p className="font-display text-3xl leading-none tracking-wide text-parchment sm:text-5xl">{front.name}</p>
        <p className="mt-2 font-mono text-xs tracking-widest text-gold">
          {front.number} · {inr(front.price)} · DRAG TO ROLL
        </p>
      </div>
    </section>
  );
}

export function RelicCard({ relic }: { relic: Relic }) {
  const status = relic.status === "AVAILABLE" ? "AVAILABLE" : relic.status;
  return (
    <Link to="/relics/$id" params={{ id: relic.id }} className="block bg-surface">
      <div className="flex aspect-square items-center justify-center bg-bg">
        <img src={relic.image} alt={relic.name} className="h-[88%] w-[88%] object-contain" />
      </div>
      <div className="space-y-1 px-3 py-3">
        <p className="font-mono text-xs tracking-widest text-gold">{relic.number}</p>
        <h3 className="font-display text-2xl leading-none tracking-wide text-parchment">{relic.name}</h3>
        <div className="flex items-baseline justify-between gap-2 pt-1">
          <p className="font-mono text-xs text-parchment">{inr(relic.price)}</p>
          <p className="font-mono text-xs text-muted">{status}</p>
        </div>
      </div>
    </Link>
  );
}

export function Band({
  id,
  index,
  title,
  note,
  relics,
}: {
  id: string;
  index: string;
  title: string;
  note: string;
  relics: Relic[];
}) {
  return (
    <section id={id} className="archive-anchor mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex items-end justify-between gap-4 border-b border-forest pb-3">
        <div>
          <p className="font-mono text-xs tracking-widest text-gold">{index}</p>
          <h2 className="mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl">{title}</h2>
        </div>
        <p className="font-mono text-xs text-muted">{relics.length}</p>
      </div>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{note}</p>
      <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {relics.map((relic) => (
          <li key={relic.id}>
            <RelicCard relic={relic} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Turner({ relic }: { relic: Relic }) {
  const frames = framesOf(relic);
  const many = frames.length > 1;
  const [index, setIndex] = useState(0);
  const bob = useRef(0);
  const sway = useRef(0);
  const drag = useRef<{ x: number; a: number } | null>(null);
  const [pose, setPose] = useState({ bob: 0, sway: 0 });

  useEffect(() => {
    if (many) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let then = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - then) / 1000);
      then = now;
      bob.current += dt;
      if (!drag.current) sway.current += dt * 46;
      setPose({ bob: Math.sin(bob.current * 1.25) * 10, sway: sway.current });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [many]);

  return (
    <div
      className="touch-none bg-bg"
      style={{ perspective: "900px" }}
      onPointerDown={(event) => {
        drag.current = { x: event.clientX, a: many ? index : sway.current };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!drag.current || many) return;
        sway.current = drag.current.a + (event.clientX - drag.current.x) * 0.35;
        setPose((pose) => ({ ...pose, sway: sway.current }));
      }}
      onPointerUp={(event) => {
        if (many && drag.current) {
          const dx = event.clientX - drag.current.x;
          if (dx > 36) setIndex((i) => (i - 1 + frames.length) % frames.length);
          else if (dx < -36) setIndex((i) => (i + 1) % frames.length);
        }
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
    >
      <img
        src={frames[index] ?? relic.image}
        alt={relic.name}
        draggable={false}
        className="aspect-[3/4] w-full object-contain"
        style={many ? undefined : { transform: `translateY(${pose.bob}px) rotateY(${pose.sway}deg)`, transformStyle: "preserve-3d" }}
      />
      <p className="pb-3 text-center font-mono text-xs tracking-widest text-muted">
        {many ? "DRAG TO TURN" : "DRAG TO TURN"}
      </p>
    </div>
  );
}
