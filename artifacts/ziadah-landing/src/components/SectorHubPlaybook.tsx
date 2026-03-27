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
  const { lang } = useLanguage();
  const t = useSiteT();
  const tr = t[lang].sectorsPage;

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
        <p style={{ margin: "0 0 20px", fontSize: 14, color: "var(--tm)", lineHeight: 1.75, maxWidth: 720 }}>
          {tr.sectorHubPlaybookLead}
        </p>
      </div>

      <div id="section-examples" style={{ scrollMarginTop: 120, padding: "8px 24px 24px" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 17, fontWeight: 900, color: "var(--p)" }}>{tr.sectorHubExamplesEmbedTitle}</h3>
        <SectorVisualExamples bundle={bundle} introVariant="sector" sectorSlug={sectorSlug} />
      </div>
    </section>
  );
}
