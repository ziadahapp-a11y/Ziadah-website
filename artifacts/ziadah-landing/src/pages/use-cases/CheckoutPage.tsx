import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import UseCaseLiveShowcase from "@/components/UseCaseLiveShowcase";

const PhoneTopBar = () => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 0 12px", borderBottom: "1px solid var(--b1)", marginBottom: 12,
  }}>
    <span style={{ fontSize: 13, color: "var(--tm)", fontWeight: 700 }}>ملخص الطلب</span>
    <span style={{ fontSize: 13, color: "var(--t)", fontWeight: 700 }}>61.60 ⃁ سعودي</span>
  </div>
);

const ShippingRow = ({ method, time, price, highlighted }: { method: string; time: string; price?: string; highlighted?: boolean }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    padding: "8px 0",
    borderBottom: highlighted ? "none" : "1px solid var(--b1)",
  }}>
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, color: highlighted ? "#22c55e" : "var(--t)" }}>{method}</div>
      <div style={{ fontSize: 10, color: "var(--td)", marginTop: 2 }}>{time}</div>
    </div>
    {price && <div style={{ fontSize: 12, fontWeight: 700, color: "var(--tm)" }}>{price}</div>}
  </div>
);

const ProductCard = ({
  name, reviews, price, originalPrice, discount, checked,
}: {
  name: string; reviews: string; price: string; originalPrice?: string; discount?: string; checked?: boolean;
}) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 0", borderBottom: "1px solid var(--b1)",
  }}>
    <div style={{ flex: 1, paddingInlineStart: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t)", marginBottom: 3 }}>{name}</div>
      <div style={{ fontSize: 10, color: "var(--td)", marginBottom: 3 }}>⭐ 4.95 {reviews} مراجعة</div>
      {originalPrice && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#22c55e" }}>{price} ⃁</span>
          <span style={{ fontSize: 10, textDecoration: "line-through", color: "var(--td)" }}>{originalPrice} ⃁</span>
        </div>
      )}
      {!originalPrice && (
        <span style={{ fontSize: 11, fontWeight: 800, color: "#22c55e" }}>{price} ⃁</span>
      )}
      {discount && (
        <span style={{
          fontSize: 9, fontWeight: 700, background: "rgba(16,185,129,.15)",
          color: "#22c55e", padding: "1px 6px", borderRadius: 99, marginTop: 2, display: "inline-block",
        }}>
          {discount}
        </span>
      )}
    </div>
    {checked !== undefined && (
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
        background: checked ? "#16a34a" : "var(--s2)",
        border: `1px solid ${checked ? "#16a34a" : "var(--b2)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {checked && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
      </div>
    )}
  </div>
);

const AddToCartRow = ({
  name, reviews, price, originalPrice, discount, image,
}: {
  name: string; reviews: string; price: string; originalPrice?: string; discount?: string; image: string;
}) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 8, padding: "8px 0",
    borderBottom: "1px solid var(--b1)",
  }}>
    <div style={{
      width: 52, height: 52, borderRadius: 10, flexShrink: 0, overflow: "hidden",
      background: "var(--s1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
    }}>
      {image}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t)", marginBottom: 2 }}>{name}</div>
      <div style={{ fontSize: 10, color: "var(--td)", marginBottom: 3 }}>⭐ 4.95 {reviews} مراجعة</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "var(--t)" }}>{price} ⃁</span>
        {originalPrice && (
          <span style={{ fontSize: 10, textDecoration: "line-through", color: "var(--td)" }}>{originalPrice} ⃁</span>
        )}
        {discount && (
          <span style={{
            fontSize: 9, fontWeight: 700, background: "rgba(16,185,129,.15)",
            color: "#22c55e", padding: "1px 5px", borderRadius: 99,
          }}>
            {discount}
          </span>
        )}
      </div>
    </div>
    <button style={{
      background: "#16a34a", border: "none", color: "#fff",
      fontSize: 10, fontWeight: 700, borderRadius: 8, padding: "7px 10px",
      cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
    }}>
      أضف للسلة
    </button>
  </div>
);

const Phone1Content = () => (
  <>
    <PhoneTopBar />
    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--td)", marginBottom: 6 }}>
      طريقة الشحن
    </div>
    <ShippingRow method="دي اتش ال" time="التسليم من 4 إلى 8 يناير" />
    <div style={{
      background: "linear-gradient(135deg, #16a34a, #15803d)",
      borderRadius: 14, padding: "12px 14px", margin: "12px 0",
    }}>
      <div style={{ fontSize: 12, fontWeight: 900, color: "#fff", marginBottom: 4 }}>خل الشحن مجاني 🚚</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,.85)", marginBottom: 8 }}>
        باقي لك 145 ⃁ للشحن المجاني، ضيف المنتجات.
      </div>
      <div style={{ background: "var(--s3)", borderRadius: 99, height: 5, overflow: "hidden" }}>
        <div style={{ width: "30%", height: "100%", background: "#fff", borderRadius: 99 }} />
      </div>
    </div>
    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--td)", marginBottom: 4 }}>منتجات مقترحة</div>
    <ProductCard name="سلسلة ذهبية بحجر ياقوت" reviews="4681" price="45" checked={true} />
    <ProductCard name="حلق ذهب بحجر ياقوت" reviews="4681" price="100" checked={true} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, paddingBottom: 4 }}>
      <span style={{ fontSize: 11, color: "var(--td)" }}>الدفع</span>
      <span style={{ fontSize: 11, color: "var(--td)" }}>تعديل</span>
    </div>
    <div style={{
      background: "var(--s2)", border: "1px solid var(--b1)",
      borderRadius: 14, padding: "12px 0", textAlign: "center",
      fontSize: 14, fontWeight: 900, color: "var(--t)", marginTop: 8,
    }}>ادفع الآن</div>
  </>
);

const Phone2Content = () => (
  <>
    <PhoneTopBar />
    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--td)", marginBottom: 6 }}>طريقة الشحن</div>
    <ShippingRow method="مجاني" time="" highlighted />
    <ShippingRow method="دي اتش ال" time="التسليم من 4 إلى 8 يناير" price="56 ⃁ سعودي" />
    <div style={{ textAlign: "center", color: "#16a34a", fontSize: 11, fontWeight: 900, margin: "12px 0 8px" }}>
      لا تنسَ تضيفها بعرض خاص لك الآن
    </div>
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      background: "rgba(16,185,129,.07)", border: "1px solid rgba(16,185,129,.25)",
      borderRadius: 12, padding: "10px 14px", marginBottom: 12,
    }}>
      <span style={{ fontSize: 22, fontWeight: 900, color: "#22c55e" }}>30</span>
      <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 700 }}>⃁ شحن مجاني ✓</span>
    </div>
    <AddToCartRow name="شماغ الجنادرية كلاسيك رجالي" reviews="6984" price="241" originalPrice="345" discount="وفر 20%" image="🧣" />
    <AddToCartRow name="سبحة بكلايت بلون أزرق" reviews="6984" price="200" image="📿" />
    <AddToCartRow name="سبحة بكلايت بلون أحمر" reviews="6984" price="200" image="📿" />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, paddingBottom: 4 }}>
      <span style={{ fontSize: 11, color: "var(--td)" }}>الدفع</span>
      <span style={{ fontSize: 11, color: "var(--td)" }}>تعديل</span>
    </div>
    <div style={{
      background: "var(--s2)", border: "1px solid var(--b1)",
      borderRadius: 14, padding: "12px 0", textAlign: "center",
      fontSize: 14, fontWeight: 900, color: "var(--t)", marginTop: 8,
    }}>ادفع الآن</div>
  </>
);

function CheckoutMockup() {
  const { lang } = useLanguage();
  const isAr = lang !== "en";
  const isEn = !isAr;
  return (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isEn ? "How does Ziadah look on the checkout page?" : "كيف يبدو زيادة في صفحة الدفع؟"}
      subtitle={isEn ? "Swipe tabs — same patterns, inside a shopper’s phone frame." : "بدّل بين النمطين — داخل إطار هاتف العميل."}
      tabs={[
        {
          labelAr: "أكمل للشحن المجاني",
          labelEn: "Complete for Free Shipping",
          icon: "🚚",
          content: <Phone1Content />,
        },
        {
          labelAr: "عرض الشحن المجاني المميز",
          labelEn: "Premium Free Shipping Offer",
          icon: "✅",
          content: <Phone2Content />,
        },
      ]}
    />
  );
}

const data: UseCasePageData = {
  hero: {
    tag: "حسب الصفحات",
    title: "صفحة الدفع",
    subtitle: "اللحظة الأخيرة قبل اكتمال الطلب — وهي ذهبية. زيادة يوظّفها لزيادة قيمة الطلب بعروض ذكية تشجع العميل على الإضافة قبل الدفع.",
    tagline: "آخر توصية قبل الدفع = أعلى عائد بأقل جهد",
    icon: "💳",
  },
  whatWeDoTitle: "كيف يعمل زيادة في صفحة الدفع؟",
  whatWeDoDesc:
    "عندما يصل العميل إلى صفحة الدفع يكون قراره شبه نهائي — وهذا يجعلها أفضل لحظة لاقتراح منتجات إضافية بدون إزعاج. زيادة يحلل سلة العميل ويحسب الفجوة بين إجمالي طلبه وعتبة الشحن المجاني، فيقترح منتجات بالقيمة الناقصة تماماً. كما يعرض منتجات مكمّلة يمكن إضافتها بنقرة واحدة، مع عروض مؤقتة تحفّز على الإضافة قبل إتمام الدفع.",
  strategyTitle: "استراتيجيات زيادة في صفحة الدفع",
  strategies: [
    {
      icon: "🚚",
      title: "أكمل للشحن المجاني",
      desc: "يحسب زيادة الفجوة بين قيمة الطلب وعتبة الشحن المجاني ويقترح منتجات بالقيمة الناقصة تماماً مع شريط تقدم مرئي يحفّز العميل على الإضافة.",
      color: "#16a34a",
    },
    {
      icon: "✅",
      title: "Cross-sell بنقرة واحدة",
      desc: "يعرض منتجات مكمّلة مع خيار الإضافة بخانة اختيار — سهلة وسريعة — دون الحاجة للرجوع لصفحات المنتجات.",
      color: "#22c55e",
    },
    {
      icon: "🎁",
      title: "عروض وقت الدفع",
      desc: "يطلق زيادة عروضاً مؤقتة حصرية تظهر فقط في صفحة الدفع، تخلق إلحاحاً طبيعياً يجعل العميل يضيف قبل فوات الأوان.",
      color: "#f59e0b",
    },
    {
      icon: "⬆️",
      title: "Upsell بخيار الترقية",
      desc: "يعرض نسخة أفضل أو منتجاً بديلاً بسعر مختلف مع إبراز واضح للتوفير أو القيمة الإضافية — يرفع متوسط قيمة الطلب بشكل ملموس.",
      color: "#06b6d4",
    },
  ],
  stats: [
    { value: "+27%", label: "متوسط قيمة الطلب", color: "#22c55e" },
    { value: "+19%", label: "معدل إتمام الشراء", color: "#22c55e" },
    { value: "-34%", label: "معدل التخلي عند الدفع", color: "#ec4899" },
    { value: "+41%", label: "الطلبات تتجاوز عتبة الشحن", color: "#06b6d4" },
  ],
  exampleScenario: {
    title: "عميل عند الدفع بطلب قيمته 55 ⃁",
    steps: [
      "العميل في صفحة الدفع بطلب بقيمة 55 ⃁ وعتبة الشحن المجاني 200 ⃁.",
      "يكتشف زيادة أن الفجوة 145 ⃁ — ويعرض شريط 'أكمل للشحن المجاني' مع منتجات مقترحة.",
      "يظهر منتجان بسعر 45 و100 ⃁ معاً — مجموعهما 145 ⃁ بالضبط — مع خانة اختيار سهلة.",
      "العميل يضيف المنتجين بنقرتين ويحصل على شحن مجاني كمكافأة.",
    ],
    result: "الطلب ارتفع من 55 إلى 200 ⃁ والعميل شعر أن القرار كان لصالحه — لأنه وفّر تكلفة الشحن.",
  },
  ctaTitle: "حوّل صفحة الدفع إلى فرصة مبيعات ذكية",
  ctaDesc: "فعّل زيادة وشاهد قيمة طلباتك ترتفع مع كل عملية دفع.",
  extraSections: <CheckoutMockup />,
  heroEn: {
    tag: "By Pages",
    title: "Checkout Page",
    subtitle: "The last moment before the order is complete — and it's golden. Ziadah leverages it to increase order value with smart offers that encourage customers to add before paying.",
    tagline: "Last recommendation before payment = highest return with least effort",
    icon: "💳",
  },
  whatWeDoTitleEn: "How does Ziadah work on the checkout page?",
  whatWeDoDescEn:
    "When the customer reaches the checkout page, their decision is nearly final — making it the best moment to suggest additional products without being intrusive. Ziadah analyzes the cart and calculates the gap between the order total and the free shipping threshold, suggesting products at exactly the missing value. It also shows complementary products that can be added with one click, along with timed offers that incentivize adding before completing payment.",
  strategyTitleEn: "Ziadah's strategies on the checkout page",
  strategiesEn: [
    {
      icon: "🚚",
      title: "Complete for Free Shipping",
      desc: "Ziadah calculates the gap between order value and free shipping threshold and suggests products at exactly the missing value with a visual progress bar motivating the customer to add.",
      color: "#16a34a",
    },
    {
      icon: "✅",
      title: "One-Click Cross-sell",
      desc: "Shows complementary products with a checkbox add option — easy and quick — without needing to go back to product pages.",
      color: "#22c55e",
    },
    {
      icon: "🎁",
      title: "Checkout-Time Offers",
      desc: "Ziadah launches timed exclusive offers that appear only on the checkout page, creating natural urgency that makes the customer add before it's too late.",
      color: "#f59e0b",
    },
    {
      icon: "⬆️",
      title: "Upsell with Upgrade Option",
      desc: "Shows a better version or alternative product at a different price with clear savings or additional value highlighted — noticeably increases average order value.",
      color: "#06b6d4",
    },
  ],
  statsEn: [
    { value: "+27%", label: "Average order value", color: "#22c55e" },
    { value: "+19%", label: "Purchase completion rate", color: "#22c55e" },
    { value: "-34%", label: "Checkout abandonment rate", color: "#ec4899" },
    { value: "+41%", label: "Orders exceeding shipping threshold", color: "#06b6d4" },
  ],
  exampleScenarioEn: {
    title: "Customer at checkout with a 55 SAR order",
    steps: [
      "The customer is on the checkout page with a 55 SAR order and a 200 SAR free shipping threshold.",
      "Ziadah discovers the gap is 145 SAR — shows a 'Complete for Free Shipping' bar with suggested products.",
      "Two products appear at 45 and 100 SAR — totaling exactly 145 SAR — with easy checkboxes.",
      "The customer adds both products with two clicks and gets free shipping as a reward.",
    ],
    result: "The order rose from 55 to 200 SAR and the customer felt the decision was in their favor — because they saved shipping costs.",
  },
  ctaTitleEn: "Turn the checkout page into a smart sales opportunity",
  ctaDescEn: "Activate Ziadah and watch your order values rise with every payment.",
  seo: {
    title: "عروض صفحة الدفع — زيادة",
    titleEn: "Checkout Page Offers — Ziadah",
    description: "استثمر اللحظة الأخيرة قبل إتمام الطلب. زيادة يعرض عروضاً ذكية في صفحة الدفع ترفع قيمة الطلب وتشجع العميل على الإضافة.",
    descriptionEn: "Leverage the last moment before completing the order. Ziadah displays smart offers on the checkout page that increase order value and encourage customers to add more.",
    canonical: "/use-cases/checkout",
  },
};

export default function CheckoutPage() {
  return <UseCaseLayout data={data} />;
}
