import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function AddonsWidget() {
  const addons = [
    { emoji: "📱", name: "غلاف حماية للهاتف", price: "+٣٩ ⃁", checked: true },
    { emoji: "🔋", name: "شاحن لاسلكي سريع", price: "+٦٥ ⃁", checked: false },
    { emoji: "🎧", name: "سماعة لاسلكية", price: "+٨٩ ⃁", checked: true },
    { emoji: "🛡️", name: "واقي شاشة زجاجي", price: "+١٥ ⃁", checked: false },
  ];

  return (
    <UseCaseWidgetPreview title="إضافات مكملة للمنتج" subtitle="لاتنسَ تضيف المجموعة كاملة">
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 8 }}>إضافات تكميلية للمنتج</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {addons.map((a, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 10px",
              borderRadius: 10,
              background: a.checked ? "rgba(124,58,237,.05)" : "#f9fafb",
              border: a.checked ? "1.5px solid rgba(124,58,237,.25)" : "1.5px solid #e5e7eb",
            }}>
              <div style={{
                width: 17,
                height: 17,
                borderRadius: 5,
                background: a.checked ? "#7c3aed" : "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                {a.checked && <span style={{ color: "#fff", fontSize: 9, fontWeight: 900 }}>✓</span>}
              </div>
              <span style={{ fontSize: 14 }}>{a.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#111827" }}>{a.name}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: a.checked ? "#7c3aed" : "#9ca3af" }}>{a.price}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        padding: "8px 12px",
        borderRadius: 10,
        background: "rgba(124,58,237,.06)",
        border: "1px solid rgba(124,58,237,.15)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}>
        <span style={{ fontSize: 10, color: "#6b7280" }}>الإجمالي مع الإضافات</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed" }}>+١٢٨ ⃁</span>
      </div>
      <button style={{
        width: "100%",
        padding: "9px",
        borderRadius: 10,
        background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
        color: "#fff",
        fontSize: 11,
        fontWeight: 800,
        border: "none",
        cursor: "pointer",
      }}>
        أضف الإضافات المختارة للسلة
      </button>
    </UseCaseWidgetPreview>
  );
}
