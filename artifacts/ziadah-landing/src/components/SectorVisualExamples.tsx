import { Fragment, useMemo, useState, type CSSProperties } from "react";
import { useSiteContentMap, useSiteT } from "@/cms/siteContent";
import { useLanguage } from "@/i18n/LanguageContext";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";
import type { Translations } from "@/i18n/translations";
import { navigateTo } from "@/components/PageTransition";
import DraggableMarqueeRow from "@/components/DraggableMarqueeRow";
import type { SectorScenarioOverlayKind, SectorVisualBundle, SectorVisualScenario } from "@/data/sectorVisuals";

type SectorPageT = Translations["sectorsPage"];

/** #RRGGBB → "r,g,b" لنفس تدرجات بطاقات الويدجت */
function hexToRgbTuple(hex: string): string {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const n = parseInt(h, 16);
  if (Number.isNaN(n) || h.length !== 6) return "34, 197, 125";
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `${r},${g},${b}`;
}

function overlayKindShort(kind: SectorScenarioOverlayKind, isAr: boolean): string {
  const map = {
    modal: isAr ? "مودال" : "Modal",
    sheet: isAr ? "شريط سفلي" : "Bottom sheet",
    toast: isAr ? "توست" : "Toast",
    banner: isAr ? "بانر" : "Banner",
  };
  return map[kind];
}

/** معاينة مدمجة بنفس أسلوب واجهة الويدجت — منتجات من القطاع */
function SectorWidgetMiniPreview({
  s,
  tr,
  isAr,
  rgb,
}: {
  s: SectorVisualScenario;
  tr: SectorPageT;
  isAr: boolean;
  rgb: string;
}) {
  const main = s.main;
  const accent = s.accent;
  const kind = s.overlayKind;

  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "var(--s1)",
        border: `1px solid rgba(${rgb},0.22)`,
        boxShadow: `0 8px 28px rgba(${rgb},0.12), inset 0 1px 0 rgba(255,255,255,0.06)`,
        width: "100%",
        maxWidth: 320,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          padding: "9px 12px",
          background: `linear-gradient(135deg, rgba(${rgb},0.14) 0%, rgba(${rgb},0.03) 100%)`,
          borderBottom: `1px solid rgba(${rgb},0.12)`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: `rgba(${rgb},0.45)` }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: `rgba(${rgb},0.35)` }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: `rgba(${rgb},0.25)` }} />
        </div>
        <div style={{ flex: 1, textAlign: "center", minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "var(--t)", letterSpacing: 0.2 }}>
            {isAr ? s.widgetAr : s.widgetEn}
          </div>
          <div style={{ fontSize: 9, color: "var(--tm)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {isAr ? s.placementAr : s.placementEn}
          </div>
        </div>
        <div style={{ width: 24 }} />
      </div>
      <div style={{ padding: 10, direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: "var(--td)", marginBottom: 6 }}>{tr.vizMainLabel}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 10px",
            borderRadius: 11,
            background: "rgba(0,0,0,.06)",
            border: `1px solid ${accent}40`,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: `linear-gradient(145deg, ${accent}35, rgba(0,0,0,.08))`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            {main.emoji}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 800, lineHeight: 1.3, color: "var(--t)" }}>{isAr ? main.nameAr : main.nameEn}</div>
            {main.price ? (
              <div style={{ fontSize: 11, fontWeight: 800, color: accent, marginTop: 2 }}>{main.price}</div>
            ) : null}
          </div>
        </div>
        <div
          style={{
            margin: "10px 0 6px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 9,
            fontWeight: 800,
            color: `rgba(${rgb},1)`,
          }}
        >
          <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, rgba(${rgb},.4), transparent)` }} />
          {tr.vizAiLabel}
          <span style={{ flex: 1, height: 1, background: `linear-gradient(270deg, rgba(6,182,212,.35), transparent)` }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {s.suggested.map((p, j) => (
            <div
              key={j}
              style={{
                padding: "7px 8px",
                borderRadius: 10,
                background: "rgba(6,182,212,.07)",
                border: "1px solid rgba(6,182,212,.2)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 18 }}>{p.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--tm)", lineHeight: 1.3 }}>{isAr ? p.nameAr : p.nameEn}</div>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#06b6d4", marginTop: 2 }}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>
        {kind ? (
          <div
            style={{
              marginTop: 10,
              padding: "6px 8px",
              borderRadius: 8,
              background: `rgba(${rgb},0.09)`,
              border: `1px dashed rgba(${rgb},0.28)`,
              fontSize: 9,
              fontWeight: 800,
              color: "var(--tm)",
              textAlign: "center",
            }}
          >
            {tr.vizWidgetLabel}: {isAr ? s.widgetAr : s.widgetEn} · {overlayKindShort(kind, isAr)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SectorScenarioWidgetShowcaseCard({
  s,
  tr,
  isAr,
  lang,
  dir,
}: {
  s: SectorVisualScenario;
  tr: SectorPageT;
  isAr: boolean;
  lang: string;
  dir: "rtl" | "ltr";
}) {
  const rgb = hexToRgbTuple(s.accent);
  const title = isAr ? s.titleAr : s.titleEn;
  const desc = isAr ? s.contextAr : s.contextEn;
  const icon = s.main.emoji;

  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "16px",
        borderRadius: 18,
        background: `linear-gradient(160deg, rgba(${rgb},0.14) 0%, rgba(${rgb},0.03) 45%, rgba(12,10,30,0) 100%)`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid rgba(${rgb},0.3)`,
        boxShadow: `0px 18px 10px 0px rgba(0,0,0,0.1), inset 0px 1px 0px 0px rgba(255,255,255,0.12), 0px 0px 5px 0px rgba(${rgb},0.1)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          direction: dir,
          flexDirection: "row",
          padding: "4px 0",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: `rgba(${rgb},.12)`,
            border: `1px solid rgba(${rgb},.28)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0,
            boxShadow: `0 0 12px rgba(${rgb},.15)`,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1, textAlign: "start", minWidth: 0 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 900,
              color: `rgba(${rgb},1)`,
              letterSpacing: "-0.3px",
              lineHeight: 1.25,
              textShadow: `0 0 20px rgba(${rgb},.35)`,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 11, color: "var(--tm)", lineHeight: 1.5, marginTop: 4 }}>{desc}</div>
        </div>
      </div>
      <SectorWidgetMiniPreview s={s} tr={tr} isAr={isAr} rgb={rgb} />
      {s.relatedUseCaseHref ? (
        <button
          type="button"
          onClick={() => navigateTo(s.relatedUseCaseHref!)}
          style={{
            width: "100%",
            padding: "9px 10px",
            borderRadius: 10,
            background: `rgba(${rgb},0.12)`,
            border: `1px solid rgba(${rgb},0.28)`,
            color: `rgba(${rgb},1)`,
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "var(--font)",
          }}
        >
          {tr.sectorVisualUseCaseCta} →
        </button>
      ) : null}
    </div>
  );
}

