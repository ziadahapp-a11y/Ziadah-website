import {
  Zap, Settings, Bot, CreditCard, Wrench, Monitor, TrendingUp, BookOpen,
  type LucideIcon,
} from "lucide-react";

/**
 * The help centre's category icons.
 *
 * The support data names each category with an emoji. `SupportArticle` already
 * mapped those to lucide because the design system uses lucide and never
 * emoji; `/support` itself still rendered the raw emoji, so the same category
 * appeared as ⚡ on the index and as a drawn bolt on the article. One map, both
 * places.
 */
const CATEGORY_ICON: Record<string, LucideIcon> = {
  "⚡": Zap,
  "⚙️": Settings,
  "🤖": Bot,
  "💳": CreditCard,
  "🔧": Wrench,
  "🖥️": Monitor,
  "📈": TrendingUp,
};

export function supportCategoryIcon(emoji: string): LucideIcon {
  return CATEGORY_ICON[emoji] ?? BookOpen;
}
