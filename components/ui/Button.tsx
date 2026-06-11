"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { cn, isFinePointer, prefersReducedMotion } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "filled" | "ghost";
  className?: string;
  external?: boolean;
};

/**
 * Magnetic button: within the (padded) hover field it eases toward the
 * cursor up to 8px; springs back on leave. Filled variant gets a gradient
 * sweep-up on hover.
 */
export default function Button({
  href,
  children,
  variant = "filled",
  className,
  external,
}: Props) {
  const innerRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!isFinePointer() || prefersReducedMotion() || !innerRef.current) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const max = 8;
    gsap.to(innerRef.current, {
      x: gsap.utils.clamp(-max, max, dx * 0.12),
      y: gsap.utils.clamp(-max, max, dy * 0.18),
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <span className="inline-block p-3 -m-3" onMouseMove={onMove} onMouseLeave={onLeave}>
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          "group relative inline-block overflow-hidden rounded-full text-sm font-medium tracking-wide",
          variant === "filled" ? "text-(--bg)" : "glass text-(--ink)",
          className
        )}
        style={variant === "filled" ? { background: "var(--ink)" } : undefined}
      >
        <span ref={innerRef} className="relative z-10 inline-flex items-center gap-2.5 px-7 py-3.5">
          {children}
        </span>
        {variant === "filled" && (
          <span
            aria-hidden
            className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
            style={{ background: "var(--grad)", transitionTimingFunction: "var(--ease)" }}
          />
        )}
        {variant === "ghost" && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-transparent transition-colors duration-400 group-hover:border-(--orange)"
          />
        )}
      </Link>
    </span>
  );
}
