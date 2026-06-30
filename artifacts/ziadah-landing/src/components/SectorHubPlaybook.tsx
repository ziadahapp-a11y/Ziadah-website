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
      className="sector-playbook-wrap rv d2 relative z-[2] rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all"
      style={{ marginBottom: 28, scrollMarginTop: 120 }}
    >
      <div className="mb-3">
        <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase">
          {tr.sectorHubPlaybookTag}
        </span>
      </div>
      <p className="mb-5 text-sm text-zinc-700 leading-relaxed max-w-[720px]">
        {tr.sectorHubPlaybookLead}
      </p>

      <div id="section-examples" className="scroll-mt-[120px]">
        <h3 className="mb-3.5 text-base md:text-lg font-bold text-violet-600 leading-snug">{tr.sectorHubExamplesEmbedTitle}</h3>
        <SectorVisualExamples bundle={bundle} introVariant="sector" sectorSlug={sectorSlug} />
      </div>
    </section>
  );
}
