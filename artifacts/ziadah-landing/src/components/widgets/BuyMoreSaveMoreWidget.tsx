import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function BuyMoreSaveMoreWidget() {
  const options = [
    { qty: "اشترِ 1", label: "بدون خصم", price: "٤٩ ر", badge: null, selected: false },
    { qty: "اشترِ 2", label: "خصم ٢٠٪", price: "٧٩ ر", badge: "-٢٠٪", selected: true },
    { qty: "اشترِ 3", label: "خصم ٣٠٪ + شحن مجاني", price: "١٠٣ ر", badge: "-٣٠٪", selected: false },
  ];

  return (
    <UseCaseWidgetPreview title="عروض الكميات" subtitle="اشترِ أكثر وفّر أكثر">
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8 }}>اشتر أكثر ووفّر أكثر</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {options.map((opt, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 12,
              background: opt.selected ? "rgba(124,58,237,.07)" : "#f9fafb",
              border: opt.selected ? "1.5px solid #7c3aed" : "1.5px solid #e5e7eb",
              cursor: "pointer",
            }}>
              <div style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: opt.selected ? "none" : "1.5px solid #d1d5db",
                background: opt.selected ? "#7c3aed" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                {opt.selected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{opt.qty}</div>
                <div style={{ fontSize: 10, color: "#6b7280" }}>{opt.label}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {opt.badge && (
                  <div style={{
                    fontSize: 9,
                    fontWeight: 800,
                    padding: "2px 7px",
                    borderRadius: 20,
                    background: "#7c3aed",
                    color: "#fff",
                  }}>{opt.badge}</div>
                )}
                <div style={{ fontSize: 13, fontWeight: 800, color: "#111827" }}>{opt.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        fontSize: 10,
        color: "#10b981",
        background: "rgba(16,185,129,.07)",
        border: "1px solid rgba(16,185,129,.2)",
        borderRadius: 8,
        padding: "6px 10px",
        textAlign: "center",
        fontWeight: 700,
      }}>
        🚚 أفضل خيار للعملاء — شحن مجاني
      </div>
    </UseCaseWidgetPreview>
  );
}
