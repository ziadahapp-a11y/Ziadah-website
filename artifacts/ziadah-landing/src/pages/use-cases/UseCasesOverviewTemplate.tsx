import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";

type UseCasesOverviewKind =
  | "by-pages"
  | "by-activity"
  | "by-presentation"
  | "by-goal"
  | "by-experience";

function getData(kind: UseCasesOverviewKind): UseCasePageData {
  const common = {
    plans: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"],
    plansEn: ["Starter", "Growth", "Professional", "Business"],
  };

  const map: Record<UseCasesOverviewKind, UseCasePageData> = {
    "by-pages": {
      hero: { tag: "الحلول", title: "حسب الصفحات", subtitle: "صفحة عامة تجمع كل الحلول المصنفة حسب صفحة المتجر.", tagline: "ابدأ من صفحة متجرك", icon: "🧭" },
      whatWeDoTitle: "حلول حسب الصفحة",
      whatWeDoDesc: "اختر نقطة الظهور التي تريد تحسينها: الصفحة الرئيسية، صفحة المنتج، السلة، الدفع، أو صفحة الشكر.",
      strategyTitle: "أبرز المسارات",
      strategies: [
        { icon: "📄", title: "صفحة المنتج", desc: "توصيات مباشرة بجوار المنتج.", color: "#a855f7" },
        { icon: "🛒", title: "صفحة السلة", desc: "رفع قيمة الطلب قبل الإتمام داخل السلة.", color: "#06b6d4" },
        { icon: "💳", title: "صفحة الدفع", desc: "تحسين العرض في آخر خطوة قبل الإتمام.", color: "#10b981" },
        { icon: "🙏", title: "صفحة الشكر", desc: "اقتراحات ما بعد الشراء لزيادة التكرار.", color: "#f59e0b" },
        { icon: "🏠", title: "الصفحة الرئيسية", desc: "تخصيص أول تجربة للزائر.", color: "#8b5cf6" },
        { icon: "🗂️", title: "صفحة التصنيف", desc: "عرض منتجات مكملة حسب الفئة.", color: "#4f46e5" },
        { icon: "🌐", title: "جميع الصفحات", desc: "تفعيل نفس المنطق عبر كامل المتجر.", color: "#ec4899" },
      ],
      stats: [
        { value: "+32%", label: "زيادة متوسط السلة", color: "#a855f7" },
        { value: "+21%", label: "تحسن التحويل", color: "#06b6d4" },
        { value: "-18%", label: "انخفاض التخلي", color: "#10b981" },
        { value: "24/7", label: "تحسين تلقائي", color: "#f59e0b" },
      ],
      ctaTitle: "استعرض حلول حسب الصفحات",
      ctaDesc: "اختر الصفحة الأنسب لبدء التحسين في متجرك.",
      heroEn: { tag: "Solutions", title: "By Page", subtitle: "A general page for all solutions grouped by store page.", tagline: "Start from your page", icon: "🧭" },
      whatWeDoTitleEn: "Solutions by page",
      whatWeDoDescEn: "Choose where to optimize: home page, product page, cart, checkout, or thank-you page.",
      strategyTitleEn: "Top tracks",
      strategiesEn: [
        { icon: "📄", title: "Product Page", desc: "Contextual recommendations near products.", color: "#a855f7" },
        { icon: "🛒", title: "Cart Page", desc: "Lift AOV inside the cart.", color: "#06b6d4" },
        { icon: "💳", title: "Checkout Page", desc: "Optimize offers before payment.", color: "#10b981" },
        { icon: "🙏", title: "Thank You Page", desc: "Post-purchase recommendations.", color: "#f59e0b" },
        { icon: "🏠", title: "Home Page", desc: "Personalize the first touch.", color: "#8b5cf6" },
        { icon: "🗂️", title: "Category Page", desc: "Suggest complementary products by category.", color: "#4f46e5" },
        { icon: "🌐", title: "All Pages", desc: "Enable logic across the full store.", color: "#ec4899" },
      ],
      statsEn: [
        { value: "+32%", label: "Average cart uplift", color: "#a855f7" },
        { value: "+21%", label: "Conversion improvement", color: "#06b6d4" },
        { value: "-18%", label: "Lower abandonment", color: "#10b981" },
        { value: "24/7", label: "Automatic optimization", color: "#f59e0b" },
      ],
      ctaTitleEn: "Explore solutions by page",
      ctaDescEn: "Pick the best page to start improving your store.",
      seo: { title: "الحلول حسب الصفحات — زيادة", titleEn: "Solutions by Page — Ziadah", description: "صفحة عامة لحلول زيادة حسب صفحات المتجر.", descriptionEn: "General overview of Ziadah solutions by store pages.", canonical: "/use-cases/by-pages" },
      ...common,
    },
    "by-activity": {
      hero: { tag: "الحلول", title: "حسب الأنشطة", subtitle: "صفحة عامة تضم حلول البيع المتقاطع والبديل وأنشطة السلة.", tagline: "حلول مرتبطة بسلوك العميل", icon: "⚙️" },
      whatWeDoTitle: "حلول حسب النشاط",
      whatWeDoDesc: "قسّم التحسين حسب الفعل: إضافة للسلة، إزالة من السلة، أو البحث عن بديل مناسب.",
      strategyTitle: "أنشطة رئيسية",
      strategies: [
        { icon: "🔁", title: "Cross-Sell", desc: "منتجات مكملة بشكل ذكي.", color: "#a855f7" },
        { icon: "⬆️", title: "Upsell", desc: "بدائل أعلى قيمة بوقت مناسب.", color: "#06b6d4" },
        { icon: "➕", title: "إضافة للسلة", desc: "تحفيز اتخاذ القرار في لحظة الإضافة.", color: "#10b981" },
        { icon: "➖", title: "إزالة من السلة", desc: "تقليل التردد قبل فقدان العميل.", color: "#f59e0b" },
      ],
      stats: [
        { value: "+27%", label: "تحسن قيمة الطلب", color: "#a855f7" },
        { value: "+19%", label: "تحسن معدل الإتمام", color: "#06b6d4" },
        { value: "-16%", label: "انخفاض الخروج", color: "#10b981" },
        { value: "AI", label: "اقتراحات لحظية", color: "#f59e0b" },
      ],
      ctaTitle: "ابدأ بحلول حسب الأنشطة",
      ctaDesc: "اختر النشاط الذي تريد تحسينه أولاً.",
      heroEn: { tag: "Solutions", title: "By Activity", subtitle: "A general page for cross-sell, upsell, and cart activity solutions.", tagline: "Behavior-driven solutions", icon: "⚙️" },
      whatWeDoTitleEn: "Solutions by activity",
      whatWeDoDescEn: "Optimize by action: add-to-cart, remove-from-cart, and upgrade intent.",
      strategyTitleEn: "Core activities",
      strategiesEn: [
        { icon: "🔁", title: "Cross-Sell", desc: "Smart complementary products.", color: "#a855f7" },
        { icon: "⬆️", title: "Upsell", desc: "Higher-value alternatives at the right time.", color: "#06b6d4" },
        { icon: "➕", title: "Add to Cart", desc: "Reinforce intent at add moment.", color: "#10b981" },
        { icon: "➖", title: "Remove from Cart", desc: "Prevent loss before exit.", color: "#f59e0b" },
      ],
      statsEn: [
        { value: "+27%", label: "Order value uplift", color: "#a855f7" },
        { value: "+19%", label: "Checkout completion", color: "#06b6d4" },
        { value: "-16%", label: "Drop-off reduction", color: "#10b981" },
        { value: "AI", label: "Real-time suggestions", color: "#f59e0b" },
      ],
      ctaTitleEn: "Start with activity-based solutions",
      ctaDescEn: "Pick the behavior you want to improve first.",
      seo: { title: "الحلول حسب الأنشطة — زيادة", titleEn: "Solutions by Activity — Ziadah", description: "صفحة عامة لحلول زيادة المصنفة حسب أنشطة العميل.", descriptionEn: "General overview of Ziadah solutions grouped by customer actions.", canonical: "/use-cases/by-activity" },
      ...common,
    },
    "by-presentation": {
      hero: { tag: "الحلول", title: "حسب طريقة العرض", subtitle: "صفحة عامة لأساليب العرض: منتجات ذات صلة، حزم، وإضافات.", tagline: "اعرض الحل بالشكل المناسب", icon: "🧩" },
      whatWeDoTitle: "حلول حسب طريقة العرض",
      whatWeDoDesc: "اختر أسلوب العرض الذي يناسب تجربة متجرك: قائمة، حزمة، أو عرض كمية.",
      strategyTitle: "أنماط العرض",
      strategies: [
        { icon: "🧷", title: "منتجات ذات صلة", desc: "اقتراحات بجانب المنتج الرئيسي.", color: "#a855f7" },
        { icon: "💬", title: "Add-ons", desc: "خيارات إضافية خفيفة أثناء الشراء.", color: "#06b6d4" },
        { icon: "🤝", title: "اشترِ معًا", desc: "منتجات متوافقة في عرض واحد.", color: "#10b981" },
        { icon: "📦", title: "Bundle Deals", desc: "حزم وكومبو بصفقة واضحة.", color: "#f59e0b" },
        { icon: "🛍️", title: "اشترِ أكثر ووفر أكثر", desc: "عروض كمية لزيادة السلة.", color: "#8b5cf6" },
      ],
      stats: [
        { value: "+24%", label: "قبول العروض", color: "#a855f7" },
        { value: "+17%", label: "زيادة عدد المنتجات", color: "#06b6d4" },
        { value: "+14%", label: "زيادة قيمة السلة", color: "#10b981" },
        { value: "UX", label: "عرض سلس", color: "#f59e0b" },
      ],
      ctaTitle: "اختر طريقة العرض المناسبة",
      ctaDesc: "حل واحد يمكن عرضه بأكثر من أسلوب حسب سلوك عميلك.",
      heroEn: { tag: "Solutions", title: "By Display Type", subtitle: "A general page for display modes: related products, bundles, and add-ons.", tagline: "Show the right format", icon: "🧩" },
      whatWeDoTitleEn: "Solutions by display type",
      whatWeDoDescEn: "Choose the display format that fits your store UX: list, bundle, or quantity offer.",
      strategyTitleEn: "Display patterns",
      strategiesEn: [
        { icon: "🧷", title: "Related Products", desc: "Suggestions near the main item.", color: "#a855f7" },
        { icon: "💬", title: "Add-ons", desc: "Light options while buying.", color: "#06b6d4" },
        { icon: "🤝", title: "Buy Together", desc: "Compatible products in one offer.", color: "#10b981" },
        { icon: "📦", title: "Bundle Deals", desc: "Clear package offers.", color: "#f59e0b" },
        { icon: "🛍️", title: "Buy More Save More", desc: "Quantity-based offers to increase cart value.", color: "#8b5cf6" },
      ],
      statsEn: [
        { value: "+24%", label: "Offer acceptance", color: "#a855f7" },
        { value: "+17%", label: "Items per order", color: "#06b6d4" },
        { value: "+14%", label: "AOV uplift", color: "#10b981" },
        { value: "UX", label: "Smooth presentation", color: "#f59e0b" },
      ],
      ctaTitleEn: "Choose the best display type",
      ctaDescEn: "One solution can be shown in multiple formats.",
      seo: { title: "الحلول حسب طريقة العرض — زيادة", titleEn: "Solutions by Display Type — Ziadah", description: "صفحة عامة لحلول زيادة المصنفة حسب طريقة العرض.", descriptionEn: "General overview of Ziadah solutions by display type.", canonical: "/use-cases/by-presentation" },
      ...common,
    },
    "by-goal": {
      hero: { tag: "الحلول", title: "حسب الأهداف", subtitle: "صفحة عامة تساعدك تختار الحل بحسب الهدف التجاري.", tagline: "ابدأ من الهدف مباشرة", icon: "🎯" },
      whatWeDoTitle: "حلول حسب الهدف",
      whatWeDoDesc: "حدد هدفك: رفع عدد المنتجات، زيادة القيمة، أو تحسين التحويل، ثم اختر المسار الأنسب.",
      strategyTitle: "أهداف شائعة",
      strategies: [
        { icon: "🧺", title: "زيادة عدد منتجات السلة", desc: "دفع العميل لإضافة عناصر أكثر.", color: "#a855f7" },
        { icon: "💰", title: "رفع قيمة الطلب", desc: "عروض ذكية على الكميات والبدائل.", color: "#06b6d4" },
        { icon: "🚀", title: "تحسين التحويل", desc: "تقليل التردد في اللحظات الحساسة.", color: "#10b981" },
        { icon: "🛡️", title: "تقليل التخلي", desc: "حماية الطلب من التسرب قبل الإتمام.", color: "#f59e0b" },
        { icon: "🚚", title: "عرض الشحن المجاني", desc: "تحفيز الإكمال بإبراز عتبة الشحن.", color: "#8b5cf6" },
        { icon: "🎟️", title: "عروض الكوبونات", desc: "تشجيع الشراء بقيمة مضافة واضحة.", color: "#4f46e5" },
      ],
      stats: [
        { value: "+29%", label: "تحسن القيمة", color: "#a855f7" },
        { value: "+22%", label: "تحسن الإتمام", color: "#06b6d4" },
        { value: "+31%", label: "نمو المنتجات/طلب", color: "#10b981" },
        { value: "ROI", label: "أثر واضح", color: "#f59e0b" },
      ],
      ctaTitle: "اختر هدفك وابدأ الآن",
      ctaDesc: "نرتب لك الحلول بحسب الهدف الذي يهمك.",
      heroEn: { tag: "Solutions", title: "By Goal", subtitle: "A general page to pick the right solution by business outcome.", tagline: "Start from your KPI", icon: "🎯" },
      whatWeDoTitleEn: "Solutions by goal",
      whatWeDoDescEn: "Define your objective first: more items, higher value, or better conversion.",
      strategyTitleEn: "Common goals",
      strategiesEn: [
        { icon: "🧺", title: "More Cart Items", desc: "Encourage customers to add more items.", color: "#a855f7" },
        { icon: "💰", title: "Higher AOV", desc: "Smart quantity and upgrade offers.", color: "#06b6d4" },
        { icon: "🚀", title: "Better Conversion", desc: "Reduce hesitation at key moments.", color: "#10b981" },
        { icon: "🛡️", title: "Reduce Abandonment", desc: "Protect orders from drop-off before checkout.", color: "#f59e0b" },
        { icon: "🚚", title: "Free Shipping Display", desc: "Motivate completion with shipping threshold cues.", color: "#8b5cf6" },
        { icon: "🎟️", title: "Discount Coupon", desc: "Drive action with clear promotional value.", color: "#4f46e5" },
      ],
      statsEn: [
        { value: "+29%", label: "Value uplift", color: "#a855f7" },
        { value: "+22%", label: "Completion uplift", color: "#06b6d4" },
        { value: "+31%", label: "Items/order growth", color: "#10b981" },
        { value: "ROI", label: "Clear impact", color: "#f59e0b" },
      ],
      ctaTitleEn: "Choose your goal and start",
      ctaDescEn: "We organize solutions by the KPI you care about.",
      seo: { title: "الحلول حسب الأهداف — زيادة", titleEn: "Solutions by Goal — Ziadah", description: "صفحة عامة لحلول زيادة المصنفة حسب الهدف التجاري.", descriptionEn: "General overview of Ziadah solutions grouped by business goals.", canonical: "/use-cases/by-goal" },
      ...common,
    },
    "by-experience": {
      hero: { tag: "الحلول", title: "تخصيص التجربة", subtitle: "صفحة عامة لحلول التخصيص وتجربة العميل الذكية.", tagline: "كل عميل يرى ما يناسبه", icon: "✨" },
      whatWeDoTitle: "حلول تخصيص التجربة",
      whatWeDoDesc: "نجمع إشارات السلوك والشراء لتقديم تجربة مخصصة في الوقت الفعلي.",
      strategyTitle: "ماذا يشمل التخصيص؟",
      strategies: [
        { icon: "✨", title: "تخصيص تجربة العميل", desc: "تجربة مخصصة لكل زائر حسب سلوكه واهتمامه.", color: "#a855f7" },
      ],
      stats: [
        { value: "+26%", label: "تحسن التفاعل", color: "#a855f7" },
        { value: "+20%", label: "تحسن التحويل", color: "#06b6d4" },
        { value: "+18%", label: "تحسن العودة للشراء", color: "#10b981" },
        { value: "AI", label: "تخصيص آني", color: "#f59e0b" },
      ],
      ctaTitle: "فعّل تخصيص التجربة",
      ctaDesc: "قدّم لكل عميل تجربة مصممة له تلقائياً.",
      heroEn: { tag: "Solutions", title: "Experience Personalization", subtitle: "A general page for smart customer-personalization solutions.", tagline: "Each customer sees what fits", icon: "✨" },
      whatWeDoTitleEn: "Experience personalization solutions",
      whatWeDoDescEn: "Behavior and purchase signals power real-time personalized journeys.",
      strategyTitleEn: "What personalization includes",
      strategiesEn: [
        { icon: "✨", title: "Customer Experience", desc: "Personalized journeys based on behavior and intent.", color: "#a855f7" },
      ],
      statsEn: [
        { value: "+26%", label: "Engagement uplift", color: "#a855f7" },
        { value: "+20%", label: "Conversion uplift", color: "#06b6d4" },
        { value: "+18%", label: "Repeat purchase uplift", color: "#10b981" },
        { value: "AI", label: "Real-time personalization", color: "#f59e0b" },
      ],
      ctaTitleEn: "Activate personalization",
      ctaDescEn: "Give each customer an automatically tailored journey.",
      seo: { title: "تخصيص التجربة — زيادة", titleEn: "Experience Personalization — Ziadah", description: "صفحة عامة لحلول تخصيص التجربة في زيادة.", descriptionEn: "General overview of Ziadah experience personalization solutions.", canonical: "/use-cases/by-experience" },
      ...common,
    },
  };

  return map[kind];
}

export default function UseCasesOverviewTemplate({ kind }: { kind: UseCasesOverviewKind }) {
  return <UseCaseLayout data={getData(kind)} />;
}
