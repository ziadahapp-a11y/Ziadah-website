import { useState } from "react";
import { Rocket, ArrowDown, Plus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SectorPageRich } from "@/data/sectorPageTypes";
import PlatformModal from "@/components/PlatformModal";
import { Button } from "@/components/mk";
import { HeroSplit } from "@/sections";

type Props = {
  rich: SectorPageRich;
  sectorTitle: string;
  sectorsBreadcrumb: string;
  onScrollTo: (id: string) => void;
};


/** Splits "🍔 Burger — 25 SAR" style lines into icon / name / price. */
function splitLine(text: string) {
  const m = text.match(/^(\S+)\s+(.+?)\s*[—–]\s*(.+)$/);
  return m ? { icon: m[1], name: m[2], price: m[3] } : { icon: "", name: text, price: "" };
}

/**
 * Sector hero — a `HeroSplit` carrying the violet family, so it opens the same
 * way every other page on the site does. Content still comes from the sector's
 * own `rich` data, and the phone is unchanged: it is the one thing on the page
 * that shows rather than tells.
 */
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
      <HeroSplit
        family="violet"
        eyebrow={badge || sectorsBreadcrumb}
        title={
          useSplit ? (
            <>
              {isAr ? rich.heroHeadlineLine1Ar : rich.heroHeadlineLine1En}{" "}
              {/* The second line is the sector's own promise, so it carries the
                  brand hue rather than the section ink. `text-brand` is not
                  that: the ramp resolves it to `--color-secondary`, which is
                  the ink the rest of the headline already uses. */}
              <span className="hero-accent">
                {isAr ? rich.heroHeadlineLine2Ar : rich.heroHeadlineLine2En}
              </span>
            </>
          ) : (
            <>{isAr ? rich.heroHeadlineAr : rich.heroHeadlineEn}</>
          )
        }
        body={sub}
        actions={
          <>
            <Button variant="primary" size="lg" onClick={() => setPlatformModalOpen(true)}>
              <Rocket className="w-4 h-4" aria-hidden="true" />
              {isAr ? "فعّل الآن" : "Activate Now"}
            </Button>
            <Button variant="tertiary" size="lg" onClick={() => onScrollTo(primaryCta)}>
              {isAr ? "شوف كيف تشتغل" : "See how it works"}
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </Button>
          </>
        }
        note={
          <>
            <span className="font-medium">{isAr ? "القطاع" : "Sector"}: </span>
            {sectorTitle}
          </>
        }
        media={
          /* The phone is the sector's evidence: its real orders, and what
             Ziadah suggests against them. Kept as-is — it is the one thing on
             the page that shows rather than tells. */
          <div dir={dir} className="sector-phone-wrap">
            {ft1 ? <span className="sector-phone-tag sector-phone-tag--start">{ft1}</span> : null}

            <div className="sector-phone">
              <div className="sector-phone-bar">
                <span>{phoneBar}</span>
                <span className="num-ltr">12:34</span>
              </div>
              <div className="sector-phone-body">
                {rich.phoneOrders.map((line, i) => {
                  const s = splitLine(isAr ? line.ar : line.en);
                  return (
                    <div key={i} className="sector-phone-row">
                      <span aria-hidden="true">{s.icon}</span>
                      <span className="sector-phone-name">{s.name}</span>
                      {s.price ? <span className="sector-phone-price num-ltr">{s.price}</span> : null}
                    </div>
                  );
                })}

                <div className="sector-phone-recs">
                  <p className="sector-phone-recs-label">{isAr ? "زيادة يقترح" : "Ziadah suggests"}</p>
                  {rich.phoneRecs.map((line, i) => {
                    const s = splitLine(isAr ? line.ar : line.en);
                    return (
                      <div key={i} className="sector-phone-row sector-phone-row--rec">
                        <span aria-hidden="true">{s.icon}</span>
                        <span className="sector-phone-name">{s.name}</span>
                        {s.price ? <span className="sector-phone-price num-ltr">{s.price}</span> : null}
                        <span className="sector-phone-add">
                          <Plus className="w-3 h-3" aria-hidden="true" />
                          {isAr ? "أضف" : "Add"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {ft2 ? <span className="sector-phone-tag sector-phone-tag--end">{ft2}</span> : null}
          </div>
        }
      />
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
