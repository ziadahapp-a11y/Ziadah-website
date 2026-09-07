import { useMemo } from "react";
import type { FullArticle } from "@/data/support-data";
import { useLanguage } from "@/i18n/LanguageContext";

/**
 * Language-resolved support article fields. Arabic is the authored language,
 * so every English field falls back to its Arabic counterpart.
 */
export function useSupportArticleFields(article: FullArticle) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return useMemo(() => {
    const pick = (ar: string, en?: string) => (isAr ? ar : en ?? ar);
    return {
      title: pick(article.title, article.titleEn),
      desc: pick(article.desc, article.descEn),
      time: pick(article.time, article.timeEn),
      sections: isAr ? article.sections : article.sectionsEn ?? article.sections,
    };
  }, [article, isAr]);
}
