import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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
 * THE FANNED DECK, AS A COMPONENT RATHER THAN A HOME-PAGE FIXTURE.
 *
 * It was written for the home hero and hard-wired to the twelve storefront
 * shapes. The sector heroes and the solution heroes want the same object with
 * different cards in it - a sector's own moments, or the shapes around one
 * mechanism - so the deck now takes its cards as data and knows nothing about
 * what is on them.
 *
 * THREE WAYS IN, because a hero has to work for everyone:
 *   pointer   moving across the stage tilts the fan; dragging throws it;
 *             clicking a card brings it to the front
 *   keyboard  the cards are buttons in tab order; arrow keys step the deck
 *   neither   it is a legible fan with the active card upright, and
 *             `prefers-reduced-motion` removes the tilt entirely
 *
 * THE SPREAD IS DAMPED, NOT LINEAR. A flat step per card was drawn for a deck
 * of five; at twelve it puts the outermost card off the side of the viewport,
 * where the section's `overflow-x: clip` slices it, and a sliced card in a
 * hero reads as a rendering fault rather than as depth. So the first
 * neighbour on each side steps a full card out - that gap is what makes the
 * deck legible as separate cards - and everything behind it steps a quarter
 * of that. The rotation is capped for the same reason: a linear `d * 7deg` at
 * six cards out is a card lying on its side.
 */
const NEAR = 112;
const FAR = 26;
const fanOffset = (d: number) => {
  const mag = Math.abs(d);
  if (mag === 0) return 0;
  return Math.sign(d) * (NEAR + FAR * (mag - 1));
};
const fanRotate = (d: number) => Math.sign(d) * Math.min(Math.abs(d) * 5, 16);

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
   * shapes they left a third of it empty under every sheet. One size for both
   * means one of the two decks is wrong.
   */
  cardHeight?: number;
}) {
  const { isAr } = useLanguage();
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [drag, setDrag] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  /* The pointer id and the x it went down at. A ref, not state: it changes on
     every pointermove and nothing renders from it. */
  const grab = useRef<{ id: number; x: number } | null>(null);
  const n = cards.length;

  /* How far the deck has to travel before it counts as a step. Below this a
     drag is a wobble and snaps back, which is what keeps a tap on a card
     reading as a tap rather than as a half-swipe. */
  const STEP = 90;

  /* The pointer moves the whole fan a few degrees rather than any one card: a
     deck that follows the cursor reads as a physical object, a card that
     follows the cursor reads as a bug. */
  const onMove = useCallback((e: React.PointerEvent) => {
    const el = stage.current;
    if (!el) return;
    if (grab.current && grab.current.id === e.pointerId) {
      setDrag(e.clientX - grab.current.x);
      return;
    }
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    setTilt(Math.max(-1, Math.min(1, x * 2)));
  }, []);

  const step = useCallback((d: number) => setActive((i) => (i + d + n) % n), [n]);

  /* DRAG AND SWIPE, one set of handlers. Pointer events cover the mouse, the
     finger and the pen, so there is no separate touch path to keep in sync.

     `setPointerCapture` is what makes a drag survive leaving the card it
     started on: without it the deck stops following the moment the finger
     crosses onto a neighbour, which on a fan of overlapping cards is
     immediately. */
  const onDown = useCallback((e: React.PointerEvent) => {
    grab.current = { id: e.pointerId, x: e.clientX };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onUp = useCallback((e: React.PointerEvent) => {
    const g = grab.current;
    grab.current = null;
    setDrag(0);
    if (!g || g.id !== e.pointerId) return;
    const dx = e.clientX - g.x;
    if (Math.abs(dx) < STEP) return;
    /* RTL reads the other way, so a drag toward the start edge means "next"
       in both directions of text. */
    const dir = isAr ? -1 : 1;
    step(dx > 0 ? -dir : dir);
  }, [step, isAr]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); step(isAr ? -1 : 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(isAr ? 1 : -1); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [step, isAr]);

  /* A deck that has lost cards - a sector with fewer moments than the last
     one rendered - must not keep pointing past the end of its own list. */
  useEffect(() => { setActive((i) => (i < n ? i : 0)); }, [n]);

  if (!n) return null;

  return (
    <div className="fan-wrap">
      <div
        ref={stage}
        className="fan"
        onPointerMove={onMove}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={() => { setTilt(0); }}
        data-dragging={grab.current ? "" : undefined}
        style={{
          ["--fan-card-h" as string]: `${cardHeight}px`,
          ["--fan-tilt" as string]: tilt,
          /* The deck follows the finger while it is down, damped so a long
             drag does not throw the cards off the stage. */
          ["--fan-drag" as string]: `${Math.max(-140, Math.min(140, drag * 0.55))}px`,
        }}
      >
        {cards.map((card, i) => {
          /* Distance from the active card drives everything: how far out it
             sits, how much it turns, how far back it falls. One number, so
             the fan stays a fan at any deck size.

             WRAPPED, so the deck is a ring rather than a row. A plain
             `i - active` puts every other card on one side, and with the
             first card active the whole deck fans off one edge of the stage.
             Wrapping keeps half on each side whichever card is up. */
          let d = i - active;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const far = Math.abs(d);
          return (
            <button
              key={card.key}
              type="button"
              className="fan-card"
              data-active={d === 0 ? "" : undefined}
              aria-label={card.label}
              aria-pressed={d === 0}
              onClick={(e) => {
                /* A drag that ends on a card fires a click too. If the deck
                   moved far enough to be a swipe, the swipe already chose the
                   card and this click would overrule it. */
                if (Math.abs(drag) > 6) { e.preventDefault(); return; }
                setActive(i);
              }}
              style={{
                ["--d" as string]: d,
                ["--off" as string]: `${fanOffset(d)}px`,
                ["--rot" as string]: `${fanRotate(d)}deg`,
                ["--far" as string]: far,
                zIndex: n - far,
              }}
            >
              <span className="fan-card-tag">{card.label}</span>
              <span className="fan-card-stage" aria-hidden={d !== 0}>
                {card.node}
              </span>
            </button>
          );
        })}
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
            onClick={() => setActive(i)}
          />
        ))}
      </div>
      <p className="fan-now">{cards[active]?.label}</p>
    </div>
  );
}
