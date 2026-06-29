import { useState } from "react";
import { PageHeroPhone } from "@/components/UseCasePagesShowcase";
import type { WidgetTab } from "@/components/WidgetTabs";

export type { WidgetTab } from "@/components/WidgetTabs";

export interface UseCaseLiveShowcaseProps {
  isAr: boolean;
  /** Omit to use the standard “Live example” badge in the active UI language. */
  badge?: string;
  title: string;
  subtitle: string;
  tabs: WidgetTab[];
  float1?: string;
  float2?: string;
}

export default function UseCaseLiveShowcase({
  isAr,
  badge,
  title,
  subtitle,
  tabs,
  float1,
  float2,
}: UseCaseLiveShowcaseProps) {
  const [active, setActive] = useState(0);
  const single = tabs.length === 1;
  const activeTab = tabs[active];
  const placement = activeTab.placement ?? "inPhone";
  const phoneSourceTab = placement === "below" ? tabs[0] : activeTab;
  const showBelow = placement === "below";

  const defaultBadge = isAr ? "مثال حي" : "Live Example";
  const f1 = float1 ?? (isAr ? "معاينة حية" : "Live preview");
  const f2 = float2 ?? (isAr ? "داخل المتجر" : "In-store");

  return (
    <section
      className="sector-html uc-live-showcase use-case-playbook-hero"
      style={{
        position: "relative",
        zIndex: 2,
        paddingTop: 80,
        paddingInline: "var(--page-inline-pad)",
        paddingBottom: "clamp(48px, 8vw, 80px)",
        width: "100%",
      }}
    >
      <div
        className="sector-html-hero-grid uc-live-showcase__grid"
        dir={isAr ? "rtl" : "ltr"}
        style={{ maxWidth: 1200, alignItems: "center" }}
      >
        <div className="sector-html-hero-copy" style={{ textAlign: "start" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "4px 14px",
              borderRadius: 50,
              background: "rgba(34, 197, 125,.08)",
              border: "1px solid rgba(34, 197, 125,.2)",
              color: "#22c57d",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c57d" }} />
            {badge ?? defaultBadge}
          </div>
          <h3
            className="sector-html-hero-h"
            style={{
              fontSize: "clamp(20px,2.5vw,30px)",
              fontWeight: 900,
              marginBottom: 8,
              alignItems: "flex-start",
              textAlign: "start",
            }}
          >
            {title}
          </h3>
          <p
            className="sector-html-hero-sub"
            style={{
              fontSize: 14,
              color: "var(--tm)",
              marginBottom: single ? 0 : 20,
              lineHeight: 1.7,
              textAlign: "start",
            }}
          >
            {subtitle}
          </p>

          {!single && (
            <div
              className="uc-live-showcase__tab-row"
              style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}
            >
              {tabs.map((tab, i) => {
                const isAct = i === active;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 99,
                      background: isAct
                        ? "linear-gradient(135deg,#22c57d,#16a34a)"
                        : "rgba(34, 197, 125,0.06)",
                      color: isAct ? "#fff" : "var(--p4)",
                      border: `1.5px solid ${isAct ? "transparent" : "rgba(34, 197, 125,0.22)"}`,
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all .22s cubic-bezier(.23,1,.32,1)",
                      fontFamily: "var(--font)",
                      boxShadow: isAct
                        ? "0 4px 18px rgba(34, 197, 125,.38), 0 1px 0 rgba(255,255,255,.08) inset"
                        : "none",
                      outline: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tab.icon && <span>{tab.icon}</span>}
                    {isAr ? tab.labelAr : tab.labelEn}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="sector-html-hero-mock">
          <PageHeroPhone float1={f1} float2={f2}>
            <div className="uc-live-showcase__phone-scroll">{phoneSourceTab.content}</div>
          </PageHeroPhone>
        </div>
      </div>

      {showBelow && (
        <div
          className="rv d2"
          style={{
            maxWidth: 960,
            margin: "clamp(28px, 4vw, 40px) auto 0",
            padding: "0 var(--page-inline-pad)",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {activeTab.content}
        </div>
      )}
    </section>
  );
}
