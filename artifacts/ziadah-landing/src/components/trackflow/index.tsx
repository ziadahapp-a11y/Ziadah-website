/**
 * TrackFlow design-system primitives.
 *
 * Shared building blocks that capture the look established on the home page
 * (`src/pages/HomeTrackflow.tsx`): a light SaaS theme with emerald accents, a
 * `py-24` section rhythm alternating white / muted (`zinc-50`) bands, dark
 * "mockup-card" panels, rounded-2xl bordered cards, and a green uppercase
 * eyebrow + bold heading + muted subtitle section header.
 *
 * Build every re-themed page on top of these so the design system stays
 * consistent by construction. Custom utilities used here (`mockup-card`,
 * `shadow-card`, `shadow-card-lg`, `bg-grid-dark`, `num-ltr`) live in index.css.
 */
import { type ReactNode, type ElementType, type CSSProperties } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";

export type Bi<T> = { ar: T; en: T };

/** Bilingual picker + direction helpers, mirroring HomeTrackflow's local `t()`. */
export function useT() {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  function t<T>(v: Bi<T>): T {
    return v[lang];
  }
  return { t, lang, isAr, dir, ArrowCTA: isAr ? ArrowLeft : ArrowRight };
}

type Band = "white" | "muted" | "dark";

const BAND_CLASS: Record<Band, string> = {
  white: "",
  muted: "bg-zinc-50/60 border-y border-zinc-200",
  dark: "bg-black",
};

/**
 * Page section with the standard `py-24 px-4` rhythm. Alternate `band`
 * between "white" and "muted" down the page; use "dark" for the occasional
 * high-contrast band.
 */
export function Section({
  children,
  band = "white",
  id,
  className = "",
  containerClassName = "max-w-6xl",
}: {
  children: ReactNode;
  band?: Band;
  id?: string;
  className?: string;
  /** Tailwind max-w-* (plus any extra) for the inner container. */
  containerClassName?: string;
}) {
  return (
    <section id={id} className={`py-24 px-4 ${BAND_CLASS[band]} ${id ? "scroll-mt-20" : ""} ${className}`}>
      <div className={`container mx-auto ${containerClassName}`}>{children}</div>
    </section>
  );
}

/** Green uppercase eyebrow label used above section headings. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block text-xs font-bold tracking-widest text-purple-600 uppercase ${className}`}>
      {children}
    </span>
  );
}

/** Rounded pill badge (the green "platform" chip from the hero). */
export function Pill({
  children,
  icon: Icon,
  className = "",
}: {
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-xs font-semibold text-purple-700 ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 text-purple-600" />}
      {children}
    </span>
  );
}

/** Centered section header: eyebrow + heading + optional subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "start";
  className?: string;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-start";
  return (
    <div className={`${align === "center" ? "text-center" : ""} mb-14 ${className}`}>
      {eyebrow && <div className="mb-4">{typeof eyebrow === "string" ? <Eyebrow>{eyebrow}</Eyebrow> : eyebrow}</div>}
      <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 mb-4 leading-tight">{title}</h2>
      {subtitle && <p className={`text-lg text-zinc-600 max-w-2xl ${alignCls === "text-center mx-auto" ? "mx-auto" : ""}`}>{subtitle}</p>}
    </div>
  );
}

/** Standard bordered white card with hover lift. */
export function Card({
  children,
  className = "",
  as = "div",
  animate = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  animate?: boolean;
  style?: CSSProperties;
}) {
  const cls = `rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all ${className}`;
  if (!animate) {
    const Tag = as;
    return (
      <Tag className={cls} style={style}>
        {children}
      </Tag>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cls}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** Numbered/icon feature card — the 4-pillar pattern from the home page. */
export function FeatureCard({
  num,
  icon: Icon,
  title,
  desc,
  example,
  className = "",
}: {
  num?: string;
  icon?: LucideIcon;
  title: ReactNode;
  desc: ReactNode;
  example?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <div className="flex items-center gap-3 mb-4">
        {num && <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase num-ltr">{num}</span>}
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-zinc-950 mb-3 leading-snug">{title}</h3>
      <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-4">{desc}</p>
      {example && (
        <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3.5">
          <p className="text-xs md:text-sm text-zinc-700 leading-relaxed">{example}</p>
        </div>
      )}
    </Card>
  );
}

/** Stat callout — big number + label. */
export function StatCard({ value, label, className = "" }: { value: ReactNode; label: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-card ${className}`}>
      <div className="text-3xl md:text-4xl font-extrabold text-zinc-950 num-ltr">{value}</div>
      <div className="mt-1.5 text-sm text-zinc-600">{label}</div>
    </div>
  );
}

/** Primary CTA button (near-black). `href` opens external in a new tab; `to` is an internal wouter link; otherwise pass `onClick`. */
export function PrimaryButton({
  children,
  href,
  to,
  onClick,
  size = "lg",
  className = "",
  ...rest
}: {
  children: ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  size?: "default" | "sm" | "lg";
  className?: string;
  [key: string]: unknown;
}) {
  const cls = `bg-zinc-950 hover:bg-zinc-800 text-white font-semibold transition-colors ${className}`;
  if (href) {
    return (
      <Button asChild size={size} className={cls} {...rest}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }
  if (to) {
    return (
      <Button asChild size={size} className={cls} {...rest}>
        <Link href={to}>{children}</Link>
      </Button>
    );
  }
  return (
    <Button size={size} onClick={onClick} className={cls} {...rest}>
      {children}
    </Button>
  );
}

/** Outline CTA button. */
export function SecondaryButton({
  children,
  onClick,
  href,
  to,
  size = "lg",
  className = "",
  ...rest
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  to?: string;
  size?: "default" | "sm" | "lg";
  className?: string;
  [key: string]: unknown;
}) {
  const cls = `border-zinc-300 text-zinc-950 hover:bg-zinc-100 font-semibold transition-colors ${className}`;
  if (href) {
    return (
      <Button asChild variant="outline" size={size} className={cls} {...rest}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }
  if (to) {
    return (
      <Button asChild variant="outline" size={size} className={cls} {...rest}>
        <Link href={to}>{children}</Link>
      </Button>
    );
  }
  return (
    <Button variant="outline" size={size} onClick={onClick} className={cls} {...rest}>
      {children}
    </Button>
  );
}

/**
 * Dark "mockup-card" closing CTA — the home page's final call-to-action.
 * Pass `trust` items as short strings; they render with green checks.
 */
export function CtaSection({
  title,
  subtitle,
  children,
  trust,
  band = "white",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  /** CTA buttons. */
  children: ReactNode;
  trust?: ReactNode[];
  band?: Band;
}) {
  return (
    <Section band={band} containerClassName="max-w-4xl">
      <div className="rounded-3xl mockup-card overflow-hidden shadow-card-lg relative p-10 md:p-14 text-center">
        <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">{title}</h2>
          {subtitle && <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-xl mx-auto">{subtitle}</p>}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">{children}</div>
          {trust && trust.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-zinc-500">
              {trust.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

/** Hero wrapper with the faint grid background used at the top of pages. */
export function Hero({
  children,
  className = "",
  containerClassName = "max-w-7xl",
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  const gridStyle: CSSProperties = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  };
  return (
    <section className={`relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 ${className}`}>
      <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
      <div className={`container mx-auto relative ${containerClassName}`}>{children}</div>
    </section>
  );
}
