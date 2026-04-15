import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateStore, getListStoresQueryKey } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Store, Globe } from "lucide-react";
import { Link } from "wouter";

const schema = z.object({
  name: z.string().min(1, "Store name is required"),
  url: z.string().url("Please enter a valid store URL (e.g. https://your-store.myshopify.com)"),
});

type FormValues = z.infer<typeof schema>;

const PLATFORMS = [
  { name: "Shopify", hint: "your-store.myshopify.com" },
  { name: "WooCommerce", hint: "your-store.com/wp-json/wc/..." },
  { name: "Salla", hint: "your-store.salla.sa" },
  { name: "Zid", hint: "your-store.zid.store" },
];

export default function AddStore() {
  const [, setLocation] = useLocation();
  const createStore = useCreateStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", url: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const store = await createStore.mutateAsync({ data: values });
      toast({ title: "Store added", description: `${store.name} has been registered` });
      queryClient.invalidateQueries({ queryKey: getListStoresQueryKey() });
      setLocation(`/stores/${store.id}`);
    } catch {
      toast({ title: "Failed to add store", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground mb-4 -ml-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Store className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Add Store</h1>
        </div>
        <p className="text-muted-foreground text-sm">Connect your online store to start analyzing products</p>
      </div>

      <div className="bg-card border border-card-border rounded-xl p-6 mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="My Awesome Store"
                      data-testid="input-store-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        placeholder="https://your-store.myshopify.com"
                        className="pl-10"
                        data-testid="input-store-url"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={createStore.isPending}
                className="flex-1"
                data-testid="button-submit-store"
              >
                {createStore.isPending ? "Adding..." : "Add Store"}
              </Button>
              <Button asChild type="button" variant="outline" data-testid="button-cancel">
                <Link href="/">Cancel</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="bg-card border border-card-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Supported Platforms</h3>
        <div className="grid grid-cols-2 gap-3">
          {PLATFORMS.map((p) => (
            <div key={p.name} className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{p.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
