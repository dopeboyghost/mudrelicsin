import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as inr, i as framesOf, l as useCart } from "./router-y5ERw4LI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/archive-Bi0TZYEN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nozzles = {
	"/relics/black-tongue.webp": {
		x: .419,
		y: .038
	},
	"/relics/red-many.webp": {
		x: .41,
		y: .036
	},
	"/relics/toxic-overgrowth.webp": {
		x: .523,
		y: .042
	},
	"/relics/ghostface.webp": {
		x: .5728,
		y: .044
	},
	"/relics/3-horned-sentinel/01-front.webp": {
		x: .4159,
		y: .036
	},
	"/relics/3-horned-sentinel/02-front.webp": {
		x: .4243,
		y: .036
	},
	"/relics/3-horned-sentinel/03-front.webp": {
		x: .5202,
		y: .138
	},
	"/relics/3-horned-sentinel/04-front.webp": {
		x: .5312,
		y: .26
	},
	"/relics/3-horned-sentinel/07-side.webp": {
		x: .36,
		y: .046
	},
	"/relics/3-horned-sentinel/08-side.webp": {
		x: .36,
		y: .046
	},
	"/relics/sea-mutant/01-front.webp": {
		x: .4781,
		y: .09
	},
	"/relics/sea-mutant/03-front.webp": {
		x: .4594,
		y: .096
	},
	"/relics/sea-mutant/06-side.webp": {
		x: .4203,
		y: .09
	},
	"/relics/fiery-worm/01-side.webp": {
		x: .4174,
		y: .105
	},
	"/relics/fiery-worm/02-front.webp": {
		x: .4762,
		y: .105
	},
	"/relics/fiery-worm/03-front.webp": {
		x: .4779,
		y: .105
	},
	"/relics/fiery-worm/04-side.webp": {
		x: .5407,
		y: .104
	},
	"/relics/fiery-worm/05-back.webp": {
		x: .5041,
		y: .103
	},
	"/relics/crimson-oracle/01-front.webp": {
		x: .5064,
		y: .104
	},
	"/relics/crimson-oracle/02-front.webp": {
		x: .5052,
		y: .105
	},
	"/relics/crimson-oracle/03-side.webp": {
		x: .4622,
		y: .104
	},
	"/relics/crimson-oracle/04-side.webp": {
		x: .5517,
		y: .105
	},
	"/relics/crimson-oracle/05-back.webp": {
		x: .539,
		y: .106
	},
	"/relics/blue-scarab/01-front.webp": {
		x: .5459,
		y: .104
	},
	"/relics/blue-scarab/02-side.webp": {
		x: .5174,
		y: .104
	},
	"/relics/blue-scarab/03-back.webp": {
		x: .4686,
		y: .105
	},
	"/relics/blue-scarab/04-side.webp": {
		x: .4913,
		y: .104
	}
};
function SiteHeader() {
	const { count } = useCart();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "gold-plate sticky top-0 z-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "flex min-w-0 items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/mud-relics-logo.png",
					alt: "MUD RELICS",
					className: "brand-mark h-11 w-auto sm:h-16"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/cart",
				className: "cart-link inline-flex min-h-11 shrink-0 items-center font-mono text-xs font-medium tracking-widest",
				children: ["CART", count > 0 ? ` · ${count}` : ""]
			})]
		})
	});
}
function wrap(angle) {
	let value = (angle % 360 + 360) % 360;
	if (value > 180) value -= 360;
	return value;
}
function Roll({ relics }) {
	const navigate = useNavigate();
	const count = relics.length;
	const angle = (0, import_react.useRef)(0);
	const target = (0, import_react.useRef)(0);
	const idle = (0, import_react.useRef)(0);
	const drag = (0, import_react.useRef)(null);
	const moved = (0, import_react.useRef)(false);
	const nodes = (0, import_react.useRef)([]);
	const [wide, setWide] = (0, import_react.useState)(false);
	const [caption, setCaption] = (0, import_react.useState)(0);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const query = window.matchMedia("(min-width: 640px)");
		const sync = () => setWide(query.matches);
		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);
	const size = wide ? 220 : 148;
	const step = 360 / count;
	(0, import_react.useEffect)(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let frame = 0;
		let then = performance.now();
		let last = -1;
		const place = (angleValue) => {
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
				const scale = Math.max(.62, 1 - distance * .24);
				el.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale}) translate(-50%, -50%)`;
				el.style.zIndex = String(Math.round(100 - distance * 10));
				el.style.opacity = distance > 1.25 ? "0" : distance > .35 ? "0.8" : "1";
				el.style.pointerEvents = distance > .45 ? "none" : "auto";
				if (distance < best) {
					best = distance;
					nearest = i;
				}
			}
			return nearest;
		};
		const tick = (now) => {
			const dt = Math.min(.05, (now - then) / 1e3);
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
	}, [
		step,
		count,
		size,
		wide
	]);
	const front = relics[caption];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative h-[28rem] touch-none select-none sm:h-[36rem]",
			style: { perspective: "1100px" },
			onPointerDown: (event) => {
				moved.current = false;
				drag.current = {
					x: event.clientX,
					a: angle.current
				};
				event.currentTarget.setPointerCapture(event.pointerId);
			},
			onPointerMove: (event) => {
				if (!drag.current) return;
				const dx = event.clientX - drag.current.x;
				if (Math.abs(dx) > 6) moved.current = true;
				angle.current = drag.current.a + dx * .28;
				target.current = angle.current;
			},
			onPointerUp: () => {
				drag.current = null;
				const snapped = Math.round(angle.current / step) * step;
				target.current = snapped;
				idle.current = 0;
			},
			onPointerCancel: () => {
				drag.current = null;
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-1/2 left-1/2 h-0 w-0",
				style: {
					transformStyle: "preserve-3d",
					visibility: ready ? "visible" : "hidden"
				},
				children: relics.map((relic, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					ref: (node) => {
						nodes.current[i] = node;
					},
					className: "absolute top-0 left-0",
					style: {
						width: size,
						transformStyle: "preserve-3d"
					},
					onClick: () => {
						if (!moved.current) navigate({
							to: "/relics/$id",
							params: { id: relic.id }
						});
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: relic.image,
						alt: relic.name,
						draggable: false,
						className: "relic-float aspect-[3/4] w-full object-contain",
						style: { animationDelay: `${i * .4}s` }
					})
				}, relic.id))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-x-0 bottom-2 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl leading-none tracking-wide text-parchment sm:text-5xl",
				children: front.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-xs tracking-widest text-gold",
				children: [
					front.number ? `${front.number} · ` : "",
					front.price != null ? `${inr(front.price)} · ` : "",
					"DRAG TO ROLL"
				]
			})]
		})]
	});
}
function RelicCard({ relic }) {
	const status = relic.status === "AVAILABLE" ? "AVAILABLE" : relic.status;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/relics/$id",
		params: { id: relic.id },
		className: "block bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex aspect-square items-center justify-center bg-bg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: relic.image,
				alt: relic.name,
				loading: "lazy",
				decoding: "async",
				className: "h-[88%] w-[88%] object-contain"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1 px-3 py-3",
			children: [
				relic.number ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-gold",
					children: relic.number
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl leading-none tracking-wide text-parchment",
					children: relic.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-gold",
						children: relic.price != null ? inr(relic.price) : ""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted",
						children: status
					})]
				})
			]
		})]
	});
}
function Band({ id, index, title, note, relics }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id,
		className: "archive-anchor mx-auto max-w-6xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "on-swirl flex items-end justify-between gap-4 border-b border-forest pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-gold",
					children: index
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl",
					children: title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-muted",
					children: relics.length
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "on-swirl mt-3 max-w-md text-sm leading-relaxed text-fg",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: relics.map((relic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelicCard, { relic }) }, relic.id))
			})
		]
	});
}
function Turner({ relic }) {
	const frames = framesOf(relic);
	const many = frames.length > 1;
	const canIgnite = frames.some((src) => nozzles[src.split("?")[0] ?? ""]);
	const [live, setLive] = (0, import_react.useState)(0);
	const [lit, setLit] = (0, import_react.useState)(false);
	const [flame, setFlame] = (0, import_react.useState)(null);
	const indexRef = (0, import_react.useRef)(0);
	const progress = (0, import_react.useRef)(0);
	const stageRef = (0, import_react.useRef)(null);
	const imgs = (0, import_react.useRef)([]);
	const drag = (0, import_react.useRef)(null);
	const paint = (value) => {
		const count = frames.length;
		if (count <= 1) return;
		const wrapped = (value % count + count) % count;
		const base = Math.floor(wrapped);
		const frac = wrapped - base;
		const next = (base + 1) % count;
		const shown = frac < .5 ? base : next;
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
	(0, import_react.useLayoutEffect)(() => {
		paint(progress.current);
	});
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		if (!many) return;
		for (const src of frames) {
			const img = new Image();
			img.src = src;
		}
	}, [many, frames]);
	(0, import_react.useEffect)(() => {
		const node = stageRef.current;
		if (!node || !many) return;
		const onWheel = (event) => {
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
	(0, import_react.useEffect)(() => {
		if (!lit) {
			setFlame(null);
			return;
		}
		const placeFlame = () => {
			const stage = stageRef.current;
			const img = stage?.querySelector("img[data-live='1']");
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
			const height = Math.max(20, dh * .052);
			const width = Math.max(7, height * .32);
			setFlame({
				left: (box.width - dw) / 2 + tip.x * dw,
				top: (box.height - dh) / 2 + tip.y * dh,
				width,
				height
			});
		};
		placeFlame();
		window.addEventListener("resize", placeFlame);
		return () => window.removeEventListener("resize", placeFlame);
	}, [
		lit,
		live,
		frames
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: stageRef,
			className: "relative mx-auto aspect-[3/4] w-[88%] bg-bg select-none lg:w-[86%]",
			style: { touchAction: many ? "pan-y" : void 0 },
			onPointerDown: (event) => {
				if (!many) return;
				drag.current = {
					x: event.clientX,
					y: event.clientY,
					locked: null
				};
			},
			onPointerMove: (event) => {
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
			},
			onPointerUp: (event) => {
				drag.current = null;
				event.currentTarget.style.touchAction = many ? "pan-y" : "";
			},
			onPointerCancel: (event) => {
				drag.current = null;
				event.currentTarget.style.touchAction = many ? "pan-y" : "";
			},
			children: [frames.map((src, frame) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				ref: (node) => {
					imgs.current[frame] = node;
				},
				src,
				alt: frame === live ? relic.name : "",
				draggable: false,
				decoding: "async",
				className: "absolute inset-0 h-full w-full object-contain"
			}, src + frame)), lit && flame ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "nozzle-flame",
				style: {
					left: flame.left,
					top: flame.top,
					width: flame.width,
					height: flame.height
				},
				"aria-hidden": "true"
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "pb-2 pt-2 text-center font-mono text-xs tracking-widest text-muted",
			children: many ? "DRAG TO INSPECT" : "ONE ANGLE"
		}),
		canIgnite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-pressed": lit,
			onClick: () => setLit((on) => !on),
			className: "mx-auto mb-3 flex min-h-11 items-center px-4 font-mono text-xs tracking-widest text-gold",
			children: lit ? "EXTINGUISH" : "IGNITE"
		}) : null
	] });
}
//#endregion
export { Turner as a, SiteHeader as i, RelicCard as n, Roll as r, Band as t };
