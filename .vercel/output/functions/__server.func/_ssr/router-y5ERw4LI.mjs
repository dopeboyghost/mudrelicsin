import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as string, i as object, n as literal, o as union, r as number, t as array } from "../_libs/zod.mjs";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/router-y5ERw4LI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var KEY = "mr-cart";
var CartContext = (0, import_react.createContext)({
	ids: [],
	count: 0,
	has: () => false,
	add: () => {},
	remove: () => {},
	clear: () => {}
});
function CartProvider({ children }) {
	const [ids, setIds] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			const parsed = raw ? JSON.parse(raw) : [];
			if (Array.isArray(parsed)) setIds(parsed.filter((id) => typeof id === "string"));
		} catch {
			setIds([]);
		}
	}, []);
	function write(next) {
		setIds(next);
		localStorage.setItem(KEY, JSON.stringify(next));
	}
	const value = {
		ids,
		count: ids.length,
		has: (id) => ids.includes(id),
		add: (id) => {
			if (ids.includes(id)) return;
			write([...ids, id]);
		},
		remove: (id) => write(ids.filter((item) => item !== id)),
		clear: () => write([])
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	return (0, import_react.useContext)(CartContext);
}
var tracks = [
	{
		title: "DOPAMINE LOOP",
		artist: "INFINITE",
		src: "/audio/dopamine-loop.mp3"
	},
	{
		title: "KOTTA GHOST",
		artist: "",
		src: "/audio/kotta-ghost.mp3"
	},
	{
		title: "REVATI",
		artist: "INFINITE",
		src: "/audio/revati.mp3"
	},
	{
		title: "URAK BABY",
		artist: "INFINITE",
		src: "/audio/urak-baby.mp3"
	}
];
var VOLUME_KEY = "mud-radio-volume";
var MUTE_KEY = "mud-radio-muted";
var RadioContext = (0, import_react.createContext)(null);
function RadioProvider({ children }) {
	const audioRef = (0, import_react.useRef)(null);
	const indexRef = (0, import_react.useRef)(0);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [volume, setVolume] = (0, import_react.useState)(.8);
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [time, setTime] = (0, import_react.useState)(0);
	const [duration, setDuration] = (0, import_react.useState)(0);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.src = tracks[0].src;
		const storedVolume = sessionStorage.getItem(VOLUME_KEY);
		const storedMute = sessionStorage.getItem(MUTE_KEY);
		if (storedVolume != null) {
			const next = Number(storedVolume);
			if (!Number.isNaN(next)) {
				audio.volume = next;
				setVolume(next);
			}
		} else audio.volume = .8;
		if (storedMute === "1") {
			audio.muted = true;
			setMuted(true);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const audio = audioRef.current;
		if (!audio) return;
		const onTime = () => setTime(audio.currentTime || 0);
		const onMeta = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
		const onEnded = () => {
			const next = (indexRef.current + 1) % tracks.length;
			indexRef.current = next;
			setIndex(next);
			setTime(0);
			audio.src = tracks[next].src;
			audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
		};
		audio.addEventListener("timeupdate", onTime);
		audio.addEventListener("loadedmetadata", onMeta);
		audio.addEventListener("ended", onEnded);
		return () => {
			audio.removeEventListener("timeupdate", onTime);
			audio.removeEventListener("loadedmetadata", onMeta);
			audio.removeEventListener("ended", onEnded);
		};
	}, []);
	const play = () => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
	};
	const pause = () => {
		audioRef.current?.pause();
		setPlaying(false);
	};
	const choose = (next) => {
		const audio = audioRef.current;
		if (!audio || next === indexRef.current) {
			setOpen(false);
			return;
		}
		const keep = playing;
		audio.pause();
		indexRef.current = next;
		setIndex(next);
		setTime(0);
		setDuration(0);
		audio.src = tracks[next].src;
		setOpen(false);
		if (keep) audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
	};
	const seek = (next) => {
		if (audioRef.current) audioRef.current.currentTime = next;
		setTime(next);
	};
	const setLevel = (next) => {
		const audio = audioRef.current;
		setVolume(next);
		setMuted(false);
		if (audio) {
			audio.muted = false;
			audio.volume = next;
		}
		sessionStorage.setItem(VOLUME_KEY, String(next));
		sessionStorage.setItem(MUTE_KEY, "0");
	};
	const toggleMute = () => {
		const next = !muted;
		setMuted(next);
		if (audioRef.current) audioRef.current.muted = next;
		sessionStorage.setItem(MUTE_KEY, next ? "1" : "0");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioContext.Provider, {
		value: {
			index,
			playing,
			volume,
			muted,
			time,
			duration,
			open,
			setOpen,
			play,
			pause,
			choose,
			seek,
			setLevel,
			toggleMute
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
			ref: audioRef,
			preload: "none"
		}), children]
	});
}
function Radio() {
	const radio = (0, import_react.useContext)(RadioContext);
	if (!radio) return null;
	const { index, playing, volume, muted, time, duration, open, setOpen, play, pause, choose, seek, setLevel, toggleMute } = radio;
	const track = tracks[index];
	const clock = (value) => {
		if (!Number.isFinite(value) || value < 0) return "0:00";
		const total = Math.floor(value);
		return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "archive-radio",
		"aria-label": "Archive radio",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: playing ? pause : play,
						className: "inline-flex h-11 w-11 shrink-0 items-center justify-center border border-gold font-mono text-xs tracking-widest text-gold",
						"aria-label": playing ? "Pause" : "Play",
						children: playing ? "II" : "▶"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] tracking-widest text-gold",
								children: "ARCHIVE RADIO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-mono text-xs text-parchment",
								children: track.title
							}),
							track.artist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-mono text-[10px] tracking-widest text-muted",
								children: track.artist
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `radio-bars ${playing ? "is-on" : ""}`,
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Track progress"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: duration || 0,
					step: .1,
					value: Math.min(time, duration || 0),
					"aria-label": "Track progress",
					onChange: (event) => seek(Number(event.target.value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center justify-between font-mono text-[10px] tracking-widest text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: clock(time) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: clock(duration) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-w-0 flex-1 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] tracking-widest text-muted",
							children: "VOL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 1,
							step: .01,
							value: muted ? 0 : volume,
							"aria-label": "Volume",
							onChange: (event) => setLevel(Number(event.target.value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: toggleMute,
						className: "inline-flex h-11 items-center px-2 font-mono text-[10px] tracking-widest text-gold",
						"aria-pressed": muted,
						"aria-label": muted ? "Unmute" : "Mute",
						children: muted ? "MUTED" : "MUTE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen((value) => !value),
						className: "inline-flex h-11 items-center px-2 font-mono text-[10px] tracking-widest text-parchment",
						"aria-expanded": open,
						children: "TRACKS"
					})
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 border-t border-forest",
				children: tracks.map((item, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => choose(itemIndex),
					className: "flex min-h-11 w-full items-baseline justify-between gap-3 text-left",
					"aria-current": itemIndex === index ? "true" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `font-mono text-xs ${itemIndex === index ? "text-gold" : "text-parchment"}`,
						children: item.title
					}), item.artist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] tracking-widest text-muted",
						children: item.artist
					}) : null]
				}) }, item.src))
			}) : null
		]
	});
}
var styles_default = "/assets/styles-BRTNqud3.css";
var Route$10 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "MUD RELICS" },
			{
				name: "description",
				content: "MUD RELICS. Handmade artifacts from Kochi. You didn't buy it. You found it."
			},
			{
				name: "theme-color",
				content: "#3A1468"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@500;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-CoasW_lP.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./cart-Cnt-VHwX.mjs");
var Route$8 = createFileRoute("/cart")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./checkout-D4nrbA4R.mjs");
var Route$7 = createFileRoute("/checkout")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var _0002_orders_default = "-- Guest checkout orders. Readable only with the secret confirmation token.\n-- No public list. Shipping addresses stay on the server.\n\ncreate table if not exists orders (\n  id text primary key,\n  token_hash text not null,\n  razorpay_order_id text,\n  razorpay_payment_id text,\n  customer_name text not null,\n  email text not null,\n  phone text not null,\n  address_line text not null,\n  city text not null,\n  state text not null,\n  pin text not null,\n  country text not null,\n  items jsonb not null,\n  subtotal_paise integer not null,\n  shipping_paise integer not null,\n  tax_paise integer not null,\n  amount_paise integer not null,\n  currency text not null default 'INR',\n  payment_status text not null,\n  order_status text not null,\n  created_at timestamptz not null default now(),\n  paid_at timestamptz\n);\n\ncreate unique index if not exists orders_razorpay_order_id_idx\n  on orders (razorpay_order_id)\n  where razorpay_order_id is not null;\n\ncreate table if not exists sold_relics (\n  relic_id text primary key,\n  order_id text not null,\n  sold_at timestamptz not null default now()\n);\n\ncreate table if not exists stock_holds (\n  relic_id text primary key,\n  order_id text not null,\n  held_until timestamptz not null\n);\n\ncreate table if not exists payment_events (\n  event_id text primary key,\n  order_id text,\n  event_type text not null,\n  created_at timestamptz not null default now()\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_orders.sql": _0002_orders_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
var envFileLoaded = false;
/** Load server-only values from `.env` once. Existing process env wins. */
function loadEnvFile() {
	if (envFileLoaded) return;
	envFileLoaded = true;
	const path = resolve(process.cwd(), ".env");
	if (!existsSync(path)) return;
	for (const line of readFileSync(path, "utf8").split("\n")) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;
		const eq = trimmed.indexOf("=");
		if (eq < 1) continue;
		const key = trimmed.slice(0, eq).trim();
		if (!/^[A-Z0-9_]+$/.test(key) || process.env[key] !== void 0) continue;
		let value = trimmed.slice(eq + 1).trim();
		if (value.startsWith("\"") && value.endsWith("\"") || value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
		process.env[key] = value;
	}
}
function env(key) {
	loadEnvFile();
	return process.env[key]?.trim() || void 0;
}
var relics = [
	{
		id: "001",
		number: "ARTIFACT //016",
		name: "PARASITE BLOOM",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 999,
		status: "AVAILABLE",
		category: "INCENSE OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "GOLD EYE",
		origin: "KOCHI",
		lore: "The tentacles stay in the dish.",
		explain: "Ashtray, lighter stand, incense holder. Blue dish, orange tentacles, one gold eye. The mouth takes a lighter.",
		image: "/relics/parasite-bloom/01-front.webp",
		card: "/cards/parasite-bloom.jpg",
		material: "AIRDRY, MOULDIT",
		condition: "SEMIFRAGILE",
		year: 2026,
		kind: "holder",
		frames: [
			"/relics/parasite-bloom/01-front.webp",
			"/relics/parasite-bloom/02-side.webp",
			"/relics/parasite-bloom/03-back.webp",
			"/relics/parasite-bloom/04-side.webp",
			"/relics/parasite-bloom/05-top.webp",
			"/relics/parasite-bloom/06-above.webp"
		]
	},
	{
		id: "002",
		number: "ARTIFACT //025",
		name: "CURSED FINGER",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 999,
		status: "AVAILABLE",
		category: "INCENSE OBJECTS",
		rarity: "STRANGE",
		symbol: "FINGER DISH",
		origin: "KOCHI",
		lore: "The finger stays in the dish.",
		explain: "Ashtray, lighter stand, incense holder. Gold dish, red coils, an orange finger with a red tip. The mouth takes a lighter.",
		image: "/relics/cursed-finger/01-front.webp",
		card: "/cards/cursed-finger.jpg",
		material: "AIRDRY, MOULDIT",
		condition: "SEMIFRAGILE",
		year: 2026,
		kind: "holder",
		frames: [
			"/relics/cursed-finger/01-front.webp",
			"/relics/cursed-finger/02-side.webp",
			"/relics/cursed-finger/03-back.webp",
			"/relics/cursed-finger/04-side.webp",
			"/relics/cursed-finger/05-front.webp",
			"/relics/cursed-finger/06-top.webp",
			"/relics/cursed-finger/07-side.webp"
		]
	},
	{
		id: "003",
		number: "ARTIFACT //006",
		name: "BIO HAZARD MAW",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 999,
		status: "AVAILABLE",
		category: "INCENSE OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "TEETH DISH",
		origin: "KOCHI",
		lore: "The maw stays open.",
		explain: "Ashtray, lighter stand, incense holder. Green dish, purple pool, red teeth, yellow throat. Purple hands hold the lighter.",
		image: "/relics/bio-hazard-maw/01-front.webp",
		card: "/cards/bio-hazard-maw.jpg",
		material: "AIRDRY, MOULDIT",
		condition: "SEMIFRAGILE",
		year: 2026,
		kind: "holder",
		frames: [
			"/relics/bio-hazard-maw/01-front.webp",
			"/relics/bio-hazard-maw/02-side.webp",
			"/relics/bio-hazard-maw/03-back.webp",
			"/relics/bio-hazard-maw/04-side.webp",
			"/relics/bio-hazard-maw/05-top.webp",
			"/relics/bio-hazard-maw/06-above.webp"
		]
	},
	{
		id: "004",
		number: "ARTIFACT //028",
		name: "CRAWLING SUIT",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 999,
		status: "AVAILABLE",
		category: "INCENSE OBJECTS",
		rarity: "STRANGE",
		symbol: "WEB DISH",
		origin: "KOCHI",
		lore: "The suit stays on the dish.",
		explain: "Ashtray, lighter stand, incense holder. Red and blue suit, black legs on a red dish, blue rim. The back takes a lighter.",
		image: "/relics/crawling-suit/01-front.webp",
		card: "/cards/crawling-suit.jpg",
		material: "AIRDRY, MOULDIT",
		condition: "SEMIFRAGILE",
		year: 2026,
		kind: "holder",
		frames: [
			"/relics/crawling-suit/01-front.webp",
			"/relics/crawling-suit/02-side.webp",
			"/relics/crawling-suit/03-back.webp",
			"/relics/crawling-suit/04-side.webp",
			"/relics/crawling-suit/05-top.webp",
			"/relics/crawling-suit/06-above.webp"
		]
	},
	{
		id: "005",
		number: "ARTIFACT //034",
		name: "VENOM",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "WHITE EYES",
		origin: "KOCHI",
		lore: "The tongue stays out.",
		explain: "Lighter case. Black body, white eyes, teeth, a tongue.",
		image: "/relics/black-tongue.webp",
		card: "/cards/venom.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "lighter"
	},
	{
		id: "006",
		number: "ARTIFACT //036",
		name: "WE ARE VENOM",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 999,
		status: "AVAILABLE",
		category: "INCENSE OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "OPEN MOUTH",
		origin: "KOCHI",
		lore: "A mouth with nowhere to go.",
		explain: "Ashtray. Black mouth, white teeth, red tongue.",
		image: "/relics/teeth-dish.webp",
		card: "/cards/we-are-venom.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "holder"
	},
	{
		id: "007",
		number: "ARTIFACT //010",
		name: "SPLITTING HEADACHE",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "BRAIN FACE",
		origin: "KOCHI",
		lore: "Screws where the eyes should be.",
		explain: "Lighter case. Yellow head, screw eyes, a red brain on the side, tongue out.",
		image: "/relics/yellow-screw.webp",
		card: "/cards/splitting-headache.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "lighter"
	},
	{
		id: "008",
		number: "ARTIFACT //014",
		name: "BLOODLUST BITE",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "TOO MANY EYES",
		origin: "KOCHI",
		lore: "It watches from every side.",
		explain: "Lighter case. Red body, too many eyes, white teeth, little horns.",
		image: "/relics/red-many.webp",
		card: "/cards/bloodlust-bite.jpg",
		material: "POLYMER",
		condition: "MALLEABLE",
		year: 2026,
		kind: "lighter"
	},
	{
		id: "009",
		number: "ARTIFACT //002",
		name: "THE EYE VOID",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 1200,
		status: "AVAILABLE",
		category: "RING DISHES",
		rarity: "ONE OF ONE",
		symbol: "GREEN EYES",
		origin: "KOCHI",
		lore: "The eyes stay on. The void holds the rings.",
		explain: "Ring dish. Two green eyes on a neck, oil-slick shell. The rings sit in it.",
		image: "/relics/eye-void/01-top.webp",
		card: "/cards/eye-void.webp",
		year: 2026,
		kind: "ring",
		frames: [
			"/relics/eye-void/01-top.webp",
			"/relics/eye-void/02-top.webp",
			"/relics/eye-void/03-angle.webp",
			"/relics/eye-void/04-angle.webp",
			"/relics/eye-void/05-rings.webp",
			"/relics/eye-void/06-rings.webp",
			"/relics/eye-void/07-detail.webp",
			"/relics/eye-void/08-detail.webp"
		]
	},
	{
		id: "010",
		number: "ARTIFACT //033",
		name: "CYCLOPEAN WATCHER",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "ONE EYE",
		origin: "KOCHI",
		lore: "One eye. Two horns. That's enough.",
		explain: "Lighter case. Black and gold, one big eye, red horns, a snout.",
		image: "/relics/horn-eye.webp",
		card: "/cards/cyclopean-watcher.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "lighter"
	},
	{
		id: "011",
		number: "ARTIFACT //022",
		name: "MELTED GOBLIN",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "GREEN FACE",
		origin: "KOCHI",
		lore: "It grins. It doesn't mean it.",
		explain: "Lighter case. Green face, black hair, silver eyes, red mouth.",
		image: "/relics/green-mouth.webp",
		card: "/cards/melted-goblin.jpg",
		material: "POLYMER",
		condition: "MALLEABLE",
		year: 2026,
		kind: "lighter"
	},
	{
		id: "012",
		number: "ARTIFACT //012",
		name: "VOODOO VORTEX",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "TWO EYES",
		origin: "KOCHI",
		lore: "One eye on top of the other. The other side is the skull.",
		explain: "Lighter case. Front: two stacked eyes, gold ring, red center. Back: yellow skull, red brain, black snake. Drag to turn it.",
		image: "/relics/eye-stack.webp",
		card: "/cards/voodoo-vortex.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "lighter",
		frames: ["/relics/eye-stack.webp", "/relics/skull-pile.webp"]
	},
	{
		id: "014",
		number: "ARTIFACT //017",
		name: "TOXIC MELT",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "CORAL",
		origin: "KOCHI",
		lore: "It looks grown, not built.",
		explain: "Lighter case. Porous pink, green, and black.",
		image: "/relics/pink-rock.webp",
		card: "/cards/toxic-melt.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "lighter"
	},
	{
		id: "015",
		number: "ARTIFACT //013",
		name: "TOXIC OVERGROWTH",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "GROWTH",
		origin: "KOCHI",
		lore: "It kept growing after it was finished.",
		explain: "Lighter case. Brown and blue, grown over the metal.",
		image: "/relics/toxic-overgrowth.webp",
		card: "/cards/toxic-overgrowth.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "lighter"
	},
	{
		id: "016",
		number: "ARTIFACT //009",
		name: "COSMIC CARNAGE",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "RINGS",
		origin: "KOCHI",
		lore: "Eyes stacked until they stop.",
		explain: "Lighter case. Pink rings, a red eye, yellow dots.",
		image: "/relics/cosmic-carnage.webp",
		card: "/cards/cosmic-carnage.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "lighter"
	},
	{
		id: "017",
		number: "ARTIFACT //035",
		name: "GHOSTFACE",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "MASK",
		origin: "KOCHI",
		lore: "The scream stays on the case.",
		explain: "Lighter case. White mask, black shell.",
		image: "/relics/ghostface.webp",
		card: "/cards/ghostface.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "lighter"
	},
	{
		id: "018",
		number: "ARTIFACT //037",
		name: "ABYSSAL TENDRILS",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 3800,
		status: "AVAILABLE",
		category: "ONE-OF-ONES",
		rarity: "ONE OF ONE",
		symbol: "TENDRILS",
		origin: "KOCHI",
		lore: "The chains stay on.",
		explain: "Black, red, and gold. Chains on the tendrils.",
		image: "/relics/abyssal-tendrils.webp",
		card: "/cards/abyssal-tendrils.webp",
		year: 2026,
		kind: "other"
	},
	{
		id: "019",
		number: "ARTIFACT //001",
		name: "SUNKEN PORTRAIT",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 1699,
		status: "AVAILABLE",
		category: "STASH JARS",
		rarity: "ONE OF ONE",
		symbol: "FACE",
		origin: "KOCHI",
		lore: "",
		explain: "Stash jar.",
		image: "/relics/sunken-portrait/01-front.webp",
		card: "/cards/sunken-portrait.jpg",
		year: 2026,
		kind: "other",
		frames: [
			"/relics/sunken-portrait/01-front.webp",
			"/relics/sunken-portrait/02-front.webp",
			"/relics/sunken-portrait/03-side.webp",
			"/relics/sunken-portrait/04-side.webp",
			"/relics/sunken-portrait/05-back.webp",
			"/relics/sunken-portrait/06-back.webp",
			"/relics/sunken-portrait/07-side.webp"
		]
	},
	{
		id: "020",
		number: "ARTIFACT //004",
		name: "THREE HORNED SENTINEL",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "THREE HORNS",
		origin: "KOCHI",
		lore: "",
		explain: "Lighter case. Three horns, a gold ring, purple face.",
		image: "/relics/3-horned-sentinel/01-front.webp",
		card: "/cards/three-horned-sentinel.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "lighter",
		frames: [
			"/relics/3-horned-sentinel/01-front.webp",
			"/relics/3-horned-sentinel/02-front.webp",
			"/relics/3-horned-sentinel/03-front.webp",
			"/relics/3-horned-sentinel/04-front.webp",
			"/relics/3-horned-sentinel/05-side.webp",
			"/relics/3-horned-sentinel/06-back.webp",
			"/relics/3-horned-sentinel/07-side.webp",
			"/relics/3-horned-sentinel/08-side.webp"
		]
	},
	{
		id: "021",
		number: "ARTIFACT //005",
		name: "JADE BANDIT",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "RED CAP",
		origin: "KOCHI",
		lore: "Green face. Red cap. One eye.",
		explain: "Lighter case. Green face, red cap, one gold eye, blue mouth.",
		image: "/relics/jade-bandit/01-front.webp?v=2",
		card: "/cards/jade-bandit.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "lighter",
		frames: [
			"/relics/jade-bandit/01-front.webp?v=2",
			"/relics/jade-bandit/02-side.webp?v=2",
			"/relics/jade-bandit/03-back.webp?v=2",
			"/relics/jade-bandit/04-side.webp?v=2",
			"/relics/jade-bandit/05-side.webp?v=2",
			"/relics/jade-bandit/06-front.webp?v=2"
		]
	},
	{
		id: "022",
		number: "ARTIFACT //007",
		name: "MIRROR MIRROR ON THE WALL",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "MIRRORS",
		origin: "KOCHI",
		lore: "The mirrors stay on.",
		explain: "Lighter case. Red, gold, blue and purple, set with mirrors and a silver chain.",
		image: "/relics/mirror-mirror/01-side.webp",
		card: "/cards/mirror-mirror.jpg",
		material: "MOULDIT",
		condition: "ANTIFRAGILE",
		year: 2026,
		kind: "lighter",
		frames: [
			"/relics/mirror-mirror/01-side.webp",
			"/relics/mirror-mirror/02-side.webp",
			"/relics/mirror-mirror/03-front.webp",
			"/relics/mirror-mirror/04-front.webp",
			"/relics/mirror-mirror/05-side.webp",
			"/relics/mirror-mirror/06-back.webp"
		]
	},
	{
		id: "023",
		number: "ARTIFACT //020",
		name: "FLOWER TRINITY",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "THREE FLOWERS",
		origin: "KOCHI",
		lore: "Three flowers. One vine.",
		explain: "Lighter case. Blue sleeve, green vine, three red flowers.",
		image: "/relics/floral-trinity/01-front.webp",
		card: "/cards/flower-trinity.jpg",
		material: "POLYMER",
		condition: "MALLEABLE",
		year: 2026,
		kind: "lighter",
		frames: [
			"/relics/floral-trinity/01-front.webp",
			"/relics/floral-trinity/02-side.webp",
			"/relics/floral-trinity/03-back.webp",
			"/relics/floral-trinity/04-side.webp",
			"/relics/floral-trinity/05-side.webp"
		]
	},
	{
		id: "024",
		number: "ARTIFACT //011",
		name: "SEA MUTANT",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "STARFISH",
		origin: "KOCHI",
		lore: "Two eyes. One starfish.",
		explain: "Lighter case. Orange shell, two eyes, a blue starfish, red back.",
		image: "/relics/sea-mutant/01-front.webp",
		card: "/cards/sea-mutant.jpg",
		material: "POLYMER",
		condition: "MALLEABLE",
		year: 2026,
		kind: "lighter",
		frames: [
			"/relics/sea-mutant/01-front.webp",
			"/relics/sea-mutant/02-front.webp",
			"/relics/sea-mutant/03-front.webp",
			"/relics/sea-mutant/04-back.webp",
			"/relics/sea-mutant/05-side.webp",
			"/relics/sea-mutant/06-side.webp"
		]
	},
	{
		id: "025",
		number: "",
		name: "THE STRANGE GENTLEMAN",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: null,
		status: "AVAILABLE",
		category: "STASH JARS",
		rarity: "ONE OF ONE",
		symbol: "GOLD LID",
		origin: "KOCHI",
		lore: "The lid is the hat.",
		explain: "Stash jar. Purple head, gold lid, blue hair, green eyes, pink mouth.",
		image: "/relics/strange-gentleman/01-front.webp",
		year: 2026,
		kind: "other",
		frames: [
			"/relics/strange-gentleman/01-front.webp",
			"/relics/strange-gentleman/02-side.webp",
			"/relics/strange-gentleman/03-back.webp",
			"/relics/strange-gentleman/04-side.webp"
		]
	},
	{
		id: "026",
		number: "",
		name: "FIERY WORM",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "PINK LIGHTER",
		origin: "KOCHI",
		lore: "The worm stays on the lighter.",
		explain: "Lighter case. Red and gold worm, black body, a pink lighter.",
		image: "/relics/fiery-worm/01-side.webp",
		year: 2026,
		kind: "lighter",
		frames: [
			"/relics/fiery-worm/01-side.webp",
			"/relics/fiery-worm/02-front.webp",
			"/relics/fiery-worm/03-front.webp",
			"/relics/fiery-worm/04-side.webp",
			"/relics/fiery-worm/05-back.webp"
		]
	},
	{
		id: "027",
		number: "",
		name: "CRIMSON ORACLE",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "THREE EYES",
		origin: "KOCHI",
		lore: "Three eyes. One red sleeve.",
		explain: "Lighter case. Red sleeve, three eyes, green leaves, a red lighter.",
		image: "/relics/crimson-oracle/01-front.webp",
		year: 2026,
		kind: "lighter",
		frames: [
			"/relics/crimson-oracle/01-front.webp",
			"/relics/crimson-oracle/02-front.webp",
			"/relics/crimson-oracle/03-side.webp",
			"/relics/crimson-oracle/04-side.webp",
			"/relics/crimson-oracle/05-back.webp"
		]
	},
	{
		id: "028",
		number: "",
		name: "BLUE SCARAB",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 699,
		status: "AVAILABLE",
		category: "LIGHTER OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "BLUE SHELL",
		origin: "KOCHI",
		lore: "The scarab stays on the sleeve.",
		explain: "Lighter case. Blue scarab on a black and purple sleeve.",
		image: "/relics/blue-scarab/01-front.webp",
		year: 2026,
		kind: "lighter",
		frames: [
			"/relics/blue-scarab/01-front.webp",
			"/relics/blue-scarab/02-side.webp",
			"/relics/blue-scarab/03-back.webp",
			"/relics/blue-scarab/04-side.webp"
		]
	},
	{
		id: "029",
		number: "ARTIFACT //034",
		name: "CRIMSON NIRVANA",
		artistLabel: "DBG",
		city: "KOCHI",
		edition: "1 OF 1",
		price: 999,
		status: "AVAILABLE",
		category: "INCENSE OBJECTS",
		rarity: "ONE OF ONE",
		symbol: "GOLD CENTER",
		origin: "KOCHI",
		lore: "The stick sits in the gold.",
		explain: "Incense holder. Red flower, gold center, green base.",
		image: "/relics/sanguine-nirvana/01-front.webp",
		card: "/cards/crimson-nirvana.jpg",
		year: 2026,
		kind: "holder",
		frames: [
			"/relics/sanguine-nirvana/01-front.webp",
			"/relics/sanguine-nirvana/02-side.webp",
			"/relics/sanguine-nirvana/03-above.webp",
			"/relics/sanguine-nirvana/04-front.webp",
			"/relics/sanguine-nirvana/05-top.webp",
			"/relics/sanguine-nirvana/06-top.webp",
			"/relics/sanguine-nirvana/07-side.webp"
		]
	}
];
function relicById(id) {
	return relics.find((relic) => relic.id === id);
}
function inr(price) {
	return `₹${price.toLocaleString("en-IN")}`;
}
function framesOf(relic) {
	return relic.frames?.length ? relic.frames : [relic.image];
}
function hashToken(token) {
	return createHash("sha256").update(token).digest("hex");
}
function tokensMatch(presented, storedHash) {
	try {
		const a = Buffer.from(hashToken(presented), "hex");
		const b = Buffer.from(storedHash, "hex");
		if (a.length !== b.length || a.length === 0) return false;
		return timingSafeEqual(a, b);
	} catch {
		return false;
	}
}
function paiseFromRupees(rupees) {
	return Math.round(rupees * 100);
}
function totals(subtotalPaise, shippingPaise, taxBps) {
	const taxPaise = Math.round((subtotalPaise + shippingPaise) * taxBps / 1e4);
	return {
		subtotalPaise,
		shippingPaise,
		taxPaise,
		amountPaise: subtotalPaise + shippingPaise + taxPaise,
		currency: "INR"
	};
}
function quoteRelics(ids, shippingPaise, taxBps) {
	const unique = [...new Set(ids)];
	if (unique.length === 0) return {
		ok: false,
		error: "The cart is empty.",
		unavailable: []
	};
	if (unique.length > 12) return {
		ok: false,
		error: "Too many pieces in one dispatch.",
		unavailable: []
	};
	const unavailable = [];
	const lines = [];
	for (const id of unique) {
		const relic = relicById(id);
		if (!sellable(relic)) {
			unavailable.push(id);
			continue;
		}
		lines.push({
			id: relic.id,
			name: relic.name,
			number: relic.number,
			image: relic.image,
			quantity: 1,
			pricePaise: paiseFromRupees(relic.price)
		});
	}
	if (unavailable.length) return {
		ok: false,
		error: "One of these pieces is not available.",
		unavailable
	};
	return {
		ok: true,
		quote: {
			lines,
			...totals(lines.reduce((sum, line) => sum + line.pricePaise, 0), shippingPaise, taxBps)
		}
	};
}
function sellable(relic) {
	return !!relic && relic.status === "AVAILABLE" && typeof relic.price === "number" && relic.price > 0;
}
function readMoneyEnv(source) {
	const shipping = readWhole(source.SHIPPING_INR, "SHIPPING_INR", 0, 1e5);
	const taxBps = readWhole(source.TAX_BPS, "TAX_BPS", 0, 1e4);
	if (!shipping.ok) return shipping;
	if (!taxBps.ok) return taxBps;
	return {
		ok: true,
		shippingPaise: shipping.value * 100,
		taxBps: taxBps.value,
		taxConfigured: source.TAX_BPS?.trim() !== void 0 && source.TAX_BPS.trim() !== ""
	};
}
function readWhole(raw, name, min, max) {
	if (raw == null || raw.trim() === "") return {
		ok: true,
		value: 0
	};
	const value = Number(raw);
	if (!Number.isInteger(value) || value < min || value > max) return {
		ok: false,
		error: `${name} must be a whole number from ${min} to ${max}.`
	};
	return {
		ok: true,
		value
	};
}
var HOLD = "15 minutes";
async function blocking(db, ids) {
	if (ids.length === 0) return {
		sold: [],
		held: []
	};
	const sold = await db.query(`select relic_id from sold_relics where relic_id = any($1::text[])`, [ids]);
	const held = await db.query(`select relic_id from stock_holds where relic_id = any($1::text[]) and held_until > now()`, [ids]);
	return {
		sold: sold.map((row) => row.relic_id),
		held: held.map((row) => row.relic_id)
	};
}
async function holdRelic(db, relicId, orderId) {
	return (await db.query(`insert into stock_holds (relic_id, order_id, held_until)
     select $1, $2, now() + interval '${HOLD}'
     where not exists (select 1 from sold_relics where relic_id = $1)
     on conflict (relic_id) do update
       set order_id = excluded.order_id,
           held_until = excluded.held_until
       where stock_holds.held_until <= now()
     returning relic_id`, [relicId, orderId])).length > 0;
}
async function releaseHolds(db, orderId) {
	await db.query(`delete from stock_holds where order_id = $1`, [orderId]);
}
async function claimRelic(db, relicId, orderId) {
	return (await db.query(`insert into sold_relics (relic_id, order_id)
     values ($1, $2)
     on conflict (relic_id) do update
       set order_id = sold_relics.order_id
       where sold_relics.order_id = excluded.order_id
     returning relic_id`, [relicId, orderId])).length > 0;
}
async function releaseSold(db, orderId) {
	await db.query(`delete from sold_relics where order_id = $1`, [orderId]);
}
function parseItems(value) {
	const raw = typeof value === "string" ? JSON.parse(value) : value;
	return Array.isArray(raw) ? raw : [];
}
async function markPaid(db, args) {
	const order = (await db.query(`select * from orders where id = $1`, [args.orderId]))[0];
	if (!order) return {
		ok: false,
		reason: "missing"
	};
	if (order.order_status === "PAID") {
		if (order.razorpay_payment_id === args.paymentId) return {
			ok: true,
			already: true
		};
		return {
			ok: false,
			reason: "already_paid"
		};
	}
	if (Number(order.amount_paise) !== args.amountPaise) return {
		ok: false,
		reason: "amount"
	};
	const items = parseItems(order.items);
	for (const item of items) if (!await claimRelic(db, item.id, order.id)) return {
		ok: false,
		reason: "stock"
	};
	await db.query(`update orders
       set order_status = 'PAID',
           payment_status = 'captured',
           razorpay_payment_id = $2,
           paid_at = coalesce(paid_at, now())
     where id = $1 and order_status <> 'PAID'`, [order.id, args.paymentId]);
	await releaseHolds(db, order.id);
	return {
		ok: true,
		already: false
	};
}
async function markRefunded(db, orderId) {
	const status = (await db.query(`select order_status from orders where id = $1`, [orderId]))[0]?.order_status;
	if (!status) return {
		ok: false,
		reason: "missing"
	};
	if (status === "REFUNDED") return {
		ok: true,
		already: true
	};
	if (status !== "PAID" && status !== "PROCESSING" && status !== "SHIPPED" && status !== "DELIVERED") return {
		ok: false,
		reason: "not_paid"
	};
	await releaseSold(db, orderId);
	await db.query(`update orders set order_status = 'REFUNDED', payment_status = 'refunded' where id = $1`, [orderId]);
	return {
		ok: true,
		already: false
	};
}
async function rememberEvent(db, eventId, orderId, eventType) {
	return (await db.query(`insert into payment_events (event_id, order_id, event_type)
     values ($1, $2, $3)
     on conflict (event_id) do nothing
     returning event_id`, [
		eventId,
		orderId,
		eventType
	])).length > 0;
}
function hmacHex(secret, payload) {
	return createHmac("sha256", secret).update(payload).digest("hex");
}
function hexMatch(expected, actual) {
	try {
		const a = Buffer.from(expected, "hex");
		const b = Buffer.from(actual, "hex");
		return a.length === b.length && a.length > 0 && timingSafeEqual(a, b);
	} catch {
		return false;
	}
}
function paymentSignatureValid(orderId, paymentId, signature, secret) {
	return hexMatch(hmacHex(secret, `${orderId}|${paymentId}`), signature);
}
function webhookSignatureValid(body, signature, secret) {
	return hexMatch(hmacHex(secret, body), signature);
}
var customerSchema = object({
	name: string().trim().min(2).max(80),
	email: string().trim().email().max(120),
	phone: string().trim().min(8).max(20),
	address: string().trim().min(5).max(200),
	city: string().trim().min(2).max(60),
	state: string().trim().min(2).max(60),
	pin: string().trim().min(4).max(10),
	country: string().trim().min(2).max(56).default("India")
});
function json(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json",
			"cache-control": "no-store"
		}
	});
}
function keys() {
	const keyId = env("RAZORPAY_KEY_ID") || env("VITE_RAZORPAY_KEY_ID") || env("NEXT_PUBLIC_RAZORPAY_KEY_ID");
	const keySecret = env("RAZORPAY_KEY_SECRET");
	return {
		keyId,
		keySecret,
		webhookSecret: env("RAZORPAY_WEBHOOK_SECRET"),
		configured: Boolean(keyId && keySecret)
	};
}
function moneyEnv() {
	return readMoneyEnv({
		SHIPPING_INR: env("SHIPPING_INR"),
		TAX_BPS: env("TAX_BPS")
	});
}
function phoneOk(phone, country) {
	const digits = phone.replace(/\D/g, "");
	if (country.toLowerCase() === "india") return digits.length === 10 || digits.length === 12 && digits.startsWith("91");
	return digits.length >= 8 && digits.length <= 15;
}
function pinOk(pin, country) {
	if (country.toLowerCase() === "india") return /^\d{6}$/.test(pin);
	return /^[a-zA-Z0-9 -]{4,10}$/.test(pin);
}
async function handleStock(request) {
	const ids = (new URL(request.url).searchParams.get("ids") ?? "").split(",").map((id) => id.trim()).filter((id) => /^\d{3}$/.test(id)).slice(0, 40);
	try {
		return json(await blocking(await getSql(), ids));
	} catch (error) {
		console.error("[stock]", error instanceof Error ? error.message : "failed");
		return json({
			sold: [],
			held: [],
			error: "unavailable"
		}, 503);
	}
}
async function handleCheckout(request) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: "Invalid request." }, 400);
	}
	const action = typeof body === "object" && body && "action" in body ? String(body.action) : "";
	try {
		if (action === "quote") return await quote(body);
		if (action === "create") return await create(body);
		if (action === "verify") return await verify(body);
		if (action === "cancel") return await cancel(body);
		if (action === "read") return await read(body);
		return json({ error: "Unknown action." }, 400);
	} catch (error) {
		console.error("[checkout]", action, error instanceof Error ? error.message : "failed");
		return json({ error: "The archive could not complete that." }, 500);
	}
}
async function quote(body) {
	const parsed = object({ ids: array(string()).max(12) }).safeParse(body);
	if (!parsed.success) return json({ error: "Invalid cart." }, 400);
	const money = moneyEnv();
	if (!money.ok) return json({ error: money.error }, 500);
	const quoted = quoteRelics(parsed.data.ids, money.shippingPaise, money.taxBps);
	const sql = await getSql();
	const live = quoted.ok ? await blocking(sql, quoted.quote.lines.map((line) => line.id)) : {
		sold: [],
		held: []
	};
	const blocked = [...live.sold, ...live.held];
	if (quoted.ok && blocked.length) return json({
		error: "One of these pieces is already held.",
		unavailable: blocked,
		paymentsConfigured: keys().configured
	}, 409);
	return json({
		paymentsConfigured: keys().configured,
		taxConfigured: money.ok ? money.taxConfigured : false,
		...quoted.ok ? { quote: quoted.quote } : {
			error: quoted.error,
			unavailable: quoted.unavailable
		}
	}, quoted.ok ? 200 : 409);
}
async function create(body) {
	const parsed = object({
		ids: array(string()).max(12),
		customer: customerSchema
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Check the shipping details." }, 400);
	const customer = parsed.data.customer;
	if (!phoneOk(customer.phone, customer.country) || !pinOk(customer.pin, customer.country)) return json({ error: "Check the mobile number and PIN code." }, 400);
	const creds = keys();
	if (!creds.configured || !creds.keyId || !creds.keySecret) return json({
		error: "Razorpay is not connected yet. No payment was taken.",
		code: "payments_not_configured"
	}, 503);
	const money = moneyEnv();
	if (!money.ok) return json({ error: money.error }, 500);
	const quoted = quoteRelics(parsed.data.ids, money.shippingPaise, money.taxBps);
	if (!quoted.ok) return json({
		error: quoted.error,
		unavailable: quoted.unavailable
	}, 409);
	const sql = await getSql();
	const orderId = `MR${randomBytes(5).toString("hex").toUpperCase()}`;
	const token = randomBytes(24).toString("hex");
	const held = [];
	try {
		await sql.query(`insert into orders (
         id, token_hash, customer_name, email, phone, address_line, city, state, pin, country,
         items, subtotal_paise, shipping_paise, tax_paise, amount_paise, currency, payment_status, order_status
       ) values (
         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
         $11::jsonb, $12, $13, $14, $15, 'INR', 'created', 'PAYMENT PENDING'
       )`, [
			orderId,
			hashToken(token),
			customer.name,
			customer.email,
			customer.phone,
			customer.address,
			customer.city,
			customer.state,
			customer.pin,
			customer.country,
			JSON.stringify(quoted.quote.lines),
			quoted.quote.subtotalPaise,
			quoted.quote.shippingPaise,
			quoted.quote.taxPaise,
			quoted.quote.amountPaise
		]);
		for (const line of quoted.quote.lines) {
			if (!await holdRelic(sql, line.id, orderId)) {
				await releaseHolds(sql, orderId);
				await sql.query(`update orders set order_status = 'CANCELLED', payment_status = 'cancelled' where id = $1`, [orderId]);
				return json({
					error: `${line.name} is already held.`,
					unavailable: [line.id]
				}, 409);
			}
			held.push(line.id);
		}
		const Razorpay = (await import("../_libs/razorpay.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).default;
		const remote = await new Razorpay({
			key_id: creds.keyId,
			key_secret: creds.keySecret
		}).orders.create({
			amount: quoted.quote.amountPaise,
			currency: "INR",
			receipt: orderId.slice(0, 40),
			notes: { mud_order: orderId }
		});
		await sql.query(`update orders set razorpay_order_id = $2, payment_status = 'created' where id = $1`, [orderId, remote.id]);
		return json({
			orderId,
			token,
			keyId: creds.keyId,
			razorpayOrderId: remote.id,
			amount: quoted.quote.amountPaise,
			currency: "INR",
			name: "MUD RELICS",
			description: quoted.quote.lines.map((line) => line.name).join(", ").slice(0, 200),
			prefill: {
				name: customer.name,
				email: customer.email,
				contact: customer.phone
			}
		});
	} catch (error) {
		await releaseHolds(sql, orderId).catch(() => void 0);
		await sql.query(`update orders set order_status = 'CANCELLED', payment_status = 'failed' where id = $1 and order_status = 'PAYMENT PENDING'`, [orderId]).catch(() => void 0);
		console.error("[checkout:create]", error instanceof Error ? error.message : "failed");
		return json({
			error: "Razorpay did not open an order. Nothing was charged.",
			held
		}, 502);
	}
}
async function verify(body) {
	const parsed = object({
		orderId: string().min(4).max(40),
		token: string().min(16).max(80),
		razorpay_order_id: string().min(4).max(80),
		razorpay_payment_id: string().min(4).max(80),
		razorpay_signature: string().min(8).max(256)
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Invalid payment response." }, 400);
	const creds = keys();
	if (!creds.keySecret) return json({ error: "Razorpay is not connected." }, 503);
	const sql = await getSql();
	const order = (await sql.query(`select id, token_hash, razorpay_order_id, amount_paise, order_status from orders where id = $1`, [parsed.data.orderId]))[0];
	if (!order || !tokensMatch(parsed.data.token, order.token_hash)) return json({ error: "Order not found." }, 404);
	if (order.razorpay_order_id !== parsed.data.razorpay_order_id) return json({ error: "This payment does not match the order." }, 400);
	let signed = false;
	try {
		signed = paymentSignatureValid(parsed.data.razorpay_order_id, parsed.data.razorpay_payment_id, parsed.data.razorpay_signature, creds.keySecret);
	} catch {
		signed = false;
	}
	if (!signed) return json({ error: "Payment signature was rejected. The order is not paid." }, 400);
	const result = await markPaid(sql, {
		orderId: order.id,
		paymentId: parsed.data.razorpay_payment_id,
		amountPaise: Number(order.amount_paise)
	});
	if (!result.ok) return json({
		error: "Payment could not be confirmed.",
		reason: result.reason,
		paid: false
	}, 409);
	return json({
		paid: true,
		orderId: order.id,
		status: "PAID"
	});
}
async function cancel(body) {
	const parsed = object({
		orderId: string().min(4).max(40),
		token: string().min(16).max(80)
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Invalid request." }, 400);
	const sql = await getSql();
	const order = (await sql.query(`select token_hash, order_status from orders where id = $1`, [parsed.data.orderId]))[0];
	if (!order || !tokensMatch(parsed.data.token, order.token_hash)) return json({ error: "Order not found." }, 404);
	if (order.order_status === "PAID") return json({ error: "This order is already paid." }, 409);
	await releaseHolds(sql, parsed.data.orderId);
	await sql.query(`update orders set order_status = 'CANCELLED', payment_status = 'cancelled' where id = $1 and order_status = 'PAYMENT PENDING'`, [parsed.data.orderId]);
	return json({ cancelled: true });
}
async function read(body) {
	const parsed = object({
		orderId: string().min(4).max(40),
		token: string().min(16).max(80)
	}).safeParse(body);
	if (!parsed.success) return json({ error: "This confirmation link is incomplete." }, 400);
	const order = (await (await getSql()).query(`select * from orders where id = $1`, [parsed.data.orderId]))[0];
	if (!order || !tokensMatch(parsed.data.token, order.token_hash)) return json({ error: "Order not found." }, 404);
	return json({ order: {
		id: order.id,
		paymentId: order.razorpay_payment_id,
		name: order.customer_name,
		email: order.email,
		phone: order.phone,
		address: order.address_line,
		city: order.city,
		state: order.state,
		pin: order.pin,
		country: order.country,
		items: parseItems(order.items),
		subtotalPaise: Number(order.subtotal_paise),
		shippingPaise: Number(order.shipping_paise),
		taxPaise: Number(order.tax_paise),
		amountPaise: Number(order.amount_paise),
		currency: order.currency,
		paymentStatus: order.payment_status,
		status: order.order_status,
		createdAt: new Date(order.created_at).toISOString()
	} });
}
async function handleWebhook(request) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	const secret = env("RAZORPAY_WEBHOOK_SECRET");
	if (!secret) return json({ error: "Webhook secret is not configured." }, 503);
	const raw = await request.text();
	const signature = request.headers.get("x-razorpay-signature") ?? "";
	let valid = false;
	try {
		valid = webhookSignatureValid(raw, signature, secret);
	} catch {
		valid = false;
	}
	if (!valid) return json({ error: "Invalid webhook signature." }, 400);
	let event;
	try {
		event = JSON.parse(raw);
	} catch {
		return json({ error: "Invalid webhook body." }, 400);
	}
	const type = event.event ?? "unknown";
	const payment = event.payload?.payment?.entity;
	const eventId = request.headers.get("x-razorpay-event-id") || `${type}:${payment?.id ?? "none"}:${payment?.order_id ?? "none"}`;
	try {
		const sql = await getSql();
		const order = await findWebhookOrder(sql, payment);
		if (!await rememberEvent(sql, eventId, order?.id ?? null, type)) return json({
			ok: true,
			duplicate: true
		});
		if (!order) return json({ error: "Order not stored yet." }, 500);
		if (type === "payment.captured" || type === "order.paid") {
			if (!payment?.id || typeof payment.amount !== "number") {
				await sql.query(`delete from payment_events where event_id = $1`, [eventId]);
				return json({ error: "Payment event was incomplete." }, 500);
			}
			const result = await markPaid(sql, {
				orderId: order.id,
				paymentId: payment.id,
				amountPaise: payment.amount
			});
			if (!result.ok && result.reason === "amount") await sql.query(`update orders set payment_status = 'amount_mismatch' where id = $1 and order_status <> 'PAID'`, [order.id]);
			return json({
				ok: result.ok,
				reason: result.ok ? "paid" : result.reason
			});
		}
		if (type === "payment.failed") {
			await sql.query(`update orders set payment_status = 'failed' where id = $1 and order_status = 'PAYMENT PENDING'`, [order.id]);
			return json({
				ok: true,
				status: "failed"
			});
		}
		if (type === "refund.processed" || type === "payment.refunded") {
			const result = await markRefunded(sql, order.id);
			return json({
				ok: result.ok,
				reason: result.ok ? "refunded" : result.reason
			});
		}
		return json({
			ok: true,
			ignored: type
		});
	} catch (error) {
		console.error("[webhook]", error instanceof Error ? error.message : "failed");
		return json({ error: "Webhook was not stored." }, 500);
	}
}
async function findWebhookOrder(sql, payment) {
	if (payment?.order_id) {
		const byRemote = await sql.query(`select id, amount_paise, razorpay_payment_id from orders where razorpay_order_id = $1`, [payment.order_id]);
		if (byRemote[0]) return byRemote[0];
	}
	const note = payment?.notes?.mud_order;
	if (note) {
		const byNote = await sql.query(`select id, amount_paise, razorpay_payment_id from orders where id = $1`, [note]);
		if (byNote[0]) return byNote[0];
	}
	return null;
}
async function handleCreateOrder(request) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: "Invalid request." }, 400);
	}
	const parsed = object({
		amount: number().int().min(100).max(1e8),
		currency: literal("INR").default("INR"),
		receipt: string().trim().min(1).max(40).optional()
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Amount must be at least 100 paise." }, 400);
	const creds = keys();
	if (!creds.keyId || !creds.keySecret) return json({ error: "Razorpay is not connected." }, 503);
	try {
		const Razorpay = (await import("../_libs/razorpay.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).default;
		const razorpay = new Razorpay({
			key_id: creds.keyId,
			key_secret: creds.keySecret
		});
		const receipt = parsed.data.receipt ?? `mr${Date.now().toString(36)}`.slice(0, 40);
		const order = await razorpay.orders.create({
			amount: parsed.data.amount,
			currency: "INR",
			receipt
		});
		return json({
			order_id: order.id,
			amount: Number(order.amount),
			currency: order.currency
		});
	} catch (error) {
		const status = typeof error === "object" && error && "statusCode" in error ? Number(error.statusCode) : 0;
		console.error("[create-order]", status || "failed");
		if (status === 401) return json({ error: "Razorpay authentication failed." }, 401);
		return json({ error: "Razorpay could not create the order." }, 500);
	}
}
async function handleVerifyPayment(request) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: "Invalid request." }, 400);
	}
	const parsed = object({
		razorpay_order_id: string().min(4).max(80),
		razorpay_payment_id: string().min(4).max(80),
		razorpay_signature: string().min(8).max(256)
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Missing payment fields." }, 400);
	const creds = keys();
	if (!creds.keySecret) return json({ error: "Razorpay is not connected." }, 503);
	let signed = false;
	try {
		signed = paymentSignatureValid(parsed.data.razorpay_order_id, parsed.data.razorpay_payment_id, parsed.data.razorpay_signature, creds.keySecret);
	} catch {
		signed = false;
	}
	if (!signed) return json({
		success: false,
		error: "Payment signature was rejected."
	}, 400);
	try {
		const sql = await getSql();
		const order = (await sql.query(`select id, amount_paise, order_status from orders where razorpay_order_id = $1`, [parsed.data.razorpay_order_id]))[0];
		if (order && order.order_status !== "PAID") {
			const result = await markPaid(sql, {
				orderId: order.id,
				paymentId: parsed.data.razorpay_payment_id,
				amountPaise: Number(order.amount_paise)
			});
			if (!result.ok) return json({
				success: false,
				error: "Payment matched but the order was not marked paid.",
				reason: result.reason
			}, 409);
		}
	} catch (error) {
		console.error("[verify-payment]", error instanceof Error ? error.message : "failed");
		return json({ error: "Payment could not be recorded." }, 500);
	}
	return json({ success: true });
}
var Route$6 = createFileRoute("/api/checkout")({ server: { handlers: { POST: ({ request }) => handleCheckout(request) } } });
var Route$5 = createFileRoute("/api/create-order")({ server: { handlers: { POST: ({ request }) => handleCreateOrder(request) } } });
var Route$4 = createFileRoute("/api/stock")({ server: { handlers: { GET: ({ request }) => handleStock(request) } } });
var Route$3 = createFileRoute("/api/verify-payment")({ server: { handlers: { POST: ({ request }) => handleVerifyPayment(request) } } });
var $$splitComponentImporter$1 = () => import("./orders._id-Z0Qvbg97.mjs");
var Route$2 = createFileRoute("/orders/$id")({
	validateSearch: (search) => ({ t: typeof search.t === "string" ? search.t : "" }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./relics._id-CnU4nAIp.mjs");
var Route$1 = createFileRoute("/relics/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/razorpay/webhook")({ server: { handlers: { POST: ({ request }) => handleWebhook(request) } } });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	CartRoute: Route$8.update({
		id: "/cart",
		path: "/cart",
		getParentRoute: () => Route$10
	}),
	CheckoutRoute: Route$7.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$10
	}),
	ApiCheckoutRoute: Route$6.update({
		id: "/api/checkout",
		path: "/api/checkout",
		getParentRoute: () => Route$10
	}),
	ApiCreateOrderRoute: Route$5.update({
		id: "/api/create-order",
		path: "/api/create-order",
		getParentRoute: () => Route$10
	}),
	ApiStockRoute: Route$4.update({
		id: "/api/stock",
		path: "/api/stock",
		getParentRoute: () => Route$10
	}),
	ApiVerifyPaymentRoute: Route$3.update({
		id: "/api/verify-payment",
		path: "/api/verify-payment",
		getParentRoute: () => Route$10
	}),
	OrdersIdRoute: Route$2.update({
		id: "/orders/$id",
		path: "/orders/$id",
		getParentRoute: () => Route$10
	}),
	RelicsIdRoute: Route$1.update({
		id: "/relics/$id",
		path: "/relics/$id",
		getParentRoute: () => Route$10
	}),
	ApiRazorpayWebhookRoute: Route.update({
		id: "/api/razorpay/webhook",
		path: "/api/razorpay/webhook",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { inr as a, Radio as c, framesOf as i, useCart as l, Route$1 as n, relicById as o, Route$2 as r, relics as s, router_exports as t };
