import { useState } from "react";
import { PageHeroPhone } from "@/components/UseCasePagesShowcase";
import type { WidgetTab } from "@/components/WidgetTabs";

export type { WidgetTab } from "@/components/WidgetTabs";

export interface UseCaseLiveShowcaseProps {
  isAr: boolean;
  /** Omit to use the standard “Live example” badge in the active UI language. */
  badge?: string;
  title: string;
  subtitle: string;
  tabs: WidgetTab[];
  float1?: string;
  float2?: string;
}

export default function UseCaseLiveShowcase({
  isAr,
  badge,
  title,
  subtitle,
  tabs,
  float1,
  float2,
}: UseCaseLiveShowcaseProps) {
  const [active, setActive] = useState(0);
  const single = tabs.length === 1;
  const activeTab = tabs[active];
  const placement = activeTab.placement ?? "inPhone";
  const phoneSourceTab = placement === "below" ? tabs[0] : activeTab;
  const showBelow = placement === "below";

  const defaultBadge = isAr ? "مثال حي" : "Live Example";
  const f1 = float1 ?? (isAr ? "معاينة حية" : "Live preview");
  const f2 = float2 ?? (isAr ? "داخل المتجر" : "In-store");

  return (
    <section
      className="sector-html uc-live-showcase use-case-playbook-hero"
      style={{
        position: "relative",
        zIndex: 2,
        paddingTop: 80,
        paddingInline: "var(--page-inline-pad)",
        paddingBottom: "clamp(48px, 8vw, 80px)",
        width: "100%",
      }}
    >
      <div
        className="sector-html-hero-grid uc-live-showcase__grid"
        dir={isAr ? "rtl" : "ltr"}
        style={{ maxWidth: 1200, alignItems: "center" }}
      >
        <div className="sector-html-hero-copy text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            <span className="text-xs font-bold uppercase tracking-wide text-violet-700">{badge ?? defaultBadge}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 leading-tight" style={{ marginBottom: 8 }}>
            {title}
          </h3>
          <p className="text-base text-zinc-600 leading-relaxed" style={{ marginBottom: single ? 0 : 20 }}>
            {subtitle}
          </p>

          {!single && (
            <div className="flex flex-wrap gap-2 mt-2.5">
              {tabs.map((tab, i) => {
                const isAct = i === active;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                      isAct
                        ? "bg-zinc-950 text-white border border-transparent"
                        : "bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    {tab.icon && <span>{tab.icon}</span>}
                    {isAr ? tab.labelAr : tab.labelEn}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="sector-html-hero-mock">
          <PageHeroPhone float1={f1} float2={f2}>
            <div className="uc-live-showcase__phone-scroll">{phoneSourceTab.content}</div>
          </PageHeroPhone>
        </div>
      </div>

      {showBelow && (
        <div
          className="rv d2"
          style={{
            maxWidth: 960,
            margin: "clamp(28px, 4vw, 40px) auto 0",
            padding: "0 var(--page-inline-pad)",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {activeTab.content}
        </div>
      )}
    </section>
  );
}
