import { type ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { productImage } from "@/lib/product-images";

/**
 * THE STOREFRONT WIDGETS, AS THE DESIGN FILE DRAWS THEM.
 *
 * Built from the real frames on `Storefront · shopper (Desktop + Mobile)` in
 * `KW5IvLzjZ1OXf0v9iJJHvj`, not from a description of them:
 *
 *   S3  Build your kit            2325:60927
 *   S4  Step by step package      2325:67775
 *   S5  Curated sections          2325:59306, complete 2351:19671
 *   S7  Buy more save more        2341:10530
 *   S8  Cart progress and drawer  2341:10790
 *
 * The kit the site shipped before had ONE sheet shape - a title, a product
 * row, some suggestions, a button - and every offer was squeezed into it. The
 * file does not work that way: a kit builder, a tier ladder and a cart drawer
 * are different objects with different furniture, and flattening them into
 * one row list is what made fifteen previews look like fifteen copies of the
 * same thing.
 *
 * THE SHARED VOCABULARY, read off the frames:
 *   sheet        white, 1px #e1e0e1, 16px radius
 *   chosen       violet border and a violet pill; unchosen is a grey border
 *                and a plain "Add"
 *   saving       green, always, and only for money already saved
 *   nudge        amber, for the one thing that would unlock the next tier
 *   price bar    pale violet ground, the old price struck, the new price big
 *                and violet
 *   cta          black pill, full width, arrow trailing
 *   tile         #faf5ff, the photograph when there is one
 */

/* ── primitives ─────────────────────────────────────────────────────── */

export function Sheet({
  title, sub, chips, children, footer, onClose,
}: {
  title: ReactNode; sub?: ReactNode; chips?: ReactNode;
  children: ReactNode; footer?: ReactNode; onClose?: boolean;
}) {
  const { isAr } = useLanguage();
  return (
    <div className="sf" dir={isAr ? "rtl" : "ltr"}>
      <div className="sf-head">
        <div className="sf-head-row">
          <p className="sf-title">{title}</p>
          {onClose ? <span className="sf-x" aria-hidden="true">×</span> : null}
        </div>
        {sub ? <p className="sf-sub">{sub}</p> : null}
        {chips ? <div className="sf-chips">{chips}</div> : null}
      </div>
      <div className="sf-body">{children}</div>
      {footer ? <div className="sf-foot">{footer}</div> : null}
    </div>
  );
}

export function Pill({ children, tone = "violet" }: { children: ReactNode; tone?: "violet" | "green" | "grey" | "amber" }) {
  return <span className={`sf-pill is-${tone}`}>{children}</span>;
}

/** The violet track every tier widget opens with. */
export function Progress({ pct }: { pct: number }) {
  return (
    <div className="sf-bar" role="presentation">
      <i style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
    </div>
  );
}

/** The tier ladder: reached steps go green, the rest stay grey. */
export function Tiers({ tiers, reached }: { tiers: { label: ReactNode; off: ReactNode }[]; reached: number }) {
  return (
    <div className="sf-tiers">
      {tiers.map((t, i) => (
        <span key={i} className="sf-tier" data-on={i < reached ? "" : undefined}>
          <b>{t.label}</b>
          <i>{t.off}</i>
        </span>
      ))}
    </div>
  );
}

function Tile({ name, size = 40 }: { name: string; size?: number }) {
  const src = productImage(name);
  return (
    <span className="sf-tile" style={{ width: size, height: size }} aria-hidden="true">
      {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : null}
    </span>
  );
}

/** A choice inside a group: chosen carries the violet edge and the pill. */
export function Option({
  name, price, chosen, locked, action, sizes, size,
}: {
  name: string; price: ReactNode; chosen?: boolean; locked?: boolean;
  action?: ReactNode; sizes?: string[]; size?: string;
}) {
  const { isAr } = useLanguage();
  return (
    <div className="sf-opt" data-chosen={chosen ? "" : undefined} data-locked={locked ? "" : undefined}>
      <Tile name={name} size={64} />
      <span className="sf-opt-n">{name}</span>
      <span className="sf-opt-p">{price}</span>
      {sizes?.length ? (
        <span className="sf-sizes">
          {sizes.map((s) => (
            <span key={s} className="sf-size" data-on={s === size ? "" : undefined}>{s}</span>
          ))}
        </span>
      ) : null}
      <span className="sf-opt-a">
        {locked
          ? <span className="sf-locked">{isAr ? "مُضمّن" : "Included"}</span>
          : chosen
            ? <Pill>{isAr ? "مختار" : "Chosen"}</Pill>
            : action ?? <span className="sf-add">{isAr ? "أضف" : "Add"}</span>}
      </span>
    </div>
  );
}

export function Group({ label, meta, children }: { label: ReactNode; meta?: ReactNode; children: ReactNode }) {
  return (
    /* A DIV, not a SECTION. The design system puts 76px of vertical padding
       on bare `section` elements, and a `<section>` inside the sheet picked
       it up: three groups came out 333px tall for 173px of content, with the
       void reading as a layout bug in the widget. */
    <div className="sf-group">
      <div className="sf-group-h">
        <span className="sf-group-l">{label}</span>
        {meta ? <span className="sf-group-m">{meta}</span> : null}
      </div>
      <div className="sf-grid">{children}</div>
    </div>
  );
}

/** A numbered step, as the routine sheet draws it. */
export function Step({ n, kicker, name, price, swap }: {
  n: number; kicker: ReactNode; name: string; price: ReactNode; swap?: boolean;
}) {
  const { isAr } = useLanguage();
  return (
    <div className="sf-step">
      <span className="sf-step-k">{n} · {kicker}</span>
      <span className="sf-step-n">{name}</span>
      <span className="sf-step-p">{price}</span>
      {swap ? <span className="sf-swap">{isAr ? "استبدل" : "Swap"}</span> : null}
    </div>
  );
}

/** A plain row with an action, used by the drawer. */
export function AddRow({ name, meta, price, action }: {
  name: string; meta?: ReactNode; price: ReactNode; action?: ReactNode;
}) {
  const { isAr } = useLanguage();
  return (
    <div className="sf-row">
      <Tile name={name} />
      <span className="sf-row-main">
        <span className="sf-row-n">{name}</span>
        {meta ? <span className="sf-row-m">{meta}</span> : null}
      </span>
      {action ?? <span className="sf-add">{isAr ? "أضف" : "Add"}</span>}
      <span className="sf-row-p">{price}</span>
    </div>
  );
}

/** The amber panel: the one thing that would unlock the next tier. */
export function Nudge({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="sf-nudge">
      <p className="sf-nudge-t">{title}</p>
      {children}
    </div>
  );
}

export function PriceBar({ label, was, now, tone = "violet" }: {
  label: ReactNode; was?: ReactNode; now: ReactNode; tone?: "violet" | "plain";
}) {
  return (
    <div className="sf-price" data-tone={tone}>
      <span className="sf-price-l">{label}</span>
      {was ? <s className="sf-price-w">{was}</s> : null}
      <b className="sf-price-n">{now}</b>
    </div>
  );
}

export function Cta({ children }: { children: ReactNode }) {
  const { isAr } = useLanguage();
  return (
    <span className="sf-cta">
      {children}
      <i aria-hidden="true">{isAr ? "←" : "→"}</i>
    </span>
  );
}

export function Success({ children }: { children: ReactNode }) {
  return <p className="sf-ok"><span aria-hidden="true">✓</span>{children}</p>;
}
