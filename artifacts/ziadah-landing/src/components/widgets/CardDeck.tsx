import {
  useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode,
} from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export type DeckCard = {
  /** Stable identity for the card. */
  key: string;
  /** The chip on the card and the name under the deck. */
  label: string;
  /** What the card shows. Anything; the deck only scales and stacks it. */
  node: ReactNode;
};

/**
 * THE FANNED DECK.
 *
 * Written for the home hero and now shared by the sector and solution heroes,
 * so it takes its cards as data and knows nothing about what is on them.
 *
 * FOUR WAYS TO MOVE IT
 *   click     a card comes to the front
 *   drag      press ANY card and the whole deck follows the pointer one to one,
 *             then glides on and settles on the nearest card
 *   keyboard  arrow keys step it; tabbing to a card brings it forward
 *   itself    it advances every three seconds, and stops the moment anything
 *             says a person is looking at it (see `paused` below)
 *
 * WHY THE DECK IS DRAWN BY A LOOP AND NOT BY CSS TRANSITIONS
 * The earlier version snapped each card to an integer slot and let a CSS
 * transition ease between slots. That cannot follow a finger: a transition
 * restarts on every change and lags the pointer by its own duration, so a drag
 * could only be a threshold that fired one step. Here the deck has a real
 * position in card units, a float. A frame loop eases that position toward a
 * goal, and each frame writes the cards' custom properties straight onto the
 * DOM. The stylesheet still owns the transform's shape; only the numbers move.
 * React re-renders only when the front card changes, never per frame.
 *
 * THE DECK IS A RING, so a card can leave one side and arrive on the other.
 * That crossing is a jump, so the card is faded to nothing over the stretch
 * before it and faded back in after, and it happens at the far back of the
 * fan where nothing is looking.
 */
const NEAR = 112;
const FAR = 26;
/** How long a card stays in front before the deck moves on. */
const AUTOPLAY_MS = 3000;
/** Movement below this is a tap, and stays a tap. */
const DRAG_START_PX = 6;

/** Where a card sits at distance `d` from the front. Continuous through zero:
 *  the first neighbour is a full step out, everything behind steps a quarter
 *  of that, so the fan compresses at the back the way a held fan does. */
const spread = (d: number) => {
  const m = Math.abs(d);
  return m <= 1 ? d * NEAR : Math.sign(d) * (NEAR + FAR * (m - 1));
};
const turn = (d: number) => Math.sign(d) * Math.min(Math.abs(d) * 5, 16);

/** Shortest signed distance on a ring of `n`, in the half-open window
 *  [lo, hi). The window is shifted half a card so that at rest, with whole
 *  positions, every card of an EVEN deck is inside it - a symmetric window
 *  would put the card exactly opposite the front on the boundary. */
const ring = (x: number, n: number) => {
  const hi = Math.floor(n / 2) + 0.5;
  const lo = hi - n;
  return x - n * Math.floor((x - lo) / n);
};
const edgeFade = (d: number, n: number) => {
  const hi = Math.floor(n / 2) + 0.5;
  const lo = hi - n;
  const k = (v: number) => Math.min(1, Math.max(0, v / 0.4));
  return k(hi - d) * k(d - lo);
};

type Press = {
  id: number;
  x0: number;
  pos0: number;
  moved: boolean;
  /** Recent pointer samples, for the speed the deck is thrown at. */
  samples: { x: number; t: number }[];
};
type Source = "hover" | "drag" | "focus" | "hidden" | "off";

