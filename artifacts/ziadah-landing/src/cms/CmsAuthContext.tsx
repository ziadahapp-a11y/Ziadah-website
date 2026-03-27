import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CmsApiError, cmsApi, type CmsUser } from "./api";

type CmsAuthState = {
  user: CmsUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const CmsAuthContext = createContext<CmsAuthState | null>(null);

export function CmsAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CmsUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    try {
      const me = await cmsApi.me();
      setUser(me);
      setError(null);
    } catch (e) {
      if (e instanceof CmsApiError && e.status === 401) {
        try {
          const refreshed = await cmsApi.refresh();
          setUser(refreshed.user);
          setError(null);
          return;
        } catch {
          setUser(null);
          setError(null);
          return;
        }
      }
      setUser(null);
      setError(
        e instanceof CmsApiError
          ? e.message
          : "Could not verify your session. Check your connection and try again.",
      );
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await cmsApi.me();
        if (!cancelled) {
          setUser(me);
          setError(null);
        }
      } catch (e) {
        if (cancelled) return;
        if (e instanceof CmsApiError && e.status === 401) {
          try {
            const refreshed = await cmsApi.refresh();
            if (!cancelled) {
              setUser(refreshed.user);
              setError(null);
            }
          } catch {
            if (!cancelled) {
              setUser(null);
              setError(null);
            }
          }
        } else {
          setUser(null);
          setError(
            e instanceof CmsApiError
              ? e.message
              : "Could not verify your session. Check your connection and try again.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    const { user: u } = await cmsApi.login(email, password);
    setUser(u);
  }, []);

  const logout = useCallback(async () => {
    try {
      await cmsApi.logout();
    } catch {
      // Best effort: always clear local auth state.
    } finally {
      setUser(null);
      setError(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
      refreshUser,
    }),
    [user, loading, error, login, logout, refreshUser],
  );

  return (
    <CmsAuthContext.Provider value={value}>{children}</CmsAuthContext.Provider>
  );
}

export function useCmsAuth(): CmsAuthState {
  const ctx = useContext(CmsAuthContext);
  if (!ctx) {
    throw new Error("useCmsAuth must be used within CmsAuthProvider");
  }
  return ctx;
}
