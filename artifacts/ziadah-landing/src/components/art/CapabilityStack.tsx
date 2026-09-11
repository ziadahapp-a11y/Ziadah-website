import { useLanguage } from "@/i18n/LanguageContext";
import { goals, presentations, placements } from "@/lib/features-data";

/**
 * The product's shape, drawn as a stack.
 *
 * The source this is adapted from splits its capabilities into shipped and
 * unshipped, because that was its page's argument. Ziadah's nineteen all ship,
 * so drawing them that way would be a list wearing a diagram's clothes.
 *
 * What is actually layered here is the three KINDS, and they compose in one
 * direction: a goal is the number you want to move, a presentation is the
 * shape the suggestion takes to move it, and a placement is where that shape
 * appears. Read top down it says what the product does; read bottom up it
 * says where a merchant will see it.
 *
 * Read from `features-data`, so it cannot drift from the registry the
 * capability pages render.
 */
export function CapabilityStack() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const label = (f: { title: string; titleEn: string }) => (isAr ? f.title : f.titleEn);

  return (
    <div className="cstack" data-art-slot="capability-stack" aria-hidden="true">
      {/* The goals lead: they are the reason any of the rest exists. */}
      <ul className="cstack-live">
        {goals.map((f) => (
          <li key={f.slug} className="cstack-card">
            <span className="cstack-ico">
              <f.Icon className="cstack-ico-svg" />
            </span>
            <span className="cstack-name">{label(f)}</span>
            <span className="cstack-state">{isAr ? "هدف" : "Goal"}</span>
          </li>
        ))}
      </ul>
      {/* The shapes and the places they appear, quieter — they serve the row
          above rather than competing with it. */}
      <ul className="cstack-soon">
        {[...presentations, ...placements].map((f) => (
          <li key={f.slug} className="cstack-chip">
            <f.Icon className="cstack-chip-ico" />
            {label(f)}
          </li>
        ))}
      </ul>
    </div>
  );
}
