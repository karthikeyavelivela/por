"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

/** Shared monogram paths — K's arms meet the stem at its midpoint; the
 *  lower arm doubles as the V's left stroke. V's right stroke is orange. */
export const LOGO_PATHS = [
  { d: "M16 10 V54", accent: false },
  { d: "M16 32 L36 10", accent: false },
  { d: "M16 32 L36 54", accent: false },
  { d: "M36 54 L52 10", accent: true },
] as const;

export function LogoMark({
  className,
  strokeWidth = 6.5,
  withDash = false,
}: {
  className?: string;
  strokeWidth?: number;
  withDash?: boolean;
}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      {LOGO_PATHS.map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke={p.accent ? "var(--orange)" : "var(--ink)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...(withDash
            ? { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 }
            : { pathLength: 1, strokeDasharray: 1 })}
        />
      ))}
    </svg>
  );
}

/** Nav/footer logo — GSAP redraws the strokes on hover. */
export default function Logo({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    if (prefersReducedMotion() || !ref.current) return;
    const paths = ref.current.querySelectorAll("path");
    gsap.fromTo(
      paths,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut", stagger: 0.07 }
    );
  };

  return (
    <span ref={ref} onMouseEnter={onEnter} className="inline-block">
      <LogoMark className={cn("h-9 w-9", className)} />
    </span>
  );
}
