import { useMemo } from "react";
import type { FullArticle } from "@/data/support-data";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteContentMap } from "./siteContent";

function serializeSections(sections: FullArticle["sections"]): string {
  return JSON.stringify(sections);
}

function parseSections(raw: string, fallback: FullArticle["sections"]): FullArticle["sections"] {
  try {
    const v = JSON.parse(raw) as unknown;
    if (Array.isArray(v)) return v as FullArticle["sections"];
  } catch {
    /* ignore */
  }
  return fallback;
}

/** CMS-backed support article fields. Sections stored as JSON in one richtext block per language. */
export function useSupportArticleFields(article: FullArticle) {
  const { lang } = useLanguage();
  const map = useSiteContentMap();
  const isAr = lang === "ar";

  return useMemo(() => {
    const base = `support.${article.id}`;
    const title = isAr
      ? map[`${base}.title`] ?? article.title
      : map[`${base}.titleEn`] ?? article.titleEn ?? article.title;
    const desc = isAr
      ? map[`${base}.desc`] ?? article.desc
      : map[`${base}.descEn`] ?? article.descEn ?? article.desc;
    const time = isAr
      ? map[`${base}.time`] ?? article.time
      : map[`${base}.timeEn`] ?? article.timeEn ?? article.time;

    const secKeyAr = `${base}.sectionsJson`;
    const secKeyEn = `${base}.sectionsEnJson`;
    const sections = isAr
      ? parseSections(
          map[secKeyAr] ?? serializeSections(article.sections),
          article.sections,
        )
      : parseSections(
          map[secKeyEn] ??
            (article.sectionsEn
              ? serializeSections(article.sectionsEn)
              : serializeSections(article.sections)),
          article.sectionsEn ?? article.sections,
        );

    return { title, desc, time, sections };
  }, [map, article, isAr]);
}
