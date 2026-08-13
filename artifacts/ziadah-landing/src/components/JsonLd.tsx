import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/i18n/LanguageContext";
import { absolutePageUrl } from "@/seo/meta";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Helmet>
  );
}

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ziadah",
    alternateName: "زيادة",
    url: "https://www.ziadah.app",
    logo: "https://www.ziadah.app/logo-en.svg",
    description: "تطبيق ذكاء اصطناعي لتحسين مبيعات متاجر زد وسلة عبر توصيات مخصصة وعروض ذكية",
    sameAs: [
      "https://twitter.com/ziadah_app",
      "https://www.instagram.com/ziadah.app",
      "https://www.linkedin.com/company/ziadah"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+966510131856",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"]
    },
    areaServed: [
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Kuwait" },
      { "@type": "Country", name: "Bahrain" },
      { "@type": "Country", name: "Oman" },
      { "@type": "Country", name: "Qatar" },
    ],
    knowsAbout: [
      "AI product recommendations",
      "اقتراح المنتجات بالذكاء الاصطناعي",
      "ecommerce personalization",
      "Zid Salla integrations",
      "cross-sell and upsell automation",
    ],
  };
  return <JsonLd data={data} />;
}

export function SoftwareAppSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ziadah",
    alternateName: "زيادة",
    url: "https://www.ziadah.app",
    description: "تطبيق ذكاء اصطناعي لمتاجر زد وسلة يرفع متوسط قيمة الطلب ومعدل التحويل عبر توصيات مخصصة",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: ["ar", "en"],
    offers: [
      {
        "@type": "Offer",
        name: "باقة الانطلاقة",
        price: "24",
        priceCurrency: "SAR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "24",
          priceCurrency: "SAR",
          unitText: "Monthly"
        }
      },
      {
        "@type": "Offer",
        name: "باقة النمو",
        price: "249",
        priceCurrency: "SAR"
      },
      {
        "@type": "Offer",
        name: "باقة الاحترافية",
        price: "666",
        priceCurrency: "SAR"
      },
      {
        "@type": "Offer",
        name: "باقة الأعمال",
        price: "1333",
        priceCurrency: "SAR"
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "700",
      bestRating: "5",
      worstRating: "1"
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Organization",
          name: "ريبال"
        },
        reviewBody: "زيادة ساعدنا نوصل للعميل في اللحظة الصح بعرض بسيط وفعّال جداً. الأثر على المبيعات والتحويلات كان واضحاً ومقاساً. كمان زيادة خلّتنا نرفع متوسط قيمة الطلب عبر استراتيجية مدروسة لكل عرض ومنتج.",
        datePublished: "2024-11-01"
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Organization",
          name: "التميمي"
        },
        reviewBody: "زيادة ساعدنا نرفع قيمة الطلب دون التأثير على تجربة العميل. العروض تظهر في الوقت الصح وتشجع العميل على إضافة قطع أكثر بدون تردد.",
        datePublished: "2024-10-15"
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Organization",
          name: "Skinly"
        },
        reviewBody: "زيادة ساعدتنا نشتغل مع العملاء في اللحظة الصح دون ما نقاطع تجربة التسوق. العروض الذكية شجّعت العملاء يضيفون منتجات أكثر ويكملون طلباتهم أسرع.",
        datePublished: "2024-12-01"
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Organization",
          name: "بست كلين"
        },
        reviewBody: "زيادة غيّر طريقة تعاملنا مع العملاء. صار العميل يكتشف منتجاتنا الثانية بشكل تلقائي والسلة تكبر بدون ما نزيد إعلانات. سهل الإعداد والنتائج جاءت سريعة.",
        datePublished: "2024-09-20"
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Organization",
          name: "عبق الغيم"
        },
        reviewBody: "الفكرة كانت ذكية — تقدم للعميل خصماً بالضبط لما يحاول يحذف المنتج من السلة. هذا التوقيت غيّر كل شيء. 1,122 تحويل و248 ألف ريال ما كانت لتحصل بدون زيادة.",
        datePublished: "2024-11-10"
      }
    ]
  };
  return <JsonLd data={data} />;
}

