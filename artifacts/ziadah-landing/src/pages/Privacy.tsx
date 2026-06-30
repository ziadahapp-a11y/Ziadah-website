import { useState, type CSSProperties } from "react";
import PageShell from "../components/PageShell";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import SEO from "../components/SEO";
import { BreadcrumbSchema } from "../components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { getPageKeywords } from "@/seo/page-keywords";
import { Eyebrow } from "@/components/trackflow";

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

const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

export default function Privacy() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = t[lang];
  const pc = tr.pageClosingCta;
  const ld = tr.landing;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
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
      <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff", color: "#09090b" }}>
        {/* HERO */}
        <section dir={dir} className="relative pt-24 pb-16 md:pt-28 md:pb-20 px-4 border-b border-zinc-200">
          <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
          <div className="container mx-auto relative max-w-3xl text-center">
            <div className="mb-4">
              <Eyebrow>{isEn ? "Legal" : "قانوني"}</Eyebrow>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-4 leading-[1.08]">
              {tr.legalPages.privacyH1}
            </h1>
            <p className="text-sm text-zinc-500 num-ltr">
              {isEn ? "Last updated: 2025" : "آخر تحديث: 2025"}
            </p>
          </div>
        </section>

        {/* DOCUMENT */}
        <section dir={dir} className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            <div className="flex flex-col gap-12">
              {content.map((s, i) => (
                <div key={i}>
                  <h2 className="text-xl md:text-2xl font-bold text-zinc-950 mb-3 leading-snug">
                    {s.title}
                  </h2>
                  <p className="text-base text-zinc-700 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PageClosingCta
          title={pc.legalTitle}
          description={pc.legalDesc}
          buttonLabel={ld.ctaBtn}
          onActivate={() => setPlatformModalOpen(true)}
        />
      </PageShell>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
