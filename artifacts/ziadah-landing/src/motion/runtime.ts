/* =====================================================================
   Motion runtime — one Lenis, one ScrollTrigger, one lifecycle.

   Originally ported from MotionKit's `motion.js`, and deliberately kept when
   the presentation layer was rebuilt on the measured reference system: that
   reference runs Lenis too, so the scroll system transferred unchanged while
   the components around it were replaced. See DESIGN_SYSTEM_MAP.md §C.

   The kit it came from is a single-page, no-build script: it creates Lenis and
   registers ScrollTrigger once on DOMContentLoaded and never tears anything
   down. A routed React app needs the same *system* with a lifecycle:

   - exactly one Lenis instance, owned by the root provider
   - GSAP's ticker drives Lenis (so scrubbed motion stays in sync), and Lenis
     drives ScrollTrigger.update — the "one scroll system" rule
   - every trigger a component creates is killed when that component unmounts
   - the libraries are dynamically imported, so a bundle/network failure leaves
     a fully working page on native scroll

   `prefers-reduced-motion` short-circuits the whole thing: no Lenis, no
   scrubbed motion, reveals shown immediately.
   ===================================================================== */

type Gsap = typeof import("gsap")["gsap"];
type ScrollTriggerT = typeof import("gsap/ScrollTrigger")["ScrollTrigger"];
type LenisT = import("lenis").default;

export type MotionRuntime = {
  /** null when reduced-motion is on or the libraries failed to load. */
  gsap: Gsap | null;
  ScrollTrigger: ScrollTriggerT | null;
  lenis: LenisT | null;
  reduced: boolean;
};

export const IDLE_RUNTIME: MotionRuntime = {
  gsap: null,
  ScrollTrigger: null,
  lenis: null,
  reduced: false,
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let startPromise: Promise<MotionRuntime> | null = null;
let current: MotionRuntime = IDLE_RUNTIME;

/**
 * The live runtime, synchronously. `MotionProvider` is the React-side reader;
 * this exists for the plain-DOM callers (anchor scrolling) that have no
 * context to read from. Before the system boots — and whenever it is idle —
 * this is `IDLE_RUNTIME`, which every consumer already handles.
 */
export function getMotionRuntime(): MotionRuntime {
  return current;
}

/**
 * Boot the scroll system once per page load. Repeat callers get the same
 * promise, so a remounting provider (StrictMode double-invoke, HMR) never ends
 * up with two Lenis instances competing for the scroll position.
 */
export function startMotion(): Promise<MotionRuntime> {
  if (startPromise) return startPromise;

  startPromise = (async (): Promise<MotionRuntime> => {
    if (typeof window === "undefined") return IDLE_RUNTIME;

    if (prefersReducedMotion()) {
      current = { ...IDLE_RUNTIME, reduced: true };
      return current;
    }

    try {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // Lenis feeds ScrollTrigger; GSAP's ticker drives Lenis. One clock.
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      function tick(time: number) {
        lenis.raf(time * 1000);
      }

      const root = document.documentElement;
      // `data-lenis` turns off native smooth scrolling (see index.css) and
      // `data-motion-ready` arms the reveal start state, so content is only
      // ever hidden once something is guaranteed to reveal it again.
      root.setAttribute("data-lenis", "");
      root.setAttribute("data-motion-ready", "");

      current = { gsap, ScrollTrigger, lenis, reduced: false };
      return current;
    } catch {
      // CDN/bundle failure, unsupported browser — fall back to native scroll.
      // Nothing is hidden, every interaction still works.
      return IDLE_RUNTIME;
    }
  })();

  return startPromise;
}

/** Scroll to an element (or offset), routed through Lenis when it is running. */
export function scrollToTarget(
  runtime: MotionRuntime,
  target: Element | number,
  offset = -80,
): void {
  if (runtime.lenis) {
    runtime.lenis.scrollTo(target as never, { offset });
    return;
  }
  const behavior: ScrollBehavior = runtime.reduced || prefersReducedMotion() ? "auto" : "smooth";
  if (typeof target === "number") {
    window.scrollTo({ top: Math.max(0, target + offset), behavior });
    return;
  }
  const y = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: Math.max(0, y), behavior });
}

/** Jump without animation — used on route change. */
export function scrollToTopImmediate(runtime: MotionRuntime): void {
  if (runtime.lenis) {
    runtime.lenis.scrollTo(0, { immediate: true });
    return;
  }
  window.scrollTo(0, 0);
}
