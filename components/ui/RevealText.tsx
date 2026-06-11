"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { whenAppReady } from "@/lib/ready";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Props = {
  /** Each entry renders as one masked line. */
  lines: (string | React.ReactNode)[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  delay?: number;
};

/**
 * Line-mask reveal driven by IntersectionObserver (not ScrollTrigger) so the
 * headline can never stay hidden: above-the-fold lines animate the moment the
 * app is ready, the rest when they enter the viewport.
 */
export default function RevealText({
  lines,
  as = "div",
  className,
  lineClassName,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll(".mask-line > span");

    if (prefersReducedMotion()) {
      spans.forEach((s) => ((s as HTMLElement).style.transform = "none"));
      return;
    }

    let tween: gsap.core.Tween | undefined;
    let done = false;
    let io: IntersectionObserver | undefined;

    const run = () => {
      if (done) return;
      done = true;
      io?.disconnect();
      // y: 0 zeroes the pixel baseline GSAP parses from the CSS
      // translateY(115%) initial state — otherwise it persists after the
      // yPercent channel animates out and the line stays hidden.
      tween = gsap.fromTo(
        spans,
        { y: 0, yPercent: 115 },
        { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, delay }
      );
    };

    const cancelReady = whenAppReady(() => {
      // already on screen — fire immediately
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        run();
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) run();
        },
        { rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(el);
    });

    return () => {
      cancelReady();
      io?.disconnect();
      tween?.kill();
    };
  }, [delay]);

  const Tag = as;
  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <span className={cn(lineClassName)}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
