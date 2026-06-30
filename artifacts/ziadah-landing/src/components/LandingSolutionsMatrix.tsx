import { useMemo, useState } from "react";
import { useCasesSolutionsMatrix, type SolutionMatrixGroup } from "@/data/useCasesSolutionsMatrix";
import { getUseCaseBlurb } from "@/data/useCaseSolutionBlurbs";
import { getMatrixGroupSummary } from "@/data/solutionMatrixGroupSummaries";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { navigateTo } from "@/components/PageTransition";

type MatrixVariant = "landing" | "sector";

function MatrixGroupPanel({
  group,
  showBlurbs,
  label,
  lang,
  dir,
  hubCtaLabel,
  /** `true` للصفحة الرئيسية فقط (`.rv`). وضع القطاع بدون `rv` لأن تبديل التبويب يعيد تركيب اللوحة ولا يُعاد تسجيلها في مراقب SectorDetail */
  animateReveal,
}: {
  group: SolutionMatrixGroup;
  showBlurbs: boolean;
  label: (key: string) => string;
  lang: "ar" | "en";
  dir: "rtl" | "ltr";
  hubCtaLabel: string;
  animateReveal?: boolean;
}) {
  return (
    <div className={animateReveal ? "gc rv" : "gc"} style={{ padding: 0, overflow: "hidden" }}>
      <div className="shine" />
      <div
        style={{
          padding: "18px 20px 16px",
          borderBottom: "1px solid var(--b1)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--p)" }}>{label(group.titleKey)}</h3>
        <button
          type="button"
          onClick={() => navigateTo(group.hubHref)}
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--tm)",
            background: "rgba(124, 58, 237,.1)",
            border: "1px solid rgba(124, 58, 237,.25)",
            borderRadius: 999,
            padding: "6px 12px",
            cursor: "pointer",
            fontFamily: "var(--font)",
          }}
        >
          {hubCtaLabel} →
        </button>
      </div>
      {showBlurbs ? (
        <div
          style={{
            padding: "12px 18px 14px",
            borderBottom: "1px solid var(--b1)",
            background: "rgba(124, 58, 237,.04)",
          }}
        >
          <p style={{ margin: 0, fontSize: 13, color: "var(--tm)", lineHeight: 1.65 }}>
            {getMatrixGroupSummary(group.id, lang)}
          </p>
        </div>
      ) : null}
      <div
        style={{
          padding: "14px 16px 18px",
          display: "grid",
          gap: 10,
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
          direction: dir,
        }}
      >
        {group.entries.map((ent) => {
          const blurb = showBlurbs ? getUseCaseBlurb(ent.href) : undefined;
          return (
            <button
              key={ent.href}
              type="button"
              onClick={() => navigateTo(ent.href)}
              style={{
                textAlign: dir === "rtl" ? "right" : "left",
                padding: "12px 14px",
                borderRadius: 14,
                border: "1px solid var(--b2)",
                background: "var(--s1)",
                cursor: "pointer",
                fontFamily: "var(--font)",
                color: "var(--t)",
                transition: "border-color .2s, background .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(124, 58, 237,.35)";
                e.currentTarget.style.background = "rgba(124, 58, 237,.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.background = "var(--s1)";
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.35 }}>{label(ent.titleKey)}</div>
              {ent.subKey ? (
                <div style={{ fontSize: 12, color: "var(--tm)", marginTop: 4, lineHeight: 1.45 }}>{label(ent.subKey)}</div>
              ) : null}
              {blurb ? (
                <div style={{ fontSize: 11, color: "var(--td)", marginTop: 8, lineHeight: 1.5, opacity: 0.95 }}>
                  {lang === "ar" ? blurb.ar : blurb.en}
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LandingSolutionsMatrix({ variant = "landing" }: { variant?: MatrixVariant }) {
  const { lang, dir } = useLanguage();
  const t = useSiteT();
  const tr = t[lang];
  const nav = tr.nav as unknown as Record<string, string>;
  const lr = tr.landing;
  const sectorTr = tr.sectorsPage;
  const showBlurbs = variant === "sector";
  const langKey: "ar" | "en" = lang === "en" ? "en" : "ar";

  const [activeGroupId, setActiveGroupId] = useState(() => useCasesSolutionsMatrix[0]!.id);
  const activeGroup = useMemo(
    () => useCasesSolutionsMatrix.find((g) => g.id === activeGroupId) ?? useCasesSolutionsMatrix[0]!,
    [activeGroupId],
  );

  const label = (key: string) => {
    const v = nav[key];
    return typeof v === "string" ? v : key;
  };

  return (
    <section
      id="solutions-matrix"
      style={{
        position: "relative",
        zIndex: 2,
        padding: showBlurbs ? "8px 0 12px" : "72px 0 24px",
        background: "transparent",
        scrollMarginTop: 120,
      }}
    >
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", paddingInline: showBlurbs ? "0" : "5%" }}>
        {!showBlurbs ? (
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="stag rv">
              <span className="stag-dot" />
              {lr.solutionsMatrixTag}
            </div>
            <h2 className="st rv d1 font-semibold" style={{ marginTop: 14, marginBottom: 10 }}>
              {lr.solutionsMatrixTitle}
            </h2>
            <p className="ssub rv d2" style={{ margin: 0, maxWidth: 640, marginInline: "auto" }}>
              {lr.solutionsMatrixSub}
            </p>
          </div>
        ) : (
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 900, color: "var(--p)" }}>{sectorTr.sectorHubMatrixEmbedTitle}</h3>
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--tm)", lineHeight: 1.65, maxWidth: 720 }}>
              {sectorTr.sectorHubMatrixEmbedSub}
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "var(--td)", lineHeight: 1.55, maxWidth: 720 }}>
              {sectorTr.sectorHubMatrixTabsHint}
            </p>
          </div>
        )}

        {showBlurbs ? (
          <>
            <div
              role="tablist"
              aria-label={langKey === "ar" ? "تصنيفات خريطة الحلول" : "Solution map categories"}
              style={{
                display: "flex",
                direction: dir,
                flexWrap: "nowrap",
                gap: 8,
                marginBottom: 16,
                overflowX: "auto",
                overflowY: "hidden",
                paddingBottom: 6,
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "thin",
              }}
            >
              {useCasesSolutionsMatrix.map((group) => {
                const selected = group.id === activeGroup.id;
                const sum = getMatrixGroupSummary(group.id, langKey);
                return (
                  <button
                    key={group.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="solutions-matrix-panel"
                    id={`matrix-tab-${group.id}`}
                    onClick={() => setActiveGroupId(group.id)}
                    style={{
                      flex: "0 0 auto",
                      maxWidth: 200,
                      minWidth: 132,
                      textAlign: dir === "rtl" ? "right" : "left",
                      padding: "10px 12px",
                      borderRadius: 14,
                      border: selected ? "2px solid rgba(124, 58, 237,.55)" : "1px solid var(--b2)",
                      background: selected ? "rgba(124, 58, 237,.1)" : "var(--s1)",
                      cursor: "pointer",
                      fontFamily: "var(--font)",
                      color: "var(--t)",
                      transition: "border-color .15s, background .15s",
                      boxShadow: selected ? "0 4px 14px rgba(124, 58, 237,.12)" : "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 900,
                        color: selected ? "var(--p3)" : "var(--p)",
                        lineHeight: 1.25,
                        marginBottom: 6,
                      }}
                    >
                      {label(group.titleKey)}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--tm)",
                        lineHeight: 1.45,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {sum}
                    </div>
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" id="solutions-matrix-panel" aria-labelledby={`matrix-tab-${activeGroup.id}`}>
              <MatrixGroupPanel
                key={activeGroup.id}
                group={activeGroup}
                showBlurbs
                label={label}
                lang={langKey}
                dir={dir}
                hubCtaLabel={lr.solutionsMatrixHubCta}
              />
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {useCasesSolutionsMatrix.map((group) => (
              <MatrixGroupPanel
                key={group.id}
                group={group}
                showBlurbs={false}
                label={label}
                lang={langKey}
                dir={dir}
                hubCtaLabel={lr.solutionsMatrixHubCta}
                animateReveal
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
