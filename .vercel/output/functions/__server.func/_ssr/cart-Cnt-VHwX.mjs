import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as inr, l as useCart, o as relicById } from "./router-y5ERw4LI.mjs";
import { i as SiteHeader } from "./archive-Bi0TZYEN.mjs";
import { n as useStock } from "./use-stock-WBNX6GN0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-Cnt-VHwX.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { ids, remove } = useCart();
	const held = ids.map((id) => relicById(id)).filter((relic) => !!relic);
	const stock = useStock(held.map((relic) => relic.id));
	const purchasable = held.filter((relic) => relic.status === "AVAILABLE" && relic.price != null && !stock.blocked.has(relic.id));
	const total = purchasable.reduce((sum, relic) => sum + (relic.price ?? 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "archive-field min-h-dvh text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "on-swirl mx-auto max-w-3xl px-4 py-8 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-gold",
					children: "CART"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-4xl text-parchment",
					children: "What you found"
				}),
				held.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base leading-relaxed text-fg",
						children: "The cart is empty."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						hash: "archive",
						className: "mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment",
						children: "ENTER THE ARCHIVE"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 divide-y divide-forest border-y border-forest",
						children: held.map((relic) => {
							const blocked = relic.status !== "AVAILABLE" || stock.blocked.has(relic.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-4 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/relics/$id",
									params: { id: relic.id },
									className: "block w-24 shrink-0 bg-surface",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: relic.image,
										alt: "",
										className: "aspect-[3/4] w-full object-contain"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 flex-1 flex-col",
									children: [
										relic.number ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-xs tracking-widest text-gold",
											children: relic.number
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/relics/$id",
											params: { id: relic.id },
											className: "mt-1 font-display text-3xl leading-none",
											children: relic.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-mono text-sm text-gold",
											children: relic.price != null ? inr(relic.price) : ""
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-xs text-muted",
											children: ["QTY 1 · ", relic.edition]
										}),
										blocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-mono text-xs tracking-widest text-muted",
											children: "NOT AVAILABLE"
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => remove(relic.id),
											className: "mt-auto inline-flex min-h-11 items-center self-start font-mono text-xs tracking-widest text-gold",
											children: "REMOVE"
										})
									]
								})]
							}, relic.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-muted",
							children: "ITEMS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl text-gold",
							children: inr(total)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm leading-relaxed text-fg",
						children: "These are one of one, so the quantity stays at 1. Shipping is added at checkout only if a charge has been configured. Nothing is paid on this page."
					}),
					purchasable.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/checkout",
						className: "mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment",
						children: "CHECKOUT"
					}) : null
				] })
			]
		})]
	});
}
//#endregion
export { CartPage as component };
