//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CPe2WcPF.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/cart",
			"/checkout",
			"/api/checkout",
			"/api/create-order",
			"/api/stock",
			"/api/verify-payment",
			"/orders/$id",
			"/relics/$id",
			"/api/razorpay/webhook"
		],
		preloads: [
			"/assets/index-gj2HSa-e.js",
			"/assets/rolldown-runtime-CbXtAM7H.js",
			"/assets/cart-DLYFLF6e.js",
			"/assets/preload-helper-u3wnik6t.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-gj2HSa-e.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-DGbQtXEu.js", "/assets/archive-Xh6jeH8A.js"]
	},
	"/cart": {
		filePath: "/workspace/src/routes/cart.tsx",
		children: void 0,
		preloads: [
			"/assets/cart-kcL-fn9B.js",
			"/assets/archive-Xh6jeH8A.js",
			"/assets/use-stock-D3yZOoPf.js"
		]
	},
	"/checkout": {
		filePath: "/workspace/src/routes/checkout.tsx",
		children: void 0,
		preloads: [
			"/assets/checkout-DVjVikWO.js",
			"/assets/archive-Xh6jeH8A.js",
			"/assets/use-stock-D3yZOoPf.js"
		]
	},
	"/orders/$id": {
		filePath: "/workspace/src/routes/orders.$id.tsx",
		children: void 0,
		preloads: [
			"/assets/orders._id-D9RlF5rD.js",
			"/assets/archive-Xh6jeH8A.js",
			"/assets/use-stock-D3yZOoPf.js"
		]
	},
	"/relics/$id": {
		filePath: "/workspace/src/routes/relics.$id.tsx",
		children: void 0,
		preloads: [
			"/assets/relics._id-Bqhmwr2c.js",
			"/assets/archive-Xh6jeH8A.js",
			"/assets/use-stock-D3yZOoPf.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
