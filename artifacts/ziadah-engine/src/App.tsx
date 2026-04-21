import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import AddStore from "@/pages/AddStore";
import StoreDetail from "@/pages/StoreDetail";
import EditStore from "@/pages/EditStore";
import Analyze from "@/pages/Analyze";
import Report from "@/pages/Report";
import NotFound from "@/pages/not-found";
import { Store, Zap } from "lucide-react";
import { Link, useLocation } from "wouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-full md:w-60 shrink-0 bg-sidebar border-b md:border-b-0 md:border-r border-sidebar-border flex flex-col md:min-h-dvh">
      <div className="p-4 md:p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="font-bold text-foreground text-sm leading-none">Ziadah</p>
            <p className="text-xs text-muted-foreground mt-0.5">Product Intelligence</p>
          </div>
        </div>
      </div>

      <nav className="p-3 md:flex-1">
        <div className="hidden md:block text-xs font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">Navigation</div>
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            location === "/"
              ? "bg-primary/15 text-primary"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          }`}
          data-testid="nav-dashboard"
        >
          <Store className="h-4 w-4 shrink-0" />
          Stores
        </Link>
      </nav>

      <div className="hidden md:block p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground">
          Powered by AI — works with Shopify, Zid & Salla
        </p>
      </div>
    </aside>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col md:flex-row bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden mobile-scroll">
        {children}
      </main>
    </div>
  );
}

function AdminRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/stores/new" component={AddStore} />
        <Route path="/stores/:id/edit">
          {(params) => <EditStore id={parseInt(params.id, 10)} />}
        </Route>
        <Route path="/stores/:id">
          {(params) => <StoreDetail id={parseInt(params.id, 10)} />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Switch>
            <Route path="/analyze" component={Analyze} />
            <Route path="/report/:shareToken">
              {(params) => <Report shareToken={params.shareToken ?? ""} />}
            </Route>
            <Route>
              <AdminRouter />
            </Route>
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
