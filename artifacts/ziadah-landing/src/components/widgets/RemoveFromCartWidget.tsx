import { useState, useEffect, useRef, useCallback } from "react";
import UseCaseWidgetPreview from "../UseCaseWidgetPreview";

export default function RemoveFromCartWidget() {
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
    <UseCaseWidgetPreview title="حذف من السلة" subtitle="عرض احتجاز ذكي لمنع الخسارة">
      <div style={{ minHeight: 220 }}>
        {step === "cart" && (
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 10 }}>سلة التسوق</div>
            <div style={{
              display: "flex", gap: 8, alignItems: "center",
              padding: "10px", borderRadius: 10,
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
              marginBottom: 10,
            }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>👟</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>حذاء رياضي نايك</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)" }}>مقاس ٤٢ — أسود</div>
                <div style={{ fontSize: 12, fontWeight: 900, color: "#c084fc" }}>٢٨٠ ⃁</div>
              </div>
              <button style={{
                padding: "5px 9px", borderRadius: 7,
                background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)",
                color: "#f87171", fontSize: 10, fontWeight: 700, cursor: "pointer",
              }}>
                🗑️ حذف
              </button>
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", textAlign: "center" }}>
              العميل يضغط "حذف"...
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>😟</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
              هل أنت متأكد من الحذف؟
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginBottom: 14 }}>
              حذاء رياضي نايك — ٢٨٠ ⃁
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px",
              borderRadius: 50, background: "rgba(245,158,11,.1)",
              border: "1px solid rgba(245,158,11,.3)", fontSize: 10, color: "#f59e0b",
            }}>
              ⏳ زيادة يعمل على إيجاد حل...
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
              <div style={{ fontSize: 10, color: "#f87171", fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>
                🔥 قبل أن تحذفه — عرض خاص لك فقط!
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 24 }}>👟</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>حذاء رياضي نايك</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 3 }}>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", textDecoration: "line-through" }}>٢٨٠ ⃁</span>
                    <span style={{ fontSize: 14, fontWeight: 900, color: "#10b981" }}>٢٣٨ ⃁</span>
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: "2px 6px",
                      borderRadius: 50, background: "rgba(16,185,129,.15)",
                      border: "1px solid rgba(16,185,129,.3)", color: "#10b981",
                    }}>وفّر ١٥٪</span>
                  </div>
                </div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 4, marginBottom: 10,
                fontSize: 10, color: "#f87171", fontWeight: 600,
              }}>
                <span>⏱️</span>
                <span>ينتهي العرض خلال: ٠٩:٥٨</span>
              </div>
              <button style={{
                width: "100%", padding: "9px",
                borderRadius: 9,
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#fff", fontSize: 11, fontWeight: 800,
                border: "none", cursor: "pointer",
              }}>
                ✅ استفد من الخصم وأبقِه
              </button>
            </div>
            <button style={{
              width: "100%", padding: "7px", borderRadius: 9,
              background: "transparent", border: "1px solid rgba(239,68,68,.2)",
              color: "rgba(239,68,68,.5)", fontSize: 10, cursor: "pointer",
            }}>
              لا، احذف المنتج رغم ذلك
            </button>
            <button
              onClick={runSequence}
              style={{
                width: "100%", marginTop: 8, padding: "7px",
                borderRadius: 9, background: "transparent",
                border: "1px solid rgba(255,255,255,.1)",
                color: "rgba(255,255,255,.3)", fontSize: 10,
                cursor: "pointer",
              }}
            >
              ↩ إعادة تشغيل المحاكاة
            </button>
          </div>
        )}
      </div>
    </UseCaseWidgetPreview>
  );
}
