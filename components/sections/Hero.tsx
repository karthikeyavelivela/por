"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { EASE_EXPO } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

/** Static poster while the canvas loads / for reduced-power paths. */
function SceneFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(255,107,43,0.14) 0%, rgba(23,184,166,0.07) 45%, transparent 70%)",
      }}
    />
  );
}

const WORDS = ["security engineer.", "founder.", "full-stack builder.", "bug bounty hunter."];

function WordTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.5em] min-w-[11ch] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[i]}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_EXPO }}
          className="whitespace-nowrap font-medium text-(--ink)"
        >
          {WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* fullscreen 3D background — reacts to the cursor */}
      <div className="absolute inset-0" aria-hidden>
        <HeroScene />
      </div>
      {/* vignette so the centered type always reads */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 46% at 50% 52%, color-mix(in srgb, var(--bg) 62%, transparent) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 pt-28 pb-32 text-center">
        <div data-reveal className="mb-9 inline-flex items-center gap-3 rounded-full glass px-4 py-2">
          <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: "var(--teal)" }}>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full animate-dot-pulse"
              style={{ background: "var(--teal)" }}
            />
          </span>
          <span className="t-label text-(--muted)">Open to opportunities</span>
        </div>

        <RevealText
          as="h1"
          lines={[
            "Karthikeya",
            <span key="v" className="t-grad">Velivela</span>,
          ]}
          className="t-hero text-(--ink)"
          delay={0.1}
        />

        <p
          data-reveal
          data-delay="0.45"
          className="mt-9 max-w-xl text-lg leading-relaxed text-(--muted)"
        >
          Application Security Engineer & Founder — by day a <WordTicker />{" "}
          Building FYRO, hardening PETZU, and red-teaming LLMs.
        </p>

        <div data-reveal data-delay="0.6" className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/work">
            View work <span aria-hidden>→</span>
          </Button>
          <Button href="/contact" variant="ghost">
            Get in touch
          </Button>
        </div>
      </div>

      {/* bottom meta row */}
      <div
        data-reveal
        data-delay="0.8"
        className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t px-6 py-5 md:px-10"
        style={{ borderColor: "var(--line)" }}
      >
        <p className="t-label text-(--muted)">AppSec @ PETZU · Founder @ FYRO</p>
        <div className="flex items-center gap-4">
          <span className="t-label hidden text-(--muted) sm:inline">Scroll</span>
          <span className="relative block h-9 w-px overflow-hidden" style={{ background: "var(--line)" }}>
            <motion.span
              aria-hidden
              className="absolute left-0 top-0 h-1/2 w-full"
              style={{ background: "var(--grad)" }}
              animate={{ y: ["-100%", "220%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
