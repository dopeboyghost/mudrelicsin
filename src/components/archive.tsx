import { Link } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { framesOf, inr, type Relic } from "@/data/catalog";
import { nozzles } from "@/data/nozzles";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="gold-plate sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center">
          <img src="/mud-relics-logo.webp" alt="MUD RELICS" className="brand-mark h-11 w-auto sm:h-16" />
        </Link>
        <Link to="/cart" className="cart-link inline-flex min-h-11 shrink-0 items-center font-mono text-xs font-medium tracking-widest">
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
  const count = relics.length;
  const angle = useRef(0);
  const target = useRef(0);
  const idle = useRef(0);
  const drag = useRef<{ x: number; a: number; captured: boolean } | null>(null);
  const moved = useRef(false);
  const nodes = useRef<(HTMLAnchorElement | null)[]>([]);
  const [wide, setWide] = useState(false);
  const [caption, setCaption] = useState(0);
  const [ready, setReady] = useState(false);

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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let then = performance.now();
    let last = -1;
    const place = (angleValue: number) => {
      let nearest = 0;
      let best = Infinity;
      for (let i = 0; i < count; i++) {
        const el = nodes.current[i];
        if (!el) continue;
        const placeValue = wrap(i * step + angleValue) / step;
        const distance = Math.abs(placeValue);
        const x = placeValue * (wide ? size * 1.38 : size * 1.42);
        const rot = -placeValue * 34;
        const z = -distance * 80;
        const scale = Math.max(0.62, 1 - distance * 0.24);
        el.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale}) translate(-50%, -50%)`;
        el.style.zIndex = String(Math.round(100 - distance * 10));
        el.style.opacity = distance > 1.25 ? "0" : distance > 0.35 ? "0.8" : "1";
        el.style.pointerEvents = distance > 1.25 ? "none" : "auto";
        if (distance < best) {
          best = distance;
          nearest = i;
        }
      }
      return nearest;
    };
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - then) / 1000);
      then = now;
      if (!drag.current && !reduced) {
        idle.current += dt;
        if (idle.current > 2.6) {
          idle.current = 0;
          target.current += step;
        }
        const delta = wrap(target.current - angle.current);
        angle.current += delta * Math.min(1, dt * 4);
      }
      const nearest = place(angle.current);
      if (nearest !== last) {
        last = nearest;
        setCaption(nearest);
      }
      frame = requestAnimationFrame(tick);
    };
    setCaption(place(angle.current));
    setReady(true);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [step, count, size, wide]);

  const front = relics[caption];

  return (
    <section className="relative overflow-hidden">
      <div
        className="relative h-[28rem] touch-none select-none sm:h-[36rem]"
        style={{ perspective: "1100px" }}
        onPointerDown={(event) => {
          moved.current = false;
          drag.current = { x: event.clientX, a: angle.current, captured: false };
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const dx = event.clientX - drag.current.x;
          if (Math.abs(dx) > 6) {
            moved.current = true;
            if (!drag.current.captured) {
              event.currentTarget.setPointerCapture(event.pointerId);
              drag.current.captured = true;
            }
          }
          if (!moved.current) return;
          angle.current = drag.current.a + dx * 0.28;
          target.current = angle.current;
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
        <div className="absolute top-1/2 left-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d", visibility: ready ? "visible" : "hidden" }}>
          {relics.map((relic, i) => (
            <Link
              key={relic.id}
              to="/relics/$id"
              params={{ id: relic.id }}
              aria-label={`${relic.name}${relic.number ? `, ${relic.number}` : ""}`}
              ref={(node) => {
                nodes.current[i] = node;
              }}
              draggable={false}
              className="relic-hit absolute top-0 left-0"
              style={{ width: size, transformStyle: "preserve-3d" }}
              onClick={(event) => {
                if (moved.current) event.preventDefault();
              }}
            >
              <img
                src={relic.image}
                alt={relic.name}
                draggable={false}
                className="relic-float aspect-[3/4] w-full object-contain"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            </Link>
          ))}
        </div>
      </div>
      <Link
        to="/relics/$id"
        params={{ id: front.id }}
        className="relic-caption absolute inset-x-0 bottom-2 block text-center"
      >
        <p className="font-display text-3xl leading-none tracking-wide text-parchment sm:text-5xl">{front.name}</p>
        <p className="mt-2 font-mono text-xs tracking-widest text-gold">
          {front.number ? `${front.number} · ` : ""}
          {front.price != null ? `${inr(front.price)} · ` : ""}DRAG TO ROLL
        </p>
      </Link>
    </section>
  );
}

export function RelicCard({ relic }: { relic: Relic }) {
  const status = relic.status === "AVAILABLE" ? "AVAILABLE" : relic.status;
  return (
    <Link to="/relics/$id" params={{ id: relic.id }} className="block bg-surface">
      <div className="flex aspect-square items-center justify-center bg-bg">
        <img src={relic.image} alt={relic.name} loading="lazy" decoding="async" className="h-[88%] w-[88%] object-contain" />
      </div>
      <div className="space-y-1 px-3 py-3">
        {relic.number ? <p className="font-mono text-xs tracking-widest text-gold">{relic.number}</p> : null}
        <h3 className="font-display text-2xl leading-none tracking-wide text-parchment">{relic.name}</h3>
        <div className="flex items-baseline justify-between gap-2 pt-1">
          <p className="font-mono text-xs text-gold">{relic.price != null ? inr(relic.price) : ""}</p>
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
      <div className="on-swirl flex items-end justify-between gap-4 border-b border-forest pb-3">
        <div>
          <p className="font-mono text-xs tracking-widest text-gold">{index}</p>
          <h2 className="mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl">{title}</h2>
        </div>
        <p className="font-mono text-xs text-muted">{relics.length}</p>
      </div>
      <p className="on-swirl mt-3 max-w-md text-sm leading-relaxed text-fg">{note}</p>
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
  const canIgnite = frames.some((src) => nozzles[src.split("?")[0] ?? ""]);
  const [live, setLive] = useState(0);
  const [lit, setLit] = useState(false);
  const [flame, setFlame] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const indexRef = useRef(0);
  const progress = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const drag = useRef<{ x: number; y: number; locked: boolean | null } | null>(null);

  const paint = (value: number) => {
    const count = frames.length;
    if (count <= 1) return;
    const wrapped = ((value % count) + count) % count;
    const base = Math.floor(wrapped);
    const frac = wrapped - base;
    const next = (base + 1) % count;
    const shown = frac < 0.5 ? base : next;
    for (let frame = 0; frame < count; frame++) {
      const img = imgs.current[frame];
      if (!img) continue;
      const opacity = frame === base ? 1 - frac : frame === next ? frac : 0;
      img.style.opacity = String(opacity);
      if (frame === shown) img.dataset.live = "1";
      else delete img.dataset.live;
    }
    if (shown !== indexRef.current) {
      indexRef.current = shown;
      setLive(shown);
    }
  };

  useLayoutEffect(() => {
    paint(progress.current);
  });

  useEffect(() => {
    progress.current = 0;
    indexRef.current = 0;
    setLive(0);
    setLit(false);
    imgs.current.forEach((img, frame) => {
      if (!img) return;
      img.style.opacity = frame === 0 ? "1" : "0";
      if (frame === 0) img.dataset.live = "1";
      else delete img.dataset.live;
    });
  }, [relic.id]);

  useEffect(() => {
    if (!many) return;
    for (const src of frames) {
      const img = new Image();
      img.src = src;
    }
  }, [many, frames]);

  useEffect(() => {
    const node = stageRef.current;
    if (!node || !many) return;
    const onWheel = (event: WheelEvent) => {
      const dx = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : 0;
      if (!dx) return;
      event.preventDefault();
      const width = node.clientWidth || 320;
      progress.current -= dx / Math.max(36, width / frames.length);
      paint(progress.current);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [many, frames]);

  useEffect(() => {
    if (!lit) {
      setFlame(null);
      return;
    }
    const placeFlame = () => {
      const stage = stageRef.current;
      const img = stage?.querySelector<HTMLImageElement>("img[data-live='1']");
      const tip = nozzles[frames[indexRef.current]?.split("?")[0] ?? ""];
      if (!stage || !img || !tip) {
        setFlame(null);
        return;
      }
      if (!img.naturalWidth) {
        img.addEventListener("load", placeFlame, { once: true });
        return;
      }
      const box = stage.getBoundingClientRect();
      const scale = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const height = Math.max(20, dh * 0.052);
      const width = Math.max(7, height * 0.32);
      setFlame({
        left: (box.width - dw) / 2 + tip.x * dw,
        top: (box.height - dh) / 2 + tip.y * dh,
        width,
        height,
      });
    };
    placeFlame();
    window.addEventListener("resize", placeFlame);
    return () => window.removeEventListener("resize", placeFlame);
  }, [lit, live, frames]);

  return (
    <div>
      <div
        ref={stageRef}
        className="relative mx-auto aspect-[3/4] w-[88%] bg-bg select-none lg:w-[86%]"
        style={{ touchAction: many ? "pan-y" : undefined }}
        onPointerDown={(event) => {
          if (!many) return;
          drag.current = { x: event.clientX, y: event.clientY, locked: null };
        }}
        onPointerMove={(event) => {
          if (!drag.current || !many) return;
          const dx = event.clientX - drag.current.x;
          const dy = event.clientY - drag.current.y;
          if (drag.current.locked === null) {
            if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
            drag.current.locked = Math.abs(dx) > Math.abs(dy);
            if (!drag.current.locked) {
              drag.current = null;
              return;
            }
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.style.touchAction = "none";
          }
          const stepX = event.clientX - drag.current.x;
          drag.current.x = event.clientX;
          const width = event.currentTarget.clientWidth || 320;
          progress.current -= stepX / Math.max(28, width / frames.length);
          paint(progress.current);
        }}
        onPointerUp={(event) => {
          drag.current = null;
          event.currentTarget.style.touchAction = many ? "pan-y" : "";
        }}
        onPointerCancel={(event) => {
          drag.current = null;
          event.currentTarget.style.touchAction = many ? "pan-y" : "";
        }}
      >
        {frames.map((src, frame) => (
          <img
            key={src + frame}
            ref={(node) => {
              imgs.current[frame] = node;
            }}
            src={src}
            alt={frame === live ? relic.name : ""}
            draggable={false}
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain"
          />
        ))}
        {lit && flame ? (
          <span
            className="nozzle-flame"
            style={{ left: flame.left, top: flame.top, width: flame.width, height: flame.height }}
            aria-hidden="true"
          />
        ) : null}
      </div>
      <p className="pb-2 pt-2 text-center font-mono text-xs tracking-widest text-muted">{many ? "DRAG TO INSPECT" : "ONE ANGLE"}</p>
      {canIgnite ? (
        <button
          type="button"
          aria-pressed={lit}
          onClick={() => setLit((on) => !on)}
          className="mx-auto mb-3 flex min-h-11 items-center px-4 font-mono text-xs tracking-widest text-gold"
        >
          {lit ? "EXTINGUISH" : "IGNITE"}
        </button>
      ) : null}
    </div>
  );
}
