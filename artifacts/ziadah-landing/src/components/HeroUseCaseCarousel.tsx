import { useMemo } from "react";
import WidgetShowcaseCard, { buildWidgetShowcaseItems } from "@/components/WidgetShowcaseCard";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

/**
 * مارquee الهيرو: ثلاث نسخ من البطاقات على المسار + حركة CSS −33.333٪ / +33.333٪ (بدون JS للحلقة).
 */
export default function HeroUseCaseCarousel() {
  const { lang, dir } = useLanguage();
  const t = useSiteT();
  const tr = t[lang];
  const wLabels = tr.landing.widgetLabels as { label: string; desc: string }[];

  const allWidgets = useMemo(() => buildWidgetShowcaseItems(wLabels), [wLabels]);
  const durationSec = Math.max(1, allWidgets.length) * 5;
  const rtl = dir === "rtl";

  const renderCard = (item: (typeof allWidgets)[0], key: number) => (
    <WidgetShowcaseCard key={key} item={item} dir={dir} lang={lang} />
  );

  return (
    <div className="hero-uc-carousel" aria-hidden>
      <div className="hero-marquee-viewport">
        <div
          className={`hero-marquee-track ${rtl ? "hero-marquee-track--rtl" : "hero-marquee-track--ltr"}`}
          style={{ animationDuration: `${durationSec}s` }}
        >
          {[0, 1, 2].map((seg) => (
            <div key={seg} className="hero-marquee-segment">
              {allWidgets.map((item, i) => renderCard(item, seg * 100 + i))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
