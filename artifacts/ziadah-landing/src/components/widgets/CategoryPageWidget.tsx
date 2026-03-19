import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function CategoryPageWidget() {
  const products = [
    { emoji: "🎧", name: "سماعة لاسلكية ANC", price: "٣٨٩", origPrice: "٤٩٩", badge: "⭐ الأكثر مبيعاً", hot: true },
    { emoji: "🔊", name: "مكبر صوت محمول", price: "١٨٩", origPrice: null, badge: "جديد", hot: false },
    { emoji: "🎵", name: "مشغّل موسيقى MP3", price: "١٢٩", origPrice: "١٦٩", badge: null, hot: false },
  ];

  return (
    <UseCaseWidgetPreview title="أجهزة الصوت" subtitle="مرتّبة خصيصاً لك">
      <div style={{ marginBottom: 8 }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 10,
          padding: "6px 10px",
          borderRadius: 8,
          background: "rgba(124,58,237,.1)",
          border: "1px solid rgba(124,58,237,.2)",
        }}>
          <span style={{ fontSize: 14 }}>🎯</span>
          <span style={{ fontSize: 14, color: "#c084fc", fontWeight: 700 }}>مرتّبة حسب اهتماماتك السابقة</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {products.map((p, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "9px 10px",
              borderRadius: 12,
              background: p.hot ? "rgba(124,58,237,.15)" : "rgba(255,255,255,.06)",
              border: p.hot ? "1.5px solid rgba(168,85,247,.4)" : "1.5px solid rgba(255,255,255,.1)",
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: p.hot ? "rgba(168,85,247,.2)" : "rgba(255,255,255,.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}>{p.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{p.name}</div>
                {p.badge && (
                  <div style={{
                    fontSize: 14,
                    padding: "1px 6px",
                    borderRadius: 20,
                    background: p.hot ? "rgba(168,85,247,.25)" : "rgba(6,182,212,.2)",
                    color: p.hot ? "#c084fc" : "#06b6d4",
                    fontWeight: 700,
                    display: "inline-block",
                    marginTop: 2,
                  }}>{p.badge}</div>
                )}
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: p.hot ? "#c084fc" : "#fff" }}>﷼{p.price}</span>
                  {p.origPrice && <span style={{ fontSize: 14, color: "rgba(255,255,255,.3)", textDecoration: "line-through" }}>﷼{p.origPrice}</span>}
                </div>
              </div>
              <button style={{
                padding: "5px 10px",
                borderRadius: 20,
                background: p.hot ? "#7c3aed" : "rgba(255,255,255,.1)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
              }} className="widget-btn-sm">سلة</button>
            </div>
          ))}
        </div>
      </div>
    </UseCaseWidgetPreview>
  );
}
