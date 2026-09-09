import SectorVisualExamples from "@/components/SectorVisualExamples";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SectorVisualBundle } from "@/data/sectorVisuals";
import { t as siteTranslations } from "@/i18n/translations";

export default function SectorHubPlaybook({
  bundle,
}: {
  bundle: SectorVisualBundle;
}) {
  const { lang } = useLanguage();
  const t = siteTranslations;
  const tr = t[lang].sectorsPage;

  return (
    <section
      id="sector-store-playbook"
      className="sector-playbook-wrap rv d2 relative z-[2] sector-block"
      style={{ marginBottom: 28, scrollMarginTop: 120 }}
    >
      <div className="mb-3">
        <span className="t-eyebrow">
          {tr.sectorHubPlaybookTag}
        </span>
      </div>
      <p className="sector-card-text mb-5 max-w-[72rem]">
        {tr.sectorHubPlaybookLead}
      </p>

      <div id="section-examples" className="scroll-mt-[120px]">
        <h3 className="sector-card-title mb-4">{tr.sectorHubExamplesEmbedTitle}</h3>
        <SectorVisualExamples bundle={bundle} introVariant="sector" />
      </div>
    </section>
  );
}
