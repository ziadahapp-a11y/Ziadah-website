import { t } from "@/i18n/translations";
import PageShell from "../components/PageShell";
import DsPageBackdrop from "@/components/DsPageBackdrop";
import SEO from "../components/SEO";
import { BreadcrumbSchema } from "../components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { getPageKeywords } from "@/seo/page-keywords";

const sections = {
  ar: [
    { title: "مقدمة", body: "[أضف هنا مقدمة سياسة الخصوصية وكيفية التزام زيادة بحماية بيانات مستخدميها.]" },
    { title: "البيانات التي نجمعها", body: "[أضف هنا تفاصيل البيانات التي يتم جمعها من المستخدمين وأصحاب المتاجر.]" },
    { title: "كيف نستخدم بياناتك", body: "[أضف هنا شرحاً لكيفية استخدام البيانات المجمعة وأغراضها.]" },
    { title: "مشاركة البيانات مع أطراف ثالثة", body: "[أضف هنا سياسة مشاركة البيانات مع أطراف ثالثة وضمانات الحماية.]" },
    { title: "حفظ البيانات وأمانها", body: "[أضف هنا تفاصيل مدة حفظ البيانات وإجراءات الأمان المتبعة.]" },
    { title: "حقوقك", body: "[أضف هنا حقوق المستخدم فيما يتعلق ببياناته الشخصية.]" },
    { title: "التواصل معنا", body: "[أضف هنا معلومات التواصل بخصوص أي استفسارات تتعلق بسياسة الخصوصية.]" },
  ],
  en: [
    { title: "Introduction", body: "[Add here an introduction to the privacy policy and how Ziadah is committed to protecting user data.]" },
    { title: "Data We Collect", body: "[Add here details about the data collected from users and store owners.]" },
    { title: "How We Use Your Data", body: "[Add here an explanation of how collected data is used and its purposes.]" },
    { title: "Sharing Data with Third Parties", body: "[Add here the data sharing policy with third parties and protection guarantees.]" },
    { title: "Data Retention and Security", body: "[Add here details about data retention periods and security measures in place.]" },
    { title: "Your Rights", body: "[Add here user rights regarding their personal data.]" },
    { title: "Contact Us", body: "[Add here contact information for any privacy policy inquiries.]" },
  ],
};

export default function Privacy() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = t[lang];
  const isEn = lang === "en";
  const content = isEn ? sections.en : sections.ar;
  const pk = getPageKeywords("/privacy");

  return (
    <>
      <SEO
        titleAr={t.ar.legalPages.privacyTitle}
        titleEn={t.en.legalPages.privacyTitle}
        descriptionAr={t.ar.legalPages.privacyDesc}
        descriptionEn={t.en.legalPages.privacyDesc}
        canonical="/privacy"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <BreadcrumbSchema items={[{ name: isEn ? "Home" : "الرئيسية", url: "/" }, { name: isEn ? "Privacy Policy" : "سياسة الخصوصية", url: "/privacy" }]} />
      <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
        <DsPageBackdrop />
        <section style={{ paddingTop: "var(--page-hero-pt)", paddingBottom: 80, paddingInline: "var(--page-inline-pad)", position: "relative", zIndex: 2 }}>
          <div className="wrap gc ds-legal-doc">
            <h1 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, marginBottom: 16, letterSpacing: -1.5 }}>
              {tr.legalPages.privacyH1}
            </h1>
            <p style={{ fontSize: 14, color: "var(--td)", marginBottom: 48 }}>
              {isEn ? "Last updated: 2025" : "آخر تحديث: 2025"}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 40, fontSize: 15, lineHeight: 1.9, color: "var(--tm)" }}>
              {content.map((s, i) => (
                <div key={i}>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--t)", marginBottom: 12 }}>
                    {s.title}
                  </h2>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}
