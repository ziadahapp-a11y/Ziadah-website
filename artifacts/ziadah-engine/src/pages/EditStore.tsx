import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetStore,
  getGetStoreQueryKey,
  useUpdateStore,
  getListStoresQueryKey,
} from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Globe } from "lucide-react";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, "Store name is required"),
  url: z.string().url("Please enter a valid store URL"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  id: number;
}

export default function EditStore({ id }: Props) {
  const [, setLocation] = useLocation();
  const updateStore = useUpdateStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: store, isLoading } = useGetStore(id, {
    query: { enabled: !!id, queryKey: getGetStoreQueryKey(id) },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", url: "" },
  });

  useEffect(() => {
    if (store) {
      form.reset({ name: store.name, url: store.url });
    }
  }, [store, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateStore.mutateAsync({ id, data: values });
      toast({ title: "Store updated" });
      queryClient.invalidateQueries({ queryKey: getListStoresQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStoreQueryKey(id) });
      setLocation(`/stores/${id}`);
    } catch {
      toast({ title: "Failed to update store", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Store not found</p>
        <Button asChild variant="outline" className="mt-4"><Link href="/">Back</Link></Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground mb-4 -ml-2">
          <Link href={`/stores/${id}`}>
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Edit Store</h1>
        <p className="text-muted-foreground text-sm mt-1">Update your store details</p>
      </div>

      <div className="bg-card border border-card-border rounded-xl p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-store-name" />
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
                      <Input {...field} className="pl-10" data-testid="input-store-url" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={updateStore.isPending} className="flex-1" data-testid="button-save-store">
                {updateStore.isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button asChild type="button" variant="outline">
                <Link href={`/stores/${id}`}>Cancel</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
