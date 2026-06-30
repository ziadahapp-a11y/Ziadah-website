import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";
import { ZID_APP_URL } from "@/lib/pricing-data";

export function AnnouncementBar() {
  const { lang } = useLang();
  const t = useT();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="w-full bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-xs md:text-sm">
        <Sparkles className="w-3.5 h-3.5 text-green-400 shrink-0" />
        <span className="font-bold text-green-300 uppercase tracking-widest text-[10px] hidden md:inline">
          {t({ ar: "متاح الآن", en: "Live now" })}
        </span>
        <span className="text-zinc-200 hidden sm:inline">
          {t({
            ar: "راصد متاح الآن على متجر تطبيقات زد — فعّله بضغطة.",
            en: "Rasid is now live on the Zid app market — activate in one click.",
          })}
        </span>
        <span className="text-zinc-200 sm:hidden">
          {t({ ar: "متاح الآن على زد", en: "Now live on Zid" })}
        </span>
        <a
          href={ZID_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-white text-zinc-950 hover:bg-zinc-200 transition-colors font-semibold rounded-full px-3 py-1 text-xs shrink-0"
          data-testid="announcement-cta"
        >
          {t({ ar: "فعّل الآن على زد", en: "Activate now on Zid" })}
          <Arrow className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
