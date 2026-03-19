import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import CouponWidget from "../../components/widgets/CouponWidget";
import FreeShippingThresholdWidget from "../../components/widgets/FreeShippingThresholdWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الصفحات",
    title: "صفحة السلة",
    subtitle: "آخر فرصة ذهبية قبل الدفع — العميل مستعد للشراء، وأي توصية ذكية في هذه اللحظة ترفع قيمة الطلب مباشرة.",
    tagline: "العميل أمام السلة = الوقت المثالي للزيادة",
    icon: "🛒",
  },
  whatWeDoTitle: "كيف يعمل زيادة في صفحة السلة؟",
  whatWeDoDesc:
    "صفحة السلة هي أعلى لحظات النية الشرائية — العميل أقنع نفسه بالشراء وهو على بعد خطوة من الدفع. زيادة يستغل هذه اللحظة بحكمة: يعرض منتجات مكمّلة صغيرة لا تزعج القرار، يحسب الفجوة بين قيمة السلة والشحن المجاني ويقترح ما يسدها، ويوظّف كوبون خصم مؤقت للعملاء المترددين ليدفعهم للإتمام فوراً.",
  strategyTitle: "استراتيجيات زيادة في صفحة السلة",
  strategies: [
    {
      icon: "🛒",
      title: "اشتروا مع بعض (BTAT)",
      desc: "يعرض المنتجات التي اشتراها آلاف العملاء مع نفس المنتجات الموجودة في السلة. اجتماعي، موثوق، وفعّال جداً.",
      color: "#10b981",
    },
    {
      icon: "➕",
      title: "إضافات منخفضة التكلفة",
      desc: "يقترح إضافات ذات سعر صغير تكمّل المشتريات الحالية — مثل غطاء، تغليف هدية، ضمان ممتد. سهلة الموافقة وترفع قيمة الطلب.",
      color: "#06b6d4",
    },
    {
      icon: "💰",
      title: "أكمل للشحن المجاني",
      desc: "يحسب زيادة الفجوة بين قيمة السلة وعتبة الشحن المجاني ويقترح منتجاً بالقيمة الناقصة تماماً. حافز قوي يقبله العملاء بسعادة.",
      color: "#f59e0b",
    },
    {
      icon: "🏷️",
      title: "كوبون خصم للمترددين",
      desc: "إذا قضى العميل وقتاً طويلاً في السلة دون إتمام، يظهر له كوبون مؤقت (10 إلى 15 دقيقة) يدفعه للشراء الآن.",
      color: "#ec4899",
    },
  ],
  stats: [
    { value: "-38٪", label: "معدل التخلي عن السلة", color: "#ec4899" },
    { value: "+22٪", label: "متوسط قيمة الطلب", color: "#a855f7" },
    { value: "+31٪", label: "الطلبات تتجاوز عتبة الشحن", color: "#10b981" },
    { value: "+18٪", label: "معدل إتمام الشراء", color: "#06b6d4" },
  ],
  exampleScenario: {
    title: "عميل في سلة بقيمة 170 ريال",
    steps: [
      "العميل أضاف منتجي تجميل بقيمة 170 ريال.",
      "يكتشف زيادة أن عتبة الشحن المجاني عند 200 ريال — الفجوة 30 ريال فقط.",
      "يظهر مباشرة: 'أضف 30 ريال وتحصل على شحن مجاني' + بلسم شعر بـ 32 ريال كاقتراح.",
      "العميل يضيف البلسم برضا لأن التوفير محسوس ومباشر.",
    ],
    result: "الطلب ارتفع من 170 إلى 202 ريال والعميل شعر أنه هو من استفاد من الصفقة.",
  },
  extraSections: (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          مثال حي
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>كيف يظهر للعميل داخل المتجر؟</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>واجهات صفحة السلة — قسيمة الخصم وشريط الشحن المجاني</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--tm)", marginBottom: 12 }}>قسيمة خصم تلقائية</div>
            <CouponWidget />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--tm)", marginBottom: 12 }}>الوصول للشحن المجاني</div>
            <FreeShippingThresholdWidget />
          </div>
        </div>
      </div>
    </section>
  ),
  plans: ["النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "حوّل سلة النيّة إلى سلة مكتملة",
  ctaDesc: "قلّل التخلي وارفع قيمة الطلب في نفس الوقت مع زيادة.",
};

export default function CartPage() {
  return <UseCaseLayout data={data} />;
}
