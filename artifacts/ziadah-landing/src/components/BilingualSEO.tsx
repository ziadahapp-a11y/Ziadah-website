import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/LanguageContext";
import { ENABLED_LOCALES } from "../i18n/enabled";
import { LOCALE_TAGS, OG_LOCALES, type Locale } from "../i18n/languages";
import { tr } from "../i18n/catalog";
import {
  SITE_URL,
  SITE_NAME,
  absolutePageUrl,
  ogImagePath,
  clampMetaDescription,
  clampMetaTitle,
} from "@/seo/meta";

const DEFAULTS = {
  ar: {
    title: "تطبيق زيادة - اقتراح المنتجات بالذكاء الاصطناعي",
    description:
      "زيادة: تطبيق SaaS للتوصيات الذكية على زد وسلة وشوبيفاي. ارفع المبيعات والتحويل بلغة عربية ورسمية مع دعم السعودية والخليج.",
  },
  en: {
    title: "AI Ecommerce App for Zid, Salla & Shopify Stores",
    description:
      "Ziadah is AI-powered SaaS for Zid, Salla and Shopify: personalized recommendations, AOV and conversion growth for merchants in Saudi Arabia and the GCC.",
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
  ogImage,
  type = "website",
  publishDate,
  author,
  noIndex = false,
}: BilingualSEOProps) {
  const { lang, locale } = useLanguage();
  const resolvedTitleAr = titleAr ?? DEFAULTS.ar.title;
  const resolvedTitleEn = titleEn ?? DEFAULTS.en.title;
  const resolvedDescAr = descriptionAr ?? DEFAULTS.ar.description;
  const resolvedDescEn = descriptionEn ?? DEFAULTS.en.description;

  const rawTitleSegment = lang === "ar" ? resolvedTitleAr : tr(resolvedTitleEn, locale);
  const alreadyBranded = /ziadah|زيادة/i.test(rawTitleSegment);
  const finalTitleSegment = alreadyBranded
    ? rawTitleSegment
    : `${rawTitleSegment} | ${SITE_NAME}`;
  const documentTitle = clampMetaTitle(finalTitleSegment, 60);
  const description = clampMetaDescription(
    lang === "ar" ? resolvedDescAr : tr(resolvedDescEn, locale),
    160,
  );
  const keywords =
    lang === "ar"
      ? (keywordsAr ?? keywordsEn)
      : (keywordsEn ?? keywordsAr);

  const pathRaw = canonical ?? "/";
  const basePath = pathRaw.startsWith("/") ? pathRaw : `/${pathRaw}`;
  const canonicalUrl = absolutePageUrl(basePath, locale);
  const urlAr = absolutePageUrl(basePath, "ar");
  /* A page gets its own card, in its own language, unless it names a picture. */
  const ogSrc = ogImage ?? ogImagePath(basePath, locale);
  const ogImageUrl = ogSrc.startsWith("http") ? ogSrc : `${SITE_URL}${ogSrc}`;

  const htmlLang = LOCALE_TAGS[locale];

  return (
    <Helmet>
      <title>{documentTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <html lang={htmlLang} dir={locale === "ar" ? "rtl" : "ltr"} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}
      <link rel="canonical" href={canonicalUrl} />
      {ENABLED_LOCALES.map((l: Locale) => (
        <link key={l} rel="alternate" hrefLang={LOCALE_TAGS[l]} href={absolutePageUrl(basePath, l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={urlAr} />

      <meta property="og:title" content={documentTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={documentTitle} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={OG_LOCALES[locale]} />
      {ENABLED_LOCALES.filter((l) => l !== locale).map((l) => (
        <meta key={l} property="og:locale:alternate" content={OG_LOCALES[l]} />
      ))}
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
      <meta name="twitter:image:alt" content={documentTitle} />
    </Helmet>
  );
}
