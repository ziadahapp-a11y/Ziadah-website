import { useEffect, useState, useRef, type CSSProperties } from "react";
import PageShell from "../components/PageShell";
import DsPageBackdrop from "@/components/DsPageBackdrop";
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

function BriefStoryCard({ s, isAr }: { s: StoryData; isAr: boolean }) {
  const en = storyEn[s.store];
  const sectorLabel = isAr ? s.sector : (en?.sector || SECTOR_NAME_EN[s.sector] || s.sector);
  const storeLabel = isAr ? s.store : (en?.store || s.store);

  return (
    <button
      type="button"
      className="brief-story-card"
      onClick={() => navigateTo(`/success-stories/${s.slug}`)}
      aria-label={isAr ? `اقرأ قصة ${s.store}` : `Read ${storeLabel} story`}
    >
      <div className="brief-story-card__topbar" />
      <div className="brief-story-card__head">
        {s.logoUrl ? (
          <div className="brief-story-card__logo brief-story-card__logo--img">
            <img src={s.logoUrl} alt="" loading="lazy" />
          </div>
        ) : (
          <div className="brief-story-card__logo">{s.logo}</div>
        )}
        <div className="brief-story-card__head-text">
          <h3 className="brief-story-card__title">{storeLabel}</h3>
          <span className="brief-story-card__sector">
            <span className="brief-story-card__sector-ico">{SECTOR_ICONS[s.sector] || "◆"}</span>
            {sectorLabel}
          </span>
        </div>
      </div>

      <div className="brief-story-card__kpi">
        <div className="brief-story-card__kpi-label">{isAr ? "إجمالي المبيعات" : "Total sales"}</div>
        <div className="brief-story-card__kpi-value">
          {s.sales}
          <span className="brief-story-card__kpi-currency">{isAr ? "ر.س" : "SAR"}</span>
        </div>
      </div>

      <div className="brief-story-card__cta">
        <span>{isAr ? "اقرأ القصة كاملة" : "Read full story"}</span>
        <span className="brief-story-card__cta-arrow" aria-hidden>{isAr ? "←" : "→"}</span>
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
      <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
        <DsPageBackdrop />
        <style>{`
          .story-full-section {
            position: relative;
            isolation: isolate;
            min-height: 0;
            height: fit-content;
          }
          .story-full-section:not(:last-child)::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: min(480px, 72%);
            height: 1px;
            background: linear-gradient(90deg, transparent, color-mix(in srgb, #a855f7 35%, transparent), transparent);
            opacity: 0.5;
            pointer-events: none;
          }
          .story-card-v3 {
            position: relative;
            isolation: isolate;
            overflow: hidden;
            border-radius: 24px;
            border: 1px solid var(--b1);
            background:
              linear-gradient(155deg, rgba(255,255,255,.09) 0%, rgba(255,255,255,.03) 42%, rgba(0,0,0,.14) 100%);
            backdrop-filter: blur(24px) saturate(1.15);
            box-shadow:
              0 4px 24px rgba(0,0,0,.22),
              inset 0 1px 0 rgba(255,255,255,.07);
            transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease, border-color 0.3s ease;
          }
          .story-card-v3::after {
            content: '';
            pointer-events: none;
            position: absolute;
            inset: 0;
            border-radius: inherit;
            box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--story-accent) 12%, transparent);
            opacity: 0.65;
          }
          .story-card-v3-glow {
            pointer-events: none;
            position: absolute;
            inset: -38% -18% auto auto;
            width: 58%;
            height: 52%;
            border-radius: 50%;
            background: radial-gradient(circle at center, color-mix(in srgb, var(--story-accent) 28%, transparent) 0%, transparent 72%);
            opacity: 0.5;
          }
          .story-card-v3-glow-2 {
            inset: auto auto -42% -22%;
            width: 50%;
            height: 48%;
            background: radial-gradient(circle at center, color-mix(in srgb, var(--story-accent) 14%, transparent) 0%, transparent 70%);
            opacity: 0.4;
          }
          .story-card-v3-topbar {
            height: 5px;
            width: 100%;
            opacity: 1;
            box-shadow: 0 1px 0 rgba(255,255,255,.12) inset;
          }
          .story-card-v3:hover {
            transform: translateY(-6px);
            box-shadow:
              0 32px 80px rgba(0,0,0,.42),
              0 0 0 1px color-mix(in srgb, var(--story-accent) 32%, transparent),
              inset 0 1px 0 rgba(255,255,255,.09);
            border-color: color-mix(in srgb, var(--story-accent) 42%, var(--b1));
          }
          .story-body-v3 {
            position: relative;
            z-index: 1;
            padding-bottom: 4px;
          }
          .story-head-v3 {
            display: flex;
            align-items: flex-start;
            gap: 18px;
            padding: 26px 28px 20px;
            position: relative;
            z-index: 1;
          }
          .story-logo-wrap-v3 {
            flex-shrink: 0;
            padding: 3px;
            border-radius: 20px;
            background: linear-gradient(145deg, rgba(255,255,255,.22), rgba(255,255,255,.04));
            box-shadow: 0 0 0 1px rgba(255,255,255,.08), 0 12px 36px rgba(0,0,0,.35);
          }
          .story-logo-v3 {
            width: 56px;
            height: 56px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 23px;
            font-weight: 900;
            color: #fff;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.25);
          }
          .story-head-text-v3 { flex: 1; min-width: 0; }
          .story-meta-pill-v3 {
            display: inline-flex;
            align-items: center;
            padding: 6px 14px;
            border-radius: 999px;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--td);
            background: rgba(0,0,0,.2);
            border: 1px solid var(--b1);
            backdrop-filter: blur(8px);
          }
          .story-title-row-v3 {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px 12px;
            margin-bottom: 10px;
          }
          .story-title-v3 {
            margin: 0;
            font-size: clamp(1.2rem, 3vw, 1.55rem);
            font-weight: 900;
            color: var(--t);
            letter-spacing: -0.025em;
            line-height: 1.22;
          }
          .story-sector-v3 {
            margin-top: 0;
          }
          .story-sector-chip-v3 {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 10px;
            padding: 8px 14px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 650;
            color: var(--tm);
            background: color-mix(in srgb, var(--story-accent) 9%, rgba(0,0,0,.2));
            border: 1px solid color-mix(in srgb, var(--story-accent) 22%, var(--b1));
          }
          .platform-tag-v3 {
            display: inline-flex;
            align-items: center;
            padding: 4px 11px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 800;
            background: var(--s1);
            border: 1px solid var(--b1);
            color: var(--td);
          }
          .story-sector-ico { font-size: 1.05em; opacity: 0.95; line-height: 1; }
          .story-lede-v3 {
            margin: 0;
            padding: 18px 28px 0;
            font-size: 15px;
            font-weight: 650;
            color: var(--tm);
            line-height: 1.75;
          }
          .story-impact-v3 {
            margin: 22px 28px 0;
            padding: 20px 20px 18px;
            border-radius: 18px;
            background: linear-gradient(165deg, rgba(0,0,0,.24) 0%, rgba(0,0,0,.14) 100%);
            border: 1px solid var(--b1);
            box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
          }
          .story-impact-head-v3 {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--td);
            margin-bottom: 14px;
          }
          .story-impact-icon {
            color: var(--story-accent);
            font-size: 12px;
            opacity: 0.9;
          }
          .story-kpi-grid-v3 {
            display: grid;
            gap: 10px;
            margin-bottom: 12px;
          }
          .story-kpi-grid-v3.kpi-count-1 {
            grid-template-columns: 1fr;
            max-width: 280px;
          }
          .story-kpi-grid-v3.kpi-count-2,
          .story-kpi-grid-v3.kpi-count-3,
          .story-kpi-grid-v3.kpi-count-4 {
            grid-template-columns: repeat(2, 1fr);
          }
          .story-kpi-v3 {
            position: relative;
            padding: 20px 16px 18px;
            border-radius: 16px;
            text-align: center;
            overflow: hidden;
            background: rgba(0,0,0,.28);
            border: 1px solid rgba(255,255,255,.07);
            transition: border-color 0.25s ease, box-shadow 0.25s ease;
          }
          .story-kpi-v3::before {
            content: '';
            position: absolute;
            top: 0;
            left: 12px;
            right: 12px;
            height: 3px;
            border-radius: 0 0 6px 6px;
            opacity: 0.95;
          }
          .story-kpi-conv-v3::before {
            background: linear-gradient(90deg, #7c3aed, #a855f7);
          }
          .story-kpi-sales-v3::before {
            background: linear-gradient(90deg, #0891b2, #22d3ee);
          }
          .story-card-v3:hover .story-kpi-conv-v3 {
            border-color: color-mix(in srgb, #a855f7 35%, var(--b1));
            box-shadow: 0 8px 28px rgba(124,58,237,.12);
          }
          .story-card-v3:hover .story-kpi-sales-v3 {
            border-color: color-mix(in srgb, #06b6d4 35%, var(--b1));
            box-shadow: 0 8px 28px rgba(6,182,212,.1);
          }
          .story-kpi-value-v3 {
            font-size: clamp(1.45rem, 4.2vw, 2rem);
            font-weight: 900;
            font-variant-numeric: tabular-nums;
            line-height: 1.12;
            letter-spacing: -0.035em;
          }
          .story-kpi-conv-v3 .story-kpi-value-v3 {
            background: linear-gradient(135deg, #c4b5fd 0%, #a855f7 45%, #7c3aed 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .story-kpi-sales-v3 .story-kpi-value-v3 {
            background: linear-gradient(135deg, #67e8f9 0%, #06b6d4 50%, #0891b2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .story-kpi-currency-v3 {
            display: inline-block;
            font-size: 0.48em;
            font-weight: 800;
            margin-inline-start: 6px;
            vertical-align: 0.12em;
            -webkit-text-fill-color: var(--tm);
            color: var(--tm);
            opacity: 0.92;
            letter-spacing: 0.02em;
          }
          .story-kpi-label-v3 {
            margin-top: 12px;
            font-size: 11px;
            font-weight: 700;
            color: var(--td);
            line-height: 1.45;
            letter-spacing: 0.04em;
          }
          .story-chips-v3 {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .story-chip-v3 {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 7px 12px 7px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 600;
            color: var(--tm);
            background: rgba(0,0,0,.15);
            border: 1px solid color-mix(in srgb, var(--story-accent) 22%, var(--b1));
          }
          .story-chip-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            flex-shrink: 0;
            box-shadow: 0 0 0 2px rgba(255,255,255,.08);
          }
          .story-quote-v3 {
            position: relative;
            margin: 22px 28px 0;
            padding: 18px 20px;
            padding-inline-start: 52px;
            border-radius: 14px;
            background: rgba(0,0,0,.12);
            border: 1px solid var(--b1);
            border-inline-start: 3px solid var(--story-accent);
          }
          .story-quote-mark {
            position: absolute;
            inset-inline-start: 14px;
            top: 8px;
            font-size: 42px;
            font-weight: 900;
            line-height: 1;
            color: color-mix(in srgb, var(--story-accent) 45%, transparent);
            opacity: 0.55;
            font-family: var(--font);
          }
          .story-quote-v3 p {
            margin: 0;
            font-size: 14px;
            color: var(--tm);
            line-height: 1.85;
            font-style: italic;
          }
          .story-footer-v3 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            padding: 22px 28px 24px;
            margin-top: 4px;
          }
          .story-attrib-v3 {
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 0;
          }
          .story-avatar-v3 {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 900;
            color: #fff;
            flex-shrink: 0;
            box-shadow: 0 4px 16px rgba(0,0,0,.25);
          }
          .story-person-v3 {
            font-size: 14px;
            font-weight: 800;
            color: var(--t);
          }
          .story-role-v3 {
            font-size: 12px;
            color: var(--td);
            margin-top: 2px;
          }
          .expand-btn-v3 {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 10px 18px;
            border-radius: 12px;
            border: 1px solid color-mix(in srgb, var(--story-accent) 35%, var(--b1));
            background: color-mix(in srgb, var(--story-accent) 12%, transparent);
            color: var(--story-accent);
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            font-family: var(--font);
            transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
            flex-shrink: 0;
          }
          .expand-btn-v3:hover {
            background: color-mix(in srgb, var(--story-accent) 22%, transparent);
            border-color: color-mix(in srgb, var(--story-accent) 55%, var(--b1));
          }
          .story-details-v3 {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .story-details-v3.expanded {
            max-height: 2200px;
          }
          .details-grid-v3 {
            padding: 0 28px 28px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
          .detail-panel-v3 {
            position: relative;
            padding: 20px 20px 18px;
            border-radius: 18px;
            border: 1px solid var(--b1);
            overflow: hidden;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
          }
          .detail-panel-v3::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            opacity: 0.9;
          }
          .detail-strategy-v3 {
            background: linear-gradient(165deg, color-mix(in srgb, var(--story-accent) 12%, rgba(0,0,0,.22)) 0%, color-mix(in srgb, var(--story-accent) 5%, rgba(0,0,0,.18)) 100%);
          }
          .detail-strategy-v3::before {
            background: linear-gradient(90deg, var(--story-accent), color-mix(in srgb, var(--story-accent) 60%, #fff));
          }
          .detail-results-v3 {
            background: rgba(16,185,129,.07);
            border-color: rgba(16,185,129,.2);
          }
          .detail-panel-h-v3 {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 12px;
            color: var(--story-accent);
          }
          .detail-challenge-v3 .detail-panel-h-v3::before {
            content: '◆';
            font-size: 9px;
            opacity: 0.75;
            color: #f59e0b;
          }
          .detail-strategy-v3 .detail-panel-h-v3::before {
            content: '◇';
            font-size: 10px;
            opacity: 0.85;
            color: var(--story-accent);
          }
          .detail-results-v3 .detail-panel-h-v3 {
            color: #34d399;
          }
          .detail-panel-p-v3 {
            margin: 0;
            font-size: 14px;
            color: var(--tm);
            line-height: 1.82;
          }
          .detail-results-list-v3 {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .detail-results-list-v3 li {
            display: flex;
            gap: 10px;
            font-size: 13px;
            color: var(--tm);
            line-height: 1.65;
            align-items: flex-start;
          }
          .detail-results-tick {
            color: #34d399;
            font-weight: 900;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .story-two-cards-v3 {
            padding: 0 28px 0;
            margin-top: 2px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            align-items: stretch;
          }
          .detail-challenge-v3 {
            background: linear-gradient(165deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.04) 100%);
            border-color: rgba(245, 158, 11, 0.28);
          }
          .detail-challenge-v3::before {
            background: linear-gradient(90deg, #f59e0b, #fbbf24);
          }
          .detail-challenge-v3 .detail-panel-h-v3 {
            color: #fbbf24;
          }
          .story-popup-strip-v3 {
            padding: 22px 28px 0;
          }
          .story-popup-strip-inner-v3 {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 14px 18px;
            padding: 16px 20px;
            border-radius: 16px;
            background: linear-gradient(125deg, rgba(0,0,0,.2) 0%, color-mix(in srgb, var(--story-accent) 8%, rgba(0,0,0,.16)) 100%);
            border: 1px solid color-mix(in srgb, var(--story-accent) 18%, var(--b1));
            box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
          }
          .story-popup-type-v3 {
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--td);
            flex-shrink: 0;
          }
          .story-popup-badge-v3.platform-tag-v3 {
            font-size: 12px;
            font-weight: 800;
            padding: 10px 18px;
            border-radius: 12px;
            border: 1px solid color-mix(in srgb, var(--story-accent) 40%, var(--b1));
            background: linear-gradient(135deg, color-mix(in srgb, var(--story-accent) 22%, transparent), color-mix(in srgb, var(--story-accent) 8%, rgba(0,0,0,.15)));
            color: var(--story-accent);
            font-family: inherit;
            max-width: 100%;
            white-space: normal;
            text-align: center;
            line-height: 1.4;
            box-shadow: 0 4px 16px color-mix(in srgb, var(--story-accent) 15%, transparent);
          }
          .story-results-kpi-v3 {
            margin: 16px 28px 28px;
          }
          .story-results-head-v3 {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--td);
            margin-bottom: 16px;
          }
          .story-results-ico {
            color: var(--story-accent);
            font-size: 13px;
            opacity: 0.95;
          }
          .story-results-kpi-v3 .story-kpi-grid-v3 {
            margin-bottom: 0;
          }

          .filter-btn-v2 {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 9px 16px;
            border-radius: 999px;
            border: 1px solid var(--b1);
            background: color-mix(in srgb, var(--s1) 65%, transparent);
            color: var(--td);
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
            transition: transform 0.18s ease, border-color 0.22s ease, color 0.22s ease, background-color 0.22s ease;
            font-family: var(--font);
            backdrop-filter: blur(12px);
          }
          .filter-btn-v2:hover {
            border-color: rgba(168,85,247,.45);
            color: var(--t);
            background: rgba(168,85,247,.1);
            transform: translateY(-1px);
          }
          .filter-btn-v2.active {
            background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
            border-color: transparent;
            color: #fff;
            box-shadow: 0 6px 22px rgba(124,58,237,.42), inset 0 1px 0 rgba(255,255,255,.18);
            transform: translateY(-1px);
          }
          .filter-count-v2 {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 20px;
            height: 20px;
            padding: 0 6px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 800;
            background: var(--s3);
            line-height: 1;
          }
          .filter-btn-v2.active .filter-count-v2 {
            background: var(--s3);
          }
          .filter-btn-v2:not(.active) .filter-count-v2 {
            background: rgba(168,85,247,.12);
            color: #a855f7;
          }
          .filter-scroll-wrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
          }
          @media (max-width: 768px) {
            .filter-scroll-wrap {
              flex-wrap: nowrap !important;
              justify-content: flex-start !important;
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;
              padding-bottom: 4px;
            }
            .filter-scroll-wrap::-webkit-scrollbar {
              display: none;
            }
          }
          .stories-fade-v2 {
            transition: opacity 0.25s ease, transform 0.25s ease;
          }
          .stories-fade-v2.hidden {
            opacity: 0;
            transform: translateY(12px);
          }
          .stories-fade-v2.shown {
            opacity: 1;
            transform: translateY(0);
          }
          .success-stories-sticky-toolbar {
            margin-top: 0;
            background: color-mix(in srgb, var(--bg) 88%, transparent);
            backdrop-filter: blur(24px) saturate(1.2);
            border-bottom: 1px solid var(--b1);
            border-image: none;
            box-shadow: 0 8px 24px rgba(0,0,0,.15);
          }
          [data-theme="light"] .success-stories-sticky-toolbar {
            background: color-mix(in srgb, #ffffff 90%, transparent);
            box-shadow: 0 4px 16px rgba(15,23,42,.05);
          }
          .success-stories-hero {
            position: relative;
            background:
              radial-gradient(ellipse 70% 50% at 50% 0%, rgba(168,85,247,.22), transparent 65%),
              radial-gradient(ellipse 100% 60% at 50% 100%, rgba(6,182,212,.06), transparent 70%);
            color: var(--t);
            border-bottom: 1px solid color-mix(in srgb, rgba(168,85,247,.25) 40%, var(--b1));
            padding-block: 64px 80px;
            overflow: hidden;
          }
          .success-stories-hero::before {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image:
              linear-gradient(rgba(168,85,247,.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,.04) 1px, transparent 1px);
            background-size: 48px 48px;
            mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, #000 30%, transparent 80%);
            opacity: 0.6;
          }
          [data-theme="light"] .success-stories-hero {
            background:
              radial-gradient(ellipse 70% 50% at 50% 0%, rgba(168,85,247,.14), transparent 65%),
              linear-gradient(180deg, #fafafe 0%, #ffffff 100%);
            border-bottom-color: rgba(15, 23, 42, 0.08);
          }
          .success-stories-hero > * { position: relative; z-index: 1; }
          .success-stories-hero .hero-stat-v2 {
            background: linear-gradient(165deg, rgba(168,85,247,.1) 0%, rgba(0,0,0,.28) 100%);
            border-color: color-mix(in srgb, rgba(168,85,247,.35) 40%, var(--b1));
            box-shadow: 0 8px 28px rgba(0,0,0,.32), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }
          .success-stories-hero .hero-stat-v2::after {
            opacity: 0.55;
          }
          .success-stories-hero .hero-stat-v2:hover {
            border-color: color-mix(in srgb, rgba(168,85,247,.55) 50%, var(--b1));
            box-shadow: 0 18px 48px rgba(0,0,0,.4), 0 0 0 1px color-mix(in srgb, rgba(168,85,247,.4) 50%, transparent);
          }
          [data-theme="light"] .success-stories-hero .hero-stat-v2 {
            background: linear-gradient(165deg, rgba(255,255,255,.92) 0%, rgba(248, 250, 252, 1) 100%);
            border-color: rgba(168,85,247,.18);
            box-shadow: 0 2px 16px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9);
          }
          .hero-stat-v2 {
            padding: 22px 34px;
            min-width: 140px;
            background: linear-gradient(165deg, color-mix(in srgb, var(--accent, #a855f7) 8%, var(--s1)) 0%, var(--s1) 100%);
            border: 1px solid var(--b1);
            border-radius: 18px;
            backdrop-filter: blur(20px);
            transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
            text-align: center;
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
          }
          .hero-stat-v2::after {
            content: '';
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            border-radius: inherit;
            background: radial-gradient(ellipse 90% 55% at 50% -20%, color-mix(in srgb, var(--accent, #a855f7) 22%, transparent), transparent 65%);
            opacity: 0.45;
          }
          .hero-stat-v2:hover {
            transform: translateY(-5px);
            border-color: color-mix(in srgb, var(--accent, #a855f7) 45%, var(--b1));
            box-shadow: 0 16px 48px rgba(0,0,0,.32), 0 0 0 1px color-mix(in srgb, var(--accent, #a855f7) 15%, transparent);
          }
          .hero-stat-v2::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            height: 3px;
            border-radius: 18px 18px 0 0;
            z-index: 2;
          }
          .hero-stat-v2 > div {
            position: relative;
            z-index: 1;
          }
          .sector-card-v2 {
            padding: 18px 20px;
            border-radius: 16px;
            border: 1px solid var(--b1);
            background: linear-gradient(165deg, rgba(168,85,247,.04) 0%, rgba(0,0,0,.16) 100%);
            display: flex;
            align-items: center;
            gap: 14px;
            cursor: pointer;
            transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease, border-color 0.28s ease, background 0.28s ease;
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
          }
          .sector-card-v2:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 48px rgba(0,0,0,.36), 0 0 0 1px rgba(168,85,247,.22);
            border-color: rgba(168,85,247,.42);
            background: linear-gradient(165deg, rgba(168,85,247,.1) 0%, rgba(0,0,0,.14) 100%);
          }
          .sector-card-v2::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.35s ease;
          }
          .sector-card-v2:hover::before {
            transform: scaleX(1);
          }
          .sectors-grid-v2 {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 14px;
          }

          /* ── LIGHT MODE: SuccessStories ── */
          [data-theme="light"] .story-card-v3 {
            background: linear-gradient(165deg, rgba(255,255,255,.88) 0%, rgba(255,255,255,.62) 100%);
            box-shadow: 0 4px 28px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.9);
          }
          [data-theme="light"] .story-card-v3:hover {
            box-shadow: 0 28px 72px rgba(0,0,0,.08), 0 0 0 1px rgba(124,58,237,.12);
          }
          [data-theme="light"] .story-card-v3::after {
            opacity: 0.4;
          }
          [data-theme="light"] .story-logo-wrap-v3 {
            box-shadow: 0 0 0 1px rgba(0,0,0,.06), 0 10px 28px rgba(0,0,0,.1);
          }
          [data-theme="light"] .story-logo-v3 {
            box-shadow: inset 0 1px 0 rgba(255,255,255,.35);
          }
          [data-theme="light"] .story-meta-pill-v3 {
            background: rgba(255,255,255,.75);
            border-color: rgba(0,0,0,.08);
          }
          [data-theme="light"] .story-sector-chip-v3 {
            background: color-mix(in srgb, var(--story-accent) 10%, rgba(255,255,255,.9));
          }
          [data-theme="light"] .story-popup-strip-inner-v3 {
            background: linear-gradient(125deg, rgba(255,255,255,.55) 0%, color-mix(in srgb, var(--story-accent) 6%, rgba(255,255,255,.75)) 100%);
            border-color: color-mix(in srgb, var(--story-accent) 20%, rgba(0,0,0,.08));
          }
          [data-theme="light"] .story-impact-v3 {
            background: linear-gradient(165deg, rgba(0,0,0,.04) 0%, rgba(255,255,255,.5) 100%);
          }
          [data-theme="light"] .story-kpi-v3 {
            background: rgba(255,255,255,.72);
            border-color: rgba(0,0,0,.06);
          }
          [data-theme="light"] .story-quote-v3 {
            background: rgba(0,0,0,.03);
          }
          [data-theme="light"] .hero-stat-v2 {
            box-shadow: 0 2px 16px rgba(0,0,0,.05), inset 0 1px 0 rgba(255,255,255,.85);
          }
          [data-theme="light"] .hero-stat-v2:hover {
            box-shadow: 0 14px 40px rgba(0,0,0,.08);
          }
          [data-theme="light"] .hero-stat-v2::after {
            opacity: 0.35;
          }
          [data-theme="light"] .sector-card-v2 {
            background: linear-gradient(165deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.72) 100%);
          }
          [data-theme="light"] .sector-card-v2:hover {
            box-shadow: 0 16px 48px rgba(0,0,0,.08);
            background: linear-gradient(165deg, rgba(168,85,247,.06) 0%, rgba(255,255,255,.85) 100%);
          }
          @media (max-width: 768px) {
            .story-head-v3 { padding: 22px 20px 16px !important; }
            .story-two-cards-v3 { grid-template-columns: 1fr !important; padding: 0 20px 0 !important; gap: 14px !important; }
            .story-popup-strip-v3 { padding: 16px 20px 0 !important; }
            .story-popup-strip-inner-v3 {
              flex-direction: column !important;
              align-items: stretch !important;
              text-align: center !important;
              padding: 16px 18px !important;
            }
            .story-popup-type-v3 { width: 100%; text-align: center; }
            .story-results-kpi-v3 { margin: 14px 20px 22px !important; }
            .story-lede-v3 { padding: 14px 20px 0 !important; font-size: 14px !important; }
            .story-impact-v3 { margin: 18px 20px 0 !important; padding: 14px !important; }
            .story-kpi-grid-v3.kpi-count-2,
            .story-kpi-grid-v3.kpi-count-3,
            .story-kpi-grid-v3.kpi-count-4 { grid-template-columns: 1fr !important; }
            .story-kpi-grid-v3.kpi-count-1 { max-width: none !important; }
            .story-quote-v3 { margin: 18px 20px 0 !important; padding: 16px !important; padding-inline-start: 48px !important; }
            .story-footer-v3 { padding: 18px 20px 20px !important; flex-wrap: wrap; }
            .details-grid-v3 { grid-template-columns: 1fr !important; padding: 0 20px 22px !important; }
            .hero-stat-v2 { padding: 16px 20px; }
          }
          @media (max-width: 480px) {
            .story-chip-v3 { font-size: 11px; padding: 6px 10px; }
            .filter-btn-v2 { padding: 8px 12px; font-size: 12px; gap: 4px; }
            .hero-stat-v2 { padding: 14px 16px; }
            .story-footer-v3 { flex-direction: column; align-items: stretch !important; }
            .expand-btn-v3 { width: 100%; justify-content: center; }
          }

          /* ── Brief story card (grid item, links to detail page) ── */
          .brief-story-card {
            --story-accent: #a855f7;
            position: relative;
            isolation: isolate;
            display: flex;
            flex-direction: column;
            gap: 18px;
            padding: 24px 22px 20px;
            border-radius: 20px;
            border: 1px solid var(--b1);
            background: linear-gradient(165deg, rgba(168,85,247,.04) 0%, rgba(0,0,0,.18) 100%);
            backdrop-filter: blur(20px) saturate(1.1);
            cursor: pointer;
            font-family: inherit;
            text-align: inherit;
            color: inherit;
            overflow: hidden;
            transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
            box-shadow: 0 4px 18px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.05);
          }
          .brief-story-card::after {
            content: '';
            position: absolute;
            inset: -30% -20% auto auto;
            width: 60%;
            height: 55%;
            border-radius: 50%;
            background: radial-gradient(circle at center, color-mix(in srgb, var(--story-accent) 22%, transparent), transparent 70%);
            opacity: 0.4;
            pointer-events: none;
            transition: opacity 0.32s ease;
          }
          .brief-story-card:hover {
            transform: translateY(-6px);
            border-color: color-mix(in srgb, var(--story-accent) 55%, var(--b1));
            box-shadow: 0 26px 60px rgba(0,0,0,.42), 0 0 0 1px color-mix(in srgb, var(--story-accent) 30%, transparent);
          }
          .brief-story-card:hover::after { opacity: 0.7; }
          .brief-story-card__topbar {
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 3px;
            opacity: 1;
            background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4);
            background-size: 200% 100%;
            background-position: 0% 50%;
            transition: background-position 0.6s ease;
          }
          .brief-story-card:hover .brief-story-card__topbar {
            background-position: 100% 50%;
          }
          .brief-story-card__head {
            display: flex;
            align-items: center;
            gap: 14px;
            min-width: 0;
          }
          .brief-story-card__logo {
            flex-shrink: 0;
            width: 46px;
            height: 46px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 19px;
            font-weight: 900;
            color: #fff;
            background: linear-gradient(135deg, #a855f7, #7c3aed);
            box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 6px 18px rgba(0,0,0,.25);
            overflow: hidden;
          }
          .brief-story-card__logo--img {
            background: #fff;
            border: 1px solid color-mix(in srgb, var(--story-accent) 28%, rgba(0,0,0,.08));
            padding: 6px;
            box-shadow: 0 6px 18px rgba(0,0,0,.18);
          }
          .brief-story-card__logo--img img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }
          .brief-story-card__head-text { flex: 1; min-width: 0; }
          .brief-story-card__title {
            margin: 0 0 6px 0;
            font-size: 16px;
            font-weight: 800;
            color: var(--t);
            line-height: 1.25;
            letter-spacing: -0.01em;
          }
          .brief-story-card__sector {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 600;
            color: var(--td);
          }
          .brief-story-card__sector-ico { font-size: 1em; opacity: 0.9; }
          .brief-story-card__kpi {
            padding: 14px 16px;
            border-radius: 14px;
            background: color-mix(in srgb, var(--story-accent) 8%, rgba(0,0,0,.18));
            border: 1px solid color-mix(in srgb, var(--story-accent) 22%, var(--b1));
          }
          .brief-story-card__kpi-label {
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--td);
            margin-bottom: 6px;
          }
          .brief-story-card__kpi-value {
            font-size: clamp(1.35rem, 3.6vw, 1.7rem);
            font-weight: 900;
            font-variant-numeric: tabular-nums;
            line-height: 1.1;
            background: linear-gradient(135deg, #c4b5fd 0%, #a855f7 60%, #7c3aed 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.03em;
          }
          .brief-story-card__kpi-currency {
            display: inline-block;
            font-size: 0.5em;
            font-weight: 800;
            margin-inline-start: 6px;
            color: var(--tm);
            -webkit-text-fill-color: var(--tm);
            opacity: 0.85;
          }
          .brief-story-card__cta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12.5px;
            font-weight: 700;
            color: #a855f7;
            padding-top: 6px;
            margin-top: 2px;
            border-top: 1px solid color-mix(in srgb, var(--story-accent) 14%, var(--b1));
          }
          .brief-story-card__cta-arrow {
            transition: transform 0.25s ease;
            font-size: 14px;
          }
          .brief-story-card:hover .brief-story-card__cta-arrow {
            transform: translateX(4px);
          }
          [dir="rtl"] .brief-story-card:hover .brief-story-card__cta-arrow {
            transform: translateX(-4px);
          }
          [data-theme="light"] .brief-story-card {
            background: linear-gradient(165deg, rgba(255,255,255,.9) 0%, rgba(255,255,255,.65) 100%);
            box-shadow: 0 4px 20px rgba(0,0,0,.05), inset 0 1px 0 rgba(255,255,255,.9);
          }
          [data-theme="light"] .brief-story-card__kpi {
            background: color-mix(in srgb, var(--story-accent) 8%, rgba(255,255,255,.7));
          }
        `}</style>
        

        <section
          className="success-stories-hero page-hero-viewport page-hero-viewport--center"
          style={{
            position: "relative",
            zIndex: 2,
            background:
              "radial-gradient(ellipse 60% 50% at 15% 0%, rgba(168,85,247,.14), transparent 65%)," +
              "radial-gradient(ellipse 55% 45% at 85% 10%, rgba(6,182,212,.12), transparent 65%)," +
              "radial-gradient(ellipse 70% 50% at 50% 110%, rgba(236,72,153,.08), transparent 70%)," +
              "linear-gradient(180deg, #fdfcff 0%, #ffffff 60%, #fafbff 100%)",
          }}
        >
          <div
            className="stag rv"
            style={{
              background: "linear-gradient(135deg, rgba(168,85,247,.12), rgba(6,182,212,.1))",
              borderColor: "rgba(168,85,247,.28)",
              color: "#7c3aed",
              boxShadow: "0 4px 14px rgba(168,85,247,.12)",
            }}
          >
            <span className="stag-dot" style={{ background: "#a855f7", boxShadow: "0 0 0 4px rgba(168,85,247,.18)" }} />
            {sx.heroTag}
          </div>
          <h1 className="st rv d1" style={{ fontSize: "clamp(28px,5.5vw,72px)", marginTop: 10, marginBottom: 14, color: "#7c3aed", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            <span style={{ color: "#7c3aed", fontWeight: 900 }}>{sx.heroH1Gradient}</span>
            <br />
            <span style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, color: "#7c3aed" }}>{sx.heroH1Sub}</span>
          </h1>
          <p className="ssub rv d2" style={{ margin: "0 auto 36px", maxWidth: 640, fontSize: "clamp(15px,1.9vw,18px)", lineHeight: 1.75, color: "#7c3aed" }}>
            {sx.heroLead}
          </p>
          <div className="rv d3" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            {(isAr ? [
              ["13", "قصة نجاح موثقة"],
              ["192K+", "عملية تحويل"],
              ["4.6M+", "ريال مبيعات"],
            ] : [
              ["13", "Verified Stories"],
              ["192K+", "Conversions"],
              ["4.6M+", "SAR in Sales"],
            ]).map(([v, l]) => (
              <div key={l} className="hero-stat-v2" style={{ "--accent": "#7c3aed", boxShadow: "none" } as CSSProperties}>
                <div style={{ position: "absolute", top: 0, right: 0, left: 0, height: 3, background: "#7c3aed", borderRadius: "18px 18px 0 0" }} />
                <div
                  style={{
                    fontSize: "clamp(28px,3.5vw,42px)",
                    fontWeight: 900,
                    lineHeight: 1,
                    marginBottom: 6,
                    color: "#7c3aed",
                    letterSpacing: "-0.02em",
                  }}
                >{v}</div>
                <div style={{ fontSize: 13, color: "#7c3aed", fontWeight: 700, letterSpacing: ".01em" }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="success-stories-sticky-toolbar" style={{ position: "sticky", top: 80, zIndex: 800, paddingInline: "5%", paddingTop: 16, paddingBottom: 16, marginBottom: 32 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              ref={filterRef}
              className="rv d2 filter-scroll-wrap"
            >
              {filterTabs.map(sector => (
                <button
                  key={sector}
                  className={`filter-btn-v2${activeSector === sector ? " active" : ""}`}
                  onClick={() => handleSectorChange(sector)}
                >
                  <span>{SECTOR_ICONS[sector] || "◆"}</span>
                  <span>{sectorDisplay(sector)}</span>
                  <span className="filter-count-v2">{sectorCounts[sector] || 0}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section style={{ position: "relative", zIndex: 2, paddingInline: "5%", paddingBottom: 80, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
          <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
            {activeSector !== "الكل" && (
              <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 15, color: "var(--td)" }}>
                  {isAr ? (
                    <>عرض <span style={{ color: "var(--p3)", fontWeight: 800 }}>{filteredStories.length}</span> قصة في قطاع{" "}<span style={{ color: "var(--t)", fontWeight: 700 }}>{activeSector}</span></>
                  ) : (
                    <>Showing <span style={{ color: "var(--p3)", fontWeight: 800 }}>{filteredStories.length}</span> {filteredStories.length === 1 ? "story" : "stories"} in{" "}<span style={{ color: "var(--t)", fontWeight: 700 }}>{SECTOR_NAME_EN[activeSector] || activeSector}</span></>
                  )}
                </div>
                <button
                  onClick={() => handleSectorChange("الكل")}
                  style={{ fontSize: 12, color: "var(--td)", background: "rgba(168,85,247,.08)", border: "1px solid rgba(168,85,247,.2)", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontFamily: "var(--font)", transition: "all 0.2s" }}
                >
                  {isAr ? "عرض الكل" : "Show All"}
                </button>
              </div>
            )}
            <div
              className={`stories-fade-v2 ${visible ? "shown" : "hidden"}`}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 20,
                width: "100%",
              }}
            >
              {filteredStories.map((s) => (
                <BriefStoryCard key={s.slug} s={s} isAr={isAr} />
              ))}
            </div>
          </div>
        </section>

        <section style={{ position: "relative", zIndex: 2, padding: "60px 5% 100px", borderTop: "1px solid var(--b1)" }}>
          <div style={{
            position: "absolute",
            top: 0, left: "50%", transform: "translateX(-50%)",
            width: "min(80%, 900px)", height: 1,
            background: "linear-gradient(90deg, transparent, color-mix(in srgb, #a855f7 40%, transparent), transparent)",
            pointerEvents: "none",
          }} />
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="stag rv"><span className="stag-dot"/>{isAr ? "حسب القطاع" : "By Sector"}</div>
              <h2 className="st rv d1 font-semibold" style={{ marginBottom: 12 }}>{isAr ? "نجاح في كل قطاع" : "Success in Every Sector"}</h2>
              <p className="ssub rv d2" style={{ margin: "0 auto", color: "var(--td)" }}>{isAr ? "زيادة يعمل مع جميع أنواع المتاجر — اكتشف النتائج في مجالك" : "Ziadah works with all types of stores — discover the results in your industry"}</p>
            </div>
            <div className="sectors-grid-v2 rv d2">
              {(isAr ? sectors : sectorsEn).map(s => {
                const sectorArName = s.nameAr;
                const count = stories.filter(st => st.sector === sectorArName).length;
                return (
                  <div
                    key={sectorArName}
                    className="gc sector-card-v2"
                    onClick={() => {
                      handleSectorChange(sectorArName);
                      window.scrollTo({ top: 520, behavior: "smooth" });
                    }}
                  >
                    <div className="shine"/>
                    <div style={{ fontSize: 38, lineHeight: 1, flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4, color: "var(--t)" }}>{isAr ? s.nameAr : s.name}</div>
                      <div style={{ fontSize: 12, color: "var(--td)", marginBottom: 6 }}>{s.stores} · {s.avg}</div>
                      {count > 0 && (
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#a855f7", fontWeight: 700, background: "rgba(168,85,247,.1)", padding: "3px 10px", borderRadius: 8 }}>
                          {count} {isAr ? "قصة نجاح" : (count === 1 ? "success story" : "success stories")}
                        </div>
                      )}
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
                      <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <PageClosingCta
          dark
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
