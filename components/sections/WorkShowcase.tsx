"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import ProjectCover from "@/components/sections/ProjectCover";
import Tag from "@/components/ui/Tag";
import TextLink from "@/components/ui/TextLink";
import RevealText from "@/components/ui/RevealText";
import { gsap } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

/** ±6% scrub parallax on each cover's inner mark. */
function useCoverParallax(scope: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (prefersReducedMotion() || !scope.current) return;
    const marks = scope.current.querySelectorAll<HTMLElement>("[data-parallax]");
    const tweens: gsap.core.Tween[] = [];
    marks.forEach((mark) => {
      tweens.push(
        gsap.fromTo(
          mark,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: mark.closest("a"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        )
      );
    });
    return () =>
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
  }, [scope]);
}

export default function WorkShowcase() {
  const ref = useRef<HTMLElement>(null);
  useCoverParallax(ref);

  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p data-reveal className="t-label mb-5 flex items-center gap-3 text-(--muted)">
            <span aria-hidden className="h-px w-10" style={{ background: "var(--orange)" }} />
            Selected work
          </p>
          <RevealText as="h2" lines={["Things I've", "built & broken."]} className="t-title" />
        </div>
        <div data-reveal data-delay="0.2">
          <TextLink href="/work">All work →</TextLink>
        </div>
      </div>

      <div className="flex flex-col gap-24 md:gap-36">
        {featuredProjects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={p.slug}
              className="grid items-center gap-8 md:grid-cols-12 md:gap-12"
            >
              <div data-reveal className={cn("md:col-span-7", flip && "md:order-2")}>
                <Link
                  href={`/work/${p.slug}`}
                  data-cursor="view"
                  aria-label={`View ${p.title}`}
                  className="group block transition-transform duration-700 hover:-translate-y-2"
                  style={{ transitionTimingFunction: "var(--ease)" }}
                >
                  <ProjectCover
                    slug={p.slug}
                    className="transition-shadow duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
                  />
                </Link>
              </div>

              <div className={cn("md:col-span-5", flip && "md:order-1")}>
                <p data-reveal className="t-label mb-4 text-(--muted)">
                  {String(i + 1).padStart(2, "0")} · {p.year} · {p.role}
                </p>
                <h3
                  data-reveal
                  data-delay="0.08"
                  className="font-display text-3xl font-semibold tracking-tight text-(--ink) md:text-4xl"
                  style={{ fontFamily: "Clash Display, system-ui, sans-serif" }}
                >
                  <Link
                    href={`/work/${p.slug}`}
                    data-cursor="view"
                    className="transition-colors duration-300 hover:text-(--orange)"
                  >
                    {p.title}
                  </Link>
                </h3>
                <p data-reveal data-delay="0.16" className="mt-4 max-w-md text-(--muted)">
                  {p.oneLiner}
                </p>
                <div data-reveal data-delay="0.24" className="mt-6 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <div data-reveal data-delay="0.32" className="mt-8">
                  <TextLink href={`/work/${p.slug}`}>Case study →</TextLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
