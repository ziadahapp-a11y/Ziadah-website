import { getMotionRuntime, scrollToTarget } from "@/motion/runtime";

/** مسافة تحت شريط التنقل الثابت — scrollIntoView لا يحترم ارتفاع الـ nav العائم */
const ANCHOR_BELOW_NAV_GAP = 16;

export function getAnchorScrollTopOffset(): number {
  /* WHAT THIS REPLACED. Two queries for `.desktop-nav` and `.mobile-top-bar`,
     the pre-W1.7 navbar. Neither element has existed since; both queries
     returned null and every anchor jump fell through to the 32px floor below,
     against a header measuring 83px on a phone and 98px on a desktop. Targets
     landed 51 to 66px under the bar that was covering them - on the page rail,
     the use-case quick nav, the sector nav and every `#hash` navigation.

     Measured off the live header rather than `--header-dynamic-height`, so the
     scrolled and announce-bar states are included without restating the sum. */
  const header = document.querySelector(".site-header") as HTMLElement | null;
  if (header) {
    const cs = getComputedStyle(header);
    if (cs.display !== "none" && cs.visibility !== "hidden") {
      const rect = header.getBoundingClientRect();
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
