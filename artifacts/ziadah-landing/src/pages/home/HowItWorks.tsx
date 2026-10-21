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
        title: t({ ar: "فعّل التطبيق بنقرة", en: "Activate the app in one click" }),
        note: t({
          ar: "من لوحة زد أو سلة نفسها. ما تحتاج مطوّر ولا تعديل على قالب متجرك. تفعيل، وخلصت أنت.",
          en: "From your Zid or Salla dashboard itself. No developer and no theme edit. Activate, and you are done.",
        }),
      },
      {
        key: "1",
        title: t({ ar: "زيادة يقرأ متجرك", en: "Ziadah reads your store" }),
        note: t({
          ar: "يحلّل كتالوجك وسجل الطلبات وسلوك التصفّح والمنتجات اللي تُشترى معاً، بدون أي إعداد منك.",
          en: "It analyses your catalogue, order history, browsing and which products get bought together, with no setup from you.",
        }),
      },
      {
        key: "2",
        title: t({ ar: "يضبط كل شي بنفسه بالذكاء الاصطناعي", en: "Sets everything up by itself with AI" }),
        note: t({
          ar: `يختار الأماكن والأشكال والعروض لكل عميل، ويضبطها في صفحة المنتج والسلة والدفع. ${FEATURE_COUNT} قدرة جاهزة، وما تضبط منها شي بيدك.`,
          en: `It picks the places, shapes and offers for each shopper and sets them up on the product page, cart and checkout. ${FEATURE_COUNT} ready capabilities, and you set none of them by hand.`,
        }),
      },
      {
        key: "3",
        title: t({ ar: "يختبر ويحسّن، وأنت تشوف الأثر", en: "Tests and improves, and you see the lift" }),
        note: t({
          ar: "تشوف بالضبط أي مكان وأي اقتراح يرفع متوسط الطلب، مع تقارير قبل وبعد. والتطبيق يعيد الترتيب تلقائياً حسب اللي يشتغل فعلاً.",
          en: "See exactly which placement and which suggestion raises the average order, with before and after reports. The app reorders itself by what actually works.",
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
              title={t({ ar: "فعّل، وزيادة يضبط الباقي بالذكاء الاصطناعي", en: "Activate, and Ziadah sets up the rest with AI" })}
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
