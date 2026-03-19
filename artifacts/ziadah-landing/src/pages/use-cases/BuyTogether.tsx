import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import BuyTogetherWidget from "../../components/widgets/BuyTogetherWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب طريقة العرض",
    title: "الشراء معاً",
    subtitle: "اجمع منتجات مُكمّلة في عرض واحد يُقنع العميل باقتناء الطقم كاملاً — بثقة بيانات الطلبات الفعلية وتصميم يُبرز التوافق.",
    tagline: "الطقم الكامل يُباع أفضل من كل قطعة بمفردها",
    icon: "🤝",
  },
  whatWeDoTitle: "ما هو عرض 'الشراء معاً' وكيف يعمل في زيادة؟",
  whatWeDoDesc:
    "طريقة 'الشراء معاً' (Frequently Bought Together) تعرض للعميل مجموعة منتجات جرى اختيارها لأنها تُشترى معاً بكثرة أو تُكمّل بعضها وظيفياً — وذلك في شكل عرض مجمّع مع خيار إضافة الكل للسلة بنقرة واحدة. زيادة يستخرج هذه المجموعات من بيانات الطلبات الفعلية للمتجر باستخدام خوارزميات تحليل الارتباط، ثم يعرضها بتصميم يُبرز التوافق ويُسهّل القرار.",
  strategyTitle: "آليات عرض 'الشراء معاً' في زيادة",
  strategies: [
    {
      icon: "📈",
      title: "تحليل الارتباط الفعلي",
      desc: "يحلل زيادة آلاف الطلبات لاستخراج أكثر المنتجات ارتباطاً بالشراء المشترك — لا اجتهادات يدوية، بل بيانات حقيقية من متجرك.",
      color: "#a855f7",
    },
    {
      icon: "🖱️",
      title: "إضافة الكل بنقرة",
      desc: "زر 'أضف الكل للسلة' يضيف جميع منتجات المجموعة دفعة واحدة — يُقلّل الاحتكاك ويُعجّل القرار.",
      color: "#06b6d4",
    },
    {
      icon: "💬",
      title: "رسالة اجتماعية موثوقة",
      desc: "يُرفق العرض بجملة بناءً على بيانات حقيقية مثل 'عملاء اشتروا هذا اشتروا أيضاً...' — تبني ثقة وتُسرّع القرار.",
      color: "#10b981",
    },
    {
      icon: "🎨",
      title: "عرض بصري تركيبي",
      desc: "تُعرض المنتجات بصورة مجتمعة أو شبكة بطاقات تُوضّح التكامل، مع توضيح السعر الإجمالي إذا اختار العميل الطقم كاملاً.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+٣٥٪", label: "نسبة الطلبات التي تحتوي على أكثر من منتج", color: "#a855f7" },
    { value: "+٢٩٪", label: "متوسط قيمة الطلب مع عرض 'الشراء معاً'", color: "#06b6d4" },
    { value: "٤٨٪", label: "من العملاء ينقرون على عرض 'الشراء معاً'", color: "#10b981" },
    { value: "+١٧٪", label: "رضا العملاء عن اكتمال تجربة الشراء", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة تطبيقية من قطاعات متنوعة",
    steps: [
      "☕ قهوة: عميل يشاهد آلة قهوة → يرى طقم 'الشراء معاً': آلة + مطحنة + كبسولات مجموعة — 'عملاء اشتروا هذه الآلة اشتروا أيضاً هذه المجموعة'.",
      "📷 تصوير: عميل يشاهد كاميرا → يُعرض له: كاميرا + حقيبة حمل + بطاقة ذاكرة + بطارية احتياطية كطقم واحد.",
      "💪 رياضة: عميل يشاهد حبل تمرين → طقم مقترح: حبل + قفازات + حصيرة تمرين — بزر 'أضف الطقم كاملاً'.",
      "🧴 عناية: عميلة تشاهد غسول الوجه → طقم البشرة: غسول + تونر + مرطب — 'الروتين الأكثر شراءً معاً لدى عملائنا'.",
    ],
    result: "عرض 'الشراء معاً' بخيار إضافة الكل دفعة واحدة يرفع نسبة تبنّي الطقم الكامل من ٩٪ إلى ٣٣٪ — كل ثلاثة أفراد من كل عشرة يختارون الطقم بدلاً من قطعة واحدة.",
  },
  extraSections: (
    <>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          مثال حي
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>كيف يظهر للعميل داخل المتجر؟</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>هكذا تبدو واجهة ويدجت الشراء معاً كما يراها عميلك فعلياً</p>
        <BuyTogetherWidget />
      </div>
    </section>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)" }}>
          <div className="shine"/>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>الفرق بين 'الشراء معاً' و'عروض الحزم'</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ padding: "24px 28px", background: "rgba(6,182,212,.05)", border: "1px solid rgba(6,182,212,.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#06b6d4", marginBottom: 12 }}>🤝 الشراء معاً</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["مبني على بيانات الارتباط الفعلي", "كل منتج يحتفظ بسعره المستقل", "يُظهر الإجمالي بدون خصم إلزامي", "مناسب لأي نوع من المنتجات"].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}>
                    <span style={{ color: "#06b6d4", fontWeight: 700 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "24px 28px", background: "rgba(16,185,129,.05)", border: "1px solid rgba(16,185,129,.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#10b981", marginBottom: 12 }}>🎁 عروض الحزم (Bundle)</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["سعر خاص للمجموعة كوحدة واحدة", "يُبرز التوفير كحافز رئيسي", "يُباع الطقم بسعر أقل من المجموع", "يحفّز على شراء كميات أو مجموعات"].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}>
                    <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  ),
  plans: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "فعّل عرض 'الشراء معاً' في متجرك",
  ctaDesc: "بيانات عملاؤك تعرف ما يُشترى معاً — دع زيادة يعرضه تلقائياً لكل زائر.",
  seo: {
    title: "الشراء معاً (Buy Together) — زيادة",
    description: "اجمع المنتجات المُكمّلة في عرض واحد مقنع. زيادة يحلل الطلبات الفعلية ليقترح التوليفات الأنسب ويرفع قيمة السلة.",
    canonical: "/use-cases/buy-together",
  },
};

export default function BuyTogether() {
  return <UseCaseLayout data={data} />;
}
