import { useMemo } from "react";
import { buildWidgetShowcaseItems } from "@/components/WidgetShowcaseCard";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

/**
 * الهيرو: معاينة عروض الكميات أولاً (عرض الودجت فقط، بدون بطاقة الزجاج)، ثم «الشراء معاً» بدون إطار البطاقة.
 */
export default function HeroUseCaseCarousel() {
  const { lang } = useLanguage();
  const t = useSiteT();
  const tr = t[lang];
  const wLabels = tr.landing.widgetLabels as { label: string; desc: string }[];

  const { bundle, volume } = useMemo(() => {
    const all = buildWidgetShowcaseItems(wLabels);
    const byKind = new Map(all.map((item) => [item.kind, item]));
    return {
      bundle: byKind.get("bundle"),
      volume: byKind.get("volume"),
    };
  }, [wLabels]);

  const stackStyle = {
    width: "100%" as const,
    alignSelf: "stretch" as const,
    display: "flex" as const,
    flexDirection: "column" as const,
  };

  return (
    <div className="hero-static-widgets" aria-hidden dir="ltr">
      {volume ? (
        <div style={stackStyle}>{volume.widget}</div>
      ) : null}
      {bundle ? (
        <div style={stackStyle}>{bundle.widget}</div>
      ) : null}
    </div>
  );
}
