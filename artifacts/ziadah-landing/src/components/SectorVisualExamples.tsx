import { Fragment, useMemo, useState, type CSSProperties } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Translations } from "@/i18n/translations";
import { navigateTo } from "@/components/PageTransition";
import DraggableMarqueeRow from "@/components/DraggableMarqueeRow";
import type { SectorScenarioOverlayKind, SectorVisualBundle, SectorVisualScenario } from "@/data/sectorVisuals";
import { t as siteTranslations } from "@/i18n/translations";
import {
  PhoneFrame, WidgetShell, ProductList, ProductRow, WidgetButton, WidgetHint, ProductTile,
} from "@/components/widgets/kit";

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
  if (Number.isNaN(n) || h.length !== 6) return "124, 58, 237";
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
  accent,
}: {
  s: SectorVisualScenario;
  tr: SectorPageT;
  isAr: boolean;
  /** The SECTOR's colour, spent once. See the note in the parent. */
  accent: string;
}) {
  const cur = isAr ? "ر.س" : "SAR";
  const name = (p: { nameAr: string; nameEn: string }) => (isAr ? p.nameAr : p.nameEn);
  return (
    <PhoneFrame accent={accent} label={isAr ? s.widgetAr : s.widgetEn} width={300}>
      <WidgetShell
        title={isAr ? s.placementAr : s.placementEn}
        footer={
          s.overlayPrimaryAr || s.overlayPrimaryEn ? (
            <WidgetButton block>{isAr ? s.overlayPrimaryAr : s.overlayPrimaryEn}</WidgetButton>
          ) : undefined
        }
      >
        <WidgetHint>{tr.vizMainLabel}</WidgetHint>
        <ProductRow name={name(s.main)} price={s.main.price} currency={cur} />
        {s.suggested.length ? (
          <>
            <WidgetHint>{isAr ? "يقترح زيادة" : "Ziadah suggests"}</WidgetHint>
            <ProductList>
              {s.suggested.slice(0, 3).map((sg, i) => (
                <ProductRow
                  key={i}
                  name={name(sg)}
                  price={sg.price}
                  currency={cur}
                  selected={i === 0}
                />
              ))}
            </ProductList>
          </>
        ) : null}
      </WidgetShell>
    </PhoneFrame>
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
  /* ONE accent per SECTOR, not one per scenario. Each scenario carried its
     own hex, so a single sector card showed a gold price beside a cyan price
     beside a violet chip - four brands in one picture. */
  const accent = s.accent;
  const rgb = hexToRgbTuple(accent);
  const title = isAr ? s.titleAr : s.titleEn;
  const desc = isAr ? s.contextAr : s.contextEn;

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
        boxShadow: `0px 18px 10px 0px rgba(0,0,0,0.05), inset 0px 1px 0px 0px rgba(255,255,255,0.06), 0px 0px 5px 0px rgba(${rgb},0.05)`,
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
        <ProductTile name={isAr ? s.main.nameAr : s.main.nameEn} size={44} radius={12} />
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
      <SectorWidgetMiniPreview s={s} tr={tr} isAr={isAr} accent={accent} />
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
}: {
  bundle: SectorVisualBundle;
  introVariant?: "default" | "sector";
}) {
  const t = siteTranslations;
  const { lang, isAr, dir } = useLanguage();
  const tr = t[lang].sectorsPage;
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
        <p className="sector-viz-lead rv d1 sector-card-text" style={{ margin: "0 0 20px", fontSize: 14, lineHeight: 1.75 }}>
          {tr.sectorHubExamplesEmbedSub}
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
        <div className="rv d2 sector-viz-flow-wrap sector-block overflow-hidden" style={{ marginTop: 8 }}>
          <div className="text-center mb-7">
            <div className="t-eyebrow">
              {tr.sectionFlowTag}
            </div>
            <h3 className="sector-card-title" style={{ fontSize: "clamp(20px,2.5vw,26px)", margin: "10px 0 8px" }}>
              {tr.sectionFlowTitle}
            </h3>
            <p className="sector-card-text" style={{ fontSize: 14 }}>
              {tr.sectionFlowSub}
            </p>
          </div>
          <div className="sector-viz-flow-steps">
            {bundle.flow.map((step, i) => (
              <Fragment key={i}>
                <div className="sector-viz-flow-step">
                  {/* A NUMBER, not a 🧠. This is an ordered three-step flow,
                      so the step's own position is the only marker it needs -
                      and stripping the emoji had left an empty violet tile,
                      which is worse than the emoji was. */}
                  <span className="svx-step-num num-ltr" aria-hidden="true">{i + 1}</span>
                  <div className="sector-card-title mb-2" style={{ fontSize: 15 }}>
                    {isAr ? step.titleAr : step.titleEn}
                  </div>
                  <p className="sector-card-text" style={{ fontSize: 13, lineHeight: 1.65 }}>
                    {isAr ? step.descAr : step.descEn}
                  </p>
                </div>
                {i < bundle.flow.length - 1 && <div className="sector-viz-flow-arrow" aria-hidden />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sector-viz-root">
      <p className="sector-viz-lead rv d1 sector-card-text" style={{ margin: "0 0 20px", fontSize: 14, lineHeight: 1.75 }}>
        {tr.sectionExamplesSub}
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
                border: isActive ? "1px solid rgba(124, 58, 237,.45)" : "1px solid var(--b2)",
                background: isActive ? "rgba(124, 58, 237,.14)" : "transparent",
                color: isActive ? "var(--p3)" : "var(--tm)",
                fontWeight: 700,
                fontSize: 12,
                padding: "8px 12px",
                fontFamily: "var(--font)",
                cursor: "pointer",
              }}
            >
              {isAr ? s.titleAr : s.titleEn}
            </button>
          );
        })}
      </div>

      <div className="rv d2" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="sector-card-text" style={{ fontSize: 12, fontWeight: 700 }}>
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
              border: "1px solid rgba(124, 58, 237,.35)",
              background: "rgba(124, 58, 237,.12)",
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
                  /* One tint of the sector's own colour. It was an accent-to-
                     cyan gradient, which is the second hue this component
                     spent everywhere. */
                  background: `color-mix(in srgb, ${s.accent} 12%, transparent)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 12px",
                }}
              >
                {/* The two products, as tiles. They were the two emoji. */}
                <ProductTile name={isAr ? s.main.nameAr : s.main.nameEn} size={30} radius={8} />
                {s.suggested[0] ? (
                  <ProductTile
                    name={isAr ? s.suggested[0].nameAr : s.suggested[0].nameEn}
                    size={26}
                    radius={7}
                  />
                ) : null}
              </div>
              <div style={{ padding: "9px 10px", fontSize: 12, fontWeight: 700, color: isActive ? "var(--p3)" : "var(--tm)" }}>
                {isAr ? s.widgetAr : s.widgetEn}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rv d2 sector-viz-flow-wrap sector-block overflow-hidden" style={{ marginTop: 28 }}>
        <div className="text-center mb-7">
          <div className="t-eyebrow">
            {tr.sectionFlowTag}
          </div>
          <h3 className="sector-card-title" style={{ fontSize: "clamp(20px,2.5vw,26px)", margin: "10px 0 8px" }}>
            {tr.sectionFlowTitle}
          </h3>
          <p className="sector-card-text" style={{ fontSize: 14 }}>
            {tr.sectionFlowSub}
          </p>
        </div>
        <div className="sector-viz-flow-steps">
          {bundle.flow.map((step, i) => (
            <Fragment key={i}>
              <div className="sector-viz-flow-step">
                <span className="svx-step-num num-ltr" aria-hidden="true">{i + 1}</span>
                <div className="sector-card-title mb-2" style={{ fontSize: 15 }}>
                  {isAr ? step.titleAr : step.titleEn}
                </div>
                <p className="sector-card-text" style={{ fontSize: 13, lineHeight: 1.65 }}>
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>
              {i < bundle.flow.length - 1 && <div className="sector-viz-flow-arrow" aria-hidden />}
            </Fragment>
          ))}
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
  /* ONE accent for the card, the sector's own. This used to draw a gold
     price beside a cyan price beside a violet chip, under a gold-to-cyan
     gradient rule, inside a grey phone whose rows were grey on grey - four
     brands in one picture, and the one surface that should have been bright
     was the dullest thing on the page. */
  const accent = s.accent;

  return (
    <div className={`rv ${delayClass} sector-viz-card sector-card`}>
      <div className="svx-head">
        <h3 className="sector-card-title">{isAr ? s.titleAr : s.titleEn}</h3>
        <p className="sector-card-text">{isAr ? s.contextAr : s.contextEn}</p>
        {s.relatedUseCaseHref ? (
          <button type="button" className="chip is-small" onClick={() => onOpenUseCase(s.relatedUseCaseHref!)}>
            {isAr ? "افتح الحل" : "Open the solution"}
          </button>
        ) : null}
      </div>

      <div className="svx-stage">
        <SectorWidgetMiniPreview s={s} tr={tr} isAr={isAr} accent={accent} />
      </div>

      <div className="svx-meta">
        <span className="card-eyebrow">{tr.vizWidgetLabel}</span>
        <span className="wk-tag wk-tag--neutral">{isAr ? s.widgetAr : s.widgetEn}</span>
        <span className="card-eyebrow">{tr.vizPlacementLabel}</span>
        <span className="wk-tag wk-tag--neutral">{isAr ? s.placementAr : s.placementEn}</span>
      </div>
    </div>
  );
}

