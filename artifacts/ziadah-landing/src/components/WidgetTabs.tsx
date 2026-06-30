import { useState } from "react";

export interface WidgetTab {
  labelAr: string;
  labelEn: string;
  icon?: string;
  content: React.ReactNode;
  /** For `UseCaseLiveShowcase`: full-width block under the row (e.g. comparison tables). The phone keeps the first tab. */
  placement?: "inPhone" | "below";
}

interface WidgetTabsProps {
  isAr: boolean;
  tabs: WidgetTab[];
  fullWidthContent?: boolean;
}

export default function WidgetTabs({ isAr, tabs, fullWidthContent = false }: WidgetTabsProps) {
  const [active, setActive] = useState(0);

  if (tabs.length === 1) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {tabs[0].content}
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          flexWrap: "wrap" as const,
          padding: "0 4px",
          marginBottom: 36,
        }}
      >
        {tabs.map((tab, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: "10px 22px",
                borderRadius: 99,
                background: isActive
                  ? "linear-gradient(135deg,#16a34a,#15803d)"
                  : "rgba(22, 163, 74,0.06)",
                color: isActive ? "#fff" : "var(--p4)",
                border: `1.5px solid ${isActive ? "transparent" : "rgba(22, 163, 74,0.22)"}`,
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                transition: "all .22s cubic-bezier(.23,1,.32,1)",
                fontFamily: "var(--font)",
                boxShadow: isActive
                  ? "0 4px 18px rgba(22, 163, 74,.38), 0 1px 0 rgba(255,255,255,.08) inset"
                  : "none",
                outline: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap" as const,
                transform: isActive ? "translateY(-1px)" : "none",
              }}
            >
              {tab.icon && <span>{tab.icon}</span>}
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          );
        })}
      </div>

      <div
        key={active}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          animation: "wtFadeIn .22s ease",
        }}
      >
        <style>{`
          @keyframes wtFadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        {fullWidthContent ? (
          <div style={{ width: "100%", maxWidth: 900 }}>{tabs[active].content}</div>
        ) : (
          tabs[active].content
        )}
      </div>
    </div>
  );
}
