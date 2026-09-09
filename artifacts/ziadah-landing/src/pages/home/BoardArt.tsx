import type { ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { placements } from "@/lib/features-data";

/**
 * The product surfaces that fill a media card on a bento board.
 *
 * These are not illustrations of Ziadah; they are Ziadah, drawn in DOM and CSS
 * from the same tokens the rest of the page uses. Every figure on one is
 * either a worked example the copy also states - a 250-riyal cart plus a
 * 120-riyal suggestion is a 370-riyal order - or is read straight out of
 * `features-data`, so a surface cannot drift away from the product.
 *
 * A surface is decorative: its card's caption carries the meaning and the
 * stage that holds it is `aria-hidden`. That is why nothing here is a heading
 * and nothing here is a link.
 *
 * The `.bart-*` vocabulary these use was ported in W1.4 and had no consumer
 * until now; the anatomy is the reference's, the subject is Ziadah's.
 */

/* The chrome every surface shares: a title bar with a live dot. */
function Panel({
  title,
  badge,
  children,
  className,
}: {
  title: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bart ${className ?? ""}`}>
      <div className="bart-head">
        <span className="bart-dot" />
        <span className="bart-head-title">{title}</span>
        {badge ? <span className="bart-badge">{badge}</span> : null}
      </div>
      {children}
    </div>
  );
}

export function BoardArt({ surface }: { surface: string }) {
  const t = useT();
  /* The official SAR glyph (U+20C1) is not reliably covered by the loaded
     font, so the abbreviation is used everywhere on the site. */
  const sar = t({ ar: "ر.س", en: "SAR" });

  switch (surface) {
    /* ---- the engine's core act: rank, and say why -------------------- */
    case "suggestions":
      return (
        <Panel title={t({ ar: "اقتراحات لهذا العميل", en: "Suggestions for this shopper" })}>
          <p className="bart-label">{t({ ar: "يتصفّح الآن", en: "Browsing now" })}</p>
          <p className="bart-fig">{t({ ar: "حذاء رياضي", en: "Running shoe" })}</p>
          <ul className="bart-rows">
            {[
              { k: "socks", n: t({ ar: "جوارب رياضية", en: "Sports socks" }), w: t({ ar: "يُشترى مع الحذاء", en: "Bought with the shoe" }), a: `+45 ${sar}` },
              { k: "cleaner", n: t({ ar: "منظّف أحذية", en: "Shoe cleaner" }), w: t({ ar: "نفس الفئة", en: "Same category" }), a: `+35 ${sar}` },
              { k: "insole", n: t({ ar: "نعل داخلي", en: "Insole" }), w: t({ ar: "تصفّحه قبل قليل", en: "Browsed just now" }), a: `+60 ${sar}` },
            ].map((r) => (
              <li key={r.k} className="bart-row">
                <span className="bart-row-mark" />
                <span className="bart-row-text">
                  <span className="bart-row-name">{r.n}</span>
                  <span className="bart-row-when">{r.w}</span>
                </span>
                <span className="bart-row-amt num-ltr">{r.a}</span>
              </li>
            ))}
          </ul>
          <p className="bart-foot">
            {t({ ar: "لا عطور، ولا منتجات ما لها علاقة", en: "No perfume, nothing unrelated" })}
          </p>
        </Panel>
      );

    /* ---- the bundle, priced --------------------------------------- */
    case "bundle":
      return (
        <Panel title={t({ ar: "حزمة تُشترى معاً", en: "A bought-together bundle" })}>
          <ul className="bart-rows bart-rows--tight">
            {[
              { k: "cam", n: t({ ar: "كاميرا", en: "Camera" }), v: `1,200 ${sar}` },
              { k: "tri", n: t({ ar: "حامل ثلاثي", en: "Tripod" }), v: `260 ${sar}` },
              { k: "sd", n: t({ ar: "بطاقة ذاكرة", en: "Memory card" }), v: `90 ${sar}` },
            ].map((r) => (
              <li key={r.k} className="bart-row bart-row--flat">
                <span className="bart-row-name">{r.n}</span>
                <span className="bart-row-amt num-ltr">{r.v}</span>
              </li>
            ))}
          </ul>
          <div className="bart-result">
            <span className="bart-row-when">{t({ ar: "الحزمة معاً", en: "As one bundle" })}</span>
            <span className="bart-arrow" />
            <span className="bart-result-amt num-ltr">{`1,395 ${sar}`}</span>
          </div>
        </Panel>
      );

    /* ---- where the widget can run ----------------------------------- */
    /* Rows are read out of `features-data`, so this surface names the same
       placements `/features` publishes and cannot list one that page does
       not have. */
    case "placements":
      return (
        <Panel title={t({ ar: "أماكن العرض", en: "Placements" })}>
          <ul className="bart-rows bart-rows--tight">
            {placements.slice(0, 6).map((p) => (
              <li key={p.slug} className="bart-row bart-row--flat">
                <span className="bart-row-ico">
                  <p.Icon className="bart-row-svg" />
                </span>
                <span className="bart-row-name bart-grow">{t({ ar: p.title, en: p.titleEn })}</span>
                <span className="bart-toggle is-on" />
              </li>
            ))}
          </ul>
        </Panel>
      );

    /* ---- the install path -------------------------------------------- */
    case "install":
      return (
        <Panel title={t({ ar: "التثبيت", en: "Install" })}>
          <ol className="bart-steps">
            {[
              t({ ar: "ثبّت من متجر التطبيقات", en: "Install from the app market" }),
              t({ ar: "اختر أماكن العرض", en: "Pick the placements" }),
              t({ ar: "شغّل المحرك", en: "Switch the engine on" }),
            ].map((s, i) => (
              <li key={s} className={`bart-stepline${i < 2 ? " is-done" : ""}`}>
                <span className="bart-tick" />
                <span className="bart-row-name">{s}</span>
              </li>
            ))}
          </ol>
          <div className="bart-result">
            <span className="bart-row-when">{t({ ar: "بدون مطوّر", en: "No developer" })}</span>
            <span className="bart-arrow" />
            <span className="bart-result-amt">{t({ ar: "دقائق", en: "Minutes" })}</span>
          </div>
        </Panel>
      );

    /* ---- what the connector reads, and what it does not -------------- */
    case "permissions":
      return (
        <Panel title={t({ ar: "ما يقرأه الموصّل", en: "What the connector reads" })}>
          <ul className="bart-rows bart-rows--tight">
            {[
              { k: "catalog", n: t({ ar: "الكتالوج وأوصاف المنتجات", en: "Catalogue and product descriptions" }), on: true },
              { k: "cats", n: t({ ar: "الفئات", en: "Categories" }), on: true },
              { k: "behaviour", n: t({ ar: "سلوك الشراء", en: "Buying behaviour" }), on: true },
              { k: "payment", n: t({ ar: "بيانات الدفع", en: "Payment data" }), on: false },
              { k: "share", n: t({ ar: "مشاركة خارجية", en: "External sharing" }), on: false },
              { k: "ads", n: t({ ar: "استخدام إعلاني", en: "Advertising use" }), on: false },
            ].map((r) => (
              <li key={r.k} className="bart-row bart-row--flat">
                <span className="bart-row-name bart-grow">{r.n}</span>
                <span className={`bart-toggle${r.on ? " is-on" : ""}`} />
              </li>
            ))}
          </ul>
          <p className="bart-foot">
            {t({ ar: "الحد الأدنى اللازم لاختيار المنتج المقترَح", en: "The minimum needed to choose a suggested product" })}
          </p>
        </Panel>
      );

    /* ---- the engine reordering itself, as a shape not a claim -------- */
    case "performance":
      return (
        <Panel title={t({ ar: "أداء أماكن العرض", en: "Placement performance" })}>
          <div className="bart-bars">
            {[34, 46, 41, 63, 55, 82, 70].map((h, i) => (
              <span key={h} className={`bart-bar${i === 5 ? " is-on" : ""}`} style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="bart-foot">
            {t({
              ar: "المحرك يرفع المكان الأعلى تحويلاً تلقائياً",
              en: "The engine promotes the best-converting placement on its own",
            })}
          </p>
        </Panel>
      );

    /* ---- the aggregate numbers --------------------------------------- */
    case "proof":
      return (
        <Panel title={t({ ar: "منذ الإطلاق", en: "Since launch" })}>
          <p className="bart-label">{t({ ar: "مبيعات إضافية للتجار", en: "Extra sales for merchants" })}</p>
          <p className="bart-fig num-ltr">{`+20M ${sar}`}</p>
          <ul className="bart-rows bart-rows--tight">
            {[
              { k: "stores", n: t({ ar: "متجر يستخدم زيادة", en: "Stores using Ziadah" }), v: "+1,500" },
              { k: "orders", n: t({ ar: "طلب فيه منتج مقترَح", en: "Orders with a suggested item" }), v: "+200K" },
              { k: "impr", n: t({ ar: "مرة عُرض فيها اقتراح", en: "Suggestions shown" }), v: "+40M" },
            ].map((r) => (
              <li key={r.k} className="bart-row bart-row--flat">
                <span className="bart-row-name bart-grow">{r.n}</span>
                <span className="bart-row-amt num-ltr">{r.v}</span>
              </li>
            ))}
          </ul>
          <p className="bart-foot">
            {t({ ar: "أرقام تراكمية عبر كل المتاجر", en: "Cumulative across every store" })}
          </p>
        </Panel>
      );

    default:
      return null;
  }
}
