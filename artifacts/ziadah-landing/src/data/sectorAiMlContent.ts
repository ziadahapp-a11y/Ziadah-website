/** نقاط تلخّص أهمية محرك زيادة (AI / ML / تخصيص) — متسقة مع المدونة ومركز المساعدة */

export type SectorAiMlBullet = {
  emoji: string;
  titleAr: string;
  titleEn: string;
  textAr: string;
  textEn: string;
};

export const sectorAiMlBullets: SectorAiMlBullet[] = [
  {
    emoji: "🧠",
    titleAr: "ليس قواعداً ثابتة — بل تعلم مستمر",
    titleEn: "Not fixed rules — continuous learning",
    textAr:
      "المحرك ليس مجموعة شروط برمجية جامدة؛ يتكيّف مع بيانات متجرك الفريدة ويتحسّن مع الوقت، كما يُشرح في «كيف يتعلم الذكاء الاصطناعي على عملائك؟» في مركز المساعدة.",
    textEn:
      "The engine isn’t a rigid rule set — it adapts to your store’s unique data and improves over time, as explained in the support article “How Does AI Learn About Your Customers?”",
  },
  {
    emoji: "🔗",
    titleAr: "أنماط الشراء والتصفية التعاونية",
    titleEn: "Purchase patterns & collaborative signals",
    textAr:
      "يكتشف النظام أنماطاً مثل «من اشترى منتجاً معيناً غالباً اشترى مكملاً له» (التصفية التعاونية) وتزداد دقة الأنماط مع حجم الطلبات — نفس المبدأ المذكور في المدونة ومركز المساعدة.",
    textEn:
      "The system discovers patterns like “customers who bought A often bought B” (collaborative filtering); pattern accuracy grows with order volume — the same principle covered in our blog and help center.",
  },
  {
    emoji: "📡",
    titleAr: "تعدد الإشارات في اللحظة المناسبة",
    titleEn: "Many signals, right moment",
    textAr:
      "لا يُكتفى بتاريخ الشراء فقط: يُحلّل سلوك الجلسة، الجهاز، المنطقة، والمزيد لتوصية دقيقة لكل عميل — كما في مقال «البيانات التي يحللها النظام» في المساعدة.",
    textEn:
      "Beyond purchase history alone: session behavior, device, region, and more — for accurate, timely recommendations per shopper, as in the support article “Data the System Analyzes.”",
  },
  {
    emoji: "✨",
    titleAr: "كل عميل عالم مستقل",
    titleEn: "Each customer is their own context",
    textAr:
      "التوصية الذكية ليست «ما يشتريه الجميع» بل ما يناسب هذا الشخص في هذه اللحظة — فكرة أساسية في مقال محرك التوصيات الذكية في المدونة وفي مقالات التخصيص.",
    textEn:
      "Smart recommendations aren’t “what everyone buys” but what fits this person at this moment — a core idea in our blog posts on the recommendation engine and ecommerce personalization.",
  },
];

export type SectorAiLink = { href: string; labelAr: string; labelEn: string };

export const sectorAiMlBlogLinks: SectorAiLink[] = [
  {
    href: "/blog/ziadah-ai-smart-recommendations",
    labelAr: "محرك التوصيات الذكية في زيادة",
    labelEn: "Ziadah’s smart recommendations engine",
  },
  {
    href: "/blog/ai-recommendations-guide",
    labelAr: "كيف يعمل الذكاء الاصطناعي في توصيات المنتجات؟",
    labelEn: "How AI works in product recommendations",
  },
];

export const sectorAiMlSupportLinks: SectorAiLink[] = [
  {
    href: "/support/article/ai-learn",
    labelAr: "كيف يتعلم الذكاء الاصطناعي على عملائك؟",
    labelEn: "How does AI learn about your customers?",
  },
  {
    href: "/support/article/ai-data",
    labelAr: "البيانات التي يحللها النظام",
    labelEn: "Data the system analyzes",
  },
];
