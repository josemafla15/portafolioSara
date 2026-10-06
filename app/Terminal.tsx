"use client";

import { useEffect, useRef, useState } from "react";
import { COMMANDS, PROMPT } from "./data";

type Line = { kind: "in" | "out"; text: string };

const out = (texts: string[]): Line[] =>
  texts.map((text) => ({ kind: "out", text }));

const INTRO: Line[] = [
  { kind: "in", text: "whoami" },
  ...out(COMMANDS.whoami),
  ...out(["", "Type 'help' to see available commands."]),
];

// Comandos que llevan a una card (el id de la card es el mismo nombre)
const SECTIONS = ["whoami", "path", "skills", "signal"];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(INTRO);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Mantiene la vista en la última línea
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    // Acepta "path", "/path" y "~/path"
    const cmd = raw.trim().toLowerCase().replace(/^~?\//, "");
    if (!cmd) return;

    // clear vuelve al estado inicial: conserva el whoami y la pista del help
    if (cmd === "clear") {
      setLines(INTRO);
      return;
    }

    const result = COMMANDS[cmd] ?? [
      `command not found: ${cmd}. Type 'help'.`,
    ];

    setLines((prev) => [...prev, { kind: "in", text: raw }, ...out(result)]);

    // Después de mostrar la respuesta, baja hasta la card correspondiente
    if (SECTIONS.includes(cmd)) {
      setTimeout(() => {
        document.getElementById(cmd)?.scrollIntoView({ behavior: "smooth" });
      }, 900);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-24">
      <div
        onClick={() => inputRef.current?.focus()}
        className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/15 bg-black/30 font-mono text-sm shadow-2xl shadow-black/60 backdrop-blur-[5px] backdrop-saturate-150"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="ml-3 text-xs text-white/40">sara@forest: ~</span>
        </div>

        <div
          ref={bodyRef}
          className="h-[60vh] overflow-y-auto p-4 leading-relaxed"
        >
          {lines.map((line, i) =>
            line.kind === "in" ? (
              <p key={i}>
                <span className="text-amber-300">{PROMPT}</span> {line.text}
              </p>
            ) : (
              <p key={i} className="whitespace-pre-wrap text-white/85">
                {line.text || "\u00A0"}
              </p>
            )
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(value);
              setValue("");
            }}
            className="flex gap-2"
          >
            <label htmlFor="cmd" className="text-amber-300">
              {PROMPT}
            </label>
            <input
              id="cmd"
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="flex-1 bg-transparent text-white caret-amber-300 outline-none"
            />
          </form>
        </div>
      </div>
    </section>
  );
}