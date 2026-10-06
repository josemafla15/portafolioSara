"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// De fondo a frente.
// depth = cuánto se mueve con el cursor. exit = cómo sale al hacer scroll.
const LAYERS = [
  { src: "Background.png", depth: 0, exit: "none" },
  { src: "moon.png", depth: 0.01, exit: "up" },
  { src: "Clouds 1.png", depth: 0.02, exit: "up" },
  { src: "Clouds_Plan_2.png", depth: 0.03, exit: "up" },
  { src: "Clouds_Plan_1.png", depth: 0.04, exit: "up" },
  { src: "Mountains_Plan_2.png", depth: 0.06, exit: "down" },
  { src: "Mountains_Plan_1.png", depth: 0.08, exit: "down" },
  { src: "Trees_Plan_3.png", depth: 0.11, exit: "down" },
  { src: "Trees_Plan_2.png", depth: 0.14, exit: "down" },
  { src: "Fog.png", depth: 0.16, exit: "fade" },
  { src: "Trees_plan_1.png", depth: 0.2, exit: "down" },
];

export default function ForestParallax({
  children,
}: {
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", el);

    // Scroll: la escena queda fija y las capas salen una por una
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power1.in", duration: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=200%", // cuánto scroll dura la escena
          scrub: 1,
          pin: true,
        },
      });

      // Primero se desvanece el título
      tl.to("[data-content]", { opacity: 0, y: -40, duration: 0.5 }, 0);

      // Luego las capas, de la más cercana a la más lejana
      const exiting = layers
        .filter((layer) => layer.dataset.exit !== "none")
        .reverse();

      exiting.forEach((layer, i) => {
        const at = 0.3 + i * 0.6;
        const exit = layer.dataset.exit;
        if (exit === "down") tl.to(layer, { yPercent: 100 }, at);
        else if (exit === "up") tl.to(layer, { yPercent: -100 }, at);
        else tl.to(layer, { opacity: 0 }, at);
      });

      // Al final todo se funde a negro
      tl.to("[data-veil]", { opacity: 1, ease: "none" }, ">-0.3");
    }, el);

    // Cursor: cada capa se desplaza según su profundidad
    const movers = layers.map((layer) => ({
      depth: Number(layer.dataset.depth),
      x: gsap.quickTo(layer, "x", { duration: 0.9, ease: "power3.out" }),
      y: gsap.quickTo(layer, "y", { duration: 0.9, ease: "power3.out" }),
    }));

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      movers.forEach((m) => {
        m.x(-nx * m.depth * 600);
        m.y(-ny * m.depth * 200);
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-black">
      {LAYERS.map((layer) => (
        <div
          key={layer.src}
          data-depth={layer.depth}
          data-exit={layer.exit}
          className="absolute -inset-[8%] bg-cover bg-bottom bg-no-repeat will-change-transform"
          style={{
            backgroundImage: `url("/forest/${encodeURIComponent(layer.src)}")`,
          }}
        />
      ))}

      {/* Oscurece el bosque para que el contenido se lea */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black" />

      {/* Velo que se vuelve negro al final del scroll */}
      <div data-veil className="absolute inset-0 bg-black opacity-0" />

      <div
        data-content
        className="relative z-10 flex h-full items-center justify-center"
      >
        {children}
      </div>
    </section>
  );
}