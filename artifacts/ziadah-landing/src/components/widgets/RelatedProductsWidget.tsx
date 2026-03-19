import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function RelatedProductsWidget() {
  const products = [
    {
      emoji: "🎧",
      name: "رأس شاحن وكيبل آيفون",
      reviews: "4.95 ⭐ · 4681 مراجعة",
      price: "240",
    },
    {
      emoji: "🔌",
      name: "سماعة رأس من آبل",
      reviews: "4.95 ⭐ · 4681 مراجعة",
      price: "240",
    },
  ];

  return (
    <UseCaseWidgetPreview title="اقتراح منتجات ذات علاقة" subtitle="منتجات يفضلها العملاء">
      <div style={{ marginBottom: 10 }}>
        <div
          style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 8 }}
          className="mt-[5px] text-[10px]">منتجات يفضلها العملاء</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {products.map((p, i) => (
            <div key={i} style={{
              display: "flex",
              gap: 10,
              padding: "10px",
              borderRadius: 12,
              background: "rgba(255,255,255,.06)",
              border: "1.5px solid rgba(255,255,255,.1)",
              alignItems: "center",
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(124,58,237,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}>{p.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 9, color: "#f59e0b", marginTop: 1 }}>{p.reviews}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#c084fc", marginTop: 2 }}>﷼{p.price}</div>
              </div>
              <button style={{
                padding: "6px 12px",
                borderRadius: 20,
                background: "rgba(124,58,237,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#c084fc",
                fontSize: 14,
                fontWeight: 800,
                border: "1px solid rgba(124,58,237,0.2)",
                cursor: "pointer",
                flexShrink: 0,
              }} className="widget-btn-sm">
                أضف للسلة
              </button>
            </div>
          ))}
        </div>
      </div>
    </UseCaseWidgetPreview>
  );
}
