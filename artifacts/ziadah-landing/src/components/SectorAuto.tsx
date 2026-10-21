import { Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { AUTO_LINE, AUTO_SPLIT } from "@/lib/auto-message";
import type { SectorPageRich } from "@/data/sectorPageTypes";
import { stripLeadIcon } from "@/lib/strip-icon";

/**
 * THE SENTENCE UNDER THE HERO, AND THE BAND THAT BACKS IT UP.
 *
 * A sector page used to tell the merchant how to apply Ziadah: a rollout plan,
 * setup phases, a list of best practices. That is the opposite of the product,
 * which is: activate the app, and Ziadah sets everything up by itself with AI.
 * The strip says it in one line right under the hero; the band says who does
 * what, and names what Ziadah will tune in THIS sector, from the sector's own
 * signals.
 */

export function AutoStrip() {
  const { isAr } = useLanguage();
  return (
    <div className="auto-strip">
      <p>
        <Sparkles aria-hidden="true" />
        <span>{isAr ? AUTO_LINE.ar : AUTO_LINE.en}</span>
      </p>
    </div>
  );
}

export function SectorAuto({ rich, sectorTitle }: { rich?: SectorPageRich; sectorTitle: string }) {
  const { isAr } = useLanguage();
  const pick = <T extends { ar: string; en: string }>(o: T) => (isAr ? o.ar : o.en);
  const signals = ((isAr ? rich?.aiSignalsAr : rich?.aiSignalsEn) ?? []).map((s) => stripLeadIcon(s));
  const tuned = signals.length
    ? isAr
      ? `في ${sectorTitle} يضبط حسب: ${signals.join("، ")}.`
      : `In ${sectorTitle} it tunes by: ${signals.join(", ")}.`
    : null;

  return (
    <div id="section-how-to" className="rv d1 sector-block auto-band" style={{ scrollMarginTop: 120 }}>
      <h2 className="section-head-title--sm">
        {isAr ? `فعّل، وزيادة يضبط الباقي في ${sectorTitle}` : `Activate, and Ziadah sets up the rest for ${sectorTitle}`}
      </h2>
      <div className="auto-band-grid">
        <div className="auto-band-card">
          <b>{pick(AUTO_SPLIT.you.title)}</b>
          <p>{pick(AUTO_SPLIT.you.body)}</p>
        </div>
        <div className="auto-band-card" data-main="">
          <b>{pick(AUTO_SPLIT.ziadah.title)}</b>
          <p>{pick(AUTO_SPLIT.ziadah.body)}</p>
          {tuned ? <p className="auto-band-tuned">{tuned}</p> : null}
        </div>
      </div>
    </div>
  );
}
