import { useLanguage } from "@/i18n/LanguageContext";

export default function CartDemoMockup() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const purple = "#16a34a";
  const lightPurple = "rgba(22, 163, 74,0.1)";
  const borderPurple = "rgba(22, 163, 74,0.25)";

  const products = isEn
    ? [
        { name: "Classic Men's Shemagh", rating: "4.95", reviews: "6984", price: "241", originalPrice: "345", discount: "20%", emoji: "🧣", bg: "#fef2f2" },
        { name: "Blue Bakelite Prayer Beads", rating: "4.95", reviews: "6984", price: "200", originalPrice: "254", discount: null, emoji: "🔵", bg: "#eff6ff" },
        { name: "Yellow Bakelite Prayer Beads", rating: "4.95", reviews: "6984", price: "200", originalPrice: "254", discount: null, emoji: "🟡", bg: "#fefce8" },
      ]
    : [
        { name: "شماغ كلاسيكي رجالي", rating: "4.95", reviews: "6984", price: "241", originalPrice: "345", discount: "20%", emoji: "🧣", bg: "#fef2f2" },
        { name: "سبحة بكلايت بلون أزرق", rating: "4.95", reviews: "6984", price: "200", originalPrice: "254", discount: null, emoji: "🔵", bg: "#eff6ff" },
        { name: "سبحة بكلايت بلون أصفر", rating: "4.95", reviews: "6984", price: "200", originalPrice: "254", discount: null, emoji: "🟡", bg: "#fefce8" },
      ];

  const t = {
    tag:        isEn ? "Interactive Preview" : "معاينة تفاعلية",
    heading:    isEn ? "How does it look in your store?" : "كيف يبدو في متجرك؟",
    sub:        isEn ? "This is how Ziadah's smart recommendations appear directly inside your customers' shopping cart page" : "هكذا تظهر توصيات زيادة الذكية داخل صفحة سلة التسوق لعملائك مباشرةً",
    cartTitle:  isEn ? "Cart" : "السلة",
    cartItem:   isEn ? "Red Bakelite Prayer Beads" : "سبحة بكلايت بلون أحمر",
    youMayLike: isEn ? "Products you may like" : "منتجات قد تعجبك",
    addNow:     isEn ? "Add them now with a special discount" : "أضفها الآن بخصم خاص",
    freeShip:   isEn ? "Free shipping" : "شحن مجاني",
    freeCod:    isEn ? "Free COD" : "دفع عند الاستلام مجاني",
    save30:     isEn ? "Save 30 SAR" : "وفّر 30 ر.س",
    reviews:    isEn ? "reviews" : "تقييم",
    save:       isEn ? "Save" : "وفّر",
    addToCart:  isEn ? "Add to Cart" : "أضف للسلة",
    total:      isEn ? "Total" : "الإجمالي",
    checkout:   isEn ? "Checkout" : "إتمام الطلب",
  };

  return (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 80px" }}>
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", paddingTop: 40, paddingBottom: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: lightPurple, border: `1px solid ${borderPurple}`, color: purple, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: purple, boxShadow: `0 0 7px ${purple}` }} />
            {t.tag}
          </div>
          <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, marginBottom: 12, color: "var(--t)" }}>
            {t.heading}
          </h2>
          <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
            {t.sub}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="phone-mockup-wrap" style={{ width: 340, maxWidth: "100%", background: "#fff", borderRadius: 36, boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 0 0 10px var(--s2), 0 0 0 12px var(--s3)", overflow: "hidden", position: "relative", fontFamily: "var(--font)" }}>
            <div style={{ height: 28, background: "var(--s2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 80, height: 8, borderRadius: 10, background: "var(--s2)" }} />
            </div>

            <div style={{ background: "#f8f8fc", minHeight: 580, direction: isEn ? "ltr" : "rtl" }}>
              <div style={{ background: "#fff", padding: "16px 16px 10px", borderBottom: "1px solid #f0f0f5" }}>
                <div style={{ textAlign: "start" }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: purple, letterSpacing: -1 }}>
                    {t.cartTitle}
                  </span>
                </div>
              </div>

              <div style={{ background: "#fff", margin: "10px 10px 0", borderRadius: 14, padding: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 68, height: 68, borderRadius: 10, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>
                    📿
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#111", marginBottom: 4, lineHeight: 1.4 }}>
                      {t.cartItem}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#111" }}>
                      200 <span style={{ fontSize: 11, fontWeight: 700 }}>SAR</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <button style={{ background: "none", border: "none", cursor: "default", color: "#999", fontSize: 16, padding: "2px 6px" }}>🗑</button>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f4f4f8", borderRadius: 8, padding: "4px 10px" }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#555", cursor: "default" }}>−</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#111", minWidth: 16, textAlign: "center" }}>1</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#555", cursor: "default" }}>+</span>
                  </div>
                </div>
              </div>

              <div style={{ background: "#fff", margin: "10px 10px 0", borderRadius: 14, padding: "12px 14px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "#111" }}>{t.youMayLike}</span>
                </div>
                <div style={{ fontSize: 11, color: purple, fontWeight: 700, marginBottom: 10 }}>{t.addNow}</div>

                <div style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 8, padding: "6px 10px", display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#22c55e" }}>✓</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#22c55e" }}>{t.freeShip}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#22c55e", marginInlineStart: 6 }}>✓</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#22c55e" }}>{t.freeCod}</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontSize: 10, fontWeight: 900, color: "#22c55e" }}>{t.save30}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {products.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: i < products.length - 1 ? 10 : 0, borderBottom: i < products.length - 1 ? "1px solid #f0f0f5" : "none" }}>
                      <div style={{ width: 52, height: 52, borderRadius: 8, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                        {p.emoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#111", marginBottom: 2, lineHeight: 1.3 }}>{p.name}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 2 }}>
                          <span style={{ fontSize: 9, color: "#f59e0b" }}>★</span>
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#444" }}>{p.rating}</span>
                          <span style={{ fontSize: 9, color: "#888" }}>{p.reviews} {t.reviews}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 11, fontWeight: 900, color: "#111" }}>{p.price} <span style={{ fontSize: 9 }}>SAR</span></span>
                          {p.originalPrice && (
                            <span style={{ fontSize: 9, color: "#aaa", textDecoration: "line-through" }}>{p.originalPrice} SAR</span>
                          )}
                          {p.discount && (
                            <span style={{ fontSize: 8, fontWeight: 700, color: "#16a34a", background: "rgba(22, 163, 74,0.1)", borderRadius: 4, padding: "1px 4px" }}>
                              {t.save} {p.discount}
                            </span>
                          )}
                        </div>
                      </div>
                      <button style={{ background: purple, color: "var(--t)", border: "none", borderRadius: 8, padding: "6px 8px", fontSize: 9, fontWeight: 800, cursor: "default", whiteSpace: "nowrap" as const, flexShrink: 0, fontFamily: "inherit" }}>
                        {t.addToCart}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#fff", margin: "10px 10px 0", borderRadius: 14, padding: "10px 14px 4px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: purple }}>{t.total}</span>
                  <span style={{ fontSize: 15, fontWeight: 900, color: "#111" }}>1,165.00 <span style={{ fontSize: 12 }}>SAR</span></span>
                </div>
                <button style={{ width: "100%", background: "var(--s2)", color: "var(--t)", border: "none", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 800, cursor: "default", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 10, fontFamily: "inherit" }}>
                  🛍 {t.checkout}
                </button>
              </div>

              <div style={{ height: 16 }} />
            </div>

            <div style={{ height: 20, background: "var(--s2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 48, height: 5, borderRadius: 10, background: "var(--s2)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
