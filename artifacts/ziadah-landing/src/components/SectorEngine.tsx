import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { stripLeadIcon } from "@/lib/strip-icon";
import type { SectorMetric, SectorPageRich } from "@/data/sectorPageTypes";
import ShapeAccordion, { type AccordionItem } from "@/components/widgets/ShapeAccordion";

/**
 * "How Ziadah works in your sector": ONE pinned list of three rows, one stage.
 *
 * It replaces two bands that said the same thing twice. "Sector engine -
 * profile and signals" put a customer card beside three numbered points, and
 * "Measurement and the journey" followed it with ten event pills, four number
 * tiles and four bars. The pills were the same ten words on every sector page.
 * The three points were a second why-card list.
 *
 * Now the whole story is three verbs, in the order it happens, and the card
 * beside the list is the thing the verb produces: it READS the shopper (the
 * profile), SUGGESTS the next item (the ranked picks), MEASURES the lift (the
 * numbers). Every sentence is composed from the sector's own data, so nothing
 * on the page is generic and nothing is written twice.
 */

type Key = "reads" | "suggests" | "measures";

/** "Karat 95%" / "طوق خفيف … 95%" -> name and figure. */
function splitRec(line: string): { name: string; pct: string; n: number } {
  const clean = stripLeadIcon(line).trim();
  const at = clean.lastIndexOf(" ");
  const tail = at > 0 ? clean.slice(at + 1) : "";
  if (tail && /^[\d٠-٩]+\s*[%٪]$/.test(tail)) {
    const n = Number(tail.replace(/[^\d]/g, "")) || 0;
    return { name: clean.slice(0, at).replace(/[—–-]\s*$/, "").trim(), pct: tail, n };
  }
  return { name: clean, pct: "", n: 0 };
}

/** "AOV +32%" / "متوسط الطلب +32%" -> "+32%". */
function kpiFigure(txt: string): string {
  const m = txt.match(/[+\-−]?[\d٠-٩۰-۹][\d٠-٩۰-۹.,]*\s*%/);
  return m ? m[0].replace(/\s+/g, "") : txt;
}

/** A bar that grows in when its stage mounts, rather than appearing full. */
function Fill({ pct }: { pct: number }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return <span className="eng-fill" style={{ width: `${on ? Math.max(0, Math.min(100, pct)) : 0}%` }} />;
}

