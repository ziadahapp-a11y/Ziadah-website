import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetStore,
  getGetStoreQueryKey,
  useListStoreProducts,
  getListStoreProductsQueryKey,
  useGetLatestAnalysis,
  getGetLatestAnalysisQueryKey,
  useGetRecommendations,
  getGetRecommendationsQueryKey,
  getListStoresQueryKey,
  useSyncStore,
  useAnalyzeStore,
} from "@workspace/api-client-react";
import { ArrowLeft, RefreshCw, Zap, Edit2, ExternalLink, Package, Brain, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface Props {
  id: number;
}

function statusColor(status: string) {
  switch (status) {
    case "analyzed": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "synced": return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    case "analyzing": return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "error": return "bg-red-500/15 text-red-400 border-red-500/30";
    default: return "bg-slate-500/15 text-slate-400 border-slate-500/30";
  }
}

function roleColor(role: string | null) {
  switch (role) {
    case "main": return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "cross_sell": return "bg-violet-500/15 text-violet-400 border-violet-500/30";
    case "upsell": return "bg-primary/15 text-primary border-primary/30";
    default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
}

function roleLabel(role: string | null) {
  switch (role) {
    case "main": return "Main";
    case "cross_sell": return "Cross-sell";
    case "upsell": return "Upsell";
    default: return null;
  }
}

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "analysis", label: "AI Analysis", icon: Brain },
] as const;

type Tab = typeof TABS[number]["id"];

