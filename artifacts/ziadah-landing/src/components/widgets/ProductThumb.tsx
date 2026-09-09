/**
 * The product thumbnail inside a widget preview.
 *
 * WHAT THIS REPLACES. Every widget drew its product as a large emoji on a
 * violet-tinted rounded square. Emoji-as-product-photo is the single loudest
 * tell that a storefront mockup was not made by anyone who has seen a
 * storefront: no shop on Zid or Salla renders 🧴 where a bottle should be,
 * and a merchant reading these previews is being asked to believe the widget
 * will look like this in their own store.
 *
 * WHAT IT IS NOW. A real thumbnail: a square photo frame on a neutral ground
 * with a drawn product silhouette in it, at the size and radius a storefront
 * actually uses. The frame is deliberately NOT brand violet - a product photo
 * sits on the store's own neutral, and tinting every thumbnail violet was the
 * second tell.
 *
 * WHY 14 SHAPES AND NOT 127. The demo data names 127 distinct emoji across
 * `translations.ts` and `sectorWidgetShowcaseDemos.ts`. Drawing 127 icons
 * would be drawing an emoji set again. A storefront thumbnail does not need
 * to identify the exact product - the name under it does that - it needs to
 * read as a photograph of one, so this is a category silhouette: bottle,
 * garment, shoe, bag, device, audio, watch, food, home, care, paper, box, toy,
 * and a plain fallback. The emoji in the data is the LOOKUP KEY, which is why
 * none of the 398 data references had to change.
 */

type Shape =
  | "bottle" | "garment" | "shoe" | "bag" | "device" | "audio" | "watch"
  | "food" | "home" | "care" | "paper" | "box" | "toy" | "generic";

/* Emoji → category. Anything unlisted falls to `generic`, which is a plain
   product block - the same thing a store shows before an image loads. */
const SHAPE_OF: Record<string, Shape> = {};
const put = (shape: Shape, emoji: string) => {
  for (const ch of emoji.split(" ")) SHAPE_OF[ch] = shape;
};
put("bottle", "🧴 💄 🧪 🧼 🧽 🧂 🫖 ☕ 🥤 🥛 🧃 🧊 💧 🕯️");
put("garment", "👕 🧕 🧢 🧣 🧤 🧦 🎽 🪮");
put("shoe", "👟 🥿");
put("bag", "👜 👝 🗂️");
put("device", "📱 💻 ⌨️ 🖱️ 💾 📷 📹 🎥 🔋 🔌 🖥️");
put("audio", "🎧 🔊 🎵 🔔");
put("watch", "⌚ 💍 💎 📿 💠 🎀 🏅 🥇 🕰️ ⭐ ✨");
put("food", "🍔 🍟 🍞 🍰 🍮 🥗 🥘 🥙 🥣 🥫 🍚 🌯 🫓 🧆 🥜 🧄 🌾 🐑 🍵 🥇");
put("home", "🛋️ 🛏️ 🧹 🧺 🧻 🪣 🪞 🖼️ 🧵 🪡");
put("care", "💊 💉 🩹 🩺 🦷 💆 🧩");
put("paper", "📄 📋 📝 📓 📚 📜 📎 📏 📐 🖋️ 🖌️ 🎨 📊 📅 🪪 📧 📮");
put("box", "📦 🚚 🛒 🚜 ✈️ 🌍 💳 🛡️ 🔒 🔗 ⚖️ 🧲");
put("toy", "🧸 🎮");

/* The silhouettes. One flat path each, drawn on a 24x24 grid in
   `currentColor` so the frame decides the ink. No gradients, no detail that
   disappears at 36px - these are read at thumbnail size or not at all. */
const PATHS: Record<Shape, string> = {
  bottle: "M10 2h4v2.2l1.2 1.6c.5.7.8 1.5.8 2.4V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8.2c0-.9.3-1.7.8-2.4L10 4.2V2Zm0 8v10h4V10h-4Z",
  garment: "M8.5 2 12 4.5 15.5 2 21 5.2l-2.2 4-2.3-1.3V22H7.5V7.9L5.2 9.2 3 5.2 8.5 2Z",
  shoe: "M2 15h5.5l3.2-3.5c.5-.6 1.4-.6 2 0l1.6 1.8c.6.7 1.4 1.1 2.3 1.3l3.2.7c1.3.3 2.2 1.4 2.2 2.7V20H2v-5Z",
  bag: "M7 7V6a5 5 0 0 1 10 0v1h3l1 15H3L4 7h3Zm2 0h6V6a3 3 0 0 0-6 0v1Z",
  device: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 1.5v1h4v-1h-4ZM7 6v12h10V6H7Z",
  audio: "M12 3a9 9 0 0 0-9 9v6a3 3 0 0 0 3 3h2v-8H5v-1a7 7 0 0 1 14 0v1h-3v8h2a3 3 0 0 0 3-3v-6a9 9 0 0 0-9-9Z",
  watch: "M9 2h6l.5 3.2a7 7 0 0 1 0 13.6L15 22H9l-.5-3.2a7 7 0 0 1 0-13.6L9 2Zm3 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z",
  food: "M12 3c4.4 0 8 2.7 8 6H4c0-3.3 3.6-6 8-6ZM3 11h18v2H3v-2Zm1 4h16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z",
  home: "M12 2.5 22 10h-3v11h-5v-6h-4v6H5V10H2l10-7.5Z",
  care: "M9.5 2h5v3h3v5h-3v3h-5v-3h-3V5h3V2Zm-2 14h9a3 3 0 0 1 3 3v3h-15v-3a3 3 0 0 1 3-3Z",
  paper: "M6 2h8l4 4v16H6V2Zm8 1.5V7h3.5L14 3.5ZM8.5 11h7v1.6h-7V11Zm0 3.4h7V16h-7v-1.6Zm0 3.4h4.5v1.6H8.5v-1.6Z",
  box: "M12 2 21 6v12l-9 4-9-4V6l9-4Zm0 2.2L5.6 7 12 9.8 18.4 7 12 4.2ZM5 8.7v8l6 2.7v-8L5 8.7Zm14 0-6 2.7v8l6-2.7v-8Z",
  toy: "M12 2a4 4 0 0 1 3.4 6.1A6 6 0 0 1 18 13v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-6a6 6 0 0 1 2.6-4.9A4 4 0 0 1 12 2Zm-2 12a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm4 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
  generic: "M4 4h16v16H4V4Zm2 2v9.2l3.6-3.6 3 3 3.4-3.4L18 13.6V6H6Zm3.2 1.4a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Z",
};

export function ProductThumb({
  emoji,
  size = 36,
  radius = 8,
  className,
}: {
  /** The demo datum's emoji, used only as the category lookup key. */
  emoji?: string;
  size?: number;
  radius?: number;
  className?: string;
}) {
  const shape = (emoji && SHAPE_OF[emoji.trim()]) || "generic";
  return (
    <span
      className={`pthumb${className ? ` ${className}` : ""}`}
      style={{ width: size, height: size, borderRadius: radius }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" width={Math.round(size * 0.56)} height={Math.round(size * 0.56)} fill="currentColor">
        <path d={PATHS[shape]} />
      </svg>
    </span>
  );
}
