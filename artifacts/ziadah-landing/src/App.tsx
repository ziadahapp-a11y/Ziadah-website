import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import PageTransition from "@/components/PageTransition";
import { BlurTransitionProvider } from "@/components/BlurTransitionProvider";
import { MotionProvider, useScrollTriggerRefresh } from "@/motion/MotionProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Analytics } from "@/components/Analytics";
import { useLangAwareLocation } from "@/hooks/useLangAwareLocation";
import "./index.css";

const SuccessStories = lazy(() => import("@/pages/SuccessStories"));
const SuccessStoryDetail = lazy(() => import("@/pages/SuccessStoryDetail"));
const Landing = lazy(() => import("@/pages/HomeTrackflow"));
const Support = lazy(() => import("@/pages/Support"));
const SupportArticle = lazy(() => import("@/pages/SupportArticle"));
const Features = lazy(() => import("@/pages/Features"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const Platforms = lazy(() => import("@/pages/Platforms"));
const UseCases = lazy(() => import("@/pages/UseCases"));
const About = lazy(() => import("@/pages/About"));
const FeatureProductPage = lazy(() => import("@/pages/FeatureProductPage"));
const ZidAppsComparison = lazy(() => import("@/pages/ZidAppsComparison"));
const Affiliate = lazy(() => import("@/pages/Affiliate"));
const Calculator = lazy(() => import("@/pages/Calculator"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const DataDeletion = lazy(() => import("@/pages/DataDeletion"));
const Terms = lazy(() => import("@/pages/Terms"));
const ErrorStatus = lazy(() => import("@/pages/ErrorStatus"));
const Sectors = lazy(() => import("@/pages/Sectors"));
const EcommerceStoreSectors = lazy(() => import("@/pages/EcommerceStoreSectors"));
const SectorDetail = lazy(() => import("@/pages/SectorDetail"));
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
const UseCasesByPages = lazy(() => import("@/pages/use-cases/UseCasesByPages"));
const UseCasesByActivity = lazy(() => import("@/pages/use-cases/UseCasesByActivity"));
const UseCasesByPresentation = lazy(() => import("@/pages/use-cases/UseCasesByPresentation"));
const UseCasesByGoal = lazy(() => import("@/pages/use-cases/UseCasesByGoal"));
const UseCasesByExperience = lazy(() => import("@/pages/use-cases/UseCasesByExperience"));

const queryClient = new QueryClient();

/**
 * ScrollTrigger caches every trigger's start/end pixel positions per document.
 * A route change swaps the document under it, so the whole set has to be
 * re-measured — otherwise reveals on the new page fire at the old page's
 * scroll offsets.
 */
function RouteMotionSync() {
  const [location] = useLangAwareLocation();
  useScrollTriggerRefresh(location);
  return null;
}

/**
 * Suspense fallback for lazy route chunks.
 *
 * Delay-mounted so fast transitions (already-cached chunks) show nothing — the
 * blur overlay alone covers them. Only slow loads reveal the branded spinner.
 */
function LazyRouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite" aria-busy="true">
      <div className="route-fallback__ring" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className="route-fallback__sr">جارٍ التحميل…</span>
    </div>
  );
}

function PublicRoutes() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/404" component={NotFound} />
      <Route path="/500">
        <ErrorStatus code={500} />
      </Route>
      <Route path="/501">
        <ErrorStatus code={501} />
      </Route>
      <Route path="/502">
        <ErrorStatus code={502} />
      </Route>
      <Route path="/503">
        <ErrorStatus code={503} />
      </Route>
      <Route path="/error/:code">
        <Suspense fallback={<LazyRouteFallback />}>
          <ErrorStatus />
        </Suspense>
      </Route>
      <Route path="/success-stories/:slug" component={SuccessStoryDetail} />
      <Route path="/success-stories" component={SuccessStories} />
      <Route path="/support" component={Support} />
      <Route path="/support/article/:id" component={SupportArticle} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/data-deletion" component={DataDeletion} />
      <Route path="/terms" component={Terms} />
      <Route path="/features" component={Features} />
      <Route path="/features/:slug">
        {(params) => <FeatureProductPage slug={params.slug ?? ""} />}
      </Route>
      <Route path="/pricing" component={PricingPage} />
      <Route path="/platforms" component={Platforms} />
      <Route path="/use-cases" component={UseCases} />
      <Route path="/about" component={About} />
      <Route path="/zid-apps-comparison" component={ZidAppsComparison} />
      <Route path="/affiliate" component={Affiliate} />
      <Route path="/sectors/ecommerce-stores" component={EcommerceStoreSectors} />
      <Route path="/sectors/:slug" component={SectorDetail} />
      <Route path="/sectors" component={Sectors} />
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
      <Route path="/use-cases/by-pages" component={UseCasesByPages} />
      <Route path="/use-cases/by-activity" component={UseCasesByActivity} />
      <Route path="/use-cases/by-presentation" component={UseCasesByPresentation} />
      <Route path="/use-cases/by-goal" component={UseCasesByGoal} />
      <Route path="/use-cases/by-experience" component={UseCasesByExperience} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  return (
    <PageTransition>
      <Suspense fallback={<LazyRouteFallback />}>
        <PublicRoutes />
      </Suspense>
    </PageTransition>
  );
}

function AppShell() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        تخطي إلى المحتوى الرئيسي
      </a>
      <ScrollToTop />
      <RouteMotionSync />
      <Analytics />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
          <Router />
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      {/* One Lenis instance for the whole app, mounted above the router so
          route changes never rebuild the scroll system — only the
          per-element triggers below it are. */}
      <MotionProvider>
        <BlurTransitionProvider>
          <QueryClientProvider client={queryClient}>
            <WouterRouter
              base={import.meta.env.BASE_URL.replace(/\/$/, "")}
              hook={useLangAwareLocation}
            >
              <AppShell />
            </WouterRouter>
          </QueryClientProvider>
        </BlurTransitionProvider>
      </MotionProvider>
    </LanguageProvider>
  );
}

export default App;
