import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/LanguageContext";

const SITE_URL = "https://www.ziadah.app";
const SITE_NAME = "Ziadah";
const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.jpg`;

const DEFAULTS = {
  ar: {
    title: "زيادة — منصة ذكاء اصطناعي لمتاجر زد وسلة",
    description:
      "زيادة — منصة ذكاء اصطناعي لمتاجر زد وسلة. ارفع مبيعاتك بتوصيات مخصصة لكل عميل. جرّبها الآن مجاناً.",
  },
  en: {
    title: "Ziadah — AI Platform for Zid & Salla Stores",
    description:
      "Ziadah — AI platform for Zid and Salla stores. Boost your sales with smart personalized recommendations for every customer. Try free now.",
  },
};

interface BilingualSEOProps {
  titleAr?: string;
  titleEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  canonical?: string;
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
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  publishDate,
  author,
  noIndex = false,
}: BilingualSEOProps) {
  const { lang } = useLanguage();

  const resolvedTitleAr = titleAr ?? DEFAULTS.ar.title;
  const resolvedTitleEn = titleEn ?? DEFAULTS.en.title;
  const resolvedDescAr = descriptionAr ?? DEFAULTS.ar.description;
  const resolvedDescEn = descriptionEn ?? DEFAULTS.en.description;

  const activeTitle = lang === "ar" ? resolvedTitleAr : resolvedTitleEn;
  const activeDesc = lang === "ar" ? resolvedDescAr : resolvedDescEn;

  const fullTitle = `${activeTitle} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  // The site serves both Arabic and English on the same URLs (language is toggled client-side),
  // so both hreflang alternates point to the same canonical page URL.
  // x-default also points to the canonical page URL (not hardcoded to root).
  const pageUrl = canonicalUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={activeDesc} />
      <html lang={lang === "ar" ? "ar" : "en"} dir={lang === "ar" ? "rtl" : "ltr"} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ar-SA" href={pageUrl} />
      <link rel="alternate" hrefLang="en" href={pageUrl} />
      <link rel="alternate" hrefLang="x-default" href={pageUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={activeDesc} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={lang === "ar" ? "ar_SA" : "en_US"} />
      <meta property="og:url" content={canonicalUrl} />
      {publishDate && <meta property="article:published_time" content={publishDate} />}
      {author && <meta property="article:author" content={author} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ziadah_app" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={activeDesc} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
}