export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "زيادة",
    alternateName: "Ziadah",
    url: "https://www.ziadah.app",
    description:
      "Ziadah — AI product recommendations and ecommerce growth for Zid & Salla merchants in Saudi Arabia and the GCC. | زيادة: اقتراح منتجات ذكي ونمو مبيعات لمتاجر زد وسلة.",
    inLanguage: ["ar", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.ziadah.app/blog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
  return <JsonLd data={data} />;
}

export function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "كيف تعمل زيادة — 3 خطوات لرفع مبيعات متجرك",
    description: "زيادة تعمل بثلاث خطوات بسيطة: فعّل التطبيق، دع الذكاء الاصطناعي يتعلم، واستقبل النتائج تلقائياً",
    inLanguage: ["ar", "en"],
    totalTime: "PT30S",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "فعّل التطبيق",
        text: "بضغطة زر واحدة في منصة زد أو سلة. يتفعل مباشرة، ما يحتاج خبرة تقنية.",
        url: "https://www.ziadah.app/#hiw"
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "الذكاء الاصطناعي يتعلم",
        text: "يحلل كل عميل — منطقته، جهازه، مشترياته، وأنماط تصفحه، ويبدأ مباشرة بدون أي تدخل منك.",
        url: "https://www.ziadah.app/#hiw"
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "المبيعات ترتفع تلقائياً",
        text: "كل عميل يحصل على العرض الأنسب له في اللحظة الصح — بتكلفة تسويق صفر ريال.",
        url: "https://www.ziadah.app/#hiw"
      }
    ]
  };
  return <JsonLd data={data} />;
}

export function FAQSchema({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a
      }
    }))
  };
  return <JsonLd data={data} />;
}

