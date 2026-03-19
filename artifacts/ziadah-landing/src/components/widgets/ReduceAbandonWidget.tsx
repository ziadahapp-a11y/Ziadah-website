import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function ReduceAbandonWidget() {
  return (
    <UseCaseWidgetPreview title="عرض خاص لك الآن" subtitle="لا تفوّت هذا العرض!">
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,.5)", marginBottom: 10 }}>لاحظنا أن سلتك لا تزال هنا 🛒</div>

        <div style={{
          padding: "14px 16px",
          borderRadius: 14,
          background: "rgba(236,72,153,.1)",
          border: "1.5px dashed rgba(236,72,153,.5)",
          marginBottom: 12,
        }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#f9a8d4", lineHeight: 1 }}>خصم ١٠٪</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.5)", marginTop: 3 }}>على طلبك الحالي — الآن فقط</div>
          <div style={{ fontSize: 14, fontWeight: 900, color: "#fff", letterSpacing: 1, marginTop: 6 }}>SAVE10</div>
        </div>

        <div style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          fontSize: 14,
          color: "#f87171",
          fontWeight: 700,
          padding: "6px 12px",
          borderRadius: 8,
          background: "rgba(239,68,68,.08)",
          border: "1px solid rgba(239,68,68,.2)",
        }}>
          <span>⏱️</span>
          <span>ينتهي خلال: ١٢:٤٧</span>
        </div>

        <div style={{
          padding: "8px 12px",
          borderRadius: 10,
          background: "rgba(16,185,129,.08)",
          border: "1px solid rgba(16,185,129,.2)",
          marginBottom: 12,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}>
          <span style={{ fontSize: 14 }}>🚚</span>
          <div style={{ textAlign: "right", flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#34d399" }}>باقي ٢٠ ⃁ للشحن المجاني</div>
            <div style={{ height: 4, borderRadius: 10, background: "rgba(255,255,255,.1)", marginTop: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "80%", borderRadius: 10, background: "#34d399" }} />
            </div>
          </div>
        </div>
      </div>

      <button style={{
        width: "100%",
        padding: "10px",
        borderRadius: 12,
        background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
        color: "#fff",
        fontSize: 14,
        fontWeight: 800,
        border: "none",
        cursor: "pointer",
        marginBottom: 6,
      }} className="widget-btn">
        أكمل الشراء بخصم ١٠٪
      </button>

      <div style={{ textAlign: "center", fontSize: 14, color: "rgba(255,255,255,.3)" }}>
        سيُطبّق الكود تلقائياً عند الدفع
      </div>
    </UseCaseWidgetPreview>
  );
}
