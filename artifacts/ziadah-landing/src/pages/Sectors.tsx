import { useEffect } from "react";
import Nav from "@/components/Nav";
import PageShell from "@/components/PageShell";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { navigateTo } from "@/components/PageTransition";

export default function Sectors() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = t[lang].sectorsPage;
  const pk = getPageKeywords("/sectors");
  const sectorBuckets = [
    {
      slug: "ecommerce-stores",
      icon: "🛍️",
      titleAr: "المتاجر الإلكترونية",
      titleEn: "Ecommerce Stores",
      descAr: "نفس القطاعات الحالية مع أدلة تطبيق زيادة لكل نوع متجر.",
      descEn: "The existing sector playbooks with detailed Ziadah implementation guides.",
      href: "/sectors/ecommerce-stores",
    },
    {
      slug: "delivery-apps",
      icon: "🛵",
      titleAr: "تطبيقات التوصيل",
      titleEn: "Delivery Apps",
      descAr: "صفحة مخصصة لكيفية رفع الطلبات والقيمة في تطبيقات التوصيل.",
      descEn: "A dedicated page for improving order value and conversion in delivery apps.",
      href: "/sectors/delivery-apps",
    },
    {
      slug: "ecommerce-platforms",
      icon: "🧩",
      titleAr: "منصات التسوق الإلكترونية",
      titleEn: "Ecommerce Platforms",
      descAr: "صفحة مخصصة لمنصات السوق المتعدد البائعين وتجارب الاكتشاف.",
      descEn: "A dedicated page for marketplace-style platforms and discovery journeys.",
      href: "/sectors/ecommerce-platforms",
    },
  ] as const;

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
        titleAr="القطاعات الرئيسية — زيادة"
        titleEn="Industry Categories — Ziadah"
        descriptionAr="اختر نوع نشاطك: المتاجر الإلكترونية، تطبيقات التوصيل، أو منصات التسوق الإلكترونية."
        descriptionEn="Choose your business type: ecommerce stores, delivery apps, or ecommerce platforms."
        canonical="/sectors"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: tr.breadcrumbHome, url: "/" },
          { name: tr.breadcrumbSectors, url: "/sectors" },
        ]}
      />
      <WebPageSchema
        name={lang === "ar" ? "القطاعات الرئيسية" : "Industry Categories"}
        description={
          lang === "ar"
            ? "اختر نوع نشاطك: المتاجر الإلكترونية، تطبيقات التوصيل، أو منصات التسوق الإلكترونية."
            : "Choose your business type: ecommerce stores, delivery apps, or ecommerce platforms."
        }
        url="/sectors"
      />
      <PageShell>
        <Nav />

        <section
          style={{
            paddingTop: "var(--page-hero-pt)",
            paddingBottom: 40,
            textAlign: "center",
            position: "relative",
            zIndex: 2,
            paddingInline: "var(--page-inline-pad)",
          }}
        >
          <div className="stag rv" style={{ display: "inline-flex" }}>
            <span className="stag-dot" />
            {lang === "ar" ? "القطاعات الرئيسية" : "Industry Categories"}
          </div>
          <h1 className="st rv d1" style={{ fontSize: "clamp(32px,4vw,52px)", marginTop: 8 }}>
            {lang === "ar" ? "القطاعات الرئيسية" : "Industry Categories"}
          </h1>
          <p className="ssub rv d2" style={{ margin: "0 auto", maxWidth: 720 }}>
            {lang === "ar"
              ? "اختر القسم المناسب لنشاطك. المتاجر الإلكترونية تحتوي على القطاعات الحالية كاملة، مع صفحات مستقلة لتطبيقات التوصيل ومنصات التسوق الإلكترونية."
              : "Choose the category that fits your business. Ecommerce Stores includes all existing sectors, with dedicated pages for Delivery Apps and Ecommerce Platforms."}
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
            {sectorBuckets.map((bucket, i) => {
              const title = lang === "ar" ? bucket.titleAr : bucket.titleEn;
              const tag = lang === "ar" ? bucket.descAr : bucket.descEn;
              return (
                <a
                  key={bucket.slug}
                  href={bucket.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(bucket.href);
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
                    <div style={{ fontSize: 36, marginBottom: 10 }}>{bucket.icon}</div>
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
      </PageShell>
    </>
  );
}
