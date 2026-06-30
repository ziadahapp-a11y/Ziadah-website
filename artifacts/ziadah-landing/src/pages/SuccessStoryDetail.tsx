import { useState } from "react";
import { useParams } from "wouter";
import { ArrowLeft, ArrowRight, ExternalLink, Quote } from "lucide-react";
import PageShell from "@/components/PageShell";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, WebPageSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { findStoryBySlug, storyEn, stories } from "@/data/successStoriesData";
import { getStoryArticle } from "@/data/successStoriesArticles";
import { navigateTo } from "@/components/PageTransition";
import NotFound from "@/pages/not-found";

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

const SECTOR_ICONS: Record<string, string> = {
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

export default function SuccessStoryDetail() {
  const params = useParams<{ slug: string }>();
  const t = useSiteT();
  const { lang, isAr, dir } = useLanguage();
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

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

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
          <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
            {isAr ? "نوع النافذة التسويقية" : "Marketing popup type"}
          </span>
          <span className="inline-flex items-center rounded-full bg-green-100 border border-green-200 px-3.5 py-1.5 text-sm font-bold text-green-700">
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
          <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-6">{article.resultsContext}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-card">
            <div className="text-3xl md:text-4xl font-extrabold text-zinc-950 num-ltr">{story.conversions}</div>
            <div className="mt-1.5 text-xs font-bold tracking-widest text-zinc-500 uppercase">
              {isAr ? "التحويلات" : "Conversions"}
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-card">
            <div className="text-3xl md:text-4xl font-extrabold text-zinc-950 num-ltr">
              {story.sales}
              <span className="ms-1.5 text-base font-bold text-zinc-500">{isAr ? "ر.س" : "SAR"}</span>
            </div>
            <div className="mt-1.5 text-xs font-bold tracking-widest text-zinc-500 uppercase">
              {isAr ? "إجمالي المبيعات" : "Total sales"}
            </div>
          </div>
        </div>
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
      <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff" }}>
        {/* ══════════════════ HERO ══════════════════ */}
        <section dir={dir} className="relative pt-24 pb-12 px-4 border-b border-zinc-200">
          <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
          <div className="container mx-auto relative max-w-3xl">
            <button
              type="button"
              onClick={() => navigateTo("/success-stories")}
              className="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              <BackArrow className="w-4 h-4" aria-hidden />
              <span>{isAr ? "كل قصص النجاح" : "All success stories"}</span>
            </button>

            <span className="inline-flex items-center gap-2 mb-6 rounded-full bg-green-100 border border-green-200 px-3.5 py-1.5 text-xs font-bold text-green-700">
              <span aria-hidden>{SECTOR_ICONS[story.sector] || "◆"}</span>
              {displaySector}
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-5 leading-[1.08]">
              {displayStore}
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed mb-8">{leadText}</p>

            <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-card">
              {story.logoUrl ? (
                <div className="shrink-0 w-12 h-12 rounded-xl border border-zinc-200 bg-white p-1.5 flex items-center justify-center overflow-hidden">
                  <img src={story.logoUrl} alt="" loading="lazy" className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="shrink-0 w-12 h-12 rounded-xl text-white text-lg font-bold flex items-center justify-center" style={{ background: story.color }}>
                  {story.logo}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-zinc-950 truncate">{displayStore}</div>
                <div className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase num-ltr">
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
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100 transition-colors"
                >
                  <span>{isAr ? "زيارة المتجر" : "Visit store"}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════ ARTICLE BODY ══════════════════ */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-3xl">
            {articleSections.map((s, i) => (
              <div key={i} className={i > 0 ? "mt-16 pt-16 border-t border-zinc-200" : ""}>
                <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-zinc-950 mb-6 leading-snug">
                  <span className="inline-flex items-center justify-center min-w-[44px] h-9 px-2.5 rounded-lg bg-zinc-950 text-white text-sm font-extrabold num-ltr">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>
                {s.body}
              </div>
            ))}

            {article?.takeaway && (
              <div className="mt-16 pt-16 border-t border-zinc-200">
                <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-zinc-950 mb-6 leading-snug">
                  <span className="inline-flex items-center justify-center min-w-[44px] h-9 px-2.5 rounded-lg bg-zinc-950 text-white text-sm font-extrabold num-ltr">
                    {String(articleSections.length + 1).padStart(2, "0")}
                  </span>
                  {isAr ? "الخلاصة" : "Key Takeaway"}
                </h2>
                <div className="relative rounded-2xl border border-emerald-200 bg-emerald-50/60 p-7 md:p-8 ps-14 md:ps-16">
                  <Quote className="absolute top-6 w-7 h-7 text-emerald-500/60" aria-hidden style={{ insetInlineStart: "1.25rem" }} />
                  <p className="text-base md:text-lg font-semibold text-emerald-800 leading-relaxed">
                    {article.takeaway}
                  </p>
                </div>
              </div>
            )}
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
