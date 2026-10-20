import {
  useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode,
} from "react";

export type AccordionItem = {
  key: string;
  title: string;
  /** The one line shown when the row is open. */
  note?: string;
  /** Anything beside the note in the open row, e.g. a link. */
  extra?: ReactNode;
};

/** True once the viewport is at least `minPx` wide. */
function useWide(minPx: number) {
  const q = `(min-width: ${minPx}px)`;
  const [wide, setWide] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia(q).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return wide;
}

const WIDE_AT = 900;
/** Scroll spent on each row while the band is pinned. */
const PX_PER_ROW = 110;
/** The gap kept between the site header and the pinned content. */
const PIN_GAP = 16;

/**
 * A STACKED, COLLAPSIBLE LIST WITH A LIVE STAGE BESIDE IT, PINNED WHILE IT PLAYS.
 *
 * WIDE SCREENS. When the band reaches the top of the screen it pins, centred in
 * the space under the header, and the page's scroll is spent on the rows: each
 * one opens in turn and the stage follows. The page itself does not move until
 * the last row has had its turn, and then it carries on. Nothing here steals
 * the wheel: it is plain `position: sticky` inside a taller track, so touchpads,
 * keyboards and scrollbars all behave as they always do.
 *
 * The cost is the track's height: `PX_PER_ROW` for every row after the first,
 * about 1,200px for twelve. That is the price of scroll that moves only the
 * list, and it is paid on desktop only.
 *
 * A CLICK SCROLLS TO THE ROW'S PLACE IN THE TRACK. The open row is a pure
 * function of scroll position, so a click that merely set state would be
 * overwritten by the next scroll event. Scrolling there keeps the page and the
 * open row in agreement, and the same scroll is what the visitor was doing
 * anyway. Rows are not re-evaluated for a moment afterwards so the trip there
 * does not flick through every row in between.
 *
 * NARROW SCREENS. No pin, no scroll-driven opening. The stage sits inside the
 * open row and a tap opens it. A row that grows by a whole widget above the
 * reader shifts everything under their thumb, and browsers disagree on whether
 * to compensate.
 *
 * ONE ROW IS ALWAYS OPEN, because the stage has to show something.
 */
export default function ShapeAccordion({
  items,
  stage,
  label,
  fill = false,
}: {
  items: AccordionItem[];
  /** What the stage shows for the open row. `wide` says where it is drawn. */
  stage: (key: string, ctx: { wide: boolean }) => ReactNode;
  /** Names the list for a screen reader. */
  label: string;
  /** Stretch the stage to the list's height instead of letting it hug its content. */
  fill?: boolean;
}) {
  const uid = useId();
  const wide = useWide(WIDE_AT);
  const n = items.length;
  const [open, setOpen] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const lockUntil = useRef(0);

  const idx = Math.min(open, Math.max(0, n - 1));
  const runway = Math.max(0, n - 1) * PX_PER_ROW;

  const pinTop = () => {
    const h = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-dynamic-height"),
    );
    return (Number.isFinite(h) ? h : 66) + PIN_GAP;
  };

  /* ---- the open row follows scroll (wide only) ----------------------- */
  useEffect(() => {
    if (!wide || n < 2) return;
    const el = track.current;
    if (!el) return;
    let raf = 0;
    let top = pinTop();

    const measure = () => {
      raf = 0;
      if (performance.now() < lockUntil.current) return;
      /* How far the pin has travelled: zero as the band's top edge reaches
         the pin line, `runway` once the last row has had its turn. */
      const scrolled = top - el.getBoundingClientRect().top;
      const p = Math.max(0, Math.min(1, scrolled / runway));
      const next = Math.min(n - 1, Math.floor(p * n));
      setOpen((cur) => (cur === next ? cur : next));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    const onResize = () => { top = pinTop(); onScroll(); };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [wide, n, runway]);

  const choose = useCallback((i: number) => {
    setOpen(i);
    const el = track.current;
    if (!wide || !el || n < 2) return;
    /* Aim for the middle of the row's share of the track. */
    const want = ((i + 0.5) / n) * runway;
    const y = window.scrollY + el.getBoundingClientRect().top - (pinTop() - want);
    lockUntil.current = performance.now() + 900;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  }, [wide, n, runway]);

  /* Arrow keys move between the rows' buttons; Home and End jump to the ends.
     This moves focus only. Opening stays a deliberate Enter or Space. */
  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const btns = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>(".sacc-btn"),
    );
    const at = btns.indexOf(document.activeElement as HTMLButtonElement);
    if (at < 0) return;
    let to = -1;
    if (e.key === "ArrowDown") to = Math.min(btns.length - 1, at + 1);
    else if (e.key === "ArrowUp") to = Math.max(0, at - 1);
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = btns.length - 1;
    if (to >= 0) { e.preventDefault(); btns[to].focus(); }
  };

  if (!n) return null;
  const current = items[idx];

  return (
    <div
      ref={track}
      className="sacc-track"
      data-wide={wide ? "" : undefined}
    >
      <div className="sacc-pin">
        <div className="sacc" data-wide={wide ? "" : undefined} data-fill={fill ? "" : undefined}>
          <ul className="sacc-list" aria-label={label} onKeyDown={onKeyDown}>
            {items.map((it, i) => {
              const on = i === idx;
              const btnId = `${uid}-b${i}`;
              const panelId = `${uid}-p${i}`;
              return (
                <li key={it.key} className="sacc-item" data-open={on ? "" : undefined}>
                  <h3 className="sacc-h">
                    <button
                      type="button"
                      id={btnId}
                      className="sacc-btn"
                      aria-expanded={on}
                      aria-controls={panelId}
                      onClick={() => choose(i)}
                    >
                      <span className="sacc-n" aria-hidden="true">{i + 1}</span>
                      <span className="sacc-t">{it.title}</span>
                      <span className="sacc-i" aria-hidden="true">{on ? "−" : "+"}</span>
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={btnId} className="sacc-panel">
                    <div className="sacc-panel-in">
                      <div className="sacc-body">
                        {it.note ? <p className="sacc-note">{it.note}</p> : null}
                        {it.extra}
                        {!wide && on ? (
                          <div className="sacc-inline">{stage(it.key, { wide })}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {wide ? (
            <div className="sacc-stage-col">
              <div key={current.key} className="sacc-stage">
                {stage(current.key, { wide })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* THE RUNWAY IS A REAL CHILD, NOT PADDING. A sticky element is confined
          to its parent's CONTENT box, and padding is outside it: with the
          runway as padding-bottom the pin had no room to travel and scrolled
          away like any other block. */}
      {wide ? <div className="sacc-runway" aria-hidden="true" style={{ height: runway }} /> : null}
    </div>
  );
}
