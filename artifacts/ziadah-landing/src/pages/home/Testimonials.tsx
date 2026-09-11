import { useRef } from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as translations } from "@/i18n/translations";
import { useMarqueeShiftSync } from "@/hooks/useMarqueeShiftSync";
import { Section, SectionHead } from "@/sections";

/**
 * Merchant reviews.
 *
 * WHAT THIS RESTORES. The rebuild folded this band into a single tile on the
 * trust board reading "verified merchant reviews", which states that reviews
 * exist without showing one. Thirty-six of them are in `translations`, they
 * are the only words on the page written by someone other than us, and a
 * claim in a merchant's own voice is not interchangeable with a claim in
 * ours.
 *
 * WHAT KEEPS IT ON THE SYSTEM. Every surface here is the section's own: a
 * review sits on `.card`, its body is `.card-body-text`, the merchant's name
 * is `.t-sm-med` and their sector is `.card-eyebrow`. No white ground, no
 * border, no shadow - the card is one 8% tint of the band's ink, the same as
 * every other card on the page.
 *
 * The two rows run in opposite directions, which is what stops thirty-six
 * cards reading as a wall: the eye follows one row and the other moves under
 * it. The head keeps the section's measure inside a container; the rows are
 * deliberately outside one so they run edge to edge, and the section clips
 * its own overflow.
 */

/* A merchant's mark, where we have one. The lookup is by the exact name used
   in `translations`, so a review and its logo cannot drift apart. */
const REVIEW_LOGOS: Record<string, string> = {
  "روبـن": "https://media.zid.store/6f05584b-ae1f-4f36-98ed-57432e185a35/9113838a-3b34-4692-8658-aee1400ea30c-200x.png",
  "Honey Dose | عسل هني دوز": "https://media.zid.store/a7ba195c-7619-4cbd-8d69-d9efcbb5b774/86116d0f-ee24-43df-96fe-eb235de88ab1-200x.png",
  "متجر عبق الغيم للبخور والمسك": "/logos/abaq-alghim.png",
  "Nahla Oil": "/logos/nahla-oil.svg",
  FABIAN: "/logos/fabian.png",
  "تمدُّد": "https://media.zid.store/3a5300b3-8c91-48b3-973b-4a439491aa54/151fb0f1-8cfc-46c1-ac1d-6fe22805874c-200x.jpg",
  "Bestclean | بست كلين": "/logos/bestclean.png",
  "عسل رشوف": "/logos/assal-rashouf.svg",
  "سكندز": "/logos/scundz.svg",
  "الجباره": "/logos/aljabarah.svg",
  Moknh: "https://cdn.salla.sa/gn8RmxHVzto9BHus8MQBr4ksa8bDrB67f2BN6BJX.jpg",
  "شركة اثنى عشر كوب المحدودة": "/logos/12cups.png",
  "كحيلة": "https://media.zid.store/d7a1c023-699a-4a11-9c1d-4ac3de1c541c/ec38bb4f-a97b-4335-af7e-1d01c8df1c2d-200x.png",
  "منصة التبرع لتحفيظ القران الكريم بجمعية نبأ": "https://media.zid.store/b973b0cb-4869-4bad-9f7f-7605b17db09d/7446c429-507d-4551-a04c-b3edfa8ddd21-200x.jpg",
  "تكِنو تولز": "https://cdn.salla.sa/ZYlpqp/lwHvlcLqReOzflpUYwi01YkHvBHpThYNPjO2dCsa.png",
  skinly: "/logos/skinly.svg",
  "For Her | فور هر": "/logos/for-her.png",
  "جمعية القرآن بالزلفي": "https://media.zid.store/56594f92-bddf-4810-851b-bcdf56526fa2/516acbf9-1b79-4301-8031-c6408fe7677d-200x.png",
  ZUM: "/logos/zum.png",
  "جمعية برهان لتحفيظ القران": "https://media.zid.store/e18c120e-c286-43cc-bed1-30006c3015e0/b585e03b-a8d5-4fe9-9317-88c771726a3a-200x.png",
  "Nutters.sa": "https://media.zid.store/12666468-7385-4e28-bcff-2fc85a98c040/f52b5768-97e0-41b0-bf02-b31ef77ff26b-200x.png",
  'احتياجات اللياقة "FitNeeds"': "https://media.zid.store/2e960427-9ad4-49c9-b85e-847f5cf7af6c/f810143d-457d-4b42-88f5-f5c259a2d10b-200x.png",
  rawat: "https://media.zid.store/8518f951-6cf4-412c-8e2a-39f0f6bb6515/988a8efe-3643-4760-a43e-2741d67b0a28-200x.png",
  "KHOBRAA ALMOJTAMA": "https://media.zid.store/8a5f4b81-ebc0-44bd-9005-126976b57582/8be45245-0e6e-4ea5-96c2-4f58f844cf60-200x.png",
  "ناتشورال تاتش": "/logos/natural-touch.png",
  Jawan: "https://cdn.salla.sa/prQbX/RwjbCA3bojdAGfDYGhnrpx470pi5ZErY3v1pOlTn.jpg",
  "مس ديزاين | Miss Designs": "https://media.zid.store/1cc0795b-d617-4e97-9a76-574a2a0246d0/e643e12c-f034-4c10-aaac-e02ace451a03-200x.jpg",
  "Ghalior paris - غاليور باريس": "https://cdn.salla.sa/AzEKGA/MxwEia9PCbIZIiAqYHFDaPCoDJPi5xTcQJI4uGvz.png",
  "متجر كاف": "https://cdn.files.salla.network/theme/263279303/c97a6a82-0fe2-4744-adbb-70ac4e86ac1c.webp",
  Diva202511: "https://cdn.salla.sa/PdrAEK/hI9UPrP9Yxf7vffawFyLaAMb6knMuRTUSOrsGSLz.jpg",
  "كهرمان": "https://cdn.salla.sa/nWmmm/Dt8hWcCEgS4DiC3iMyUYCthlgnwNzrFbUKoMWS3g.png",
};

