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

const SUPPORT_EMAIL = "support@ziadah.app";

type Section = { title: string; body: string };
type Method = { title: string; body: string };

const intro = {
  ar: "توضّح هذه الصفحة كيف يطلب التاجر حذف حسابه وبيانات متجره من تطبيق زيادة، وما الذي يُحذف، ومدة تنفيذ الطلب. صُمّمت هذه التعليمات لتتوافق مع متطلبات حذف بيانات المستخدم لدى منصات Meta وSnapchat وGoogle وTikTok، إضافةً إلى منصتَي زد وسلة ونظام حماية البيانات الشخصية في المملكة العربية السعودية.",
  en: "This page explains how a merchant can request deletion of their account and store data from Ziadah, what gets deleted, and how long it takes. These instructions are designed to satisfy the user-data-deletion requirements of Meta, Snapchat, Google, and TikTok, as well as the Zid and Salla marketplaces and Saudi Arabia's Personal Data Protection Law (PDPL).",
};

const methods: { ar: Method[]; en: Method[] } = {
  ar: [
    {
      title: "1. إلغاء تثبيت التطبيق من متجرك",
      body: "من لوحة تحكم متجرك على زد أو سلة، افتح التطبيقات ثم أزل تطبيق زيادة. يُنشئ الإلغاء إشعاراً تلقائياً (webhook) نبدأ عنده بحذف رموز الوصول (tokens) وبيانات متجرك المرتبطة بالتطبيق.",
    },
    {
      title: "2. من داخل لوحة تحكم زيادة",
      body: "سجّل الدخول إلى لوحة تحكم زيادة، ثم انتقل إلى الإعدادات ← الحساب ← حذف الحساب والبيانات، واتبع خطوات التأكيد. يشمل ذلك حذف حسابك وبيانات متجرك وتقاريرك.",
    },
    {
      title: "3. إرسال طلب بالبريد الإلكتروني",
      body: `أرسل بريداً إلى ${SUPPORT_EMAIL} بعنوان «طلب حذف البيانات» (Data Deletion Request)، مع ذكر اسم المتجر ورابطه والبريد الإلكتروني المسجّل. سنؤكد استلام الطلب وننفّذه بعد التحقق من هويتك.`,
    },
  ],
  en: [
    {
      title: "1. Uninstall the app from your store",
      body: "From your Zid or Salla dashboard, open Apps and remove the Ziadah app. Uninstalling triggers an automatic webhook, at which point we begin deleting the access tokens and store data linked to the app.",
    },
    {
      title: "2. From inside the Ziadah dashboard",
      body: "Sign in to the Ziadah dashboard and go to Settings → Account → Delete account & data, then follow the confirmation steps. This removes your account, store data, and reports.",
    },
    {
      title: "3. Send an email request",
      body: `Email ${SUPPORT_EMAIL} with the subject “Data Deletion Request”, including your store name, store URL, and the registered email address. We will acknowledge your request and process it after verifying your identity.`,
    },
  ],
};

