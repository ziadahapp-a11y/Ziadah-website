import { useState } from "react";

type Profile = "noura" | "nasser";

const nouraItems = [
  { icon: "🌹", name: "عطر رمضان الخاص", reason: "💡 جاءت من إعلان رمضان", price: 289 },
  { icon: "💆", name: "طقم عناية بالبشرة", reason: "💡 تصفحت كريمات البشرة", price: 199 },
  { icon: "🎁", name: "هدية رمضانية فاخرة", reason: "💡 شائع جداً هذا الموسم", price: 159 },
  { icon: "💐", name: "بخور عود", reason: "💡 مكمل للعطور", price: 99 },
];

const nasserItems = [
  { icon: "🎧", name: "إير بودز برو", reason: "💡 أكملها مع آيفون 17", price: 249 },
  { icon: "💪", name: "بروتين رياضي", reason: "💡 يناسب نمطه الرياضي", price: 149 },
  { icon: "⌚", name: "ساعة ذكية", reason: "💡 تكمل ساعته القديمة", price: 399 },
  { icon: "🎽", name: "تي شيرت برو", reason: "💡 اشترى نفس اللون قبلاً", price: 89 },
];

export default function CustomerPersonalizationDemo({ isAr }: { isAr: boolean }) {
  const [profile, setProfile] = useState<Profile>("nasser");

  const labels = isAr
    ? {
        badge: "معاينة حية",
        title: "معاينة التوصيات",
        sub: "نفس المحرك يولّد هذه البطاقات لكل زائر — جرّب شخصيتين مختلفتين.",
        noura: "نورة",
        nasser: "ناصر",
        statsSignals: "تم تحليل +40 إشارة",
        statsLatency: "وقت التوليد: أقل من 80ms",
        soonTitle: "تخصيص تجربة المتجر بالكامل",
        soonSub:
          " تجربة متجرك بالكامل تتغير حسب العميل, كل عميل له تجربة مخصصة حسب احتياجه وسلوكه وبياناته المحفوظة, عميلك بيحس انك فاهمه 100%",
        soonBullets: [
          "أقسام مخصصة",
          "تصفح منتجات مخصصة",
          "تصميم مخصص)",
        ],
        soonVisual: "قريباً",
        lockHint: "",
      }
    : {
        badge: "Live preview",
        title: "Recommendations preview",
        sub: "The same engine builds these cards per visitor — try two different profiles.",
        noura: "Noura",
        nasser: "Nasser",
        statsSignals: "+40 signals analyzed",
        statsLatency: "Generation time: under 80ms",
        soonTitle: "The platform is ready — the demo expands",
        soonSub:
          "All of these capabilities already exist in Ziadah: personalized hero and home, live cart, Tabby, purchase history, and real-time signals. On this page we currently show recommendations only. Next: surfacing your full catalog across the storefront through personalization — not just a recommendations widget in the preview.",
        soonBullets: [
          "The above features run in your live store with Ziadah enabled",
          "This preview focuses on the recommendation strip to make the engine’s reasoning visible",
          "Next preview milestone: a full catalog view that shifts with each visitor profile",
        ],
        soonVisual: "Full-store preview",
        lockHint: "Expanded preview in progress",
      };

  const items = profile === "noura" ? nouraItems : nasserItems;

  return (
    <>
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 48px" }}>
        <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "4px 14px",
              borderRadius: 50,
              background: "rgba(22, 163, 74,.08)",
              border: "1px solid rgba(22, 163, 74,.2)",
              color: "#16a34a",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase" as const,
              marginBottom: 16,
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a" }} />
            {labels.badge}
          </div>
          <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>{labels.title}</h3>
          <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 28, lineHeight: 1.7 }}>{labels.sub}</p>

          <div
            style={{
              display: "inline-flex",
              gap: 10,
              padding: 6,
              borderRadius: 14,
              background: "var(--s2)",
              border: "1px solid var(--b1)",
              marginBottom: 28,
            }}
          >
            {(["nasser", "noura"] as const).map((key) => {
              const active = profile === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setProfile(key)}
                  style={{
                    padding: "10px 22px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 15,
                    fontWeight: 800,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background: active ? "rgba(22, 163, 74,.22)" : "transparent",
                    color: active ? "var(--p4)" : "var(--tm)",
                    boxShadow: active ? "0 4px 20px rgba(22, 163, 74,.2)" : "none",
                  }}
                >
                  {key === "noura" ? `👩 ${labels.noura}` : `👨 ${labels.nasser}`}
                </button>
              );
            })}
          </div>

            <div
              className="gc"
              style={{
                padding: "var(--card-pad-md)",
                borderRadius: 20,
                textAlign: "start",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="shine" />
            <div
              className="uc-demo-product-grid"
              style={{
                transition: "opacity 0.35s ease, transform 0.35s ease",
                opacity: 1,
                transform: "translateY(0)",
              }}
              key={profile}
            >
              {items.map((p) => (
                <div
                  key={p.name}
                  style={{
                    padding: "var(--card-pad-sm)",
                    borderRadius: 14,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--b1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    animation: "ucDemoCardIn 0.4s ease both",
                  }}
                >
                  <div style={{ fontSize: 28, lineHeight: 1 }}>{p.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "var(--t)", lineHeight: 1.35 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 600, lineHeight: 1.5 }}>{p.reason}</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "var(--p4)", marginTop: "auto" }}>
                    {p.price} {isAr ? "ريال" : "SAR"}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 22,
                padding: "14px 18px",
                borderRadius: 12,
                background: "rgba(6,182,212,.06)",
                border: "1px solid rgba(6,182,212,.18)",
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                justifyContent: "center",
                alignItems: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--tm)",
              }}
            >
              <span style={{ color: "#06b6d4" }}>{labels.statsSignals}</span>
              <span style={{ opacity: 0.35 }}>|</span>
              <span style={{ color: "#22c55e" }}>{labels.statsLatency}</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 60px" }}>
        <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
          <div
            className="gc"
            style={{
              padding: "var(--card-pad-lg)",
              borderRadius: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div className="shine" />
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 28, marginBottom: 24 }}>
              <div style={{ flex: "1 1 280px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "4px 12px",
                    borderRadius: 50,
                    background: "rgba(245,158,11,.12)",
                    border: "1px solid rgba(245,158,11,.28)",
                    color: "#f59e0b",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    marginBottom: 14,
                  }}
                >
                  <span aria-hidden>🔒</span>
                  {isAr ? "قريباً" : "Coming soon"}
                </div>
                <h3 style={{ fontSize: "clamp(20px,2.4vw,26px)", fontWeight: 900, marginBottom: 10, lineHeight: 1.25 }}>{labels.soonTitle}</h3>
                <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.75, marginBottom: 18 }}>{labels.soonSub}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {labels.soonBullets.map((line, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--tm)", lineHeight: 1.65 }}>
                      <span style={{ color: "#22c55e", fontWeight: 800, flexShrink: 0 }}>✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  flex: "1 1 300px",
                  position: "relative",
                  borderRadius: 16,
                  minHeight: 220,
                  background: "linear-gradient(145deg, rgba(22, 163, 74,.08), rgba(6,182,212,.06))",
                  border: "1px solid var(--b1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    filter: "blur(7px)",
                    opacity: 0.45,
                    transform: "scale(1.04)",
                    background: `
                      linear-gradient(180deg, rgba(22, 163, 74,.25) 0%, transparent 40%),
                      repeating-linear-gradient(-12deg, transparent, transparent 8px, rgba(255,255,255,.03) 8px, rgba(255,255,255,.03) 16px)
                    `,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    background: "rgba(8,6,20,.25)",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "rgba(245,158,11,.2)",
                      border: "2px solid rgba(245,158,11,.45)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                    }}
                  >
                    🔒
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "var(--t)" }}>{labels.soonVisual}</div>
                  <div style={{ fontSize: 11, color: "var(--td)", fontWeight: 600 }}>{labels.lockHint}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ucDemoCardIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
