import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import CouponWidget from "../../components/widgets/CouponWidget";
import FreeShippingThresholdWidget from "../../components/widgets/FreeShippingThresholdWidget";
import RelatedProductsWidget from "../../components/widgets/RelatedProductsWidget";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import { PageHeroPhone } from "../../components/UseCasePagesShowcase";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

function CartHeroContent() {
  const { lang, dir } = useLanguage();
  const t = useSiteT();
  const tr = t[lang].widgets.cartHeroPhone;

  return (
    <div dir={dir} style={{ fontFamily: "var(--font, system-ui)", padding: "0 2px" }}>
      {/* status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10, fontWeight: 700, marginBottom: 10, color: "var(--td)" }}>
        <span>9:41</span>
        <span>📶 🔋</span>
      </div>
      {/* cart header */}
      <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 10, color: "var(--t)" }}>{tr.cartTitle}</div>
      {/* progress */}
      <div style={{ background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.25)", borderRadius: 10, padding: "8px 10px", marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#22c55e", marginBottom: 5 }}>{tr.freeShipHint}</div>
        <div style={{ height: 5, background: "rgba(16,185,129,.15)", borderRadius: 99 }}>
          <div style={{ height: "100%", width: "82%", background: "linear-gradient(90deg, #22c55e, #22c55e)", borderRadius: 99 }} />
        </div>
        <div style={{ fontSize: 9, color: "var(--td)", marginTop: 4 }}>{tr.progressTotals}</div>
      </div>
      {/* items */}
      {tr.lineItems.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid var(--b1)" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--s2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{item.emoji}</div>
          <div style={{ flex: 1, fontSize: 11, fontWeight: 700 }}>{item.name}</div>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#22c55e" }}>{item.price}</div>
        </div>
      ))}
      {/* suggestion */}
      <div style={{ background: "rgba(245,158,11,.07)", border: "1px solid rgba(245,158,11,.25)", borderRadius: 10, padding: "8px 10px", marginTop: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", marginBottom: 4 }}>{tr.suggestionTitle}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700 }}>{tr.suggestionName}</span>
          <button type="button" style={{ fontSize: 9, fontWeight: 900, background: "#f59e0b", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", cursor: "pointer" }}>{tr.suggestionAdd}</button>
        </div>
      </div>
      {/* total */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, padding: "8px 0", borderTop: "1px solid var(--b1)" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t)" }}>{tr.totalLabel}</span>
        <span style={{ fontSize: 13, fontWeight: 900, color: "#22c55e" }}>{tr.grandTotal}</span>
      </div>
      <button type="button" style={{ width: "100%", marginTop: 8, background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", border: "none", borderRadius: 10, padding: "9px 0", fontSize: 12, fontWeight: 900, cursor: "pointer" }}>
        {tr.checkoutCta}
      </button>
    </div>
  );
}

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
      color: "#22c55e",
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
    { value: "-38%", label: "معدل التخلي عن السلة", color: "#ec4899" },
    { value: "+22%", label: "متوسط قيمة الطلب", color: "#22c55e" },
    { value: "+31%", label: "الطلبات تتجاوز عتبة الشحن", color: "#22c55e" },
    { value: "+18%", label: "معدل إتمام الشراء", color: "#06b6d4" },
  ],
  exampleScenario: {
    title: "عميل في سلة بقيمة 170 ⃁",
    steps: [
      "العميل أضاف منتجي تجميل بقيمة 170 ⃁.",
      "يكتشف زيادة أن عتبة الشحن المجاني عند 200 ⃁ — الفجوة 30 ⃁ فقط.",
      "يظهر مباشرة: 'أضف 30 ⃁ وتحصل على شحن مجاني' + بلسم شعر بـ 32 ⃁ كاقتراح.",
      "العميل يضيف البلسم برضا لأن التوفير محسوس ومباشر.",
    ],
    result: "الطلب ارتفع من 170 إلى 202 ⃁ والعميل شعر أنه هو من استفاد من الصفقة.",
  },
  heroVisual: (
    <PageHeroPhone float1="-38% تخلي عن السلة" float2="🚚 أكمل للشحن المجاني">
      <CartHeroContent />
    </PageHeroPhone>
  ),
  extraSections: (isAr) => (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف يظهر للعميل داخل المتجر؟" : "How does it look to customers in-store?"}
      subtitle={
        isAr
          ? "واجهات صفحة السلة — قسيمة الخصم، شريط الشحن المجاني، ومنتجات ذات صلة"
          : "Cart page widgets — auto coupon, free-shipping progress, and related products"
      }
      tabs={[
        {
          labelAr: "🏷️ قسيمة الخصم",
          labelEn: "🏷️ Discount Coupon",
          content: <CouponWidget />,
        },
        {
          labelAr: "🚚 شريط الشحن المجاني",
          labelEn: "🚚 Free Shipping Bar",
          content: <FreeShippingThresholdWidget />,
        },
        {
          labelAr: "🛍️ منتجات ذات صلة",
          labelEn: "🛍️ Related Products",
          content: <RelatedProductsWidget />,
        },
      ]}
    />
  ),
  ctaTitle: "حوّل سلة النيّة إلى سلة مكتملة",
  ctaDesc: "قلّل التخلي وارفع قيمة الطلب في نفس الوقت مع زيادة.",
  heroEn: {
    tag: "By Pages",
    title: "Cart Page",
    subtitle: "The last golden opportunity before checkout — the customer is ready to buy, and any smart recommendation at this moment directly increases order value.",
    tagline: "Customer at the cart = the perfect time to boost",
    icon: "🛒",
  },
  whatWeDoTitleEn: "How does Ziadah work on the cart page?",
  whatWeDoDescEn:
    "The cart page is the peak moment of purchase intent — the customer has convinced themselves to buy and is one step from payment. Ziadah leverages this moment wisely: it displays small complementary products that don't disrupt the decision, calculates the gap between cart value and free shipping and suggests what fills it, and deploys a timed discount coupon for hesitating customers to push them to complete immediately.",
  strategyTitleEn: "Ziadah's strategies on the cart page",
  strategiesEn: [
    {
      icon: "🛒",
      title: "Bought Together (BTAT)",
      desc: "Shows products that thousands of customers have bought with the same items in the cart. Social, trustworthy, and highly effective.",
      color: "#22c55e",
    },
    {
      icon: "➕",
      title: "Low-Cost Add-ons",
      desc: "Suggests small-priced add-ons that complement current purchases — like a cover, gift wrapping, or extended warranty. Easy to approve and they boost order value.",
      color: "#06b6d4",
    },
    {
      icon: "💰",
      title: "Complete for Free Shipping",
      desc: "Ziadah calculates the gap between cart value and the free shipping threshold and suggests a product at exactly the missing amount. A powerful incentive customers happily accept.",
      color: "#f59e0b",
    },
    {
      icon: "🏷️",
      title: "Discount Coupon for Hesitators",
      desc: "If the customer spends too long in the cart without completing, a timed coupon (10-15 minutes) appears to push them to buy now.",
      color: "#ec4899",
    },
  ],
  statsEn: [
    { value: "-38%", label: "Cart abandonment rate", color: "#ec4899" },
    { value: "+22%", label: "Average order value", color: "#22c55e" },
    { value: "+31%", label: "Orders exceeding shipping threshold", color: "#22c55e" },
    { value: "+18%", label: "Purchase completion rate", color: "#06b6d4" },
  ],
  exampleScenarioEn: {
    title: "A customer with a 170 SAR cart",
    steps: [
      "The customer added two beauty products worth 170 SAR.",
      "Ziadah discovers the free shipping threshold is 200 SAR — the gap is only 30 SAR.",
      "Instantly shows: 'Add 30 SAR to get free shipping' + a hair conditioner at 32 SAR as a suggestion.",
      "The customer adds the conditioner happily because the savings feel tangible and direct.",
    ],
    result: "The order rose from 170 to 202 SAR and the customer felt they benefited from the deal.",
  },
  ctaTitleEn: "Turn the intent cart into a completed cart",
  ctaDescEn: "Reduce abandonment and increase order value at the same time with Ziadah.",
  seo: {
    title: "تحسين صفحة السلة — زيادة",
    titleEn: "Optimize Cart Page — Ziadah",
    description: "ارفع قيمة الطلب في صفحة السلة عبر توصيات ذكية من زيادة. آخر فرصة قبل الدفع لزيادة إيراداتك بدون تكاليف إضافية.",
    descriptionEn: "Increase order value on the cart page with smart recommendations from Ziadah. The last chance before checkout to boost revenue without extra costs.",
    canonical: "/use-cases/cart",
  },
};

export default function CartPage() {
  return <UseCaseLayout data={data} />;
}
