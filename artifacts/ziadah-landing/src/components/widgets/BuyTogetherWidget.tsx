import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function BuyTogetherWidget() {
  const products = [
    {
      emoji: "👕",
      name: "ستر قميص رجالية بنمط حطابي",
      reviews: "4.95 ⭐ · 4681 مراجعة",
      price: "٢٤٠",
      checked: true,
      tag: "هذا المنتج",
    },
    {
      emoji: "👟",
      name: "حذاء لويفي أون رانتيو كلاود",
      reviews: "4.95 ⭐ · 4984 مراجعة",
      price: "٢٤٥١",
      originalPrice: "٣١٥٤",
      checked: true,
      tag: null,
    },
  ];

  return (
    <UseCaseWidgetPreview title="منتجات يتم شراؤها معاً" subtitle="اشتروا معاً">
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 10 }}>منتجات يفضلها العملاء معاً</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {products.map((p, i) => (
            <div key={i} style={{
              display: "flex",
              gap: 10,
              padding: "10px",
              borderRadius: 12,
              background: "rgba(255,255,255,.06)",
              border: "1.5px solid rgba(255,255,255,.12)",
              alignItems: "center",
            }}>
              <div style={{
                width: 18,
                height: 18,
                borderRadius: 5,
                background: p.checked ? "#7c3aed" : "rgba(255,255,255,.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                {p.checked && <span style={{ color: "#fff", fontSize: 10, fontWeight: 900 }}>✓</span>}
              </div>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(124,58,237,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}>{p.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 9, color: "#f59e0b", marginTop: 1 }}>{p.reviews}</div>
                <div style={{ display: "flex", gap: 5, alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>﷼{p.price}</span>
                  {p.originalPrice && <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", textDecoration: "line-through" }}>﷼{p.originalPrice}</span>}
                </div>
              </div>
              {p.tag && <div style={{ fontSize: 8, padding: "2px 7px", borderRadius: 20, background: "rgba(124,58,237,.2)", color: "#c084fc", fontWeight: 700, flexShrink: 0 }}>{p.tag}</div>}
            </div>
          ))}
        </div>
      </div>
      <button style={{
        width: "100%",
        padding: "10px",
        borderRadius: 12,
        background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
        color: "#fff",
        fontSize: 12,
        fontWeight: 800,
        border: "none",
        cursor: "pointer",
      }}>
        اشتر المجموعة الكاملة — ⃁٢٦٩١
      </button>
    </UseCaseWidgetPreview>
  );
}
