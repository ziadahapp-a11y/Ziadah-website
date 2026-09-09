import { useEffect, useState } from "react";
import {
  Search,
  Clock,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  AlertTriangle,
  MessageCircle,
  ChevronRight,
  Zap,
  Settings,
  Bot,
  CreditCard,
  Wrench,
  Monitor,
  TrendingUp,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import PageShell from "../components/PageShell";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import {
  categories as supportCategories,
  getArticleById,
  getCategoryById,
  type FullArticle,
} from "../data/support-data";
import { navigateTo } from "@/components/PageTransition";
import { useParams } from "wouter";
import SEO from "../components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, SupportArticleSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { useSupportArticleFields } from "@/hooks/useSupportArticleFields";
import { HeroLede, Section } from "@/sections";
import { Shell, Button as MkButton } from "@/components/mk";
import { t as siteTranslations } from "@/i18n/translations";

const FALLBACK_SUPPORT_ARTICLE = supportCategories[0]!.articles[0]!;

/** Map the category emoji icons to lucide icons (DS uses lucide, never emoji). */
const CATEGORY_ICON: Record<string, LucideIcon> = {
  "⚡": Zap,
  "⚙️": Settings,
  "🤖": Bot,
  "💳": CreditCard,
  "🔧": Wrench,
  "🖥️": Monitor,
  "📈": TrendingUp,
};

export default function SupportArticle() {
  const t = siteTranslations;
  const { lang, dir, isAr } = useLanguage();
  const tx = t[lang].support;
  const pc = t[lang].pageClosingCta;
  const ld = t[lang].landing;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const article = id ? getArticleById(id) : undefined;
  const category = article ? getCategoryById(article.categoryId) : undefined;
  const cmsFields = useSupportArticleFields(article ?? FALLBACK_SUPPORT_ARTICLE);
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  const siblingTitle = (a: FullArticle) =>
    isAr
      ? a.title
      : a.titleEn ?? a.title;
  const siblingTime = (a: FullArticle) =>
    isAr
      ? a.time
      : a.timeEn ?? a.time;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getCatLabel = (cat: { label: string; labelEn?: string }) => isAr ? cat.label : (cat.labelEn || cat.label);

  if (!article || !category) {
    /* The miss is a band like any other, not a white slab with a zinc icon
       tile on it. Grey, because the article body it stands in for is grey. */
    return (
      <div className="page" dir={dir}>
        <Section family="grey" className="min-h-[70vh] flex items-center">
          <Shell width="narrow">
            <div className="text-center">
              <span className="card-ico mx-auto mb-6" aria-hidden="true">
                <Search className="w-5 h-5" />
              </span>
              <h1 className="section-head-title--sm mb-4">{tx.notFoundTitle}</h1>
              <p className="t-body-18 mb-8">{tx.notFoundDesc}</p>
              <MkButton onClick={() => navigateTo("/support")}>{tx.notFoundBtn}</MkButton>
            </div>
          </Shell>
        </Section>
      </div>
    );
  }

  const articleTitle = cmsFields.title;
  const articleDesc = cmsFields.desc;
  const articleTime = cmsFields.time;
  const catLabel = getCatLabel(category);
  const CategoryIcon = CATEGORY_ICON[category.icon] ?? BookOpen;
  const pk = getPageKeywords("/support");
  const titleSuffixAr = "مركز مساعدة زيادة";
  const titleSuffixEn = "Ziadah Help Center";

  return (
    <>
    <SEO
      titleAr={`${article.title} — ${titleSuffixAr}`}
      titleEn={`${article.titleEn ?? article.title} — ${titleSuffixEn}`}
      descriptionAr={article.desc}
      descriptionEn={article.descEn ?? article.desc}
      canonical={`/support/article/${article.id}`}
      keywordsAr={pk?.keywordsAr}
      keywordsEn={pk?.keywordsEn}
    />
    <BreadcrumbSchema items={[
      { name: tx.breadcrumbHome, url: "/" },
      { name: tx.breadcrumbSupport, url: "/support" },
      { name: articleTitle, url: `/support/article/${article.id}` }
    ]} />
    <SupportArticleSchema
      headline={articleTitle}
      description={articleDesc}
      url={`/support/article/${article.id}`}
      articleSection={catLabel}
    />
    {/* No `bg-white` here. PageShell painting white put a hard slab under a
        band that stamps its own family, which is what made this page read as
        a document floating on the site rather than part of it. */}
    <PageShell className="relative overflow-x-clip">

      {/* ══════════════════ HERO ══════════════════
          Same shape as the success-story detail page: the category and the
          read time are the eyebrow, the way back to the index is the action,
          and the visible breadcrumb goes - it duplicated that action while
          the JSON-LD above still carries the trail for search. */}
      <HeroLede
        compact
        center={false}
        family="violet"
        invert
        eyebrow={
          /* One inline-flex run, not loose inline children: `.t-eyebrow` is a
             paragraph, and lucide's SVGs are block-level, so each icon was
             taking a line of its own. */
          <span className="inline-flex items-center gap-2 flex-wrap">
            <CategoryIcon className="w-3.5 h-3.5" aria-hidden="true" />
            {catLabel}
            <span aria-hidden="true">·</span>
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {articleTime} {tx.readSuffix}
          </span>
        }
        title={articleTitle}
        body={articleDesc}
        actions={
          <MkButton variant="tertiary" onClick={() => navigateTo("/support")}>
            <BackArrow className="w-4 h-4" aria-hidden="true" />
            <span className="ms-2">{tx.backToHelp}</span>
          </MkButton>
        }
      />

      {/* ══════════════════ ARTICLE BODY ══════════════════ */}
      <Section family="grey">
        <Shell width="narrow">
          <article dir={dir} className="measure-read article-prose">
            {cmsFields.sections.map((section, i) => {
              if (section.type === "heading") {
                return <h2 key={i} className="article-h2">{section.text}</h2>;
              }

              if (section.type === "paragraph") {
                return <p key={i} className="article-p">{section.text}</p>;
              }

              if (section.type === "numbered" && section.items) {
                return (
                  <div key={i} className="article-ol">
                    {section.items.map((item, j) => (
                      <div key={j} className="article-ol-row">
                        <span className="article-ol-num inline-flex">{j + 1}</span>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                );
              }

              if (section.type === "list" && section.items) {
                return (
                  <div key={i} className="article-ul">
                    {section.items.map((item, j) => (
                      <div key={j} className="article-ul-row">
                        <span className="article-ul-dot" aria-hidden="true" />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                );
              }

              if (section.type === "tip" || section.type === "warning") {
                const warn = section.type === "warning";
                const NoteIcon = warn ? AlertTriangle : Lightbulb;
                return (
                  <div key={i} className={`article-note${warn ? " article-note--warn" : ""}`}>
                    <NoteIcon className="article-note-ico" aria-hidden="true" />
                    <div>
                      <div className="article-note-label">{warn ? tx.warningLabel : tx.tipLabel}</div>
                      <p>{section.text}</p>
                    </div>
                  </div>
                );
              }

              return null;
            })}

            {/* Footer actions. The back link lives in the hero now, so what is
                left down here is the one thing a reader who finished the
                article and still has the question actually wants. */}
            <div className="article-foot">
              <MkButton
                as="a"
                variant="secondary"
                href="https://api.whatsapp.com/send/?phone=966510131856"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span className="ms-2">{tx.contactSupport}</span>
              </MkButton>
            </div>

            {/* Siblings from the same category. */}
            {(() => {
              const siblings = category.articles.filter(a => a.id !== article.id).slice(0, 3);
              if (!siblings.length) return null;
              return (
                <div>
                  <h2 className="article-h2">{tx.relatedArticles}</h2>
                  <div className="article-related">
                    {siblings.map(s => (
                      <a
                        key={s.id}
                        href={`/support/article/${s.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(`/support/article/${s.id}`);
                        }}
                        className="card card--short card--clickable card--flat flex-row items-center justify-between gap-4"
                      >
                        <div>
                          <div className="t-sm-med">{siblingTitle(s)}</div>
                          <div className="card-eyebrow mt-1">{siblingTime(s)} {tx.readSuffix}</div>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 ${isAr ? "rotate-180" : ""}`} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}
          </article>
        </Shell>
      </Section>

      <PageClosingCta
        title={pc.supportTitle}
        description={pc.supportDesc}
        buttonLabel={ld.ctaBtn}
        onActivate={() => setPlatformModalOpen(true)}
      />
    </PageShell>
    <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
