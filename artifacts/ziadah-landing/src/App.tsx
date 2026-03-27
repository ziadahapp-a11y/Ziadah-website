import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Redirect } from "wouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/ThemeContext";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { BlurTransitionProvider } from "@/components/BlurTransitionProvider";
import { useLangAwareLocation } from "@/hooks/useLangAwareLocation";
import { CmsAuthProvider } from "@/cms/CmsAuthContext";
import { useCmsAuth } from "@/cms/CmsAuthContext";
import { CmsEditorProvider } from "@/cms/CmsEditorContext";
import { CmsProtected } from "@/cms/components/CmsProtected";
import { CmsInlineToolbar } from "@/cms/components/CmsInlineToolbar";
import { CmsInlineEditorPanel } from "@/cms/components/CmsInlineEditorPanel";
import { CmsFloatingEditableToolbar } from "@/cms/components/CmsFloatingEditableToolbar";
import { CmsQuickLoginModal } from "@/cms/components/CmsQuickLoginModal";
import { SiteContentProvider } from "@/cms/siteContent";
import "./index.css";

const SuccessStories = lazy(() => import("@/pages/SuccessStories"));
const Landing = lazy(() => import("@/pages/Landing"));
const Support = lazy(() => import("@/pages/Support"));
const SupportArticle = lazy(() => import("@/pages/SupportArticle"));
const Features = lazy(() => import("@/pages/Features"));
const Calculator = lazy(() => import("@/pages/Calculator"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const NotFound = lazy(() => import("@/pages/not-found"));
const ErrorStatus = lazy(() => import("@/pages/ErrorStatus"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
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

const CmsLogin = lazy(() => import("@/cms/pages/Login"));
const CmsDashboard = lazy(() => import("@/cms/pages/Dashboard"));
const CmsContent = lazy(() => import("@/cms/pages/Content"));
const CmsPages = lazy(() => import("@/cms/pages/Pages"));
const CmsMedia = lazy(() => import("@/cms/pages/Media"));
const CmsUsers = lazy(() => import("@/cms/pages/Users"));
const CmsAudit = lazy(() => import("@/cms/pages/Audit"));
const CmsSettings = lazy(() => import("@/cms/pages/Settings"));

const queryClient = new QueryClient();

/** CMS quick-login FAB: dev/preview hosts only — not on production (e.g. ziadah.app). */
function shouldShowCmsQuickLogin(): boolean {
  if (import.meta.env.DEV) return true;
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h.endsWith(".replit.dev") ||
    h.endsWith(".repl.co")
  );
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
      <Route path="/error/:code" component={ErrorStatus} />
      <Route path="/success-stories" component={SuccessStories} />
      <Route path="/support" component={Support} />
      <Route path="/support/article/:id" component={SupportArticle} />
      <Route path="/features" component={Features} />
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
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function CmsRoutes() {
  return (
    <Switch>
      <Route path="/cms/login" component={CmsLogin} />
      <Route path="/cms/dashboard">
        <CmsProtected>
          <CmsDashboard />
        </CmsProtected>
      </Route>
      <Route path="/cms/content">
        <CmsProtected>
          <CmsContent />
        </CmsProtected>
      </Route>
      <Route path="/cms/pages">
        <CmsProtected>
          <CmsPages />
        </CmsProtected>
      </Route>
      <Route path="/cms/media">
        <CmsProtected>
          <CmsMedia />
        </CmsProtected>
      </Route>
      <Route path="/cms/users">
        <CmsProtected>
          <CmsUsers />
        </CmsProtected>
      </Route>
      <Route path="/cms/audit">
        <CmsProtected>
          <CmsAudit />
        </CmsProtected>
      </Route>
      <Route path="/cms/settings">
        <CmsProtected>
          <CmsSettings />
        </CmsProtected>
      </Route>
      <Route path="/cms">
        <Redirect to="/cms/dashboard" />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

function Router() {
  const [loc] = useLangAwareLocation();
  const isCms = loc.startsWith("/cms");
  return (
    <>
      {isCms ? (
        <Suspense fallback={<LazyRouteFallback />}>
          <CmsRoutes />
        </Suspense>
      ) : (
        <PageTransition>
          <Suspense fallback={<LazyRouteFallback />}>
            <PublicRoutes />
          </Suspense>
        </PageTransition>
      )}
    </>
  );
}

function AppShell() {
  const [loc] = useLangAwareLocation();
  const isCms = loc.startsWith("/cms");
  const { user, loading } = useCmsAuth();
  const showInlineToolbar =
    !!user && (user.role === "editor" || user.role === "super_admin");
  const showQuickLogin =
    !loading && !user && !isCms && shouldShowCmsQuickLogin();

  return (
    <>
      <ScrollToTop />
      <CmsInlineToolbar />
      <CmsInlineEditorPanel />
      <CmsFloatingEditableToolbar />
      {showQuickLogin && <CmsQuickLoginModal />}
      <div style={{ paddingTop: showInlineToolbar ? 48 : 0 }}>
        <Router />
        {!isCms && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SiteContentProvider>
          <BlurTransitionProvider>
            <QueryClientProvider client={queryClient}>
              <CmsAuthProvider>
                <CmsEditorProvider>
                  <WouterRouter
                    base={import.meta.env.BASE_URL.replace(/\/$/, "")}
                    hook={useLangAwareLocation}
                  >
                    <AppShell />
                  </WouterRouter>
                </CmsEditorProvider>
              </CmsAuthProvider>
            </QueryClientProvider>
          </BlurTransitionProvider>
        </SiteContentProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
