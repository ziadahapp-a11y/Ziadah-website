import { useT } from "@/lib/i18n";
import { FEATURE_COUNT } from "@/lib/features-data";
import { ScrollableList } from "@/sections";
import { useStepFigures } from "./StepFigures";

/**
 * How it works, on the system's own `ScrollableList`.
 *
 * The band already used a sticky preview column beside a list of steps, which
 * is precisely what `ScrollableList` is - so this is a port onto the measured
 * component rather than a redesign. What it drops is the hand-built version's
 * anatomy: four card buttons in a column, a phone chrome painted with fixed
 * hexes, and a hover handler that made the preview change under a reader who
 * was only passing the mouse across on their way somewhere else. The row
 * activates on the viewport centre now, which is the component's own rule.
 *
 * `id="how"` is load-bearing: the JSON-LD HowTo schema points at it.
 */
export function HowItWorks() {
  const t = useT();
  const figures = useStepFigures();

  return (
    <ScrollableList
      id="how"
      className="home-steps"
      family="grey"
      eyebrow={t({ ar: "كيف تشتغل زيادة — 4 خطوات", en: "How Ziadah works - 4 steps" })}
      heading={t({
        ar: "من ربط المتجر إلى أول طلب أكبر",
        en: "From store connect to your first bigger order",
      })}
      rows={[
        {
          key: "step-01",
          title: t({ ar: "اربط متجرك بنقرة", en: "Connect your store in one click" }),
          body: t({
            ar: "موصّل جاهز لزد وسلة — التثبيت من لوحة المنصة نفسها. ما تحتاج مطوّر ولا تعديل على قالب متجرك: تثبيت، تفعيل، وخلصت.",
            en: "A ready-made connector for Zid and Salla - installed from the platform's own dashboard. No developer and no theme edit: install, activate, done.",
          }),
          figure: figures[0],
        },
        {
          key: "step-02",
          title: t({ ar: "اختر أماكن العرض", en: "Pick the placements" }),
          body: t({
            ar: `فعّل الودجت في صفحة المنتج، السلة، الدفع، الفئات — أو كلها. ${FEATURE_COUNT} قدرة جاهزة بين هدف وطريقة عرض ومكان، من لوحة وحدة.`,
            en: `Switch the widget on for the product page, the cart, checkout, categories - or all of them. ${FEATURE_COUNT} ready capabilities across goals, presentations and placements, from one dashboard.`,
          }),
          figure: figures[1],
        },
        {
          key: "step-03",
          title: t({ ar: "الذكاء يتعلّم كتالوجك وعملاءك", en: "The AI learns your catalogue and your shoppers" }),
          body: t({
            ar: "زيادة تحلّل سلوك التصفّح والطلبات السابقة والمنتجات اللي تُشترى معاً، وتبني اقتراحاً شخصياً لكل عميل — بدون أي إعداد يدوي منك.",
            en: "Ziadah analyses browsing, past orders and which products get bought together, and builds a personal suggestion for each shopper - with no manual setup from you.",
          }),
          figure: figures[2],
        },
        {
          key: "step-04",
          title: t({ ar: "قِس كل ريال — وحسّن", en: "Measure every riyal - and improve" }),
          body: t({
            ar: "تشوف بالضبط أي مكان عرض وأي طريقة اقتراح ترفع متوسط الطلب، مع تقارير قبل/بعد — والمحرك يعيد الترتيب تلقائياً حسب ما يشتغل فعلاً.",
            en: "See exactly which placement and which kind of suggestion raises the average order, with before/after reports - and the engine reorders itself by what actually works.",
          }),
          figure: figures[3],
        },
      ]}
    />
  );
}
