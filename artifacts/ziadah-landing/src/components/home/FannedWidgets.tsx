import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { StorefrontWidget, WIDGET_KINDS, widgetKindLabel } from "@/components/widgets/storefrontSets";

/**
 * THE FANNED DECK.
 *
 * The hero used to show one device with one screen in it, which said "Ziadah
 * does a thing" without saying how many. The deck says the real thing: there
 * are five shapes Ziadah can put on a storefront, here they all are, and you
 * can go through them.
 *
 * The cards are the SAME components the sector pages render, scaled down, not
 * pictures of them. A screenshot in a hero is a promise that ages; this one
 * cannot drift from the product because it is the product.
 *
 * THREE WAYS IN, because a hero has to work for everyone:
 *   pointer   moving across the stage tilts the fan, and clicking a card
 *             brings it to the front
 *   keyboard  the cards are buttons in tab order; arrow keys step the deck
 *   neither   it is a legible fan of five cards with the active one upright,
 *             and `prefers-reduced-motion` removes the tilt entirely
 */
/* THE SPREAD IS DAMPED, NOT LINEAR.
   A flat 118px per card was drawn for a deck of five. The deck now holds
   twelve, which at 118px puts the outermost card 590px from the centre - off
   the side of the stage and, at 1440, clean off the viewport, where the
   section's `overflow-x: clip` slices it. A sliced card in a hero reads as a
   rendering fault, not as depth.

   So the first neighbour on each side still steps a full card-width out -
   that gap is what makes the deck legible as separate cards - and every card
   behind it steps a quarter of that. The fan keeps its shape, the back of it
   compresses the way a real fan of cards does, and the outermost card stays
   on the stage. The rotation is capped for the same reason: `d * 7deg` at
   six cards out is 42 degrees, which is a card lying on its side. */
const NEAR = 112;
const FAR = 26;
const fanOffset = (d: number) => {
  const mag = Math.abs(d);
  if (mag === 0) return 0;
  return Math.sign(d) * (NEAR + FAR * (mag - 1));
};
const fanRotate = (d: number) => Math.sign(d) * Math.min(Math.abs(d) * 5, 16);

export default function FannedWidgets() {
  const { isAr } = useLanguage();
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [drag, setDrag] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  /* The pointer id and the x it went down at. A ref, not state: it changes on
     every pointermove and nothing renders from it. */
  const grab = useRef<{ id: number; x: number } | null>(null);
  const n = WIDGET_KINDS.length;

  /* How far the deck has to travel before it counts as a step. Below this a
     drag is a wobble and snaps back, which is what makes a tap on a card
     still read as a tap rather than a half-swipe. */
  const STEP = 90;

  /* The pointer moves the whole fan a few degrees rather than any one card:
     a deck that follows the cursor reads as a physical object, a card that
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
     finger and the pen, so there is no separate touch path to keep in sync
     with this one.

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
          ["--fan-tilt" as string]: tilt,
          /* The deck follows the finger while it is down, damped so a long
             drag does not throw the cards off the stage. */
          ["--fan-drag" as string]: `${Math.max(-140, Math.min(140, drag * 0.55))}px`,
        }}
      >
        {WIDGET_KINDS.map((kind, i) => {
          /* Distance from the active card drives everything: how far out it
             sits, how much it turns, how far back it falls. One number, so
             the fan stays a fan at any deck size.

             WRAPPED, so the deck is a ring rather than a row. A plain
             `i - active` puts every other card on one side, and with the
             first card active all four fanned off the left edge of the
             stage. Wrapping keeps two on each side whichever card is up. */
          let d = i - active;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const far = Math.abs(d);
          return (
            <button
              key={kind}
              type="button"
              className="fan-card"
              data-active={d === 0 ? "" : undefined}
              aria-label={widgetKindLabel(kind, isAr)}
              aria-pressed={d === 0}
              onClick={(e) => {
                /* A drag that ends on a card fires a click too. If the deck
                   moved far enough to be a swipe, the swipe already chose
                   the card and this click would overrule it. */
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
              <span className="fan-card-tag">{widgetKindLabel(kind, isAr)}</span>
              <span className="fan-card-stage" aria-hidden={d !== 0}>
                <StorefrontWidget kind={kind} />
              </span>
            </button>
          );
        })}
      </div>

      {/* The deck's own controls. Dots rather than arrows, because the point
          is how MANY shapes there are. */}
      <div className="fan-dots" role="group" aria-label={isAr ? "أشكال الويدجت" : "Widget shapes"}>
        {WIDGET_KINDS.map((kind, i) => (
          <button
            key={kind}
            type="button"
            className="fan-dot"
            aria-pressed={i === active}
            aria-label={widgetKindLabel(kind, isAr)}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
      <p className="fan-now">{widgetKindLabel(WIDGET_KINDS[active], isAr)}</p>
    </div>
  );
}
