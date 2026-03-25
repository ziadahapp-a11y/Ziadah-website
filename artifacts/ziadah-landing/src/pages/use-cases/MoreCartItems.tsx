import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import CrossSellWidget from "../../components/widgets/CrossSellWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأهداف",
    title: "زيادة عدد المنتجات في السلة",
    subtitle:
      "الهدف ليس فقط رفع المبلغ — بل إضافة منتجات مكمّلة يحتاجها العميل في نفس الطلب: اقتراحات ذكية بعد الإضافة للسلة، واشتروا معاً، وإضافات بسعر صغير ترفع عدد البنود دون إزعاج.",
    tagline: "كل منتج إضافي في السلة = طلب أغنى بدون عميل جديد",
    icon: "🛒",
  },
  whatWeDoTitle: "كيف يرفع زيادة عدد المنتجات في السلة؟",
  whatWeDoDesc:
    "زيادة يحدد اللحظة المناسبة: بعد تصفح المنتج، عند الإضافة للسلة، أو في السلة نفسها. يعرض ما يُشترى معاً كثيراً، إضافات وظيفية تكمّل المنتج الأساسي، وحزماً بسعر أوضح. يُخصّص الاقتراح لكل عميل حتى لا تبدو التوصية عشوائية — فيزيد متوسط عدد المنتجات في الطلب ويحسّن تجربة الإكمال.",
  strategyTitle: "أساليب زيادة بنود السلة",
  strategies: [
    {
      icon: "🛒",
      title: "اشتروا معاً (BTAT)",
      desc: "يعرض منتجات اشتراها عملاء مشابهون مع نفس المنتج — اجتماعي وموثوق ويزيد عدد البنود.",
      color: "#a855f7",
    },
    {
      icon: "➕",
      title: "إضافات سهلة القبول",
      desc: "اقتراحات بسعر منخفض تكمّل المنتج الأساسي — قبولها أعلى فيرفع عدد المنتجات بسرعة.",
      color: "#06b6d4",
    },
    {
      icon: "🎁",
      title: "حزم تكمل الطلب",
      desc: "يجمع منتجات مترابطة في عرض واحد يشجّع على أخذ المجموعة كاملاً بدل منتج واحد.",
      color: "#10b981",
    },
    {
      icon: "🎯",
      title: "توقيت ذكي",
      desc: "لا يظهر كل شيء دفعة واحدة — يختار نقطة الرحلة التي تزيد احتمال قبول إضافة منتج آخر.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+32%", label: "متوسط عدد المنتجات في السلة", color: "#a855f7" },
    { value: "+28%", label: "متوسط قيمة الطلب", color: "#06b6d4" },
    { value: "+41%", label: "معدل قبول التوصية", color: "#10b981" },
    { value: "+19%", label: "رضا العملاء عن التجربة", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "مثال سريع",
    steps: [
      "عميل يضيف هاتفاً للسلة.",
      "يظهر: غلاف + واقي شاشة بأسعار صغيرة وزر إضافة بسيط.",
      "يقبل العميل إضافة واحدة أو أكثر — يرتفع عدد بنود السلة فوراً.",
    ],
    result: "نفس الطلب يحتوي على منتجات أكثر دون تغيير في عدد الزوار.",
  },
  extraSections: (isAr) => (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "4px 14px",
            borderRadius: 50,
            background: "rgba(124,58,237,.08)",
            border: "1px solid rgba(124,58,237,.2)",
            color: "#7c3aed",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase" as const,
            marginBottom: 16,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }} />
          {isAr ? "مثال حي" : "Live Example"}
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>
          {isAr ? "كيف يُقترح منتج إضافي للعميل؟" : "How does Ziadah suggest an extra item?"}
        </h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>
          {isAr
            ? "واجهة اقتراح تكميلي — يرفع عدد المنتجات في كل طلب"
            : "Complementary suggestion UI — more line items per order"}
        </p>
        <CrossSellWidget />
      </div>
    </section>
  ),
  plans: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "زِد عدد المنتجات في كل طلب",
  ctaDesc: "فعّل زيادة وشاهد بنود السلة ترتفع مع توصيات مخصصة.",
  heroEn: {
    tag: "By Goals",
    title: "More Items in Cart",
    subtitle:
      "The goal isn't only raising the total — it's adding complementary items the customer needs in the same order: smart suggestions after add-to-cart, bought-together, and low-priced add-ons that increase line items without friction.",
    tagline: "Every extra line item = a richer order without a new customer",
    icon: "🛒",
  },
  whatWeDoTitleEn: "How does Ziadah increase the number of products in the cart?",
  whatWeDoDescEn:
    "Ziadah picks the right moment: after browsing, at add-to-cart, or on the cart page. It shows what’s often bought together, functional add-ons that complete the main product, and bundles with clearer pricing. Each suggestion is personalized so it doesn’t feel random — increasing average items per order and a smoother “complete the order” experience.",
  strategyTitleEn: "Ways to grow cart line items",
  strategiesEn: [
    {
      icon: "🛒",
      title: "Bought Together (BTAT)",
      desc: "Shows products similar customers bought with the same item — social proof that increases line count.",
      color: "#a855f7",
    },
    {
      icon: "➕",
      title: "Easy-to-accept add-ons",
      desc: "Low-priced complements to the main product — higher acceptance rate, faster line-item growth.",
      color: "#06b6d4",
    },
    {
      icon: "🎁",
      title: "Bundles that complete the order",
      desc: "Groups related products in one offer so customers take the full set instead of a single SKU.",
      color: "#10b981",
    },
    {
      icon: "🎯",
      title: "Smart timing",
      desc: "Doesn’t show everything at once — chooses journey points where an extra item is most likely to be accepted.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+32%", label: "Average products in cart", color: "#a855f7" },
    { value: "+28%", label: "Average order value", color: "#06b6d4" },
    { value: "+41%", label: "Recommendation acceptance rate", color: "#10b981" },
    { value: "+19%", label: "Customer satisfaction", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Quick example",
    steps: [
      "A customer adds a phone to the cart.",
      "Case + screen protector appear at small prices with one-tap add.",
      "The customer accepts one or more — line items go up immediately.",
    ],
    result: "The same order contains more products without changing visitor count.",
  },
  plansEn: ["Starter", "Growth", "Professional", "Business"],
  ctaTitleEn: "Increase items per order",
  ctaDescEn: "Activate Ziadah and watch cart line items grow with personalized suggestions.",
  seo: {
    title: "زيادة عدد المنتجات في السلة — زيادة",
    titleEn: "More Items in Cart — Ziadah",
    description:
      "زيّد عدد المنتجات في كل طلب بتوصيات مكمّلة وذكية من زيادة — اشتروا معاً، إضافات، وحزم دون إزعاج العميل.",
    descriptionEn:
      "Increase line items per order with Ziadah: bought-together, add-ons, and bundles — without annoying the customer.",
    canonical: "/use-cases/more-cart-items",
  },
};

export default function MoreCartItems() {
  return <UseCaseLayout data={data} />;
}
