import { useEffect } from "react";
import { useLocation } from "wouter";
import { useMotion } from "@/motion/MotionProvider";
import { scrollToTopImmediate } from "@/motion/runtime";
import { getAnchorScrollTopOffset } from "@/utils/anchorScroll";

/**
 * On every route change, scroll to the top — or to the #hash target if the URL
 * carries one. Hash-only changes (in-page anchors) don't change the wouter
 * pathname, so they're left to the smooth-scroll handlers in PageTransition.
 *
 * Both jumps go through Lenis when it is running: setting `window.scrollY`
 * behind Lenis's back leaves its virtual position stale, and the next wheel
 * event snaps the page back to where it thinks it was.
 */
export function ScrollToTop() {
  const [location] = useLocation();
  const runtime = useMotion();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "").split("?")[0];
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - getAnchorScrollTopOffset();
        if (runtime.lenis) runtime.lenis.scrollTo(Math.max(0, y), { immediate: true });
        else window.scrollTo(0, Math.max(0, y));
        return;
      }
    }
    scrollToTopImmediate(runtime);
  }, [location, runtime]);

  return null;
}
