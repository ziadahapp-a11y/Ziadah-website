import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import PageShell from "@/components/PageShell";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { sectors } from "@/data/sectors";
import { navigateTo } from "@/components/PageTransition";
import { Section, Eyebrow } from "@/components/trackflow";

const EXCLUDED_SLUGS = new Set(["delivery-apps", "ecommerce-platforms"]);

export default function EcommerceStoreSectors() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const ArrowCTA = isAr ? ArrowLeft : ArrowRight;
  const tr = t[lang].sectorsPage;
  const pc = t[lang].pageClosingCta;
  const ld = t[lang].landing;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const pk = getPageKeywords("/sectors/ecommerce-stores");
  const ecommerceSectors = sectors.filter((sector) => !EXCLUDED_SLUGS.has(sector.slug));

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

  return (
    <>
      <SEO
        titleAr="المتاجر الإلكترونية — قطاعات زيادة"
        titleEn="Ecommerce Stores — Ziadah Industries"
        descriptionAr={t.ar.sectorsPage.seoDesc}
        descriptionEn={t.en.sectorsPage.seoDesc}
        canonical="/sectors/ecommerce-stores"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: tr.breadcrumbHome, url: "/" },
          { name: tr.breadcrumbSectors, url: "/sectors" },
          { name: lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores", url: "/sectors/ecommerce-stores" },
        ]}
      />
      <WebPageSchema
        name={lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores"}
        description={lang === "ar" ? t.ar.sectorsPage.seoDesc : t.en.sectorsPage.seoDesc}
        url="/sectors/ecommerce-stores"
      />
      <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff" }}>
        {/* ══════════════════ HERO ══════════════════ */}
        <section dir={dir} className="relative pt-20 pb-16 md:pt-28 md:pb-20 px-4 border-b border-zinc-200">
          <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
          <div className="container mx-auto relative max-w-3xl text-center">
            <div className="rv mb-4">
              <Eyebrow>{lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores"}</Eyebrow>
            </div>
            <h1 className="rv d1 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-5 leading-[1.08]">
              {lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores"}
            </h1>
            <p className="rv d2 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              {lang === "ar"
                ? "اختر قطاع متجرك الإلكتروني واطّلع على طريقة تطبيق حلول زيادة بالأمثلة وأفضل الممارسات."
                : "Pick your ecommerce vertical and see how to apply Ziadah with practical examples and best practices."}
            </p>
          </div>
        </section>

        {/* ══════════════════ SECTOR GRID ══════════════════ */}
        <Section containerClassName="max-w-6xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ecommerceSectors.map((s, i) => {
                const title = lang === "ar" ? s.titleAr : s.titleEn;
                const tag = lang === "ar" ? s.taglineAr : s.taglineEn;
                return (
                  <a
                    key={s.slug}
                    href={`/sectors/${s.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/sectors/${s.slug}`);
                    }}
                    className={`rv d${(i % 3) + 1} group block rounded-2xl border border-zinc-200 bg-white p-7 text-start hover:border-zinc-300 hover:shadow-card transition-all`}
                  >
                    <div className="w-11 h-11 rounded-lg bg-zinc-950 flex items-center justify-center mb-5 text-xl leading-none" aria-hidden>
                      {s.icon}
                    </div>
                    <div className="text-lg font-bold text-zinc-950 mb-2 leading-snug">{title}</div>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-5">{tag}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-600">
                      {tr.cardCta}
                      <ArrowCTA className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </span>
                  </a>
                );
              })}
            </div>
        </Section>

        <PageClosingCta
          title={pc.ecommerceSectorsTitle}
          description={pc.ecommerceSectorsDesc}
          buttonLabel={ld.ctaBtn}
          onActivate={() => setPlatformModalOpen(true)}
        />
      </PageShell>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