export function ArticleSchema({
  title,
  description,
  publishDate,
  slug,
  authorName = "Ziadah Team",
  articleSection,
  schemaKeywords,
  dateModified,
  pageUrl,
}: {
  title: string;
  description: string;
  publishDate: string;
  slug: string;
  authorName?: string;
  /** Blog category label(s) for Article structured data */
  articleSection?: string;
  /** Extra comma-separated or short phrases for schema `keywords` */
  schemaKeywords?: string;
  dateModified?: string;
  /** Full canonical URL for this language version */
  pageUrl?: string;
}) {
  const resolvedUrl = pageUrl ?? `https://www.ziadah.app/blog/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishDate,
    dateModified: dateModified ?? publishDate,
    inLanguage: ["ar", "en"],
    ...(articleSection ? { articleSection } : {}),
    ...(schemaKeywords ? { keywords: schemaKeywords } : {}),
    url: resolvedUrl,
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://www.ziadah.app"
    },
    publisher: {
      "@type": "Organization",
      name: "Ziadah",
      logo: {
        "@type": "ImageObject",
        url: "https://www.ziadah.app/logo-en.svg",
        width: 512,
        height: 512,
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": resolvedUrl
    },
    image: {
      "@type": "ImageObject",
      url: "https://www.ziadah.app/opengraph.jpg",
      width: 1200,
      height: 630,
    },
  };
  return <JsonLd data={data} />;
}

export function SupportArticleSchema({
  headline,
  description,
  url,
  articleSection,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  /** Path without /en prefix, e.g. `/support/article/:id` */
  url: string;
  articleSection?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const { lang } = useLanguage();
  const resolvedUrl = absolutePageUrl(url, lang);
  const data = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    url: resolvedUrl,
    inLanguage: lang,
    ...(articleSection ? { articleSection } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : datePublished ? { dateModified: datePublished } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": resolvedUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Ziadah",
      logo: {
        "@type": "ImageObject",
        url: "https://www.ziadah.app/logo-en.svg",
        width: 512,
        height: 512,
      },
    },
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const { lang } = useLanguage();
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolutePageUrl(item.url, lang),
    })),
  };
  return <JsonLd data={data} />;
}

export function ItemListSchema({ posts, name, description }: {
  posts: Array<{ slug: string; title: string; summary: string; publishDateIso: string }>;
  /** Localized list name; falls back to the Arabic default when omitted. */
  name?: string;
  /** Localized list description; falls back to the Arabic default when omitted. */
  description?: string;
}) {
  const { lang } = useLanguage();
  const listUrl = absolutePageUrl("/blog", lang);
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name ?? "مدوّنة زيادة — مقالات ونصائح التجارة الإلكترونية",
    description: description ?? "مقالات ومحتوى تعليمي لأصحاب المتاجر الإلكترونية في منصتي زد وسلة",
    url: listUrl,
    inLanguage: lang,
    itemListElement: posts.map((post, index) => {
      const postUrl = absolutePageUrl(`/blog/${post.slug}`, lang);
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          "@id": postUrl,
          url: postUrl,
          name: post.title,
          description: post.summary,
          datePublished: post.publishDateIso
        }
      };
    })
  };
  return <JsonLd data={data} />;
}

export function PricingPageSchema() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const base = "https://www.ziadah.app";
  const url = isAr ? `${base}/pricing` : `${base}/en/pricing`;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      name: isAr ? "أسعار زيادة — اختر الباقة المناسبة لمتجرك" : "Ziadah Pricing — Choose the right plan for your store",
      description: isAr
        ? "تعرّف على باقات زيادة الأربع: الانطلاقة والنمو والاحترافية والأعمال — اقتراحات ومبيعات لامحدودة في كل الباقات."
        : "Explore Ziadah's four plans: Starter, Growth, Professional, and Business — unlimited suggestions and sales in every plan.",
      url,
      inLanguage: isAr ? "ar" : "en",
      isPartOf: { "@type": "WebSite", name: "زيادة", url: base },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isAr ? "الرئيسية" : "Home", item: isAr ? base : `${base}/en` },
          { "@type": "ListItem", position: 2, name: isAr ? "الأسعار" : "Pricing", item: url },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: isAr ? "باقات زيادة" : "Ziadah Plans",
      description: isAr
        ? "أربع باقات لمتاجر زد وسلة: الانطلاقة والنمو والاحترافية والأعمال"
        : "Four plans for Zid & Salla stores: Starter, Growth, Professional, and Business",
      url,
      numberOfItems: 4,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Product",
            name: isAr ? "باقة الانطلاقة" : "Starter Plan",
            description: isAr ? "للمبتدئين والراغبين بالتجربة — اقتراحات ومبيعات لامحدودة" : "For beginners — unlimited suggestions and sales",
            brand: { "@type": "Brand", name: "Ziadah" },
            offers: {
              "@type": "Offer",
              price: "24",
              priceCurrency: "SAR",
              priceSpecification: [
                { "@type": "UnitPriceSpecification", price: "24", priceCurrency: "SAR", unitText: "MONTH", name: isAr ? "سنوي" : "Annual billing" },
                { "@type": "UnitPriceSpecification", price: "29", priceCurrency: "SAR", unitText: "MONTH", name: isAr ? "شهري" : "Monthly billing" },
              ],
              availability: "https://schema.org/InStock",
              url,
            },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Product",
            name: isAr ? "باقة النمو" : "Growth Plan",
            description: isAr ? "للتجار الأفراد — مع عروض الكوبونات والسلة" : "For individual merchants — includes coupon and cart offers",
            brand: { "@type": "Brand", name: "Ziadah" },
            offers: {
              "@type": "Offer",
              price: "249",
              priceCurrency: "SAR",
              priceSpecification: [
                { "@type": "UnitPriceSpecification", price: "249", priceCurrency: "SAR", unitText: "MONTH", name: isAr ? "سنوي" : "Annual billing" },
                { "@type": "UnitPriceSpecification", price: "290", priceCurrency: "SAR", unitText: "MONTH", name: isAr ? "شهري" : "Monthly billing" },
              ],
              availability: "https://schema.org/InStock",
              url,
            },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Product",
            name: isAr ? "باقة الاحترافية" : "Professional Plan",
            description: isAr ? "للشركات والمؤسسات — تشمل صفحة ما بعد الدفع وشحن مجاني" : "For companies — includes post-checkout and free-shipping bar",
            brand: { "@type": "Brand", name: "Ziadah" },
            offers: {
              "@type": "Offer",
              price: "666",
              priceCurrency: "SAR",
              priceSpecification: [
                { "@type": "UnitPriceSpecification", price: "666", priceCurrency: "SAR", unitText: "MONTH", name: isAr ? "سنوي" : "Annual billing" },
                { "@type": "UnitPriceSpecification", price: "790", priceCurrency: "SAR", unitText: "MONTH", name: isAr ? "شهري" : "Monthly billing" },
              ],
              availability: "https://schema.org/InStock",
              url,
            },
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Product",
            name: isAr ? "باقة الأعمال" : "Business Plan",
            description: isAr ? "للمتاجر الكبيرة — الصفحة الرئيسية والتصنيفات وصفحة الدفع" : "For large stores — homepage, category pages, and checkout page",
            brand: { "@type": "Brand", name: "Ziadah" },
            offers: {
              "@type": "Offer",
              price: "1333",
              priceCurrency: "SAR",
              priceSpecification: [
                { "@type": "UnitPriceSpecification", price: "1333", priceCurrency: "SAR", unitText: "MONTH", name: isAr ? "سنوي" : "Annual billing" },
                { "@type": "UnitPriceSpecification", price: "1590", priceCurrency: "SAR", unitText: "MONTH", name: isAr ? "شهري" : "Monthly billing" },
              ],
              availability: "https://schema.org/InStock",
              url,
            },
          },
        },
      ],
    },
  ];
  return <JsonLd data={data as unknown as Record<string, unknown>[]} />;
}

export function AffiliatePageSchema() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const base = "https://www.ziadah.app";
  const url = isAr ? `${base}/affiliate` : `${base}/en/affiliate`;
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: isAr ? "برنامج الشراكة والأفيليت | زيادة" : "Affiliate & Partner Program | Ziadah",
    description: isAr
      ? "اشترك في برنامج أفيليت زيادة — عمولة 10% على كل اشتراك سنوي، وخصم 10% لعملائك."
      : "Join Ziadah's affiliate program — earn 10% commission on every annual subscription and give your clients a 10% discount.",
    url,
    inLanguage: isAr ? "ar" : "en",
    isPartOf: { "@type": "WebSite", name: "زيادة", url: base },
    about: {
      "@type": "Thing",
      name: isAr ? "برنامج الإحالة والشراكة" : "Referral & Partner Program",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isAr ? "الرئيسية" : "Home", item: isAr ? base : `${base}/en` },
        { "@type": "ListItem", position: 2, name: isAr ? "برنامج الشراكة" : "Affiliate Program", item: url },
      ],
    },
  };
  return <JsonLd data={data} />;
}

export function WebPageSchema({
  name,
  description,
  url,
  breadcrumb
}: {
  name: string;
  description: string;
  url: string;
  breadcrumb?: string;
}) {
  const { lang } = useLanguage();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absolutePageUrl(url, lang),
    inLanguage: lang,
    isPartOf: {
      "@type": "WebSite",
      name: "زيادة",
      url: "https://www.ziadah.app"
    },
    ...(breadcrumb ? { breadcrumb } : {})
  };
  return <JsonLd data={data} />;
}
