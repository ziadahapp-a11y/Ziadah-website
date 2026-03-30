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

/** نقاط وروابط محايدة (بدون ألوان مميزة) */
const NEUTRAL_RGB = "200,200,200";

function particleZoneHeight(fullViewportH: number): number {
  return Math.max(220, Math.min(Math.round(fullViewportH * 0.44), 720));
}

const MOUSE_RADIUS = 240;
const SPEED_SCALE = 0.4;
const MOUSE_REPULSE = 0.052 * SPEED_SCALE;
const MOUSE_FLOW_STRENGTH = 0.085 * SPEED_SCALE;
const VELOCITY_DECAY = 0.988;
const FLOAT_STRENGTH = 0.017 * SPEED_SCALE;
const DRIFT_TIME = 0.00009 * SPEED_SCALE;
const SPEED_CAP = 1.62 * SPEED_SCALE;
const JITTER = 0.024 * SPEED_SCALE;
const INIT_VEL = 0.52 * SPEED_SCALE;


function isMobile(w: number) { return w < 768; }
function isTablet(w: number) { return w < 1024; }

function particleCountForScreen(w: number, zoneH: number): number {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return isMobile(w) ? 30 : 60;
  }
  if (isMobile(w)) return 28;
  if (isTablet(w)) return 56;
  const area = w * zoneH;
  return Math.min(180, Math.max(72, Math.floor(area / 4800)));
}

function linkDistForScreen(w: number): number {
  if (isMobile(w)) return 58;
  if (isTablet(w)) return 72;
  return 88;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const prevMouse = useRef({ x: -9999, y: -9999 });
  const mouseVel = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const particles = useRef<Particle[]>([]);
  const logicalSize = useRef({ w: 1, h: 1 });
  const frameCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function rebuildParticles(w: number, zoneH: number) {
      const count = particleCountForScreen(w, zoneH);
      particles.current = [];
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: Math.random() * w,
          y: Math.random() * zoneH,
          vx: (Math.random() - 0.5) * INIT_VEL,
          vy: (Math.random() - 0.5) * INIT_VEL,
          size: Math.random() * 1.55 + 0.35,
          color: NEUTRAL_RGB,
          alpha: Math.random() * 0.34 + 0.1,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: (Math.random() * 0.022 + 0.009) * SPEED_SCALE,
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, window.innerWidth);
      const fullH = Math.max(1, window.innerHeight);
      const zoneH = particleZoneHeight(fullH);
      logicalSize.current = { w, h: zoneH };
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(zoneH * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${zoneH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildParticles(w, zoneH);
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
    }

    function draw() {
      const { w: W, h: H } = logicalSize.current;
      const mobile = isMobile(W);

      frameCount.current++;

      // على الجوال: 30fps بدلاً من 60fps (تخطي إطار من كل اثنين)
      if (mobile && frameCount.current % 2 !== 0) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // تحويل الماوس إلى مساحة منطقة النقاط (للفيزياء فقط، بدون توهج لوني)
      const vw = Math.max(1, window.innerWidth);
      const vh = Math.max(1, window.innerHeight);
      const mx = (mouse.current.x / vw) * W;
      const my = (mouse.current.y / vh) * H;
      const mvx = (mouseVel.current.x / vw) * W;
      const mvy = (mouseVel.current.y / vh) * H;
      mouseVel.current.x *= 0.88;
      mouseVel.current.y *= 0.88;

      const speed = Math.hypot(mvx, mvy);
      const flowMag = Math.min(speed / 14, 1.2);

      const pts = particles.current;
      const n = pts.length;
      const LINK_DIST = linkDistForScreen(W);
      const LINK_ALPHA_BASE = mobile ? 0.06 : 0.088;

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

        const driftT = performance.now() * DRIFT_TIME;
        const ph = i * 0.17;
        p.vx +=
          Math.sin(p.y * 0.0068 + driftT + ph) * FLOAT_STRENGTH +
          Math.cos(p.x * 0.0048 + driftT * 0.62 + ph * 0.7) * (FLOAT_STRENGTH * 0.72);
        p.vy +=
          Math.cos(p.x * 0.0068 + driftT * 0.9 + ph) * FLOAT_STRENGTH +
          Math.sin(p.y * 0.0048 + driftT * 0.55 + ph * 0.8) * (FLOAT_STRENGTH * 0.72);

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > SPEED_CAP) {
          const invS = SPEED_CAP / spd;
          p.vx *= invS;
          p.vy *= invS;
        }
        p.vx *= VELOCITY_DECAY;
        p.vy *= VELOCITY_DECAY;

        if (Math.abs(p.vx) < 0.09 * SPEED_SCALE) p.vx += (Math.random() - 0.5) * JITTER;
        if (Math.abs(p.vy) < 0.09 * SPEED_SCALE) p.vy += (Math.random() - 0.5) * JITTER;

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < -12) p.x = W + 12;
        if (p.x > W + 12) p.x = -12;
        if (p.y < -12) p.y = H + 12;
        if (p.y > H + 12) p.y = -12;

        const a = p.alpha * (0.72 + 0.28 * Math.sin(p.pulse));
        const s = p.size * (0.88 + 0.12 * Math.sin(p.pulse * 1.35));

        if (mobile) {
          // على الجوال: نقطة بسيطة بدون gradient لتوفير الذاكرة
          ctx.beginPath();
          ctx.arc(p.x, p.y, s * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${Math.min(a * 1.2, 0.7)})`;
          ctx.fill();
        } else {
          const glowR = s * 3;
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          const glowA = a * 0.45;
          grd.addColorStop(0, `rgba(${p.color},${glowA})`);
          grd.addColorStop(1, `rgba(${p.color},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${Math.min(a * 1.35, 0.88)})`;
          ctx.fill();
        }

        // رسم الروابط بين الجسيمات
        for (let j = i + 1; j < n; j++) {
          const q = pts[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < LINK_DIST) {
            let lineAlpha = (1 - d / LINK_DIST) * LINK_ALPHA_BASE;
            if (!mobile) {
              ctx.lineWidth = 0.55;
            } else {
              lineAlpha = Math.min(lineAlpha, 0.15);
              ctx.lineWidth = 0.4;
            }
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${p.color},${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    }
    draw();

    const onMove = (e: MouseEvent) => { setPointer(e.clientX, e.clientY); };
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
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1,
        pointerEvents: "none",
        display: "block",
        background: "transparent",
      }}
    />
  );
}
