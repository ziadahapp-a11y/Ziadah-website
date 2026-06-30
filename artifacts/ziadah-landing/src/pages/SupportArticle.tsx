import { useEffect, useState } from "react";
import { Search, Clock, ChevronRight, ArrowRight, ArrowLeft, Lightbulb, AlertTriangle } from "lucide-react";
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

const FALLBACK_SUPPORT_ARTICLE = supportCategories[0]!.articles[0]!;

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
            <button
              type="button"
              onClick={() => navigateTo("/support")}
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-md bg-zinc-950 hover:bg-zinc-800 text-white font-semibold transition-colors"
            >
              {tx.notFoundBtn}
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  const articleTitle = cmsFields.title;
  const articleDesc = cmsFields.desc;
  const articleTime = cmsFields.time;
  const catLabel = getCatLabel(category);
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

      <article dir={dir} className="px-4 pt-16 md:pt-20 pb-20">
        <div className="container mx-auto max-w-3xl">

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
                className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                style={{ background: `${category.color}18`, border: `1px solid ${category.color}30` }}
                aria-hidden
              >
                {category.icon}
              </span>
              <span
                className="text-xs font-bold rounded-full px-3 py-1"
                style={{ color: category.color, background: `${category.color}12`, border: `1px solid ${category.color}25` }}
              >
                {catLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                <Clock className="w-3.5 h-3.5" />
                {articleTime} {tx.readSuffix}
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
                    className="text-xl md:text-2xl font-bold text-zinc-950 mt-3 pb-2.5 border-b"
                    style={{ borderColor: `${category.color}20` }}
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
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold num-ltr"
                          style={{ background: `${category.color}15`, border: `1px solid ${category.color}25`, color: category.color }}
                        >
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
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                          style={{ background: category.color }}
                        />
                        <p className="text-sm text-zinc-700 leading-relaxed m-0">{item}</p>
                      </div>
                    ))}
                  </div>
                );
              }

              if (section.type === "tip") {
                return (
                  <div key={i} className="flex gap-3 items-start rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-emerald-600 uppercase mb-1">{tx.tipLabel}</div>
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
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold hover:bg-emerald-100 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
                        <div className="text-xs text-zinc-500 mt-1">{siblingTime(s)} {tx.readSuffix}</div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-zinc-400 shrink-0 ${isAr ? "rotate-180" : ""}`} />
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </article>
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
