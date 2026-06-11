"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.to(ref.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.4 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-9900 h-[2px] origin-left scale-x-0"
      style={{ background: "var(--grad)" }}
    />
  );
}
