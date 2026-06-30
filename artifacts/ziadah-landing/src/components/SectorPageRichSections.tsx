import { useEffect, useRef, useState } from "react";
import { useSiteT } from "@/cms/siteContent";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SectorPageRich, SectorWhyCard, SectorWhyCardSplit } from "@/data/sectorPageTypes";
import PlatformModal from "@/components/PlatformModal";

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
          <div id="section-why" className="rv d2 rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all mb-5" style={{ scrollMarginTop: 120 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 leading-tight mb-3.5 mt-0">{tr.sectorSectionWhy}</h2>
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
                      <p className="sector-html-wc-desc text-zinc-600 m-0 text-[13px] leading-[1.65]">
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
        <div id="section-why" className="rv d2 rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all mb-5" style={{ scrollMarginTop: 120 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 leading-tight mb-3.5 mt-0">{tr.sectorSectionWhy}</h2>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}>
            {rich.whyCards.map((w, i) => (
              <div key={i} className="rv flex items-start gap-2.5 rounded-2xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:shadow-card transition-all">
                <span className="text-xl leading-tight" aria-hidden>
                  {w.emoji}
                </span>
                <div className="m-0 text-sm text-zinc-600 leading-[1.65]">
                  {isWhySplit(w) ? (
                    <>
                      <div className="font-extrabold mb-1 text-zinc-950">{isAr ? w.titleAr : w.titleEn}</div>
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
    const recLines = (isAr ? rich.aiRecsAr : rich.aiRecsEn).map((s) => {
      const lastSpace = s.lastIndexOf(" ");
      const tail = lastSpace > 0 ? s.slice(lastSpace + 1) : "";
      if (tail && (/[%٪]/.test(tail) || /^\d/.test(tail))) {
        return { name: s.slice(0, lastSpace).trim(), pct: tail };
      }
      return { name: s, pct: "" };
    });

    const profileCard = (
      <div className="relative overflow-hidden rounded-2xl px-5 py-[18px]" style={{ border: "1px solid var(--b2)", background: "var(--s1)" }}>
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: "linear-gradient(90deg, var(--p), color-mix(in srgb, var(--p) 70%, #f59e0b), #f59e0b)",
          }}
        />
        <div className="flex items-center gap-3 mb-3.5">
          <div
            className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-xl"
            style={{
              background: "linear-gradient(135deg, var(--p), color-mix(in srgb, var(--p) 70%, #f59e0b))",
            }}
            aria-hidden
          >
            👤
          </div>
          <div>
            <div className="text-sm font-extrabold text-zinc-950">{isAr ? "ملف العميل الذكي" : "Smart customer profile"}</div>
            <div className="sh-en text-[11px] text-zinc-600">
              {isAr ? "يتحدث مع كل طلب" : "Updates with every order"}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {(isAr ? rich.aiProfileTagsAr : rich.aiProfileTagsEn).split("|").map((tag, ti) => (
            <span
              key={ti}
              className="sh-en text-[11px] px-2.5 py-1 rounded-full text-zinc-950"
              style={{
                border: "1px solid var(--b2)",
                background: "rgba(124, 58, 237,.08)",
              }}
            >
              {tag.trim()}
            </span>
          ))}
        </div>
        <div className="sector-html-pc-recs-label sh-en">{tr.sectorAiRecsPersonalizedLabel}</div>
        <div className="flex flex-col gap-2">
          {recLines.map((r, ri) => (
            <div key={ri} className="sector-html-pc-rec">
              <span className="flex-1 text-xs font-bold text-zinc-950 leading-[1.35]">{r.name}</span>
              {r.pct ? <span className="sector-html-pcr-match sh-en">{r.pct}</span> : null}
            </div>
          ))}
        </div>
      </div>
    );

    if (html && rich.aiCompactPoints) {
      return (
        <div id="sector-ai-context" className="rv d1 rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all mb-5" style={{ scrollMarginTop: 120 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 leading-tight mb-3 mt-0">{tr.sectorSectionAiContext}</h2>
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
      );
    }

    const layers = rich.aiLayers;

    if (html && layers) {
      const sigLines = isAr ? rich.aiSignalsAr ?? [] : rich.aiSignalsEn ?? [];

      return (
        <div id="sector-ai-context" className="rv d1 rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all mb-5" style={{ scrollMarginTop: 120 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 leading-tight mb-3 mt-0">{tr.sectorSectionAiContext}</h2>
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
                <div className="rounded-2xl px-[18px] py-4" style={{ border: "1px solid var(--b2)", background: "var(--s1)" }}>
                  <div className="sector-html-sc-head sh-en">{tr.sectorAiSignalsTrackedHead}</div>
                  <div className="sector-html-sc-grid">
                    {sigLines.map((line, i) => {
                      const sp = line.indexOf(" ");
                      const head = sp > 0 ? line.slice(0, sp) : line;
                      const tail = sp > 0 ? line.slice(sp + 1) : "";
                      return (
                        <div key={i} className="sector-html-sc-item">
                          <div className="text-base mb-1" aria-hidden>
                            {head}
                          </div>
                          <div className="text-xs font-bold text-zinc-950 leading-[1.35]">{tail}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    }

    const sig = isAr ? rich.aiSignalsAr : rich.aiSignalsEn;

    return (
      <div id="sector-ai-context" className="rv d1 rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all mb-5" style={{ scrollMarginTop: 120 }}>
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 leading-tight mb-3 mt-0">{tr.sectorSectionAiContext}</h2>
        <div className="mb-4 px-4 py-3.5 rounded-xl" style={{ border: "1px solid var(--b2)", background: "rgba(124, 58, 237,.04)" }}>
          <div className="text-xs font-extrabold text-zinc-700 mb-2">{tr.sectorAiProfile}</div>
          <p className="m-0 text-sm text-zinc-950 leading-[1.65]">{isAr ? rich.aiProfileTagsAr : rich.aiProfileTagsEn}</p>
        </div>
        <div className="mb-4">
          <div className="text-xs font-extrabold text-zinc-700 mb-2">{tr.sectorAiRecs}</div>
          <ul className="m-0 ps-5 text-zinc-600 text-sm leading-[1.7]">
            {(isAr ? rich.aiRecsAr : rich.aiRecsEn).map((line, i) => (
              <li key={i} className="mb-1.5">
                {line}
              </li>
            ))}
          </ul>
        </div>
        {sig && sig.length > 0 ? (
          <div>
            <div className="text-xs font-extrabold text-zinc-700 mb-2">{tr.sectorAiSignals}</div>
            <ul className="m-0 ps-5 text-zinc-600 text-sm leading-[1.7]">
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
    const detectMetricType = (txt: string): "aov" | "basketAov" | "attachment" | "ctr" | "cvr" | "margin" => {
      const s = txt.toLowerCase();
      if (s.includes("combo") || s.includes("bundle") || s.includes("ecosystem") || s.includes("سلة")) return "basketAov";
      if (s.includes("attachment") || s.includes("attach") || s.includes("الإرفاق")) return "attachment";
      if (s.includes("ctr") || s.includes("النقر")) return "ctr";
      if (s.includes("cvr") || s.includes("التحويل")) return "cvr";
      if (s.includes("margin") || s.includes("الهامش")) return "margin";
      return "aov";
    };
    const metricMetaByType = {
      aov: { label: tr.sectorAnalyticsBarAov, glossary: tr.sectorMetricGlossaryAov },
      basketAov: { label: tr.sectorAnalyticsBarBasketAov, glossary: tr.sectorMetricGlossaryBasketAov },
      attachment: { label: tr.sectorAnalyticsBarAttachment, glossary: tr.sectorMetricGlossaryAttachment },
      ctr: { label: tr.sectorAnalyticsBarCtr, glossary: tr.sectorMetricGlossaryCtr },
      cvr: { label: tr.sectorAnalyticsBarCvr, glossary: tr.sectorMetricGlossaryCvr },
      margin: { label: tr.sectorAnalyticsBarMargin, glossary: tr.sectorMetricGlossaryMargin },
    } as const;
    const metricMeta = rich.analyticKpis.map((k) => {
      const source = isAr ? k.ar : k.en;
      const type = detectMetricType(source);
      return metricMetaByType[type];
    });
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
              boxShadow: "0 12px 28px rgba(0,0,0,.24)",
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
          <p className="text-xs font-extrabold text-zinc-700 mb-1 mt-0">{tr.sectorAnalyticsKpis}</p>
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {rich.analyticKpis.map((k, i) => (
              <div
                key={i}
                className="px-3 py-2.5 rounded-[10px]"
                style={{
                  border: "1px solid var(--b2)",
                  background: "color-mix(in srgb, var(--p) 8%, transparent)",
                }}
              >
                <div className="sector-html-kpiv sh-en text-xl">
                  {isAr ? k.ar : k.en}
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
        <p className="text-xs font-extrabold text-zinc-700 mb-2 mt-0">{tr.sectorAnalyticsNarrative}</p>
        {linesAr && linesEn ? (
          <ul className="mt-0 mx-0 mb-3.5 ps-[18px] text-zinc-600 leading-[1.65] text-[13px]">
            {(isAr ? linesAr : linesEn).map((line, i) => (
              <li key={i} className="mb-1.5">
                {line}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="text-xs font-extrabold text-zinc-700 mb-2">{tr.sectorAnalyticsKpis}</p>
        {dashboardBlock}
      </>
    );

    if (html) {
      return (
        <div id="section-metrics" className="rv d2 rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all mb-4" style={{ scrollMarginTop: 120 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 leading-tight mb-4 mt-0">{tr.sectorSectionMetrics}</h2>
          {trackingBlockHtml}
          {dashboardBlock}
        </div>
      );
    }

    return (
      <>
        <div id="section-tracking" className="rv d2 rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all mb-5" style={{ scrollMarginTop: 120 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 leading-tight mb-3 mt-0">{tr.sectorSectionTracking}</h2>
          {trackingBlockPlain}
        </div>

        <div id="section-analytics" className="rv d1 rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all mb-5" style={{ scrollMarginTop: 120 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 leading-tight mb-3 mt-0">{tr.sectorSectionAnalytics}</h2>
          {analyticsBlockFull}
        </div>
      </>
    );
  }

  if (part === "foot") {
    return (
      <>
        <div id="section-sector-cta" className="rv d1 rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all mb-5 text-center" style={{ scrollMarginTop: 120 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 leading-tight mb-2.5 mt-0">{isAr ? rich.ctaHeadlineAr : rich.ctaHeadlineEn}</h2>
          <p className="mt-0 mx-auto mb-5 text-[15px] text-zinc-700 leading-[1.75] max-w-[560px]">{isAr ? rich.ctaSubAr : rich.ctaSubEn}</p>
          <div className="sector-html-cta-row justify-center">
            <button
              type="button"
              className="sector-html-btn sector-html-btn--fire"
              onClick={() => setPlatformModalOpen(true)}
            >
              🚀 {isAr ? "فعّل الآن" : "Activate Now"}
            </button>
          </div>
        </div>
        <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
      </>
    );
  }

  return null;
}
