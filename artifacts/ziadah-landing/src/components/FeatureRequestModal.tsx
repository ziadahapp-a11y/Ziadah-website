import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { useTheme } from "@/ThemeContext";

export default function FeatureRequestModal({ onClose }: { onClose: () => void }) {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = t[lang];
  const { theme } = useTheme();
  const lt = theme === "light";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const baseUrl = import.meta.env.BASE_URL || "/";
      const res = await fetch(`${baseUrl}api/feature-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, description }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || tr.featureModal.errorText);
      }
      setSuccess(true);
      setTimeout(() => onClose(), 2500);
    } catch {
      setError(tr.featureModal.errorText);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{
        background: lt ? "rgba(255,255,255,.98)" : "rgba(8,6,20,.98)",
        border: `1px solid ${lt ? "rgba(124,58,237,.2)" : "rgba(124,58,237,.3)"}`,
        borderRadius: 24, padding: 40, width: "100%", maxWidth: 500,
        position: "relative", direction: dir,
        boxShadow: lt ? "0 40px 100px rgba(0,0,0,.12), 0 0 60px rgba(124,58,237,.08)" : "0 40px 100px rgba(0,0,0,.8), 0 0 60px rgba(124,58,237,.15)",
      }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute", top: 16, left: 16,
            background: "var(--s2)", border: "none", color: "var(--t)",
            width: 36, height: 36, borderRadius: 10, fontSize: 18,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          ✕
        </button>

        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(16,185,129,.15)", border: "1px solid rgba(16,185,129,.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", fontSize: 28,
            }}>
              ✓
            </div>
            <h3 style={{ fontFamily: "var(--font)", fontSize: 22, fontWeight: 800, color: "var(--t)", marginBottom: 10 }}>
              {tr.featureModal.successTitle}
            </h3>
            <p style={{ fontFamily: "var(--font)", fontSize: 14, color: "var(--td)", lineHeight: 1.7 }}>
              {tr.featureModal.successText}
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 28 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "rgba(124,58,237,.15)", border: "1px solid rgba(124,58,237,.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L3 7v9a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zm0 2.36L15 8v8H5V8l5-3.64z" fill="rgba(168,85,247,.8)"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font)", fontSize: 22, fontWeight: 800, color: "var(--t)", marginBottom: 8 }}>
                {tr.featureModal.title}
              </h3>
              <p style={{ fontFamily: "var(--font)", fontSize: 14, color: "var(--td)", lineHeight: 1.7 }}>
                {tr.featureModal.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, color: "var(--tm)", display: "block", marginBottom: 8 }}>
                  {tr.featureModal.name}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={tr.featureModal.namePlaceholder}
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "var(--s1)", border: "1px solid var(--b2)",
                    borderRadius: 12, color: "var(--t)", fontFamily: "var(--font)", fontSize: 14,
                    outline: "none", direction: dir, boxSizing: "border-box",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(124,58,237,.6)"}
                  onBlur={e => e.currentTarget.style.borderColor = ""}
                />
              </div>

              <div>
                <label style={{ fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, color: "var(--tm)", display: "block", marginBottom: 8 }}>
                  {tr.featureModal.email}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "var(--s1)", border: "1px solid var(--b2)",
                    borderRadius: 12, color: "var(--t)", fontFamily: "var(--font)", fontSize: 14,
                    outline: "none", direction: "ltr", textAlign: dir === "rtl" ? "right" : "left", boxSizing: "border-box",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(124,58,237,.6)"}
                  onBlur={e => e.currentTarget.style.borderColor = ""}
                />
              </div>

              <div>
                <label style={{ fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, color: "var(--tm)", display: "block", marginBottom: 8 }}>
                  {tr.featureModal.descLabel}
                </label>
                <textarea
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={tr.featureModal.descPlaceholder}
                  rows={4}
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "var(--s1)", border: "1px solid var(--b2)",
                    borderRadius: 12, color: "var(--t)", fontFamily: "var(--font)", fontSize: 14,
                    outline: "none", direction: dir, resize: "vertical", boxSizing: "border-box",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(124,58,237,.6)"}
                  onBlur={e => e.currentTarget.style.borderColor = ""}
                />
              </div>

              {error && (
                <div style={{
                  padding: "10px 14px", borderRadius: 10,
                  background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)",
                  color: "#f87171", fontFamily: "var(--font)", fontSize: 13,
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                style={{
                  width: "100%", padding: "14px",
                  background: sending ? "rgba(124,58,237,.4)" : "linear-gradient(135deg,#7c3aed,#5b21b6)",
                  border: "none", borderRadius: 50, color: "#fff",
                  fontFamily: "var(--font)", fontSize: 15, fontWeight: 700,
                  cursor: sending ? "not-allowed" : "pointer",
                  transition: "all .25s", marginTop: 4,
                  boxShadow: sending ? "none" : "0 0 30px rgba(124,58,237,.4)",
                }}
              >
                {sending ? tr.featureModal.sending : tr.featureModal.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
