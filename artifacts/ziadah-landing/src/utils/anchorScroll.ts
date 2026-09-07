import { getMotionRuntime, scrollToTarget } from "@/motion/runtime";

/** مسافة تحت شريط التنقل الثابت — scrollIntoView لا يحترم ارتفاع الـ nav العائم */
const ANCHOR_BELOW_NAV_GAP = 16;

export function getAnchorScrollTopOffset(): number {
  const desktop = document.querySelector(".desktop-nav") as HTMLElement | null;
  if (desktop) {
    const cs = getComputedStyle(desktop);
    if (cs.display !== "none" && cs.visibility !== "hidden") {
      const rect = desktop.getBoundingClientRect();
      if (rect.height > 0) return rect.bottom + ANCHOR_BELOW_NAV_GAP;
    }
  }
  const mobileTop = document.querySelector(".mobile-top-bar") as HTMLElement | null;
  if (mobileTop) {
    const cs = getComputedStyle(mobileTop);
    if (cs.display !== "none" && cs.visibility !== "hidden") {
      const rect = mobileTop.getBoundingClientRect();
      if (rect.height > 0) return rect.bottom + ANCHOR_BELOW_NAV_GAP;
    }
  }
  return ANCHOR_BELOW_NAV_GAP * 2;
}

/**
 * Scroll an anchor into view below the fixed nav.
 *
 * Routed through the motion runtime: when Lenis is driving the page, a native
 * smooth `window.scrollTo` and Lenis's own rAF would animate the same scroll
 * against each other. `scrollToTarget` hands the jump to Lenis when it is
 * running and falls back to `window.scrollTo` when it is not, so `behavior`
 * only applies on the native path.
 */
export function scrollToHashElement(hash: string, behavior: ScrollBehavior = "smooth"): boolean {
  const el = document.getElementById(hash);
  if (!el) return false;
  const offset = getAnchorScrollTopOffset();
  const runtime = getMotionRuntime();
  if (runtime.lenis) {
    scrollToTarget(runtime, el, -offset);
    return true;
  }
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, y), behavior });
  return true;
}
