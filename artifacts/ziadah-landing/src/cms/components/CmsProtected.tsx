import { useEffect } from "react";
import { useLangAwareLocation } from "@/hooks/useLangAwareLocation";
import { useCmsAuth } from "../CmsAuthContext";
import { CmsLayout } from "./CmsLayout";
import { Spinner } from "@/components/ui/spinner";

export function CmsProtected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useCmsAuth();
  const [, navigate] = useLangAwareLocation();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/cms/login", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <Spinner className="size-8 text-neutral-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <CmsLayout>{children}</CmsLayout>;
}
