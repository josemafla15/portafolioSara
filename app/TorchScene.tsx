"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Sprite from "./Sprite";

// Capas del bosque que sirven de fondo, de lejos a cerca
const BACKDROP = [
  "Trees_Plan_3.png",
  "Trees_Plan_2.png",
  "Fog.png",
  "Trees_plan_1.png",
];

export default function TorchScene({
  children,
}: {
  children: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Posición inicial de la luz: centrada, un poco arriba
    const rect = el.getBoundingClientRect();
    gsap.set(el, {
      "--x": `${rect.width / 2}px`,
      "--y": `${rect.height * 0.4}px`,
    });

    // La luz sigue al cursor (en pantallas táctiles se queda fija)
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        "--x": `${e.clientX - r.left}px`,
        "--y": `${e.clientY - r.top}px`,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    el.addEventListener("pointermove", onMove);

    // Parpadeo irregular, como fuego
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let flicker: gsap.core.Tween | undefined;
    const loop = () => {
      flicker = gsap.to(el, {
        "--r": `${gsap.utils.random(400, 470)}px`,
        duration: gsap.utils.random(0.08, 0.25),
        ease: "sine.inOut",
        onComplete: loop,
      });
    };
    if (!reduced) loop();

    return () => {
      el.removeEventListener("pointermove", onMove);
      flicker?.kill();
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-black"
      style={
        { "--x": "50%", "--y": "40%", "--r": "430px" } as React.CSSProperties
      }
    >
      {BACKDROP.map((src) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat brightness-125 saturate-150"
          style={{
            backgroundImage: `url("/forest/${encodeURIComponent(src)}")`,
          }}
        />
      ))}

      {/* Noche azulada con un hueco de luz cálida donde está la antorcha */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle var(--r) at var(--x) var(--y), rgba(255,150,50,0.18) 0%, rgba(8,16,36,0.6) 60%, rgba(4,10,24,0.82) 100%)",
        }}
      />

      {/* Empalme con el negro en que termina el bosque de arriba */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />

      {/* Antorchas a los lados de la terminal (solo en pantallas grandes) */}
      <div className="pointer-events-none absolute inset-0 mx-auto hidden max-w-6xl items-center justify-between px-6 lg:flex">
        {[0, 1].map((i) => (
          <div key={i} className="relative">
            <div className="absolute -inset-24 animate-pulse rounded-full bg-amber-500/20 blur-3xl" />
            <Sprite
              src="/torch/torcia.png"
              frames={6}
              frameW={32}
              frameH={32}
              scale={4}
              className="relative"
            />
          </div>
        ))}
      </div>

      {/* z-50: por encima de las luciérnagas (z-40), que pasan por detrás de la terminal */}
      <div className="relative z-50">{children}</div>
    </section>
  );
}