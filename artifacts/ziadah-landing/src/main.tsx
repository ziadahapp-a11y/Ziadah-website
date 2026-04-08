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

/**
 * Explicit wheel-scroll handler — takes control of mouse-wheel and
 * trackpad scrolling so the page scrolls correctly in all contexts
 * (direct browser, Replit preview iframe, embedded previews, etc.).
 *
 * Strategy: preventDefault() stops the browser's built-in scroll,
 * then we call scrollBy() ourselves. Behaviour is identical to native
 * scroll; no double-scroll, no momentum loss for mouse wheels.
 * deltaMode normalisation: pixel(0) → use as-is, line(1) → ×24px,
 * page(2) → ×innerHeight.
 */
if (typeof window !== "undefined") {
  let rafId: ReturnType<typeof requestAnimationFrame> | null = null;
  let pendingY = 0;
  let pendingX = 0;

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();

    let dy = e.deltaY;
    let dx = e.deltaX;
    if (e.deltaMode === 1) { dy *= 24; dx *= 24; }
    if (e.deltaMode === 2) { dy *= window.innerHeight; dx *= window.innerWidth; }

    pendingY += dy;
    pendingX += dx;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        window.scrollBy({ top: pendingY, left: pendingX, behavior: "instant" });
        pendingY = 0;
        pendingX = 0;
        rafId = null;
      });
    }
  };

  document.addEventListener("wheel", onWheel, { passive: false });
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
