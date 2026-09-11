import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { productImage } from "@/lib/product-images";

/**
 * THE STOREFRONT PREVIEW KIT.
 *
 * What this replaces, and why. Every widget preview was built the same way:
 * a violet-bordered card with a violet drop shadow and `backdrop-filter:
 * blur(20px)` applied twice, holding rows that were themselves violet boxes
 * with violet borders, holding a full-width pale-violet ghost button repeated
 * once per row. Three levels of tinted rounded box at nearly the same radius,
 * every piece of text at 12px, and the only accent colour in the composition
 * spent on a control that read as disabled.
 *
 * No storefront on Zid or Salla looks like that. A real recommendation widget
 * is a NEUTRAL block on the store's own ground: a heading, products separated
 * by whitespace rather than by borders, a price that is the largest thing on
 * the row because price is what the shopper is scanning for, and exactly one
 * solid button.
 *
 * The kit is deliberately small - a shell, a tile, a row, a button, a price -
 * because sixteen widgets sharing five primitives is what makes them read as
 * one product instead of sixteen drafts.
 */

/* ── THE TILE ───────────────────────────────────────────────────────────
   There is no product photography in this repository, and there was never
   going to be: these are illustrative demos of a merchant's own catalogue.

   The previous answer was a grey square holding a grey silhouette, which is
   the universal rendering of "this image failed to load" - so every preview
   looked broken rather than illustrative. This one does not pretend to be a
   photograph at all. It is a colour field derived from the product's own name
   plus its initial, the same honest device Gmail and Notion use when they
   have no avatar. A tile that is obviously a tile cannot read as a broken
   photo. */

/** A stable hue from the product name, so one product keeps one colour. */
function hueOf(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}

/** The first real glyph of the name, skipping quotes and brackets. */
function initialOf(name: string): string {
  const m = name.trim().match(/[\p{L}\p{N}]/u);
  return m ? m[0] : "•";
}

export function ProductTile({
  name,
  size = 48,
  radius = 10,
}: {
  name: string;
  size?: number;
  radius?: number;
}) {
  /* A photograph where one exists. The catalogue is being shot a sector at a
     time, so most names still have none, and those keep the colour field below
     - which is why this is a lookup and not a required prop.

     The shots are cut-outs on white, and the card is white too, so a bare
     photo would have no edge and the row would lose its rhythm. The hairline
     gives the tile back its silhouette. */
  const src = productImage(name);
  /* A path whose file is not there yet must not print a broken image: the
     catalogue is filled in over time, and a gap should look like the
     unphotographed case, which is the tile below. */
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);
  if (src && !broken) {
    return (
      <span
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          flex: "none",
          display: "block",
          overflow: "hidden",
          background: "#fff",
          boxShadow: "inset 0 0 0 1px rgba(10, 10, 10, 0.1)",
        }}
      >
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </span>
    );
  }

  const h = hueOf(name);
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        flex: "none",
        display: "grid",
        placeItems: "center",
        /* Two stops of one hue, low saturation. Saturated tiles would compete
           with the price, which is the thing the row exists to show. */
        background: `linear-gradient(145deg, hsl(${h} 42% 92%), hsl(${(h + 40) % 360} 38% 85%))`,
        color: `hsl(${h} 45% 32%)`,
        fontSize: Math.round(size * 0.42),
        fontWeight: 600,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      {initialOf(name)}
    </span>
  );
}

/* ── THE SHELL ──────────────────────────────────────────────────────────
   One border, one radius, no blur, no violet. `title` and `subtitle` are
   rendered - the old shell accepted both props and dropped them on the floor,
   so every preview was a body with no heading and the widget's own name lived
   only in the page around it. */

export function WidgetShell({
  title,
  subtitle,
  children,
  maxWidth = 320,
  footer,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  maxWidth?: number;
  footer?: ReactNode;
}) {
  const { isAr } = useLanguage();
  return (
    <div
      className="wk"
      dir={isAr ? "rtl" : "ltr"}
      style={{ maxWidth, textAlign: isAr ? "right" : "left" }}
    >
      {title ? (
        <div className="wk-head">
          <p className="wk-title">{title}</p>
          {subtitle ? <p className="wk-sub">{subtitle}</p> : null}
        </div>
      ) : null}
      <div className="wk-body">{children}</div>
      {footer ? <div className="wk-foot">{footer}</div> : null}
    </div>
  );
}

/* ── THE PRICE ──────────────────────────────────────────────────────────
   The riyal is a WORD, not a glyph stuck to the digits. It sits at the muted
   tier at a smaller size, because "240" is what the eye needs and "ر.س" is
   what tells it the unit. */

export function Price({
  value,
  was,
  currency,
  size = 15,
}: {
  value: string;
  was?: string;
  currency: string;
  size?: number;
}) {
  return (
    <span className="wk-price" style={{ fontSize: size }}>
      <bdi>{value}</bdi>
      <span className="wk-cur">{currency}</span>
      {was ? (
        <s className="wk-was">
          <bdi>{was}</bdi>
        </s>
      ) : null}
    </span>
  );
}

/* ── THE ROW ────────────────────────────────────────────────────────────
   A product, as a storefront shows one: tile, then a name that is allowed to
   wrap to two lines, then the price at the largest size on the row. Rows are
   separated by a hairline rather than each being its own bordered box - a
   list of five boxes reads as five unrelated things. */