const sections: { ar: Section[]; en: Section[] } = {
  ar: [
    {
      title: "البيانات التي يمكن حذفها",
      body: "يشمل الطلب حذف: بيانات حساب التاجر (الاسم والبريد الإلكتروني)، بيانات المتجر المستوردة عبر واجهات زد وسلة (المنتجات والطلبات)، رموز الوصول (OAuth tokens)، بيانات التفاعل مع التوصيات، والتقارير والتحليلات المرتبطة بحسابك.",
    },
    {
      title: "التحقق من الهوية",
      body: "لحماية حسابك، قد نطلب إثبات ملكيتك للمتجر (مثل التأكيد من البريد الإلكتروني المسجّل أو من داخل لوحة التحكم) قبل تنفيذ الحذف، وذلك لمنع الطلبات غير المصرّح بها.",
    },
    {
      title: "مدة التنفيذ",
      body: "نؤكد استلام طلبك خلال 72 ساعة عمل، ونُكمل حذف بياناتك خلال مدة أقصاها 30 يوماً. تُحذف رموز الوصول فوراً عند إلغاء التثبيت.",
    },
    {
      title: "ما الذي قد نحتفظ به",
      body: "قد نحتفظ بحد أدنى من السجلات (مثل الفواتير وسجلات المعاملات) للمدة التي يفرضها النظام لأغراض محاسبية أو قانونية، كما قد نحتفظ ببيانات مجمّعة ومجهّلة الهوية لا يمكن ربطها بك أو بمتجرك. عدا ذلك، تُحذف بياناتك حذفاً نهائياً.",
    },
    {
      title: "تأكيد إتمام الحذف",
      body: `عند اكتمال الحذف نرسل تأكيداً إلى بريدك الإلكتروني المسجّل. لأي متابعة، تواصل معنا عبر ${SUPPORT_EMAIL}.`,
    },
    {
      title: "التوافق مع معايير المنصات الإعلانية",
      body: "إذا ربطت حساباتك الإعلانية أو استخدمنا منصات Meta أو Snapchat أو Google أو TikTok لأي معالجة نيابةً عنك، فإن تنفيذ طلب الحذف يشمل التوقف عن إرسال بياناتك إلى تلك المنصات وحذف ما نحتفظ به لدينا. تُعدّ هذه الصفحة عنوان تعليمات حذف البيانات (Data Deletion Instructions URL) المعتمد لدى تلك المنصات لمراجعة تطبيقنا واعتماده.",
    },
    {
      title: "التواصل معنا",
      body: `لأي استفسار بخصوص حذف بياناتك، تواصل معنا عبر ${SUPPORT_EMAIL}.`,
    },
  ],
  en: [
    {
      title: "Data that can be deleted",
      body: "A request covers: merchant account data (name and email), store data imported via the Zid and Salla APIs (products and orders), OAuth access tokens, recommendation-interaction data, and the reports and analytics linked to your account.",
    },
    {
      title: "Identity verification",
      body: "To protect your account, we may ask you to confirm ownership of the store (for example, from the registered email address or from within the dashboard) before we delete anything, so that unauthorized requests are prevented.",
    },
    {
      title: "How long it takes",
      body: "We acknowledge your request within 72 business hours and complete deletion within a maximum of 30 days. Access tokens are deleted immediately on uninstall.",
    },
    {
      title: "What we may retain",
      body: "We may keep a minimum set of records (such as invoices and transaction logs) for the period required by law for accounting or legal purposes, and we may keep aggregated, anonymized data that cannot be linked to you or your store. Everything else is permanently deleted.",
    },
    {
      title: "Deletion confirmation",
      body: `When deletion is complete we send a confirmation to your registered email address. For any follow-up, contact us at ${SUPPORT_EMAIL}.`,
    },
    {
      title: "Alignment with advertising-platform standards",
      body: "If you connect your advertising accounts, or we use Meta, Snapchat, Google, or TikTok to process any data on your behalf, fulfilling a deletion request includes stopping any transfer of your data to those platforms and deleting what we hold. This page serves as the approved Data Deletion Instructions URL that those platforms review when approving our app.",
    },
    {
      title: "Contact us",
      body: `For any question about deleting your data, contact us at ${SUPPORT_EMAIL}.`,
    },
  ],
};

const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

export default function DataDeletion() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = t[lang];
  const pc = tr.pageClosingCta;
  const ld = tr.landing;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const isEn = lang === "en";
  const introText = isEn ? intro.en : intro.ar;
  const methodList = isEn ? methods.en : methods.ar;
  const content = isEn ? sections.en : sections.ar;
  const pk = getPageKeywords("/data-deletion");

  return (
    <>
      <SEO
        titleAr={t.ar.legalPages.dataDeletionTitle}
        titleEn={t.en.legalPages.dataDeletionTitle}
        descriptionAr={t.ar.legalPages.dataDeletionDesc}
        descriptionEn={t.en.legalPages.dataDeletionDesc}
        canonical="/data-deletion"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <BreadcrumbSchema
        items={[
          { name: isEn ? "Home" : "الرئيسية", url: "/" },
          { name: isEn ? "Data Deletion" : "حذف البيانات", url: "/data-deletion" },
        ]}
      />
      <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff", color: "#09090b" }}>
        {/* HERO */}
        <section dir={dir} className="relative pt-24 pb-16 md:pt-28 md:pb-20 px-4 border-b border-zinc-200">
          <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
          <div className="container mx-auto relative max-w-3xl text-center">
            <div className="mb-4">
              <Eyebrow>{isEn ? "Legal" : "قانوني"}</Eyebrow>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-4 leading-[1.08]">
              {tr.legalPages.dataDeletionH1}
            </h1>
            <p className="text-sm text-zinc-500 num-ltr">
              {isEn ? "Last updated: 2026" : "آخر تحديث: 2026"}
            </p>
          </div>
        </section>

        {/* DOCUMENT */}
        <section dir={dir} className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            {/* Intro */}
            <p className="text-base text-zinc-700 leading-relaxed mb-12">{introText}</p>

            {/* How to request deletion — highlighted steps */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:p-8 mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-zinc-950 mb-6 leading-snug">
                {isEn ? "How to request deletion" : "كيف تطلب حذف بياناتك"}
              </h2>
              <div className="flex flex-col gap-6">
                {methodList.map((m, i) => (
                  <div key={i}>
                    <h3 className="text-base md:text-lg font-bold text-zinc-900 mb-2">{m.title}</h3>
                    <p className="text-base text-zinc-700 leading-relaxed">{m.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail sections */}
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
