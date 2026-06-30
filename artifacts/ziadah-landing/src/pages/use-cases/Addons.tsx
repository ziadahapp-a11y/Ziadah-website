import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import AddonsWidget from "../../components/widgets/AddonsWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب طريقة العرض",
    title: "الإضافات (Add-ons)",
    subtitle: "اعرض للعميل إضافات وظيفية تُكمّل منتجه الأساسي — بطريقة اختبار متعدد تُعظّم قبول الاقتراح وترفع قيمة الطلب.",
    tagline: "الإضافة الصغيرة تصنع الفارق الكبير في الإيراد",
    icon: "➕",
  },
  whatWeDoTitle: "ما هو عرض Add-ons وكيف ينفّذه زيادة؟",
  whatWeDoDesc:
    "عرض Add-ons يُقدّم للعميل قائمة منتجات إضافية تُكمّل المنتج الذي يشتريه وظيفياً أو تحسّن تجربة استخدامه — لا بديل ولا منافس، بل مكمّل. ما يميّز تطبيق زيادة هو اعتماد منطق 'الاختبار المتعدد' (Multi-select): بدلاً من اقتراح إضافة واحدة، يُعرض تشكيلة قابلة للتحديد مع سعر إجمالي يتحدث فورياً مع كل اختيار. الذكاء الاصطناعي يختار ما يُعرض بناءً على بيانات المتجر الفعلية ويُخصّص القائمة لكل عميل.",
  strategyTitle: "أساليب عرض Add-ons في زيادة",
  strategies: [
    {
      icon: "☑️",
      title: "الاختبار المتعدد (Multi-select)",
      desc: "يُعرض للعميل قائمة إضافات بصناديق اختيار — يحدد ما يريد ويرى السعر الإجمالي يتحدث فورياً. يُحسّن معدل قبول الإضافات بشكل ملحوظ.",
      color: "#22c55e",
    },
    {
      icon: "🎯",
      title: "اقتراح مخصص لكل منتج",
      desc: "كل منتج له قائمة إضافات مُعدّة خصيصاً له — لا قوائم عامة. زيادة يتعلم من بيانات الطلبات أي الإضافات تُقبل أكثر مع هذا المنتج تحديداً.",
      color: "#06b6d4",
    },
    {
      icon: "💰",
      title: "إبراز قيمة الإضافة",
      desc: "لكل إضافة يُعرض سعرها بوضوح مع رسالة قيمة مختصرة — 'احمِ هاتفك' أو 'أكمل طقمك' — تجعل الاختيار منطقياً وسهلاً.",
      color: "#22c55e",
    },
    {
      icon: "📍",
      title: "عرض في اللحظة المناسبة",
      desc: "تظهر قائمة Add-ons عند إضافة المنتج للسلة أو في صفحة المنتج — في اللحظة التي يكون فيها العميل في ذهنية الشراء.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+44%", label: "معدل قبول قائمة الإضافات", color: "#22c55e" },
    { value: "+31%", label: "متوسط قيمة الطلب مع إضافة واحدة على الأقل", color: "#06b6d4" },
    { value: "2.3", label: "متوسط عدد الإضافات المختارة في كل طلب", color: "#22c55e" },
    { value: "+22%", label: "تكرار الشراء من العملاء الذين اختاروا إضافات", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة من قطاعات متنوعة",
    steps: [
      "📱 إلكترونيات: عميل يضيف هاتف للسلة → تظهر قائمة: [✓] غلاف حماية +39 ⃁، [✓] واقي شاشة +15 ⃁، [ ] سماعة لاسلكية +89 ⃁ — يختار ويرى الإجمالي يتحدث.",
      "🌿 عناية: عميلة تشتري شامبو → تُعرض إضافات: [✓] بلسم مكمل +28 ⃁، [ ] ماسك أسبوعي +45 ⃁، [✓] سيروم تقوية +62 ⃁.",
      "🎮 ألعاب: عميل يشتري جهاز تحكم → يرى: [✓] حقيبة حمل +35 ⃁، [✓] بطاريات شحن +29 ⃁، [ ] غطاء زلق مانع +19 ⃁.",
      "🍕 مطعم: عميل يطلب بيتزا → يختار من: [✓] صوص إضافي +6 ⃁، [✓] حافة جبن +12 ⃁، [ ] مشروب +15 ⃁.",
    ],
    result: "الاختبار المتعدد يرفع متوسط عدد الإضافات المختارة من 0.7 إضافة (اقتراح واحد فقط) إلى 2.3 إضافة — ثلاثة أضعاف المبيعات الإضافية بنفس الجهد.",
  },
  extraSections: (isAr) => (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف يظهر للعميل داخل المتجر؟" : "How does it look to customers in-store?"}
      subtitle={
        isAr ? "هكذا تبدو واجهة اقتراح الإضافات كما يراها عميلك فعلياً" : "This is how the add-ons suggestion looks to your customer"
      }
      tabs={[
        {
          labelAr: "📱 مثال حي",
          labelEn: "📱 Live Demo",
          content: <AddonsWidget />,
        },
        {
          labelAr: "💡 لماذا يعمل؟",
          labelEn: "💡 Why It Works",
          placement: "below",
          content: (
            <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)", width: "100%" }}>
              <div className="shine" />
              <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>
                {isAr ? "لماذا Multi-select أفضل من اقتراح إضافة واحدة؟" : "Why is multi-select better than a single suggestion?"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
                <div style={{ padding: "24px 28px", background: "rgba(34, 197, 94,.05)", border: "1px solid rgba(34, 197, 94,.15)", borderRadius: 14 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#22c55e", marginBottom: 12 }}>{isAr ? "☑️ Multi-select (زيادة)" : "☑️ Multi-select (Ziadah)"}</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {(isAr
                      ? ["العميل يشعر بالتحكم الكامل", "يختار ما يناسب ميزانيته وحاجته", "السعر الإجمالي يتحدث فورياً", "معدل قبول يصل لـ 44%"]
                      : ["Customer feels in full control", "Selects what fits their budget and needs", "Total price updates instantly", "Acceptance rate up to 44%"]
                    ).map((item, i) => (
                      <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}>
                        <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding: "24px 28px", background: "rgba(107,114,128,.05)", border: "1px solid rgba(107,114,128,.15)", borderRadius: 14 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "var(--td)", marginBottom: 12 }}>{isAr ? "➡️ اقتراح مفرد (التقليدي)" : "➡️ Single suggestion (Traditional)"}</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {(isAr
                      ? ["قرار ثنائي: نعم أو لا", "إضافة واحدة فقط تُعرض في المرة", "لا مرونة في الاختيار", "معدل قبول يتراوح 12-18%"]
                      : ["Binary decision: yes or no", "Only one add-on shown at a time", "No flexibility in choices", "Acceptance rate ranges 12-18%"]
                    ).map((item, i) => (
                      <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}>
                        <span style={{ color: "var(--td)", fontWeight: 700 }}>•</span> {item}
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
  ctaTitle: "فعّل عرض الإضافات الذكي في متجرك",
  ctaDesc: "الإضافة الصغيرة تراكمية — كل طلب مع إضافتين يرفع إيراداتك الشهرية بشكل ملموس.",
  heroEn: {
    tag: "By Display Method",
    title: "Add-ons",
    subtitle: "Show customers functional add-ons that complement their main product — using a multi-select approach that maximizes acceptance and increases order value.",
    tagline: "Small add-ons make a big difference in revenue",
    icon: "➕",
  },
  whatWeDoTitleEn: "What are Add-ons and how does Ziadah implement them?",
  whatWeDoDescEn:
    "Add-ons present the customer with a list of additional products that functionally complement or enhance their main purchase — not a replacement or competitor, but a complement. What makes Ziadah's implementation unique is the multi-select approach: instead of suggesting one add-on, it displays a selectable assortment with a total price that updates instantly with each selection. AI chooses what to display based on actual store data and personalizes the list for each customer.",
  strategyTitleEn: "Add-on display methods in Ziadah",
  strategiesEn: [
    {
      icon: "☑️",
      title: "Multi-Select Checkboxes",
      desc: "Customers see a list of add-ons with checkboxes — they select what they want and see the total update instantly. Significantly improves add-on acceptance rates.",
      color: "#22c55e",
    },
    {
      icon: "🎯",
      title: "Product-Specific Suggestions",
      desc: "Each product has a custom add-on list tailored specifically to it — no generic lists. Ziadah learns from order data which add-ons are most accepted with each specific product.",
      color: "#06b6d4",
    },
    {
      icon: "💰",
      title: "Highlight Add-on Value",
      desc: "Each add-on displays its price clearly with a brief value message — 'Protect your phone' or 'Complete your set' — making the choice logical and easy.",
      color: "#22c55e",
    },
    {
      icon: "📍",
      title: "Right Moment Display",
      desc: "The add-on list appears when adding the product to cart or on the product page — at the moment when the customer is in a buying mindset.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+44%", label: "Add-on list acceptance rate", color: "#22c55e" },
    { value: "+31%", label: "Average order value with at least one add-on", color: "#06b6d4" },
    { value: "2.3", label: "Average number of add-ons selected per order", color: "#22c55e" },
    { value: "+22%", label: "Repeat purchases from customers who chose add-ons", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Examples from various industries",
    steps: [
      "📱 Electronics: Customer adds a phone to cart → list appears: [✓] Protective case +39 SAR, [✓] Screen protector +15 SAR, [ ] Wireless earbuds +89 SAR — they select and see the total update.",
      "🌿 Haircare: Customer buys shampoo → add-ons shown: [✓] Matching conditioner +28 SAR, [ ] Weekly mask +45 SAR, [✓] Strengthening serum +62 SAR.",
      "🎮 Gaming: Customer buys a controller → sees: [✓] Carrying case +35 SAR, [✓] Rechargeable batteries +29 SAR, [ ] Anti-slip grip cover +19 SAR.",
      "🍕 Restaurant: Customer orders pizza → selects from: [✓] Extra sauce +6 SAR, [✓] Cheese crust +12 SAR, [ ] Drink +15 SAR.",
    ],
    result: "Multi-select increases the average number of add-ons selected from 0.7 (single suggestion) to 2.3 — three times the additional sales with the same effort.",
  },
  ctaTitleEn: "Activate smart add-on offers in your store",
  ctaDescEn: "Small add-ons are cumulative — every order with two add-ons noticeably boosts your monthly revenue.",
  seo: {
    title: "الإضافات (Add-ons) — زيادة لمتجرك",
    titleEn: "Add-ons — Ziadah for Your Store",
    description: "استخدم زيادة لعرض إضافات وظيفية تُكمّل منتج العميل الأساسي بأسلوب اختبار متعدد يرفع قيمة الطلب ويزيد الإيرادات.",
    descriptionEn: "Use Ziadah to display functional add-ons that complement the customer's main product with a multi-select approach that boosts order value and revenue.",
    canonical: "/use-cases/addons",
  },
};

export default function Addons() {
  return <UseCaseLayout data={data} />;
}
