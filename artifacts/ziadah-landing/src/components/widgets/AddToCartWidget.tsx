import { useState, useEffect, useRef, useCallback } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

export default function AddToCartWidget() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].widgets.addToCart;

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
    <UseCaseWidgetPreview title={tr.title} subtitle={tr.subtitle}>
      <div style={{ minHeight: 220 }}>
        {step === "adding" && (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🛍️</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--t)", marginBottom: 6 }}>
              {tr.productName}
            </div>
            <div style={{ fontSize: 12, color: "var(--tm)", marginBottom: 16 }}>
              {tr.qty}
            </div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 20px",
              borderRadius: 50,
              background: "rgba(124, 58, 237,.15)",
              border: "1px solid rgba(124, 58, 237,.3)",
              fontSize: 12,
              color: "var(--p4, #8b5cf6)",
            }}>
              <span style={{ display: "inline-block" }}>⏳</span>
              {tr.adding}
            </div>
          </div>
        )}

        {step === "added" && (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(139, 92, 246,.15)",
              border: "1px solid rgba(139, 92, 246,.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px", fontSize: 22,
            }}>✓</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#8b5cf6", marginBottom: 4 }}>
              {tr.added}
            </div>
            <div style={{ fontSize: 12, color: "var(--td)" }}>
              {tr.productName}
            </div>
          </div>
        )}

        {step === "recommend" && (
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6, marginBottom: 12,
              padding: "6px 10px", borderRadius: 8,
              background: "rgba(139, 92, 246,.08)", border: "1px solid rgba(139, 92, 246,.2)",
            }}>
              <span style={{ fontSize: 14 }}>✅</span>
              <span style={{ fontSize: 12, color: "#8b5cf6", fontWeight: 700 }}>{tr.addedTag}</span>
            </div>
            <div style={{
              padding: "12px",
              borderRadius: 12,
              background: "rgba(139, 92, 246,.08)",
              border: "1.5px solid rgba(139, 92, 246,.25)",
              backdropFilter: "blur(12px)",
            }}>
              <div style={{ fontSize: 12, color: "#8b5cf6", fontWeight: 700, marginBottom: 8, letterSpacing: 0.5 }}>
                {tr.alsoLabel}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: "var(--s2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0,
                }}>🧴</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", marginBottom: 2 }}>
                    {tr.suggestedName}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--td)" }}>{tr.suggestedSub}</div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "#c084fc", marginTop: 3 }}>{tr.suggestedPrice}</div>
                </div>
              </div>
              <button style={{
                width: "100%", padding: "7px 10px",
                borderRadius: 9,
                background: "rgba(124, 58, 237,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#c084fc", fontSize: 12, fontWeight: 800,
                border: "1px solid rgba(124, 58, 237,0.2)", cursor: "pointer",
              }}>
                {tr.btnAdd}
              </button>
            </div>
            <button
              onClick={runSequence}
              style={{
                width: "100%", marginTop: 10, padding: "7px",
                borderRadius: 9, background: "transparent",
                border: "1px solid var(--b2)",
                color: "var(--td)", fontSize: 12,
                cursor: "pointer",
              }}
            >
              {tr.btnReplay}
            </button>
          </div>
        )}
      </div>
    </UseCaseWidgetPreview>
  );
}
