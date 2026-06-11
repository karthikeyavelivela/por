"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { REVEAL } from "@/lib/animations";
import { whenAppReady } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Activates every [data-reveal] element on the current page via
 * IntersectionObserver — elements already in the viewport animate as soon as
 * the app is ready, the rest as they scroll in. Optional data-delay="0.2".
 * Mounted inside template.tsx so it re-runs on each navigation.
 */
export default function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const tweens: gsap.core.Tween[] = [];
    const pending = new Set(els);
    let io: IntersectionObserver | undefined;

    const animate = (el: HTMLElement) => {
      if (!pending.has(el)) return;
      pending.delete(el);
      tweens.push(
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: REVEAL.duration,
          ease: REVEAL.ease,
          delay: parseFloat(el.dataset.delay ?? "0"),
        })
      );
    };

    const cancelReady = whenAppReady(() => {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              animate(e.target as HTMLElement);
              io?.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.96 && r.bottom > 0) animate(el);
        else io?.observe(el);
      });
    });

    return () => {
      cancelReady();
      io?.disconnect();
      tweens.forEach((t) => t.kill());
    };
  }, [pathname]);

  return null;
}
