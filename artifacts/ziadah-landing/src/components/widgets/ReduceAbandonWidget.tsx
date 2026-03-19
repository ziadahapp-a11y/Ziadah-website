import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function ReduceAbandonWidget() {
  return (
    <UseCaseWidgetPreview title="Special Offer Just for You" subtitle="Don't miss this deal!">
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "var(--tm)", marginBottom: 10 }}>We noticed your cart is still here 🛒</div>

        <div style={{
          padding: "14px 16px",
          borderRadius: 14,
          background: "rgba(236,72,153,.1)",
          border: "1.5px dashed rgba(236,72,153,.5)",
          marginBottom: 12,
        }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#f9a8d4", lineHeight: 1 }}>10% Off</div>
          <div style={{ fontSize: 9, color: "var(--tm)", marginTop: 3 }}>On your current order — now only</div>
          <div style={{ fontSize: 13, fontWeight: 900, color: "var(--t)", letterSpacing: 1, marginTop: 6 }}>SAVE10</div>
        </div>

        <div style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          fontSize: 11,
          color: "#f87171",
          fontWeight: 700,
          padding: "6px 12px",
          borderRadius: 8,
          background: "rgba(239,68,68,.08)",
          border: "1px solid rgba(239,68,68,.2)",
        }}>
          <span>⏱️</span>
          <span>Expires in: 12:47</span>
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
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#34d399" }}>20 SAR away from free shipping</div>
            <div style={{ height: 4, borderRadius: 10, background: "var(--s2)", marginTop: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "80%", borderRadius: 10, background: "#34d399" }} />
            </div>
          </div>
        </div>
      </div>

      <button style={{
        width: "100%",
        padding: "10px",
        borderRadius: 12,
        background: "rgba(236,72,153,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "#f472b6",
        fontSize: 14,
        fontWeight: 800,
        border: "1px solid rgba(236,72,153,0.2)",
        cursor: "pointer",
        marginBottom: 6,
      }} className="widget-btn">
        Complete Purchase with 10% Off
      </button>

      <div style={{ textAlign: "center", fontSize: 9, color: "var(--td)" }}>
        Code will be applied automatically at checkout
      </div>
    </UseCaseWidgetPreview>
  );
}
