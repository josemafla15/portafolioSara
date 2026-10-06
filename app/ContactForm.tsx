"use client";

import { useState } from "react";

const FORMSPREE_ID = "xvkzgpdy";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 font-mono text-sm text-white placeholder:text-white/35 outline-none transition focus:border-amber-300/70";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-amber-300/40 bg-white/[0.06] p-6 font-mono text-sm backdrop-blur-sm">
        <p className="text-amber-300">Signal received.</p>
        <p className="mt-2 text-white/70">
          Thanks for reaching out. Sara will get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs text-white/50 underline underline-offset-4 hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          required
          autoComplete="name"
          placeholder="Your name"
          aria-label="Your name"
          className={field}
        />
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          aria-label="Your email"
          className={field}
        />
      </div>

      <textarea
        name="message"
        required
        rows={4}
        placeholder="Your message"
        aria-label="Your message"
        className={`${field} resize-none`}
      />

      {/* Trampa para bots: los humanos no ven ni llenan este campo */}
      <input
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-xl bg-amber-400 px-5 py-4 font-mono text-sm font-semibold text-black transition hover:bg-amber-300 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send signal"}
      </button>

      {status === "error" && (
        <p role="alert" className="font-mono text-xs text-red-300">
          Couldn&apos;t send the message. Try again or write to
          saramariaojeda9559@gmail.com.
        </p>
      )}
    </form>
  );
}