import { useMemo } from "react";
import type { BlogPost } from "@/data/blogPosts";
import { useLanguage } from "@/i18n/LanguageContext";
import { toWesternDigits } from "@/utils/westernDigits";

/**
 * Language-resolved blog post fields.
 *
 * Arabic is the authored language, so an English post falls back to the Arabic
 * field whenever no translation exists. Arabic strings are also normalised to
 * Western digits, which is what the rest of the site renders.
 */
export function useBlogPostFields(post: BlogPost) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return useMemo(() => {
    const arNums = (s: string) => (isAr ? toWesternDigits(s) : s);
    const pick = (ar: string, en?: string) => (isAr ? ar : en ?? ar);

    const titleRaw = pick(post.title, post.titleEn);
    const summaryRaw = pick(post.summary, post.summaryEn);

    return {
      title: arNums(titleRaw),
      summary: arNums(summaryRaw),
      readTime: arNums(pick(post.readTime, post.readTimeEn)),
      publishDate: arNums(pick(post.publishDate, post.publishDateEn)),
      content: arNums(pick(post.content, post.contentEn)),
      /** Raw (non-arNums) for SEO props if needed */
      titlePlain: titleRaw,
      summaryPlain: summaryRaw,
    };
  }, [post, isAr]);
}
