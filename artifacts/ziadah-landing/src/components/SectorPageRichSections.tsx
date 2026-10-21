import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SectorPageRich, SectorWhyCard, SectorWhyCardSplit, SectorMetric } from "@/data/sectorPageTypes";
import PlatformModal from "@/components/PlatformModal";
import SectorEngine from "@/components/SectorEngine";
import { t as siteTranslations } from "@/i18n/translations";
import { stripLeadIcon } from "@/lib/strip-icon";

type Part = "top" | "ai" | "bottom" | "foot";

function isWhySplit(w: SectorWhyCard): w is SectorWhyCardSplit {
  return "lineAr" in w;
}

export default function SectorPageRichSections({ rich, part }: { rich: SectorPageRich; part: Part }) {
  const t = siteTranslations;
  const { lang } = useLanguage();
  const tr = t[lang].sectorsPage;
  const isAr = lang === "ar";
  const html = Boolean(rich.htmlLayout);
  const [openMetricInfo, setOpenMetricInfo] = useState<string | null>(null);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

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
          <div id="section-why" className="rv d2 sector-block mb-5" style={{ scrollMarginTop: 120 }}>
            <h2 className="section-head-title--sm mb-3.5 mt-0">{tr.sectorSectionWhy}</h2>
            <div className="sector-html-why-grid">
                {rich.whyCards.map((w, i) => (
                  <div key={i} className="sector-html-wcard">
                    {/* `w.emoji` is deliberately unread. It was a decorative
                        category marker - 🧩 🤖 📊 🎛️ - on a card that already
                        carries a title and a line, so it added nothing except
                        the one visual tell this pass exists to remove. The
                        field stays in the data; nothing renders it. */}
                    {isWhySplit(w) ? (
                      <>
                        <div className="sector-html-wc-title">{isAr ? w.titleAr : w.titleEn}</div>
                        <p className="sector-html-wc-line">{isAr ? w.lineAr : w.lineEn}</p>
                      </>
                    ) : (
                      <p className="sector-html-wc-desc m-0 text-[13px] leading-[1.65]">
                        {isAr ? w.textAr : w.textEn}
                      </p>
                    )}
                  </div>
                ))}
              </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div id="section-why" className="rv d2 sector-block mb-5" style={{ scrollMarginTop: 120 }}>
          <h2 className="section-head-title--sm mb-3.5 mt-0">{tr.sectorSectionWhy}</h2>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
            {rich.whyCards.map((w, i) => (
              <div key={i} className="rv sector-card flex items-start gap-2.5">
                <span className="text-xl leading-tight" aria-hidden>
                  {w.emoji}
                </span>
                <div className="sector-card-text">
                  {isWhySplit(w) ? (
                    <>
                      <div className="sector-card-title mb-1">{isAr ? w.titleAr : w.titleEn}</div>
                      <div>{isAr ? w.lineAr : w.lineEn}</div>
                    </>
                  ) : (
                    <p className="m-0">{isAr ? w.textAr : w.textEn}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (part === "ai") {
    if (html) return <SectorEngine rich={rich} />;


    const sig = isAr ? rich.aiSignalsAr : rich.aiSignalsEn;

    return (
      <div id="sector-ai-context" className="rv d1 sector-block mb-5" style={{ scrollMarginTop: 120 }}>
        <h2 className="section-head-title--sm mb-3 mt-0">{tr.sectorSectionAiContext}</h2>
        <div className="mb-4 px-4 py-3.5 rounded-xl" style={{ border: "1px solid var(--b2)", background: "rgba(124, 58, 237,.04)" }}>
          <div className="card-eyebrow mb-2">{tr.sectorAiProfile}</div>
          <p className="sector-card-text">{isAr ? rich.aiProfileTagsAr : rich.aiProfileTagsEn}</p>
        </div>
        <div className="mb-4">
          <div className="card-eyebrow mb-2">{tr.sectorAiRecs}</div>
          <ul className="sector-list sector-list--sm">
            {(isAr ? rich.aiRecsAr : rich.aiRecsEn).map((line, i) => (
              <li key={i} className="mb-1.5">
                {line}
              </li>
            ))}
          </ul>
        </div>
        {sig && sig.length > 0 ? (
          <div>
            <div className="card-eyebrow mb-2">{tr.sectorAiSignals}</div>
            <ul className="sector-list sector-list--sm">
              {sig.map((line, i) => (
                <li key={i} className="mb-1.5">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }

  if (part === "bottom") {
    const linesAr = rich.analyticLinesAr;
    const linesEn = rich.analyticLinesEn;
    /* No more sniffing. Which measure a number is, is data - see the note on
       `analyticKpis`. The label map is exhaustive over `SectorMetric`, so a
       new measure cannot be added without a label and a glossary entry. */
    const metricMetaByType: Record<SectorMetric, { label: string; glossary: string }> = {
      aov: { label: tr.sectorAnalyticsBarAov, glossary: tr.sectorMetricGlossaryAov },
      basketAov: { label: tr.sectorAnalyticsBarBasketAov, glossary: tr.sectorMetricGlossaryBasketAov },
      attachment: { label: tr.sectorAnalyticsBarAttachment, glossary: tr.sectorMetricGlossaryAttachment },
      ctr: { label: tr.sectorAnalyticsBarCtr, glossary: tr.sectorMetricGlossaryCtr },
      cvr: { label: tr.sectorAnalyticsBarCvr, glossary: tr.sectorMetricGlossaryCvr },
      margin: { label: tr.sectorAnalyticsBarMargin, glossary: tr.sectorMetricGlossaryMargin },
      retention: { label: tr.sectorAnalyticsBarRetention, glossary: tr.sectorMetricGlossaryRetention },
      rescue: { label: tr.sectorAnalyticsBarRescue, glossary: tr.sectorMetricGlossaryRescue },
      recurring: { label: tr.sectorAnalyticsBarRecurring, glossary: tr.sectorMetricGlossaryRecurring },
      gift: { label: tr.sectorAnalyticsBarGift, glossary: tr.sectorMetricGlossaryGift },
    };
    const metricMeta = rich.analyticKpis.map((k) => metricMetaByType[k.metric]);
    /* "AOV +32%" / "متوسط الطلب +32%" / "74% CTR" -> "+32%" / "74%". Any
       run of digits with an optional sign and percent, in either numeral
       set. Falls back to the whole string when a KPI carries no figure. */
    const kpiFigure = (txt: string): string => {
      const m = txt.match(/[+\-\u2212]?[\d\u0660-\u0669\u06F0-\u06F9][\d\u0660-\u0669\u06F0-\u06F9.,]*\s*%/);
      return m ? m[0].replace(/\s+/g, "") : txt;
    };
    const metricInfoButton = (key: string, i: number, label: string) => (
      <span className="relative inline-flex items-center">
        <button
          type="button"
          onClick={() => setOpenMetricInfo((v) => (v === key ? null : key))}
          aria-label={`${tr.sectorMetricGlossaryTitle}: ${label}`}
          className="w-3.5 h-3.5 rounded-full text-violet-600 text-[9px] font-extrabold leading-3 text-center cursor-pointer p-0"
          style={{
            border: "1px solid var(--b2)",
            background: "var(--s1)",
          }}
        >
          i
        </button>
        {openMetricInfo === key ? (
          <span
            className="absolute z-30 px-2.5 py-2 rounded-[10px] text-zinc-600 text-[11px] leading-[1.6]"
            style={{
              top: "calc(100% + 6px)",
              insetInlineStart: 0,
              width: "min(280px, 70vw)",
              border: "1px solid var(--b2)",
              background: "var(--bg)",
              boxShadow: "0 12px 28px rgba(0,0,0,.12)",
            }}
          >
            {metricMeta[i]?.glossary ?? ""}
          </span>
        ) : null}
      </span>
    );

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
      <div className="flex flex-wrap gap-2">
        {triggers.map((tg, i) => (
          <span
            key={i}
            className="text-xs font-bold px-3 py-2 rounded-full text-zinc-950"
            style={{
              border: "1px solid var(--b2)",
              background: "var(--s1)",
            }}
          >
            {isAr ? tg.ar : tg.en}
          </span>
        ))}
      </div>
    );

    const dashboardBlock =
      html && rich.analyticBarPcts ? (
        <div ref={barsRef} className="flex flex-col gap-3.5">
          <p className="card-eyebrow mb-1 mt-0">{tr.sectorAnalyticsKpis}</p>
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))" }}>
            {rich.analyticKpis.map((k, i) => (
              <div
                key={i}
                className="px-3 py-2.5 rounded-[10px]"
                style={{
                  border: "1px solid var(--b2)",
                  background: "color-mix(in srgb, var(--p) 8%, transparent)",
                }}
              >
                {/* THE FIGURE ALONE. The authored string carries both the
                    measure and the number - "AOV +32%" - and the caption
                    under it names the measure again, so the card said it
                    twice and the number had to compete with the words for
                    the eye. The figure is pulled out and the caption is left
                    to do its job. */}
                <div className="sector-html-kpiv sh-en text-xl">
                  {kpiFigure(isAr ? k.ar : k.en)}
                </div>
                <div className="sector-html-kpil text-[10px]">
                  <span className="inline-flex items-center gap-1.5">
                    <span>{metricMeta[i]?.label ?? ""}</span>
                    {metricInfoButton(`kpi-${i}`, i, metricMeta[i]?.label ?? "")}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden px-4 py-3.5 rounded-[14px]" style={{ border: "1px solid var(--b2)", background: "var(--s1)" }}>
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background: "linear-gradient(90deg, var(--p), color-mix(in srgb, var(--p) 70%, #a78bfa), #8b5cf6)",
              }}
            />
            <div className="flex justify-between items-center mb-2.5">
              <span className="sh-en text-[11px] text-zinc-600">
                {isAr ? "لوحة الأداء" : "Live dashboard"}
              </span>
              <span className="sh-en text-[10px] flex items-center gap-1.5 text-violet-600">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                {tr.sectorDashboardLive}
              </span>
            </div>
            <div className="sector-html-bars">
              {[
                { cls: "sector-html-bf1", pct: rich.analyticBarPcts[0] },
                { cls: "sector-html-bf2", pct: rich.analyticBarPcts[1] },
                { cls: "sector-html-bf3", pct: rich.analyticBarPcts[2] },
                { cls: "sector-html-bf4", pct: rich.analyticBarPcts[3] },
              ].map((row, i) => (
                <div key={i} className="sector-html-b-row">
                  <div className="sector-html-b-lbl sh-en inline-flex items-center gap-1.5" style={{ width: 78 }}>
                    <span>{metricMeta[i]?.label ?? ""}</span>
                    {metricInfoButton(`bar-${i}`, i, metricMeta[i]?.label ?? "")}
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
        <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))" }}>
          {rich.analyticKpis.map((k, i) => (
            <div
              key={i}
              className="px-3.5 py-3 rounded-xl font-extrabold text-[15px] text-violet-600 text-center"
              style={{
                border: "1px solid var(--b2)",
                background: "linear-gradient(180deg, rgba(124, 58, 237,.08), transparent)",
              }}
            >
              {isAr ? k.ar : k.en}
            </div>
          ))}
        </div>
      );

    const analyticsBlockFull = (
      <>
        <p className="card-eyebrow mb-2 mt-0">{tr.sectorAnalyticsNarrative}</p>
        {linesAr && linesEn ? (
          <ul className="sector-list sector-list--sm mt-0 mx-0 mb-3.5">
            {(isAr ? linesAr : linesEn).map((line, i) => (
              <li key={i} className="mb-1.5">
                {line}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="card-eyebrow mb-2">{tr.sectorAnalyticsKpis}</p>
        {dashboardBlock}
      </>
    );

    /* The measuring half of the sector page now lives in `SectorEngine`. */
    if (html) return null;

    return (
      <>
        <div id="section-tracking" className="rv d2 sector-block mb-5" style={{ scrollMarginTop: 120 }}>
          <h2 className="section-head-title--sm mb-3 mt-0">{tr.sectorSectionTracking}</h2>
          {trackingBlockPlain}
        </div>

        <div id="section-analytics" className="rv d1 sector-block mb-5" style={{ scrollMarginTop: 120 }}>
          <h2 className="section-head-title--sm mb-3 mt-0">{tr.sectorSectionAnalytics}</h2>
          {analyticsBlockFull}
        </div>
      </>
    );
  }

  if (part === "foot") {
    return (
      <>
        <div id="section-sector-cta" className="rv d1 sector-block mb-5 text-center" style={{ scrollMarginTop: 120 }}>
          <h2 className="section-head-title--sm mb-2.5 mt-0">{isAr ? rich.ctaHeadlineAr : rich.ctaHeadlineEn}</h2>
          <p className="sector-card-text mt-0 mx-auto mb-5 max-w-[56rem]">{isAr ? rich.ctaSubAr : rich.ctaSubEn}</p>
          <div className="sector-html-cta-row justify-center">
            <button
              type="button"
              className="sector-html-btn sector-html-btn--fire"
              onClick={() => setPlatformModalOpen(true)}
            >
              {isAr ? "فعّل الآن" : "Activate Now"}
            </button>
          </div>
        </div>
        <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
      </>
    );
  }

  return null;
}
