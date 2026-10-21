import { Section as DsSection, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import { useLanguage } from "@/i18n/LanguageContext";
import ActivationFilm from "./ActivationFilm";

/**
 * THE FILM, STRAIGHT AFTER THE HERO.
 *
 * The hero says the sentence; this band shows it happening: the merchant
 * activates, then Ziadah reads the store, studies the buyers, picks the offers
 * that fit and puts them in the store. The film is a live component (see
 * ActivationFilm), so it plays in Arabic and in English from the same code.
 */
export function FilmBand() {
  const { isAr } = useLanguage();
  const t = (ar: string, en: string) => (isAr ? ar : en);
  return (
    <DsSection id="film" family="violet">
      <SectionHead
        center
        kicker={t("كيف يعمل", "How it works")}
        title={t("تفعّل، وبعدها زيادة يشتغل", "You activate. Ziadah does the rest.")}
        lead={t(
          "هذا اللي يصير بعد ما تضغط فعّل: يقرأ منتجاتك وطلباتك، يختار من العروض ما يناسب متجرك فقط، ويركّبه في الصفحات المناسبة.",
          "This is what happens after you press activate: it reads your products and orders, picks only the offers that fit your store, and puts them on the right pages.",
        )}
      />
      <Shell>
        <ActivationFilm />
      </Shell>
    </DsSection>
  );
}
