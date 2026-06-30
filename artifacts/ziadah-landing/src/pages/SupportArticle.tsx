import { useEffect, useState } from "react";
import {
  Search,
  Clock,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  AlertTriangle,
  MessageCircle,
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
import { BreadcrumbSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { useSiteContentMap, useSiteT } from "../cms/siteContent";
import { useSupportArticleFields } from "../cms/useSupportArticleFields";
import { Section, PrimaryButton } from "@/components/trackflow";

const FALLBACK_SUPPORT_ARTICLE = supportCategories[0]!.articles[0]!;

/** Map the category emoji icons to lucide icons (DS uses lucide, never emoji). */
const CATEGORY_ICON: Record<string, LucideIcon> = {
  "": Zap,
  "": Settings,
  "": Bot,
  "": CreditCard,
  "": Wrench,
  "": Monitor,
  "": TrendingUp,
};

export default function SupportArticle() {
  const t = useSiteT();
  const { lang, dir, isAr } = useLanguage();
  const tx = t[lang].support;
  const pc = t[lang].pageClosingCta;
  const ld = t[lang].landing;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const article = id ? getArticleById(id) : undefined;
  const category = article ? getCategoryById(article.categoryId) : undefined;
  const cmsFields = useSupportArticleFields(article ?? FALLBACK_SUPPORT_ARTICLE);
  const cmsMap = useSiteContentMap();
  const ArrowCTA = isAr ? ArrowLeft : ArrowRight;

  const siblingTitle = (a: FullArticle) =>
    isAr
      ? cmsMap[`support.${a.id}.title`] ?? a.title
      : cmsMap[`support.${a.id}.titleEn`] ?? a.titleEn ?? a.title;
  const siblingTime = (a: FullArticle) =>
    isAr
      ? cmsMap[`support.${a.id}.time`] ?? a.time
      : cmsMap[`support.${a.id}.timeEn`] ?? a.timeEn ?? a.time;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getCatLabel = (cat: { label: string; labelEn?: string }) => isAr ? cat.label : (cat.labelEn || cat.label);

  if (!article || !category) {
    return (
      <PageShell className="bg-white" style={{ background: "#fff" }}>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto mb-6">
              <Search className="w-7 h-7 text-zinc-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-950 mb-3">{tx.notFoundTitle}</h1>
            <p className="text-zinc-600 mb-8">{tx.notFoundDesc}</p>
            <PrimaryButton onClick={() => navigateTo("/support")}>
              {tx.notFoundBtn}
            </PrimaryButton>
          </div>
        </div>
      </PageShell>
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
  const baseKey = `support.${article.id}`;

  return (
    <>
    <SEO
      titleAr={`${cmsMap[`${baseKey}.title`] ?? article.title} — ${titleSuffixAr}`}
      titleEn={`${cmsMap[`${baseKey}.titleEn`] ?? article.titleEn ?? article.title} — ${titleSuffixEn}`}
      descriptionAr={cmsMap[`${baseKey}.desc`] ?? article.desc}
      descriptionEn={cmsMap[`${baseKey}.descEn`] ?? article.descEn ?? article.desc}
      canonical={`/support/article/${article.id}`}
      keywordsAr={pk?.keywordsAr}
      keywordsEn={pk?.keywordsEn}
    />
    <BreadcrumbSchema items={[
      { name: tx.breadcrumbHome, url: "/" },
      { name: tx.breadcrumbSupport, url: "/support" },
      { name: articleTitle, url: `/support/article/${article.id}` }
    ]} />
    <PageShell className="bg-white" style={{ background: "#fff" }}>

      <Section band="white" className="!pt-16 md:!pt-20 !pb-20" containerClassName="max-w-3xl">
        <article dir={dir}>

          {/* Breadcrumb */}
          <nav className="flex items-center flex-wrap gap-2 mb-8 text-sm text-zinc-500">
            <button
              type="button"
              onClick={() => navigateTo("/support")}
              className="hover:text-zinc-950 transition-colors"
            >
              {tx.breadcrumbHelpCenter}
            </button>
            <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isAr ? "rotate-180" : ""}`} />
            <button
              type="button"
              onClick={() => navigateTo("/support")}
              className="hover:text-zinc-950 transition-colors"
            >
              {catLabel}
            </button>
            <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isAr ? "rotate-180" : ""}`} />
            <span className="text-zinc-700 font-medium">{articleTitle}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 flex-wrap mb-5">
              <span
                className="w-9 h-9 rounded-lg bg-zinc-950 flex items-center justify-center shrink-0"
                aria-hidden
              >
                <CategoryIcon className="w-5 h-5 text-white" />
              </span>
              <span className="inline-flex items-center rounded-full bg-violet-100 border border-violet-200 px-3 py-1 text-xs font-bold text-violet-700">
                {catLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                <Clock className="w-3.5 h-3.5" />
                <span className="num-ltr">{articleTime}</span> {tx.readSuffix}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 leading-tight mb-4">
              {articleTitle}
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed">{articleDesc}</p>
          </header>

          <div className="h-px bg-zinc-200 mb-10" />

          {/* Article Content */}
          <div className="flex flex-col gap-5">
            {cmsFields.sections.map((section, i) => {
              if (section.type === "heading") {
                return (
                  <h2
                    key={i}
                    className="text-xl md:text-2xl font-bold text-zinc-950 mt-3 pb-2.5 border-b border-zinc-200"
                  >
                    {section.text}
                  </h2>
                );
              }

              if (section.type === "paragraph") {
                return (
                  <p key={i} className="text-base md:text-[17px] text-zinc-700 leading-[1.9]">
                    {section.text}
                  </p>
                );
              }

              if (section.type === "numbered" && section.items) {
                return (
                  <div key={i} className="flex flex-col gap-2.5">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex gap-3.5 items-start">
                        <div className="w-7 h-7 rounded-lg bg-violet-100 border border-violet-200 text-violet-700 flex items-center justify-center shrink-0 text-sm font-bold num-ltr">
                          {j + 1}
                        </div>
                        <p className="text-[15px] text-zinc-700 leading-relaxed pt-0.5 m-0">{item}</p>
                      </div>
                    ))}
                  </div>
                );
              }

              if (section.type === "list" && section.items) {
                return (
                  <div key={i} className="flex flex-col gap-2">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex gap-3 items-start rounded-lg bg-zinc-50 border border-zinc-200 px-3.5 py-2.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2 bg-violet-600" />
                        <p className="text-sm text-zinc-700 leading-relaxed m-0">{item}</p>
                      </div>
                    ))}
                  </div>
                );
              }

              if (section.type === "tip") {
                return (
                  <div key={i} className="flex gap-3 items-start rounded-xl bg-violet-50 border border-violet-200 p-4">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-4 h-4 text-violet-600" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-violet-600 uppercase mb-1">{tx.tipLabel}</div>
                      <p className="text-sm text-zinc-700 leading-relaxed m-0">{section.text}</p>
                    </div>
                  </div>
                );
              }

              if (section.type === "warning") {
                return (
                  <div key={i} className="flex gap-3 items-start rounded-xl bg-amber-50 border border-amber-200 p-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-amber-600 uppercase mb-1">{tx.warningLabel}</div>
                      <p className="text-sm text-zinc-700 leading-relaxed m-0">{section.text}</p>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Footer Actions */}
          <div className="mt-14 pt-8 border-t border-zinc-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigateTo("/support")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
              >
                <ArrowCTA className={`w-4 h-4 ${isAr ? "" : "rotate-180"}`} />
                {tx.backToHelp}
              </button>
              <a
                href="https://api.whatsapp.com/send/?phone=966510131856"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-sm font-bold hover:bg-violet-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {tx.contactSupport}
              </a>
            </div>
          </div>

          {/* Related Articles from same category */}
          {(() => {
            const siblings = category.articles.filter(a => a.id !== article.id).slice(0, 3);
            if (!siblings.length) return null;
            return (
              <div className="mt-12">
                <h3 className="text-lg font-bold text-zinc-950 mb-4">{tx.relatedArticles}</h3>
                <div className="flex flex-col gap-3">
                  {siblings.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => navigateTo(`/support/article/${s.id}`)}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5 text-start hover:border-zinc-300 hover:shadow-card transition-all"
                    >
                      <div>
                        <div className="text-sm font-bold text-zinc-950">{siblingTitle(s)}</div>
                        <div className="text-xs text-zinc-500 mt-1"><span className="num-ltr">{siblingTime(s)}</span> {tx.readSuffix}</div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-zinc-400 shrink-0 ${isAr ? "rotate-180" : ""}`} />
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </article>
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
