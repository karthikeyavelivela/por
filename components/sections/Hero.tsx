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
          "radial-gradient(circle at 60% 45%, rgba(255,107,43,0.16) 0%, rgba(23,184,166,0.08) 40%, transparent 65%)",
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
    <section className="relative flex min-h-svh items-center overflow-hidden">
      {/* 3D scene — offset right, behind content, with an ambient glow bed */}
      <div className="pointer-events-none absolute right-[-22%] top-[4%] h-[64vmin] w-[64vmin] md:right-[-20%] md:top-1/2 md:h-[66vmin] md:w-[66vmin] md:-translate-y-1/2 lg:right-[-4%] lg:h-[80vmin] lg:w-[80vmin]">
        <div
          aria-hidden
          className="absolute inset-[8%] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 42% 38%, rgba(255,107,43,0.22) 0%, rgba(23,184,166,0.12) 50%, transparent 72%)",
          }}
        />
        <HeroScene />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 pb-24 md:px-10">
        <div data-reveal className="mb-9 inline-flex items-center gap-3 rounded-full glass px-4 py-2">
          <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: "var(--teal)" }}>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full animate-dot-pulse"
              style={{ background: "var(--teal)" }}
            />
          </span>
          <span className="t-label text-(--muted)">Vijayawada, IN — Open to opportunities</span>
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

        <p data-reveal data-delay="0.45" className="mt-9 max-w-xl text-lg leading-relaxed text-(--muted)">
          Application Security Engineer & Founder — by day a <WordTicker />{" "}
          Building FYRO, hardening PETZU, and red-teaming LLMs from Vijayawada,
          India.
        </p>

        <div data-reveal data-delay="0.6" className="mt-8 flex flex-wrap items-center gap-3">
          <Button href="/work">
            View work <span aria-hidden>→</span>
          </Button>
          <Button href="/contact" variant="ghost">
            Get in touch
          </Button>
        </div>

        {/* bottom meta row */}
        <div
          data-reveal
          data-delay="0.8"
          className="mt-20 flex items-center justify-between border-t pt-6"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="t-label text-(--muted)">AppSec @ PETZU · Founder @ FYRO</p>
          <div className="flex items-center gap-4">
            <span className="t-label hidden text-(--muted) sm:inline">Scroll</span>
            <span className="relative block h-10 w-px overflow-hidden" style={{ background: "var(--line)" }}>
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
      </div>
    </section>
  );
}
