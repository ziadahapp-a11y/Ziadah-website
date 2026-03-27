import { useEffect, useRef } from "react";
import { useSiteT } from "@/cms/siteContent";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SectorPageRich, SectorWhyCard, SectorWhyCardSplit } from "@/data/sectorPageTypes";

type Part = "top" | "ai" | "bottom" | "foot";

function isWhySplit(w: SectorWhyCard): w is SectorWhyCardSplit {
  return "lineAr" in w;
}

export default function SectorPageRichSections({ rich, part }: { rich: SectorPageRich; part: Part }) {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].sectorsPage;
  const isAr = lang === "ar";
  const html = Boolean(rich.htmlLayout);

  const triggers = tr.sectorTrackingTriggers;
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (part !== "bottom" || !rich.analyticBarPcts || !barsRef.current) return;
    const tmr = setTimeout(() => {
      barsRef.current?.querySelectorAll<HTMLElement>(".sector-html-b-fill").forEach((el) => {
        const w = el.dataset.w;
        if (w) el.style.width = `${w}%`;
      });
    }, 500);
    return () => clearTimeout(tmr);
  }, [part, rich.analyticBarPcts]);

  if (part === "top") {
    if (html) {
      return (
        <>
          <div id="section-why" className="gc rv d2" style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
            <div className="shine" />
            <div style={{ padding: "22px 24px 26px" }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 14, marginTop: 0 }}>{tr.sectorSectionWhy}</h2>
              <div className="sector-html-why-grid">
                {rich.whyCards.map((w, i) => (
                  <div key={i} className="sector-html-wcard">
                    <div className="sector-html-wc-icon" aria-hidden>
                      {w.emoji}
                    </div>
                    {isWhySplit(w) ? (
                      <>
                        <div className="sector-html-wc-title">{isAr ? w.titleAr : w.titleEn}</div>
                        <p className="sector-html-wc-line">{isAr ? w.lineAr : w.lineEn}</p>
                      </>
                    ) : (
                      <p className="sector-html-wc-desc" style={{ margin: 0, fontSize: 13, color: "var(--td)", lineHeight: 1.65 }}>
                        {isAr ? w.textAr : w.textEn}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
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
                    <div style={{ margin: 0, fontSize: 14, color: "var(--td)", lineHeight: 1.65 }}>
                      {isWhySplit(w) ? (
                        <>
                          <div style={{ fontWeight: 800, marginBottom: 4, color: "var(--t)" }}>{isAr ? w.titleAr : w.titleEn}</div>
                          <div>{isAr ? w.lineAr : w.lineEn}</div>
                        </>
                      ) : (
                        <p style={{ margin: 0 }}>{isAr ? w.textAr : w.textEn}</p>
                      )}
                    </div>
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
    const recLines = (isAr ? rich.aiRecsAr : rich.aiRecsEn).map((s) => {
      const lastSpace = s.lastIndexOf(" ");
      const tail = lastSpace > 0 ? s.slice(lastSpace + 1) : "";
      if (tail && (/[%٪]/.test(tail) || /^\d/.test(tail))) {
        return { name: s.slice(0, lastSpace).trim(), pct: tail };
      }
      return { name: s, pct: "" };
    });

    const profileCard = (
      <div style={{ padding: "18px 20px", borderRadius: 16, border: "1px solid var(--b2)", background: "var(--s1)", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, var(--p), color-mix(in srgb, var(--p) 70%, #f59e0b), #f59e0b)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--p), color-mix(in srgb, var(--p) 70%, #f59e0b))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
            aria-hidden
          >
            👤
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "var(--t)" }}>{isAr ? "ملف العميل الذكي" : "Smart customer profile"}</div>
            <div className="sh-en" style={{ fontSize: 11, color: "var(--td)" }}>
              {isAr ? "يتحدث مع كل طلب" : "Updates with every order"}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {(isAr ? rich.aiProfileTagsAr : rich.aiProfileTagsEn).split("|").map((tag, ti) => (
            <span
              key={ti}
              className="sh-en"
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 999,
                border: "1px solid var(--b2)",
                background: "rgba(124,58,237,.08)",
                color: "var(--t)",
              }}
            >
              {tag.trim()}
            </span>
          ))}
        </div>
        <div className="sector-html-pc-recs-label sh-en">{tr.sectorAiRecsPersonalizedLabel}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recLines.map((r, ri) => (
            <div key={ri} className="sector-html-pc-rec">
              <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: "var(--t)", lineHeight: 1.35 }}>{r.name}</span>
              {r.pct ? <span className="sector-html-pcr-match sh-en">{r.pct}</span> : null}
            </div>
          ))}
        </div>
      </div>
    );

    if (html && rich.aiCompactPoints) {
      return (
        <div id="sector-ai-context" className="gc rv d1" style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
          <div className="shine" />
          <div style={{ padding: "22px 24px 26px" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 12, marginTop: 0 }}>{tr.sectorSectionAiContext}</h2>
            <div className="sector-html-ai-layout sector-html-ai-layout--compact">
              <div className="sector-html-ai-vis sector-html-ai-vis--profileonly">{profileCard}</div>
              <div className="sector-html-ai-compact-col">
                {rich.aiCompactPoints.map((pt, i) => (
                  <div key={i} className="sector-html-ai-point">
                    <div className="sector-html-ap-num sh-en">{i + 1}</div>
                    <div>
                      <div className="sector-html-ap-title">{isAr ? pt.titleAr : pt.titleEn}</div>
                      <p className="sector-html-ap-desc">{isAr ? pt.descAr : pt.descEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    const layers = rich.aiLayers;

    if (html && layers) {
      const sigLines = isAr ? rich.aiSignalsAr ?? [] : rich.aiSignalsEn ?? [];

      return (
        <div id="sector-ai-context" className="gc rv d1" style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
          <div className="shine" />
          <div style={{ padding: "22px 24px 26px" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 12, marginTop: 0 }}>{tr.sectorSectionAiContext}</h2>
            <div className="sector-html-ai-layout">
              <div>
                {layers.map((layer, i) => (
                  <div key={i} className="sector-html-ai-layer">
                    <div className="sector-html-al-num sh-en">{i + 1}</div>
                    <div>
                      <div className="sector-html-al-title">{isAr ? layer.titleAr : layer.titleEn}</div>
                      {!isAr ? <span className="sector-html-al-en">{layer.titleAr}</span> : null}
                      <p className="sector-html-al-desc">{isAr ? layer.descAr : layer.descEn}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="sector-html-ai-vis">
                {profileCard}

                {sigLines.length > 0 ? (
                  <div style={{ padding: "16px 18px", borderRadius: 16, border: "1px solid var(--b2)", background: "var(--s1)" }}>
                    <div className="sector-html-sc-head sh-en">{tr.sectorAiSignalsTrackedHead}</div>
                    <div className="sector-html-sc-grid">
                      {sigLines.map((line, i) => {
                        const sp = line.indexOf(" ");
                        const head = sp > 0 ? line.slice(0, sp) : line;
                        const tail = sp > 0 ? line.slice(sp + 1) : "";
                        return (
                          <div key={i} className="sector-html-sc-item">
                            <div style={{ fontSize: 16, marginBottom: 4 }} aria-hidden>
                              {head}
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t)", lineHeight: 1.35 }}>{tail}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      );
    }

    const sig = isAr ? rich.aiSignalsAr : rich.aiSignalsEn;

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
          {sig && sig.length > 0 ? (
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "var(--tm)", marginBottom: 8 }}>{tr.sectorAiSignals}</div>
              <ul style={{ margin: 0, paddingInlineStart: 20, color: "var(--td)", lineHeight: 1.7, fontSize: 14 }}>
                {sig.map((line, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  if (part === "bottom") {
    const linesAr = rich.analyticLinesAr;
    const linesEn = rich.analyticLinesEn;
    const metricGlossary = [
      tr.sectorMetricGlossaryAov,
      tr.sectorMetricGlossaryCtr,
      tr.sectorMetricGlossaryCvr,
      tr.sectorMetricGlossaryMargin,
    ];

    const trackingBlockHtml = (
      <div className="sector-html-trigger-pills" role="list">
        {triggers.map((tg, i) => (
          <span key={i} className="sector-html-tpill" role="listitem">
            {isAr ? tg.ar : tg.en}
          </span>
        ))}
      </div>
    );

    const trackingBlockPlain = (
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
    );

    const dashboardBlock =
      html && rich.analyticBarPcts ? (
        <div ref={barsRef} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: "var(--tm)", marginBottom: 4, marginTop: 0 }}>{tr.sectorAnalyticsKpis}</p>
          <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(2, 1fr)" }}>
            {rich.analyticKpis.map((k, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid var(--b2)",
                  background: "color-mix(in srgb, var(--p) 8%, transparent)",
                }}
              >
                <div className="sector-html-kpiv sh-en" style={{ fontSize: "1.25rem" }}>
                  {isAr ? k.ar : k.en}
                </div>
                <div className="sector-html-kpil" style={{ fontSize: 10 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span>{[tr.sectorAnalyticsBarAov, tr.sectorAnalyticsBarCtr, tr.sectorAnalyticsBarCvr, tr.sectorAnalyticsBarMargin][i] ?? ""}</span>
                    <button
                      type="button"
                      aria-label={tr.sectorMetricGlossaryTitle}
                      title={metricGlossary[i] ?? ""}
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        border: "1px solid var(--b2)",
                        background: "var(--s1)",
                        color: "var(--p)",
                        fontSize: 9,
                        fontWeight: 800,
                        lineHeight: "12px",
                        textAlign: "center",
                        cursor: "help",
                        padding: 0,
                      }}
                    >
                      i
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 16px", borderRadius: 14, border: "1px solid var(--b2)", background: "var(--s1)", position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "linear-gradient(90deg, var(--p), color-mix(in srgb, var(--p) 60%, #22d3ee), #00d4a0)",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span className="sh-en" style={{ fontSize: 11, color: "var(--td)" }}>
                {isAr ? "لوحة الأداء" : "Live dashboard"}
              </span>
              <span className="sh-en" style={{ fontSize: 10, color: "#00d4a0", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4a0" }} />
                {tr.sectorDashboardLive}
              </span>
            </div>
            <div className="sector-html-bars">
              {[
                { cls: "sector-html-bf1", lbl: tr.sectorAnalyticsBarAov, pct: rich.analyticBarPcts[0] },
                { cls: "sector-html-bf2", lbl: tr.sectorAnalyticsBarCtr, pct: rich.analyticBarPcts[1] },
                { cls: "sector-html-bf3", lbl: tr.sectorAnalyticsBarCvr, pct: rich.analyticBarPcts[2] },
                { cls: "sector-html-bf4", lbl: tr.sectorAnalyticsBarMargin, pct: rich.analyticBarPcts[3] },
              ].map((row, i) => (
                <div key={i} className="sector-html-b-row">
                  <div className="sector-html-b-lbl sh-en" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span>{row.lbl}</span>
                    <button
                      type="button"
                      aria-label={tr.sectorMetricGlossaryTitle}
                      title={metricGlossary[i] ?? ""}
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        border: "1px solid var(--b2)",
                        background: "var(--s1)",
                        color: "var(--p)",
                        fontSize: 9,
                        fontWeight: 800,
                        lineHeight: "12px",
                        textAlign: "center",
                        cursor: "help",
                        padding: 0,
                      }}
                    >
                      i
                    </button>
                  </div>
                  <div className="sector-html-b-track">
                    <div className={`sector-html-b-fill ${row.cls}`} data-w={String(row.pct)} />
                  </div>
                  <div className="sector-html-b-val sh-en">{row.pct}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
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
      );

    const analyticsBlockFull = (
      <>
        <p style={{ fontSize: 12, fontWeight: 800, color: "var(--tm)", marginBottom: 8, marginTop: 0 }}>{tr.sectorAnalyticsNarrative}</p>
        {linesAr && linesEn ? (
          <ul style={{ margin: "0 0 14px", paddingInlineStart: 18, color: "var(--td)", lineHeight: 1.65, fontSize: 13 }}>
            {(isAr ? linesAr : linesEn).map((line, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                {line}
              </li>
            ))}
          </ul>
        ) : null}
        <p style={{ fontSize: 12, fontWeight: 800, color: "var(--tm)", marginBottom: 8 }}>{tr.sectorAnalyticsKpis}</p>
        {dashboardBlock}
      </>
    );

    if (html) {
      return (
        <div id="section-metrics" className="gc rv d2" style={{ padding: 0, marginBottom: 16, scrollMarginTop: 120 }}>
          <div className="shine" />
          <div style={{ padding: "22px 24px 26px" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 16, marginTop: 0 }}>{tr.sectorSectionMetrics}</h2>
            {trackingBlockHtml}
            {dashboardBlock}
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
            {trackingBlockPlain}
          </div>
        </div>

        <div id="section-analytics" className="gc rv d1" style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
          <div className="shine" />
          <div style={{ padding: "22px 24px 26px" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 12, marginTop: 0 }}>{tr.sectorSectionAnalytics}</h2>
            {analyticsBlockFull}
          </div>
        </div>
      </>
    );
  }

  if (part === "foot") {
    return (
      <>
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

  return null;
}
