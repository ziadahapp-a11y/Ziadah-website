import { useState, useEffect } from "react";
import { t } from "@/i18n/translations";
import { blogPosts, categories } from "../data/blogPosts";
import { navigateTo } from "@/components/PageTransition";
import StandardPage from "../components/StandardPage";
import { HeroLede, Section as DsSection } from "@/sections";
import { Shell } from "@/components/mk";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, ItemListSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { Clock, Search } from "lucide-react";
import { t as siteTranslations } from "@/i18n/translations";

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
  const t = siteTranslations;
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
      ? p.title
      : p.titleEn ?? p.title;
  const getSummary = (p: typeof blogPosts[0]) =>
    isAr
      ? p.summary
      : p.summaryEn ?? p.summary;
  const getReadTime = (p: typeof blogPosts[0]) =>
    isAr
      ? p.readTime
      : p.readTimeEn ?? p.readTime;
  const getPublishDate = (p: typeof blogPosts[0]) =>
    isAr
      ? p.publishDate
      : p.publishDateEn ?? p.publishDate;

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
      className="relative overflow-x-clip"
    >
    <>
    <BreadcrumbSchema items={[{ name: tx.breadcrumbHome, url: "/" }, { name: tx.breadcrumbBlog, url: "/blog" }]} />
    <ItemListSchema
      posts={blogPosts.map(p => ({ slug: p.slug, title: getTitle(p), summary: getSummary(p), publishDateIso: p.publishDateIso }))}
      name={t[lang].blog.seoTitle}
      description={t[lang].blog.seoDesc}
    />

      {/* HERO */}
      <HeroLede
        compact
        family="grey"
        eyebrow={tx.tag}
        title={tx.heroTitle}
        body={tx.heroSub}
      >
        {/* Search. An index opener hands the reader its contents, so the search
            belongs inside the hero rather than in a band under it. */}
        <div className="hero-search">
          <input
            type="search"
            autoComplete="off"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={tx.searchPlaceholder}
            className="hero-search-input"
          />
          <Search className="hero-search-ico" aria-hidden="true" />
        </div>
      </HeroLede>

      {/* CATEGORY FILTER
          The same sticky chip rail the success-story index uses, so the two
          catalogues filter the same way. It used to be a row of hand-painted
          zinc pills: white ground, zinc border, zinc-950 when active. */}
      <nav className="sector-filter" aria-label={tx.tag}>
        <div className="container">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="chip"
              aria-pressed={activeCategory === cat.id}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {getCatLabel(cat)}
            </button>
          ))}
        </div>
      </nav>

      {/* BLOG GRID
          The covers are gone. Forty cards each carried a random pastel
          gradient behind one big emoji - no two posts sharing a palette, no
          emoji naming its post, and the whole page reading as a colour swatch
          rather than an index. What a reader picks a post on is its category,
          its headline, its standfirst and how long it takes, so that is what
          the card carries. The link stays a real `<a href>`: this is the page
          a crawler walks the blog from. */}
      <DsSection family="grey">
        <Shell>
          {filtered.length === 0 ? (
            <p className="section-note">{tx.noResults}</p>
          ) : (
            <div className="cards-grid">
              {filtered.map((post) => {
                const catObj = categories.find((c) => c.id === post.category);
                const catDisplay = catObj ? getCatLabel(catObj) : post.category;
                return (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rv card card--clickable"
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
                    <div>
                      <p className="card-eyebrow">{catDisplay}</p>
                      <h2 className="card-title mt-6 card-title--spaced">{getTitle(post)}</h2>
                      <p className="card-body-text">{getSummary(post)}</p>
                    </div>
                    <div className="card-foot">
                      <span className="card-cta">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        {getReadTime(post)} {tx.readSuffix}
                      </span>
                      <span className="card-eyebrow">{getPublishDate(post)}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </Shell>
      </DsSection>
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
