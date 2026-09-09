import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { navigateTo } from "@/components/PageTransition";
import {
  sectorAiMlBlogLinks,
  sectorAiMlBullets,
  sectorAiMlSupportLinks,
} from "@/data/sectorAiMlContent";

export default function SectorAiMlHighlights() {
  const { lang } = useLanguage();
  const t = siteTranslations;
  const tr = t[lang].sectorsPage;

  return (
    <div
      id="sector-ai-ml"
      className="rv d1 sector-block"
      style={{ marginBottom: 22, scrollMarginTop: 120 }}
    >
      <div className="mb-2.5">
        <span className="t-eyebrow">
          {tr.sectorAiSectionTag}
        </span>
      </div>
      <h2 className="section-head-title--sm mb-2.5">
        {tr.sectorAiSectionTitle}
      </h2>
      <p className="sector-card-text mb-[1.8rem]">
        {tr.sectorAiSectionLead}
      </p>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))" }}
      >
        {sectorAiMlBullets.map((b, i) => (
          <div
            key={i}
            className="sector-card"
          >
            <div className="flex items-start gap-2.5">
              <span className="text-[22px] leading-none" aria-hidden>
                {b.emoji}
              </span>
              <div>
                <h3 className="sector-card-title mb-2">
                  {lang === "ar" ? b.titleAr : b.titleEn}
                </h3>
                <p className="sector-card-text">
                  {lang === "ar" ? b.textAr : b.textEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card-rule mt-5">
        <p className="card-eyebrow mb-2.5">
          {tr.sectorAiDeepenTitle}
        </p>
        <div className="flex flex-col gap-3.5">
          <div>
            <span className="card-eyebrow">{tr.sectorAiFromBlog} — </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {sectorAiMlBlogLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => navigateTo(link.href)}
                  className="chip is-small text-start"
                >
                  {lang === "ar" ? link.labelAr : link.labelEn}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="card-eyebrow">{tr.sectorAiFromSupport} — </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {sectorAiMlSupportLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => navigateTo(link.href)}
                  className="chip is-small text-start"
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
