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

const COLORS = [
  "168,85,247",   // purple
  "6,182,212",    // cyan
  "236,72,153",   // pink
  "124,58,237",   // deep purple
  "99,102,241",   // indigo
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef(0);
  const particles = useRef<Particle[]>([]);

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
    spawn(130);

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      particles.current.forEach((p, i) => {
        // Mouse repulsion / attraction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160 && dist > 0) {
          const force = (160 - dist) / 160;
          p.vx -= (dx / dist) * force * 0.022;
          p.vy -= (dy / dist) * force * 0.022;
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
          if (d < 115) {
            const lineAlpha = (1 - d / 115) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${p.color},${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      // Mouse aura
      if (mx > 0 && mx < W && my > 0 && my < H) {
        const aura = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        aura.addColorStop(0, "rgba(124,58,237,0.06)");
        aura.addColorStop(0.5, "rgba(6,182,212,0.03)");
        aura.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(mx, my, 200, 0, Math.PI * 2);
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
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
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
