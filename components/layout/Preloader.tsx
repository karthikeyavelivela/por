"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markAppReady } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * First-visit preloader: the full name rises out of a mask word by word,
 * a hairline fills underneath with the counter riding its right edge,
 * then the whole screen lifts away with a softening bottom curve.
 */
export default function Preloader() {
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("kv-visited") || prefersReducedMotion()) {
      sessionStorage.setItem("kv-visited", "1");
      markAppReady();
      return;
    }
    let cancelled = false;
    const raf = requestAnimationFrame(() => {
      if (!cancelled) setActive(true);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!active || !rootRef.current) return;

    document.documentElement.style.overflow = "hidden";
    const counter = { v: 0 };
    const words = wordsRef.current?.querySelectorAll("[data-word]") ?? [];

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("kv-visited", "1");
        document.documentElement.style.overflow = "";
        markAppReady();
        setActive(false);
      },
    });

    tl.fromTo(
      words,
      { y: 0, yPercent: 120 },
      { yPercent: 0, duration: 0.85, ease: "expo.out", stagger: 0.12 },
      0
    )
      .to(
        counter,
        {
          v: 100,
          duration: 1.05,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = `${String(Math.round(counter.v)).padStart(3, "0")}%`;
            }
            if (lineRef.current) {
              lineRef.current.style.transform = `scaleX(${counter.v / 100})`;
            }
          },
        },
        0.15
      )
      .to(words, { yPercent: -120, duration: 0.5, ease: "power3.in", stagger: 0.05 }, ">-0.05")
      .to(
        panelRef.current,
        { borderBottomLeftRadius: "50% 12%", borderBottomRightRadius: "50% 12%", duration: 0.3 },
        "<"
      )
      .to(rootRef.current, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, ">-0.15");

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, [active]);

  if (!active) return null;

  return (
    <div ref={rootRef} aria-hidden className="fixed inset-0 z-10000">
      <div
        ref={panelRef}
        className="flex h-full w-full flex-col items-center justify-center overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        <p className="t-label mb-6 text-(--muted)">Portfolio — 2026</p>

        <div ref={wordsRef} className="flex gap-[0.35em] overflow-hidden px-4 pb-2">
          {["Karthikeya", "Velivela"].map((w, i) => (
            <span
              key={w}
              data-word
              className="block font-display font-semibold leading-none tracking-tight will-change-transform"
              style={{
                fontFamily: "Clash Display, system-ui, sans-serif",
                fontSize: "clamp(2.2rem, 7vw, 4.8rem)",
                letterSpacing: "-0.03em",
                color: i === 0 ? "var(--ink)" : "transparent",
                ...(i === 1
                  ? {
                      background: "var(--grad)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }
                  : {}),
              }}
            >
              {w}
            </span>
          ))}
        </div>

        <div className="mt-8 flex w-[min(420px,72vw)] items-center gap-4">
          <div className="h-px flex-1 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
            <div
              ref={lineRef}
              className="h-full w-full origin-left scale-x-0"
              style={{ background: "var(--grad)" }}
            />
          </div>
          <span
            ref={countRef}
            className="t-label w-12 text-right tabular-nums text-(--muted)"
          >
            000%
          </span>
        </div>
      </div>
    </div>
  );
}
