import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { navigateTo } from "@/components/PageTransition";
import {
  sectorAiMlBlogLinks,
  sectorAiMlBullets,
  sectorAiMlSupportLinks,
} from "@/data/sectorAiMlContent";

export default function SectorAiMlHighlights() {
  const { lang } = useLanguage();
  const t = useSiteT();
  const tr = t[lang].sectorsPage;

  return (
    <div
      id="sector-ai-ml"
      className="rv d1 rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all"
      style={{ marginBottom: 22, scrollMarginTop: 120 }}
    >
      <div className="mb-2.5">
        <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase">
          {tr.sectorAiSectionTag}
        </span>
      </div>
      <h2 className="mb-2.5 text-2xl md:text-3xl font-bold text-zinc-950 leading-tight">
        {tr.sectorAiSectionTitle}
      </h2>
      <p className="mb-[18px] text-sm text-zinc-700 leading-relaxed">
        {tr.sectorAiSectionLead}
      </p>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))" }}
      >
        {sectorAiMlBullets.map((b, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 bg-violet-50/60 p-4"
          >
            <div className="flex items-start gap-2.5">
              <span className="text-[22px] leading-none" aria-hidden>
                {b.emoji}
              </span>
              <div>
                <h3 className="mb-2 text-sm md:text-base font-bold text-zinc-950 leading-snug">
                  {lang === "ar" ? b.titleAr : b.titleEn}
                </h3>
                <p className="m-0 text-[13px] text-zinc-600 leading-relaxed">
                  {lang === "ar" ? b.textAr : b.textEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-[18px] border-t border-zinc-200">
        <p className="mb-2.5 text-xs font-bold tracking-wide text-zinc-700 uppercase">
          {tr.sectorAiDeepenTitle}
        </p>
        <div className="flex flex-col gap-3.5">
          <div>
            <span className="text-xs font-bold text-violet-600">{tr.sectorAiFromBlog} — </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {sectorAiMlBlogLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => navigateTo(link.href)}
                  className="text-[11px] font-bold px-2.5 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-950 cursor-pointer text-start hover:border-zinc-300 hover:bg-zinc-100 transition-colors"
                >
                  {lang === "ar" ? link.labelAr : link.labelEn}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold text-violet-600">{tr.sectorAiFromSupport} — </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {sectorAiMlSupportLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => navigateTo(link.href)}
                  className="text-[11px] font-bold px-2.5 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-950 cursor-pointer text-start hover:border-zinc-300 hover:bg-zinc-100 transition-colors"
                >
                  {lang === "ar" ? link.labelAr : link.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
