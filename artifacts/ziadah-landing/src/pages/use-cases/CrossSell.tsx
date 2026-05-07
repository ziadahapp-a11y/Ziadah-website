import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import CrossSellWidget from "../../components/widgets/CrossSellWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأنشطة",
    title: "البيع المتقاطع",
    subtitle: "اقترح للعميل ما يكمّل شراءه — منتجات مرتبطة وظيفياً أو موضوعياً تضيف قيمة حقيقية لتجربته وترفع قيمة سلته.",
    tagline: "من يشتري شامبو ينسى البلسم — حتى تذكّره زيادة",
    icon: "🔗",
  },
  whatWeDoTitle: "ما هو البيع المتقاطع وكيف ينفّذه زيادة؟",
  whatWeDoDesc:
    "البيع المتقاطع (Cross-sell) هو اقتراح منتجات مكمّلة تضيف قيمة لما يشتريه العميل — ليس بديلاً بل إضافة. زيادة يطبّقه بثلاث طرق: (1) منتجات تُشترى معاً بناءً على بيانات آلاف الطلبات الفعلية، (2) إضافات وظيفية مرتبطة بالمنتج الأساسي، (3) حزم Combo مدروسة تجمع المنتجات المكمّلة بسعر موحد. الذكاء الاصطناعي يقرر ما يُعرض وأين ومتى لكل عميل على حدة.",
  strategyTitle: "أساليب البيع المتقاطع في زيادة",
  strategies: [
    {
      icon: "🛒",
      title: "اشتروا مع بعض (BTAT)",
      desc: "يستخرج من قاعدة بيانات الطلبات الحقيقية أكثر المنتجات التي تُشترى معاً — ثم يعرضها معاً بمنطق اجتماعي موثوق: 'عملاء اشتروا هذا اشتروا أيضاً...'",
      color: "#a855f7",
    },
    {
      icon: "➕",
      title: "Add-ons وظيفية",
      desc: "يقترح إضافات مباشرة تكمّل المنتج الأساسي وظيفياً — مثل حبل لكيس التمرين، ملقط لحجر العقيق، أو غطاء للهاتف. منطقي ومقبول دائماً.",
      color: "#06b6d4",
    },
    {
      icon: "🎁",
      title: "حزم Combo ذكية",
      desc: "يجمّع منتجات متكاملة في حزمة بسعر مخفوض يظهر التوفير بوضوح. العميل يشعر أنه الرابح والمتجر يرفع قيمة الطلب.",
      color: "#10b981",
    },
    {
      icon: "🎯",
      title: "تخصيص حسب الملف",
      desc: "ليس كل عميل يناسبه نفس الاقتراح. زيادة يراعي الجنس، المنطقة، الميزانية المعتادة، وعدد الطلبات السابقة لاختيار الاقتراح الأنسب.",
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
    title: "أمثلة تطبيقية من قطاعات مختلفة",
    steps: [
      "🍕 مطعم: عميل اشترى برغر → يُقترح له بطاطس + مشروب + صلصة إضافية (كومبو وجبة كاملة).",
      "💄 تجميل: عميلة اشترت فاونديشن → يُقترح لها برايمر + بودرة تثبيت + إسفنجة تطبيق.",
      "💻 إلكترونيات: عميل اشترى لابتوب → يُقترح له حقيبة + ماوس لاسلكي + منصة تبريد.",
      "👕 أزياء: عميل اشترى قميص → يُقترح له بنطلون مكمّل + حزام بنفس اللون.",
    ],
    result: "في جميع هذه الأمثلة، معدل قبول الاقتراح المتقاطع بين 25 و45% — كل قبول واحد يساوي طلباً إضافياً بدون تكلفة تسويق.",
  },
  extraSections: (isAr) => (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف يظهر البيع المتقاطع للعميل؟" : "How does cross-selling appear to customers?"}
      subtitle={
        isAr
          ? "هكذا تبدو واجهة اقتراح البيع المتقاطع كما يراها عميلك فعلياً"
          : "This is how the cross-sell suggestion looks to your customer"
      }
      tabs={[
        {
          labelAr: "📱 مثال حي",
          labelEn: "📱 Live Demo",
          content: <CrossSellWidget />,
        },
        {
          labelAr: "⚖️ متقاطع أم بديل؟",
          labelEn: "⚖️ Cross-sell vs Upsell",
          placement: "below",
          content: (
            <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)", width: "100%" }}>
              <div className="shine" />
              <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>
                {isAr ? "الفرق بين البيع المتقاطع والبيع البديل" : "Cross-selling vs. Upselling"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
                <div style={{ padding: "24px 28px", background: "rgba(6,182,212,.05)", border: "1px solid rgba(6,182,212,.15)", borderRadius: 14 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#06b6d4", marginBottom: 12 }}>{isAr ? "🔗 البيع المتقاطع (Cross-sell)" : "🔗 Cross-Selling"}</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {(isAr
                      ? ["يقترح منتجات مكمّلة", "يزيد عدد المنتجات في السلة", "يعمل على صفحة المنتج والسلة", "مثال: هاتف + غلاف + واقي شاشة"]
                      : ["Suggests complementary products", "Increases number of products in cart", "Works on product page and cart", "Example: phone + case + screen protector"]
                    ).map((item, i) => (
                      <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}>
                        <span style={{ color: "#06b6d4", fontWeight: 700 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding: "24px 28px", background: "rgba(168,85,247,.05)", border: "1px solid rgba(168,85,247,.15)", borderRadius: 14 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#a855f7", marginBottom: 12 }}>{isAr ? "⬆️ البيع البديل (Upsell)" : "⬆️ Upselling"}</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {(isAr
                      ? ["يقترح نسخة أفضل من نفس المنتج", "يرفع سعر المنتج الأساسي", "يعمل على صفحة المنتج بشكل رئيسي", "مثال: هاتف بسيط → هاتف بمواصفات أعلى"]
                      : ["Suggests a better version of the same product", "Increases the main product price", "Primarily works on the product page", "Example: basic phone → higher-spec phone"]
                    ).map((item, i) => (
                      <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}>
                        <span style={{ color: "#a855f7", fontWeight: 700 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  ),
  ctaTitle: "فعّل البيع المتقاطع في متجرك اليوم",
  ctaDesc: "كل عميل يمكن أن يشتري أكثر — أنت فقط بحاجة لمن يذكّره في الوقت المناسب.",
  heroEn: {
    tag: "By Activity",
    title: "Cross-Selling",
    subtitle: "Suggest what completes the customer's purchase — functionally or thematically related products that add real value to their experience and increase cart value.",
    tagline: "Someone buying shampoo forgets the conditioner — until Ziadah reminds them",
    icon: "🔗",
  },
  whatWeDoTitleEn: "What is cross-selling and how does Ziadah implement it?",
  whatWeDoDescEn:
    "Cross-selling is suggesting complementary products that add value to what the customer is buying — not a replacement, but an addition. Ziadah implements it in three ways: (1) products frequently bought together based on thousands of actual orders, (2) functional add-ons related to the main product, (3) curated combo bundles that combine complementary products at a unified price. AI decides what to show, where, and when for each customer individually.",
  strategyTitleEn: "Cross-selling methods in Ziadah",
  strategiesEn: [
    {
      icon: "🛒",
      title: "Bought Together (BTAT)",
      desc: "Extracts from the real order database the most frequently co-purchased products — then displays them together with trusted social proof: 'Customers who bought this also bought...'",
      color: "#a855f7",
    },
    {
      icon: "➕",
      title: "Functional Add-ons",
      desc: "Suggests direct additions that functionally complement the main product — like a cord for a gym bag, a clasp for a gemstone, or a case for a phone. Always logical and acceptable.",
      color: "#06b6d4",
    },
    {
      icon: "🎁",
      title: "Smart Combo Bundles",
      desc: "Combines complementary products in a discounted bundle that clearly shows savings. The customer feels like a winner and the store increases order value.",
      color: "#10b981",
    },
    {
      icon: "🎯",
      title: "Profile-Based Personalization",
      desc: "Not every customer suits the same suggestion. Ziadah considers gender, region, typical budget, and past order count to choose the most relevant suggestion.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+32%", label: "Average number of products in cart", color: "#a855f7" },
    { value: "+28%", label: "Average order value", color: "#06b6d4" },
    { value: "+41%", label: "Recommendation acceptance rate", color: "#10b981" },
    { value: "+19%", label: "Customer satisfaction with the experience", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Real examples from different industries",
    steps: [
      "🍕 Restaurant: Customer bought a burger → suggested: fries + drink + extra sauce (complete meal combo).",
      "💄 Beauty: Customer bought foundation → suggested: primer + setting powder + application sponge.",
      "💻 Electronics: Customer bought a laptop → suggested: bag + wireless mouse + cooling pad.",
      "👕 Fashion: Customer bought a shirt → suggested: matching pants + belt in the same color.",
    ],
    result: "In all these examples, the cross-sell acceptance rate ranges from 25-45% — each acceptance equals an extra order without marketing cost.",
  },
  ctaTitleEn: "Activate cross-selling in your store today",
  ctaDescEn: "Every customer can buy more — you just need someone to remind them at the right time.",
  seo: {
    title: "البيع المتقاطع (Cross-sell) — زيادة",
    titleEn: "Cross-Selling — Ziadah",
    description: "اقترح للعميل منتجات تكمّل شراءه وترفع قيمة سلته. زيادة يُحلّل سلوك الشراء ليعرض التوصيات الأنسب في اللحظة الصحيحة.",
    descriptionEn: "Suggest complementary products that complete the customer's purchase and increase cart value. Ziadah analyzes buying behavior to show the best recommendations at the right moment.",
    canonical: "/use-cases/cross-sell",
  },
};

export default function CrossSell() {
  return <UseCaseLayout data={data} />;
}