type Review = { text: string; name: string; role: string };

function ReviewCard({ r, dir }: { r: Review; dir: "rtl" | "ltr" }) {
  const logo = REVIEW_LOGOS[r.name];
  return (
    <article className="card card--short review-card" dir={dir}>
      {/* Five stars, in the brand violet. `dir="ltr"` because a row of rating
          stars fills from the same end in both scripts. */}
      <div className="review-stars" dir="ltr" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} className="review-star" />
        ))}
      </div>

      <p className="card-body-text flex-1 line-clamp-5">{r.text}</p>

      <div className="card-foot justify-start">
        {/* A supplied mark keeps a white plate - it was drawn for one, and
            tinting the plate to the section would put half of them on a
            ground they were never cut for. The initial fallback takes the
            brand violet rather than one of five hand-picked gradients. */}
        <span className={`review-avatar${logo ? " has-logo" : ""}`} aria-hidden="true">
          {logo ? (
            <img
              src={logo}
              alt=""
              loading="lazy"
              onError={(e) => {
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.classList.remove("has-logo");
                  parent.textContent = r.name.trim().charAt(0);
                }
              }}
            />
          ) : (
            r.name.trim().charAt(0)
          )}
        </span>
        <span className="min-w-0">
          <span className="block t-sm-med truncate">{r.name}</span>
          <span className="card-eyebrow truncate">{r.role}</span>
        </span>
      </div>
    </article>
  );
}

export function Testimonials() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const copy = translations[lang].landing;

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  useMarqueeShiftSync(topRef);
  useMarqueeShiftSync(bottomRef);

  const rows = [
    { key: "top", ref: topRef, data: copy.testimonialsRow1 as Review[], way: "marquee-rtl" },
    { key: "bottom", ref: bottomRef, data: copy.testimonialsRow2 as Review[], way: "marquee-ltr" },
  ];

  return (
    <Section id="testimonials" family="violet" className="overflow-x-clip">
      <SectionHead
        center
        kicker={copy.testimonialsTag}
        title={copy.testimonialsTitle}
        lead={copy.testimonialsSub}
      />

      {rows.map((row) => (
        <div key={row.key} className="marquee-row review-row">
          <div
            ref={row.ref}
            className={`marquee-track ${row.way}`}
            /* One second per card, so a longer row scrolls at the same speed
               rather than faster. */
            style={{ animationDuration: `${row.data.length * 4}s` }}
          >
            {/* Three segments: the track translates by exactly one segment's
                width and restarts, so the loop needs a second one to cover the
                gap and a third for the widest viewport. */}
            {[0, 1, 2].map((seg) => (
              <div key={seg} className="marquee-segment">
                {row.data.map((r, i) => (
                  <ReviewCard key={`${seg}-${i}`} r={r} dir={dir} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}
