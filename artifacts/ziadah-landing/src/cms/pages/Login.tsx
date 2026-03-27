import { useEffect, useState } from "react";
import { useLangAwareLocation } from "@/hooks/useLangAwareLocation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCmsAuth } from "../CmsAuthContext";
import { CmsApiError } from "../api";
import "../cms.css";

export default function CmsLogin() {
  const { login, user, loading } = useCmsAuth();
  const [, navigate] = useLangAwareLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/cms/dashboard", { replace: true });
    }
  }, [loading, user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate("/cms/dashboard", { replace: true });
    } catch (err) {
      setError(
        err instanceof CmsApiError
          ? err.message
          : "Unable to sign in. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || user) {
    return (
      <div className="cms-shell flex min-h-screen items-center justify-center bg-neutral-100 dark:bg-neutral-950">
        <p className="text-sm text-neutral-500">Loading…</p>
      </div>
    );
  }

  return (
    <div
      className="cms-shell flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-neutral-100 to-neutral-200/80 px-4 dark:from-neutral-950 dark:to-neutral-900"
      dir="ltr"
    >
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200/80 bg-white/95 p-8 shadow-lg shadow-violet-500/5 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/95">
        <div className="flex flex-col items-center gap-3">
          <span className="cms-brand-mark" aria-hidden>
            Z
          </span>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              CMS sign in
            </h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Ziadah content management
            </p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cms-email">Email</Label>
            <Input
              id="cms-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cms-password">Password</Label>
            <Input
              id="cms-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>
          {error && (
            <p
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/80 dark:bg-red-950/40 dark:text-red-200"
              role="alert"
            >
              {error}
            </p>
          )}
          <Button type="submit" className="h-11 w-full" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
