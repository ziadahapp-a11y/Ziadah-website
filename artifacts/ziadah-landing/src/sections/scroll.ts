import { useEffect, useRef, useState } from "react";

/**
 * Which item in a list is "current", derived from scroll position.
 *
 * This is the mechanism behind the reference's `scrollable-list`: a media
 * column stays pinned while the rows scroll past it, and exactly one row is
 * active at a time. The active row is the one crossing the viewport's middle
 * band, which is where the pinned media sits.
 *
 * Deliberately independent of the motion library: the pinning is CSS
 * `position: sticky` and the active row is derived from a passive scroll
 * listener read on rAF, so the whole pattern keeps working when the
 * GSAP/Lenis bundle fails to load.
 */
export function useScrollActive(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  // Set by a click or hover; suppresses the scroll-derived value briefly so a
  // deliberate selection is not immediately overwritten.
  const pinnedUntil = useRef(0);

  useEffect(() => {
    if (count === 0) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      if (Date.now() < pinnedUntil.current) return;
      const nodes = refs.current.slice(0, count);
      // The line the pinned media sits on. The LAST row that has crossed it is
      // the active one — using "the row intersecting a 1px band" instead would
      // leave the final row unreachable, because once it passes the line
      // nothing intersects and the state freezes one row short.
      const line = window.innerHeight * 0.5;
      let next = 0;
      for (let i = 0; i < nodes.length; i += 1) {
        const el = nodes[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) next = i;
      }
      setActive((cur) => (cur === next ? cur : next));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  const select = (index: number) => {
    pinnedUntil.current = Date.now() + 1200;
    setActive(index);
  };

  const register = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { active, select, register };
}

/**
 * Fires once, when an element first reaches the viewport.
 *
 * Replaces a scroll-pinned runway. The pinned version needed the element to be
 * TALLER than the viewport to have any progress to read, which is how the
 * closing CTA came to reserve 1300px to say three words. Entering the viewport
 * is the only signal that reveal actually needed.
 */
export function useEnterOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
      return;
    }
    /* No observer (or a stubbed one in a test runner) must still resolve to
       the finished state rather than leaving the heading half-drawn. */
    if (typeof IntersectionObserver === "undefined") {
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setEntered(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, entered };
}
