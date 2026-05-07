import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SectorPageRich } from "@/data/sectorPageTypes";
import PlatformModal from "@/components/PlatformModal";

type Props = {
  rich: SectorPageRich;
  sectorTitle: string;
  sectorsBreadcrumb: string;
  onScrollTo: (id: string) => void;
};

export default function SectorHtmlHero({ rich, sectorTitle, sectorsBreadcrumb, onScrollTo }: Props) {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

  const useSplit = Boolean(
    (rich.heroHeadlineLine1Ar && rich.heroHeadlineLine2Ar) || (rich.heroHeadlineLine1En && rich.heroHeadlineLine2En),
  );

  const badge = isAr ? rich.heroBadgeAr : rich.heroBadgeEn;
  const sub = isAr ? rich.heroSubAr : rich.heroSubEn;
  const ft1 = isAr ? rich.heroFloatTag1Ar : rich.heroFloatTag1En;
  const ft2 = isAr ? rich.heroFloatTag2Ar : rich.heroFloatTag2En;
  const phoneBar = isAr ? rich.heroPhoneBarAr ?? "تطبيق التوصيل" : rich.heroPhoneBarEn ?? "Delivery app";
  const primaryCta = rich.heroPrimaryCtaTargetId ?? "section-why";

  return (
    <>
    <section
      dir={dir}
      className="page-hero-viewport"
      style={{
        position: "relative",
        zIndex: 2,
        borderBottom: "1px solid var(--b1)",
      }}
    >
      <div className="sector-html-hero-grid rv d1" style={{ maxWidth: 1160, margin: "0 auto", alignItems: "center" }}>
        <div className="sector-html-hero-copy">
          <div className="stag rv" style={{ display: "inline-flex", marginBottom: 14 }}>
            <span className="stag-dot" />
            {sectorsBreadcrumb}
          </div>
          {badge ? <div className="sector-html-badge sh-en">{badge}</div> : null}

          <h1 className="sector-html-hero-h">
            {useSplit ? (
              <>
                {isAr ? rich.heroHeadlineLine1Ar : rich.heroHeadlineLine1En}
                <span className="sector-html-grad">{isAr ? rich.heroHeadlineLine2Ar : rich.heroHeadlineLine2En}</span>
              </>
            ) : (
              <>{isAr ? rich.heroHeadlineAr : rich.heroHeadlineEn}</>
            )}
          </h1>

          <p className="sector-html-hero-sub">{sub}</p>

          <div className="sector-html-cta-row sector-html-hero-copy-ctas">
            <button type="button" className="sector-html-btn sector-html-btn--fire sh-en" onClick={() => setPlatformModalOpen(true)}>
              🚀 {isAr ? "فعّل الآن" : "Activate Now"}
            </button>
            <button type="button" className="sector-html-btn sector-html-btn--ghost sh-en" onClick={() => onScrollTo(primaryCta)}>
              {isAr ? "شوف كيف تشتغل" : "See how it works"}
            </button>
          </div>

          <p style={{ marginTop: 18, fontSize: 12, color: "var(--td)" }}>
            <span className="sh-en" style={{ color: "var(--p)", fontWeight: 700 }}>
              {isAr ? "القطاع" : "Sector"}:{" "}
            </span>
            {sectorTitle}
          </p>
        </div>

        <div className="sector-html-hero-mock">
        <div className="sector-html-phone-wrap">
          {ft1 ? (
            <div className="sector-html-ftag sector-html-ftag--1">
              <span className="sector-html-fdot sector-html-fdot--g" />
              <span className="sh-en">{ft1}</span>
            </div>
          ) : null}
          <div className="sector-html-phone">
            <div className="sector-html-phone-inner">
              <div className="sector-html-phone-bar">
                <div className="sector-html-pb-app sh-en">{phoneBar}</div>
                <div className="sector-html-pb-time">12:34</div>
              </div>
              {rich.phoneOrders.map((line, i) => {
                const text = isAr ? line.ar : line.en;
                const m = text.match(/^(\S+)\s+(.+?)\s*[—–]\s*(.+)$/);
                return (
                  <div key={i} className="sector-html-or">
                    <span className="sector-html-or-icon">{m ? m[1] : "📦"}</span>
                    <span className="sector-html-or-name">{m ? m[2] : text}</span>
                    {m ? <span className="sector-html-or-price">{m[3]}</span> : null}
                  </div>
                );
              })}
              <div className="sector-html-rec">
                <div className="sector-html-rb-head sh-en">{isAr ? "زيادة يقترح" : "Ziadah suggests"}</div>
                {rich.phoneRecs.map((line, i) => {
                  const text = isAr ? line.ar : line.en;
                  const m = text.match(/^(\S+)\s+(.+?)\s*[—–]\s*(.+)$/);
                  return (
                    <div key={i} className="sector-html-rb-item">
                      <span style={{ fontSize: "1rem" }}>{m ? m[1] : "➕"}</span>
                      <span style={{ flex: 1, fontSize: "0.78rem", fontWeight: 600 }}>{m ? m[2] : text}</span>
                      {m ? <span className="sector-html-or-price">{m[3]}</span> : null}
                      <span className="sector-html-rbi-add sh-en">{isAr ? "+ أضف" : "+ Add"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {ft2 ? (
            <div className="sector-html-ftag sector-html-ftag--2">
              <span className="sector-html-fdot sector-html-fdot--gold" />
              <span className="sh-en">{ft2}</span>
            </div>
          ) : null}
        </div>
        </div>
      </div>
    </section>
    <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
