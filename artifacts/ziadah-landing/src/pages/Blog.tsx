import { useState, useEffect } from "react";
import { t } from "@/i18n/translations";
import { blogPosts, categories, categoryColors } from "../data/blogPosts";
import { navigateTo } from "@/components/PageTransition";
import StandardPage from "../components/StandardPage";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import DsPageBackdrop from "@/components/DsPageBackdrop";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, ItemListSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { useSiteContentMap, useSiteT } from "../cms/siteContent";

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
      className="relative overflow-x-clip blog-white-shell"
      style={{ color: "var(--t)" }}
    >
    <>
    <DsPageBackdrop />
    <BreadcrumbSchema items={[{ name: tx.breadcrumbHome, url: "/" }, { name: tx.breadcrumbBlog, url: "/blog" }]} />
    <ItemListSchema posts={blogPosts.map(p => ({ slug: p.slug, title: getTitle(p), summary: getSummary(p), publishDateIso: p.publishDateIso }))} />
      <section
        className="page-hero-viewport page-hero-viewport--center blog-page-hero"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="blog-page-hero-inner">
        <div className="stag rv" style={{ display: "inline-flex" }}>
          <span className="stag-dot" />
          {tx.tag}
        </div>
        <h1
          className="rv d1 blog-page-hero-title"
          style={{
            fontSize: "clamp(22px,5vw,64px)",
            fontWeight: 900,
            marginTop: 8,
            marginBottom: 16,
            letterSpacing: "-1.5px",
          }}
        >
          {tx.heroTitle}
        </h1>
        <p
          className="ssub rv d2 blog-page-hero-lead"
          style={{ margin: "0 auto 36px", maxWidth: 560 }}
        >
          {tx.heroSub}
        </p>

        {/* Search */}
        <div
          className="rv d3 blog-page-hero-search-wrap"
          style={{ maxWidth: 540, margin: "0 auto", position: "relative" }}
        >
          <input
            type="search"
            className="blog-page-hero-search"
            autoComplete="off"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={tx.searchPlaceholder}
            style={{
              width: "100%",
              paddingBlock: 15,
              paddingInlineEnd: 52,
              paddingInlineStart: 22,
              borderRadius: 50,
              fontFamily: "var(--font)",
              fontSize: 15,
            }}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="blog-page-hero-search-ico"
            style={{
              position: "absolute",
              insetInlineEnd: 18,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <circle
              cx="8"
              cy="8"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <line
              x1="12"
              y1="12"
              x2="16"
              y2="16"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "48px 5% 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  padding: "9px 20px",
                  borderRadius: 50,
                  border:
                    activeCategory === cat.id
                      ? "1px solid rgba(168,85,247,.5)"
                      : "1px solid var(--b1)",
                  background:
                    activeCategory === cat.id
                      ? "rgba(124,58,237,.15)"
                      : "var(--s1)",
                  color: activeCategory === cat.id ? "#c084fc" : "var(--tm)",
                  fontFamily: "var(--font)",
                  fontSize: 14,
                  fontWeight: activeCategory === cat.id ? 700 : 500,
                  cursor: "pointer",
                  transition: "all .2s",
                  backdropFilter: "blur(16px)",
                }}
              >
                {getCatLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 var(--page-inline-pad) 100px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "var(--td)",
                fontSize: 16,
              }}
            >
              {tx.noResults}
            </div>
          ) : (
            <div className="blog-cards-grid">
              {filtered.map((post, i) => {
                const catObj = categories.find(c => c.id === post.category);
                const catDisplay = catObj ? getCatLabel(catObj) : post.category;
                return (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-card-link"
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
                  <article
                    className="blog-card gc gc-lift rv"
                    style={{
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    <div className="shine" aria-hidden />
                    <div
                      className="blog-card__media"
                      style={{ background: post.coverGradient }}
                    >
                      <div className="blog-cover-overlay" aria-hidden />
                      <span className="blog-card__icon-wrap">
                        {post.coverIcon}
                      </span>
                      <div
                        className="blog-card__badge"
                        style={{
                          background: `${categoryColors[post.category]}28`,
                          border: `1px solid ${categoryColors[post.category]}66`,
                          color: categoryColors[post.category],
                        }}
                      >
                        {catDisplay}
                      </div>
                    </div>
                    <div className="blog-card__body">
                      <h2 className="blog-card__title">{getTitle(post)}</h2>
                      <p className="blog-card__excerpt">{getSummary(post)}</p>
                      <div className="blog-card__footer">
                        <div className="blog-card__meta-chip">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden
                          >
                            <circle
                              cx="6"
                              cy="6"
                              r="5"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                            <path
                              d="M6 3v3l2 1.5"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                            />
                          </svg>
                          {getReadTime(post)} {tx.readSuffix}
                        </div>
                        <span className="blog-card__date">
                          {getPublishDate(post)}
                        </span>
                        <span className="blog-card__go" aria-hidden>
                          <svg
                            className="blog-card__go-svg"
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M6 12l4-4-4-4"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
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
