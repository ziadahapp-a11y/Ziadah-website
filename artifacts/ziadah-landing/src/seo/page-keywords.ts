import keywordDoc from "../../seo/keywords.json";

type PageKw = { keywordsAr: string; keywordsEn: string };

const pages = keywordDoc.pages as Record<string, PageKw>;

export function getPageKeywords(path: string): PageKw | undefined {
  const key = path.split("?")[0] || "/";
  if (pages[key]) return pages[key];
  if (key.startsWith("/use-cases")) return pages["/use-cases"];
  if (key.startsWith("/sectors")) return pages["/sectors"];
  return undefined;
}
