import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function HomePageWidget() {
  return (
    <UseCaseWidgetPreview title="Welcome back 👋" subtitle="A store personalized for you">
      <div style={{ marginBottom: 10 }}>
        <div style={{
          padding: "10px 12px",
          borderRadius: 12,
          background: "rgba(124,58,237,.12)",
          border: "1.5px solid rgba(124,58,237,.3)",
          marginBottom: 10,
        }}>
          <div style={{ fontSize: 9, color: "var(--tm)", marginBottom: 5 }}>Left in your last visit:</div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "rgba(168,85,247,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}>👟</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t)" }}>Ultraboost Running Shoes</div>
              <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#c084fc" }}>SAR 499</span>
                <span style={{ fontSize: 9, color: "var(--td)", textDecoration: "line-through" }}>SAR 649</span>
              </div>
            </div>
            <button style={{
              padding: "5px 10px",
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
            }} className="widget-btn-sm">Add</button>
          </div>
        </div>

        <div style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          padding: "6px 10px",
          borderRadius: 8,
          background: "rgba(239,68,68,.08)",
          border: "1px solid rgba(239,68,68,.2)",
          marginBottom: 10,
        }}>
          <span style={{ fontSize: 12 }}>⏱️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: "#f87171", fontWeight: 700 }}>This offer expires in</div>
            <div style={{ fontSize: 11, fontWeight: 900, color: "var(--t)" }}>02:47:13</div>
          </div>
        </div>

        <div style={{ fontSize: 9, color: "var(--td)", marginBottom: 7 }}>Top sellers in your categories:</div>
        <div style={{ display: "flex", gap: 7 }}>
          {[
            { emoji: "🧢", name: "Sports Cap", price: "89" },
            { emoji: "🎽", name: "Sports T-Shirt", price: "129" },
          ].map((p, i) => (
            <div key={i} style={{
              flex: 1,
              padding: "8px",
              borderRadius: 10,
              background: "var(--s1)",
              border: "1.5px solid var(--b1)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 20, marginBottom: 3 }}>{p.emoji}</div>
              <div style={{ fontSize: 9, color: "var(--t)", fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#c084fc" }}>SAR {p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </UseCaseWidgetPreview>
  );
}
