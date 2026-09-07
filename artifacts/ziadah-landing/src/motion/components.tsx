import {
  useEffect,
  useReducer,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { useMotion } from "./MotionProvider";

/* =====================================================================
   Motion primitives as React components.

   Each one creates its GSAP tween / ScrollTrigger on mount and kills it on
   unmount via `gsap.context()`. The script these were ported from registers
   its triggers globally (`ScrollTrigger.batch('[data-reveal]')`), which leaks
   across routes in an SPA: triggers for an unmounted page keep firing against
   stale positions. Scoping per component costs one trigger per element and
   makes teardown exact.

   Note what is NOT here: pinning. The reference's sticky vocabulary is CSS
   `position: sticky` with token-derived offsets (see `system.css`), driven by
   a passive scroll read where it needs state (`sections/scroll.ts`). Nothing
   in the sticky system depends on this bundle loading.
   ===================================================================== */

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Stagger position within a group — 0.08s apart. */
  index?: number;
  /** Distance travelled on entry. 0 fades only (used for wide bands). */
  y?: number;
  /**
   * Hands the rendered node to the caller. A callback rather than a forwarded
   * ref because `Reveal` is generic over `as` and already owns an internal ref
   * for its own trigger; this lets a caller observe the same node without the
   * two refs fighting over it.
   */
  nodeRef?: (el: HTMLElement | null) => void;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/**
 * Scroll reveal. GSAP owns both the start state and the animation, so the
 * inline styles it writes always win over the stylesheet — no class-vs-inline
 * race.
 *
 * One deliberate divergence from the original script: it reverses the reveal in
 * `onLeaveBack`, which suits a short showcase page but means real copy
 * disappears whenever a visitor scrolls back up a long marketing page. Here the
 * reveal plays once and the trigger is then released, so content stays on
 * screen and ~60 triggers per page don't stay live.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  index = 0,
  y = 28,
  nodeRef,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const attach = (el: HTMLElement | null) => {
    ref.current = el;
    nodeRef?.(el);
  };
  const { gsap, ScrollTrigger } = useMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !gsap || !ScrollTrigger) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.08,
        overwrite: true,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [gsap, ScrollTrigger, index, y]);

  return (
    <Tag ref={attach} data-reveal="" {...rest}>
      {children}
    </Tag>
  );
}

type ParallaxProps<T extends ElementType> = {
  as?: T;
  /** Fraction of the element's height it drifts across the scroll. */
  ratio?: number;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/** Scrubbed parallax drift, tied to the nearest section's scroll span. */
export function Parallax<T extends ElementType = "div">({
  as,
  ratio = 0.2,
  children,
  ...rest
}: ParallaxProps<T>) {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const { gsap, ScrollTrigger } = useMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !gsap || !ScrollTrigger) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -ratio * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") || el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [gsap, ScrollTrigger, ratio]);

  return (
    <Tag ref={ref} data-parallax={ratio} {...rest}>
      {children}
    </Tag>
  );
}

type CounterProps = {
  to: number;
  /** Digits after the decimal point — scores like 9.2 need one. */
  decimals?: number;
  /** Rendered around the animated number, e.g. a thousands-separated format. */
  format?: (value: number) => string;
} & Omit<ComponentPropsWithoutRef<"span">, "children">;

/**
 * Stat counter. Counts once on entry, and renders the final value immediately
 * when motion is off — the number is content, so it must never be missing.
 */
export function Counter({ to, decimals = 0, format, className, ...rest }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { gsap, ScrollTrigger } = useMotion();
  const render = format ?? ((v: number) => v.toFixed(decimals));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!gsap || !ScrollTrigger) {
      el.textContent = render(to);
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: to,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = render(obj.v);
            },
          });
        },
      });
    }, el);

    return () => {
      ctx.revert();
      el.textContent = render(to);
    };
    // `render` is derived from `format`, which callers define inline.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gsap, ScrollTrigger, to, decimals, format]);

  return (
    <span ref={ref} className={className} {...rest}>
      {render(to)}
    </span>
  );
}

/**
 * The hero load-in, scoped to a container instead of the document.
 * Order and timings: eyebrow, masked title lines, remaining
 * hero elements, then the visual.
 */
export function useHeroIntro<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const { gsap } = useMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || !gsap) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (root.querySelector(".hero-eyebrow")) {
        tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6 });
      }
      if (root.querySelector(".hero-title .line > span")) {
        tl.from(
          ".hero-title .line > span",
          { yPercent: 115, duration: 0.9, stagger: 0.12 },
          "-=0.3",
        );
      }
      if (root.querySelector("[data-hero-el]")) {
        tl.from(
          "[data-hero-el]",
          { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 },
          "-=0.5",
        );
      }
      if (root.querySelector("[data-hero-visual]")) {
        tl.from(
          "[data-hero-visual]",
          { y: 40, opacity: 0, scale: 0.96, duration: 1 },
          "-=0.8",
        );
      }
    }, root);

    return () => ctx.revert();
  }, [gsap]);

  return ref;
}

/**
 * The header's scrolled state. Sets `data-scrolled` past 12px, which the
 * stylesheet uses to blur the bar and shrink its height.
 */
