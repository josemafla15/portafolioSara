import { Anton } from "next/font/google";
import Sprite from "./Sprite";

const display = Anton({ weight: "400", subsets: ["latin"] });

export function Glass({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-sm">
      <p className="font-mono text-xs uppercase tracking-widest text-amber-300/80">
        {label}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-white/85">
        {children}
      </div>
    </div>
  );
}

export default function PosterCard({
  id,
  tag,
  title,
  highlight,
  layers,
  tint,
  children,
}: {
  id: string;
  tag: string;
  title: string[];
  highlight: number; // índice de la línea del título que va en ámbar
  layers: string[]; // capas del bosque, de fondo a frente
  tint: string; // clase de color que tiñe la escena
  children: React.ReactNode;
}) {
  return (
    <article
      id={id}
      className="relative z-50 mx-auto min-h-[70vh] w-full max-w-6xl scroll-mt-8 overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-[2px]"
    >
      {/* Escena del bosque, semitransparente para que se vea lo que pasa detrás */}
      <div className="absolute inset-0 opacity-35">
        {layers.map((src) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
            style={{
              backgroundImage: `url("/forest/${encodeURIComponent(src)}")`,
            }}
          />
        ))}

        {/* Tinte de color propio de cada card */}
        <div className={`absolute inset-0 mix-blend-color ${tint}`} />
      </div>

      {/* Oscurece el lado del título para que se lea */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

      {/* Lámpara colgando del borde superior, entre el título y la info */}
      <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 md:block">
        <div className="absolute -inset-20 animate-pulse rounded-full bg-amber-500/25 blur-3xl" />
        <Sprite
          src="/torch/lampada fiamma.png"
          frames={6}
          frameW={32}
          frameH={64}
          scale={4}
          className="relative"
        />
      </div>

      <div className="relative grid min-h-[70vh] gap-8 p-8 md:grid-cols-2 md:p-12">
        <header className="flex flex-col justify-between gap-8">
          <span className="font-mono text-xs tracking-widest text-white/50">
            {tag}
          </span>
          <h2
            className={`${display.className} text-6xl uppercase leading-[0.9] md:text-8xl`}
          >
            {title.map((line, i) => (
              <span
                key={line}
                className={`block ${
                  i === highlight ? "text-amber-400" : "text-white"
                }`}
              >
                {line}
              </span>
            ))}
          </h2>
        </header>

        <div className="flex flex-col justify-end gap-4">{children}</div>
      </div>
    </article>
  );
}