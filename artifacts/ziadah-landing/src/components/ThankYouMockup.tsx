import { useLanguage } from "@/i18n/LanguageContext";
import UseCaseLiveShowcase from "@/components/UseCaseLiveShowcase";

function ThankYouPhoneScrollContent() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const products = isEn
    ? [
        { name: "Smart Sports Watch", rating: "4.95", reviews: 128, oldPrice: "299", newPrice: "149", discount: "50%", icon: "⌚" },
        { name: "Wireless Bluetooth Earbuds", rating: "4.95", reviews: 94, oldPrice: "199", newPrice: "99", discount: "50%", icon: "🎧" },
        { name: "Multi-purpose Gym Bag", rating: "4.95", reviews: 211, oldPrice: "179", newPrice: "89", discount: "50%", icon: "🎒" },
      ]
    : [
        { name: "ساعة رياضية ذكية", rating: "4.95", reviews: 128, oldPrice: "299", newPrice: "149", discount: "50%", icon: "⌚" },
        { name: "سماعات بلوتوث لاسلكية", rating: "4.95", reviews: 94, oldPrice: "199", newPrice: "99", discount: "50%", icon: "🎧" },
        { name: "حقيبة رياضية متعددة الاستخدام", rating: "4.95", reviews: 211, oldPrice: "179", newPrice: "89", discount: "50%", icon: "🎒" },
      ];

  const t = {
    orderSum: isEn ? "Order Summary" : "ملخص الطلب",
    total: isEn ? "Total:" : "الإجمالي:",
    thankYou: isEn ? "Thank you, Mohammed!" : "شكراً يا محمد!",
    received: isEn ? "Your order has been received" : "تم استلام طلبك",
    orderNo: isEn ? "Order #:" : "رقم الطلب:",
    confirm: isEn ? "Confirmation sent to:" : "تم إرسال التأكيد إلى:",
    dontMiss: isEn ? "Don't miss these amazing products!" : "لا تفوّت هذه المنتجات المميزة!",
    justFor: isEn ? "Just for you — limited time offer" : "خاص لك — عرض لفترة محدودة",
    offLabel: isEn ? "50% Off" : "خصم 50%",
    freeShip: isEn ? "Free Shipping" : "شحن مجاني",
    addToCart: isEn ? "Add to Cart" : "أضف للسلة",
    addAll: isEn ? "Add All & Save More" : "أضف الكل ووفّر أكثر",
    continue: isEn ? "Continue Shopping →" : "→ متابعة التسوق",
  };

  const cardBgs = ["#ede9fe,#ddd6fe", "#fce7f3,#fbcfe8", "#e0f2fe,#bae6fd"];

  return (
    <div
      style={{
        background: "#f5f5f7",
        borderRadius: 18,
        overflow: "hidden",
        minHeight: 400,
        direction: isEn ? "ltr" : "rtl",
        fontFamily: "var(--font)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "14px 14px 12px",
          borderBottom: "1px solid #e8e8ed",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1c1c1e" }}>{t.orderSum}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#1c1c1e" }}>
          <span style={{ color: "#8e8e93", fontSize: 11, fontWeight: 500 }}>{t.total} </span>
          <span style={{ color: "#7c3aed", fontWeight: 900 }}>349 SAR</span>
        </div>
      </div>

      <div style={{ background: "#fff", margin: "8px 8px 0", borderRadius: 14, padding: "14px 12px", boxShadow: "0 2px 12px rgba(0,0,0,.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            ✅
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1c1c1e" }}>{t.thankYou}</div>
            <div style={{ fontSize: 11, color: "#8e8e93", marginTop: 2 }}>{t.received}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 10px", background: "#f9fafb", borderRadius: 10 }}>
          <span style={{ fontSize: 11, color: "#6b7280" }}>{t.orderNo}</span>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#374151", letterSpacing: "0.5px" }}>#ORD-2024-8847</span>
        </div>
        <div style={{ fontSize: 11, color: "#8e8e93", marginTop: 8, lineHeight: 1.5 }}>
          📧 {t.confirm} <span style={{ color: "#374151", fontWeight: 600 }}>mo***@gmail.com</span>
        </div>
      </div>

      <div style={{ margin: "8px 8px 0", background: "#fff", borderRadius: 14, padding: "12px 12px 14px", boxShadow: "0 2px 12px rgba(0,0,0,.07)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#1c1c1e" }}>{t.dontMiss}</div>
            <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>{t.justFor}</div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <div
              style={{
                padding: "3px 7px",
                borderRadius: 20,
                background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
                color: "var(--t)",
                fontSize: 9,
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              {t.offLabel}
            </div>
            <div
              style={{
                padding: "3px 7px",
                borderRadius: 20,
                background: "rgba(16,185,129,.12)",
                color: "#10b981",
                fontSize: 9,
                fontWeight: 800,
                border: "1px solid rgba(16,185,129,.25)",
                whiteSpace: "nowrap",
              }}
            >
              {t.freeShip}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {products.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", background: "#f9fafb", borderRadius: 12, border: "1px solid #f0f0f5" }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: `linear-gradient(135deg,${cardBgs[i]})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                  flexShrink: 0,
                }}
              >
                {p.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#1c1c1e", lineHeight: 1.2, marginBottom: 2 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 9, color: "#f59e0b" }}>★★★★★</span>
                  <span style={{ fontSize: 9, color: "#8e8e93" }}>
                    {p.rating} ({p.reviews})
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: "#7c3aed" }}>{p.newPrice} SAR</span>
                  <span style={{ fontSize: 9, color: "#c4b5fd", textDecoration: "line-through" }}>{p.oldPrice}</span>
                  <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 8, background: "rgba(124,58,237,.1)", color: "#7c3aed", fontWeight: 700 }}>-{p.discount}</span>
                </div>
              </div>
              <button
                type="button"
                style={{
                  padding: "5px 10px",
                  borderRadius: 20,
                  background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
                  color: "var(--t)",
                  border: "none",
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  fontFamily: "var(--font)",
                }}
              >
                {t.addToCart}
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          style={{
            width: "100%",
            marginTop: 12,
            padding: "11px 0",
            borderRadius: 24,
            background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
            color: "var(--t)",
            border: "none",
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontFamily: "var(--font)",
            boxShadow: "0 4px 16px rgba(124,58,237,.4)",
          }}
        >
          <span>🛒</span> {t.addAll}
        </button>
      </div>

      <div style={{ padding: "10px 8px 14px" }}>
        <button
          type="button"
          style={{
            width: "100%",
            padding: "11px 0",
            borderRadius: 24,
            background: "#1c1c1e",
            color: "var(--t)",
            border: "none",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--font)",
          }}
        >
          {t.continue}
        </button>
      </div>
    </div>
  );
}

export default function ThankYouMockup() {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const isAr = !isEn;

  const t = {
    badge: isEn ? "Interactive Preview" : "معاينة تفاعلية",
    heading: isEn ? "This is how the Thank You page looks with Ziadah" : "هكذا تبدو صفحة الشكر مع زيادة",
    sub: isEn
      ? "A live preview of the customer experience after purchase — smart recommendations turn the Thank You page into a sales opportunity"
      : "معاينة حية لتجربة العميل بعد الشراء — توصيات ذكية تحوّل صفحة الشكر إلى فرصة مبيعات إضافية",
  };

  return (
    <UseCaseLiveShowcase
      isAr={isAr}
      badge={t.badge}
      title={t.heading}
      subtitle={t.sub}
      tabs={[{ labelAr: "📱 معاينة", labelEn: "📱 Preview", content: <ThankYouPhoneScrollContent /> }]}
    />
  );
}
