import { type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CircleCheck, Info, Lock, Square, Truck, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { productImage } from "@/lib/product-images";
import { ProductIcon } from "@/lib/product-icons";

/**
 * THE FIGMA WIDGET KIT.
 *
 * Primitives for the mobile frames in the Storefront Design file, with the
 * numbers in `styles/fw.css` read off those frames. A shape is built by
 * stacking these in the order its frame stacks them; nothing here invents a
 * container the frame does not have.
 */

/** The page the frame is drawn on: grey, 20px of side padding. */
export function FwPage({ children, sheet }: { children: ReactNode; sheet?: boolean }) {
  const { isAr } = useLanguage();
  return (
    <div className="fw" dir={isAr ? "rtl" : "ltr"} data-sheet={sheet ? "" : undefined}>
      {children}
    </div>
  );
}

/** The dark ground a modal or bottom sheet is drawn over. */
export function FwOverlay({ children, mode = "bottom" }: { children: ReactNode; mode?: "bottom" | "center" }) {
  const { isAr } = useLanguage();
  return (
    <div className="fw-ov" dir={isAr ? "rtl" : "ltr"} data-mode={mode}>
      {children}
    </div>
  );
}

export function FwHead({ title, sub }: { title: ReactNode; sub?: ReactNode }) {
  return (
    <>
      <p className="fw-title">{title}</p>
      {sub ? <p className="fw-sub">{sub}</p> : null}
    </>
  );
}

export function FwH({ children }: { children: ReactNode }) {
  return <p className="fw-h">{children}</p>;
}

export type FwChipState = "done" | "on" | "todo";

export function FwChips({ steps }: { steps: { n: string; label: string; state: FwChipState }[] }) {
  return (
    <div className="fw-chips">
      {steps.map((s) => (
        <span key={s.n} className="fw-chip" data-state={s.state}>
          <i>{s.n}</i>
          {s.label}
        </span>
      ))}
    </div>
  );
}

/** The photograph if the shop has one, else the icon for its kind. */
export function FwMedia({ name }: { name: string }) {
  const src = productImage(name);
  return (
    <span className="fw-media" aria-hidden="true">
      {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : <ProductIcon name={name} size={88} />}
    </span>
  );
}

export function FwCards({ children }: { children: ReactNode }) {
  return <div className="fw-cards">{children}</div>;
}

export function FwCard({ name, price, on, action, fluid, locked }: {
  name: string; price: ReactNode; on?: boolean; action?: ReactNode; fluid?: boolean; locked?: boolean;
}) {
  return (
    <div className="fw-card" data-on={on ? "" : undefined} data-fluid={fluid ? "" : undefined}>
      <FwMedia name={name} />
      <p className="fw-name">{name}</p>
      <div className="fw-meta">
        <span>{price}</span>
        <span className="fw-fill" />
        {locked ? <Lock className="fw-lock" aria-hidden="true" /> : <span className="fw-act">{action}</span>}
      </div>
    </div>
  );
}

export function FwNote({ text, action }: { text: ReactNode; action?: ReactNode }) {
  return (
    <div className="fw-note">
      <Info aria-hidden="true" />
      <span>{text}</span>
      <span className="fw-fill" />
      {action ? <b>{action}</b> : null}
    </div>
  );
}

export function FwCta({ children, muted }: { children: ReactNode; muted?: boolean }) {
  const { isAr } = useLanguage();
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  return (
    <span className="fw-cta" data-muted={muted ? "" : undefined}>
      {children}
      <Arrow aria-hidden="true" />
    </span>
  );
}

/** The white card with the price line and the black button. */
export function FwTotal({ label, was, now, cta, tint, muted, r20 }: { label: ReactNode; was?: ReactNode; now: ReactNode; cta: ReactNode; tint?: boolean; muted?: boolean; r20?: boolean }) {
  return (
    <div className="fw-total" data-tint={tint ? "" : undefined} data-r20={r20 ? "" : undefined}>
      <div className="fw-total-row">
        <span className="fw-total-l">{label}</span>
        <span className="fw-fill" />
        {was ? <s className="fw-total-was">{was}</s> : null}
        <b className="fw-total-now">{now}</b>
      </div>
      <FwCta muted={muted}>{cta}</FwCta>
    </div>
  );
}

export function FwOk({ children }: { children: ReactNode }) {
  return (
    <div className="fw-ok">
      <CircleCheck aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

/** A chosen step: kicker, name and price, with one action at the end. */
export function FwStep({ kicker, name, price, action }: { kicker: ReactNode; name: string; price: ReactNode; action: ReactNode }) {
  return (
    <div className="fw-step">
      <FwMedia name={name} />
      <div className="fw-step-main">
        <span className="fw-step-k">{kicker}</span>
        <span className="fw-step-n">{name}</span>
        <span className="fw-step-p">{price}</span>
      </div>
      <span className="fw-step-a">{action}</span>
    </div>
  );
}

/** The big photo a kit opens with. */
export function FwHero({ name }: { name: string }) {
  const src = productImage(name);
  return (
    <span className="fw-hero" aria-hidden="true">
      {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : <ProductIcon name={name} size={240} />}
    </span>
  );
}

export function FwTitles({ title, sub }: { title: ReactNode; sub?: ReactNode }) {
  return (
    <div className="fw-titles">
      <p className="fw-title">{title}</p>
      {sub ? <p className="fw-sub">{sub}</p> : null}
    </div>
  );
}

export function FwPill({ children, tone = "grey" }: { children: ReactNode; tone?: "tint" | "green" | "grey" }) {
  return <span className="fw-pill" data-tone={tone}>{children}</span>;
}

export function FwPills({ children }: { children: ReactNode }) {
  return <div className="fw-pills">{children}</div>;
}

export function FwBar({ pct }: { pct: number }) {
  return (
    <div className="fw-bar" role="presentation">
      <i style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
    </div>
  );
}

/** A group card: its name, the rule on it, and its options. */
export function FwGroup({ title, rule, panel, children }: { title: ReactNode; rule: ReactNode; panel?: boolean; children: ReactNode }) {
  return (
    <div className="fw-group" data-panel={panel ? "" : undefined}>
      <div className="fw-group-h">
        <span className="fw-group-t">{title}</span>
        <span className="fw-fill" />
        <FwPill>{rule}</FwPill>
      </div>
      <div className="fw-group-cards">{children}</div>
    </div>
  );
}

/** The card with the count pill, the bar and the tier ladder. */
export function FwProg({ title, count, pct, tiers }: {
  title: ReactNode; count: ReactNode; pct: number; tiers: { label: ReactNode; off: ReactNode; on?: boolean }[];
}) {
  return (
    <div className="fw-prog">
      <div className="fw-prog-h">
        <span className="fw-prog-t">{title}</span>
        <span className="fw-fill" />
        <FwPill tone="tint">{count}</FwPill>
      </div>
      <FwBar pct={pct} />
      <div className="fw-tiers">
        {tiers.map((tr, i) => (
          <span key={i} className="fw-tier" data-on={tr.on ? "" : undefined}>
            <b>{tr.label}</b>
            <span>{tr.off}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** A product card with a size row under its price. */
export function FwSizeCard({ name, price, on, sizes, size }: {
  name: string; price: ReactNode; on?: boolean; sizes?: string[]; size?: string;
}) {
  return (
    <div className="fw-card" data-on={on ? "" : undefined} data-sz="">
      <FwMedia name={name} />
      <p className="fw-name">{name}</p>
      <p className="fw-price">{price}</p>
      {sizes?.length ? (
        <div className="fw-sizes">
          {sizes.map((z) => (
            <span key={z} className="fw-size" data-on={z === size ? "" : undefined}>{z}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function FwHandle() {
  return <span className="fw-handle" aria-hidden="true" />;
}

/** The sheet's own header: a title over a line, and the close mark. */
export function FwSheetHead({ title, sub, close = true }: { title: ReactNode; sub?: ReactNode; close?: boolean }) {
  return (
    <div className="fw-sheet-h">
      <div>
        <p className="fw-sheet-t">{title}</p>
        {sub ? <p className="fw-sheet-s">{sub}</p> : null}
      </div>
      {close ? <X className="fw-x" aria-hidden="true" /> : null}
    </div>
  );
}

/** A product row, with an optional tag before its price. */
export function FwItem({ name, note, price, tag, tone }: {
  name: string; note?: ReactNode; price: ReactNode; tag?: ReactNode; tone?: "green";
}) {
  return (
    <div className="fw-item">
      <FwMedia name={name} />
      <div className="fw-item-main">
        <b>{name}</b>
        {note ? <span>{note}</span> : null}
      </div>
      {tag ? <span className="fw-tag" data-tone={tone}>{tag}</span> : null}
      <span className="fw-item-p">{price}</span>
    </div>
  );
}

export function FwAmber({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="fw-amber">
      <p>{title}</p>
      {children}
    </div>
  );
}

/** A price panel without a card: label, struck price, price. */
export function FwSubTotal({ label, was, now }: { label: ReactNode; was?: ReactNode; now: ReactNode }) {
  return (
    <div className="fw-sub-total">
      <span className="fw-total-l">{label}</span>
      <span className="fw-fill" />
      {was ? <s className="fw-total-was">{was}</s> : null}
      <b className="fw-total-now">{now}</b>
    </div>
  );
}

export function FwLink({ children }: { children: ReactNode }) {
  return <span className="fw-link">{children}</span>;
}

export function FwPerk({ children }: { children: ReactNode }) {
  return (
    <div className="fw-perk">
      <Truck aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

/** The last line of a modal: the opt-out on one side, Skip on the other. */
export function FwFoot({ label, skip }: { label: ReactNode; skip: ReactNode }) {
  return (
    <div className="fw-foot">
      <label>
        <Square aria-hidden="true" />
        {label}
      </label>
      <span className="fw-fill" />
      <b>{skip}</b>
    </div>
  );
}
