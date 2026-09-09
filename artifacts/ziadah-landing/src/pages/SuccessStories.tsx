import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import PageShell from "../components/PageShell";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import SEO from "../components/SEO";
import { BreadcrumbSchema, WebPageSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { getPageKeywords } from "@/seo/page-keywords";
import { stories, storyEn, type StoryData } from "@/data/successStoriesData";
import { navigateTo } from "@/components/PageTransition";
import { HeroLede, Section, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import { t as siteTranslations } from "@/i18n/translations";

const SECTOR_NAME_EN: Record<string, string> = {
  "الكل": "All",
  "مستلزمات التنظيف": "Cleaning Supplies",
  "منتجات البشرة": "Skincare Products",
  "الأقمشة الرجالية": "Men's Fabrics",
  "عبايات الحج واللباس المحتشم": "Hajj Abayas & Modest Wear",
  "متجر إلكتروني متنوع": "General E-commerce",
  "العود والبخور": "Oud & Incense",
  "مستحضرات العناية بالبشرة": "Skincare & Cosmetics",
  "عطور": "Perfumes",
  "عسل طبيعي": "Natural Honey",
  "موقع التبرعات الإلكترونية": "Online Donations",
};

const SECTOR_ICONS: Record<string, string> = {
  "الكل": "✦",
  "مستلزمات التنظيف": "🧴",
  "منتجات البشرة": "💄",
  "الأقمشة الرجالية": "👔",
  "عبايات الحج واللباس المحتشم": "🌙",
  "متجر إلكتروني متنوع": "🛍️",
  "العود والبخور": "🕌",
  "مستحضرات العناية بالبشرة": "✨",
  "عطور": "🌸",
  "عسل طبيعي": "🍯",
  "موقع التبرعات الإلكترونية": "🤲",
};

type SectorRow = { nameAr: string; name: string; icon: string; stores: string; avg: string };

const sectorsEn: SectorRow[] = [
  { nameAr: "مستلزمات التنظيف", name: "Cleaning Supplies", icon: "🧴", stores: "2 stories", avg: "Featured" },
  { nameAr: "منتجات البشرة", name: "Skincare Products", icon: "💄", stores: "2 stories", avg: "Featured" },
  { nameAr: "الأقمشة الرجالية", name: "Men's Fabrics", icon: "👔", stores: "1 story", avg: "Featured" },
  { nameAr: "عبايات الحج واللباس المحتشم", name: "Hajj Abayas & Modest Wear", icon: "🌙", stores: "1 story", avg: "Featured" },
  { nameAr: "متجر إلكتروني متنوع", name: "General E-commerce", icon: "🛍️", stores: "1 story", avg: "Featured" },
  { nameAr: "العود والبخور", name: "Oud & Incense", icon: "🕌", stores: "1 story", avg: "Featured" },
  { nameAr: "مستحضرات العناية بالبشرة", name: "Skincare & Cosmetics", icon: "✨", stores: "1 story", avg: "Featured" },
  { nameAr: "عطور", name: "Perfumes", icon: "🌸", stores: "2 stories", avg: "Featured" },
  { nameAr: "عسل طبيعي", name: "Natural Honey", icon: "🍯", stores: "1 story", avg: "Featured" },
  { nameAr: "موقع التبرعات الإلكترونية", name: "Online Donations", icon: "🤲", stores: "1 story", avg: "Featured" },
];

const sectors: SectorRow[] = [
  { nameAr: "مستلزمات التنظيف", name: "Cleaning Supplies", icon: "🧴", stores: "قصتان", avg: "في الصفحة" },
  { nameAr: "منتجات البشرة", name: "Skincare Products", icon: "💄", stores: "قصتان", avg: "في الصفحة" },
  { nameAr: "الأقمشة الرجالية", name: "Men's Fabrics", icon: "👔", stores: "قصة", avg: "في الصفحة" },
  { nameAr: "عبايات الحج واللباس المحتشم", name: "Hajj Abayas & Modest Wear", icon: "🌙", stores: "قصة", avg: "في الصفحة" },
  { nameAr: "متجر إلكتروني متنوع", name: "General E-commerce", icon: "🛍️", stores: "قصة", avg: "في الصفحة" },
  { nameAr: "العود والبخور", name: "Oud & Incense", icon: "🕌", stores: "قصة", avg: "في الصفحة" },
  { nameAr: "مستحضرات العناية بالبشرة", name: "Skincare & Cosmetics", icon: "✨", stores: "قصة", avg: "في الصفحة" },
  { nameAr: "عطور", name: "Perfumes", icon: "🌸", stores: "قصتان", avg: "في الصفحة" },
  { nameAr: "عسل طبيعي", name: "Natural Honey", icon: "🍯", stores: "قصة", avg: "في الصفحة" },
  { nameAr: "موقع التبرعات الإلكترونية", name: "Online Donations", icon: "🤲", stores: "قصة", avg: "في الصفحة" },
];

const allSectors = Array.from(new Set(stories.map(s => s.sector)));

// Brief story card — TrackFlow bordered white card linking to the detail page.
function BriefStoryCard({ s, isAr }: { s: StoryData; isAr: boolean }) {
  const en = storyEn[s.store];
  const sectorLabel = isAr ? s.sector : (en?.sector || SECTOR_NAME_EN[s.sector] || s.sector);
  const storeLabel = isAr ? s.store : (en?.store || s.store);
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  /* Google's favicon service can be blocked or simply miss a domain. The
     absent-logo fallback only fired when a story had no URL at all, so a
     failed fetch left a broken-image glyph on the card. */
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <a
      href={`/success-stories/${s.slug}`}
      className="card card--short card--clickable"
      onClick={(e) => {
        e.preventDefault();
        navigateTo(`/success-stories/${s.slug}`);
      }}
      aria-label={isAr ? `اقرأ قصة ${s.store}` : `Read ${storeLabel} story`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* The logo keeps a white plate: a merchant's mark is a supplied
            asset drawn for a white ground, and tinting the plate to the
            section would put half of them on a colour they were never cut
            for. The initial fallback takes the section's ink. */}
        {s.logoUrl && !logoFailed ? (
          <div className="shrink-0 w-12 h-12 rounded-xl p-1.5 flex items-center justify-center overflow-hidden bg-[var(--general-white)]">
            <img
              src={s.logoUrl}
              alt=""
              loading="lazy"
              className="w-full h-full object-contain"
              onError={() => setLogoFailed(true)}
            />
          </div>
        ) : (
          <div className="card-ico shrink-0 text-lg font-bold">{s.logo}</div>
        )}
        <div className="flex-1 min-w-0">
          {/* Two lines, not one. `truncate` was cutting 142px off the longest
              store names at the tablet tier - "جمعية تحفيظ القرآن - خميس
              مشيط" lost more than half of itself - and a merchant's name is
              the one thing on this card that must survive. */}
          <h3 className="t-sm-med line-clamp-2">{storeLabel}</h3>
          <span className="card-eyebrow inline-flex items-center gap-1.5">
            <span aria-hidden>{SECTOR_ICONS[s.sector] || "◆"}</span>
            {sectorLabel}
          </span>
        </div>
      </div>

      <div className="card-inset">
        <div className="card-eyebrow">{isAr ? "إجمالي المبيعات" : "Total sales"}</div>
        <div className="card-title num-ltr">
          {s.sales}
          <span className="ms-1.5 t-sm-med">{isAr ? "ر.س" : "SAR"}</span>
        </div>
      </div>

      <div className="card-cta card-foot">
        <span>{isAr ? "اقرأ القصة كاملة" : "Read full story"}</span>
        <Arrow className="card-arrow w-4 h-4" aria-hidden />
      </div>
    </a>
  );
}

export default function SuccessStories() {
  const t = siteTranslations;
  const { lang, isAr } = useLanguage();
  const sx = t[lang].successStoriesPage;
  const pk = getPageKeywords("/success-stories");
  const [activeSector, setActiveSector] = useState("الكل");
  const [visible, setVisible] = useState(true);
  const filterRef = useRef<HTMLDivElement>(null);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const sectorDisplay = (arName: string) => isAr ? arName : (SECTOR_NAME_EN[arName] || arName);
  const prevSectorRef = useRef<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [activeSector, visible]);

  useEffect(() => {
    if (!visible) return;
    const prev = prevSectorRef.current;
    if (prev !== null && prev !== activeSector) {
      document.querySelectorAll(".stories-fade-v2 .story-full-section.rv").forEach(el => el.classList.add("on"));
    }
    prevSectorRef.current = activeSector;
  }, [activeSector, visible]);


  const handleSectorChange = (sector: string) => {
    if (sector === activeSector) return;
    setVisible(false);
    setTimeout(() => {
      setActiveSector(sector);
      setVisible(true);
    }, 220);
  };

  const filteredStories = activeSector === "الكل"
    ? stories
    : stories.filter(s => s.sector === activeSector);

  const sectorCounts: Record<string, number> = { "الكل": stories.length };
  allSectors.forEach(sec => {
    sectorCounts[sec] = stories.filter(s => s.sector === sec).length;
  });

  const filterTabs = ["الكل", ...allSectors];

  const SectorChevron = isAr ? ChevronRight : ChevronLeft;


  return (
    <>
      <SEO
        titleAr={t.ar.successStoriesPage.seoTitle}
        titleEn={t.en.successStoriesPage.seoTitle}
        descriptionAr={t.ar.successStoriesPage.seoDesc}
        descriptionEn={t.en.successStoriesPage.seoDesc}
        canonical="/success-stories"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <BreadcrumbSchema items={[{ name: isAr ? "الرئيسية" : "Home", url: "/" }, { name: isAr ? "قصص النجاح" : "Success Stories", url: "/success-stories" }]} />
      <WebPageSchema
        name={sx.seoTitle}
        description={sx.seoDesc}
        url="/success-stories"
      />
      {/* The forced `#fff` is gone. A page's ground is its first section's,
          and painting white here put a white slab under every band that had
          stamped its own family. */}
      <PageShell className="relative overflow-x-clip">
        {/* ══════════════════ HERO ══════════════════ */}
        <HeroLede
          family="violet"
          eyebrow={sx.heroTag}
          title={
            <>
              {sx.heroH1Gradient}
              <span className="hero-title-sub">{sx.heroH1Sub}</span>
            </>
          }
          body={sx.heroLead}
        >
          {/* The three numbers are this page's claim, so they read as the
              system's stat row rather than as three cards competing with the
              headline above them. */}
          <ul className="uc-stats hero-stats">
            {(isAr ? [
              ["13", "قصة نجاح موثقة"],
              ["192K+", "عملية تحويل"],
              ["4.6M+", "ريال مبيعات"],
            ] : [
              ["13", "Verified Stories"],
              ["192K+", "Conversions"],
              ["4.6M+", "SAR in Sales"],
            ]).map(([v, l]) => (
              <li key={l} className="uc-stat">
                <span className="uc-stat-value num-ltr">{v}</span>
                <span className="uc-stat-label">{l}</span>
              </li>
            ))}
          </ul>
        </HeroLede>

        {/* ══════════════════ STICKY SECTOR FILTER ══════════════════ */}
        {/* The filter is chrome, not a band: it sticks across sections of
            different families, so it takes the neutral surface roles rather
            than any one section's pair. */}
        <nav className="sector-filter" aria-label={isAr ? "تصفية حسب القطاع" : "Filter by sector"}>
          <div className="container">
            <div
              ref={filterRef}
              className="flex gap-2 flex-wrap justify-center max-md:flex-nowrap max-md:justify-start max-md:overflow-x-auto"
            >
              {filterTabs.map(sector => {
                const active = activeSector === sector;
                return (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => handleSectorChange(sector)}
                    className="chip gap-2"
                    aria-pressed={active}
                  >
                    <span aria-hidden>{SECTOR_ICONS[sector] || "◆"}</span>
                    <span>{sectorDisplay(sector)}</span>
                    <span className="chip-count num-ltr">{sectorCounts[sector] || 0}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ══════════════════ STORY GRID ══════════════════ */}
        <Section family="grey">
          <Shell width="wide">
            {activeSector !== "الكل" && (
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="sector-card-text">
                  {isAr ? (
                    <>عرض <span className="font-bold num-ltr">{filteredStories.length}</span> قصة في قطاع{" "}<span className="font-bold">{activeSector}</span></>
                  ) : (
                    <>Showing <span className="font-bold num-ltr">{filteredStories.length}</span> {filteredStories.length === 1 ? "story" : "stories"} in{" "}<span className="font-bold">{SECTOR_NAME_EN[activeSector] || activeSector}</span></>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleSectorChange("الكل")}
                  className="chip"
                >
                  {isAr ? "عرض الكل" : "Show All"}
                </button>
              </div>
            )}
            <div
              className={`stories-fade-v2 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {filteredStories.map((s) => (
                <BriefStoryCard key={s.slug} s={s} isAr={isAr} />
              ))}
            </div>
          </Shell>
        </Section>

        {/* ══════════════════ BY SECTOR ══════════════════ */}
        <Section family="violet">
          <SectionHead
            center
            kicker={isAr ? "حسب القطاع" : "By Sector"}
            title={isAr ? "نجاح في كل قطاع" : "Success in Every Sector"}
            lead={isAr ? "زيادة يعمل مع جميع أنواع المتاجر — اكتشف النتائج في مجالك" : "Ziadah works with all types of stores — discover the results in your industry"}
          />
          <Shell width="wide">
            <div className="cards-grid">
              {(isAr ? sectors : sectorsEn).map(s => {
                const sectorArName = s.nameAr;
                const count = stories.filter(st => st.sector === sectorArName).length;
                return (
                  <button
                    key={sectorArName}
                    type="button"
                    onClick={() => {
                      handleSectorChange(sectorArName);
                      window.scrollTo({ top: 520, behavior: "smooth" });
                    }}
                    className="card card--short card--pick card--clickable flex-row items-center gap-4"
                  >
                    <span className="text-4xl leading-none shrink-0" aria-hidden>{s.icon}</span>
                    <span className="flex-1 min-w-0 flex flex-col gap-1">
                      <span className="t-sm-med">{isAr ? s.nameAr : s.name}</span>
                      <span className="card-eyebrow">{s.stores} · {s.avg}</span>
                      {count > 0 && (
                        <span className="pill pill--soon num-ltr self-start !ms-0">
                          {count} {isAr ? "قصة نجاح" : (count === 1 ? "success story" : "success stories")}
                        </span>
                      )}
                    </span>
                    <SectorChevron className="card-arrow w-4 h-4 shrink-0 opacity-50" aria-hidden />
                  </button>
                );
              })}
            </div>
          </Shell>
        </Section>

        <PageClosingCta
          title={sx.ctaClosingTitle}
          description={sx.ctaClosingDesc}
          buttonLabel={sx.ctaClosingBtn}
          onActivate={() => setPlatformModalOpen(true)}
        />
      </PageShell>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
