import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  color: string;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  born: number;
}

const COLORS = [
  "168,85,247",   // purple
  "6,182,212",    // cyan
  "236,72,153",   // pink
  "124,58,237",   // deep purple
  "99,102,241",   // indigo
  "32,201,151",   // teal/turquoise
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef(0);
  const particles = useRef<Particle[]>([]);
  const ripples = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawn(count: number) {
      for (let i = 0; i < count; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        particles.current.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.8 + 0.4,
          color,
          alpha: Math.random() * 0.5 + 0.15,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.018 + 0.008,
        });
      }
    }
    spawn(260);

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const now = performance.now();

      // Draw ripples
      ripples.current = ripples.current.filter((r) => r.alpha > 0.01);
      ripples.current.forEach((r) => {
        const age = (now - r.born) / 800;
        r.radius = r.maxRadius * Math.min(age, 1);
        r.alpha = Math.max(0, 0.55 * (1 - age));

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168,85,247,${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const inner = ctx.createRadialGradient(r.x, r.y, Math.max(0, r.radius - 20), r.x, r.y, r.radius + 20);
        inner.addColorStop(0, `rgba(124,58,237,0)`);
        inner.addColorStop(0.5, `rgba(168,85,247,${r.alpha * 0.18})`);
        inner.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius + 20, 0, Math.PI * 2);
        ctx.fillStyle = inner;
        ctx.fill();
      });

      particles.current.forEach((p, i) => {
        // Mouse repulsion / attraction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220 && dist > 0) {
          const force = (220 - dist) / 220;
          p.vx -= (dx / dist) * force * 0.032;
          p.vy -= (dy / dist) * force * 0.032;
        }

        // Velocity cap + damping
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.2) { p.vx *= 0.96; p.vy *= 0.96; }
        p.vx *= 0.998; p.vy *= 0.998;

        // Natural drift restore
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.01;
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.01;

        p.x += p.vx; p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Pulse alpha
        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        const s = p.size * (0.85 + 0.15 * Math.sin(p.pulse * 1.3));

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, s * 5);
        grd.addColorStop(0, `rgba(${p.color},${a})`);
        grd.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, s * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${Math.min(a * 1.8, 0.95)})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.current.length; j++) {
          const q = particles.current[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 160) {
            const lineAlpha = (1 - d / 160) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${p.color},${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      // Mouse aura
      if (mx > 0 && mx < W && my > 0 && my < H) {
        const aura = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
        aura.addColorStop(0, "rgba(124,58,237,0.09)");
        aura.addColorStop(0.4, "rgba(6,182,212,0.05)");
        aura.addColorStop(0.7, "rgba(32,201,151,0.03)");
        aura.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(mx, my, 280, 0, Math.PI * 2);
        ctx.fillStyle = aura;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    }
    draw();

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };

    const onClick = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      const maxR = 180;

      ripples.current.push({
        x: cx, y: cy,
        radius: 0,
        maxRadius: maxR,
        alpha: 0.55,
        born: performance.now(),
      });

      // Push nearby particles outward
      particles.current.forEach((p) => {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxR && dist > 0) {
          const force = ((maxR - dist) / maxR) * 2.8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, zIndex: 1,
        pointerEvents: "none", display: "block",
        background: "transparent",
      }}
    />
  );
}
