import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = [
  "168,85,247", // purple
  "6,182,212", // cyan
  "236,72,153", // pink
  "124,58,237", // deep purple
  "99,102,241", // indigo
];

/** تفاعل أقوى مع الماوس */
const MOUSE_RADIUS = 240;
const MOUSE_REPULSE = 0.052;
const MOUSE_FLOW_STRENGTH = 0.085;
const LINK_DIST = 108;
const LINK_ALPHA_BASE = 0.095;
const VELOCITY_DECAY = 0.985;

export const particlePositions: { x: number; y: number; color: string }[] = [];

function particleCountForScreen(w: number, h: number): number {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return 48;
  }
  const area = w * h;
  // أكثر نقاط على الشاشات الكبيرة، مع سقف للأداء (حلقة الروابط ~ n²/2)
  return Math.min(165, Math.max(95, Math.floor(area / 9500)));
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const prevMouse = useRef({ x: -9999, y: -9999 });
  const mouseVel = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const particles = useRef<Particle[]>([]);
  const cursorGlow = useRef(0);
  /** أبعاد منطقية (CSS px) تطابق resize + setTransform(dpr) — لا نعتمد innerWidth في كل إطار */
  const logicalSize = useRef({ w: 1, h: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function rebuildParticles(w: number, h: number) {
      const count = particleCountForScreen(w, h);
      particles.current = [];
      for (let i = 0; i < count; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        particles.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.55 + 0.35,
          color,
          alpha: Math.random() * 0.34 + 0.1,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.016 + 0.007,
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, window.innerWidth);
      const h = Math.max(1, window.innerHeight);
      logicalSize.current = { w, h };
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildParticles(w, h);
    }

    resize();
    window.addEventListener("resize", resize);

    function setPointer(clientX: number, clientY: number) {
      const vx = clientX - prevMouse.current.x;
      const vy = clientY - prevMouse.current.y;
      if (prevMouse.current.x > -5000) {
        mouseVel.current.x = mouseVel.current.x * 0.65 + vx * 0.35;
        mouseVel.current.y = mouseVel.current.y * 0.65 + vy * 0.35;
      }
      prevMouse.current = { x: clientX, y: clientY };
      mouse.current.x = clientX;
      mouse.current.y = clientY;
      cursorGlow.current = Math.min(1, cursorGlow.current + 0.22);
    }

    function draw() {
      const { w: W, h: H } = logicalSize.current;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const mvx = mouseVel.current.x;
      const mvy = mouseVel.current.y;
      mouseVel.current.x *= 0.88;
      mouseVel.current.y *= 0.88;
      cursorGlow.current *= 0.94;

      const speed = Math.hypot(mvx, mvy);
      const flowMag = Math.min(speed / 14, 1.2);

      // هالة خفيفة تتبع الماوس وتقوى مع الحركة
      if (mx > -1000 && cursorGlow.current > 0.04) {
        const r = 55 + flowMag * 45 + cursorGlow.current * 35;
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, r);
        g.addColorStop(0, `rgba(168,85,247,${0.12 * cursorGlow.current})`);
        g.addColorStop(0.35, `rgba(124,58,237,${0.06 * cursorGlow.current})`);
        g.addColorStop(0.7, `rgba(6,182,212,${0.04 * cursorGlow.current})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(mx, my, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      particlePositions.length = 0;

      const pts = particles.current;
      const n = pts.length;

      for (let i = 0; i < n; i++) {
        const p = pts[i];

        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 1) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) ** 1.15;
          const inv = 1 / dist;
          p.vx -= dx * inv * force * MOUSE_REPULSE;
          p.vy -= dy * inv * force * MOUSE_REPULSE;
          if (flowMag > 0.08) {
            p.vx += mvx * 0.004 * force * MOUSE_FLOW_STRENGTH * 12;
            p.vy += mvy * 0.004 * force * MOUSE_FLOW_STRENGTH * 12;
          }
        }

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.35) {
          p.vx *= 0.94;
          p.vy *= 0.94;
        }
        p.vx *= VELOCITY_DECAY;
        p.vy *= VELOCITY_DECAY;

        if (Math.abs(p.vx) < 0.045) p.vx += (Math.random() - 0.5) * 0.012;
        if (Math.abs(p.vy) < 0.045) p.vy += (Math.random() - 0.5) * 0.012;

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < -12) p.x = W + 12;
        if (p.x > W + 12) p.x = -12;
        if (p.y < -12) p.y = H + 12;
        if (p.y > H + 12) p.y = -12;

        const a = p.alpha * (0.72 + 0.28 * Math.sin(p.pulse));
        const s = p.size * (0.88 + 0.12 * Math.sin(p.pulse * 1.35));

        const nearMouse = dist < MOUSE_RADIUS ? (MOUSE_RADIUS - dist) / MOUSE_RADIUS : 0;
        const glowR = s * (3 + nearMouse * 1.8);

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        const glowA = a * (0.45 + nearMouse * 0.35);
        grd.addColorStop(0, `rgba(${p.color},${glowA})`);
        grd.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, s * (1 + nearMouse * 0.25), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${Math.min(a * (1.35 + nearMouse * 0.5), 0.88)})`;
        ctx.fill();

        for (let j = i + 1; j < n; j++) {
          const q = pts[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < LINK_DIST) {
            const midX = (p.x + q.x) * 0.5;
            const midY = (p.y + q.y) * 0.5;
            const md = Math.hypot(mx - midX, my - midY);
            const mouseBoost = md < MOUSE_RADIUS ? (1 - md / MOUSE_RADIUS) * 0.55 : 0;
            let lineAlpha = (1 - d / LINK_DIST) * LINK_ALPHA_BASE * (1 + mouseBoost);
            lineAlpha = Math.min(lineAlpha, 0.22);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${p.color},${lineAlpha})`;
            ctx.lineWidth = 0.55 + mouseBoost * 0.45;
            ctx.stroke();
          }
        }

        particlePositions.push({ x: p.x, y: p.y, color: p.color });
      }

      frameRef.current = requestAnimationFrame(draw);
    }
    draw();

    const onMove = (e: MouseEvent) => {
      setPointer(e.clientX, e.clientY);
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      setPointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
      prevMouse.current = { x: -9999, y: -9999 };
      mouseVel.current.x = 0;
      mouseVel.current.y = 0;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        display: "block",
        background: "transparent",
      }}
    />
  );
}
