import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Radio, s as relics } from "./router-y5ERw4LI.mjs";
import { i as SiteHeader, n as RelicCard, r as Roll, t as Band } from "./archive-Bi0TZYEN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CoasW_lP.js
var import_jsx_runtime = require_jsx_runtime();
var oneOfOne = [
	"018",
	"009",
	"003"
];
var flameCombos = /* @__PURE__ */ new Set([
	"001",
	"002",
	"003",
	"004"
]);
var catchallIds = /* @__PURE__ */ new Set(["006", "009"]);
var vesselIds = /* @__PURE__ */ new Set(["019", "025"]);
var smokeIds = /* @__PURE__ */ new Set(["029"]);
var displayIds = /* @__PURE__ */ new Set(["018"]);
var wings = [
	{
		id: "flame",
		label: "FLAME",
		index: "01 · FLAME",
		title: "Flame",
		note: "Sculpted lighter cases, strange little fire companions and lighter-and-ashtray combinations. Objects made to give an everyday flame an entirely different personality.",
		pick: (relic) => relic.kind === "lighter" || flameCombos.has(relic.id)
	},
	{
		id: "catchalls",
		label: "CATCHALLS",
		index: "02 · CATCHALLS",
		title: "Catchalls",
		note: "Strange little landing places for the things you carry. Ring dishes, trinket trays, jewellery dishes and sculptural ashtrays.",
		pick: (relic) => catchallIds.has(relic.id)
	},
	{
		id: "vessels",
		label: "VESSELS",
		index: "03 · VESSELS",
		title: "Vessels",
		note: "Containers from another dimension. Sculptural jars, unusual storage objects and curious little vessels designed to hold your treasures.",
		pick: (relic) => vesselIds.has(relic.id)
	},
	{
		id: "smoke-rituals",
		label: "SMOKE RITUALS",
		index: "04 · SMOKE RITUALS",
		title: "Smoke rituals",
		note: "Objects for smoke, scent and slow moments. Incense holders and sculptural burners that turn everyday rituals into something unusual.",
		pick: (relic) => smokeIds.has(relic.id)
	},
	{
		id: "display-relics",
		label: "DISPLAY RELICS",
		index: "05 · DISPLAY RELICS",
		title: "Display relics",
		note: "Give your favourite possessions a place of their own. Sculptural stands for chains, watches, necklaces and other treasured objects.",
		pick: (relic) => displayIds.has(relic.id)
	},
	{
		id: "wearables",
		label: "WEARABLES",
		index: "06 · WEARABLES",
		title: "Wearables",
		note: "Tiny artifacts made to leave the archive. Handmade pendants, mutant faces, strange symbols, keychains and wearable curiosities.",
		pick: () => false
	}
];
function Home() {
	const recovered = [...relics].slice(-6).reverse();
	const singles = oneOfOne.map((id) => relics.find((relic) => relic.id === id)).filter((relic) => !!relic);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "archive-field min-h-dvh text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "archive-hero relative flex flex-col justify-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/archive/found.jpg",
							alt: "Handmade relics gathered on black cloth",
							className: "absolute inset-0 h-full w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-scrim absolute inset-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative px-4 py-8 sm:px-8 sm:py-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/mud-relics-logo.png",
									alt: "MUD RELICS",
									className: "brand-mark h-20 w-auto sm:h-28"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 max-w-sm font-serif text-2xl leading-tight tracking-wide text-parchment uppercase sm:text-4xl",
									children: "You didn't buy it. You found it."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#roll",
									className: "mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment",
									children: "ENTER THE ARCHIVE"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "wing-nav flex gap-4 overflow-x-auto border-b border-forest bg-bg px-4 py-1 font-mono text-xs tracking-widest text-gold sm:px-6",
					children: wings.map((wing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${wing.id}`,
						className: "inline-flex min-h-11 shrink-0 items-center",
						children: wing.label
					}, wing.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "roll",
					className: "archive-anchor border-b border-forest bg-bg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roll, { relics })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "recovered",
					className: "archive-anchor mx-auto max-w-6xl px-4 py-8 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "on-swirl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-gold",
							children: "01"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl",
							children: "Recently recovered"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3",
						children: recovered.map((relic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelicCard, { relic }) }, relic.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto grid max-w-6xl items-center gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/archive/chamber.jpg",
						alt: "Lighter cases and a toothed ashtray in front of a skull",
						className: "aspect-[3/4] w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "on-swirl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tracking-widest text-gold",
								children: "THE ARCHIVE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-serif text-2xl leading-snug text-parchment sm:text-3xl",
								children: "Some things are made. Some things are recovered. Some things should have stayed buried."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-md text-sm leading-relaxed text-fg",
								children: "Handmade in Kochi by DBG and Paru. Air-dry clay, one of one. The cracks stay."
							})
						]
					})]
				}),
				wings.map((wing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Band, {
					id: wing.id,
					index: wing.index,
					title: wing.title,
					note: wing.note,
					relics: relics.filter(wing.pick)
				}, wing.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "on-swirl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-gold",
							children: "05 · ONE OF ONE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl",
							children: "One of one"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 grid gap-3 sm:grid-cols-3",
						children: singles.map((relic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelicCard, { relic }) }, relic.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "archive",
					className: "archive-anchor mx-auto max-w-6xl px-4 py-8 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "on-swirl border-b border-forest pb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tracking-widest text-gold",
								children: "06 · RELIC ARCHIVE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-serif text-3xl tracking-wide text-parchment sm:text-4xl",
								children: "Relic archive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-mono text-xs text-fg",
								children: [relics.length, " OBJECTS · KOCHI"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4",
						children: relics.map((relic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelicCard, { relic }) }, relic.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "dispatch",
					className: "border-t border-forest bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tracking-widest text-gold",
								children: "ARCHIVE DISPATCH"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 max-w-lg font-serif text-3xl leading-tight text-parchment",
								children: "New recoveries leave Kochi in small numbers."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-md text-sm leading-relaxed text-fg",
								children: "There is no mailing list on this archive. The objects are the dispatch. Nothing here is charged until you settle it with the makers."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#archive",
								className: "mt-6 inline-flex min-h-11 items-center border border-gold px-5 font-mono text-xs tracking-widest text-parchment",
								children: "OPEN THE FULL ARCHIVE"
							})
						]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-4 pb-10 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "on-swirl mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-8 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-muted",
					children: "DBG × PARU · KOCHI"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-gold",
					children: "MUD RELICS"
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
