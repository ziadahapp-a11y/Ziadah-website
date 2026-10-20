import { useState } from "react";
import { Section as DsSection, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import { useLanguage } from "@/i18n/LanguageContext";
import { StorefrontWidget, WIDGET_KINDS, widgetKindLabel, type WidgetKind } from "@/components/widgets/storefrontSets";
import FitWidget from "@/components/widgets/FitWidget";

/**
 * WHAT THE MODEL DECIDES, AND WHAT IT PUTS ON THE PAGE.
 *
 * The home page listed capabilities and counted them. It never showed the
 * two halves of the actual product: a model that decides WHAT to offer, and
 * a set of shapes that decide HOW the offer looks. A merchant reading
 * "nineteen capabilities" learns a number; a merchant seeing the model's
 * three inputs beside a live kit builder learns the product.
 *
 * The widgets here are the same components the sector pages and the hero
 * deck render. Three surfaces, one source: none of them can show a shape the
 * product does not ship.
 */
export default function ShapesAi() {
  const { isAr, dir } = useLanguage();
  const [kind, setKind] = useState<WidgetKind>("bmsm");
  const t = (ar: string, en: string) => (isAr ? ar : en);

  const reads = [
    {
      k: t("ما في السلة الآن", "What is in the cart right now"),
      v: t("القطع ومجموعها وكم تبقّى لعتبة الشحن - يُقرأ في كل تغيير لا مرة واحدة.",
           "The items, the total and the distance to the shipping threshold, re-read on every change, not once."),
    },
    {
      k: t("ما اشتراه من سبقه", "What people before them bought"),
      v: t("آلاف الطلبات السابقة في متجرك أنت، لا متوسط سوق. المقترح يأتي من بياناتك.",
           "Thousands of past orders in your store, not a market average. The suggestion comes from your own data."),
    },
    {
      k: t("ما ينفع في قطاعك", "What works in your sector"),
      v: t("ملحق الجوال يُعرض وقت الإضافة للسلة، والمجوهرات وقت الهدية. اللحظة تختلف باختلاف ما تبيع.",
           "A phone accessory belongs at add-to-cart; jewellery belongs at the gift moment. The moment changes with what you sell."),
    },
  ];

  return (
    <DsSection id="section-ai-shapes" family="grey">
      <SectionHead
        center
        kicker={t("أمثلة حية", "Live examples")}
        title={t("النموذج يقرر ماذا يُعرض. الأشكال تقرر كيف يظهر.", "The model decides what to offer. The shapes decide how it looks.")}
        lead={t(
          "مو قائمة منتجات عشوائية. زيادة تقرأ السلة وسجلّ متجرك وقطاعك، تختار العرض المناسب، ثم تضعه في الشكل الذي يناسب اللحظة - كل هذا بدون تعديل على قالب متجرك.",
          "Not a random product list. Ziadah reads the cart, your store's own history and your sector, picks the offer, then puts it in the shape that fits the moment - with no edit to your theme.",
        )}
      />
      <Shell>
        {/* THE CHIPS, FULL WIDTH, ABOVE BOTH COLUMNS.
            Twelve shape names inside a 400px stage wrapped onto four lines
            and stood 144px tall - taller than some of the widgets they
            select. Across the band's whole width they are two lines, and the
            stage goes back to being a stage. */}
        <div className="ais-pick sdd-filter" role="group" aria-label={t("أشكال العرض", "The shapes")} dir={dir}>
          {WIDGET_KINDS.map((k) => (
            <button
              key={k} type="button" className="chip is-small"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
            >
              {widgetKindLabel(k, isAr)}
            </button>
          ))}
        </div>

        <div className="ais" dir={dir}>
          <ul className="ais-reads">
            {reads.map((r, i) => (
              <li key={i} className="ais-read">
                <span className="ais-read-n" aria-hidden="true">{i + 1}</span>
                <span className="ais-read-main">
                  <span className="ais-read-k">{r.k}</span>
                  <span className="ais-read-v">{r.v}</span>
                </span>
              </li>
            ))}
            <li className="ais-note">
              {t("والقرار يتحدّث مع كل طلب جديد. ما تضبطه مرة ويقف.",
                 "And the decision updates with every new order. You do not set it once and leave it.")}
            </li>
          </ul>

          <div className="ais-stage">
            <FitWidget height={560}><StorefrontWidget kind={kind} /></FitWidget>
          </div>
        </div>
      </Shell>
    </DsSection>
  );
}