export default function SectorEngine({ rich }: { rich: SectorPageRich }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const tr = siteTranslations[lang].sectorsPage;

  const metricLabel: Record<SectorMetric, string> = {
    aov: tr.sectorAnalyticsBarAov,
    basketAov: tr.sectorAnalyticsBarBasketAov,
    attachment: tr.sectorAnalyticsBarAttachment,
    ctr: tr.sectorAnalyticsBarCtr,
    cvr: tr.sectorAnalyticsBarCvr,
    margin: tr.sectorAnalyticsBarMargin,
    retention: tr.sectorAnalyticsBarRetention,
    rescue: tr.sectorAnalyticsBarRescue,
    recurring: tr.sectorAnalyticsBarRecurring,
    gift: tr.sectorAnalyticsBarGift,
  };

  const data = useMemo(() => {
    const tags = (isAr ? rich.aiProfileTagsAr : rich.aiProfileTagsEn)
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    const signals = ((isAr ? rich.aiSignalsAr : rich.aiSignalsEn) ?? []).map((s) => stripLeadIcon(s));
    const recs = (isAr ? rich.aiRecsAr : rich.aiRecsEn).map(splitRec);
    const kpis = rich.analyticKpis.map((k) => ({
      fig: kpiFigure(isAr ? k.ar : k.en),
      label: metricLabel[k.metric],
    }));
    return { tags, signals, recs, kpis };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rich, isAr, lang]);

  const { tags, signals, recs, kpis } = data;
  const sig = (signals.length ? signals : tags.slice(0, 3)).slice(0, 3);
  const join = (xs: string[]) =>
    xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(isAr ? "، " : ", ")}${isAr ? " و" : " and "}${xs[xs.length - 1]}`;

  const items: AccordionItem[] = [
    {
      key: "reads",
      title: isAr ? "يقرأ عميلك" : "Reads your shopper",
      note: isAr
        ? `يبني ملفاً لكل زائر من ${join(sig)}، ويحدّثه مع كل طلب. لا نماذج ولا أسئلة على العميل.`
        : `Builds a profile for every visitor from ${join(sig)}, and refreshes it with every order. No forms, no questions for the shopper.`,
    },
    {
      key: "suggests",
      title: isAr ? "يقترح الأنسب له" : "Suggests what fits",
      note: recs[0]
        ? isAr
          ? `مثال من قطاعك: «${recs[0].name}»${recs[0].pct ? ` بتطابق ${recs[0].pct}` : ""}. وكل عميل يرى ترتيباً مختلفاً.`
          : `An example from your sector: "${recs[0].name}"${recs[0].pct ? ` at a ${recs[0].pct} match` : ""}. Every shopper sees a different order.`
        : isAr
          ? "كل عميل يرى ترتيباً مختلفاً حسب ما يناسبه."
          : "Every shopper sees a different order, based on what fits them.",
    },
    {
      key: "measures",
      title: isAr ? "يقيس الأثر بالأرقام" : "Measures the lift",
      note:
        kpis.length >= 2
          ? isAr
            ? `تقاريرك تعرض ${kpis[0].label} (${kpis[0].fig}) و${kpis[1].label} (${kpis[1].fig}) قبل التفعيل وبعده.`
            : `Your reports show ${kpis[0].label} (${kpis[0].fig}) and ${kpis[1].label} (${kpis[1].fig}) before and after activation.`
          : isAr
            ? "تقاريرك تقارن الأرقام قبل التفعيل وبعده."
            : "Your reports compare the numbers before and after activation.",
    },
  ];

  const bars = rich.analyticBarPcts;

  const card = (children: ReactNode) => <div className="eng-card">{children}</div>;

  const stage = (key: string): ReactNode => {
    if (key === "reads") {
      return card(
        <>
          <div className="eng-card-head">
            <strong>{isAr ? "ملف العميل الذكي" : "Smart customer profile"}</strong>
            <span>{isAr ? "يتحدّث مع كل طلب" : "Updates with every order"}</span>
          </div>
          <div className="eng-chips">
            {tags.map((tag, i) => (
              <span key={i} className="eng-chip">{tag}</span>
            ))}
          </div>
          {signals.length ? (
            <>
              <p className="eng-label">{isAr ? "ما يتابعه عن عميلك" : "What it follows"}</p>
              <ul className="eng-sigs">
                {signals.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          ) : null}
        </>,
      );
    }
    if (key === "suggests") {
      return card(
        <>
          <div className="eng-card-head">
            <strong>{isAr ? "توصيات مخصّصة بالذكاء الاصطناعي" : "AI recommendations, personalised"}</strong>
            <span>{isAr ? "مرتّبة بنسبة التطابق" : "Ranked by match"}</span>
          </div>
          <ul className="eng-recs">
            {recs.map((r, i) => (
              <li key={i} className="eng-rec">
                <span className="eng-rec-name">{r.name}</span>
                {r.pct ? <span className="eng-rec-pct num-ltr">{r.pct}</span> : null}
                {r.n ? (
                  <span className="eng-track" aria-hidden="true">
                    <Fill pct={r.n} />
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </>,
      );
    }
    return card(
      <>
        <div className="eng-card-head">
          <strong>{isAr ? "لوحة الأداء" : "Performance"}</strong>
          <span className="eng-live">
            <i aria-hidden="true" />
            {tr.sectorDashboardLive}
          </span>
        </div>
        <ul className="eng-kpis">
          {kpis.map((k, i) => (
            <li key={i}>
              <b className="num-ltr">{k.fig}</b>
              <span>{k.label}</span>
            </li>
          ))}
        </ul>
        {bars ? (
          <ul className="eng-bars">
            {bars.map((pct, i) => (
              <li key={i} className="eng-bar">
                <span className="eng-bar-l">{kpis[i]?.label}</span>
                <span className="eng-track" aria-hidden="true">
                  <Fill pct={pct} />
                </span>
                <span className="eng-bar-v num-ltr">{pct}%</span>
              </li>
            ))}
          </ul>
        ) : null}
      </>,
    );
  };

  return (
    <div id="sector-ai-context" className="rv d1 sector-block eng-block" style={{ scrollMarginTop: 120 }}>
      <ShapeAccordion
        fill
        head={
          <div className="eng-head">
            <h2 className="section-head-title--sm">
              {isAr ? "كيف يشتغل زيادة في قطاعك" : "How Ziadah works in your sector"}
            </h2>
            <p>
              {isAr
                ? "ثلاث خطوات تتكرر مع كل زائر: يقرأه، يقترح له، ثم يقيس النتيجة."
                : "Three steps repeated for every visitor: read them, suggest to them, measure the result."}
            </p>
          </div>
        }
        items={items}
        label={isAr ? "كيف يشتغل زيادة" : "How Ziadah works"}
        stage={(key) => stage(key as Key)}
      />
    </div>
  );
}
