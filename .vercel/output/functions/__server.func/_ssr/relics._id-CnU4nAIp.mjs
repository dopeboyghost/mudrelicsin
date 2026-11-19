import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as inr, l as useCart, n as Route$1, o as relicById, s as relics } from "./router-y5ERw4LI.mjs";
import { a as Turner, i as SiteHeader } from "./archive-Bi0TZYEN.mjs";
import { n as useStock } from "./use-stock-WBNX6GN0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/relics._id-CnU4nAIp.js
var import_jsx_runtime = require_jsx_runtime();
function RelicPage() {
	const { id } = Route$1.useParams();
	const relic = relicById(id);
	const cart = useCart();
	const stock = useStock(relic ? [relic.id] : []);
	if (!relic) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "on-swirl mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-6 text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-4xl text-parchment",
			children: "Not in the archive"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-6 inline-flex min-h-11 items-center font-mono text-sm text-gold",
			children: "Back to the archive"
		})]
	});
	const index = relics.findIndex((item) => item.id === relic.id);
	const previous = index > 0 ? relics[index - 1] : void 0;
	const next = index < relics.length - 1 ? relics[index + 1] : void 0;
	const held = cart.has(relic.id);
	const open = relic.status === "AVAILABLE" && !stock.blocked.has(relic.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "archive-field min-h-dvh text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto grid max-w-5xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Turner, { relic }), relic.card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "mt-4 border border-forest bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: relic.card,
					alt: `${relic.name} archive card`,
					loading: "lazy",
					decoding: "async",
					className: "w-full"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "mt-2 font-mono text-xs tracking-widest text-muted",
					children: "ARCHIVE CARD"
				})]
			}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "on-swirl",
				children: [
					relic.number ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-gold",
						children: relic.number
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-5xl leading-none tracking-wide text-parchment sm:text-7xl",
						children: relic.name
					}),
					relic.price != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 font-display text-4xl text-gold",
						children: inr(relic.price)
					}) : null,
					open && relic.price != null ? held ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cart",
						className: "mt-5 inline-flex min-h-11 w-full items-center justify-center bg-blood font-mono text-xs tracking-widest text-parchment sm:w-auto sm:px-8",
						children: "IN THE CART"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => cart.add(relic.id),
						className: "mt-5 inline-flex min-h-11 w-full items-center justify-center bg-blood font-mono text-xs tracking-widest text-parchment sm:w-auto sm:px-8",
						children: "ADD TO CART"
					}) : relic.price != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 font-mono text-xs tracking-widest text-muted",
						children: relic.status
					}) : null,
					relic.explain ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-base leading-relaxed text-fg",
						children: relic.explain
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-8 border-t border-forest font-mono text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Class",
								value: relic.category
							}),
							relic.material ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Material",
								value: relic.material
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Edition",
								value: relic.edition
							}),
							relic.condition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Condition",
								value: relic.condition
							}) : null,
							relic.price != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Price",
								value: inr(relic.price)
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Availability",
								value: open ? "Available" : relic.status === "SOLD" ? "Sold" : "Held"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Made by",
								value: `${relic.artistLabel} · ${relic.city}`
							})
						]
					}),
					relic.lore ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 border border-forest bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-gold",
							children: "ARCHIVE NOTE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-fg",
							children: relic.lore
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid grid-cols-2 gap-3",
						children: [previous ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/relics/$id",
							params: { id: previous.id },
							className: "min-h-11 border border-forest px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted",
								children: "PREVIOUS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl leading-none",
								children: previous.name
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/relics/$id",
							params: { id: next.id },
							className: "min-h-11 border border-forest px-3 py-3 text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted",
								children: "NEXT"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl leading-none",
								children: next.name
							})]
						}) : null]
					})
				]
			})]
		})]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-6 border-b border-forest py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right text-parchment",
			children: value
		})]
	});
}
//#endregion
export { RelicPage as component };
