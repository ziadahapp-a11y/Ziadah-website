import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import DsPageBackdrop from "@/components/DsPageBackdrop";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { sectors } from "@/data/sectors";
import { navigateTo } from "@/components/PageTransition";

const EXCLUDED_SLUGS = new Set(["delivery-apps", "ecommerce-platforms"]);

export default function EcommerceStoreSectors() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
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
      <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
        <DsPageBackdrop />

        <section className="page-hero-viewport page-hero-viewport--center" style={{ position: "relative", zIndex: 2 }}>
          <div className="stag rv">
            <span className="stag-dot" />
            {lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores"}
          </div>
          <h1 className="st rv d1" style={{ fontSize: "clamp(32px,4vw,52px)", marginTop: 8 }}>
            {lang === "ar" ? "المتاجر الإلكترونية" : "Ecommerce Stores"}
          </h1>
          <p className="ssub rv d2" style={{ margin: "0 auto", maxWidth: 720 }}>
            {lang === "ar"
              ? "اختر قطاع متجرك الإلكتروني واطّلع على طريقة تطبيق حلول زيادة بالأمثلة وأفضل الممارسات."
              : "Pick your ecommerce vertical and see how to apply Ziadah with practical examples and best practices."}
          </p>
        </section>

        <section style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 100px" }}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
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
                  className={`gc rv d${(i % 3) + 1}`}
                  style={{
                    padding: 0,
                    textAlign: dir === "rtl" ? "right" : "left",
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    fontFamily: "var(--font)",
                    color: "inherit",
                    textDecoration: "none",
                    position: "relative",
                    zIndex: 3,
                    pointerEvents: "auto",
                    display: "block",
                  }}
                >
                  <div className="shine" />
                  <div style={{ padding: "24px 22px 26px" }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }}>{s.icon}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--t)", marginBottom: 8 }}>{title}</div>
                    <div style={{ fontSize: 14, color: "var(--td)", lineHeight: 1.55, marginBottom: 16 }}>{tag}</div>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "var(--p)",
                      }}
                    >
                      {tr.cardCta} →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
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
