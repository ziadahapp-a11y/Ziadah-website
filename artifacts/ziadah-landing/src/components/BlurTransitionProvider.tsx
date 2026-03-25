import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type RunBlur = (inner: () => void) => void;

const defaultRun: RunBlur = (inner) => {
  inner();
};

const BlurTransitionContext = createContext<RunBlur>(defaultRun);

const PEAK_MS = 220;
const HOLD_MS = 120;
const OUT_MS = 280;

export function BlurTransitionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const busyRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => () => clearAllTimers(), []);

  const run: RunBlur = useCallback((inner: () => void) => {
    if (busyRef.current) return;
    busyRef.current = true;
    clearAllTimers();

    setActive(true);

    const t1 = setTimeout(() => {
      try {
        inner();
      } finally {
        const t2 = setTimeout(() => {
          setActive(false);
          const t3 = setTimeout(() => {
            busyRef.current = false;
          }, OUT_MS + 40);
          timersRef.current.push(t3);
        }, HOLD_MS);
        timersRef.current.push(t2);
      }
    }, PEAK_MS);
    timersRef.current.push(t1);
  }, []);

  return (
    <BlurTransitionContext.Provider value={run}>
      {children}
      <div
        aria-hidden
        className={`blur-t-overlay ${active ? "blur-t-overlay--active" : ""}`}
      />
    </BlurTransitionContext.Provider>
  );
}

export function useBlurTransition() {
  return useContext(BlurTransitionContext);
}
