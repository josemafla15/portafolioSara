import { Anton } from "next/font/google";
import Fireflies from "./Fireflies";
import ForestParallax from "./ForestParallax";
import Sections from "./Sections";
import Terminal from "./Terminal";
import TorchScene from "./TorchScene";

const display = Anton({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Fireflies />

      <ForestParallax>
        <div className="px-6 text-center">
          <p className="font-mono text-xs tracking-[0.4em] text-white/60">
            SOFTWARE ENGINEER · SECURITY
          </p>

          <h1
            className={`${display.className} mt-6 text-6xl uppercase leading-[0.9] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] md:text-9xl`}
          >
            <span className="block">Sara María</span>
            <span className="block">Ojeda</span>
            <span className="block text-amber-400">Portfolio</span>
          </h1>

          <p className="mt-10 font-mono text-xs tracking-widest text-white/50">
            SCROLL ↓
          </p>
        </div>
      </ForestParallax>

      <TorchScene>
        <Terminal />
      </TorchScene>

      <Sections />
    </main>
  );
}