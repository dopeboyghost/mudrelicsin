import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$2 } from "./router-y5ERw4LI.mjs";
import { i as SiteHeader } from "./archive-Bi0TZYEN.mjs";
import { t as formatPaise } from "./use-stock-WBNX6GN0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._id-Z0Qvbg97.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrderPage() {
	const { id } = Route$2.useParams();
	const { t } = Route$2.useSearch();
	const [order, setOrder] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!t) {
			setError("This confirmation link is incomplete.");
			return;
		}
		let cancel = false;
		fetch("/api/checkout", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				action: "read",
				orderId: id,
				token: t
			})
		}).then(async (response) => ({
			ok: response.ok,
			body: await response.json()
		})).then((result) => {
			if (cancel) return;
			if (!result.ok) setError(result.body.error ?? "Order not found.");
			else setOrder(result.body.order);
		}).catch(() => {
			if (!cancel) setError("The order could not be opened.");
		});
		return () => {
			cancel = true;
		};
	}, [id, t]);
	const paid = order?.status === "PAID" || order?.status === "PROCESSING" || order?.status === "SHIPPED" || order?.status === "DELIVERED";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "archive-field min-h-dvh text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "on-swirl mx-auto max-w-3xl px-4 py-8 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-gold",
					children: paid ? "ORDER CONFIRMED" : "ORDER"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-4xl text-parchment",
					children: paid ? "The archive has the payment." : order ? order.status.replaceAll("_", " ") : "Looking up the order"
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-gold",
					children: error
				}) : null,
				order ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [
						paid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-sm leading-relaxed text-fg",
							children: "Payment was verified. This piece is now held for dispatch from Kochi."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-sm leading-relaxed text-fg",
							children: "This order is not confirmed. Payment has not been verified."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-6 border-y border-forest font-mono text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Order",
									value: order.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Status",
									value: order.status
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Payment",
									value: order.paymentId ?? "Not verified"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Ship to",
									value: `${order.name}, ${order.address}, ${order.city}, ${order.state} ${order.pin}, ${order.country}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Shipping",
									value: formatPaise(order.shippingPaise)
								}),
								order.taxPaise > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Tax",
									value: formatPaise(order.taxPaise)
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Paid",
									value: paid ? formatPaise(order.amountPaise) : formatPaise(0)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 divide-y divide-forest border-y border-forest",
							children: order.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-4 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: "",
									className: "h-24 w-20 object-contain"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-gold",
										children: item.number
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-3xl leading-none",
										children: item.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 font-mono text-sm text-gold",
										children: [
											formatPaise(item.pricePaise),
											" · QTY ",
											item.quantity
										]
									})
								] })]
							}, item.id))
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-8 inline-flex min-h-11 items-center font-mono text-xs tracking-widest text-gold",
					children: "BACK TO THE ARCHIVE"
				})
			]
		})]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-4 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs tracking-widest text-muted",
			children: label.toUpperCase()
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "max-w-[16rem] text-right text-parchment sm:max-w-md",
			children: value
		})]
	});
}
//#endregion
export { OrderPage as component };
