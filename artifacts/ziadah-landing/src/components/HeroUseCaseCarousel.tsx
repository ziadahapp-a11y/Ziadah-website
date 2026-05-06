import { useMemo } from "react";
import WidgetShowcaseCard, {
  buildWidgetShowcaseItems,
  type WidgetShowcaseItemData,
  type WidgetShowcaseKind,
} from "@/components/WidgetShowcaseCard";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

/** نفس بطاقتي المعاينة في قسم الويدجت: عروض الكميات + الشراء معاً. */
const HERO_WIDGET_KINDS: WidgetShowcaseKind[] = ["volume", "bundle"];

/**
 * الهيرو: بطاقتان ثابتتان فقط (بدون مارquee).
 * backdrop-filter لا يُرسم موثوقًا تحت مسار متحرك؛ heroMarquee يعوض بتدرج أوضح.
 */
export default function HeroUseCaseCarousel() {
  const { lang, dir } = useLanguage();
  const t = useSiteT();
  const tr = t[lang];
  const wLabels = tr.landing.widgetLabels as { label: string; desc: string }[];

  const heroWidgets = useMemo(() => {
    const all = buildWidgetShowcaseItems(wLabels);
    const byKind = new Map(all.map((item) => [item.kind, item]));
    return HERO_WIDGET_KINDS.map((k) => byKind.get(k)).filter(
      (item): item is WidgetShowcaseItemData => item != null,
    );
  }, [wLabels]);

  return (
    <div className="hero-static-widgets" aria-hidden dir="ltr">
      {heroWidgets.map((item) => (
        <WidgetShowcaseCard
          key={item.kind}
          heroMarquee
          item={item}
          dir={dir}
          lang={lang}
        />
      ))}
    </div>
  );
}