export default function SectorVisualExamples({
  bundle,
  introVariant = "default",
  sectorSlug = "",
}: {
  bundle: SectorVisualBundle;
  introVariant?: "default" | "sector";
  /** Sector id for `ar.sectorVisual.<slug>.*` content keys (from route). */
  sectorSlug?: string;
}) {
  const t = useSiteT();
  const map = useSiteContentMap();
  const { lang, isAr, dir } = useLanguage();
  const tr = t[lang].sectorsPage;
  const svText = (parts: string[], fallback: string) => {
    if (!sectorSlug) return fallback;
    const k = cmsKey(lang, "sectorVisual", sectorSlug, ...parts);
    const v = map[k];
    return v !== undefined && v !== "" ? v : fallback;
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = Math.min(activeIndex, bundle.scenarios.length - 1);
  const activeScenario = bundle.scenarios[safeIndex];
  const canMove = bundle.scenarios.length > 1;
  const progress = useMemo(() => `${safeIndex + 1}/${bundle.scenarios.length}`, [safeIndex, bundle.scenarios.length]);

  const jumpTo = (index: number) => setActiveIndex(index);
  const next = () => setActiveIndex((prev) => (prev + 1) % bundle.scenarios.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + bundle.scenarios.length) % bundle.scenarios.length);

  const scenarios = bundle.scenarios;
  const rowA = scenarios.filter((_, i) => i % 2 === 0);
  const rowB = scenarios.filter((_, i) => i % 2 === 1);
  const rowBEffective = rowB.length > 0 ? rowB : scenarios;

  if (introVariant === "sector") {
    return (
      <div className="sector-viz-root sector-viz-root--widget-style">
        <p className="sector-viz-lead rv d1" style={{ margin: "0 0 20px", fontSize: 14, color: "var(--tm)", lineHeight: 1.75 }}>
          <Editable contentKey={cmsKey(lang, "sectorsPage", "sectorHubExamplesEmbedSub")} label="Sector examples intro" type="text">
            {(() => {
              const k = cmsKey(lang, "sectorsPage", "sectorHubExamplesEmbedSub");
              const v = map[k];
              return v !== undefined && v !== "" ? v : tr.sectorHubExamplesEmbedSub;
            })()}
          </Editable>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 28 }}>
          <DraggableMarqueeRow directionClass="marquee-rtl" duration="36s">
            {[0, 1, 2].map((seg) => (
              <div key={seg} className="marquee-segment">
                {rowA.map((s, i) => (
                  <SectorScenarioWidgetShowcaseCard key={`a-${seg}-${i}-${s.titleEn}`} s={s} tr={tr} isAr={isAr} lang={lang} dir={dir} />
                ))}
              </div>
            ))}
          </DraggableMarqueeRow>
          <DraggableMarqueeRow directionClass="marquee-ltr" duration="34s">
            {[0, 1, 2].map((seg) => (
              <div key={seg} className="marquee-segment">
                {rowBEffective.map((s, i) => (
                  <SectorScenarioWidgetShowcaseCard key={`b-${seg}-${i}-${s.titleEn}`} s={s} tr={tr} isAr={isAr} lang={lang} dir={dir} />
                ))}
              </div>
            ))}
          </DraggableMarqueeRow>
        </div>
        <div className={`gc rv d2 sector-viz-flow-wrap`} style={{ padding: 0, marginTop: 8, overflow: "hidden" }}>
          <div className="shine" />
          <div style={{ padding: "var(--card-pad-lg)" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: "var(--p3)", textTransform: "uppercase" }}>
                <Editable contentKey={cmsKey(lang, "sectorsPage", "sectionFlowTag")} label="Flow tag" type="text">
                  {(() => {
                    const k = cmsKey(lang, "sectorsPage", "sectionFlowTag");
                    const v = map[k];
                    return v !== undefined && v !== "" ? v : tr.sectionFlowTag;
                  })()}
                </Editable>
              </div>
              <h3 style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 900, margin: "10px 0 8px" }}>
                <Editable contentKey={cmsKey(lang, "sectorsPage", "sectionFlowTitle")} label="Flow title" type="text">
                  {(() => {
                    const k = cmsKey(lang, "sectorsPage", "sectionFlowTitle");
                    const v = map[k];
                    return v !== undefined && v !== "" ? v : tr.sectionFlowTitle;
                  })()}
                </Editable>
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: "var(--td)" }}>
                <Editable contentKey={cmsKey(lang, "sectorsPage", "sectionFlowSub")} label="Flow subtitle" type="text">
                  {(() => {
                    const k = cmsKey(lang, "sectorsPage", "sectionFlowSub");
                    const v = map[k];
                    return v !== undefined && v !== "" ? v : tr.sectionFlowSub;
                  })()}
                </Editable>
              </p>
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
                        background: "rgba(34, 197, 125,.12)",
                        border: "1px solid rgba(34, 197, 125,.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 26,
                        marginBottom: 12,
                      }}
                    >
                      {step.icon}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>
                      <Editable
                        contentKey={cmsKey(lang, "sectorVisual", sectorSlug, "flow", String(i), "title")}
                        label={`Flow step ${i + 1} title`}
                        type="text"
                      >
                        {svText(["flow", String(i), "title"], isAr ? step.titleAr : step.titleEn)}
                      </Editable>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: "var(--tm)", lineHeight: 1.65 }}>
                      <Editable
                        contentKey={cmsKey(lang, "sectorVisual", sectorSlug, "flow", String(i), "desc")}
                        label={`Flow step ${i + 1} description`}
                        type="text"
                      >
                        {svText(["flow", String(i), "desc"], isAr ? step.descAr : step.descEn)}
                      </Editable>
                    </p>
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

  return (
    <div className="sector-viz-root">
      <p className="sector-viz-lead rv d1" style={{ margin: "0 0 20px", fontSize: 14, color: "var(--tm)", lineHeight: 1.75 }}>
        <Editable contentKey={cmsKey(lang, "sectorsPage", "sectionExamplesSub")} label="Sector examples section lead" type="text">
          {(() => {
            const k = cmsKey(lang, "sectorsPage", "sectionExamplesSub");
            const v = map[k];
            return v !== undefined && v !== "" ? v : tr.sectionExamplesSub;
          })()}
        </Editable>
      </p>

      <div className="rv d1" style={{ marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {bundle.scenarios.map((s, i) => {
          const isActive = i === safeIndex;
          return (
            <button
              key={i}
              type="button"
              onClick={() => jumpTo(i)}
              style={{
                borderRadius: 999,
                border: isActive ? "1px solid rgba(34, 197, 125,.45)" : "1px solid var(--b2)",
                background: isActive ? "rgba(34, 197, 125,.14)" : "transparent",
                color: isActive ? "var(--p3)" : "var(--tm)",
                fontWeight: 700,
                fontSize: 12,
                padding: "8px 12px",
                fontFamily: "var(--font)",
                cursor: "pointer",
              }}
            >
              <Editable
                contentKey={cmsKey(lang, "sectorVisual", sectorSlug, "scenarios", String(i), "title")}
                label={`Scenario ${i + 1} title`}
                type="text"
              >
                {svText(["scenarios", String(i), "title"], isAr ? s.titleAr : s.titleEn)}
              </Editable>
            </button>
          );
        })}
      </div>

      <div className="rv d2" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: "var(--td)", fontWeight: 700 }}>
          {progress}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={prev}
            disabled={!canMove}
            style={{
              borderRadius: 10,
              border: "1px solid var(--b2)",
              background: "var(--s1)",
              color: "var(--t)",
              fontWeight: 700,
              fontSize: 12,
              padding: "6px 10px",
              cursor: canMove ? "pointer" : "not-allowed",
              opacity: canMove ? 1 : 0.5,
            }}
          >
            {isAr ? "السابق" : "Prev"}
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canMove}
            style={{
              borderRadius: 10,
              border: "1px solid rgba(34, 197, 125,.35)",
              background: "rgba(34, 197, 125,.12)",
              color: "var(--p3)",
              fontWeight: 700,
              fontSize: 12,
              padding: "6px 10px",
              cursor: canMove ? "pointer" : "not-allowed",
              opacity: canMove ? 1 : 0.5,
            }}
          >
            {isAr ? "التالي" : "Next"}
          </button>
        </div>
      </div>

      <div className="sector-viz-scenarios">
        <ScenarioCard scenario={activeScenario} tr={tr} isAr={isAr} delayClass="d1" onOpenUseCase={navigateTo} />
      </div>

      <div className="rv d2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginTop: 12 }}>
        {bundle.scenarios.map((s, i) => {
          const isActive = i === safeIndex;
          return (
            <button
              key={`preview-${i}`}
              type="button"
              onClick={() => jumpTo(i)}
              style={{
                borderRadius: 14,
                border: isActive ? `1px solid ${s.accent}88` : "1px solid var(--b1)",
                background: "var(--s1)",
                padding: 0,
                cursor: "pointer",
                overflow: "hidden",
                textAlign: "inherit",
              }}
            >
              <div
                style={{
                  height: 74,
                  background: `linear-gradient(135deg, ${s.accent}44, rgba(6,182,212,.2))`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                }}
              >
                <span style={{ fontSize: 24 }}>{s.main.emoji}</span>
                <span style={{ fontSize: 20 }}>{s.suggested[0]?.emoji ?? "✨"}</span>
              </div>
              <div style={{ padding: "9px 10px", fontSize: 12, fontWeight: 700, color: isActive ? "var(--p3)" : "var(--tm)" }}>
                <Editable
                  contentKey={cmsKey(lang, "sectorVisual", sectorSlug, "scenarios", String(i), "widget")}
                  label={`Scenario ${i + 1} widget label`}
                  type="text"
                >
                  {svText(["scenarios", String(i), "widget"], isAr ? s.widgetAr : s.widgetEn)}
                </Editable>
              </div>
            </button>
          );
        })}
      </div>

      <div className={`gc rv d2 sector-viz-flow-wrap`} style={{ padding: 0, marginTop: 28, overflow: "hidden" }}>
        <div className="shine" />
        <div style={{ padding: "var(--card-pad-lg)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: "var(--p3)", textTransform: "uppercase" }}>
              <Editable contentKey={cmsKey(lang, "sectorsPage", "sectionFlowTag")} label="Flow tag" type="text">
                {(() => {
                  const k = cmsKey(lang, "sectorsPage", "sectionFlowTag");
                  const v = map[k];
                  return v !== undefined && v !== "" ? v : tr.sectionFlowTag;
                })()}
              </Editable>
            </div>
            <h3 style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 900, margin: "10px 0 8px" }}>
              <Editable contentKey={cmsKey(lang, "sectorsPage", "sectionFlowTitle")} label="Flow title" type="text">
                {(() => {
                  const k = cmsKey(lang, "sectorsPage", "sectionFlowTitle");
                  const v = map[k];
                  return v !== undefined && v !== "" ? v : tr.sectionFlowTitle;
                })()}
              </Editable>
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--td)" }}>
              <Editable contentKey={cmsKey(lang, "sectorsPage", "sectionFlowSub")} label="Flow subtitle" type="text">
                {(() => {
                  const k = cmsKey(lang, "sectorsPage", "sectionFlowSub");
                  const v = map[k];
                  return v !== undefined && v !== "" ? v : tr.sectionFlowSub;
                })()}
              </Editable>
            </p>
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
                      background: "rgba(34, 197, 125,.12)",
                      border: "1px solid rgba(34, 197, 125,.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                      marginBottom: 12,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>
                    <Editable
                      contentKey={cmsKey(lang, "sectorVisual", sectorSlug, "flow", String(i), "title")}
                      label={`Flow step ${i + 1} title`}
                      type="text"
                    >
                      {svText(["flow", String(i), "title"], isAr ? step.titleAr : step.titleEn)}
                    </Editable>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--tm)", lineHeight: 1.65 }}>
                    <Editable
                      contentKey={cmsKey(lang, "sectorVisual", sectorSlug, "flow", String(i), "desc")}
                      label={`Flow step ${i + 1} description`}
                      type="text"
                    >
                      {svText(["flow", String(i), "desc"], isAr ? step.descAr : step.descEn)}
                    </Editable>
                  </p>
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
  onOpenUseCase,
}: {
  scenario: SectorVisualScenario;
  tr: SectorPageT;
  isAr: boolean;
  delayClass: string;
  onOpenUseCase: (path: string) => void;
}) {
  const s = scenario;
  const main = s.main;
  const accent = s.accent;
  const overlayKind = s.overlayKind;
  const hasOverlay = !!overlayKind;

  const screenBody = (
    <>
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
            <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.3, color: "var(--t)" }}>{isAr ? main.nameAr : main.nameEn}</div>
            {main.price ? (
              <div style={{ fontSize: 13, fontWeight: 800, color: accent, marginTop: 4 }}>{main.price}</div>
            ) : null}
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
          <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(34, 197, 125,.4), transparent)" }} />
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
    </>
  );

  return (
    <div className={`gc rv ${delayClass} sector-viz-card`} style={{ padding: 0, overflow: "hidden" }}>
      <div className="shine" />
      <div style={{ height: 4, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      <div style={{ padding: "var(--card-pad-md)" }}>
        <div style={{ marginBottom: 14 }}>
          <h3 style={{ fontSize: 17, fontWeight: 900, margin: "0 0 6px", color: "var(--t)" }}>{isAr ? s.titleAr : s.titleEn}</h3>
          <p style={{ margin: 0, fontSize: 13, color: "var(--td)", lineHeight: 1.55 }}>{isAr ? s.contextAr : s.contextEn}</p>
          {s.relatedUseCaseHref ? (
            <button
              type="button"
              onClick={() => onOpenUseCase(s.relatedUseCaseHref!)}
              style={{
                marginTop: 10,
                fontSize: 12,
                fontWeight: 800,
                color: "var(--p3)",
                background: "rgba(34, 197, 125,.1)",
                border: "1px solid rgba(34, 197, 125,.28)",
                borderRadius: 999,
                padding: "6px 12px",
                cursor: "pointer",
                fontFamily: "var(--font)",
              }}
            >
              {tr.sectorVisualUseCaseCta} →
            </button>
          ) : null}
        </div>

        <div
          style={{
            maxWidth: 400,
            margin: "0 auto 14px",
            borderRadius: 28,
            padding: 10,
            background: "linear-gradient(165deg, rgba(255,255,255,.12), rgba(0,0,0,.25))",
            border: "1px solid var(--b1)",
            boxShadow: "0 28px 60px rgba(0,0,0,.35)",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: 22,
              overflow: "hidden",
              minHeight: 400,
              background: "var(--s1)",
              border: "1px solid var(--b1)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${accent}, #06b6d4)`,
                opacity: 0.85,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                borderBottom: "1px solid var(--b1)",
                background: "rgba(0,0,0,.08)",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 800, color: "var(--td)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>9:41</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: "var(--t)", flex: 1, textAlign: "center", minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tr.mockStoreBar}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: accent, flexShrink: 0 }}>{tr.mockCartBadge}</span>
            </div>
            <div
              style={{
                transition: "opacity .25s ease, filter .25s ease",
                opacity: hasOverlay && overlayKind !== "banner" ? 0.32 : hasOverlay && overlayKind === "banner" ? 0.55 : 1,
                filter: hasOverlay && overlayKind !== "banner" ? "blur(0.6px)" : hasOverlay && overlayKind === "banner" ? "blur(0.3px)" : "none",
                pointerEvents: hasOverlay && (overlayKind === "modal" || overlayKind === "sheet") ? "none" : "auto",
              }}
            >
              {screenBody}
            </div>
            {hasOverlay ? <ScenarioUiOverlay kind={overlayKind as SectorScenarioOverlayKind} scenario={s} isAr={isAr} accent={accent} /> : null}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: "var(--td)", marginInlineEnd: 4 }}>{tr.vizWidgetLabel}</span>
          <span style={{ padding: "4px 12px", borderRadius: 50, background: "rgba(34, 197, 125,.12)", border: "1px solid rgba(34, 197, 125,.25)", fontSize: 12, fontWeight: 700, color: "var(--p3)" }}>
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

function ScenarioUiOverlay({
  kind,
  scenario,
  isAr,
  accent,
}: {
  kind: SectorScenarioOverlayKind;
  scenario: SectorVisualScenario;
  isAr: boolean;
  accent: string;
}) {
  const s = scenario;
  const title = isAr ? s.overlayTitleAr : s.overlayTitleEn;
  const body = isAr ? s.overlayBodyAr : s.overlayBodyEn;
  const primary = isAr ? s.overlayPrimaryAr : s.overlayPrimaryEn;
  const secondary = isAr ? s.overlaySecondaryAr : s.overlaySecondaryEn;
  const meta = isAr ? s.overlayMetaAr : s.overlayMetaEn;
  const code = s.overlayCode;
  const pct = s.overlayProgressPct;

  const btnBase: CSSProperties = {
    flex: 1,
    borderRadius: 12,
    fontWeight: 800,
    fontSize: 12,
    padding: "10px 12px",
    cursor: "pointer",
    fontFamily: "var(--font)",
    border: "1px solid var(--b2)",
  };

  if (kind === "toast") {
    return (
      <div style={{ position: "absolute", top: 14, left: 12, right: 12, zIndex: 4, pointerEvents: "none" }}>
        <div
          style={{
            margin: "0 auto",
            maxWidth: 340,
            padding: "11px 14px",
            borderRadius: 14,
            background: "rgba(15,23,42,.94)",
            border: "1px solid rgba(255,255,255,.14)",
            color: "#f8fafc",
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            boxShadow: "0 18px 40px rgba(0,0,0,.45)",
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>✓</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            {title ? <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 4 }}>{title}</div> : null}
            {body ? <div style={{ fontSize: 12, lineHeight: 1.55, opacity: 0.92 }}>{body}</div> : null}
            {meta ? <div style={{ fontSize: 10, marginTop: 8, opacity: 0.75, fontWeight: 700 }}>{meta}</div> : null}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "banner") {
    return (
      <div
        style={{
          position: "absolute",
          top: 46,
          left: 0,
          right: 0,
          zIndex: 3,
          padding: "10px 12px 12px",
          background: `linear-gradient(180deg, ${accent}26, rgba(0,0,0,.15))`,
          borderBottom: "1px solid var(--b1)",
          backdropFilter: "blur(6px)",
        }}
      >
        {title ? (
          <div style={{ fontSize: 13, fontWeight: 900, color: "var(--t)", lineHeight: 1.35 }}>{title}</div>
        ) : null}
        {body ? <div style={{ fontSize: 11, color: "var(--tm)", marginTop: 4, lineHeight: 1.5 }}>{body}</div> : null}
        {typeof pct === "number" ? (
          <div style={{ marginTop: 8, height: 6, borderRadius: 99, background: "rgba(0,0,0,.2)", overflow: "hidden" }}>
            <div style={{ width: `${Math.min(100, Math.max(0, pct))}%`, height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${accent}, #22c55e)` }} />
          </div>
        ) : null}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 8 }}>
          {meta ? <span style={{ fontSize: 10, fontWeight: 800, color: "var(--p3)" }}>{meta}</span> : <span />}
          {primary ? (
            <button type="button" style={{ ...btnBase, flex: "0 0 auto", padding: "7px 14px", background: accent, color: "#fff", border: "none" }}>
              {primary}
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  if (kind === "sheet") {
    return (
      <>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,.48)",
            zIndex: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 4,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            background: "var(--bg)",
            borderTop: "1px solid var(--b1)",
            padding: "10px 16px 18px",
            boxShadow: "0 -16px 40px rgba(0,0,0,.4)",
          }}
        >
          <div style={{ width: 42, height: 5, borderRadius: 99, background: "var(--b2)", margin: "4px auto 12px" }} />
          {meta ? (
            <div style={{ fontSize: 10, fontWeight: 800, color: "var(--p3)", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>{meta}</div>
          ) : null}
          {title ? <div style={{ fontSize: 16, fontWeight: 900, color: "var(--t)", marginBottom: 8 }}>{title}</div> : null}
          {body ? <div style={{ fontSize: 13, color: "var(--td)", lineHeight: 1.6, marginBottom: 14 }}>{body}</div> : null}
          <div style={{ display: "flex", gap: 8 }}>
            {secondary ? (
              <button type="button" style={{ ...btnBase, background: "transparent", color: "var(--tm)" }}>
                {secondary}
              </button>
            ) : null}
            {primary ? (
              <button type="button" style={{ ...btnBase, background: `linear-gradient(135deg,${accent},#22c57d)`, color: "#fff", border: "none" }}>
                {primary}
              </button>
            ) : null}
          </div>
        </div>
      </>
    );
  }

  /* modal */
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 3 }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 300,
            borderRadius: 18,
            background: "var(--bg)",
            border: "1px solid var(--b1)",
            padding: "18px 16px 16px",
            boxShadow: "0 28px 70px rgba(0,0,0,.55)",
          }}
        >
          {meta ? <div style={{ fontSize: 10, fontWeight: 800, color: "var(--p3)", marginBottom: 8 }}>{meta}</div> : null}
          {title ? <div style={{ fontSize: 16, fontWeight: 900, color: "var(--t)", lineHeight: 1.35, marginBottom: 8 }}>{title}</div> : null}
          {body ? <div style={{ fontSize: 13, color: "var(--td)", lineHeight: 1.6, marginBottom: 12 }}>{body}</div> : null}
          {code ? (
            <div
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 15,
                fontWeight: 900,
                letterSpacing: 2,
                textAlign: "center",
                padding: "10px 12px",
                borderRadius: 12,
                background: "rgba(34, 197, 125,.1)",
                border: "1px dashed rgba(34, 197, 125,.35)",
                color: "var(--p3)",
                marginBottom: 12,
              }}
            >
              {code}
            </div>
          ) : null}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {primary ? (
              <button type="button" style={{ ...btnBase, background: `linear-gradient(135deg,${accent},#22c57d)`, color: "#fff", border: "none", width: "100%" }}>
                {primary}
              </button>
            ) : null}
            {secondary ? (
              <button type="button" style={{ ...btnBase, background: "transparent", color: "var(--tm)", width: "100%" }}>
                {secondary}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
