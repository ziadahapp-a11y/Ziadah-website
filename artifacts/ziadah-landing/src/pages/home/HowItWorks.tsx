import { useMemo } from "react";
import { useT } from "@/lib/i18n";
import { FEATURE_COUNT } from "@/lib/features-data";
import { Section as DsSection, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import ShapeAccordion, { type AccordionItem } from "@/components/widgets/ShapeAccordion";
import { useStepFigures } from "./StepFigures";

/**
 * How it works: four steps, in the same pinned list the live examples use.
 *
 * It was the design system's `ScrollableList`, a sticky figure beside rows that
 * scrolled past it. That scrolled the whole page: the figure only pinned while
 * the rows crossed it, and the band ran 1,300px for four short paragraphs, with
 * a dead column under the figure whenever it was shorter than the rows.
 *
 * Now the band pins and scroll is spent on the four steps alone: each opens in
 * turn, the page holds still, and the dark card on the other side is as tall as
 * the list and swaps with the open step. One behaviour across the page, not
 * two. Phones get the plain collapsible list with the card inside the open row.
 *
 * `id="how"` is load-bearing: the JSON-LD HowTo schema points at it.
 */
export function HowItWorks() {
  const t = useT();
  const figures = useStepFigures();

  const items = useMemo<AccordionItem[]>(
    () => [
      {
        key: "0",
        title: t({ ar: "اربط متجرك بنقرة", en: "Connect your store in one click" }),
        note: t({
          ar: "موصّل جاهز لزد وسلة - التثبيت من لوحة المنصة نفسها. ما تحتاج مطوّر ولا تعديل على قالب متجرك: تثبيت، تفعيل، وخلصت.",
          en: "A ready-made connector for Zid and Salla - installed from the platform's own dashboard. No developer and no theme edit: install, activate, done.",
        }),
      },
      {
        key: "1",
        title: t({ ar: "اختر أماكن العرض", en: "Pick the placements" }),
        note: t({
          ar: `فعّل الودجت في صفحة المنتج، السلة، الدفع، الفئات - أو كلها. ${FEATURE_COUNT} قدرة جاهزة بين هدف وطريقة عرض ومكان، من لوحة وحدة.`,
          en: `Switch the widget on for the product page, the cart, checkout, categories - or all of them. ${FEATURE_COUNT} ready capabilities across goals, presentations and placements, from one dashboard.`,
        }),
      },
      {
        key: "2",
        title: t({ ar: "الذكاء يتعلّم كتالوجك وعملاءك", en: "The AI learns your catalogue and your shoppers" }),
        note: t({
          ar: "تطبيق زيادة يحلّل سلوك التصفّح والطلبات السابقة والمنتجات اللي تُشترى معاً، ويبني اقتراحاً شخصياً لكل عميل - بدون أي إعداد يدوي منك.",
          en: "The Ziadah app analyses browsing, past orders and which products get bought together, and builds a personal suggestion for each shopper - with no manual setup from you.",
        }),
      },
      {
        key: "3",
        title: t({ ar: "قِس كل ريال، وحسّن", en: "Measure every riyal, and improve" }),
        note: t({
          ar: "تشوف بالضبط أي مكان عرض وأي طريقة اقتراح ترفع متوسط الطلب، مع تقارير قبل/بعد - والتطبيق يعيد الترتيب تلقائياً حسب ما يشتغل فعلاً.",
          en: "See exactly which placement and which kind of suggestion raises the average order, with before/after reports - and the app reorders itself by what actually works.",
        }),
      },
    ],
    [t],
  );

  return (
    <DsSection id="how" family="grey">
      <Shell>
        <ShapeAccordion
          fill
          head={
            <SectionHead
              center
              kicker={t({ ar: "كيف يشتغل تطبيق زيادة - 4 خطوات", en: "How the Ziadah app works - 4 steps" })}
              title={t({ ar: "من ربط المتجر إلى أول طلب أكبر", en: "From store connect to your first bigger order" })}
            />
          }
          items={items}
          label={t({ ar: "خطوات التشغيل", en: "The four steps" })}
          stage={(key) => <div className="how-fig">{figures[Number(key)]}</div>}
        />
      </Shell>
    </DsSection>
  );
}
