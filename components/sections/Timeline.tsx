"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const ENTRIES = [
  {
    org: "PETZU",
    role: "AppSec Engineer & Software Developer",
    period: "Current",
    detail:
      "Threat modeling at design time, secure code review at merge time, OWASP remediation in production — while shipping features as a developer.",
  },
  {
    org: "FYRO",
    role: "Founder",
    period: "Current",
    detail:
      "Multi-tenant logistics SaaS matching empty truck return-trips with waiting loads across Tier-2 India. Live in production.",
  },
  {
    org: "Dev Studio",
    role: "Founder",
    period: "Ongoing · 50+ sites",
    detail:
      "Independent studio delivering design-to-deploy websites — the training ground for shipping fast without shipping sloppy.",
  },
  {
    org: "KL University",
    role: "B.Tech CSE — 9.2 CGPA",
    period: "2023 — 2027",
    detail:
      "Final-year Computer Science at KL University. Class of 2027.",
  },
];

/** Vertical hairline with a gradient fill that draws on scrub; entries reveal in sequence. */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const fill = ref.current.querySelector("[data-fill]");
    if (!fill) return;
    const tween = gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 72%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute bottom-2 left-[5px] top-2 w-px md:left-[7px]"
        style={{ background: "var(--line)" }}
      />
      <div
        aria-hidden
        data-fill
        className="absolute bottom-2 left-[5px] top-2 w-px origin-top scale-y-0 md:left-[7px]"
        style={{ background: "var(--grad)" }}
      />
      <ol className="space-y-14 pl-10 md:pl-16">
        {ENTRIES.map((e, i) => (
          <li key={e.org} data-reveal data-delay={String(i * 0.08)} className="relative">
            <span
              aria-hidden
              className="absolute -left-10 top-2 h-3 w-3 rounded-full border-2 md:-left-16"
              style={{ borderColor: "var(--orange)", background: "var(--bg)" }}
            />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3
                className="font-display text-2xl font-semibold tracking-tight text-(--ink)"
                style={{ fontFamily: "Clash Display, system-ui, sans-serif" }}
              >
                {e.org}
              </h3>
              <span className="t-label text-(--orange)">{e.period}</span>
            </div>
            <p className="mt-1.5 font-medium text-(--ink)/80">{e.role}</p>
            <p className="mt-2 max-w-xl text-sm text-(--muted)">{e.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
