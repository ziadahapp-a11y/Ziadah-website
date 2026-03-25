import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";

const PhoneMockup = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    width: 280,
    background: "var(--s1)",
    border: "1px solid var(--b2)",
    borderRadius: 36,
    overflow: "hidden",
    boxShadow: "0 32px 80px rgba(0,0,0,.15)",
    backdropFilter: "blur(12px)",
    flexShrink: 0,
    ...style,
  }}>
    <div style={{
      display: "flex", justifyContent: "center", paddingTop: 14, paddingBottom: 8,
    }}>
      <div style={{ width: 80, height: 6, background: "var(--s3)", borderRadius: 99 }} />
    </div>
    <div style={{ padding: "0 16px 24px" }}>
      {children}
    </div>
  </div>
);

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
      <div style={{ fontSize: 12, fontWeight: 700, color: highlighted ? "#10b981" : "var(--t)" }}>{method}</div>
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
    <div style={{ flex: 1, paddingLeft: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t)", marginBottom: 3 }}>{name}</div>
      <div style={{ fontSize: 10, color: "var(--td)", marginBottom: 3 }}>⭐ 4.95 {reviews} مراجعة</div>
      {originalPrice && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#a855f7" }}>{price} ⃁</span>
          <span style={{ fontSize: 10, textDecoration: "line-through", color: "var(--td)" }}>{originalPrice} ⃁</span>
        </div>
      )}
      {!originalPrice && (
        <span style={{ fontSize: 11, fontWeight: 800, color: "#a855f7" }}>{price} ⃁</span>
      )}
      {discount && (
        <span style={{
          fontSize: 9, fontWeight: 700, background: "rgba(16,185,129,.15)",
          color: "#10b981", padding: "1px 6px", borderRadius: 99, marginTop: 2, display: "inline-block",
        }}>
          {discount}
        </span>
      )}
    </div>
    {checked !== undefined && (
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
        background: checked ? "#7c3aed" : "var(--s2)",
        border: `1px solid ${checked ? "#7c3aed" : "var(--b2)"}`,
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
            color: "#10b981", padding: "1px 5px", borderRadius: 99,
          }}>
            {discount}
          </span>
        )}
      </div>
    </div>
    <button style={{
      background: "#7c3aed", border: "none", color: "#fff",
      fontSize: 10, fontWeight: 700, borderRadius: 8, padding: "7px 10px",
      cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
    }}>
      اضف للسلة
    </button>
  </div>
);

