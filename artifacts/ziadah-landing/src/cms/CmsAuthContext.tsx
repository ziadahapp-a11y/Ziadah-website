import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CmsApiError, cmsApi, getStoredToken, setStoredToken, type CmsUser } from "./api";

type CmsAuthState = {
  user: CmsUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const CmsAuthContext = createContext<CmsAuthState | null>(null);

export function CmsAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CmsUser | null>(null);
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    const t = getStoredToken();
    if (!t) {
      setUser(null);
      setToken(null);
      return;
    }
    setToken(t);
    try {
      const me = await cmsApi.me();
      setUser(me);
      setError(null);
    } catch (e) {
      setUser(null);
      setStoredToken(null);
      setToken(null);
      if (e instanceof CmsApiError && e.status === 401) {
        setError(null);
      }
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getStoredToken()) {
        if (!cancelled) {
          setLoading(false);
        }
        return;
      }
      try {
        const me = await cmsApi.me();
        if (!cancelled) {
          setUser(me);
        }
      } catch {
        if (!cancelled) {
          setStoredToken(null);
          setUser(null);
          setToken(null);
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
    const { token: jwt, user: u } = await cmsApi.login(email, password);
    setStoredToken(jwt);
    setToken(jwt);
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    setStoredToken(null);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      login,
      logout,
      refreshUser,
    }),
    [user, token, loading, error, login, logout, refreshUser],
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
