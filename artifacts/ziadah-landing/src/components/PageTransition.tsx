import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { particlePositions } from "./ParticleBackground";

type TransitionState = "idle" | "zoom-in" | "zoom-out";

interface TransitionOverlay {
  x: number;
  y: number;
  color: string;
}

// Call this instead of wouter's navigate to trigger the transition
let _triggerTransition: ((path: string) => void) | null = null;

export function navigateTo(path: string) {
  if (_triggerTransition) {
    _triggerTransition(path);
  }
}

// Use this for hash-fragment links like /#faq or /#pricing
// If already on the base path, smooth-scroll directly; otherwise navigate first then scroll
export function navigateToHash(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    navigateTo(href);
    return;
  }
  const hash = href.slice(hashIndex + 1);
  const basePath = href.slice(0, hashIndex) || "/";
  const currentPath = window.location.pathname;

  const scrollToTarget = () => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (currentPath === basePath || (basePath === "/" && currentPath === "/")) {
    scrollToTarget();
  } else {
    navigateTo(basePath);
    // Retry until the target element appears in the DOM (or give up after 2s)
    const start = Date.now();
    const poll = () => {
      if (document.getElementById(hash)) {
        scrollToTarget();
      } else if (Date.now() - start < 2000) {
        setTimeout(poll, 50);
      }
    };
    setTimeout(poll, 100);
  }
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();
  const [state, setState] = useState<TransitionState>("idle");
  const [overlay, setOverlay] = useState<TransitionOverlay | null>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const pendingPath = useRef<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const findNearestParticle = useCallback(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    let nearest = { x: cx, y: cy, color: "168,85,247" };
    let minDist = Infinity;

    for (const p of particlePositions) {
      const d = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
      if (d < minDist) {
        minDist = d;
        nearest = p;
      }
    }
    return nearest;
  }, []);

  const runZoomIn = useCallback((particle: TransitionOverlay, onComplete: () => void) => {
    const canvas = canvasRef.current;
    if (!canvas) { onComplete(); return; }
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const start = performance.now();
    const duration = 420;

    function frame(now: number) {
      const t = Math.min((now - start) / duration, 1);
      // ease in cubic
      const e = t * t * t;
      const maxR = Math.sqrt(canvas!.width ** 2 + canvas!.height ** 2);
      const r = 2 + e * maxR * 1.1;

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      const grd = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, r);
      grd.addColorStop(0, `rgba(${particle.color},1)`);
      grd.addColorStop(0.4, `rgba(${particle.color},0.95)`);
      grd.addColorStop(1, `rgba(${particle.color},0)`);

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, r, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      if (t < 1) {
        animRef.current = requestAnimationFrame(frame);
      } else {
        // Fill screen fully before switching
        ctx.fillStyle = `rgba(${particle.color},1)`;
        ctx.fillRect(0, 0, canvas!.width, canvas!.height);
        onComplete();
      }
    }
    animRef.current = requestAnimationFrame(frame);
  }, []);

  const runZoomOut = useCallback((particle: TransitionOverlay, onComplete: () => void) => {
    const canvas = canvasRef.current;
    if (!canvas) { onComplete(); return; }
    const ctx = canvas.getContext("2d")!;

    const maxR = Math.sqrt(canvas.width ** 2 + canvas.height ** 2) * 1.1;
    const start = performance.now();
    const duration = 380;

    function frame(now: number) {
      const t = Math.min((now - start) / duration, 1);
      // ease out cubic
      const e = 1 - (1 - t) * (1 - t) * (1 - t);
      const r = maxR * (1 - e);

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      // Background fill that shrinks
      ctx.fillStyle = `rgba(${particle.color},1)`;
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);

      // Cut a hole from the particle outward
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      const grd = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, r);
      grd.addColorStop(0, "rgba(0,0,0,1)");
      grd.addColorStop(0.85, "rgba(0,0,0,1)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, r, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.restore();

      if (t < 1) {
        animRef.current = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        onComplete();
      }
    }
    animRef.current = requestAnimationFrame(frame);
  }, []);

  const triggerTransition = useCallback((path: string) => {
    if (state !== "idle") return;
    const particle = findNearestParticle();
    pendingPath.current = path;
    setOverlay(particle);
    setState("zoom-in");

    runZoomIn(particle, () => {
      // Switch page content
      navigate(path);
      setDisplayChildren(null); // brief blank
      setState("zoom-out");

      // Small delay so new page mounts
      setTimeout(() => {
        setDisplayChildren(children);
        runZoomOut(particle, () => {
          setState("idle");
          setOverlay(null);
          cancelAnimationFrame(animRef.current);
        });
      }, 40);
    });
  }, [state, findNearestParticle, navigate, runZoomIn, runZoomOut, children]);

  // Register global trigger
  useEffect(() => {
    _triggerTransition = triggerTransition;
    return () => { _triggerTransition = null; };
  }, [triggerTransition]);

  // Keep displayChildren in sync when idle
  useEffect(() => {
    if (state === "idle") {
      setDisplayChildren(children);
    }
  }, [children, state]);

  return (
    <>
      {displayChildren}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: state !== "idle" ? "all" : "none",
          display: "block",
        }}
      />
    </>
  );
}
