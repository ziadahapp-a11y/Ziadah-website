import { Fragment } from "react";
import { useSiteT } from "@/cms/siteContent";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Translations } from "@/i18n/translations";
import type { SectorVisualBundle, SectorVisualScenario } from "@/data/sectorVisuals";

type SectorPageT = Translations["sectorsPage"];

export default function SectorVisualExamples({ bundle }: { bundle: SectorVisualBundle }) {
  const t = useSiteT();
  const { lang, isAr } = useLanguage();
  const tr = t[lang].sectorsPage;

  return (
    <div className="sector-viz-root">
      <p className="sector-viz-lead rv d1" style={{ margin: "0 0 20px", fontSize: 14, color: "var(--tm)", lineHeight: 1.75 }}>
        {tr.sectionExamplesSub}
      </p>

      <div className="sector-viz-scenarios">
        {bundle.scenarios.map((s, i) => (
          <ScenarioCard key={i} scenario={s} tr={tr} isAr={isAr} delayClass={`d${(i % 2) + 1}`} />
        ))}
      </div>

      <div className={`gc rv d2 sector-viz-flow-wrap`} style={{ padding: 0, marginTop: 28, overflow: "hidden" }}>
        <div className="shine" />
        <div style={{ padding: "var(--card-pad-lg)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: "var(--p3)", textTransform: "uppercase" }}>{tr.sectionFlowTag}</div>
            <h3 style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 900, margin: "10px 0 8px" }}>{tr.sectionFlowTitle}</h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--td)" }}>{tr.sectionFlowSub}</p>
          </div>
          <div className="sector-viz-flow-steps">
            {bundle.flow.map((step, i) => (
              <Fragment key={i}>
                <div className="sector-viz-flow-step">
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: "rgba(124,58,237,.12)",
                      border: "1px solid rgba(124,58,237,.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                      marginBottom: 12,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>{isAr ? step.titleAr : step.titleEn}</div>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--tm)", lineHeight: 1.65 }}>{isAr ? step.descAr : step.descEn}</p>
                </div>
                {i < bundle.flow.length - 1 && <div className="sector-viz-flow-arrow" aria-hidden />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScenarioCard({
  scenario,
  tr,
  isAr,
  delayClass,
}: {
  scenario: SectorVisualScenario;
  tr: SectorPageT;
  isAr: boolean;
  delayClass: string;
}) {
  const s = scenario;
  const main = s.main;
  const accent = s.accent;

  return (
    <div className={`gc rv ${delayClass} sector-viz-card`} style={{ padding: 0, overflow: "hidden" }}>
      <div className="shine" />
      <div style={{ height: 4, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      <div style={{ padding: "var(--card-pad-md)" }}>
        <div style={{ marginBottom: 14 }}>
          <h3 style={{ fontSize: 17, fontWeight: 900, margin: "0 0 6px", color: "var(--t)" }}>{isAr ? s.titleAr : s.titleEn}</h3>
          <p style={{ margin: 0, fontSize: 13, color: "var(--td)", lineHeight: 1.55 }}>{isAr ? s.contextAr : s.contextEn}</p>
        </div>

        <div
          style={{
            borderRadius: 14,
            border: "1px solid var(--b1)",
            background: "var(--s1)",
            overflow: "hidden",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              borderBottom: "1px solid var(--b1)",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--td)",
              background: "rgba(0,0,0,.12)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ opacity: 0.7 }}>●●●</span>
              {tr.mockStoreBar}
            </span>
            <span style={{ color: accent }}>{tr.mockCartBadge}</span>
          </div>

          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: "var(--td)", marginBottom: 8 }}>{tr.vizMainLabel}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 12,
                background: "rgba(0,0,0,.2)",
                border: `1px solid ${accent}33`,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `linear-gradient(145deg, ${accent}33, rgba(0,0,0,.3))`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                {main.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {isAr ? main.nameAr : main.nameEn}
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: accent, marginTop: 4 }}>{main.price}</div>
              </div>
            </div>

            <div
              style={{
                margin: "14px 0 10px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                fontWeight: 800,
                color: "var(--p3)",
              }}
            >
              <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(124,58,237,.4), transparent)" }} />
              {tr.vizAiLabel}
              <span style={{ flex: 1, height: 1, background: "linear-gradient(270deg, rgba(6,182,212,.35), transparent)" }} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {s.suggested.map((p, j) => (
                <div
                  key={j}
                  style={{
                    flex: "1 1 140px",
                    minWidth: 120,
                    padding: "10px 10px",
                    borderRadius: 12,
                    background: "rgba(6,182,212,.06)",
                    border: "1px solid rgba(6,182,212,.2)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{p.emoji}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.35, color: "var(--tm)" }}>{isAr ? p.nameAr : p.nameEn}</div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#06b6d4", marginTop: 4 }}>{p.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: "var(--td)", marginInlineEnd: 4 }}>{tr.vizWidgetLabel}</span>
          <span style={{ padding: "4px 12px", borderRadius: 50, background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.25)", fontSize: 12, fontWeight: 700, color: "var(--p3)" }}>
            {isAr ? s.widgetAr : s.widgetEn}
          </span>
          <span style={{ fontSize: 10, fontWeight: 800, color: "var(--td)", marginInlineStart: 8, marginInlineEnd: 4 }}>{tr.vizPlacementLabel}</span>
          <span style={{ padding: "4px 12px", borderRadius: 50, background: "rgba(6,182,212,.08)", border: "1px solid rgba(6,182,212,.22)", fontSize: 12, fontWeight: 700, color: "#06b6d4" }}>
            {isAr ? s.placementAr : s.placementEn}
          </span>
        </div>
      </div>
    </div>
  );
}
