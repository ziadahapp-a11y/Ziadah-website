import type { CSSProperties } from "react";
import LandingSolutionsMatrix from "@/components/LandingSolutionsMatrix";
import SectorVisualExamples from "@/components/SectorVisualExamples";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import type { SectorVisualBundle } from "@/data/sectorVisuals";

export default function SectorHubPlaybook({
  bundle,
  sectorSlug,
}: {
  bundle: SectorVisualBundle;
  sectorSlug: string;
}) {
  const { lang, dir } = useLanguage();
  const t = useSiteT();
  const tr = t[lang].sectorsPage;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chipStyle = (): CSSProperties => ({
    borderRadius: 999,
    border: "1px solid var(--b2)",
    background: "var(--s1)",
    color: "var(--tm)",
    fontSize: 12,
    fontWeight: 700,
    padding: "8px 14px",
    fontFamily: "var(--font)",
    cursor: "pointer",
  });

  return (
    <section
      id="sector-store-playbook"
      className="sector-playbook-wrap gc rv d2"
      style={{ padding: 0, marginBottom: 28, scrollMarginTop: 120, position: "relative", zIndex: 2 }}
    >
      <div className="shine" />
      <div style={{ padding: "26px 24px 8px" }}>
        <div className="stag" style={{ display: "inline-flex", marginBottom: 12 }}>
          <span className="stag-dot" />
          {tr.sectorHubPlaybookTag}
        </div>
        <h2 style={{ fontSize: "clamp(20px,2.4vw,26px)", fontWeight: 900, margin: "0 0 10px", color: "var(--p)", lineHeight: 1.25 }}>
          {tr.sectorHubPlaybookTitle}
        </h2>
        <p style={{ margin: "0 0 20px", fontSize: 14, color: "var(--tm)", lineHeight: 1.75, maxWidth: 720 }}>
          {tr.sectorHubPlaybookLead}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 8,
            justifyContent: dir === "rtl" ? "flex-end" : "flex-start",
          }}
          aria-label={lang === "ar" ? "أقسام الدليل" : "Playbook sections"}
        >
          <button type="button" onClick={() => scrollTo("solutions-matrix")} style={chipStyle()}>
            {tr.sectorHubSubNavMatrix}
          </button>
          <button type="button" onClick={() => scrollTo("section-examples")} style={chipStyle()}>
            {tr.sectorHubSubNavExamples}
          </button>
        </div>
      </div>

      <div style={{ paddingInline: 24 }}>
        <LandingSolutionsMatrix variant="sector" />
      </div>

      <div id="section-examples" style={{ scrollMarginTop: 120, padding: "8px 24px 24px" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 17, fontWeight: 900, color: "var(--p)" }}>{tr.sectorHubExamplesEmbedTitle}</h3>
        <SectorVisualExamples bundle={bundle} introVariant="sector" sectorSlug={sectorSlug} />
      </div>
    </section>
  );
}
