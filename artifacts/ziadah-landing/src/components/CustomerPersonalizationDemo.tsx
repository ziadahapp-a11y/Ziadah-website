import { useState } from "react";
import { Section, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import { WidgetShell, ProductList, ProductRow, WidgetTag } from "@/components/widgets/kit";

type Profile = "noura" | "nasser";

const nouraItems = [
  { name: "عطر رمضان الخاص", reason: "جاءت من إعلان رمضان", price: 289 },
  { name: "طقم عناية بالبشرة", reason: "تصفحت كريمات البشرة", price: 199 },
  { name: "هدية رمضانية فاخرة", reason: "شائع جداً هذا الموسم", price: 159 },
  { name: "بخور عود", reason: "مكمل للعطور", price: 99 },
];

const nasserItems = [
  { name: "سماعات لاسلكية", reason: "أكملها مع هاتفه الجديد", price: 249 },
  { name: "بروتين رياضي", reason: "يناسب نمطه الرياضي", price: 149 },
  { name: "ساعة ذكية", reason: "تكمل ساعته القديمة", price: 399 },
  { name: "تي شيرت برو", reason: "اشترى نفس اللون قبلاً", price: 89 },
];

export default function CustomerPersonalizationDemo({ isAr }: { isAr: boolean }) {
  const [profile, setProfile] = useState<Profile>("nasser");
  const cur = isAr ? "ر.س" : "SAR";

  const labels = isAr
    ? {
        badge: "معاينة حية",
        title: "معاينة التوصيات",
        sub: "نفس المحرك يولّد هذه البطاقات لكل زائر — جرّب شخصيتين مختلفتين.",
        noura: "نورة",
        nasser: "ناصر",
        statsSignals: "تم تحليل أكثر من 40 إشارة",
        statsLatency: "وقت التوليد أقل من 80 ملّي ثانية",
      }
    : {
        badge: "Live preview",
        title: "Recommendations preview",
        sub: "The same engine builds these cards per visitor — try two different profiles.",
        noura: "Noura",
        nasser: "Nasser",
        statsSignals: "40+ signals analysed",
        statsLatency: "Generated in under 80ms",
      };

  const items = profile === "noura" ? nouraItems : nasserItems;

  /* REBUILT on the widget kit. What it was: a 🌹 / 💆 / 🎧 emoji per product,
     a 💡 prefixed onto every reason line, 👩 and 👨 on the two profile
     buttons, a violet glow under the active one, and a "قريباً" panel of
     bullets about features the preview does not show. The engine's argument
     is that the SAME strip changes per visitor, so the strip is the whole
     demo and everything else was around it. */
  return (
    <Section family="grey">
      <Shell>
        <SectionHead center kicker={labels.badge} title={labels.title} lead={labels.sub} />

        <div className="cpd-tabs" role="tablist">
          {(["nasser", "noura"] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              className="chip"
              aria-selected={profile === key}
              aria-pressed={profile === key}
              onClick={() => setProfile(key)}
            >
              {key === "noura" ? labels.noura : labels.nasser}
            </button>
          ))}
        </div>

        <div className="cpd-stage">
          <WidgetShell key={profile} title={labels.title} subtitle={labels.statsSignals}>
            <ProductList>
              {items.map((p) => (
                <ProductRow
                  key={p.name}
                  name={p.name}
                  price={String(p.price)}
                  currency={cur}
                  badge={<WidgetTag>{p.reason}</WidgetTag>}
                />
              ))}
            </ProductList>
          </WidgetShell>
        </div>

        <p className="section-note">{labels.statsLatency}</p>
      </Shell>
    </Section>
  );
}