export default function StoreDetail({ id }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const syncStore = useSyncStore();
  const analyzeStore = useAnalyzeStore();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { data: store, isLoading: storeLoading } = useGetStore(id, {
    query: { enabled: !!id, queryKey: getGetStoreQueryKey(id) },
  });

  const { data: products, isLoading: productsLoading } = useListStoreProducts(id, {
    query: { enabled: !!id && activeTab === "products", queryKey: getListStoreProductsQueryKey(id) },
  });

  const { data: analysis, isLoading: analysisLoading } = useGetLatestAnalysis(id, {
    query: { enabled: !!id && activeTab === "analysis", queryKey: getGetLatestAnalysisQueryKey(id) },
  });

  const { data: recommendations } = useGetRecommendations(id, {
    query: { enabled: !!id && activeTab === "overview", queryKey: getGetRecommendationsQueryKey(id) },
  });

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const result = await syncStore.mutateAsync({ id });
      toast({ title: "Sync complete", description: result.message });
      queryClient.invalidateQueries({ queryKey: getListStoresQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStoreQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: getListStoreProductsQueryKey(id) });
    } catch {
      toast({ title: "Sync failed", description: "Could not reach the store URL", variant: "destructive" });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      await analyzeStore.mutateAsync({ id });
      toast({ title: "Analysis complete", description: "AI has identified your key products" });
      queryClient.invalidateQueries({ queryKey: getListStoresQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStoreQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: getGetLatestAnalysisQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: getGetRecommendationsQueryKey(id) });
    } catch {
      toast({ title: "Analysis failed", description: "Sync products first, then try again", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (storeLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Store not found</p>
        <Button asChild variant="outline" className="mt-4"><Link href="/">Back to stores</Link></Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground mb-4 -ml-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            All Stores
          </Link>
        </Button>

        <div className="bg-card border border-card-border rounded-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-bold text-foreground" data-testid="text-store-name">{store.name}</h1>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor(store.status)}`} data-testid="status-store">
                  {store.status}
                </span>
                {store.platform && (
                  <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                    {store.platform}
                  </span>
                )}
              </div>
              <a
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {store.url}
                <ExternalLink className="h-3 w-3" />
              </a>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                {store.productCount > 0 && (
                  <span data-testid="text-product-count">{store.productCount} products synced</span>
                )}
                {store.lastSyncedAt && (
                  <span>Synced {new Date(store.lastSyncedAt).toLocaleDateString()}</span>
                )}
                {store.lastAnalyzedAt && (
                  <span>Analyzed {new Date(store.lastAnalyzedAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button asChild variant="outline" size="sm" className="gap-1.5" data-testid="button-edit-store">
                <Link href={`/stores/${id}/edit`}>
                  <Edit2 className="h-3.5 w-3.5" />
                  Edit
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={handleSync}
                disabled={isSyncing || isAnalyzing}
                data-testid="button-sync-store"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                {isSyncing ? "Syncing..." : "Sync"}
              </Button>
              <Button
                size="sm"
                className="gap-1.5"
                onClick={handleAnalyze}
                disabled={isAnalyzing || isSyncing || store.productCount === 0}
                data-testid="button-analyze-store"
              >
                <Zap className={`h-3.5 w-3.5 ${isAnalyzing ? "animate-pulse" : ""}`} />
                {isAnalyzing ? "Analyzing..." : "Run AI Analysis"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-muted/50 rounded-lg p-1 w-fit">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`tab-${tab.id}`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          {recommendations ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card border border-card-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Total Products</p>
                <p className="text-3xl font-bold text-foreground" data-testid="stat-total-products">{recommendations.totalProducts}</p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Cross-sells</p>
                <p className="text-3xl font-bold text-violet-400" data-testid="stat-cross-sells">{recommendations.crossSellCount}</p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Upsells</p>
                <p className="text-3xl font-bold text-primary" data-testid="stat-upsells">{recommendations.upsellCount}</p>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <p className="text-lg font-bold text-foreground capitalize">{recommendations.status}</p>
              </div>
              {recommendations.mainProductTitle && (
                <div className="col-span-full bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                  <p className="text-xs text-amber-400 font-medium mb-1">Main Product</p>
                  <p className="text-foreground font-semibold" data-testid="text-main-product">{recommendations.mainProductTitle}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center">
              <Brain className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Analysis Yet</h3>
              <p className="text-muted-foreground text-sm mb-6">
                {store.productCount === 0
                  ? "Sync your store first, then run AI analysis to identify your key products"
                  : "Run AI analysis to identify your main product, cross-sells, and upsells"}
              </p>
              {store.productCount === 0 ? (
                <Button onClick={handleSync} disabled={isSyncing} className="gap-2" data-testid="button-sync-empty">
                  <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
                  Sync Products First
                </Button>
              ) : (
                <Button onClick={handleAnalyze} disabled={isAnalyzing} className="gap-2" data-testid="button-analyze-empty">
                  <Zap className="h-4 w-4" />
                  Run AI Analysis
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === "products" && (
        <div>
          {productsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-56 rounded-xl" />)}
            </div>
          ) : !products || products.length === 0 ? (
            <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center">
              <Package className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Products</h3>
              <p className="text-muted-foreground text-sm mb-6">Sync your store to fetch products</p>
              <Button onClick={handleSync} disabled={isSyncing} className="gap-2">
                <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
                Sync Now
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-card border border-card-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-200 group"
                  data-testid={`card-product-${product.id}`}
                >
                  <div className="aspect-square bg-muted overflow-hidden relative">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                    {product.role && roleLabel(product.role) && (
                      <span className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full border font-medium ${roleColor(product.role)}`}>
                        {roleLabel(product.role)}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-foreground line-clamp-2 mb-1" data-testid={`text-product-title-${product.id}`}>
                      {product.title}
                    </p>
                    <div className="flex items-center justify-between">
                      {product.price != null && (
                        <span className="text-sm font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="text-xs text-muted-foreground">Out of stock</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "analysis" && (
        <div>
          {analysisLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-36 rounded-xl" />)}
              </div>
            </div>
          ) : !analysis ? (
            <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center">
              <Brain className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Analysis Yet</h3>
              <p className="text-muted-foreground text-sm mb-6">Run AI analysis to see product strategy insights</p>
              <Button onClick={handleAnalyze} disabled={isAnalyzing || store.productCount === 0} className="gap-2" data-testid="button-run-analysis">
                <Zap className="h-4 w-4" />
                Run AI Analysis
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="text-xs font-medium text-primary mb-2">AI Strategy Summary</p>
                <p className="text-foreground text-sm leading-relaxed" data-testid="text-analysis-summary">{analysis.summary}</p>
                <p className="text-xs text-muted-foreground mt-3">Analyzed on {new Date(analysis.analyzedAt).toLocaleString()}</p>
              </div>

              {/* Main Product */}
              <div>
                <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400 inline-block" />
                  Main Product
                </h3>
                <div className="bg-card border border-amber-500/20 rounded-xl p-5 flex gap-4">
                  {analysis.mainProduct.imageUrl && (
                    <img
                      src={analysis.mainProduct.imageUrl}
                      alt={analysis.mainProduct.title}
                      className="h-24 w-24 object-cover rounded-lg shrink-0"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-foreground text-lg mb-1" data-testid="text-main-product-title">{analysis.mainProduct.title}</p>
                    {analysis.mainProduct.price != null && (
                      <p className="text-primary font-bold text-xl mb-2">${analysis.mainProduct.price.toFixed(2)}</p>
                    )}
                    <p className="text-sm text-muted-foreground">{analysis.mainProduct.reason}</p>
                  </div>
                </div>
              </div>

              {/* Cross-sells */}
              {analysis.crossSells.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-violet-400 mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-violet-400 inline-block" />
                    Cross-sell Products ({analysis.crossSells.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysis.crossSells.map((p) => (
                      <div key={p.productId} className="bg-card border border-violet-500/20 rounded-xl p-4 flex gap-3">
                        {p.imageUrl && (
                          <img src={p.imageUrl} alt={p.title} className="h-16 w-16 object-cover rounded-lg shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm mb-0.5 truncate" data-testid={`text-cross-sell-${p.productId}`}>{p.title}</p>
                          {p.price != null && <p className="text-violet-400 font-semibold text-sm mb-1">${p.price.toFixed(2)}</p>}
                          <p className="text-xs text-muted-foreground line-clamp-2">{p.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upsells */}
              {analysis.upsells.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                    Upsell Products ({analysis.upsells.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysis.upsells.map((p) => (
                      <div key={p.productId} className="bg-card border border-primary/20 rounded-xl p-4 flex gap-3">
                        {p.imageUrl && (
                          <img src={p.imageUrl} alt={p.title} className="h-16 w-16 object-cover rounded-lg shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm mb-0.5 truncate" data-testid={`text-upsell-${p.productId}`}>{p.title}</p>
                          {p.price != null && <p className="text-primary font-semibold text-sm mb-1">${p.price.toFixed(2)}</p>}
                          <p className="text-xs text-muted-foreground line-clamp-2">{p.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
