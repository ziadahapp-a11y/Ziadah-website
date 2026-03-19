import { useState, useEffect, useRef, useCallback } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function AddToCartWidget() {
  const [step, setStep] = useState<"adding" | "added" | "recommend">("adding");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const runSequence = useCallback(() => {
    clearAllTimers();
    setStep("adding");
    timers.current.push(setTimeout(() => setStep("added"), 900));
    timers.current.push(setTimeout(() => setStep("recommend"), 1800));
  }, []);

  useEffect(() => {
    runSequence();
    return clearAllTimers;
  }, [runSequence]);

  return (
    <UseCaseWidgetPreview title="Add to Cart" subtitle="Smart recommendation at add moment">
      <div style={{ minHeight: 220 }}>
        {step === "adding" && (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🛍️</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
              SPF 50 Moisturizing Cream
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginBottom: 16 }}>
              Qty: 1 × 89 SAR
            </div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 20px",
              borderRadius: 50,
              background: "rgba(124,58,237,.15)",
              border: "1px solid rgba(124,58,237,.3)",
              fontSize: 11,
              color: "var(--p4, #a855f7)",
            }}>
              <span style={{ display: "inline-block" }}>⏳</span>
              Adding to cart...
            </div>
          </div>
        )}

        {step === "added" && (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(16,185,129,.15)",
              border: "1px solid rgba(16,185,129,.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px", fontSize: 22,
            }}>✓</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#10b981", marginBottom: 4 }}>
              Added to cart!
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>
              SPF 50 Moisturizing Cream
            </div>
          </div>
        )}

        {step === "recommend" && (
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6, marginBottom: 12,
              padding: "6px 10px", borderRadius: 8,
              background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)",
            }}>
              <span style={{ fontSize: 14 }}>✅</span>
              <span style={{ fontSize: 10, color: "#10b981", fontWeight: 700 }}>Added to cart</span>
            </div>
            <div style={{
              padding: "12px",
              borderRadius: 12,
              background: "rgba(168,85,247,.08)",
              border: "1.5px solid rgba(168,85,247,.25)",
              backdropFilter: "blur(12px)",
            }}>
              <div style={{ fontSize: 10, color: "#a855f7", fontWeight: 700, marginBottom: 8, letterSpacing: 0.5 }}>
                ✨ Customers who bought this also bought
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: "rgba(255,255,255,.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0,
                }}>🧴</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 2 }}>
                    Brightening Vitamin C Serum
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)" }}>Perfectly complements the cream</div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "#c084fc", marginTop: 3 }}>65 SAR</div>
                </div>
              </div>
              <button style={{
                width: "100%", padding: "8px",
                borderRadius: 9,
                background: "rgba(124,58,237,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#c084fc", fontSize: 14, fontWeight: 800,
                border: "1px solid rgba(124,58,237,0.2)", cursor: "pointer",
              }}>
                + Add Serum to Cart
              </button>
            </div>
            <button
              onClick={runSequence}
              style={{
                width: "100%", marginTop: 10, padding: "7px",
                borderRadius: 9, background: "transparent",
                border: "1px solid rgba(255,255,255,.12)",
                color: "rgba(255,255,255,.4)", fontSize: 10,
                cursor: "pointer",
              }}
            >
              ↩ Replay simulation
            </button>
          </div>
        )}
      </div>
    </UseCaseWidgetPreview>
  );
}
