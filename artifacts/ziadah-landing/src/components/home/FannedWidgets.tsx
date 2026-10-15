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
export default function FannedWidgets() {
  const { isAr } = useLanguage();
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const n = WIDGET_KINDS.length;

  /* The pointer moves the whole fan a few degrees rather than any one card:
     a deck that follows the cursor reads as a physical object, a card that
     follows the cursor reads as a bug. */
  const onMove = useCallback((e: React.PointerEvent) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    setTilt(Math.max(-1, Math.min(1, x * 2)));
  }, []);

  const step = useCallback((d: number) => setActive((i) => (i + d + n) % n), [n]);

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
        onPointerLeave={() => setTilt(0)}
        style={{ ["--fan-tilt" as string]: tilt }}
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
              onClick={() => setActive(i)}
              style={{
                ["--d" as string]: d,
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
