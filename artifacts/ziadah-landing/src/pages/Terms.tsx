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
    { title: "القبول بالشروط", body: "[أضف هنا نص القبول بالشروط وكيفية سريانها على المستخدمين.]" },
    { title: "وصف الخدمة", body: "[أضف هنا وصفاً تفصيلياً للخدمات التي تقدمها تطبيق زيادة.]" },
    { title: "شروط الاشتراك والدفع", body: "[أضف هنا تفاصيل خطط الاشتراك وسياسة الدفع والفواتير.]" },
    { title: "سياسة الاسترداد", body: "[أضف هنا سياسة استرداد المدفوعات والشروط المتعلقة بها.]" },
    { title: "التزامات المستخدم", body: "[أضف هنا الالتزامات والمسؤوليات المترتبة على استخدام التطبيق.]" },
    { title: "الملكية الفكرية", body: "[أضف هنا بنود الملكية الفكرية وحقوق الاستخدام.]" },
    { title: "تحديد المسؤولية", body: "[أضف هنا حدود مسؤولية التطبيق تجاه المستخدمين.]" },
    { title: "إنهاء الخدمة", body: "[أضف هنا شروط وإجراءات إنهاء الاشتراك أو إيقاف الخدمة.]" },
    { title: "التواصل معنا", body: "[أضف هنا معلومات التواصل بخصوص أي استفسارات تتعلق بالشروط والأحكام.]" },
  ],
  en: [
    { title: "Acceptance of Terms", body: "[Add here the acceptance of terms text and how they apply to users.]" },
    { title: "Service Description", body: "[Add here a detailed description of the services provided by the Ziadah app.]" },
    { title: "Subscription and Payment Terms", body: "[Add here details about subscription plans, payment policy, and invoicing.]" },
    { title: "Refund Policy", body: "[Add here the refund policy and related conditions.]" },
    { title: "User Obligations", body: "[Add here the obligations and responsibilities of using the app.]" },
    { title: "Intellectual Property", body: "[Add here intellectual property terms and usage rights.]" },
    { title: "Limitation of Liability", body: "[Add here Ziadah's liability limits towards users.]" },
    { title: "Service Termination", body: "[Add here conditions and procedures for subscription termination or service suspension.]" },
    { title: "Contact Us", body: "[Add here contact information for any terms and conditions inquiries.]" },
  ],
};

const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

export default function Terms() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = t[lang];
  const pc = tr.pageClosingCta;
  const ld = tr.landing;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const isEn = lang === "en";
  const content = isEn ? sections.en : sections.ar;
  const pk = getPageKeywords("/terms");

  return (
    <>
      <SEO
        titleAr={t.ar.legalPages.termsTitle}
        titleEn={t.en.legalPages.termsTitle}
        descriptionAr={t.ar.legalPages.termsDesc}
        descriptionEn={t.en.legalPages.termsDesc}
        canonical="/terms"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <BreadcrumbSchema items={[{ name: isEn ? "Home" : "الرئيسية", url: "/" }, { name: isEn ? "Terms & Conditions" : "الشروط والأحكام", url: "/terms" }]} />
      <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff", color: "#09090b" }}>
        {/* HERO */}
        <section dir={dir} className="relative pt-24 pb-16 md:pt-28 md:pb-20 px-4 border-b border-zinc-200">
          <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
          <div className="container mx-auto relative max-w-3xl text-center">
            <div className="mb-4">
              <Eyebrow>{isEn ? "Legal" : "قانوني"}</Eyebrow>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-4 leading-[1.08]">
              {tr.legalPages.termsH1}
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
