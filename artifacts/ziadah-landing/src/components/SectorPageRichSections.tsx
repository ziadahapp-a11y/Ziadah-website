import { useSiteT } from "@/cms/siteContent";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SectorPageRich } from "@/data/sectorPageTypes";

type Part = "top" | "ai" | "bottom";

export default function SectorPageRichSections({ rich, part }: { rich: SectorPageRich; part: Part }) {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].sectorsPage;
  const isAr = lang === "ar";

  const triggers = tr.sectorTrackingTriggers;
  const featureNames = tr.sectorFeatureNames;

  if (part === "top") {
    return (
      <>
        <div id="section-audience" className="gc rv d1" style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
          <div className="shine" />
          <div style={{ padding: "22px 24px 26px" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 14, marginTop: 0 }}>{tr.sectorSectionAudience}</h2>
            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              }}
            >
              <div className="gc" style={{ padding: 0, marginBottom: 0, border: "1px solid var(--b2)", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "14px 16px", background: "rgba(124,58,237,.08)", fontWeight: 800, fontSize: 13 }}>{tr.sectorAudienceOwner}</div>
                <p style={{ margin: 0, padding: "16px 18px 18px", fontSize: 14, color: "var(--td)", lineHeight: 1.7 }}>{isAr ? rich.audienceOwnerAr : rich.audienceOwnerEn}</p>
              </div>
              <div className="gc" style={{ padding: 0, marginBottom: 0, border: "1px solid var(--b2)", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "14px 16px", background: "rgba(124,58,237,.08)", fontWeight: 800, fontSize: 13 }}>{tr.sectorAudienceCustomer}</div>
                <p style={{ margin: 0, padding: "16px 18px 18px", fontSize: 14, color: "var(--td)", lineHeight: 1.7 }}>{isAr ? rich.audienceCustomerAr : rich.audienceCustomerEn}</p>
              </div>
            </div>
          </div>
        </div>

        <div id="section-why" className="gc rv d2" style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
          <div className="shine" />
          <div style={{ padding: "22px 24px 26px" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 14, marginTop: 0 }}>{tr.sectorSectionWhy}</h2>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
              {rich.whyCards.map((w, i) => (
                <div key={i} className="gc rv" style={{ padding: 0, marginBottom: 0 }}>
                  <div className="shine" />
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "14px 16px 16px" }}>
                    <span style={{ fontSize: 20, lineHeight: 1.2 }} aria-hidden>
                      {w.emoji}
                    </span>
                    <p style={{ margin: 0, fontSize: 14, color: "var(--td)", lineHeight: 1.65 }}>{isAr ? w.textAr : w.textEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (part === "ai") {
    return (
      <div id="sector-ai-context" className="gc rv d1" style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
        <div className="shine" />
        <div style={{ padding: "22px 24px 26px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 12, marginTop: 0 }}>{tr.sectorSectionAiContext}</h2>
          <div style={{ marginBottom: 16, padding: "14px 16px", borderRadius: 12, border: "1px solid var(--b2)", background: "rgba(124,58,237,.04)" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--tm)", marginBottom: 8 }}>{tr.sectorAiProfile}</div>
            <p style={{ margin: 0, fontSize: 14, color: "var(--t)", lineHeight: 1.65 }}>{isAr ? rich.aiProfileTagsAr : rich.aiProfileTagsEn}</p>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--tm)", marginBottom: 8 }}>{tr.sectorAiRecs}</div>
            <ul style={{ margin: 0, paddingInlineStart: 20, color: "var(--td)", lineHeight: 1.7, fontSize: 14 }}>
              {(isAr ? rich.aiRecsAr : rich.aiRecsEn).map((line, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--tm)", marginBottom: 8 }}>{tr.sectorAiSignals}</div>
            <ul style={{ margin: 0, paddingInlineStart: 20, color: "var(--td)", lineHeight: 1.7, fontSize: 14 }}>
              {(isAr ? rich.aiSignalsAr : rich.aiSignalsEn).map((line, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="section-tracking" className="gc rv d2" style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
        <div className="shine" />
        <div style={{ padding: "22px 24px 26px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 12, marginTop: 0 }}>{tr.sectorSectionTracking}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {triggers.map((tg, i) => (
              <span
                key={i}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: "1px solid var(--b2)",
                  background: "var(--s1)",
                  color: "var(--t)",
                }}
              >
                {isAr ? tg.ar : tg.en}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div id="section-analytics" className="gc rv d1" style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
        <div className="shine" />
        <div style={{ padding: "22px 24px 26px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 12, marginTop: 0 }}>{tr.sectorSectionAnalytics}</h2>
          <p style={{ fontSize: 12, fontWeight: 800, color: "var(--tm)", marginBottom: 8 }}>{tr.sectorAnalyticsNarrative}</p>
          <ul style={{ margin: "0 0 18px", paddingInlineStart: 20, color: "var(--td)", lineHeight: 1.75, fontSize: 14 }}>
            {(isAr ? rich.analyticLinesAr : rich.analyticLinesEn).map((line, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                {line}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 12, fontWeight: 800, color: "var(--tm)", marginBottom: 8 }}>{tr.sectorAnalyticsKpis}</p>
          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))" }}>
            {rich.analyticKpis.map((k, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1px solid var(--b2)",
                  background: "linear-gradient(180deg, rgba(124,58,237,.08), transparent)",
                  fontWeight: 800,
                  fontSize: 15,
                  color: "var(--p)",
                  textAlign: "center",
                }}
              >
                {isAr ? k.ar : k.en}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="section-features" className="gc rv d2" style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
        <div className="shine" />
        <div style={{ padding: "22px 24px 26px", overflowX: "auto" }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 12, marginTop: 0 }}>{tr.sectorSectionFeatures}</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 520 }}>
            <thead>
              <tr>
                <th style={{ textAlign: isAr ? "right" : "left", padding: "10px 12px", borderBottom: "1px solid var(--b2)", color: "var(--tm)", fontWeight: 800 }}>{tr.sectorFeatureColFeature}</th>
                <th style={{ textAlign: isAr ? "right" : "left", padding: "10px 12px", borderBottom: "1px solid var(--b2)", color: "var(--tm)", fontWeight: 800 }}>{tr.sectorFeatureColHow}</th>
              </tr>
            </thead>
            <tbody>
              {featureNames.map((fn, i) => (
                <tr key={i}>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--b1)", verticalAlign: "top", fontWeight: 700, color: "var(--t)", whiteSpace: "nowrap" }}>{isAr ? fn.ar : fn.en}</td>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--b1)", verticalAlign: "top", color: "var(--td)", lineHeight: 1.6 }}>{isAr ? rich.featureHowAr[i] : rich.featureHowEn[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div id="section-sector-cta" className="gc rv d1" style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
        <div className="shine" />
        <div style={{ padding: "28px 24px 30px", textAlign: "center" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--p)", marginBottom: 10, marginTop: 0 }}>{isAr ? rich.ctaHeadlineAr : rich.ctaHeadlineEn}</h2>
          <p style={{ margin: 0, fontSize: 15, color: "var(--tm)", lineHeight: 1.75, maxWidth: 560, marginInline: "auto" }}>{isAr ? rich.ctaSubAr : rich.ctaSubEn}</p>
        </div>
      </div>
    </>
  );
}
