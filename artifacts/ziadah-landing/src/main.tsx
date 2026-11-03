import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "@emran-alhaddad/saudi-riyal-font";
import "./index.css";
import "./styles/locale-fonts.css";
import { loadCatalog, setCollecting, seen } from "./i18n/catalog";
const seenStrings = () => seen;
import { localeFromPath } from "./i18n/languages";

/** نطاق زيادة الأساسي بدون www — إعادة توجيه مباشرة للـ canonical (www) */
if (typeof window !== "undefined" && window.location.hostname === "ziadah.app") {
  const { pathname, search, hash } = window.location;
  window.location.replace(`https://www.ziadah.app${pathname}${search}${hash}`);
}

if (typeof window !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

/* The prerendered page is replaced, not hydrated, so anything the HTML parser
   threw out of #root (invalid nesting in a prerendered page does that) would
   stay in <body> beside the live app. Nothing else belongs there before
   React mounts. */
const rootEl = document.getElementById("root")!;
for (const el of Array.from(document.body.children)) {
  if (el !== rootEl && !/^(SCRIPT|STYLE|LINK|NOSCRIPT)$/.test(el.tagName)) el.remove();
}

/* The catalogue of the page's language is loaded before React renders, so the
   first paint is already translated and nothing flashes English. Add
   `?i18n_collect=1` to an English page to record every string it shows
   (read back from `window.__i18nSeen`). */
const locale = localeFromPath(window.location.pathname);
if (new URLSearchParams(window.location.search).has("i18n_collect")) {
  setCollecting(true);
  (window as unknown as { __i18nSeen: () => string[] }).__i18nSeen = () => Array.from(seenStrings());
}
document.documentElement.dataset.locale = locale;
const CJK_FACES: Partial<Record<string, () => Promise<unknown>>> = {
  ja: () => import("@fontsource-variable/noto-sans-jp"),
  ko: () => import("@fontsource-variable/noto-sans-kr"),
  zh: () => import("@fontsource-variable/noto-sans-sc"),
  "zh-tw": () => import("@fontsource-variable/noto-sans-tc"),
};
await Promise.all([loadCatalog(locale), CJK_FACES[locale]?.()]);

createRoot(rootEl).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
