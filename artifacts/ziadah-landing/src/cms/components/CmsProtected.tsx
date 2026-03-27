import { useEffect } from "react";
import { useLangAwareLocation } from "@/hooks/useLangAwareLocation";
import { useCmsAuth } from "../CmsAuthContext";
import { CmsLayout } from "./CmsLayout";
import { Spinner } from "@/components/ui/spinner";
import "../cms.css";

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
      <div className="cms-shell flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <Spinner className="size-8 text-violet-600 dark:text-violet-400" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <CmsLayout>{children}</CmsLayout>;
}
