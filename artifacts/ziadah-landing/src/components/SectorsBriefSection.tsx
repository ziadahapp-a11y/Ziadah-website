import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bike, Store, Shirt, Smartphone, Sparkles,
  UtensilsCrossed, Dumbbell, Gem, Home, Package,
  Stethoscope, Award,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as staticT } from "@/i18n/translations";
import { sectors } from "@/data/sectors";
import { useLangAwareLocation } from "@/hooks/useLangAwareLocation";

const SECTOR_LUCIDE_ICONS: Record<string, LucideIcon> = {
  "delivery-apps":       Bike,
  "ecommerce-platforms": Store,
  "abayas-fashion":      Shirt,
  "electronics":         Smartphone,
  "beauty-care":         Sparkles,
  "restaurants-cafes":   UtensilsCrossed,
  "health-fitness":      Dumbbell,
  "jewelry":             Gem,
  "home-supplies":       Home,
  "digital-products":    Package,
  "clinics":             Stethoscope,
  "gold":                Award,
};

/** عيّنة مختصرة للصفحة الرئيسية — التوصيل والمنصات أولاً ثم أشهر المجالات */
const SECTOR_TEASER_SLUGS = [
  "delivery-apps",
  "ecommerce-platforms",
  "abayas-fashion",
  "electronics",
  "beauty-care",
  "restaurants-cafes",
  "health-fitness",
  "jewelry",
  "home-supplies",
  "digital-products",
  "clinics",
  "gold",
] as const;

function SecTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="stag rv">
      <span className="stag-dot" />
      {children}
    </div>
  );
}

export default function SectorsBriefSection() {
  const { lang, dir } = useLanguage();
  const tr = staticT[lang];
  const [, goRoute] = useLangAwareLocation();
  const rootRef = useRef<HTMLElement>(null);

  // Reveal `.rv` elements on scroll — mirrors the observer on the original landing page.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" },
    );
    root.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={rootRef} id="sectors" className="landing-sectors-section">
      <div className="landing-sectors-panel rv d1">
        <div className="landing-sectors-panel__inner">
          <div className="tc landing-sectors-head">
            <SecTag>{tr.landing.sectorsTag}</SecTag>
            <h2 className="st rv d1 landing-sectors-title">{tr.landing.sectorsTitle}</h2>
            <p className="ssub rv d2 landing-sectors-sub">{tr.landing.sectorsBriefSub}</p>
          </div>
          <div className="landing-sectors-grid">
            {SECTOR_TEASER_SLUGS.map((slug) => sectors.find((s) => s.slug === slug))
              .filter(Boolean)
              .map((sec) => {
                const stitle = lang === "ar" ? sec!.titleAr : sec!.titleEn;
                return (
                  <button
                    key={sec!.slug}
                    type="button"
                    className="landing-sectors-chip"
                    dir={dir}
                    onClick={() => goRoute(`/sectors/${sec!.slug}`)}
                  >
                    <span className="landing-sectors-chip__ico" aria-hidden>
                      {(() => {
                        const Icon = SECTOR_LUCIDE_ICONS[sec!.slug];
                        return Icon ? <Icon size={18} strokeWidth={1.7} /> : sec!.icon;
                      })()}
                    </span>
                    <span className="landing-sectors-chip__label">{stitle}</span>
                  </button>
                );
              })}
          </div>
          <div className="tc landing-sectors-cta">
            <button
              type="button"
              onClick={() => goRoute("/sectors")}
              className="btn-p"
              style={{ cursor: "pointer", fontFamily: "var(--font)", border: "none" }}
            >
              {tr.landing.sectorsCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
