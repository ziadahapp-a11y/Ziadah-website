interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "زيادة",
    alternateName: "Ziadah",
    url: "https://www.ziadah.app",
    logo: "https://www.ziadah.app/logo.png",
    description: "منصة الذكاء الاصطناعي لتحسين مبيعات متاجر زد وسلة عبر توصيات مخصصة وعروض ذكية",
    sameAs: [
      "https://twitter.com/ziadah_app",
      "https://www.instagram.com/ziadah.app",
      "https://www.linkedin.com/company/ziadah"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+966510131856",
      contactType: "customer service",
      availableLanguage: "Arabic"
    },
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia"
    }
  };
  return <JsonLd data={data} />;
}

export function SoftwareAppSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "زيادة",
    alternateName: "Ziadah",
    url: "https://www.ziadah.app",
    description: "تطبيق ذكاء اصطناعي لمتاجر زد وسلة يرفع متوسط قيمة الطلب ومعدل التحويل عبر توصيات مخصصة",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
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
          unitText: "شهرياً"
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
        price: "665",
        priceCurrency: "SAR"
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "700"
    }
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
  authorName = "فريق زيادة"
}: {
  title: string;
  description: string;
  publishDate: string;
  slug: string;
  authorName?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishDate,
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://www.ziadah.app"
    },
    publisher: {
      "@type": "Organization",
      name: "زيادة",
      logo: {
        "@type": "ImageObject",
        url: "https://www.ziadah.app/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.ziadah.app/blog/${slug}`
    },
    image: "https://www.ziadah.app/opengraph.jpg"
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://www.ziadah.app${item.url}`
    }))
  };
  return <JsonLd data={data} />;
}
