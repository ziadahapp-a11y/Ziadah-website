import { useT } from "@/lib/i18n";
import { FaqBlock } from "@/sections";

/**
 * The homepage FAQ, on the system's own `FaqBlock`.
 *
 * The questions are unchanged. What changes is the component under them: the
 * previous pass hand-rolled the system's `.faq-list` markup inside a
 * `Section` + `SectionHead` so the band could keep a kicker and a lede.
 * `FaqBlock` is the measured component - a rule-separated list of native
 * `<details>` - and on a page whose other bands are boards, one more centred
 * three-line head above eight questions is head the page does not need.
 *
 * `id="faq"` is load-bearing: the navigation links to it.
 */
export function HomeFaq() {
  const t = useT();
  const faqs = [
    {
      q: t({ ar: "كيف تختلف زيادة عن الاقتراحات الجاهزة في متجري؟", en: "How is Ziadah different from my store's built-in recommendations?" }),
      a: t({
        ar: "الاقتراحات الجاهزة عادة تعرض «الأكثر مبيعاً» للجميع. زيادة تبني اقتراح شخصي لكل عميل بناءً على تصفّحه وسلّته وطلباته السابقة والمنتجات اللي تُشترى معاً — فترتفع نسبة الإضافة ومتوسط قيمة الطلب بشكل واضح.",
        en: "Built-in blocks usually show the same best-sellers to everyone. Ziadah builds a personalized set for each shopper from their browsing, cart, past orders, and frequently-bought-together items — so add-on rate and average order value rise noticeably.",
      }),
    },
    {
      q: t({ ar: "كم بترفع مبيعاتي فعلياً؟", en: "How much will it actually lift my sales?" }),
      a: t({
        ar: "المتاجر اللي تستخدم زيادة تشوف عادة ارتفاع 15–35٪ في متوسط قيمة الطلب خلال أول 30 يوم، لأن كل عميل يشوف منتجات تناسبه فعلاً. النتائج تختلف حسب القطاع وحجم الكتالوج.",
        en: "Stores using Ziadah typically see a 15–35% lift in average order value within the first 30 days, because every shopper sees products that genuinely fit them. Results vary by sector and catalog size.",
      }),
    },
    {
      q: t({ ar: "بيبطّئ متجري؟", en: "Will it slow down my store?" }),
      a: t({
        ar: "لا. الودجت خفيف ويُحمّل بشكل غير متزامن، فما يأثّر على سرعة المتجر أو تجربة التصفّح.",
        en: "No. The widget is lightweight and loads asynchronously, so it doesn't affect your store's speed or the browsing experience.",
      }),
    },
    {
      q: t({ ar: "أحتاج مطوّر للتركيب؟", en: "Do I need a developer to install it?" }),
      a: t({
        ar: "أبداً. على زد وسلة، التثبيت بنقرة وحدة من متجر التطبيقات — تفعّل الودجت وتختار أماكن العرض، وخلصت خلال دقائق.",
        en: "Not at all. On Zid and Salla it's a one-click install from the app market — enable the widget, pick your placements, and you're live in minutes.",
      }),
    },
    {
      q: t({ ar: "تدعم العربية والإنجليزية؟", en: "Does it support Arabic and English?" }),
      a: t({
        ar: "إي. الودجت واللوحة يدعمان العربية والإنجليزية مع اتجاه RTL كامل، وفريق الدعم يردّ بالعربي.",
        en: "Yes. The widget and dashboard support Arabic and English with full RTL, and our support team replies in Arabic.",
      }),
    },
    {
      q: t({ ar: "كم تكلّف؟", en: "How much does it cost?" }),
      a: t({
        ar: "الانطلاقة 29 ر.س/شهرياً للمتاجر الصغيرة · النمو 290 ر.س/شهرياً · الاحترافية 790 ر.س/شهرياً · الأعمال 1,990 ر.س/شهرياً. كل الباقات فيها تجربة مجانية 7 أيام وشاملة ضريبة القيمة المضافة.",
        en: "Starter SAR 29/mo for small stores · Growth SAR 290/mo · Professional SAR 790/mo · Business SAR 1,990/mo. All plans include a 7-day free trial and are VAT-inclusive.",
      }),
    },
    {
      q: t({ ar: "وش أول خطوة؟", en: "What's the first step?" }),
      a: t({
        ar: "فعّل زيادة من متجر تطبيقات زد. التثبيت بضغطة، وفريقنا يساعدك في الإعداد لو احتجت.",
        en: "Activate Ziadah from the Zid app market. One-click install, with guided setup from our team if you need it.",
      }),
    },
  ];

  return (
    <FaqBlock
      id="faq"
      family="grey"
      heading={t({ ar: "أسئلة يسألها التجار", en: "Questions merchants ask" })}
      items={faqs}
    />
  );
}
