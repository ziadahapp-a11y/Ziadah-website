import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListStores,
  getListStoresQueryKey,
  useDeleteStore,
  useSyncStore,
  useAnalyzeStore,
  getGetStoreQueryKey,
  getListStoreProductsQueryKey,
  getGetLatestAnalysisQueryKey,
  getGetRecommendationsQueryKey,
} from "@workspace/api-client-react";
import { PlusCircle, RefreshCw, Zap, Trash2, ExternalLink, ChevronRight, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

function statusColor(status: string) {
  switch (status) {
    case "analyzed": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "synced": return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    case "analyzing": return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "error": return "bg-red-500/15 text-red-400 border-red-500/30";
    default: return "bg-slate-500/15 text-slate-400 border-slate-500/30";
  }
}

function statusLabel(status: string) {
  switch (status) {
    case "analyzed": return "Analyzed";
    case "synced": return "Synced";
    case "analyzing": return "Analyzing...";
    case "error": return "Error";
    default: return "Pending";
  }
}

export default function Dashboard() {
  const { data: stores, isLoading } = useListStores();
  const deleteStore = useDeleteStore();
  const syncStore = useSyncStore();
  const analyzeStore = useAnalyzeStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [actioningId, setActioningId] = useState<number | null>(null);

  const handleSync = async (id: number) => {
    setActioningId(id);
    try {
      const result = await syncStore.mutateAsync({ id });
      toast({ title: "Sync complete", description: result.message });
      queryClient.invalidateQueries({ queryKey: getListStoresQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStoreQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: getListStoreProductsQueryKey(id) });
    } catch {
      toast({ title: "Sync failed", description: "Could not reach the store", variant: "destructive" });
    } finally {
      setActioningId(null);
    }
  };

  const handleAnalyze = async (id: number) => {
    setActioningId(id);
    try {
      await analyzeStore.mutateAsync({ id });
      toast({ title: "Analysis complete", description: "AI has analyzed your products" });
      queryClient.invalidateQueries({ queryKey: getListStoresQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStoreQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: getGetLatestAnalysisQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: getGetRecommendationsQueryKey(id) });
    } catch {
      toast({ title: "Analysis failed", description: "Sync products first, then try again", variant: "destructive" });
    } finally {
      setActioningId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this store and all its data?")) return;
    try {
      await deleteStore.mutateAsync({ id });
      toast({ title: "Store deleted" });
      queryClient.invalidateQueries({ queryKey: getListStoresQueryKey() });
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Stores</h1>
          <p className="text-muted-foreground text-sm mt-1">Connect and analyze your e-commerce stores</p>
        </div>
        <Button asChild data-testid="button-add-store" className="gap-2">
          <Link href="/stores/new">
            <PlusCircle className="h-4 w-4" />
            Add Store
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : !stores || stores.length === 0 ? (
        <div className="border border-dashed border-border rounded-xl p-16 text-center" data-testid="empty-state-stores">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No stores yet</h3>
          <p className="text-muted-foreground text-sm mb-6">Connect your first store to start discovering product insights</p>
          <Button asChild data-testid="button-add-first-store">
            <Link href="/stores/new">Add your first store</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {stores.map((store) => (
            <div
              key={store.id}
              className="group bg-card border border-card-border rounded-xl p-5 flex items-center gap-4 hover:border-primary/30 transition-all duration-200"
              data-testid={`card-store-${store.id}`}
            >
              <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Store className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-foreground truncate" data-testid={`text-store-name-${store.id}`}>
                    {store.name}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor(store.status)}`} data-testid={`status-store-${store.id}`}>
                    {statusLabel(store.status)}
                  </span>
                  {store.platform && (
                    <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                      {store.platform}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <a href={store.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    {store.url.replace(/^https?:\/\//, "").substring(0, 40)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  {store.productCount > 0 && (
                    <span data-testid={`text-product-count-${store.id}`}>{store.productCount} products</span>
                  )}
                  {store.lastAnalyzedAt && (
                    <span>Analyzed {new Date(store.lastAnalyzedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => handleSync(store.id)}
                  disabled={actioningId === store.id}
                  data-testid={`button-sync-${store.id}`}
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${actioningId === store.id && syncStore.isPending ? "animate-spin" : ""}`} />
                  Sync
                </Button>
                {store.productCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-xs text-primary hover:text-primary"
                    onClick={() => handleAnalyze(store.id)}
                    disabled={actioningId === store.id}
                    data-testid={`button-analyze-${store.id}`}
                  >
                    <Zap className={`h-3.5 w-3.5 ${actioningId === store.id && analyzeStore.isPending ? "animate-pulse" : ""}`} />
                    Analyze
                  </Button>
                )}
                <Button asChild variant="ghost" size="sm" data-testid={`button-view-${store.id}`}>
                  <Link href={`/stores/${store.id}`}>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(store.id)}
                  data-testid={`button-delete-${store.id}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
