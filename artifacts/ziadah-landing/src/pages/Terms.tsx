import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { BreadcrumbSchema } from "../components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

const sections = {
  ar: [
    { title: "القبول بالشروط", body: "[أضف هنا نص القبول بالشروط وكيفية سريانها على المستخدمين.]" },
    { title: "وصف الخدمة", body: "[أضف هنا وصفاً تفصيلياً للخدمات التي تقدمها منصة زيادة.]" },
    { title: "شروط الاشتراك والدفع", body: "[أضف هنا تفاصيل خطط الاشتراك وسياسة الدفع والفواتير.]" },
    { title: "سياسة الاسترداد", body: "[أضف هنا سياسة استرداد المدفوعات والشروط المتعلقة بها.]" },
    { title: "التزامات المستخدم", body: "[أضف هنا الالتزامات والمسؤوليات المترتبة على استخدام المنصة.]" },
    { title: "الملكية الفكرية", body: "[أضف هنا بنود الملكية الفكرية وحقوق الاستخدام.]" },
    { title: "تحديد المسؤولية", body: "[أضف هنا حدود مسؤولية المنصة تجاه المستخدمين.]" },
    { title: "إنهاء الخدمة", body: "[أضف هنا شروط وإجراءات إنهاء الاشتراك أو إيقاف الخدمة.]" },
    { title: "التواصل معنا", body: "[أضف هنا معلومات التواصل بخصوص أي استفسارات تتعلق بالشروط والأحكام.]" },
  ],
  en: [
    { title: "Acceptance of Terms", body: "[Add here the acceptance of terms text and how they apply to users.]" },
    { title: "Service Description", body: "[Add here a detailed description of the services provided by Ziadah platform.]" },
    { title: "Subscription and Payment Terms", body: "[Add here details about subscription plans, payment policy, and invoicing.]" },
    { title: "Refund Policy", body: "[Add here the refund policy and related conditions.]" },
    { title: "User Obligations", body: "[Add here the obligations and responsibilities of using the platform.]" },
    { title: "Intellectual Property", body: "[Add here intellectual property terms and usage rights.]" },
    { title: "Limitation of Liability", body: "[Add here the platform's liability limits towards users.]" },
    { title: "Service Termination", body: "[Add here conditions and procedures for subscription termination or service suspension.]" },
    { title: "Contact Us", body: "[Add here contact information for any terms and conditions inquiries.]" },
  ],
};

export default function Terms() {
  const { lang, dir } = useLanguage();
  const isEn = lang === "en";
  const content = isEn ? sections.en : sections.ar;

  return (
    <>
      <SEO
        title={isEn ? "Terms & Conditions — Ziadah" : "الشروط والأحكام — زيادة"}
        description={isEn ? "Read the terms and conditions for using the Ziadah platform. Our commitments to you as a subscriber, and what defines our contractual relationship." : "اقرأ الشروط والأحكام الخاصة باستخدام منصة زيادة. التزاماتنا تجاهك كمشترك، وما يُحدد علاقتنا التعاقدية."}
        canonical="/terms"
      />
      <BreadcrumbSchema items={[{ name: isEn ? "Home" : "الرئيسية", url: "/" }, { name: isEn ? "Terms & Conditions" : "الشروط والأحكام", url: "/terms" }]} />
      <div style={{ position: "relative", minHeight: "100vh", direction: dir }}>
        <ParticleBackground />
        <Nav />
        <section style={{ paddingTop: 140, paddingBottom: 80, paddingInline: "5%", position: "relative", zIndex: 2 }}>
          <div className="wrap" style={{ maxWidth: 800 }}>
            <h1 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, marginBottom: 16, letterSpacing: -1.5 }}>
              {isEn ? "Terms & Conditions" : "الشروط والأحكام"}
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
        <Footer />
      </div>
    </>
  );
}
