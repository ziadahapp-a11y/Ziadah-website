import { ReactNode } from "react";
import BilingualSEO from "./BilingualSEO";
import PageShell from "./PageShell";

interface StandardPageProps {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  canonical?: string;
  keywordsAr?: string;
  keywordsEn?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishDate?: string;
  author?: string;
  noIndex?: boolean;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function StandardPage({
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  canonical,
  keywordsAr,
  keywordsEn,
  ogImage,
  type,
  publishDate,
  author,
  noIndex,
  children,
  className,
  style,
}: StandardPageProps) {
  return (
    <>
      <BilingualSEO
        titleAr={titleAr}
        titleEn={titleEn}
        descriptionAr={descriptionAr}
        descriptionEn={descriptionEn}
        canonical={canonical ?? "/"}
        keywordsAr={keywordsAr}
        keywordsEn={keywordsEn}
        ogImage={ogImage}
        type={type}
        publishDate={publishDate}
        author={author}
        noIndex={noIndex}
      />
      <PageShell className={className} style={style}>
        {children}
      </PageShell>
    </>
  );
}