export function ProductRow({
  name,
  price,
  was,
  currency,
  badge,
  action,
  selected,
  onClick,
}: {
  name: string;
  price?: string;
  was?: string;
  currency?: string;
  badge?: ReactNode;
  action?: ReactNode;
  /** The one product the widget is pointing at, if any. */
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className={`wk-row${selected ? " is-sel" : ""}`} onClick={onClick}>
      <ProductTile name={name} />
      <div className="wk-row-main">
        <span className="wk-name">{name}</span>
        <span className="wk-meta">
          {/* `!= null`, not truthiness: several widgets carry the unit inside
              the price string itself and pass `currency=""`, and a falsy
              check dropped the price entirely on those. */}
          {price != null && currency != null ? (
            <Price value={price} was={was} currency={currency} />
          ) : null}
          {badge}
        </span>
      </div>
      {action}
    </div>
  );
}

/* ── THE BUTTON ─────────────────────────────────────────────────────────
   ONE solid primary per preview. The old previews put a pale violet ghost on
   every row, so nothing in the composition read as the action and the whole
   thing read as disabled. `ghost` is the secondary, for a per-row "add" where
   the primary is the cart button underneath it. */

export function WidgetButton({
  children,
  variant = "primary",
  block,
  onClick,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost";
  block?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`wk-btn wk-btn--${variant}${block ? " is-block" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/* A small stated fact - "وفّر 45 ر.س", "الأكثر مبيعاً". One per row at most. */
export function WidgetTag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "save" | "brand";
}) {
  return <span className={`wk-tag wk-tag--${tone}`}>{children}</span>;
}

/** The hairline-separated list the rows sit in. */
export function ProductList({ children }: { children: ReactNode }) {
  return <div className="wk-list">{children}</div>;
}

/* ── A SELECTABLE ROW ───────────────────────────────────────────────────
   Add-ons and bought-together are checklists: the shopper toggles items and
   the total moves. The old version drew this as a violet-filled box with a
   violet border and a violet checkbox, so a CHECKED item and the widget's own
   accent were the same colour and the state was unreadable. The checkbox
   carries the state; the row only tints. */
export function CheckRow({
  name,
  price,
  was,
  currency,
  tag,
  checked,
  onToggle,
}: {
  name: string;
  price?: string;
  was?: string;
  currency?: string;
  tag?: ReactNode;
  checked: boolean;
  onToggle?: () => void;
}) {
  return (
    <label className={`wk-row wk-check${checked ? " is-on" : ""}`}>
      <input
        type="checkbox"
        className="wk-box"
        checked={checked}
        onChange={() => onToggle?.()}
      />
      <ProductTile name={name} size={34} radius={8} />
      <div className="wk-row-main">
        <span className="wk-name">{name}</span>
        <span className="wk-meta">
          {price != null && currency != null ? (
            <Price value={price} was={was} currency={currency} size={13} />
          ) : null}
          {tag}
        </span>
      </div>
    </label>
  );
}

/* A coupon code, as a store shows one: monospaced, dashed frame, copyable. */
export function CouponCode({ code, action }: { code: string; action?: ReactNode }) {
  return (
    <div className="wk-code">
      <span className="wk-code-val">{code}</span>
      {action}
    </div>
  );
}

/* The small stated fact above a list - "مرتّبة حسب اهتمام العميل". Quiet, one
   line, no icon tile and no border: it is a caption, not a control. */
export function WidgetHint({ children }: { children: ReactNode }) {
  return <p className="wk-hint">{children}</p>;
}

/* A totals block: any number of key/value lines, the last one emphasised. */
export function Totals({
  rows,
}: {
  rows: { k: ReactNode; v: ReactNode; total?: boolean }[];
}) {
  return (
    <div className="wk-totals">
      {rows.map((r, i) => (
        <div key={i} className={`wk-kv${r.total ? " wk-kv--total" : ""}`}>
          <span className="wk-kv-k">{r.k}</span>
          <span>{r.v}</span>
        </div>
      ))}
    </div>
  );
}

/* The free-shipping meter. `pct` is clamped, because demo data has overshot
   it before and a fill wider than its track paints outside the widget. */
export function ProgressMeter({ pct, note }: { pct: number; note?: ReactNode }) {
  const w = Math.max(0, Math.min(100, pct));
  return (
    <div className="wk-meter">
      <div className="wk-bar">
        <div className="wk-bar-fill" style={{ width: `${w}%` }} />
      </div>
      {note ? <p className="wk-note">{note}</p> : null}
    </div>
  );
}

/* ── THE PHONE FRAME ────────────────────────────────────────────────────
   A storefront preview shown ON a device, for the pages whose argument is
   "this is what your shopper sees". The frame is INFORMATION - it says the
   surface is a phone in a customer's hand - so it stays; what was wrong was
   everything painted onto it.

   What is gone: a gold-to-cyan gradient strip across the top of the shell, a
   coloured glow behind the device, a status bar with a fake battery, and a
   body whose own rows were grey text on grey. A device frame is a neutral
   bezel around a bright screen, and the screen is where the colour goes.
*/
export function PhoneFrame({
  children,
  label,
  accent,
  width = 300,
}: {
  children: ReactNode;
  /** The store's own name in the phone's title bar, if the demo has one. */
  label?: ReactNode;
  /**
   * The ONE colour this preview is allowed. Sector demos set it so a gold
   * shop reads gold; everything else in the frame takes the band's ink. It
   * used to be four colours at once - a gold price, a cyan price, a violet
   * chip and a gold-to-cyan rule - which reads as four brands, not one store.
   */
  accent?: string;
  width?: number;
}) {
  const { isAr } = useLanguage();
  return (
    <div
      className="wk-phone"
      dir={isAr ? "rtl" : "ltr"}
      style={{ width, ...(accent ? { ["--wk-accent" as string]: accent } : {}) } as CSSProperties}
    >
      <div className="wk-phone-screen">
        {label ? <div className="wk-phone-bar">{label}</div> : null}
        <div className="wk-phone-body">{children}</div>
      </div>
    </div>
  );
}
