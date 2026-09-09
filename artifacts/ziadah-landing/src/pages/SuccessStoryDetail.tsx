import { useState } from "react";
import { useParams } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Quote,
  Droplets,
  Sparkles,
  Shirt,
  Moon,
  ShoppingBag,
  Wind,
  Flower2,
  Gem,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, WebPageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { findStoryBySlug, storyEn, stories } from "@/data/successStoriesData";
import { getStoryArticle } from "@/data/successStoriesArticles";
import { navigateTo } from "@/components/PageTransition";
import NotFound from "@/pages/not-found";
import { Section, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import { HeroLede } from "@/sections";
import { Button as MkButton } from "@/components/mk";
import { t as siteTranslations } from "@/i18n/translations";

function splitParagraphs(text: string): string[] {
  return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

const SECTOR_NAME_EN: Record<string, string> = {
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

const SECTOR_ICONS: Record<string, LucideIcon> = {
  "مستلزمات التنظيف": Droplets,
  "منتجات البشرة": Sparkles,
  "الأقمشة الرجالية": Shirt,
  "عبايات الحج واللباس المحتشم": Moon,
  "متجر إلكتروني متنوع": ShoppingBag,
  "العود والبخور": Wind,
  "مستحضرات العناية بالبشرة": Sparkles,
  "عطور": Flower2,
  "عسل طبيعي": Gem,
  "موقع التبرعات الإلكترونية": HeartHandshake,
};

export default function SuccessStoryDetail() {
  const params = useParams<{ slug: string }>();
  const t = siteTranslations;
  const { lang, isAr } = useLanguage();
  const sx = t[lang].successStoriesPage;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

  const slug = params.slug ?? "";
  const story = findStoryBySlug(slug);

  if (!story) return <NotFound />;

  const en = storyEn[story.store];
  const storyIndex = stories.findIndex((s) => s.slug === story.slug);
  const total = stories.length;
  const displayStore = isAr ? story.store : (en?.store || story.store);
  const displaySector = isAr ? story.sector : (en?.sector || SECTOR_NAME_EN[story.sector] || story.sector);
  const displayChallenge = isAr ? story.challenge : (en?.challenge || story.challenge);
  const displayStrategy = isAr ? story.strategy : (en?.strategy || story.strategy);
  const displayPopupType = isAr ? story.popupType : (en?.popupType || story.popupType);

  const SectorIcon = SECTOR_ICONS[story.sector];

  const article = getStoryArticle(story.slug, isAr);
  const leadText = article?.intro ?? displayChallenge;
  const challengeParas = article ? splitParagraphs(article.challengeDeep) : [displayChallenge];
  const strategyParas = article ? splitParagraphs(article.strategyDeep) : [displayStrategy];

  const seoTitle = isAr
    ? `${story.store} — قصة نجاح | زيادة`
    : `${displayStore} — Success Story | Ziadah`;
  const seoDesc = `${displayStore}: ${displayChallenge}`;
  const canonical = `/success-stories/${story.slug}`;

  const BackArrow = isAr ? ArrowRight : ArrowLeft;


  // Numbered article sections, rendered in order with a leading counter chip.
  const articleSections: { heading: string; body: React.ReactNode }[] = [];
  if (article?.sectorContext) {
    articleSections.push({
      heading: isAr ? "عن القطاع" : "About the Sector",
      body: <p className="text-base md:text-lg text-zinc-600 leading-relaxed">{article.sectorContext}</p>,
    });
  }
  articleSections.push({
    heading: isAr ? "التحدي" : "The Challenge",
    body: (
      <>
        {challengeParas.map((p, i) => (
          <p key={i} className="text-base md:text-lg text-zinc-600 leading-relaxed mb-4 last:mb-0">{p}</p>
        ))}
      </>
    ),
  });
  articleSections.push({
    heading: isAr ? "الاستراتيجية" : "The Strategy",
    body: (
      <>
        {strategyParas.map((p, i) => (
          <p key={i} className="text-base md:text-lg text-zinc-600 leading-relaxed mb-4">{p}</p>
        ))}
        {article?.mechanism && (
          <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-4">{article.mechanism}</p>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
          <span className="card-eyebrow">
            {isAr ? "نوع النافذة التسويقية" : "Marketing popup type"}
          </span>
          <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-100 px-3.5 py-1.5 text-sm font-bold text-violet-700">
            {displayPopupType}
          </span>
        </div>
      </>
    ),
  });
  articleSections.push({
    heading: isAr ? "النتائج الموثقة" : "Verified Results",
    body: (
      <>
        {article?.resultsContext && (
          <p className="section-lead mb-6">{article.resultsContext}</p>
        )}
        {/* Two numbers are a stat pair, not two cards. This is the system's
            own stat row - the same one the hero and the use-case pages use. */}
        <ul className="uc-stats">
          <li className="uc-stat">
            <span className="uc-stat-value num-ltr">{story.conversions}</span>
            <span className="uc-stat-label">{isAr ? "التحويلات" : "Conversions"}</span>
          </li>
          <li className="uc-stat">
            <span className="uc-stat-value num-ltr">
              {story.sales}
              <span className="ms-1.5 t-body-18 opacity-70">{isAr ? "ر.س" : "SAR"}</span>
            </span>
            <span className="uc-stat-label">{isAr ? "إجمالي المبيعات" : "Total sales"}</span>
          </li>
        </ul>
      </>
    ),
  });

  return (
    <>
      <SEO
        titleAr={seoTitle}
        titleEn={seoTitle}
        descriptionAr={seoDesc}
        descriptionEn={seoDesc}
        canonical={canonical}
      />
      <BreadcrumbSchema
        items={[
          { name: isAr ? "الرئيسية" : "Home", url: "/" },
          { name: isAr ? "قصص النجاح" : "Success Stories", url: "/success-stories" },
          { name: displayStore, url: canonical },
        ]}
      />
      <WebPageSchema name={seoTitle} description={seoDesc} url={canonical} />
      {/* The forced `#fff` is gone: a page's ground is its first section's, and
          painting white here put a white slab under every band that had
          stamped its own family. */}
      <PageShell className="relative overflow-x-clip">
        {/* ══════════════════ HERO ══════════════════ */}
        <HeroLede
          compact
          center={false}
          family="grey"
          eyebrow={
            <>
              {SectorIcon && <SectorIcon className="w-3.5 h-3.5" aria-hidden="true" />}
              {displaySector}
            </>
          }
          title={displayStore}
          body={leadText}
          actions={
            /* The way back to the index. On a detail page that IS the hero's
               action - there is nothing else to do here but read on. */
            <MkButton variant="tertiary" onClick={() => navigateTo("/success-stories")}>
              <BackArrow className="w-4 h-4" aria-hidden="true" />
              <span className="ms-2">{isAr ? "كل قصص النجاح" : "All success stories"}</span>
            </MkButton>
          }
        >
          {/* The store's own card: who this story is about, where it sits in
              the run, and a way through to the shop itself. */}
          <div className="card card--short story-card flex-row flex-wrap items-center gap-4">
              {story.logoUrl ? (
                <div className="shrink-0 w-12 h-12 rounded-xl p-1.5 flex items-center justify-center overflow-hidden bg-[var(--general-white)]">
                  <img src={story.logoUrl} alt="" loading="lazy" className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="shrink-0 w-12 h-12 rounded-xl text-white text-lg font-bold flex items-center justify-center" style={{ background: story.color }}>
                  {story.logo}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="t-sm-med truncate">{displayStore}</div>
                <div className="card-eyebrow num-ltr">
                  {isAr
                    ? `قصة ${String(storyIndex + 1).padStart(2, "0")} من ${String(total).padStart(2, "0")}`
                    : `Story ${String(storyIndex + 1).padStart(2, "0")} of ${String(total).padStart(2, "0")}`}
                </div>
              </div>
              {story.url && (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button tertiary is-small"
                >
                  <span>{isAr ? "زيارة المتجر" : "Visit store"}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                </a>
              )}
          </div>
        </HeroLede>

        {/* ══════════════════ ARTICLE BODY ══════════════════ */}
        <Section family="grey">
          <Shell width="narrow">
          <div className="measure-read">
          {articleSections.map((s, i) => (
            <div key={i} className={i > 0 ? "article-step" : ""}>
              <h2 className="section-head-title--sm flex items-center gap-4 mb-6">
                <span className="article-step-num num-ltr">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              {s.body}
            </div>
          ))}

          {article?.takeaway && (
            <div className="article-step">
              <h2 className="section-head-title--sm flex items-center gap-4 mb-6">
                <span className="article-step-num num-ltr">
                  {String(articleSections.length + 1).padStart(2, "0")}
                </span>
                {isAr ? "الخلاصة" : "Key Takeaway"}
              </h2>
              {/* The closing quote is a card with a mark, not a violet-tinted
                  box with a violet border and violet type on it. */}
              <div className="card card--short article-quote">
                <Quote className="article-quote-mark" aria-hidden="true" />
                <p className="t-body-18">{article.takeaway}</p>
              </div>
            </div>
          )}
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
