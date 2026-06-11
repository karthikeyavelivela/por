"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markAppReady } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/utils";
import { LogoMark } from "@/components/ui/Logo";

/**
 * First-visit preloader: monogram strokes draw in, counter runs 0→100 over a
 * thin gradient bar, then the whole overlay sweeps up as a curtain.
 * Gated by sessionStorage; total under 1.8s.
 */
export default function Preloader() {
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("kv-visited") || prefersReducedMotion()) {
      sessionStorage.setItem("kv-visited", "1");
      markAppReady();
      return;
    }

    let cancelled = false;
    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      setActive(true);
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
    const paths = svgWrapRef.current?.querySelectorAll("path") ?? [];

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("kv-visited", "1");
        document.documentElement.style.overflow = "";
        markAppReady();
        setActive(false);
      },
    });

    tl.fromTo(
      paths,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.55, ease: "power2.inOut", stagger: 0.07 },
      0
    )
      .to(
        counter,
        {
          v: 100,
          duration: 0.9,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = String(Math.round(counter.v));
            if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
          },
        },
        0.1
      )
      .to(
        rootRef.current,
        { yPercent: -100, duration: 0.65, ease: "power4.inOut" },
        ">-0.05"
      );

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-10000 flex items-center justify-center"
      style={{ background: "var(--bg)" }}
    >
      <div ref={svgWrapRef} className="flex flex-col items-center">
        <LogoMark withDash className="h-16 w-16" />
        <div className="mt-8 h-px w-48 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0"
            style={{ background: "var(--grad)" }}
          />
        </div>
        <span
          ref={countRef}
          className="t-label mt-4 tabular-nums"
          style={{ color: "var(--muted)" }}
        >
          0
        </span>
      </div>
    </div>
  );
}
