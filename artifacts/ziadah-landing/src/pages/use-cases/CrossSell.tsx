import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";

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
    { value: "+32٪", label: "متوسط عدد المنتجات في السلة", color: "#a855f7" },
    { value: "+28٪", label: "متوسط قيمة الطلب", color: "#06b6d4" },
    { value: "+41٪", label: "معدل قبول التوصية", color: "#10b981" },
    { value: "+19٪", label: "رضا العملاء عن التجربة", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة تطبيقية من قطاعات مختلفة",
    steps: [
      "🍕 مطعم: عميل اشترى برغر → يُقترح له بطاطس + مشروب + صلصة إضافية (كومبو وجبة كاملة).",
      "💄 تجميل: عميلة اشترت فاونديشن → يُقترح لها برايمر + بودرة تثبيت + إسفنجة تطبيق.",
      "💻 إلكترونيات: عميل اشترى لابتوب → يُقترح له حقيبة + ماوس لاسلكي + منصة تبريد.",
      "👕 أزياء: عميل اشترى قميص → يُقترح له بنطلون مكمّل + حزام بنفس اللون.",
    ],
    result: "في جميع هذه الأمثلة، معدل قبول الاقتراح المتقاطع بين 25 و45٪ — كل قبول واحد يساوي طلباً إضافياً بدون تكلفة تسويق.",
  },
  extraSections: (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)" }}>
          <div className="shine"/>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>الفرق بين البيع المتقاطع والبيع البديل</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ padding: "24px 28px", background: "rgba(6,182,212,.05)", border: "1px solid rgba(6,182,212,.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#06b6d4", marginBottom: 12 }}>🔗 البيع المتقاطع (Cross-sell)</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["يقترح منتجات مكمّلة", "يزيد عدد المنتجات في السلة", "يعمل على صفحة المنتج والسلة", "مثال: هاتف + غلاف + واقي شاشة"].map((item, i) => (
                  <li
                    key={i}
                    style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}
                    className="text-[16px]">
                    <span style={{ color: "#06b6d4", fontWeight: 700 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "24px 28px", background: "rgba(168,85,247,.05)", border: "1px solid rgba(168,85,247,.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#a855f7", marginBottom: 12 }}>⬆️ البيع البديل (Upsell)</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["يقترح نسخة أفضل من نفس المنتج", "يرفع سعر المنتج الأساسي", "يعمل على صفحة المنتج بشكل رئيسي", "مثال: هاتف بسيط → هاتف بمواصفات أعلى"].map((item, i) => (
                  <li
                    key={i}
                    style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}
                    className="text-[16px]">
                    <span style={{ color: "#a855f7", fontWeight: 700 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  ),
  plans: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "فعّل البيع المتقاطع في متجرك اليوم",
  ctaDesc: "كل عميل يمكن أن يشتري أكثر — أنت فقط بحاجة لمن يذكّره في الوقت المناسب.",
};

export default function CrossSell() {
  return <UseCaseLayout data={data} />;
}
