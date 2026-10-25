import { useLanguage } from "@/i18n/LanguageContext";
import { PLATFORMS } from "@/lib/platforms-data";
import { PlatformMark } from "@/components/art/EcosystemGraph";

/**
 * Where the product runs, one card per platform: the mark, the name, its state
 * and what connecting does. Read from `platforms-data`, so a connector that
 * ships or is added shows up here with no edit to the page.
 */
export function PlatformCards() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  return (
    <div className="cards-grid">
      {PLATFORMS.map((p) => {
        const live = p.status === "connected";
        return (
          <article key={p.slug} className="card">
            <div className="card-head">
              <span className="card-ico" aria-hidden="true">
                <PlatformMark slug={p.slug} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block t-head-2">{isAr ? p.name.ar : p.name.en}</span>
              </span>
              <span className={`plat-status plat-status--${p.status}`}>
                {live ? (isAr ? "يعمل اليوم" : "Live today") : isAr ? "قيد التطوير" : "In development"}
              </span>
            </div>
            <p className="card-body-text">{isAr ? p.what.ar : p.what.en}</p>
            {p.href ? (
              <div className="card-foot">
                <a className="link-arrow" href={p.href} target="_blank" rel="noopener noreferrer">
                  {isAr ? "ثبّت من متجر التطبيقات" : "Install from the app market"}
                </a>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
