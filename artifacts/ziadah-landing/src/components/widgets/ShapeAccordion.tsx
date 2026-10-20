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

/** True once the viewport is at least `minPx` wide. Client-rendered, so the
 *  first render already knows; there is no server markup to disagree with. */
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

/**
 * A STACKED, COLLAPSIBLE LIST WITH A LIVE STAGE BESIDE IT.
 *
 * It replaces the row of chips that every shape band used to be. Chips are
 * tabs, and a tab strip asks the visitor to do something before anything
 * happens. This list does it for them: as the band scrolls through the
 * screen the rows open one after another and the stage follows, and a click
 * on any row takes over.
 *
 * ONE ROW IS ALWAYS OPEN. The stage has to show something, so collapsing the
 * open row would leave either an empty stage or a stage that disagrees with
 * the list. Clicking an open row is therefore a no-op.
 *
 * WHAT DRIVES THE OPENING: THE ROW CROSSING A LINE, MEASURED COLLAPSED
 * A row opens when it crosses a line a little past the middle of the screen,
 * so the open row is always the one the visitor is reading and the stage is
 * on screen beside it. That is what `useScrollActive` in `sections/scroll.ts`
 * does, with one difference that matters: it reads where the rows ARE, and
 * these rows move. Opening one grows it, which pushes every row below it down,
 * which can carry one across the line and flip the selection back - the list
 * would argue with itself at every boundary.
 *
 * So each row's position is computed as if every row were COLLAPSED: the
 * list's top edge plus the row number times a fixed stride, the stride being
 * the collapsed button's height and the grid gap. Nothing in that sum changes
 * when a row opens, so the opening cannot feed back on itself.
 *
 * NO EXTRA PAGE HEIGHT. The band keeps its natural height and the rows open
 * as it scrolls past, which is about one row per 60px of scroll. Pinning the
 * section and letting scroll advance it would add several screens of
 * scrolling the visitor did not ask for.
 *
 * An earlier version keyed the opening off the band's TOP edge. The last row
 * then opened when the band was mostly scrolled away, with under a third of
 * the stage still on screen. Keyed off the row itself, that cannot happen.
 *
 * A CLICK PINS THE CHOICE until the band leaves the screen, so the list does
 * not keep re-opening rows under a visitor who is reading one.
 *
 * NARROW SCREENS: the stage moves INSIDE the open row, and opening by scroll
 * is switched off. A row that grows by a whole widget while it opens, above
 * the point the visitor is reading, shifts everything beneath it under their
 * thumb, and browsers do not agree on whether to compensate. Tapping works;
 * scrolling just scrolls.
 */
export default function ShapeAccordion({
  items,
  stage,
  label,
  stageMax = 0,
}: {
  items: AccordionItem[];
  /** What the stage shows for the open row. `wide` says where it is drawn. */
  stage: (key: string, ctx: { wide: boolean }) => ReactNode;
  /** Names the list for a screen reader. */
  label: string;
  /**
   * The tallest the stage ever gets, in px.
   *
   * The stage hugs its sheet, so its height changes with the open row. On a
   * band where the stage is the taller column that changes the band's own
   * height, and everything below it shifts every time a row opens - while the
   * visitor is scrolling. Holding the band at the stage's maximum keeps the
   * page still. Where the list is the taller column this has no effect.
   */
  stageMax?: number;
}) {
  const uid = useId();
  const wide = useWide(WIDE_AT);
  const n = items.length;
  const [open, setOpen] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const listEl = useRef<HTMLUListElement>(null);
  const pinned = useRef(false);

  const idx = Math.min(open, Math.max(0, n - 1));

  /* ---- opening by scroll (wide only) --------------------------------- */
  useEffect(() => {
    if (!wide || n < 2) return;
    const el = root.current;
    if (!el) return;
    let raf = 0;

    const measure = () => {
      raf = 0;
      const band = el.getBoundingClientRect();
      const H = window.innerHeight;
      /* Off screen releases the pin, so coming back to the band starts
         following the scroll again. */
      if (band.bottom < 0 || band.top > H) pinned.current = false;
      if (pinned.current) return;

      const ul = listEl.current;
      const btn = ul?.querySelector<HTMLElement>(".sacc-btn");
      if (!ul || !btn) return;
      const gap = parseFloat(getComputedStyle(ul).rowGap) || 0;
      const stride = btn.offsetHeight + gap;
      /* The line the rows open on, a little past the middle: the open row is
         where the eye already is, and the stage beside it is mostly on screen. */
      const line = H * 0.55;
      const top = ul.getBoundingClientRect().top;
      /* The last row whose COLLAPSED centre has crossed the line. */
      const next = Math.max(0, Math.min(n - 1, Math.floor((line - top - btn.offsetHeight / 2) / stride)));
      setOpen((cur) => (cur === next ? cur : next));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [wide, n]);

  const choose = useCallback((i: number) => {
    pinned.current = true;
    setOpen(i);
  }, []);

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
      ref={root}
      className="sacc"
      data-wide={wide ? "" : undefined}
      style={wide && stageMax ? { minHeight: stageMax } : undefined}
    >
      <ul ref={listEl} className="sacc-list" aria-label={label} onKeyDown={onKeyDown}>
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
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="sacc-panel"
              >
                <div className="sacc-panel-in">
                  <div className="sacc-body">
                    {it.note ? <p className="sacc-note">{it.note}</p> : null}
                    {it.extra}
                    {/* Narrow: the stage lives in the open row. */}
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
  );
}
