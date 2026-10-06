"use client";

import { useEffect, useRef } from "react";

export default function Fireflies({ count = 45 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2,
      speed: 0.15 + Math.random() * 0.4,
      sway: Math.random() * Math.PI * 2,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.shadowColor = "rgba(255,170,60,0.9)";
      ctx.shadowBlur = 10;

      for (const d of dots) {
        d.y -= d.speed;
        d.sway += 0.01;
        d.twinkle += 0.03;
        d.x += Math.sin(d.sway) * 0.3;

        // Al salir por arriba, vuelve a entrar por abajo
        if (d.y < -10) {
          d.y = h + 10;
          d.x = Math.random() * w;
        }

        const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(d.twinkle));
        ctx.fillStyle = `rgba(255,190,90,${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
}