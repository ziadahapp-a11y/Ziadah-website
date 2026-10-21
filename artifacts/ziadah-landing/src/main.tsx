import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "@emran-alhaddad/saudi-riyal-font";
import "./index.css";

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

createRoot(rootEl).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
