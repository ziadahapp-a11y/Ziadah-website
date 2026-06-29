import { useState, type CSSProperties } from "react";
import { useParams } from "wouter";
import PageShell from "@/components/PageShell";
import DsPageBackdrop from "@/components/DsPageBackdrop";
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

  const article = getStoryArticle(story.slug, isAr);
  const leadText = article?.intro ?? displayChallenge;
  const challengeParas = article ? splitParagraphs(article.challengeDeep) : [displayChallenge];
  const strategyParas = article ? splitParagraphs(article.strategyDeep) : [displayStrategy];

  const seoTitle = isAr
    ? `${story.store} — قصة نجاح | زيادة`
    : `${displayStore} — Success Story | Ziadah`;
  const seoDesc = `${displayStore}: ${displayChallenge}`;
  const canonical = `/success-stories/${story.slug}`;

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
      <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
        <DsPageBackdrop />

        <style>{`
          .story-article {
            --accent: var(--story-accent, #34d399);
            position: relative;
            counter-reset: section;
          }
          .story-article::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 480px;
            pointer-events: none;
            z-index: 0;
            background:
              radial-gradient(ellipse 60% 60% at 50% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%),
              radial-gradient(ellipse 40% 30% at 80% 10%, rgba(6,182,212,.08), transparent 70%);
          }
          .story-article::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 480px;
            pointer-events: none;
            z-index: 0;
            background-image:
              linear-gradient(rgba(52, 211, 153,.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(52, 211, 153,.04) 1px, transparent 1px);
            background-size: 48px 48px;
            mask-image: radial-gradient(ellipse 60% 70% at 50% 0%, #000 30%, transparent 80%);
            opacity: 0.5;
          }
          .story-article__back-bar {
            position: relative;
            z-index: 2;
            padding-inline: 5%;
            padding-top: 90px;
            padding-bottom: 12px;
            max-width: 740px;
            margin: 0 auto;
            width: 100%;
          }
          .story-article__back-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 12.5px;
            color: var(--td);
            background: transparent;
            border: 1px solid transparent;
            border-radius: 999px;
            padding: 8px 16px 8px 12px;
            cursor: pointer;
            font-family: var(--font);
            font-weight: 600;
            letter-spacing: 0.01em;
            transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, padding 0.25s ease;
          }
          [dir="rtl"] .story-article__back-btn {
            padding: 8px 12px 8px 16px;
          }
          .story-article__back-btn-arrow {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: color-mix(in srgb, var(--accent) 14%, transparent);
            color: var(--accent);
            font-size: 13px;
            font-weight: 700;
            line-height: 1;
            transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), background 0.25s ease;
          }
          .story-article__back-btn:hover {
            color: var(--t);
            background: color-mix(in srgb, var(--accent) 8%, transparent);
            border-color: color-mix(in srgb, var(--accent) 22%, var(--b1));
          }
          .story-article__back-btn:hover .story-article__back-btn-arrow {
            background: color-mix(in srgb, var(--accent) 26%, transparent);
            transform: translateX(-3px);
          }
          [dir="ltr"] .story-article__back-btn:hover .story-article__back-btn-arrow {
            transform: translateX(-3px);
          }
          [dir="rtl"] .story-article__back-btn:hover .story-article__back-btn-arrow {
            transform: translateX(3px);
          }
          .story-article__back-btn:active {
            transform: scale(0.98);
          }
          .story-article__wrap {
            position: relative;
            z-index: 2;
            padding-inline: 5%;
            padding-bottom: 80px;
            max-width: 740px;
            margin: 0 auto;
            width: 100%;
          }
          .story-article__sector-chip {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 7px 16px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            color: var(--accent);
            background: color-mix(in srgb, var(--accent) 14%, rgba(0,0,0,.18));
            border: 1px solid color-mix(in srgb, var(--accent) 32%, var(--b1));
            margin-bottom: 22px;
            backdrop-filter: blur(10px);
          }
          .story-article__title {
            font-size: clamp(2.2rem, 6vw, 3.4rem);
            font-weight: 900;
            letter-spacing: -0.035em;
            line-height: 1.1;
            margin: 0 0 18px 0;
            background: linear-gradient(135deg, var(--t) 0%, color-mix(in srgb, var(--t) 70%, var(--accent)) 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: var(--t);
          }
          .story-article__lead {
            font-size: clamp(1.1rem, 2.1vw, 1.28rem);
            line-height: 1.75;
            color: var(--tm);
            margin: 0 0 32px 0;
            font-weight: 500;
          }
          .story-article__meta {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 20px 22px;
            border: 1px solid var(--b1);
            border-radius: 16px;
            background: linear-gradient(165deg, color-mix(in srgb, var(--accent) 5%, rgba(255,255,255,.03)) 0%, rgba(0,0,0,.18) 100%);
            backdrop-filter: blur(20px);
            margin-bottom: 56px;
            flex-wrap: wrap;
            box-shadow: 0 4px 18px rgba(0,0,0,.18);
          }
          [data-theme="light"] .story-article__meta {
            background: linear-gradient(165deg, rgba(255,255,255,.85) 0%, rgba(255,255,255,.6) 100%);
            box-shadow: 0 4px 18px rgba(0,0,0,.05);
          }
          .story-article__logo {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            overflow: hidden;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 19px;
            font-weight: 900;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.2);
          }
          .story-article__logo--img {
            background: #fff;
            padding: 6px;
            border: 1px solid color-mix(in srgb, var(--accent) 28%, rgba(0,0,0,.08));
          }
          .story-article__logo--img img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }
          .story-article__meta-info {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .story-article__meta-store {
            font-size: 14px;
            font-weight: 700;
            color: var(--t);
            line-height: 1.3;
          }
          .story-article__meta-counter {
            font-size: 11px;
            color: var(--td);
            letter-spacing: 0.08em;
            text-transform: uppercase;
            font-weight: 700;
          }
          .story-article__visit {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 9px 16px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 700;
            color: var(--accent);
            background: color-mix(in srgb, var(--accent) 10%, transparent);
            border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--b1));
            text-decoration: none;
            transition: background 0.2s ease;
          }
          .story-article__visit:hover {
            background: color-mix(in srgb, var(--accent) 22%, transparent);
          }
          .story-article__section {
            counter-increment: section;
            margin: 0 0 56px 0;
            position: relative;
          }
          .story-article__section + .story-article__section::before {
            content: '';
            display: block;
            width: 64px;
            height: 1px;
            background: linear-gradient(90deg, var(--accent), transparent);
            margin: 0 0 32px 0;
            opacity: 0.5;
          }
          [dir="rtl"] .story-article__section + .story-article__section::before {
            background: linear-gradient(-90deg, var(--accent), transparent);
          }
          .story-article__h2 {
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: clamp(1.4rem, 2.8vw, 1.85rem);
            font-weight: 900;
            letter-spacing: -0.025em;
            margin: 0 0 20px 0;
            color: var(--t);
            line-height: 1.2;
          }
          .story-article__h2::before {
            content: counter(section, decimal-leading-zero);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 42px;
            height: 32px;
            padding: 0 10px;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.06em;
            color: var(--accent);
            background: color-mix(in srgb, var(--accent) 12%, rgba(0,0,0,.18));
            border: 1px solid color-mix(in srgb, var(--accent) 32%, var(--b1));
            border-radius: 8px;
            font-variant-numeric: tabular-nums;
            flex-shrink: 0;
          }
          [data-theme="light"] .story-article__h2::before {
            background: color-mix(in srgb, var(--accent) 10%, rgba(255,255,255,.7));
          }
          .story-article__p {
            font-size: clamp(1rem, 1.85vw, 1.08rem);
            line-height: 1.9;
            color: var(--tm);
            margin: 0 0 16px 0;
          }
          .story-article__p--emphasized {
            position: relative;
            font-size: clamp(1.05rem, 2vw, 1.18rem);
            color: var(--t);
            font-weight: 500;
            line-height: 1.8;
            padding: 28px 30px 28px 60px;
            border-radius: 18px;
            background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, rgba(0,0,0,.22)) 0%, color-mix(in srgb, var(--accent) 5%, rgba(0,0,0,.18)) 100%);
            border: 1px solid color-mix(in srgb, var(--accent) 25%, var(--b1));
            border-inline-start: 4px solid var(--accent);
            margin-top: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.05);
          }
          .story-article__p--emphasized::before {
            content: '"';
            position: absolute;
            top: 6px;
            inset-inline-start: 22px;
            font-size: 64px;
            font-weight: 900;
            line-height: 1;
            color: color-mix(in srgb, var(--accent) 60%, transparent);
            font-family: Georgia, serif;
            opacity: 0.6;
          }
          [data-theme="light"] .story-article__p--emphasized {
            background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 7%, rgba(255,255,255,.85)) 0%, color-mix(in srgb, var(--accent) 3%, rgba(255,255,255,.6)) 100%);
          }
          .story-article__section--takeaway {
            margin-top: 24px;
          }
          .story-article__pullquote {
            margin: 28px 0 0 0;
            padding: 20px 24px;
            border-radius: 16px;
            border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--b1));
            background: linear-gradient(125deg, color-mix(in srgb, var(--accent) 14%, rgba(0,0,0,.2)) 0%, color-mix(in srgb, var(--accent) 5%, rgba(0,0,0,.14)) 100%);
            border-inline-start: 4px solid var(--accent);
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 10px 16px;
            box-shadow: 0 4px 18px rgba(0,0,0,.16);
          }
          .story-article__pullquote-label {
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--td);
          }
          .story-article__pullquote-value {
            font-size: 15px;
            font-weight: 800;
            color: var(--accent);
            padding: 6px 14px;
            border-radius: 999px;
            background: color-mix(in srgb, var(--accent) 14%, rgba(0,0,0,.15));
            border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--b1));
          }
          .story-article__kpis {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
            margin-top: 16px;
          }
          .story-article__kpi {
            padding: 26px 22px 22px;
            border-radius: 18px;
            background: linear-gradient(165deg, color-mix(in srgb, var(--accent) 6%, rgba(0,0,0,.22)) 0%, rgba(0,0,0,.18) 100%);
            border: 1px solid color-mix(in srgb, var(--accent) 18%, var(--b1));
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(16px);
            box-shadow: 0 4px 18px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.05);
          }
          .story-article__kpi::before {
            content: '';
            position: absolute;
            top: 0;
            left: 18px;
            right: 18px;
            height: 3px;
            background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 60%, #fff), var(--accent));
            border-radius: 0 0 6px 6px;
          }
          .story-article__kpi::after {
            content: '';
            position: absolute;
            inset: -40% -20% auto auto;
            width: 70%;
            height: 70%;
            border-radius: 50%;
            background: radial-gradient(circle at center, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%);
            opacity: 0.45;
            pointer-events: none;
          }
          .story-article__kpi-value {
            position: relative;
            font-size: clamp(2rem, 5.5vw, 2.7rem);
            font-weight: 900;
            font-variant-numeric: tabular-nums;
            line-height: 1.05;
            letter-spacing: -0.04em;
            background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 55%, #ffffff) 0%, var(--accent) 60%, color-mix(in srgb, var(--accent) 75%, #000000) 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
          }
          .story-article__kpi-currency {
            display: inline-block;
            font-size: 0.42em;
            font-weight: 800;
            margin-inline-start: 8px;
            color: var(--tm);
            -webkit-text-fill-color: var(--tm);
            opacity: 0.85;
          }
          .story-article__kpi-label {
            position: relative;
            font-size: 11px;
            font-weight: 800;
            color: var(--td);
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }
          [data-theme="light"] .story-article__kpi {
            background: linear-gradient(165deg, color-mix(in srgb, var(--accent) 5%, rgba(255,255,255,.85)) 0%, rgba(255,255,255,.7) 100%);
            border-color: color-mix(in srgb, var(--accent) 15%, rgba(0,0,0,.08));
          }
          [data-theme="light"] .story-article__pullquote {
            background: color-mix(in srgb, var(--accent) 6%, rgba(255,255,255,.72));
          }
          @media (max-width: 600px) {
            .story-article__kpis { grid-template-columns: 1fr; }
            .story-article__meta { gap: 12px; }
            .story-article__visit { width: 100%; justify-content: center; }
          }
        `}</style>

        <div
          className="story-article"
          style={{ ["--story-accent" as never]: story.accent } as CSSProperties}
        >
          <section className="story-article__back-bar">
            <button
              type="button"
              onClick={() => navigateTo("/success-stories")}
              className="story-article__back-btn"
            >
              <span className="story-article__back-btn-arrow" aria-hidden>{isAr ? "→" : "←"}</span>
              <span>{isAr ? "كل قصص النجاح" : "All success stories"}</span>
            </button>
          </section>

          <article className="story-article__wrap">
            <span className="story-article__sector-chip">
              <span aria-hidden>{SECTOR_ICONS[story.sector] || "◆"}</span>
              {displaySector}
            </span>

            <h1 className="story-article__title">{displayStore}</h1>

            <p className="story-article__lead">{leadText}</p>

            <div className="story-article__meta">
              {story.logoUrl ? (
                <div className="story-article__logo story-article__logo--img">
                  <img src={story.logoUrl} alt="" loading="lazy" />
                </div>
              ) : (
                <div className="story-article__logo" style={{ background: story.color }}>
                  {story.logo}
                </div>
              )}
              <div className="story-article__meta-info">
                <span className="story-article__meta-store">{displayStore}</span>
                <span className="story-article__meta-counter">
                  <span aria-hidden style={{ color: "var(--accent)", marginInlineEnd: 6 }}>◆</span>
                  {isAr
                    ? `قصة ${String(storyIndex + 1).padStart(2, "0")} من ${String(total).padStart(2, "0")}`
                    : `Story ${String(storyIndex + 1).padStart(2, "0")} of ${String(total).padStart(2, "0")}`}
                </span>
              </div>
              {story.url && (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="story-article__visit"
                >
                  <span>{isAr ? "زيارة المتجر" : "Visit store"}</span>
                  <span aria-hidden>↗</span>
                </a>
              )}
            </div>

            {article?.sectorContext && (
              <section className="story-article__section">
                <h2 className="story-article__h2">
                  {isAr ? "عن القطاع" : "About the Sector"}
                </h2>
                <p className="story-article__p">{article.sectorContext}</p>
              </section>
            )}

            <section className="story-article__section">
              <h2 className="story-article__h2">{isAr ? "التحدي" : "The Challenge"}</h2>
              {challengeParas.map((p, i) => (
                <p key={i} className="story-article__p">{p}</p>
              ))}
            </section>

            <section className="story-article__section">
              <h2 className="story-article__h2">{isAr ? "الاستراتيجية" : "The Strategy"}</h2>
              {strategyParas.map((p, i) => (
                <p key={i} className="story-article__p">{p}</p>
              ))}
              {article?.mechanism && (
                <p className="story-article__p" style={{ marginTop: 18 }}>
                  {article.mechanism}
                </p>
              )}
              <div className="story-article__pullquote">
                <span className="story-article__pullquote-label">
                  {isAr ? "نوع النافذة التسويقية" : "Marketing popup type"}
                </span>
                <span className="story-article__pullquote-value">{displayPopupType}</span>
              </div>
            </section>

            <section className="story-article__section">
              <h2 className="story-article__h2">{isAr ? "النتائج الموثقة" : "Verified Results"}</h2>
              {article?.resultsContext && (
                <p className="story-article__p">{article.resultsContext}</p>
              )}
              <div className="story-article__kpis">
                <div className="story-article__kpi">
                  <div className="story-article__kpi-value">{story.conversions}</div>
                  <div className="story-article__kpi-label">
                    {isAr ? "التحويلات" : "Conversions"}
                  </div>
                </div>
                <div className="story-article__kpi">
                  <div className="story-article__kpi-value">
                    {story.sales}
                    <span className="story-article__kpi-currency">
                      {isAr ? "ر.س" : "SAR"}
                    </span>
                  </div>
                  <div className="story-article__kpi-label">
                    {isAr ? "إجمالي المبيعات" : "Total sales"}
                  </div>
                </div>
              </div>
            </section>

            {article?.takeaway && (
              <section className="story-article__section story-article__section--takeaway">
                <h2 className="story-article__h2">
                  {isAr ? "الخلاصة" : "Key Takeaway"}
                </h2>
                <p className="story-article__p story-article__p--emphasized">
                  {article.takeaway}
                </p>
              </section>
            )}
          </article>
        </div>

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
