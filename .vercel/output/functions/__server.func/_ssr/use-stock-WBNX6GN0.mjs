import { o as __toESM } from "../_runtime.mjs";
import { J as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-stock-WBNX6GN0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useStock(ids) {
	const key = ids.filter(Boolean).slice().sort().join(",");
	const [sold, setSold] = (0, import_react.useState)([]);
	const [held, setHeld] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!key) return;
		let cancel = false;
		fetch(`/api/stock?ids=${key}`).then((response) => response.json()).then((data) => {
			if (cancel) return;
			setSold(data.sold ?? []);
			setHeld(data.held ?? []);
		}).catch(() => void 0);
		return () => {
			cancel = true;
		};
	}, [key]);
	return {
		sold,
		held,
		blocked: /* @__PURE__ */ new Set([...sold, ...held])
	};
}
function formatPaise(paise) {
	return `₹${(paise / 100).toLocaleString("en-IN", {
		minimumFractionDigits: paise % 100 ? 2 : 0,
		maximumFractionDigits: 2
	})}`;
}
//#endregion
export { useStock as n, formatPaise as t };
