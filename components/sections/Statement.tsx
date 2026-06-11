"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import TextLink from "@/components/ui/TextLink";
import { prefersReducedMotion } from "@/lib/utils";

const STATEMENT =
  "I sit on both sides of the wall — the engineer who builds the product, and the attacker who tries to break it.";

/** Word-by-word opacity scrub: 0.12 → 1 between top 78% and bottom 45%. */
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const words = ref.current.querySelectorAll<HTMLElement>("span[data-word]");
    const tween = gsap.fromTo(
      words,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
          end: "bottom 45%",
          scrub: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-6 py-28 md:px-10 md:py-40">
      <p data-reveal className="t-label mb-8 flex items-center gap-3 text-(--muted)">
        <span aria-hidden className="h-px w-10" style={{ background: "var(--teal)" }} />
        About
      </p>
      <p
        ref={ref}
        className="font-display font-semibold leading-[1.18] text-(--ink)"
        style={{
          fontFamily: "Clash Display, system-ui, sans-serif",
          fontSize: "clamp(1.6rem, 4vw, 3.4rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {STATEMENT.split(" ").map((w, i) => (
          <span key={i} data-word className="inline-block opacity-[0.12]">
            {w}&nbsp;
          </span>
        ))}
      </p>
      <div data-reveal className="mt-10">
        <TextLink href="/about">More about me →</TextLink>
      </div>
    </section>
  );
}
