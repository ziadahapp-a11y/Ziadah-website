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

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

/**
 * Fade out the initial HTML splash (#initial-loader) after the first paint of
 * the React app. Two RAFs ensure the app has actually rendered before we hide it.
 */
if (typeof window !== "undefined") {
  const dismissInitialLoader = () => {
    document.documentElement.classList.add("app-mounted");
    const loader = document.getElementById("initial-loader");
    if (loader) {
      const cleanup = () => loader.remove();
      loader.addEventListener("transitionend", cleanup, { once: true });
      window.setTimeout(cleanup, 1200);
    }
  };
  requestAnimationFrame(() => requestAnimationFrame(dismissInitialLoader));
}
