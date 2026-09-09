import { useState, useEffect } from "react";
import { t } from "@/i18n/translations";
import { blogPosts, categories } from "../data/blogPosts";
import { navigateTo } from "@/components/PageTransition";
import StandardPage from "../components/StandardPage";
import { HeroLede, Section as DsSection, CatalogueIndex } from "@/sections";
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
  const catLabelOf = (p: typeof blogPosts[0]) => {
    const c = categories.find((x) => x.id === p.category);
    return c ? getCatLabel(c) : p.category;
  };
  /* The newest post leads the catalogue; the rest paginate under it. */
  const [featuredPost, ...rest] = filtered;
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

      {/* ══════════════════ THE CATALOGUE ══════════════════
          The reference's catalogue template, which had never been wired up
          here. What it brings over the flat grid this replaces:

          - PAGINATION. Forty cards rendered on one page made /blog 6,931px
            tall; the template shows ten and a page rail, which is what keeps
            a listing at its measured height instead of growing with the
            archive.
          - A FEATURED opener, so the newest post leads rather than sitting
            fourth in a uniform grid.
          - The category filter as the template's own sub-nav.

          It renders `bare` (deviation D-09): the reference's catalogue IS its
          page, and Ziadah opens with a lede hero carrying a search box the
          reference has no equivalent for. */}
      <DsSection family="grey">
        <CatalogueIndex
          bare
          title={tx.heroTitle}
          subNav={categories.map((cat) => ({ key: cat.id, label: getCatLabel(cat) }))}
          current={activeCategory}
          onNav={handleCategoryChange}
          featured={
            featuredPost ? (
              <a
                href={`/blog/${featuredPost.slug}`}
                className="card card--clickable cat-featured-card"
                onClick={(e) => {
                  if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  navigateTo(`/blog/${featuredPost.slug}`);
                }}
              >
                <p className="card-eyebrow">{catLabelOf(featuredPost)}</p>
                <h2 className="cat-featured-title mt-6">{getTitle(featuredPost)}</h2>
                <p className="card-body-text mt-6">{getSummary(featuredPost)}</p>
                <div className="card-foot">
                  <span className="card-cta">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {getReadTime(featuredPost)} {tx.readSuffix}
                  </span>
                  <span className="card-eyebrow">{getPublishDate(featuredPost)}</span>
                </div>
              </a>
            ) : null
          }
          cards={rest.map((post) => ({
            key: post.slug,
            category: catLabelOf(post),
            title: getTitle(post),
            excerpt: getSummary(post),
            meta: `${getReadTime(post)} ${tx.readSuffix} · ${getPublishDate(post)}`,
            onClick: () => navigateTo(`/blog/${post.slug}`),
          }))}
          footer={
            filtered.length === 0 ? <p className="section-note">{tx.noResults}</p> : null
          }
        />
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