export function useHeaderScrolled<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // MEASURED: the header is transparent over every section, so its own ink
    // has to follow whatever is painted underneath it. Sections stamp their
    // colour inline rather than through a class, so the test is a hit test at
    // the header's own bottom edge followed by a relative-luminance read of
    // the first ancestor that actually paints a background. Once the header
    // paints its own backdrop (scrolled) the question is moot.
    const parseRgb = (v: string): [number, number, number] | null => {
      const m = v.match(/^rgba?\(([^)]+)\)/);
      if (!m) return null;
      const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
      if (parts.length < 3 || parts.slice(0, 3).some(Number.isNaN)) return null;
      // A fully transparent ground paints nothing, so keep looking upward.
      if (parts.length >= 4 && parts[3] === 0) return null;
      return [parts[0], parts[1], parts[2]];
    };

    // WCAG relative luminance. The 0.5 threshold is the midpoint of that
    // scale, not a tuned constant.
    const luminance = ([r, g, b]: [number, number, number]) => {
      const f = (c: number) => {
        const x = c / 255;
        return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };

    // Normalises any CSS colour token (hex, oklab, color-mix) to `rgb()` by
    // letting the engine compute it.
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;left:-9999px;width:0;height:0";
    document.body.appendChild(probe);
    const toRgb = (token: string) => {
      probe.style.color = "";
      probe.style.color = token;
      return getComputedStyle(probe).color;
    };

    const syncTheme = () => {
      // The header follows the section beneath it the whole way down: its ink
      // flips through `data-theme`, and once scrolled it also PAINTS that
      // section's own ground through `--header-ground`.
      //
      // It used to paint nothing at any scroll position, on the reference's
      // measurement. Measured on this site: at 33 of 61 sampled scroll
      // positions, page text passed directly under the header's own nav text
      // with nothing between them. Painting the section's own ground fixes the
      // collision without introducing a band of a different colour - the bar is
      // the same colour as what is behind it, it simply stops being
      // see-through.
      const y = el.getBoundingClientRect().bottom + 1;
      const hit = document.elementFromPoint(
        window.innerWidth / 2,
        y,
      ) as HTMLElement | null;

      // Read the SECTION's ground, not the first painted ancestor of whatever
      // element happens to sit under the probe point. A scroll scene paints
      // its ground from a layer INSIDE its sticky wrapper, so that layer is a
      // SIBLING of the title - walking ancestors from the title skips the
      // ground entirely and finds the white app shell, which is what left dark
      // ink on the dark hero.
      //
      // A themed section stamps its own ground as `--color-primary`. That is
      // the contract the whole colour system already runs on, so it is the
      // reliable source here.
      const section = hit?.closest("[data-family], .page > *") as HTMLElement | null;
      if (section) {
        const stamped = getComputedStyle(section)
          .getPropertyValue("--color-primary")
          .trim();
        if (stamped) {
          const rgb = parseRgb(toRgb(stamped));
          if (rgb) {
            if (luminance(rgb) < 0.5) el.setAttribute("data-theme", "dark");
            else el.removeAttribute("data-theme");
            el.style.setProperty("--header-ground", `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`);
            return;
          }
        }
      }

      // Fallback: composite the painted ancestors, for chrome outside a section.
      let node = hit;
      while (node && node !== document.documentElement) {
        const rgb = parseRgb(getComputedStyle(node).backgroundColor);
        if (rgb) {
          if (luminance(rgb) < 0.5) el.setAttribute("data-theme", "dark");
          else el.removeAttribute("data-theme");
          el.style.setProperty("--header-ground", `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`);
          return;
        }
        node = node.parentElement;
      }
      el.removeAttribute("data-theme");
      el.style.removeProperty("--header-ground");
    };

    const onScroll = () => {
      if (window.scrollY > 12) el.setAttribute("data-scrolled", "");
      else el.removeAttribute("data-scrolled");
      syncTheme();
    };

    /* One sync per frame however many mutations arrive. A route swap replaces
       hundreds of nodes; the read itself is one hit test and one style read,
       but doing it hundreds of times in a frame is still waste. */
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        syncTheme();
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);

    /* MEASURED DEFECT, and the reason this observer exists.
     *
     * The sync used to run once at mount and then only on scroll. Every route
     * is a lazy chunk, so at the moment the header mounts the page under it
     * usually is not there yet: the hit test lands on the white app shell, the
     * header stamps white, and - because nobody has scrolled - it never
     * corrects itself.
     *
     * On /platforms, /about and /use-cases, whose heroes are navy, that left
     * the nav and the wordmark at rgb(10,10,10) on #000B24. 1.02:1. The bar was
     * effectively invisible until the first scroll, and the same staleness hit
     * every client-side navigation, which carries the previous page's ink into
     * the next page's hero.
     *
     * Watching `main` for content changes fixes both cases from one cause:
     * the header re-reads whatever is now beneath it. */
    const main = document.querySelector("main") ?? document.body;
    const mo = new MutationObserver(schedule);
    mo.observe(main, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

/** True once the page has scrolled past `threshold` — drives the sticky CTA. */
export function useScrolledPast(threshold: number): boolean {
  // The listener runs on every scroll frame, so it compares against a ref and
  // only forces a render on the two transitions that actually matter.
  const past = useRef(false);
  const [, bump] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > threshold;
      if (next !== past.current) {
        past.current = next;
        bump();
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return past.current;
}
