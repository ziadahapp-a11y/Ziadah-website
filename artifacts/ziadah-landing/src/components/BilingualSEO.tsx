import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/LanguageContext";
import { useCMSContent } from "@/cms/siteContent";
import {
  SITE_URL,
  SITE_NAME,
  absolutePageUrl,
  clampMetaDescription,
  clampMetaTitle,
} from "@/seo/meta";

const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.jpg`;

const DEFAULTS = {
  ar: {
    title: "تطبيق زيادة - اقتراح المنتجات بالذكاء الاصطناعي",
    description:
      "زيادة: منصة SaaS للتوصيات الذكية على زد وسلة. ارفع المبيعات والتحويل بلغة عربية ورسمية مع دعم السعودية والخليج.",
  },
  en: {
    title: "AI Ecommerce Platform for Zid & Salla Stores",
    description:
      "Ziadah is AI-powered SaaS for Zid and Salla: personalized recommendations, AOV and conversion growth for merchants in Saudi Arabia and the GCC.",
  },
};

export interface BilingualSEOProps {
  titleAr?: string;
  titleEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  /** Path without /en prefix, e.g. `/` or `/features` */
  canonical?: string;
  keywordsAr?: string;
  keywordsEn?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishDate?: string;
  author?: string;
  noIndex?: boolean;
}

export default function BilingualSEO({
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  canonical,
  keywordsAr,
  keywordsEn,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  publishDate,
  author,
  noIndex = false,
}: BilingualSEOProps) {
  const { lang } = useLanguage();
  const cmsTitleAr = useCMSContent("ar.landing.seoTitle", DEFAULTS.ar.title);
  const cmsTitleEn = useCMSContent("en.landing.seoTitle", DEFAULTS.en.title);
  const cmsDescAr = useCMSContent("ar.landing.seoDesc", DEFAULTS.ar.description);
  const cmsDescEn = useCMSContent("en.landing.seoDesc", DEFAULTS.en.description);

  const resolvedTitleAr = titleAr ?? cmsTitleAr;
  const resolvedTitleEn = titleEn ?? cmsTitleEn;
  const resolvedDescAr = descriptionAr ?? cmsDescAr;
  const resolvedDescEn = descriptionEn ?? cmsDescEn;

  const rawTitleSegment = lang === "ar" ? resolvedTitleAr : resolvedTitleEn;
  const documentTitle = clampMetaTitle(`${rawTitleSegment} | ${SITE_NAME}`, 60);
  const description = clampMetaDescription(
    lang === "ar" ? resolvedDescAr : resolvedDescEn,
    160,
  );
  const keywords =
    lang === "ar"
      ? (keywordsAr ?? keywordsEn)
      : (keywordsEn ?? keywordsAr);

  const pathRaw = canonical ?? "/";
  const basePath = pathRaw.startsWith("/") ? pathRaw : `/${pathRaw}`;
  const canonicalUrl = absolutePageUrl(basePath, lang);
  const urlAr = absolutePageUrl(basePath, "ar");
  const urlEn = absolutePageUrl(basePath, "en");
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  const htmlLang = lang === "ar" ? "ar" : "en";

  return (
    <Helmet>
      <title>{documentTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <html lang={htmlLang} dir={lang === "ar" ? "rtl" : "ltr"} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ar" href={urlAr} />
      <link rel="alternate" hrefLang="en" href={urlEn} />
      <link rel="alternate" hrefLang="x-default" href={urlAr} />

      <meta property="og:title" content={documentTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={lang === "ar" ? "ar_SA" : "en_US"} />
      <meta
        property="og:locale:alternate"
        content={lang === "ar" ? "en_US" : "ar_SA"}
      />
      <meta property="og:url" content={canonicalUrl} />
      {publishDate ? (
        <meta property="article:published_time" content={publishDate} />
      ) : null}
      {author ? <meta property="article:author" content={author} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ziadah_app" />
      <meta name="twitter:title" content={documentTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
}
