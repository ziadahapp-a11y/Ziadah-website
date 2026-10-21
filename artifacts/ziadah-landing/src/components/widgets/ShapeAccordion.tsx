import { useEffect, useId, useState, type KeyboardEvent, type ReactNode } from "react";

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

/**
 * A STACKED, COLLAPSIBLE LIST WITH A LIVE STAGE BESIDE IT.
 *
 * WIDE SCREENS. The list is on one side and the stage on the other; opening a
 * row swaps the sheet on the stage. NARROW SCREENS. The stage sits inside the
 * open row. Either way a row opens only when it is pressed.
 *
 * IT USED TO PIN. On wide screens the band stuck to the window and the page's
 * scroll was spent opening the rows one by one, so the page stood still until
 * the last row had had its turn. Scrolling past it felt like being held, the
 * pin made the page lag, and a click had to scroll to a place in the track to
 * stay in agreement with it. All of that is gone: the page scrolls as it
 * always does and the rows are plain buttons.
 *
 * ONE ROW IS ALWAYS OPEN, because the stage has to show something.
 */
export default function ShapeAccordion({
  items,
  stage,
  label,
  fill = false,
  head,
}: {
  items: AccordionItem[];
  /** What the stage shows for the open row. `wide` says where it is drawn. */
  stage: (key: string, ctx: { wide: boolean }) => ReactNode;
  /** Names the list for a screen reader. */
  label: string;
  /** Stretch the stage to the list's height instead of letting it hug its content. */
  fill?: boolean;
  /**
   * A heading that pins WITH the list, above it.
   *
   * While the band is pinned the page's own heading has scrolled away, and a
   * short list left alone in a screenful of space is a card with no caption.
   * For a band whose heading and list fit the window together, pass the
   * heading here. A band too tall for both (twelve rows plus a heading) should
   * not: it would push the list off the bottom of the window.
   */
  head?: ReactNode;
}) {
  const uid = useId();
  const wide = useWide(WIDE_AT);
  const n = items.length;
  const [open, setOpen] = useState(0);
  const idx = Math.min(open, Math.max(0, n - 1));
  const choose = (i: number) => setOpen(i);

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
    <div className="sacc-track">
      <div className="sacc-pin">
        {head}
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
    </div>
  );
}
