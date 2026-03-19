import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Landing from "@/pages/Landing";
import SuccessStories from "@/pages/SuccessStories";
import Support from "@/pages/Support";
import Features from "@/pages/Features";
import Calculator from "@/pages/Calculator";
import NotFound from "@/pages/not-found";
import "./index.css";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/success-stories" component={SuccessStories} />
      <Route path="/support" component={Support} />
      <Route path="/features" component={Features} />
      <Route path="/calculator" component={Calculator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
