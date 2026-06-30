import { createContext, useContext, useState, ReactNode, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";

type WaitlistCtx = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const Ctx = createContext<WaitlistCtx>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function useWaitlist() {
  return useContext(Ctx);
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Ctx.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false), isOpen }}>
      {children}
      <WaitlistDialog open={isOpen} onOpenChange={setIsOpen} />
    </Ctx.Provider>
  );
}

function WaitlistDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { lang } = useLang();
  const t = useT();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ArrowCTA = lang === "ar" ? ArrowLeft : ArrowRight;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setEmail("");
    setName("");
    setStoreUrl("");
    setPlatform("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(reset, 200);
      }}
    >
      <DialogContent className="max-w-md bg-white border border-zinc-200 text-zinc-950 shadow-card-lg">
        {!submitted ? (
          <>
            <DialogHeader>
              <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-700 text-xs font-bold tracking-widest uppercase mb-3">
                <Sparkles className="w-3 h-3" />
                {t({ ar: "قريباً", en: "Coming soon" })}
              </div>
              <DialogTitle className="text-2xl font-bold text-zinc-950 text-start">
                {t({ ar: "انضم لقائمة الانتظار", en: "Join the waitlist" })}
              </DialogTitle>
              <DialogDescription className="text-zinc-600 text-start">
                {t({
                  ar: "صير من أول اللي يجرّبون راصد. بنفتح أبواب التجربة قريب، وأعضاء قائمة الانتظار لهم أولوية الوصول.",
                  en: "Be among the first to try Rasid. Trials open soon — waitlist members get priority access.",
                })}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3 mt-2">
              <div>
                <label className="text-xs font-medium text-zinc-600 mb-1.5 block">
                  {t({ ar: "الاسم الكامل", en: "Full name" })}
                </label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t({ ar: "أحمد المالكي", en: "Ahmed Al-Malki" })}
                  className="bg-zinc-50 border-zinc-200 text-zinc-950 placeholder:text-zinc-400"
                  data-testid="waitlist-name"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-600 mb-1.5 block">
                  {t({ ar: "الإيميل", en: "Work email" })}
                </label>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@store.com"
                  className="bg-zinc-50 border-zinc-200 text-zinc-950 placeholder:text-zinc-400 num-ltr"
                  data-testid="waitlist-email"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-600 mb-1.5 block">
                  {t({ ar: "رابط متجرك (اختياري)", en: "Store URL (optional)" })}
                </label>
                <Input
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  placeholder="https://"
                  className="bg-zinc-50 border-zinc-200 text-zinc-950 placeholder:text-zinc-400 num-ltr"
                  data-testid="waitlist-store"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-600 mb-1.5 block">
                  {t({ ar: "منصة المتجر", en: "Store platform" })}
                </label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger
                    className="h-10 bg-zinc-50 border-zinc-200 text-zinc-950 data-[placeholder]:text-zinc-400"
                    data-testid="waitlist-platform"
                  >
                    <SelectValue placeholder={t({ ar: "اختر المنصة", en: "Choose your platform" })} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-zinc-200 text-zinc-950">
                    <SelectItem value="salla">Salla</SelectItem>
                    <SelectItem value="zid">Zid</SelectItem>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="woocommerce">WooCommerce</SelectItem>
                    <SelectItem value="magento">Magento</SelectItem>
                    <SelectItem value="custom">{t({ ar: "متجر مخصص", en: "Custom store" })}</SelectItem>
                    <SelectItem value="other">{t({ ar: "أخرى", en: "Other" })}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full bg-zinc-950 text-white hover:bg-zinc-800 font-semibold mt-2"
                data-testid="waitlist-submit"
              >
                {t({ ar: "سجّلني في قائمة الانتظار", en: "Join the waitlist" })}
                <ArrowCTA className="ms-1 w-4 h-4" />
              </Button>
              <p className="text-[11px] text-zinc-500 text-center pt-1">
                {t({
                  ar: "بتسجيلك توافق إنك تستلم تحديثات عن توفّر راصد. ما بنشارك إيميلك مع أي طرف ثالث.",
                  en: "By signing up you agree to receive Rasid availability updates. We won't share your email with anyone.",
                })}
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-5">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-950 mb-2">
              {t({ ar: "حيّاك الله في قائمة الانتظار!", en: "Welcome to the waitlist!" })}
            </h3>
            <p className="text-zinc-600 mb-6">
              {t({
                ar: "بنرسل لك إيميل أول ما نفتح أبواب التجربة.",
                en: "We'll email you the moment trials open.",
              })}
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950"
            >
              {t({ ar: "تم", en: "Done" })}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
