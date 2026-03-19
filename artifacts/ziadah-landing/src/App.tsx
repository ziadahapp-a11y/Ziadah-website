import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Landing from "@/pages/Landing";
import SuccessStories from "@/pages/SuccessStories";
import Support from "@/pages/Support";
import SupportArticle from "@/pages/SupportArticle";
import Features from "@/pages/Features";
import Calculator from "@/pages/Calculator";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import ProductPage from "@/pages/use-cases/ProductPage";
import CartPage from "@/pages/use-cases/CartPage";
import ThankYouPage from "@/pages/use-cases/ThankYouPage";
import HomePage from "@/pages/use-cases/HomePage";
import CategoryPage from "@/pages/use-cases/CategoryPage";
import AllPages from "@/pages/use-cases/AllPages";
import CrossSell from "@/pages/use-cases/CrossSell";
import Upsell from "@/pages/use-cases/Upsell";
import IncreaseAOV from "@/pages/use-cases/IncreaseAOV";
import ReduceAbandon from "@/pages/use-cases/ReduceAbandon";
import IncreaseConversion from "@/pages/use-cases/IncreaseConversion";
import RelatedProducts from "@/pages/use-cases/RelatedProducts";
import Addons from "@/pages/use-cases/Addons";
import BuyTogether from "@/pages/use-cases/BuyTogether";
import BundleDeals from "@/pages/use-cases/BundleDeals";
import BuyMoreSaveMore from "@/pages/use-cases/BuyMoreSaveMore";
import CheckoutPage from "@/pages/use-cases/CheckoutPage";
import AddToCartPage from "@/pages/use-cases/AddToCartPage";
import RemoveFromCartPage from "@/pages/use-cases/RemoveFromCartPage";
import PageTransition from "@/components/PageTransition";
import "./index.css";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
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
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <PageTransition>
            <Router />
          </PageTransition>
        </WouterRouter>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
