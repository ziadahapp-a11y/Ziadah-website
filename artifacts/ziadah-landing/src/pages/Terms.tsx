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
    {
      title: "القبول بالشروط",
      body: "باستخدامك تطبيق زيادة أو تثبيته على متجرك عبر منصة زد أو سلة، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق عليها، يرجى عدم استخدام التطبيق.",
    },
    {
      title: "وصف الخدمة",
      body: "زيادة هو تطبيق SaaS يقدّم توصيات منتجات ذكية داخل متاجر زد وسلة (مثل اشترِ معاً، منتجات ذات صلة، وعروض رفع القيمة) بهدف زيادة متوسط قيمة الطلب ومعدل التحويل، مع لوحة تحكم لمتابعة الأداء وضبط الإعدادات.",
    },
    {
      title: "شروط الاشتراك والدفع",
      body: "يتم تفعيل التطبيق عبر خطط اشتراك دورية معروضة داخل صفحة الأسعار وتشمل الضريبة المضافة حسب الأنظمة السعودية. تُجدَّد الاشتراكات تلقائياً في نهاية كل دورة فوترة ما لم يتم إلغاؤها، وتُصدر الفواتير عبر منصة المتجر (زد أو سلة) أو عبر مزود الدفع المعتمد لدينا.",
    },
    {
      title: "سياسة الاسترداد",
      body: "تخضع طلبات الاسترداد لتقدير زيادة، وتُعالَج وفق أنظمة حماية المستهلك المعمول بها في المملكة العربية السعودية. للاستفسار عن استرداد مبلغ أو نزاع على فاتورة، يرجى التواصل مع فريق الدعم خلال 14 يوماً من تاريخ الفوترة.",
    },
    {
      title: "التزامات المستخدم",
      body: "يلتزم التاجر بتقديم معلومات صحيحة عن متجره، وعدم استخدام التطبيق لأي غرض مخالف للأنظمة، وعدم محاولة الوصول غير المصرح به إلى أنظمة زيادة أو استخراج بيانات المتجرين الآخرين.",
    },
    {
      title: "الملكية الفكرية",
      body: "جميع حقوق الملكية الفكرية المتعلقة بتطبيق زيادة، بما في ذلك الشيفرة البرمجية والتصميم والعلامة التجارية، مملوكة لزيادة. لا يمنحك استخدام التطبيق أي حق ملكية عليه، وإنما ترخيصاً محدوداً وغير قابل للتحويل لاستخدامه ضمن نطاق اشتراكك.",
    },
    {
      title: "تحديد المسؤولية",
      body: "يُقدَّم التطبيق \"كما هو\" دون ضمانات صريحة أو ضمنية بتحقيق نتائج مبيعات معينة. لا تتحمل زيادة مسؤولية أي أضرار غير مباشرة أو أرباح ضائعة ناتجة عن استخدام أو تعذر استخدام التطبيق، ضمن الحدود التي يسمح بها النظام.",
    },
    {
      title: "إنهاء الخدمة",
      body: "يمكنك إلغاء اشتراكك في أي وقت من لوحة تحكم متجرك، ويستمر الوصول للخدمة حتى نهاية الدورة المدفوعة الحالية. يحق لزيادة تعليق أو إنهاء الحساب في حال الإخلال الجسيم بهذه الشروط.",
    },
    {
      title: "التواصل معنا",
      body: "لأي استفسار يتعلق بهذه الشروط، يمكنك التواصل معنا عبر support@ziadah.app.",
    },
  ],
  en: [
    {
      title: "Acceptance of Terms",
      body: "By installing or using Ziadah on your Zid or Salla store, you agree to be bound by these Terms of Service. If you do not agree, please do not use the App.",
    },
    {
      title: "Service Description",
      body: "Ziadah is a SaaS application that surfaces AI-driven product recommendations (such as Buy Together, related products, and upsell offers) inside Zid and Salla stores to increase average order value and conversion, together with a dashboard for tracking performance and managing settings.",
    },
    {
      title: "Subscription and Payment Terms",
      body: "Ziadah is activated through recurring subscription plans listed on our pricing page, inclusive of VAT as required under Saudi regulations. Subscriptions renew automatically at the end of each billing cycle unless cancelled, and invoices are issued via your store platform (Zid or Salla) or our approved payment provider.",
    },
    {
      title: "Refund Policy",
      body: "Refund requests are handled at Ziadah's discretion and in line with applicable Saudi consumer protection regulations. To request a refund or dispute a charge, contact our support team within 14 days of the billing date.",
    },
    {
      title: "User Obligations",
      body: "Merchants agree to provide accurate store information, use the App only for lawful purposes, and refrain from unauthorized access to Ziadah's systems or attempts to extract data belonging to other merchants.",
    },
    {
      title: "Intellectual Property",
      body: "All intellectual property in Ziadah, including its code, design, and branding, belongs to Ziadah. Using the App grants you a limited, non-transferable license to use it within the scope of your subscription — not any ownership right.",
    },
    {
      title: "Limitation of Liability",
      body: "The App is provided \"as is\" without warranties of specific sales outcomes. Ziadah is not liable for indirect damages or lost profits arising from use or inability to use the App, to the extent permitted by law.",
    },
    {
      title: "Service Termination",
      body: "You may cancel your subscription at any time from your store dashboard, with access continuing through the end of the current paid cycle. Ziadah may suspend or terminate an account for material breach of these terms.",
    },
    {
      title: "Contact Us",
      body: "For any question about these terms, contact us at support@ziadah.app.",
    },
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
