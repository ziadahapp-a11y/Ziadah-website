import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { IDLE_RUNTIME, startMotion, type MotionRuntime } from "./runtime";

const MotionContext = createContext<MotionRuntime>(IDLE_RUNTIME);

/** The live scroll system. `gsap`/`ScrollTrigger` are null until it has booted
 *  (and stay null under reduced-motion or a failed load) — always guard. */
export function useMotion(): MotionRuntime {
  return useContext(MotionContext);
}

/**
 * Owns the single Lenis instance for the whole app. Mounted once at the root,
 * above the router, so navigating between routes never recreates the scroll
 * system — only the per-element triggers below it are rebuilt.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [runtime, setRuntime] = useState<MotionRuntime>(IDLE_RUNTIME);

  useEffect(() => {
    let alive = true;
    startMotion().then((r) => {
      if (alive) setRuntime(r);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Reduced-motion is a live media query: someone can turn it on mid-session.
  // Reload-free teardown of Lenis is not worth the complexity, but stopping it
  // and killing scrubbed motion is, so the page immediately obeys the setting.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (!mq.matches) return;
      runtime.lenis?.stop();
      runtime.ScrollTrigger?.getAll().forEach((t) => t.kill(false));
      document.documentElement.removeAttribute("data-motion-ready");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [runtime]);

  return <MotionContext.Provider value={runtime}>{children}</MotionContext.Provider>;
}

/**
 * ScrollTrigger caches every trigger's start/end pixel positions. A route
 * change swaps the whole document under it, so those positions must be
 * recomputed — otherwise reveals on the new page fire at the old page's
 * scroll offsets. Also refreshes after fonts settle, since Arabic web fonts
 * change block heights measurably.
 */
export function useScrollTriggerRefresh(dependency: unknown) {
  const { ScrollTrigger } = useMotion();
  const first = useRef(true);

  useEffect(() => {
    if (!ScrollTrigger) return;
    // Let the new route paint before measuring it.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    let fontsDone: Promise<unknown> | undefined;
    if (first.current) {
      first.current = false;
      fontsDone = document.fonts?.ready;
      fontsDone?.then(() => ScrollTrigger.refresh()).catch(() => {});
    }
    return () => cancelAnimationFrame(raf);
  }, [ScrollTrigger, dependency]);
}
