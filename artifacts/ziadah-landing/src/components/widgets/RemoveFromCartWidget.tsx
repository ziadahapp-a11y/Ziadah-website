import { useState, useEffect, useRef, useCallback } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

export default function RemoveFromCartWidget() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].widgets.removeFromCart;

  const [step, setStep] = useState<"cart" | "confirm" | "offer">("cart");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const runSequence = useCallback(() => {
    clearAllTimers();
    setStep("cart");
    timers.current.push(setTimeout(() => setStep("confirm"), 1000));
    timers.current.push(setTimeout(() => setStep("offer"), 2000));
  }, []);

  useEffect(() => {
    runSequence();
    return clearAllTimers;
  }, [runSequence]);

  return (
    <UseCaseWidgetPreview title={tr.title} subtitle={tr.subtitle}>
      <div style={{ minHeight: 220 }}>
        {step === "cart" && (
          <div>
            <div style={{ fontSize: 12, color: "var(--td)", marginBottom: 10 }}>{tr.cartLabel}</div>
            <div style={{
              display: "flex", gap: 8, alignItems: "center",
              padding: "10px", borderRadius: 10,
              background: "var(--s1)", border: "1px solid var(--b1)",
              marginBottom: 10,
            }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>👟</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t)" }}>{tr.productName}</div>
                <div style={{ fontSize: 12, color: "var(--td)" }}>{tr.productSize}</div>
                <div style={{ fontSize: 12, fontWeight: 900, color: "#c084fc" }}>{tr.productPrice}</div>
              </div>
              <button style={{
                padding: "5px 9px", borderRadius: 7,
                background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)",
                color: "#f87171", fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>
                {tr.btnRemove}
              </button>
            </div>
            <div style={{ fontSize: 12, color: "var(--td)", textAlign: "center" }}>
              {tr.clickRemoveNote}
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>😟</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", marginBottom: 6 }}>
              {tr.confirmTitle}
            </div>
            <div style={{ fontSize: 12, color: "var(--td)", marginBottom: 14 }}>
              {tr.confirmSub}
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px",
              borderRadius: 50, background: "rgba(245,158,11,.1)",
              border: "1px solid rgba(245,158,11,.3)", fontSize: 12, color: "#f59e0b",
            }}>
              {tr.searchingLabel}
            </div>
          </div>
        )}

        {step === "offer" && (
          <div>
            <div style={{
              padding: "12px",
              borderRadius: 12,
              background: "rgba(239,68,68,.06)",
              border: "1.5px solid rgba(239,68,68,.2)",
              marginBottom: 10,
            }}>
              <div style={{ fontSize: 12, color: "#f87171", fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>
                {tr.offerTitle}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 24 }}>👟</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t)" }}>{tr.productName}</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 3 }}>
                    <span style={{ fontSize: 12, color: "var(--td)", textDecoration: "line-through" }}>{tr.originalPrice}</span>
                    <span style={{ fontSize: 14, fontWeight: 900, color: "#22c55e" }}>{tr.newPrice}</span>
                    <span style={{
                      fontSize: 12, fontWeight: 700, padding: "2px 6px",
                      borderRadius: 50, background: "rgba(16,185,129,.15)",
                      border: "1px solid rgba(16,185,129,.3)", color: "#22c55e",
                    }}>{tr.saveLabel}</span>
                  </div>
                </div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 4, marginBottom: 10,
                fontSize: 12, color: "#f87171", fontWeight: 600,
              }}>
                <span>⏱️</span>
                <span>{tr.offerExpires}</span>
              </div>
              <button style={{
                width: "100%", padding: "7px 10px",
                borderRadius: 9,
                background: "rgba(16,185,129,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#22c55e", fontSize: 12, fontWeight: 800,
                border: "1px solid rgba(16,185,129,0.2)", cursor: "pointer",
              }}>
                {tr.btnAccept}
              </button>
            </div>
            <button style={{
              width: "100%", padding: "7px", borderRadius: 9,
              background: "transparent", border: "1px solid rgba(239,68,68,.2)",
              color: "rgba(239,68,68,.5)", fontSize: 12, cursor: "pointer",
            }}>
              {tr.btnRemoveAnyway}
            </button>
            <button
              onClick={runSequence}
              style={{
                width: "100%", marginTop: 8, padding: "7px",
                borderRadius: 9, background: "transparent",
                border: "1px solid var(--b1)",
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
