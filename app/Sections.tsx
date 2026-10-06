import ContactForm from "./ContactForm";
import PosterCard, { Glass } from "./PosterCard";

const SKILLS: Record<string, string[]> = {
  Security: ["Fortinet / FortiOS", "Access control", "Virtualization", "Isolated environments"],
  Backend: ["Django", "Spring Boot", "Node.js", "Express", "REST", "Microservices"],
  Frontend: ["React", "Next.js", "Svelte", "Angular", "TypeScript", "Flutter"],
  "Data & DevOps": ["PostgreSQL", "MongoDB", "Supabase", "Docker", "PySpark", "Power BI"],
};

export default function Sections() {
  return (
    <div className="flex flex-col gap-10 px-4 py-24">
      <PosterCard
        id="whoami"
        tag="01 — ~/whoami"
        title={["Who", "I am"]}
        highlight={1}
        layers={["Background.png", "moon.png", "Mountains_Plan_2.png", "Mountains_Plan_1.png"]}
        tint="bg-indigo-600/40"
      >
        <Glass label="Profile">
          Final-semester Software Engineering student with 2+ years of
          full-stack experience and a solid foundation in cybersecurity.
          Hackathon winner and Junior Researcher.
        </Glass>
        <div className="grid grid-cols-3 gap-4">
          <Glass label="Experience">2+ years</Glass>
          <Glass label="Certified">NSE 4</Glass>
          <Glass label="Based in">Pasto, CO</Glass>
        </div>

        <a
          href="/CVHarvardSaraOjedaLop.pdf"
          download="Sara-Ojeda-CV.pdf"
          className="flex items-center justify-center gap-3 rounded-xl bg-amber-400 px-5 py-4 font-mono text-sm font-semibold text-black transition hover:bg-amber-300"
        >
          <span aria-hidden>↓</span>
          Download CV
          <span className="font-normal text-black/60">PDF</span>
        </a>
      </PosterCard>

      <PosterCard
        id="path"
        tag="02 — ~/path"
        title={["The", "Path"]}
        highlight={1}
        layers={["Background.png", "Trees_Plan_3.png", "Trees_Plan_2.png", "Fog.png"]}
        tint="bg-teal-600/40"
      >
        <Glass label="Oct 2025 – Jan 2026 · UCC, Semillero Intitech">
          <strong>Junior Researcher · Full Stack Developer · Project Lead.</strong>{" "}
          Designed and built a platform for the analysis and treatment of
          phobias: architecture, backend, frontend and data model, under XP.
        </Glass>
        <Glass label="Education">
          B.Sc. Software Engineering — Universidad Cooperativa de Colombia
          <br />
          Technical Degree in Systems — CINAR Sistemas
          <br />
          Technical Degree in Electronics — CINAR Sistemas
        </Glass>
      </PosterCard>

      <PosterCard
        id="skills"
        tag="03 — ~/skills"
        title={["The", "Stack"]}
        highlight={1}
        layers={["Background.png", "Trees_Plan_2.png", "Trees_plan_1.png"]}
        tint="bg-amber-700/40"
      >
        {Object.entries(SKILLS).map(([group, items]) => (
          <Glass key={group} label={group}>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </Glass>
        ))}
      </PosterCard>

      <PosterCard
        id="signal"
        tag="04 — ~/signal"
        title={["Send a", "Signal"]}
        highlight={1}
        layers={["Background.png", "Clouds_Plan_2.png", "Clouds_Plan_1.png", "moon.png", "Trees_Plan_3.png"]}
        tint="bg-violet-700/40"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Glass label="Certification">
            Fortinet NSE 4 — FortiOS 7.6 Administrator (July 2026)
          </Glass>
          <Glass label="Award">Winner — PotenCIA Summit Hackathon 2024</Glass>
        </div>

        <ContactForm />

        <a
          href="mailto:saramariaojeda9559@gmail.com"
          className="text-center font-mono text-xs text-white/50 underline underline-offset-4 hover:text-white"
        >
          or write to saramariaojeda9559@gmail.com
        </a>
      </PosterCard>
    </div>
  );
}