import { ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import BilingualSEO from "./BilingualSEO";

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
  const { dir } = useLanguage();

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
      <div
        className={className}
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          fontFamily: "var(--font)",
          direction: dir,
          color: "var(--t)",
          transition: "var(--theme-transition)",
          ...style,
        }}
      >
        {children}
      </div>
    </>
  );
}