export default function CardDeck({
  cards,
  label,
  cardHeight = 400,
}: {
  cards: DeckCard[];
  /** Names the group for a screen reader, e.g. "the shapes" or the sector. */
  label: string;
  /**
   * How tall a card is, in px.
   *
   * It is a prop because the decks hold genuinely different objects. The
   * twelve storefront shapes run up to 880px natural and want the full card;
   * a sector's moment sheets run 294 to 461, and in a card sized for the
   * shapes they left a third of it empty under every sheet.
   */
  cardHeight?: number;
}) {
  const { isAr } = useLanguage();
  const n = cards.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const stage = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLButtonElement | null)[]>([]);
  /* Where the deck IS and where it is GOING, in cards, unbounded. */
  const pos = useRef(0);
  const goal = useRef(0);
  const tilt = useRef(0);
  const tiltGoal = useRef(0);
  const frame = useRef(0);
  const lastT = useRef(0);
  const press = useRef<Press | null>(null);
  const dragging = useRef(false);
  const swallowUntil = useRef(0);
  const reducedRef = useRef(false);
  const sources = useRef<Record<Source, boolean>>({
    hover: false, drag: false, focus: false, hidden: false, off: false,
  });

  /* ---- drawing ------------------------------------------------------- */
  const paint = useCallback(() => {
    const p = pos.current;
    for (let i = 0; i < n; i += 1) {
      const el = els.current[i];
      if (!el) continue;
      const d = ring(i - p, n);
      const m = Math.abs(d);
      el.style.setProperty("--off", `${spread(d).toFixed(2)}px`);
      el.style.setProperty("--rot", `${turn(d).toFixed(3)}deg`);
      el.style.setProperty("--far", m.toFixed(3));
      el.style.setProperty("--edge", edgeFade(d, n).toFixed(3));
      el.style.zIndex = String(1000 - Math.round(m * 100));
    }
    const a = ((Math.round(p) % n) + n) % n;
    setActive((prev) => (prev === a ? prev : a));
  }, [n]);

  /* The frame loop. It runs only while something is still moving, so a deck
     at rest costs nothing. `dt` is capped so a tab that was backgrounded does
     not come back and teleport the deck. */
  const run = useCallback(() => {
    if (frame.current) return;
    lastT.current = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - lastT.current) / 1000);
      lastT.current = now;
      let busy = false;

      const diff = goal.current - pos.current;
      if (reducedRef.current) {
        pos.current = goal.current;
      } else if (Math.abs(diff) > 0.0004) {
        /* Tight while a finger is holding it, loose once it is let go: the
           first reads as attached, the second as momentum. */
        const tau = dragging.current ? 0.045 : 0.17;
        pos.current += diff * (1 - Math.exp(-dt / tau));
        busy = true;
      } else {
        pos.current = goal.current;
      }

      if (reducedRef.current) {
        tilt.current = 0;
      } else {
        const td = tiltGoal.current - tilt.current;
        if (Math.abs(td) > 0.001) {
          tilt.current += td * (1 - Math.exp(-dt / 0.25));
          busy = true;
        } else {
          tilt.current = tiltGoal.current;
        }
      }

      paint();
      stage.current?.style.setProperty("--fan-tilt", tilt.current.toFixed(4));
      frame.current = busy ? requestAnimationFrame(step) : 0;
    };
    frame.current = requestAnimationFrame(step);
  }, [paint]);

  /* Cards are painted before the browser does, so the first frame is already
     a fan and not a stack that snaps open. */
  useLayoutEffect(() => {
    if (pos.current >= n || goal.current >= n) { pos.current = 0; goal.current = 0; }
    paint();
  }, [cards, n, paint]);

  useEffect(() => () => { if (frame.current) cancelAnimationFrame(frame.current); }, []);

  /* ---- moving -------------------------------------------------------- */
  /* To a card by index, the short way round the ring. */
  const goTo = useCallback((index: number) => {
    const base = Math.round(goal.current);
    goal.current = base + ring(index - base, n);
    run();
  }, [n, run]);

  const go = useCallback((delta: number) => {
    goal.current = Math.round(goal.current) + delta;
    run();
  }, [run]);

  /* ---- when it may run by itself ------------------------------------- */
  /* Five reasons to stand still: a pointer is over it, a finger is on it,
     the keyboard is in it, the tab is hidden, or it is scrolled out of view.
     Auto-moving content that cannot be paused fails WCAG 2.2.2, and a deck
     that keeps turning under a cursor that is about to click is a worse bug
     than any of the above. */
  const setSource = useCallback((k: Source, v: boolean) => {
    const s = sources.current;
    if (s[k] === v) return;
    s[k] = v;
    setPaused(s.hover || s.drag || s.focus || s.hidden || s.off);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { reducedRef.current = mq.matches; setReduced(mq.matches); };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onVis = () => setSource("hidden", document.hidden);
    document.addEventListener("visibilitychange", onVis);
    onVis();
    const el = stage.current;
    let io: IntersectionObserver | undefined;
    if (el && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => setSource("off", !entry.isIntersecting),
        { threshold: 0.25 },
      );
      io.observe(el);
    }
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, [setSource]);

  /* The interval is torn down and rebuilt whenever `paused` flips, so after
     any interaction the next move is a FULL three seconds away rather than
     whatever was left on an old timer. */
  useEffect(() => {
    if (paused || reduced || n < 2) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, n, go]);

  /* ---- pointer ------------------------------------------------------- */
  /* NOTHING IS CAPTURED ON POINTER-DOWN.
     The first version captured the pointer on the stage immediately. A
     captured pointer sends the following `click` to the capturing element, so
     no card's own click handler ever ran: measured, 0 of 12 clicks changed a
     card, and with capture disabled the same 12 all did. Capture now starts
     only once the pointer has travelled DRAG_START_PX, so a tap stays a tap
     and still reaches the card, while a drag still survives leaving it. */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    press.current = {
      id: e.pointerId,
      x0: e.clientX,
      pos0: pos.current,
      moved: false,
      samples: [{ x: e.clientX, t: e.timeStamp }],
    };
  };

  const pxPerCard = () => (window.matchMedia("(max-width: 860px)").matches ? 70 : 120);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stage.current;
    if (!el) return;
    const p = press.current;

    if (p && p.id === e.pointerId) {
      const dx = e.clientX - p.x0;
      if (!p.moved) {
        if (Math.abs(dx) < DRAG_START_PX) return;
        p.moved = true;
        /* Re-zero here so the deck does not jump by the threshold. Starting
           from `pos.current` rather than `goal.current` also catches a deck
           that is mid-glide where it actually is. */
        p.x0 = e.clientX;
        p.pos0 = pos.current;
        goal.current = pos.current;
        dragging.current = true;
        el.setPointerCapture?.(e.pointerId);
        el.setAttribute("data-dragging", "");
        setSource("drag", true);
        return;
      }
      /* The deck follows the pointer, not the other way round. RTL mirrors
         the fan, so it mirrors the sign. */
      const dir = isAr ? 1 : -1;
      goal.current = p.pos0 + (dir * (e.clientX - p.x0)) / pxPerCard();
      p.samples.push({ x: e.clientX, t: e.timeStamp });
      while (p.samples.length > 2 && e.timeStamp - p.samples[0].t > 110) p.samples.shift();
      run();
      return;
    }

    /* Not pressed: the whole fan leans a few degrees toward the pointer. A
       deck that follows the cursor reads as an object; a card that follows it
       reads as a bug. */
    const r = el.getBoundingClientRect();
    tiltGoal.current = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
    run();
  };

  const endPress = (e: React.PointerEvent<HTMLDivElement>, cancelled: boolean) => {
    const p = press.current;
    if (!p || p.id !== e.pointerId) return;
    press.current = null;
    if (!p.moved) return;

    dragging.current = false;
    stage.current?.removeAttribute("data-dragging");
    try { stage.current?.releasePointerCapture?.(e.pointerId); } catch { /* already released */ }
    /* A drag that ends over a card can still fire a click. The swipe already
       chose where the deck goes; the click would overrule it. */
    swallowUntil.current = performance.now() + 120;
    setSource("drag", false);

    if (cancelled) { goal.current = Math.round(pos.current); run(); return; }

    /* THROWN, NOT PLACED. The release speed is projected a fraction of a
       second ahead and the deck settles on the card it would have reached,
       so a quick flick travels further than a slow one. */
    const s = p.samples;
    let v = 0;
    if (s.length >= 2) {
      const a = s[0];
      const b = s[s.length - 1];
      const secs = (b.t - a.t) / 1000;
      if (secs > 0.01) v = ((isAr ? 1 : -1) * (b.x - a.x)) / pxPerCard() / secs;
    }
    const thrown = pos.current + Math.max(-3, Math.min(3, v * 0.22));
    goal.current = Math.round(thrown);
    run();
  };

  /* ---- keyboard ------------------------------------------------------ */
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(isAr ? -1 : 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(isAr ? 1 : -1); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go, isAr]);

  if (!n) return null;

  return (
    <div className="fan-wrap">
      <div
        ref={stage}
        className="fan"
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        style={{ ["--fan-card-h" as string]: `${cardHeight}px` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => endPress(e, false)}
        onPointerCancel={(e) => endPress(e, true)}
        onPointerEnter={() => setSource("hover", true)}
        onPointerLeave={() => { tiltGoal.current = 0; run(); setSource("hover", false); }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setSource("focus", false);
        }}
      >
        {cards.map((card, i) => (
          <button
            key={card.key}
            ref={(el) => { els.current[i] = el; }}
            type="button"
            className="fan-card"
            data-active={i === active ? "" : undefined}
            aria-label={card.label}
            aria-pressed={i === active}
            onFocus={(e) => {
              /* Keyboard focus only. A mouse click also focuses a button, and
                 treating that as "the keyboard is here" would pause the deck
                 for good after the first click. */
              if (e.currentTarget.matches(":focus-visible")) {
                setSource("focus", true);
                goTo(i);
              }
            }}
            onClick={(e) => {
              if (performance.now() < swallowUntil.current) { e.preventDefault(); return; }
              goTo(i);
            }}
          >
            <span className="fan-card-tag">{card.label}</span>
            <span className="fan-card-stage" aria-hidden={i !== active}>
              {card.node}
            </span>
          </button>
        ))}
      </div>

      {/* The deck's own controls. Dots rather than arrows, because the point
          is how MANY there are. */}
      <div className="fan-dots" role="group" aria-label={label}>
        {cards.map((card, i) => (
          <button
            key={card.key}
            type="button"
            className="fan-dot"
            aria-pressed={i === active}
            aria-label={card.label}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
      <p className="fan-now">{cards[active]?.label}</p>
    </div>
  );
}
