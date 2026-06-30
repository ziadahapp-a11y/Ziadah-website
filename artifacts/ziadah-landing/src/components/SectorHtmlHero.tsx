import { useState } from "react";
import { Rocket, ArrowDown, Plus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SectorPageRich } from "@/data/sectorPageTypes";
import PlatformModal from "@/components/PlatformModal";

type Props = {
  rich: SectorPageRich;
  sectorTitle: string;
  sectorsBreadcrumb: string;
  onScrollTo: (id: string) => void;
};

const gridStyle = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
} as const;

/** Splits "🍔 Burger — 25 SAR" style lines into icon / name / price. */
function splitLine(text: string) {
  const m = text.match(/^(\S+)\s+(.+?)\s*[—–]\s*(.+)$/);
  return m ? { icon: m[1], name: m[2], price: m[3] } : { icon: "", name: text, price: "" };
}

/**
 * Sector hero — rebuilt on the TrackFlow design system so it matches the
 * use-case page heroes exactly (violet eyebrow pill, bold zinc-950 heading
 * with a violet accent line, muted subtitle, near-black + outline CTAs, and a
 * light bordered product mockup on the side). Content still comes from the
 * sector `rich` data.
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
      <section dir={dir} className="relative pt-20 pb-20 md:pt-28 md:pb-24 px-4 border-b border-zinc-200">
        <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
        <div className="container mx-auto relative max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            {/* ── copy ── */}
            <div className="text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
                </span>
                <span className="text-xs font-semibold text-violet-700">{badge || sectorsBreadcrumb}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-6 leading-[1.08]">
                {useSplit ? (
                  <>
                    {isAr ? rich.heroHeadlineLine1Ar : rich.heroHeadlineLine1En}{" "}
                    <span className="text-violet-600">
                      {isAr ? rich.heroHeadlineLine2Ar : rich.heroHeadlineLine2En}
                    </span>
                  </>
                ) : (
                  <>{isAr ? rich.heroHeadlineAr : rich.heroHeadlineEn}</>
                )}
              </h1>

              <p className="text-lg text-zinc-600 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">{sub}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => setPlatformModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base h-12 px-7 rounded-md bg-zinc-950 hover:bg-zinc-800 text-white font-semibold transition-colors"
                >
                  <Rocket className="w-4 h-4" />
                  {isAr ? "فعّل الآن" : "Activate Now"}
                </button>
                <button
                  type="button"
                  onClick={() => onScrollTo(primaryCta)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base h-12 px-7 rounded-md border border-zinc-300 text-zinc-950 hover:bg-zinc-100 font-semibold transition-colors"
                >
                  {isAr ? "شوف كيف تشتغل" : "See how it works"}
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <p className="mt-6 text-xs text-zinc-500">
                <span className="font-bold text-violet-600">{isAr ? "القطاع" : "Sector"}: </span>
                {sectorTitle}
              </p>
            </div>

            {/* ── product mockup ── */}
            <div className="relative w-full mt-4 lg:mt-0 flex justify-center">
              {ft1 ? (
                <div className="absolute -top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white border border-zinc-200 shadow-card px-3 py-1.5 text-xs font-bold text-zinc-700 start-2 lg:start-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {ft1}
                </div>
              ) : null}

              <div dir={dir} className="w-full max-w-[340px] rounded-3xl border border-zinc-200 bg-white shadow-card-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-zinc-50/70">
                  <span className="text-sm font-bold text-zinc-900">{phoneBar}</span>
                  <span className="text-xs text-zinc-400 num-ltr">12:34</span>
                </div>
                <div className="p-4 space-y-2.5">
                  {rich.phoneOrders.map((line, i) => {
                    const s = splitLine(isAr ? line.ar : line.en);
                    return (
                      <div key={i} className="flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-3 py-2.5">
                        <span className="text-lg leading-none">{s.icon}</span>
                        <span className="flex-1 text-sm font-semibold text-zinc-800">{s.name}</span>
                        {s.price ? <span className="text-sm font-bold text-zinc-900 num-ltr">{s.price}</span> : null}
                      </div>
                    );
                  })}

                  <div className="rounded-xl border border-violet-200 bg-violet-50/70 p-3 mt-1">
                    <div className="text-xs font-bold tracking-wide text-violet-700 mb-2">
                      {isAr ? "زيادة يقترح" : "Ziadah suggests"}
                    </div>
                    <div className="space-y-2">
                      {rich.phoneRecs.map((line, i) => {
                        const s = splitLine(isAr ? line.ar : line.en);
                        return (
                          <div key={i} className="flex items-center gap-2.5 rounded-lg bg-white border border-violet-100 px-2.5 py-2">
                            <span className="text-base leading-none">{s.icon}</span>
                            <span className="flex-1 text-[13px] font-semibold text-zinc-800">{s.name}</span>
                            {s.price ? <span className="text-xs font-bold text-zinc-900 num-ltr">{s.price}</span> : null}
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-zinc-950 text-white text-[11px] font-bold px-2 py-1">
                              <Plus className="w-3 h-3" />
                              {isAr ? "أضف" : "Add"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {ft2 ? (
                <div className="absolute -bottom-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white border border-zinc-200 shadow-card px-3 py-1.5 text-xs font-bold text-zinc-700 end-2 lg:end-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  {ft2}
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
