import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useCart } from "./router-y5ERw4LI.mjs";
import { i as SiteHeader } from "./archive-Bi0TZYEN.mjs";
import { t as formatPaise } from "./use-stock-WBNX6GN0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-D4nrbA4R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyCustomer = {
	name: "",
	email: "",
	phone: "",
	address: "",
	city: "",
	state: "",
	pin: "",
	country: "India"
};
function CheckoutPage() {
	const { ids, clear } = useCart();
	const navigate = useNavigate();
	const [customer, setCustomer] = (0, import_react.useState)(emptyCustomer);
	const [quote, setQuote] = (0, import_react.useState)(null);
	const [taxConfigured, setTaxConfigured] = (0, import_react.useState)(false);
	const [configured, setConfigured] = (0, import_react.useState)(null);
	const [step, setStep] = (0, import_react.useState)("details");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (ids.length === 0) return;
		let cancel = false;
		fetch("/api/checkout", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				action: "quote",
				ids
			})
		}).then(async (response) => ({
			ok: response.ok,
			body: await response.json()
		})).then((result) => {
			if (cancel) return;
			setConfigured(Boolean(result.body.paymentsConfigured));
			setTaxConfigured(Boolean(result.body.taxConfigured));
			if (result.body.quote) setQuote(result.body.quote);
			else setError(result.body.error ?? "These pieces could not be quoted.");
		}).catch(() => {
			if (!cancel) setError("The archive could not price this dispatch.");
		});
		return () => {
			cancel = true;
		};
	}, [ids]);
	function field(key, label, type = "text", autoComplete = "on") {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mt-4 block font-mono text-xs tracking-widest text-muted",
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				required: true,
				type,
				autoComplete,
				value: customer[key],
				onChange: (event) => setCustomer((current) => ({
					...current,
					[key]: event.target.value
				})),
				className: "mt-2 w-full border border-forest bg-black px-3 py-3 font-sans text-base text-parchment outline-none focus:border-gold"
			})]
		});
	}
	async function pay() {
		setBusy(true);
		setError("");
		let session = null;
		try {
			const response = await fetch("/api/checkout", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "create",
					ids,
					customer
				})
			});
			const body = await response.json();
			if (!response.ok) {
				setError(body.error ?? "Payment did not start.");
				return;
			}
			session = {
				orderId: body.orderId,
				token: body.token
			};
			await openRazorpay(body, async (payment) => {
				const verified = await fetch("/api/checkout", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						action: "verify",
						orderId: body.orderId,
						token: body.token,
						...payment
					})
				});
				const result = await verified.json();
				if (!verified.ok || !result.paid) throw new Error(result.error ?? "Payment was not confirmed.");
				clear();
				navigate({
					to: "/orders/$id",
					params: { id: body.orderId },
					search: { t: body.token }
				});
			}, async () => {
				await fetch("/api/checkout", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						action: "cancel",
						orderId: body.orderId,
						token: body.token
					})
				});
				session = null;
				setError("Checkout was closed. Nothing was charged.");
			});
		} catch (error) {
			if (session) await fetch("/api/checkout", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "cancel",
					orderId: session.orderId,
					token: session.token
				})
			}).catch(() => void 0);
			setError(error instanceof Error ? error.message : "Payment could not be opened.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "archive-field min-h-dvh text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "on-swirl mx-auto max-w-3xl px-4 py-8 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-gold",
					children: "CHECKOUT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-4xl text-parchment",
					children: "Dispatch"
				}),
				ids.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base text-fg",
						children: "The cart is empty."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						hash: "archive",
						className: "mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment",
						children: "ENTER THE ARCHIVE"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						configured === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "border border-forest bg-surface p-4 text-sm leading-relaxed text-fg",
							children: "Razorpay is not connected on this archive yet. You can review the dispatch, but Pay now will not take money until the merchant keys are added."
						}) : null,
						step === "details" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-4",
							onSubmit: (event) => {
								event.preventDefault();
								setError("");
								setStep("review");
							},
							children: [
								field("name", "FULL NAME", "text", "name"),
								field("email", "EMAIL", "email", "email"),
								field("phone", "MOBILE NUMBER", "tel", "tel"),
								field("address", "SHIPPING ADDRESS", "text", "street-address"),
								field("city", "CITY", "text", "address-level2"),
								field("state", "STATE", "text", "address-level1"),
								field("pin", "PIN CODE", "text", "postal-code"),
								field("country", "COUNTRY", "text", "country-name"),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "mt-6 inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment",
									children: "REVIEW ORDER"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "border-y border-forest font-mono text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Name",
										value: customer.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Email",
										value: customer.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Mobile",
										value: customer.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Address",
										value: `${customer.address}, ${customer.city}, ${customer.state} ${customer.pin}, ${customer.country}`
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setStep("details"),
									className: "inline-flex min-h-11 items-center border border-gold px-5 font-mono text-xs tracking-widest text-parchment",
									children: "EDIT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: busy || !quote,
									onClick: pay,
									className: "inline-flex min-h-11 items-center bg-blood px-5 font-mono text-xs tracking-widest text-parchment disabled:opacity-50",
									children: busy ? "OPENING" : "PAY NOW"
								})]
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-sm leading-relaxed text-gold",
							children: error
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "border border-forest bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tracking-widest text-gold",
								children: "ORDER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 divide-y divide-forest",
								children: (quote?.lines ?? []).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: line.image,
										alt: "",
										className: "h-20 w-16 object-contain"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-xs text-gold",
											children: line.number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-2xl leading-none",
											children: line.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 font-mono text-xs text-muted",
											children: ["QTY ", line.quantity]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-sm text-gold",
											children: formatPaise(line.pricePaise)
										})
									] })]
								}, line.id))
							}),
							quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 border-t border-forest pt-3 font-mono text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Items",
										value: formatPaise(quote.subtotalPaise)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Shipping",
										value: formatPaise(quote.shippingPaise)
									}),
									taxConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Tax",
										value: formatPaise(quote.taxPaise)
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-xs tracking-widest text-muted",
											children: "PAYABLE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "font-display text-3xl text-gold",
											children: formatPaise(quote.amountPaise)
										})]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted",
								children: "Pricing this dispatch."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs leading-relaxed text-muted",
								children: "One of one. Quantity stays at 1. The payable amount is calculated on the server from the archive prices."
							})
						]
					})]
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
			className: "text-right text-parchment",
			children: value
		})]
	});
}
async function openRazorpay(session, onSuccess, onDismiss) {
	await loadCheckout();
	const Razorpay = window.Razorpay;
	if (!Razorpay) throw new Error("missing checkout");
	await new Promise((resolve, reject) => {
		const checkout = new Razorpay({
			key: session.keyId,
			amount: session.amount,
			currency: session.currency,
			name: session.name,
			description: session.description,
			order_id: session.razorpayOrderId,
			prefill: session.prefill,
			theme: { color: "#55E8FF" },
			handler: (response) => {
				onSuccess(response).then(resolve).catch(reject);
			},
			modal: { ondismiss: () => {
				onDismiss().finally(resolve);
			} }
		});
		checkout.on("payment.failed", (response) => {
			reject(new Error(response.error?.description || "Payment failed"));
		});
		checkout.open();
	});
}
function loadCheckout() {
	if (window.Razorpay) return Promise.resolve();
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(/* @__PURE__ */ new Error("Razorpay checkout failed to load"));
		document.body.appendChild(script);
	});
}
//#endregion
export { CheckoutPage as component };
