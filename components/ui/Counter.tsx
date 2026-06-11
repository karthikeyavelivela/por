"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

type Props = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Counts up on scroll-into-view — quart-out, 1.6s, decimal-safe. */
export default function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      return;
    }
    const counter = { v: 0 };
    const tween = gsap.to(counter, {
      v: value,
      duration: 1.6,
      ease: "quart.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${counter.v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
