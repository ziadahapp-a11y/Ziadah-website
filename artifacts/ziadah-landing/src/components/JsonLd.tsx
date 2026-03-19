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
    name: "Ziadah",
    alternateName: "زيادة",
    url: "https://www.ziadah.app",
    logo: "https://www.ziadah.app/logo.png",
    description: "AI platform for optimizing sales of Zid and Salla stores through personalized recommendations and smart offers",
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
    name: "Ziadah",
    alternateName: "زيادة",
    url: "https://www.ziadah.app",
    description: "AI application for Zid and Salla stores that increases average order value and conversion rate through personalized recommendations",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    offers: [
      {
        "@type": "Offer",
        name: "Starter Plan",
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
        name: "Growth Plan",
        price: "249",
        priceCurrency: "SAR"
      },
      {
        "@type": "Offer",
        name: "Professional Plan",
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
  authorName = "Ziadah Team"
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
      name: "Ziadah",
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
