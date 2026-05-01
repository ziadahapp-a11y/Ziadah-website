import { useLanguage } from "@/i18n/LanguageContext";

export default function ThankYouMockup() {
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
    tag:        isEn ? "Interactive Preview" : "معاينة تفاعلية",
    heading:    isEn ? "This is how the Thank You page looks with Ziadah" : "هكذا تبدو صفحة الشكر مع زيادة",
    sub:        isEn ? "A live preview of the customer experience after purchase — smart recommendations turn the Thank You page into a sales opportunity" : "معاينة حية لتجربة العميل بعد الشراء — توصيات ذكية تحوّل صفحة الشكر إلى فرصة مبيعات إضافية",
    orderSum:   isEn ? "Order Summary" : "ملخص الطلب",
    total:      isEn ? "Total:" : "الإجمالي:",
    thankYou:   isEn ? "Thank you, Mohammed!" : "شكراً يا محمد!",
    received:   isEn ? "Your order has been received" : "تم استلام طلبك",
    orderNo:    isEn ? "Order #:" : "رقم الطلب:",
    confirm:    isEn ? "Confirmation sent to:" : "تم إرسال التأكيد إلى:",
    dontMiss:   isEn ? "Don't miss these amazing products!" : "لا تفوّت هذه المنتجات المميزة!",
    justFor:    isEn ? "Just for you — limited time offer" : "خاص لك — عرض لفترة محدودة",
    offLabel:   isEn ? "50% Off" : "خصم 50%",
    freeShip:   isEn ? "Free Shipping" : "شحن مجاني",
    addToCart:  isEn ? "Add to Cart" : "أضف للسلة",
    addAll:     isEn ? "Add All & Save More" : "أضف الكل ووفّر أكثر",
    continue:   isEn ? "Continue Shopping →" : "→ متابعة التسوق",
  };

  const cardBgs = ["#ede9fe,#ddd6fe", "#fce7f3,#fbcfe8", "#e0f2fe,#bae6fd"];

  return (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 80px" }}>
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", paddingTop: 40, paddingBottom: 40 }}>
        <div className="rv" style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="stag" style={{ display: "inline-flex" }}>
            <span className="stag-dot" />
            {t.tag}
          </div>
          <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, marginTop: 12, marginBottom: 12 }}>
            {t.heading}
          </h2>
          <p style={{ fontSize: 15, color: "var(--tm)", lineHeight: 1.8, maxWidth: 540, margin: "0 auto" }}>
            {t.sub}
          </p>
        </div>

        <div className="rv d1" style={{ display: "flex", justifyContent: "center" }}>
          <div className="phone-mockup-wrap" style={{
            width: 340,
            maxWidth: "100%",
            background: "var(--bg)",
            borderRadius: 44,
            padding: "14px 12px",
            boxShadow: "0 40px 100px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.08), inset 0 1px 0 rgba(255,255,255,.12)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
              width: 100, height: 28, background: "var(--s1)", borderRadius: 20,
              zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#222" }} />
            </div>

            <div style={{
              background: "#f5f5f7", borderRadius: 34, overflow: "hidden",
              minHeight: 580, direction: "ltr", fontFamily: "var(--font)",
            }}>
              <div style={{
                background: "#fff", padding: "48px 16px 12px",
                borderBottom: "1px solid #e8e8ed",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1c1c1e" }}>{t.orderSum}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1c1c1e" }}>
                  <span style={{ color: "#8e8e93", fontSize: 11, fontWeight: 500 }}>{t.total} </span>
                  <span style={{ color: "#7c3aed", fontWeight: 900 }}>349 SAR</span>
                </div>
              </div>

              <div style={{ background: "#fff", margin: "10px 10px 0", borderRadius: 16, padding: "16px 14px", boxShadow: "0 2px 12px rgba(0,0,0,.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, flexShrink: 0,
                  }}>✅</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#1c1c1e" }}>{t.thankYou}</div>
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

              <div style={{ margin: "10px 10px 0", background: "#fff", borderRadius: 16, padding: "14px 14px 16px", boxShadow: "0 2px 12px rgba(0,0,0,.07)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#1c1c1e" }}>{t.dontMiss}</div>
                    <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>{t.justFor}</div>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <div style={{ padding: "3px 7px", borderRadius: 20, background: "linear-gradient(135deg,#7c3aed,#5b21b6)", color: "var(--t)", fontSize: 9, fontWeight: 800, whiteSpace: "nowrap" as const }}>
                      {t.offLabel}
                    </div>
                    <div style={{ padding: "3px 7px", borderRadius: 20, background: "rgba(16,185,129,.12)", color: "#10b981", fontSize: 9, fontWeight: 800, border: "1px solid rgba(16,185,129,.25)", whiteSpace: "nowrap" as const }}>
                      {t.freeShip}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                  {products.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", background: "#f9fafb", borderRadius: 12, border: "1px solid #f0f0f5" }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: `linear-gradient(135deg,${cardBgs[i]})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18, flexShrink: 0,
                      }}>{p.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#1c1c1e", lineHeight: 1.2, marginBottom: 2 }}>{p.name}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 9, color: "#f59e0b" }}>★★★★★</span>
                          <span style={{ fontSize: 9, color: "#8e8e93" }}>{p.rating} ({p.reviews})</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                          <span style={{ fontSize: 11, fontWeight: 900, color: "#7c3aed" }}>{p.newPrice} SAR</span>
                          <span style={{ fontSize: 9, color: "#c4b5fd", textDecoration: "line-through" }}>{p.oldPrice}</span>
                          <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 8, background: "rgba(124,58,237,.1)", color: "#7c3aed", fontWeight: 700 }}>-{p.discount}</span>
                        </div>
                      </div>
                      <button style={{ padding: "5px 10px", borderRadius: 20, background: "linear-gradient(135deg,#7c3aed,#5b21b6)", color: "var(--t)", border: "none", fontSize: 10, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" as const, flexShrink: 0, fontFamily: "var(--font)" }}>
                        {t.addToCart}
                      </button>
                    </div>
                  ))}
                </div>

                <button style={{ width: "100%", marginTop: 12, padding: "11px 0", borderRadius: 24, background: "linear-gradient(135deg,#7c3aed,#5b21b6)", color: "var(--t)", border: "none", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "var(--font)", boxShadow: "0 4px 16px rgba(124,58,237,.4)" }}>
                  <span>🛒</span> {t.addAll}
                </button>
              </div>

              <div style={{ padding: "12px 10px 20px" }}>
                <button style={{ width: "100%", padding: "11px 0", borderRadius: 24, background: "#1c1c1e", color: "var(--t)", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font)" }}>
                  {t.continue}
                </button>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: 110, height: 4, background: "var(--s3)", borderRadius: 4 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
