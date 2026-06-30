import { useState, useEffect } from "react";
import { t } from "@/i18n/translations";
import { blogPosts, categories } from "../data/blogPosts";
import { navigateTo } from "@/components/PageTransition";
import StandardPage from "../components/StandardPage";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, ItemListSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { useSiteContentMap, useSiteT } from "../cms/siteContent";
import { ArrowLeft, ArrowRight, Clock, Search } from "lucide-react";
import { Eyebrow } from "@/components/trackflow";

const legacyCategoryMap: Record<string, string> = {
  "استراتيجيات البيع": "sales-strategies",
  "شروحات المنصة": "platform-tutorials",
  "شروحات التطبيق": "platform-tutorials",
  "الذكاء الاصطناعي": "artificial-intelligence",
  "دليل التاجر": "merchant-guide",
  "التجارة الإلكترونية": "ecommerce",
  "دراسات وأبحاث": "studies-research",
};

function getInitialFilters() {
  const params = new URLSearchParams(window.location.search);
  const rawCat = params.get("cat") ?? "all";
  const cat = legacyCategoryMap[rawCat] ?? rawCat;
  const search = params.get("search") ?? "";
  const validCat = categories.some((c) => c.id === cat) ? cat : "all";
  return { cat: validCat, search };
}

export default function Blog() {
  const t = useSiteT();
  const cmsMap = useSiteContentMap();
  const { lang, isAr } = useLanguage();
  const tx = t[lang].blog;
  const pc = t[lang].pageClosingCta;
  const ld = t[lang].landing;
  const initial = getInitialFilters();
  const [activeCategory, setActiveCategory] = useState(initial.cat);
  const [search, setSearch] = useState(initial.search);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const ArrowCTA = isAr ? ArrowLeft : ArrowRight;

  function updateUrl(cat: string, searchVal: string) {
    // Preserve unrelated params (e.g. `mode=dark|light`) while updating blog filters.
    const params = new URLSearchParams(window.location.search);
    params.delete("cat");
    params.delete("search");
    if (cat !== "all") params.set("cat", cat);
    if (searchVal.trim()) params.set("search", searchVal);
    const query = params.toString();
    const newUrl = window.location.pathname + (query ? `?${query}` : "");
    window.history.replaceState(null, "", newUrl);
  }

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    updateUrl(cat, search);
  }

  function handleSearchChange(val: string) {
    setSearch(val);
    updateUrl(activeCategory, val);
  }

  useEffect(() => {
    if (activeCategory === "all" && !search) {
      window.scrollTo(0, 0);
    }
    let obs: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      obs = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("on");
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
      );
      document.querySelectorAll(".rv").forEach((el) => obs!.observe(el));
    }, 50);
    return () => {
      clearTimeout(timer);
      obs?.disconnect();
    };
  }, [activeCategory, search]);

  const getCategoryLabel = (catId: string) => {
    const catObj = categories.find(c => c.id === catId);
    if (!catObj) return catId;
    return isAr ? catObj.label : catObj.labelEn;
  };

  const getTitle = (p: typeof blogPosts[0]) =>
    isAr
      ? cmsMap[`blog.${p.slug}.title`] ?? p.title
      : cmsMap[`blog.${p.slug}.titleEn`] ?? p.titleEn ?? p.title;
  const getSummary = (p: typeof blogPosts[0]) =>
    isAr
      ? cmsMap[`blog.${p.slug}.summary`] ?? p.summary
      : cmsMap[`blog.${p.slug}.summaryEn`] ?? p.summaryEn ?? p.summary;
  const getReadTime = (p: typeof blogPosts[0]) =>
    isAr
      ? cmsMap[`blog.${p.slug}.readTime`] ?? p.readTime
      : cmsMap[`blog.${p.slug}.readTimeEn`] ?? p.readTimeEn ?? p.readTime;
  const getPublishDate = (p: typeof blogPosts[0]) =>
    isAr
      ? cmsMap[`blog.${p.slug}.publishDate`] ?? p.publishDate
      : cmsMap[`blog.${p.slug}.publishDateEn`] ?? p.publishDateEn ?? p.publishDate;

  const filtered = blogPosts.filter((post) => {
    const matchCat =
      activeCategory === "all" || post.category === activeCategory;
    const catLabel = getCategoryLabel(post.category);
    const matchSearch =
      !search.trim() ||
      getTitle(post).toLowerCase().includes(search.toLowerCase()) ||
      getSummary(post).toLowerCase().includes(search.toLowerCase()) ||
      post.title.includes(search) ||
      post.summary.includes(search) ||
      catLabel.includes(search);
    return matchCat && matchSearch;
  });

  const getCatLabel = (cat: typeof categories[number]) => isAr ? cat.label : cat.labelEn;
  const pk = getPageKeywords("/blog");

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

  return (
    <>
    <StandardPage
      titleAr={t.ar.blog.seoTitle}
      titleEn={t.en.blog.seoTitle}
      descriptionAr={t.ar.blog.seoDesc}
      descriptionEn={t.en.blog.seoDesc}
      canonical="/blog"
      keywordsAr={pk?.keywordsAr}
      keywordsEn={pk?.keywordsEn}
      className="relative overflow-x-clip bg-white"
      style={{ background: "#fff", color: "#09090b" }}
    >
    <>
    <BreadcrumbSchema items={[{ name: tx.breadcrumbHome, url: "/" }, { name: tx.breadcrumbBlog, url: "/blog" }]} />
    <ItemListSchema posts={blogPosts.map(p => ({ slug: p.slug, title: getTitle(p), summary: getSummary(p), publishDateIso: p.publishDateIso }))} />

      {/* HERO */}
      <section className="relative pt-20 pb-14 md:pt-28 md:pb-16 px-4">
        <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
        <div className="container mx-auto relative max-w-3xl text-center">
          <div className="rv mb-4">
            <Eyebrow>{tx.tag}</Eyebrow>
          </div>
          <h1 className="rv d1 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 mb-5 leading-[1.05]">
            {tx.heroTitle}
          </h1>
          <p className="rv d2 text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-9 leading-relaxed">
            {tx.heroSub}
          </p>

          {/* Search */}
          <div className="rv d3 relative max-w-xl mx-auto">
            <input
              type="search"
              autoComplete="off"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={tx.searchPlaceholder}
              className="w-full h-12 rounded-full border border-zinc-300 bg-white ps-5 pe-12 text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-emerald-500/20 transition-colors"
            />
            <Search className="absolute end-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-zinc-400 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`rounded-full px-5 py-2.5 text-sm transition-colors border ${
                    active
                      ? "bg-zinc-950 border-zinc-950 text-white font-bold"
                      : "bg-white border-zinc-200 text-zinc-700 font-semibold hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  {getCatLabel(cat)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-zinc-500 text-base">
              {tx.noResults}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => {
                const catObj = categories.find(c => c.id === post.category);
                const catDisplay = catObj ? getCatLabel(catObj) : post.category;
                return (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rv group block rounded-2xl border border-zinc-200 bg-white overflow-hidden hover:border-zinc-300 hover:shadow-card transition-all"
                    onClick={(e) => {
                      if (
                        e.defaultPrevented ||
                        e.ctrlKey ||
                        e.metaKey ||
                        e.shiftKey ||
                        e.altKey ||
                        e.button !== 0
                      ) {
                        return;
                      }
                      e.preventDefault();
                      navigateTo(`/blog/${post.slug}`);
                    }}
                  >
                    <article className="flex flex-col h-full">
                      <div
                        className="relative flex items-center justify-center h-44 border-b border-zinc-200"
                        style={{ background: post.coverGradient }}
                      >
                        <span className="text-5xl drop-shadow-sm" aria-hidden>
                          {post.coverIcon}
                        </span>
                        <span className="absolute top-3 start-3 inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 border border-green-200 text-[11px] font-bold text-green-700">
                          {catDisplay}
                        </span>
                      </div>
                      <div className="flex flex-col flex-1 p-6">
                        <h2 className="text-lg font-bold text-zinc-950 leading-snug mb-2.5 line-clamp-2 group-hover:text-zinc-700 transition-colors">
                          {getTitle(post)}
                        </h2>
                        <p className="text-sm text-zinc-600 leading-relaxed mb-5 line-clamp-3">
                          {getSummary(post)}
                        </p>
                        <div className="mt-auto flex items-center justify-between text-xs text-zinc-500">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="num-ltr">{getReadTime(post)}</span> {tx.readSuffix}
                          </span>
                          <span className="num-ltr">{getPublishDate(post)}</span>
                          <ArrowCTA className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </article>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <PageClosingCta
        title={pc.blogIndexTitle}
        description={pc.blogIndexDesc}
        buttonLabel={ld.ctaBtn}
        onActivate={() => setPlatformModalOpen(true)}
      />
    </>
    </StandardPage>
    <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
