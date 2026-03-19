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

// Exposed so the transition system can read particle positions
export const particlePositions: { x: number; y: number; color: string }[] = [];

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
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.4 + 0.4,
          color,
          alpha: Math.random() * 0.3 + 0.08,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.014 + 0.006,
        });
      }
    }
    spawn(65);

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Sync exposed positions array
      particlePositions.length = 0;

      particles.current.forEach((p, i) => {
        // Mouse repulsion
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
          const force = (130 - dist) / 130;
          p.vx -= (dx / dist) * force * 0.016;
          p.vy -= (dy / dist) * force * 0.016;
        }

        // Velocity cap + damping
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.0) { p.vx *= 0.96; p.vy *= 0.96; }
        p.vx *= 0.998; p.vy *= 0.998;

        // Natural drift restore
        if (Math.abs(p.vx) < 0.04) p.vx += (Math.random() - 0.5) * 0.008;
        if (Math.abs(p.vy) < 0.04) p.vy += (Math.random() - 0.5) * 0.008;

        p.x += p.vx; p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Pulse alpha
        const a = p.alpha * (0.75 + 0.25 * Math.sin(p.pulse));
        const s = p.size * (0.9 + 0.1 * Math.sin(p.pulse * 1.3));

        // Subtle glow only - no heavy radial gradient
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, s * 3);
        grd.addColorStop(0, `rgba(${p.color},${a * 0.5})`);
        grd.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, s * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${Math.min(a * 1.5, 0.75)})`;
        ctx.fill();

        // Connect nearby particles - tighter range, lighter lines
        for (let j = i + 1; j < particles.current.length; j++) {
          const q = particles.current[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 90) {
            const lineAlpha = (1 - d / 90) * 0.07;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${p.color},${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Expose position for transition system
        particlePositions.push({ x: p.x, y: p.y, color: p.color });
      });

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
