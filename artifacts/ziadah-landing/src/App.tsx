import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/ThemeContext";
import Landing from "@/pages/Landing";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { BlurTransitionProvider } from "@/components/BlurTransitionProvider";
import "./index.css";

const SuccessStories = lazy(() => import("@/pages/SuccessStories"));
const Support = lazy(() => import("@/pages/Support"));
const SupportArticle = lazy(() => import("@/pages/SupportArticle"));
const Features = lazy(() => import("@/pages/Features"));
const Calculator = lazy(() => import("@/pages/Calculator"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const ProductPage = lazy(() => import("@/pages/use-cases/ProductPage"));
const CartPage = lazy(() => import("@/pages/use-cases/CartPage"));
const ThankYouPage = lazy(() => import("@/pages/use-cases/ThankYouPage"));
const HomePage = lazy(() => import("@/pages/use-cases/HomePage"));
const CategoryPage = lazy(() => import("@/pages/use-cases/CategoryPage"));
const AllPages = lazy(() => import("@/pages/use-cases/AllPages"));
const CrossSell = lazy(() => import("@/pages/use-cases/CrossSell"));
const Upsell = lazy(() => import("@/pages/use-cases/Upsell"));
const IncreaseAOV = lazy(() => import("@/pages/use-cases/IncreaseAOV"));
const ReduceAbandon = lazy(() => import("@/pages/use-cases/ReduceAbandon"));
const IncreaseConversion = lazy(() => import("@/pages/use-cases/IncreaseConversion"));
const RelatedProducts = lazy(() => import("@/pages/use-cases/RelatedProducts"));
const Addons = lazy(() => import("@/pages/use-cases/Addons"));
const BuyTogether = lazy(() => import("@/pages/use-cases/BuyTogether"));
const BundleDeals = lazy(() => import("@/pages/use-cases/BundleDeals"));
const BuyMoreSaveMore = lazy(() => import("@/pages/use-cases/BuyMoreSaveMore"));
const CheckoutPage = lazy(() => import("@/pages/use-cases/CheckoutPage"));
const AddToCartPage = lazy(() => import("@/pages/use-cases/AddToCartPage"));
const RemoveFromCartPage = lazy(() => import("@/pages/use-cases/RemoveFromCartPage"));
const CustomerExperience = lazy(() => import("@/pages/use-cases/CustomerExperience"));
const MoreCartItems = lazy(() => import("@/pages/use-cases/MoreCartItems"));
const FreeShippingDisplay = lazy(() => import("@/pages/use-cases/FreeShippingDisplay"));
const DiscountCoupon = lazy(() => import("@/pages/use-cases/DiscountCoupon"));

const queryClient = new QueryClient();

function stripEnPrefix(path: string) {
  const qIndex = path.indexOf("?");
  const hIndex = path.indexOf("#");
  const cutIndex = [qIndex, hIndex].filter((v) => v >= 0).sort((a, b) => a - b)[0] ?? path.length;
  const pathname = path.slice(0, cutIndex);
  const suffix = path.slice(cutIndex);

  if (pathname === "/en") return `/${suffix}`;
  if (pathname.startsWith("/en/")) return `${pathname.slice(3)}${suffix}`;
  return path;
}

function useLangAwareLocation() {
  const [location, navigate] = useBrowserLocation();
  const { lang } = useLanguage();
  // لغة الواجهة من السياق تتقدّم أحياناً على pathname بعد pushState — لا نعتمد pathname وحده
  const isEn = lang === "en";
  const normalizedLocation = stripEnPrefix(location);

  const langAwareNavigate = (to: string, options?: { replace?: boolean }) => {
    const plainTarget = stripEnPrefix(to);
    const nextPath = isEn
      ? (plainTarget === "/" ? "/en" : `/en${plainTarget}`)
      : plainTarget;
    navigate(nextPath, options);
  };

  return [normalizedLocation, langAwareNavigate] as const;
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

/** خلفية بسيطة أثناء تحميل أجزاء الصفحات (تقليل حجم الحزمة الأولى) */
function LazyRouteFallback() {
  const { dir } = useLanguage();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        direction: dir,
      }}
      aria-hidden
    />
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/success-stories" component={SuccessStories} />
      <Route path="/support" component={Support} />
      <Route path="/support/article/:id" component={SupportArticle} />
      <Route path="/features" component={Features} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/use-cases/product-page" component={ProductPage} />
      <Route path="/use-cases/cart" component={CartPage} />
      <Route path="/use-cases/thank-you" component={ThankYouPage} />
      <Route path="/use-cases/home" component={HomePage} />
      <Route path="/use-cases/category" component={CategoryPage} />
      <Route path="/use-cases/all-pages" component={AllPages} />
      <Route path="/use-cases/cross-sell" component={CrossSell} />
      <Route path="/use-cases/upsell" component={Upsell} />
      <Route path="/use-cases/increase-aov" component={IncreaseAOV} />
      <Route path="/use-cases/reduce-abandon" component={ReduceAbandon} />
      <Route path="/use-cases/increase-conversion" component={IncreaseConversion} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/use-cases/related-products" component={RelatedProducts} />
      <Route path="/use-cases/addons" component={Addons} />
      <Route path="/use-cases/buy-together" component={BuyTogether} />
      <Route path="/use-cases/bundle-deals" component={BundleDeals} />
      <Route path="/use-cases/buy-more-save-more" component={BuyMoreSaveMore} />
      <Route path="/use-cases/checkout" component={CheckoutPage} />
      <Route path="/use-cases/add-to-cart" component={AddToCartPage} />
      <Route path="/use-cases/remove-from-cart" component={RemoveFromCartPage} />
      <Route path="/use-cases/customer-experience" component={CustomerExperience} />
      <Route path="/use-cases/more-cart-items" component={MoreCartItems} />
      <Route path="/use-cases/free-shipping" component={FreeShippingDisplay} />
      <Route path="/use-cases/discount-coupon" component={DiscountCoupon} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BlurTransitionProvider>
          <QueryClientProvider client={queryClient}>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} hook={useLangAwareLocation}>
              <ScrollToTop />
              <PageTransition>
                <Suspense fallback={<LazyRouteFallback />}>
                  <Router />
                </Suspense>
              </PageTransition>
              <Footer />
            </WouterRouter>
          </QueryClientProvider>
        </BlurTransitionProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
