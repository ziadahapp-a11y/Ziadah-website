import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import PageShell from "../components/PageShell";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import SEO from "../components/SEO";
import { BreadcrumbSchema, WebPageSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { useSiteT } from "../cms/siteContent";
import { getPageKeywords } from "@/seo/page-keywords";
import { stories, storyEn, type StoryData } from "@/data/successStoriesData";
import { navigateTo } from "@/components/PageTransition";

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

  return (
    <button
      type="button"
      className="group flex flex-col gap-5 text-start rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-card transition-all"
      onClick={() => navigateTo(`/success-stories/${s.slug}`)}
      aria-label={isAr ? `اقرأ قصة ${s.store}` : `Read ${storeLabel} story`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {s.logoUrl ? (
          <div className="shrink-0 w-12 h-12 rounded-xl border border-zinc-200 bg-white p-1.5 flex items-center justify-center overflow-hidden">
            <img src={s.logoUrl} alt="" loading="lazy" className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="shrink-0 w-12 h-12 rounded-xl bg-zinc-950 text-white text-lg font-bold flex items-center justify-center">
            {s.logo}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-zinc-950 leading-snug mb-1 truncate">{storeLabel}</h3>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
            <span aria-hidden>{SECTOR_ICONS[s.sector] || "◆"}</span>
            {sectorLabel}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
        <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-1.5">
          {isAr ? "إجمالي المبيعات" : "Total sales"}
        </div>
        <div className="text-2xl font-extrabold text-zinc-950 num-ltr">
          {s.sales}
          <span className="ms-1.5 text-sm font-bold text-zinc-500">{isAr ? "ر.س" : "SAR"}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 text-sm font-bold text-green-600 border-t border-zinc-100">
        <span>{isAr ? "اقرأ القصة كاملة" : "Read full story"}</span>
        <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
      </div>
    </button>
  );
}

export default function SuccessStories() {
  const t = useSiteT();
  const { lang, isAr, dir } = useLanguage();
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

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

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
      <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff" }}>
        {/* ══════════════════ HERO ══════════════════ */}
        <section dir={dir} className="relative pt-20 pb-20 md:pt-28 md:pb-24 px-4 border-b border-zinc-200">
          <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
          <div className="container mx-auto relative max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 border border-green-200 mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-green-700">{sx.heroTag}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 mb-4 leading-[1.05]">
              {sx.heroH1Gradient}
              <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-500 mt-3">
                {sx.heroH1Sub}
              </span>
            </h1>

            <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">{sx.heroLead}</p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {(isAr ? [
                ["13", "قصة نجاح موثقة"],
                ["192K+", "عملية تحويل"],
                ["4.6M+", "ريال مبيعات"],
              ] : [
                ["13", "Verified Stories"],
                ["192K+", "Conversions"],
                ["4.6M+", "SAR in Sales"],
              ]).map(([v, l]) => (
                <div key={l} className="rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-card">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 num-ltr">{v}</div>
                  <div className="mt-1.5 text-xs sm:text-sm text-zinc-600 font-semibold">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ STICKY SECTOR FILTER ══════════════════ */}
        <nav
          className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-zinc-200"
          aria-label={isAr ? "تصفية حسب القطاع" : "Filter by sector"}
        >
          <div className="container mx-auto max-w-6xl px-4 py-3">
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
                    className={`inline-flex items-center gap-2 rounded-full text-xs font-bold px-3.5 py-2 whitespace-nowrap transition-colors ${
                      active
                        ? "bg-zinc-950 text-white border border-zinc-950"
                        : "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    <span aria-hidden>{SECTOR_ICONS[sector] || "◆"}</span>
                    <span>{sectorDisplay(sector)}</span>
                    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md text-[11px] font-extrabold num-ltr ${
                      active ? "bg-white/20 text-white" : "bg-green-100 text-green-700"
                    }`}>
                      {sectorCounts[sector] || 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ══════════════════ STORY GRID ══════════════════ */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            {activeSector !== "الكل" && (
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="text-sm text-zinc-600">
                  {isAr ? (
                    <>عرض <span className="font-extrabold text-green-600 num-ltr">{filteredStories.length}</span> قصة في قطاع{" "}<span className="font-bold text-zinc-950">{activeSector}</span></>
                  ) : (
                    <>Showing <span className="font-extrabold text-green-600 num-ltr">{filteredStories.length}</span> {filteredStories.length === 1 ? "story" : "stories"} in{" "}<span className="font-bold text-zinc-950">{SECTOR_NAME_EN[activeSector] || activeSector}</span></>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleSectorChange("الكل")}
                  className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-100 transition-colors"
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
          </div>
        </section>

        {/* ══════════════════ BY SECTOR ══════════════════ */}
        <section className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <div className="mb-4">
                <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase">
                  {isAr ? "حسب القطاع" : "By Sector"}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4 leading-tight">
                {isAr ? "نجاح في كل قطاع" : "Success in Every Sector"}
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                {isAr ? "زيادة يعمل مع جميع أنواع المتاجر — اكتشف النتائج في مجالك" : "Ziadah works with all types of stores — discover the results in your industry"}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                    className="group flex items-center gap-4 text-start rounded-2xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 hover:shadow-card transition-all"
                  >
                    <div className="text-4xl leading-none shrink-0" aria-hidden>{s.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[15px] text-zinc-950 mb-1">{isAr ? s.nameAr : s.name}</div>
                      <div className="text-xs text-zinc-500 mb-1.5">{s.stores} · {s.avg}</div>
                      {count > 0 && (
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 border border-green-100 px-2.5 py-0.5 rounded-md num-ltr">
                          {count} {isAr ? "قصة نجاح" : (count === 1 ? "success story" : "success stories")}
                        </div>
                      )}
                    </div>
                    <SectorChevron className="w-4 h-4 text-zinc-300 shrink-0 transition-colors group-hover:text-green-600" aria-hidden />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

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
