import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";

const PhoneMockup = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    width: 280,
    background: "rgba(15,10,35,.95)",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 36,
    overflow: "hidden",
    boxShadow: "0 32px 80px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.1)",
    backdropFilter: "blur(12px)",
    flexShrink: 0,
    ...style,
  }}>
    <div style={{
      display: "flex", justifyContent: "center", paddingTop: 14, paddingBottom: 8,
    }}>
      <div style={{ width: 80, height: 6, background: "rgba(255,255,255,.2)", borderRadius: 99 }} />
    </div>
    <div style={{ padding: "0 16px 24px" }}>
      {children}
    </div>
  </div>
);

const PhoneTopBar = () => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 0 12px", borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 12,
  }}>
    <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)", fontWeight: 700 }}>ملخص الطلب</span>
    <span style={{ fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 700 }}>61.60 ꜁ سعودي</span>
  </div>
);

const ShippingRow = ({ method, time, price, highlighted }: { method: string; time: string; price?: string; highlighted?: boolean }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    padding: "8px 0",
    borderBottom: highlighted ? "none" : "1px solid rgba(255,255,255,.06)",
  }}>
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, color: highlighted ? "#10b981" : "rgba(255,255,255,.85)" }}>{method}</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{time}</div>
    </div>
    {price && <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.6)" }}>{price}</div>}
  </div>
);

const ProductCard = ({
  name, reviews, price, originalPrice, discount, checked,
}: {
  name: string; reviews: string; price: string; originalPrice?: string; discount?: string; checked?: boolean;
}) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.06)",
  }}>
    <div style={{ flex: 1, paddingLeft: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.9)", marginBottom: 3 }}>{name}</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginBottom: 3 }}>⭐ 4.95 {reviews} مراجعة</div>
      {originalPrice && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#a855f7" }}>{price} ꜁</span>
          <span style={{ fontSize: 10, textDecoration: "line-through", color: "rgba(255,255,255,.35)" }}>{originalPrice} ꜁</span>
        </div>
      )}
      {!originalPrice && (
        <span style={{ fontSize: 11, fontWeight: 800, color: "#a855f7" }}>{price} ꜁</span>
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
        background: checked ? "#7c3aed" : "rgba(255,255,255,.08)",
        border: `1px solid ${checked ? "#7c3aed" : "rgba(255,255,255,.2)"}`,
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
    borderBottom: "1px solid rgba(255,255,255,.06)",
  }}>
    <div style={{
      width: 52, height: 52, borderRadius: 10, flexShrink: 0, overflow: "hidden",
      background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
    }}>
      {image}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.9)", marginBottom: 2 }}>{name}</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginBottom: 3 }}>⭐ 4.95 {reviews} مراجعة</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,.85)" }}>{price} ꜁</span>
        {originalPrice && (
          <span style={{ fontSize: 10, textDecoration: "line-through", color: "rgba(255,255,255,.35)" }}>{originalPrice} ꜁</span>
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
          marginBottom: 40, color: "#fff",
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
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: 6 }}>
                طريقة الشحن
              </div>
              <ShippingRow method="دي اتش ال" time="التسليم من 4 إلى 8 يناير" />

              {/* Free shipping progress banner */}
              <div style={{
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                borderRadius: 14, padding: "12px 14px", margin: "12px 0",
              }}>
                <div style={{ fontSize: 12, fontWeight: 900, color: "#fff", marginBottom: 4 }}>خل الشحن مجاني 🚚</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.8)", marginBottom: 8 }}>
                  باقي لك 145 ꜁ للشحن المجاني، ضيف المنتجات.
                </div>
                <div style={{
                  background: "rgba(255,255,255,.2)", borderRadius: 99, height: 5, overflow: "hidden",
                }}>
                  <div style={{ width: "30%", height: "100%", background: "#fff", borderRadius: 99 }} />
                </div>
              </div>

              {/* Cross-sell product checkboxes */}
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: 4 }}>
                منتجات مقترحة
              </div>
              <ProductCard name="سلسلال ذهب بحجر ياقوت" reviews="4681" price="45" checked={true} />
              <ProductCard name="حلق ذهب بحجر ياقوت" reviews="4681" price="100" checked={true} />

              {/* Footer row */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                paddingTop: 10, paddingBottom: 4,
              }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>الدفع</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>تعديل</span>
              </div>

              {/* Pay button */}
              <div style={{
                background: "#111", border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 14, padding: "12px 0", textAlign: "center",
                fontSize: 14, fontWeight: 900, color: "#fff", marginTop: 8,
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
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: 6 }}>
                طريقة الشحن
              </div>
              <ShippingRow method="مجاني" time="" highlighted />
              <ShippingRow method="دي اتش ال" time="التسليم من 4 إلى 8 يناير" price="56 ꜁ سعودي" />

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
                <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>꜁ شحن مجاني ✓</span>
              </div>

              {/* Upsell product rows */}
              <AddToCartRow
                name="شماغ الجنادرية كلاسيك رجالي"
                reviews="6984"
                price="241"
                originalPrice="345"
                discount="وفر 20٪"
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
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>الدفع</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>تعديل</span>
              </div>

              {/* Pay button */}
              <div style={{
                background: "#111", border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 14, padding: "12px 0", textAlign: "center",
                fontSize: 14, fontWeight: 900, color: "#fff", marginTop: 8,
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
    { value: "+27٪", label: "متوسط قيمة الطلب", color: "#a855f7" },
    { value: "+19٪", label: "معدل إتمام الشراء", color: "#10b981" },
    { value: "-34٪", label: "معدل التخلي عند الدفع", color: "#ec4899" },
    { value: "+41٪", label: "الطلبات تتجاوز عتبة الشحن", color: "#06b6d4" },
  ],
  exampleScenario: {
    title: "عميل عند الدفع بطلب قيمته 55 ꜁",
    steps: [
      "العميل في صفحة الدفع بطلب بقيمة 55 ꜁ وعتبة الشحن المجاني 200 ꜁.",
      "يكتشف زيادة أن الفجوة 145 ꜁ — ويعرض شريط 'أكمل للشحن المجاني' مع منتجات مقترحة.",
      "يظهر منتجان بسعر 45 و100 ꜁ معاً — مجموعهما 145 ꜁ بالضبط — مع خانة اختيار سهلة.",
      "العميل يضيف المنتجين بنقرتين ويحصل على شحن مجاني كمكافأة.",
    ],
    result: "الطلب ارتفع من 55 إلى 200 ꜁ والعميل شعر أن القرار كان لصالحه — لأنه وفّر تكلفة الشحن.",
  },
  plans: ["النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "حوّل صفحة الدفع إلى فرصة مبيعات ذكية",
  ctaDesc: "فعّل زيادة وشاهد قيمة طلباتك ترتفع مع كل عملية دفع.",
  extraSections: <CheckoutMockup />,
};

export default function CheckoutPage() {
  return <UseCaseLayout data={data} />;
}