function CheckoutMockup() {
  return (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{
          fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 900, textAlign: "center",
          marginBottom: 40, color: "var(--t)",
        }}>
          كيف يبدو زيادة في صفحة الدفع؟
        </h2>

        <div style={{
          display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap",
        }}>
          {/* LEFT PHONE: Free shipping progress + cross-sell checkboxes */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: "var(--p4)", textAlign: "center",
              background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.25)",
              padding: "5px 16px", borderRadius: 99,
            }}>
              أكمل للشحن المجاني
            </div>
            <PhoneMockup>
              <PhoneTopBar />

              {/* Shipping method */}
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--td)", marginBottom: 6 }}>
                طريقة الشحن
              </div>
              <ShippingRow method="دي اتش ال" time="التسليم من 4 إلى 8 يناير" />

              {/* Free shipping progress banner */}
              <div style={{
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                borderRadius: 14, padding: "12px 14px", margin: "12px 0",
              }}>
                <div style={{ fontSize: 12, fontWeight: 900, color: "#fff", marginBottom: 4 }}>خل الشحن مجاني 🚚</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.85)", marginBottom: 8 }}>
                  باقي لك 145 ⃁ للشحن المجاني، ضيف المنتجات.
                </div>
                <div style={{
                  background: "var(--s3)", borderRadius: 99, height: 5, overflow: "hidden",
                }}>
                  <div style={{ width: "30%", height: "100%", background: "#fff", borderRadius: 99 }} />
                </div>
              </div>

              {/* Cross-sell product checkboxes */}
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--td)", marginBottom: 4 }}>
                منتجات مقترحة
              </div>
              <ProductCard name="سلسلال ذهب بحجر ياقوت" reviews="4681" price="45" checked={true} />
              <ProductCard name="حلق ذهب بحجر ياقوت" reviews="4681" price="100" checked={true} />

              {/* Footer row */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                paddingTop: 10, paddingBottom: 4,
              }}>
                <span style={{ fontSize: 11, color: "var(--td)" }}>الدفع</span>
                <span style={{ fontSize: 11, color: "var(--td)" }}>تعديل</span>
              </div>

              {/* Pay button */}
              <div style={{
                background: "var(--s2)", border: "1px solid var(--b1)",
                borderRadius: 14, padding: "12px 0", textAlign: "center",
                fontSize: 14, fontWeight: 900, color: "var(--t)", marginTop: 8,
              }}>
                ادفع الآن
              </div>
            </PhoneMockup>
          </div>

          {/* RIGHT PHONE: Upsell rows with add-to-cart */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: "#10b981", textAlign: "center",
              background: "rgba(16,185,129,.1)", border: "1px solid rgba(16,185,129,.25)",
              padding: "5px 16px", borderRadius: 99,
            }}>
              عرض الشحن المجاني المميز
            </div>
            <PhoneMockup>
              <PhoneTopBar />

              {/* Shipping options */}
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--td)", marginBottom: 6 }}>
                طريقة الشحن
              </div>
              <ShippingRow method="مجاني" time="" highlighted />
              <ShippingRow method="دي اتش ال" time="التسليم من 4 إلى 8 يناير" price="56 ⃁ سعودي" />

              {/* Upsell headline */}
              <div style={{
                textAlign: "center", color: "#7c3aed", fontSize: 11, fontWeight: 900,
                margin: "12px 0 8px",
              }}>
                لاتنسى تضيفها بعرض خاص لك الآن
              </div>

              {/* Free shipping badge */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "rgba(16,185,129,.07)", border: "1px solid rgba(16,185,129,.25)",
                borderRadius: 12, padding: "10px 14px", marginBottom: 12,
              }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "#10b981" }}>30</span>
                <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>⃁ شحن مجاني ✓</span>
              </div>

              {/* Upsell product rows */}
              <AddToCartRow
                name="شماغ الجنادرية كلاسيك رجالي"
                reviews="6984"
                price="241"
                originalPrice="345"
                discount="وفر 20%"
                image="🧣"
              />
              <AddToCartRow
                name="سبحة بكلايت بلون أزرق"
                reviews="6984"
                price="200"
                image="📿"
              />
              <AddToCartRow
                name="سبحة بكلايت بلون أحمر"
                reviews="6984"
                price="200"
                image="📿"
              />

              {/* Footer row */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                paddingTop: 10, paddingBottom: 4,
              }}>
                <span style={{ fontSize: 11, color: "var(--td)" }}>الدفع</span>
                <span style={{ fontSize: 11, color: "var(--td)" }}>تعديل</span>
              </div>

              {/* Pay button */}
              <div style={{
                background: "var(--s2)", border: "1px solid var(--b1)",
                borderRadius: 14, padding: "12px 0", textAlign: "center",
                fontSize: 14, fontWeight: 900, color: "var(--t)", marginTop: 8,
              }}>
                ادفع الآن
              </div>
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
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
      color: "#7c3aed",
    },
    {
      icon: "✅",
      title: "Cross-sell بنقرة واحدة",
      desc: "يعرض منتجات مكمّلة مع خيار الإضافة بخانة اختيار — سهلة وسريعة — دون الحاجة للرجوع لصفحات المنتجات.",
      color: "#10b981",
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
    { value: "+27%", label: "متوسط قيمة الطلب", color: "#a855f7" },
    { value: "+19%", label: "معدل إتمام الشراء", color: "#10b981" },
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
  plans: ["النمو", "الاحترافية", "الأعمال"],
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
      color: "#7c3aed",
    },
    {
      icon: "✅",
      title: "One-Click Cross-sell",
      desc: "Shows complementary products with a checkbox add option — easy and quick — without needing to go back to product pages.",
      color: "#10b981",
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
    { value: "+27%", label: "Average order value", color: "#a855f7" },
    { value: "+19%", label: "Purchase completion rate", color: "#10b981" },
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
  plansEn: ["Growth", "Professional", "Business"],
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
