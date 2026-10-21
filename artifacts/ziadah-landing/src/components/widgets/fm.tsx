import { type ReactNode } from "react";
import {
  ArrowLeft, ArrowRight, CheckCheck, CircleDashed, CircleCheck, CopyPlus, PlusSquare, ShoppingCart, Square, Star, Wallet, X,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { productImage } from "@/lib/product-images";
import { ProductIcon } from "@/lib/product-icons";

/**
 * THE MODAL FAMILY OF THE FIGMA WIDGET KIT.
 *
 * The "Add more products", "Add more save more" and "Increase Cart Value"
 * frames: a white modal over a black ground, product cards with a discount
 * badge, a tag, a rating and a price. Numbers are in `styles/fw.css` (`fm-*`).
 */

export function FmOverlay({ children }: { children: ReactNode }) {
  const { isAr } = useLanguage();
  return (
    <div className="fw-ov" data-mode="center" data-tone="black" dir={isAr ? "rtl" : "ltr"}>
      {children}
    </div>
  );
}

export function FmModal({ children, close = true }: { children: ReactNode; close?: boolean }) {
  return (
    <div className="fm">
      {close ? <X className="fm-x" aria-hidden="true" /> : null}
      {children}
    </div>
  );
}

export function FmHead({ title, sub }: { title: ReactNode; sub: ReactNode }) {
  return (
    <div className="fm-head">
      <b>{title}</b>
      <span>{sub}</span>
    </div>
  );
}

/** The green card: a balance and the two perks the offer carries. */
export function FmStat({ amount, label, perks }: { amount: ReactNode; label: ReactNode; perks: ReactNode[] }) {
  return (
    <div className="fm-stat">
      <span className="fm-stat-ic"><Wallet aria-hidden="true" /></span>
      <div className="fm-stat-main">
        <div className="fm-bal">
          <b>{amount}</b>
          <span>{label}</span>
        </div>
        <div className="fm-perks">
          {perks.map((p, i) => (
            <span key={i} className="fm-perk">
              <CheckCheck aria-hidden="true" />
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FmList({ children }: { children: ReactNode }) {
  return <div className="fm-list">{children}</div>;
}

export type FmAction = "add" | "added" | "replace" | "options";

export function FmCard({ name, tag, was, now, off, action, on, reviews }: {
  name: string; tag: ReactNode; was: ReactNode; now: ReactNode; off: ReactNode; action: ReactNode; on?: boolean; reviews: ReactNode;
  kind?: FmAction;
}) {
  const src = productImage(name);
  return (
    <div className="fm-card" data-on={on ? "" : undefined}>
      <span className="fm-media" aria-hidden="true">
        {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : <ProductIcon name={name} size={120} />}
        <span className="fm-badge"><b>{off}</b><i>OFF</i></span>
      </span>
      <div className="fm-det">
        <div className="fm-info">
          <span className="fm-tag">{tag}</span>
          <p className="fm-title">{name}</p>
          <div className="fm-rate">
            <span><Star aria-hidden="true" />4.95</span>
            <span>{reviews}</span>
          </div>
        </div>
        <div className="fm-row">
          <span className="fm-price"><s>{was}</s><b>{now}</b></span>
          <span className="fm-btn" data-added={on ? "" : undefined}>{action}</span>
        </div>
      </div>
    </div>
  );
}

export function FmCopy() {
  return <CopyPlus className="fm-copy" aria-hidden="true" />;
}

export function FmTotal({ label, was, now, save }: { label: ReactNode; was: ReactNode; now: ReactNode; save: ReactNode }) {
  return (
    <div className="fm-total">
      <b>{label}</b>
      <span className="fm-save">
        <s>{was}</s>
        <strong>{now}</strong>
        <em>{save}</em>
      </span>
    </div>
  );
}

export function FmActions({ cart, amount, checkout }: { cart: ReactNode; amount: ReactNode; checkout: ReactNode }) {
  const { isAr } = useLanguage();
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  return (
    <div className="fm-actions">
      <span className="fm-cart"><span>{cart}</span><b>{amount}</b></span>
      <span className="fm-go">{checkout}<CircleCheck aria-hidden="true" /></span>
      <span hidden><Arrow /></span>
    </div>
  );
}

export function FmAddAll({ children }: { children: ReactNode }) {
  return <span className="fm-addall">{children}<PlusSquare aria-hidden="true" /></span>;
}

export function FmFoot({ label, skip }: { label: ReactNode; skip: ReactNode }) {
  return (
    <div className="fm-foot">
      <label><Square aria-hidden="true" />{label}</label>
      <b>{skip}</b>
    </div>
  );
}

export function FmDeal({ name, note, was, now, off, ship, on, cta }: {
  name: ReactNode; note: ReactNode; was: ReactNode; now: ReactNode; off: ReactNode; ship?: ReactNode; on?: boolean; cta?: ReactNode;
}) {
  return (
    <div className="fm-deal" data-on={on ? "" : undefined}>
      <div className="fm-deal-h">
        <span className="fm-radio" aria-hidden="true" />
        <div className="fm-deal-n"><b>{name}</b><span>{note}</span></div>
        <div className="fm-deal-p">
          <div><s>{was}</s><b>{now}</b><em>{off}</em></div>
          {ship ? <span>{ship}</span> : null}
        </div>
      </div>
      {cta ? <span className="fm-deal-add">{cta}</span> : null}
    </div>
  );
}

export function FmValue({ title, sub, hint, tiers, done, checkout }: {
  title: ReactNode; sub: ReactNode; hint: ReactNode; tiers: ReactNode[]; done: number; checkout: ReactNode;
}) {
  return (
    <div className="fm-value">
      <div className="fm-value-h">
        <span className="fm-value-ic"><ShoppingCart aria-hidden="true" /></span>
        <div className="fm-value-t"><b>{title}</b><span>{sub}</span></div>
      </div>
      <div className="fm-ms">
        <b>{hint}</b>
        <div className="fm-seg">
          {tiers.map((_, i) => <i key={i} data-on={i < done ? "" : undefined} />)}
        </div>
        <div className="fm-tiers">
          {tiers.map((tr, i) => (
            <span key={i} className="fm-tier" data-on={i < done ? "" : undefined}>
              {i < done ? <CircleCheck aria-hidden="true" /> : <CircleDashed aria-hidden="true" />}
              {tr}
            </span>
          ))}
        </div>
      </div>
      <span className="fm-go">{checkout}<CircleCheck aria-hidden="true" /></span>
    </div>
  );
}

export function FmFull({ children }: { children: ReactNode }) {
  const { isAr } = useLanguage();
  return <div className="fm-full" dir={isAr ? "rtl" : "ltr"}>{children}</div>;
}

export function FmFullMedia({ name, badge }: { name: string; badge: ReactNode }) {
  const src = productImage(name);
  return (
    <div className="fm-full-media" aria-hidden="true">
      {src ? <img src={src} alt="" /> : <ProductIcon name={name} size={260} />}
      <span className="fm-full-badge">{badge}</span>
    </div>
  );
}

export function FmFullCta({ children }: { children: ReactNode }) {
  const { isAr } = useLanguage();
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  return <span className="fm-full-cta">{children}<Arrow aria-hidden="true" /></span>;
}
