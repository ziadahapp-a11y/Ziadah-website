import { useMemo } from "react";
import type { BlogPost } from "@/data/blogPosts";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteContentMap } from "./siteContent";
import { toWesternDigits } from "@/utils/westernDigits";

/** CMS-backed blog post fields with static fallbacks. */
export function useBlogPostFields(post: BlogPost) {
  const { lang } = useLanguage();
  const map = useSiteContentMap();
  const isAr = lang === "ar";

  return useMemo(() => {
    const arNums = (s: string) => (isAr ? toWesternDigits(s) : s);
    const titleRaw = isAr
      ? map[`blog.${post.slug}.title`] ?? post.title
      : map[`blog.${post.slug}.titleEn`] ?? post.titleEn ?? post.title;
    const summaryRaw = isAr
      ? map[`blog.${post.slug}.summary`] ?? post.summary
      : map[`blog.${post.slug}.summaryEn`] ?? post.summaryEn ?? post.summary;
    const readTimeRaw = isAr
      ? map[`blog.${post.slug}.readTime`] ?? post.readTime
      : map[`blog.${post.slug}.readTimeEn`] ?? post.readTimeEn ?? post.readTime;
    const publishDateRaw = isAr
      ? map[`blog.${post.slug}.publishDate`] ?? post.publishDate
      : map[`blog.${post.slug}.publishDateEn`] ?? post.publishDateEn ?? post.publishDate;
    const contentRaw = isAr
      ? map[`blog.${post.slug}.content`] ?? post.content
      : map[`blog.${post.slug}.contentEn`] ?? post.contentEn ?? post.content;

    return {
      title: arNums(titleRaw),
      summary: arNums(summaryRaw),
      readTime: arNums(readTimeRaw),
      publishDate: arNums(publishDateRaw),
      content: arNums(contentRaw),
      /** Raw (non-arNums) for SEO props if needed */
      titlePlain: titleRaw,
      summaryPlain: summaryRaw,
    };
  }, [map, post, isAr]);
}
