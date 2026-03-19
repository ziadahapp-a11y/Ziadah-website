import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function ProductSwapWidget() {
  return (
    <UseCaseWidgetPreview title="Product Upgrade" subtitle="This product is better for you">
      <div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 10 }}>This product is better for you</div>
        <div style={{
          padding: "12px",
          borderRadius: 14,
          background: "rgba(124,58,237,.1)",
          border: "1.5px solid rgba(124,58,237,.3)",
          marginBottom: 12,
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "2px 10px",
            borderRadius: 20,
            background: "rgba(16,185,129,.12)",
            border: "1px solid rgba(16,185,129,.3)",
            fontSize: 9,
            fontWeight: 700,
            color: "#34d399",
            marginBottom: 10,
          }}>
            ⭐ Special Offer
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "rgba(124,58,237,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              flexShrink: 0,
            }}>🎧</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>iPhone Charger Head & Cable</div>
              <div style={{ fontSize: 9, color: "#f59e0b", marginTop: 2 }}>4.95 ⭐ · 4,681 reviews</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", textDecoration: "line-through" }}>SAR 280</span>
                <span style={{ fontSize: 14, fontWeight: 900, color: "#fff" }}>SAR 240</span>
                <span style={{
                  fontSize: 9,
                  padding: "2px 7px",
                  borderRadius: 20,
                  background: "rgba(16,185,129,.15)",
                  color: "#34d399",
                  fontWeight: 700,
                }}>Save 40 SAR</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          marginBottom: 12,
          padding: "7px 10px",
          borderRadius: 10,
          background: "rgba(16,185,129,.08)",
          border: "1px solid rgba(16,185,129,.2)",
        }}>
          <span style={{ color: "#34d399", fontSize: 10 }}>✓</span>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,.7)" }}>Includes 1-year warranty + free shipping</span>
        </div>
        <button style={{
          width: "100%",
          padding: "10px",
          borderRadius: 12,
          background: "rgba(124,58,237,0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: "#c084fc",
          fontSize: 14,
          fontWeight: 800,
          border: "1px solid rgba(124,58,237,0.2)",
          cursor: "pointer",
        }} className="widget-btn">
          Upgrade to this product
        </button>
      </div>
    </UseCaseWidgetPreview>
  );
}
