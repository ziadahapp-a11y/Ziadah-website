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
      title: "مقدمة",
      body: "تلتزم زيادة (\"التطبيق\"، \"نحن\") بحماية خصوصية أصحاب المتاجر على منصتي زد وسلة ومستخدمي متاجرهم. توضح هذه السياسة أنواع البيانات التي نجمعها، وكيفية استخدامها وحمايتها، عند استخدامك لتطبيق زيادة وخدماته المرتبطة بالتوصيات الذكية لرفع متوسط قيمة الطلب.",
    },
    {
      title: "البيانات التي نجمعها",
      body: "نجمع بيانات حساب التاجر (الاسم، البريد الإلكتروني، بيانات المتجر عبر واجهات زد وسلة الرسمية)، وبيانات تشغيلية عن المنتجات والطلبات والتفاعل مع التوصيات داخل المتجر، بالإضافة إلى بيانات تقنية أساسية مثل نوع المتصفح وسجلات الاستخدام لأغراض تحسين الأداء وكشف الأعطال.",
    },
    {
      title: "كيف نستخدم بياناتك",
      body: "نستخدم البيانات لتشغيل خدمة التوصيات الذكية وعرضها داخل متجرك، وقياس أثرها على متوسط قيمة الطلب والتحويل، وتزويدك بالتقارير داخل لوحة التحكم، والتواصل معك بخصوص الفواتير والدعم الفني والتحديثات المهمة على الخدمة.",
    },
    {
      title: "مشاركة البيانات مع أطراف ثالثة",
      body: "لا نبيع بياناتك لأي جهة. قد نشارك بيانات محدودة مع مزودي خدمات موثوقين نستعين بهم لتشغيل التطبيق (مثل الاستضافة السحابية ومعالجة المدفوعات)، وذلك بموجب اتفاقيات حماية بيانات تلزمهم بعدم استخدامها لأي غرض آخر. قد نُفصح عن بيانات محدودة إذا طُلب ذلك بموجب نظام أو أمر قضائي في المملكة العربية السعودية.",
    },
    {
      title: "منصات الإعلان والتحليلات (Meta وSnapchat وGoogle وTikTok)",
      body: "قد نستخدم أدوات وواجهات من منصات Meta وSnapchat وGoogle وTikTok لأغراض القياس والتحليلات أو الحملات التسويقية، سواء لموقعنا أو نيابةً عنك عند ربط حساباتك الإعلانية. نلتزم بسياسات هذه المنصات ومعاييرها لحماية بيانات المستخدم، ولا نشارك معها بيانات شخصية أكثر من اللازم لتشغيل الخدمة. يمكنك طلب إيقاف هذه المعالجة وحذف بياناتك في أي وقت.",
    },
    {
      title: "حفظ البيانات وأمانها",
      body: "نحتفظ ببياناتك طوال فترة استخدامك للتطبيق، ولمدة إضافية بعد إلغاء الاشتراك بحسب ما يقتضيه النظام لأغراض محاسبية أو قانونية. نطبّق إجراءات أمان تقنية وتنظيمية معقولة، مثل التشفير أثناء النقل والتحكم في صلاحيات الوصول، لحماية البيانات من الوصول أو الاستخدام غير المصرح به.",
    },
    {
      title: "حقوقك",
      body: "يحق لك طلب الاطلاع على بياناتك الشخصية، أو تصحيحها، أو حذف حسابك وبياناته المرتبطة، وذلك بالتواصل معنا عبر قنوات الدعم. سنقوم بمعالجة طلبك خلال مدة معقولة، وقد نطلب التحقق من هويتك قبل تنفيذه.",
    },
    {
      title: "حذف بياناتك",
      body: "يمكنك حذف حسابك وبيانات متجرك في أي وقت عبر إلغاء تثبيت التطبيق، أو من داخل لوحة التحكم، أو بإرسال طلب إلينا. لمعرفة الخطوات التفصيلية ومدة التنفيذ، اطّلع على صفحة «طلب حذف البيانات» على الرابط /data-deletion.",
    },
    {
      title: "التواصل معنا",
      body: "لأي استفسار يتعلق بهذه السياسة أو ببياناتك الشخصية، يمكنك التواصل معنا عبر support@ziadah.app.",
    },
  ],
  en: [
    {
      title: "Introduction",
      body: "Ziadah (\"the App\", \"we\") is committed to protecting the privacy of merchants on Zid and Salla and their store visitors. This policy explains what data we collect and how we use and protect it when you use Ziadah's AI-powered product recommendation service.",
    },
    {
      title: "Data We Collect",
      body: "We collect merchant account data (name, email, and store data via the official Zid and Salla APIs), operational data about products, orders, and recommendation interactions inside your store, and basic technical data such as browser type and usage logs for performance monitoring and troubleshooting.",
    },
    {
      title: "How We Use Your Data",
      body: "We use this data to run and display AI recommendations in your store, measure their impact on average order value and conversion, provide you with dashboard reporting, and communicate with you about billing, support, and important service updates.",
    },
    {
      title: "Sharing Data with Third Parties",
      body: "We do not sell your data. We may share limited data with trusted service providers who help us operate the App (such as cloud hosting and payment processing), under data protection agreements that restrict them from using it for any other purpose. We may disclose limited data when required by law or a valid legal order in Saudi Arabia.",
    },
    {
      title: "Advertising & Analytics Platforms (Meta, Snapchat, Google, TikTok)",
      body: "We may use tools and APIs from Meta, Snapchat, Google, and TikTok for measurement, analytics, or marketing campaigns — for our own site or on your behalf when you connect your advertising accounts. We comply with these platforms' policies and user-data-protection standards, and we do not share more personal data with them than is necessary to run the service. You can ask us to stop this processing and delete your data at any time.",
    },
    {
      title: "Data Retention and Security",
      body: "We retain your data for as long as you use the App, and for a further period after cancellation where required for accounting or legal purposes. We apply reasonable technical and organizational safeguards, including encryption in transit and access controls, to protect data from unauthorized access or use.",
    },
    {
      title: "Your Rights",
      body: "You may request access to, correction of, or deletion of your personal data and account by contacting our support team. We will process your request within a reasonable timeframe and may ask you to verify your identity first.",
    },
    {
      title: "Deleting Your Data",
      body: "You can delete your account and store data at any time by uninstalling the app, from within the dashboard, or by sending us a request. For detailed steps and timelines, see our “Data Deletion Request” page at /data-deletion.",
    },
    {
      title: "Contact Us",
      body: "For any question about this policy or your personal data, contact us at support@ziadah.app.",
    },
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
