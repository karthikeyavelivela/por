"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import ProjectCover from "@/components/sections/ProjectCover";
import NextProject from "@/components/sections/NextProject";
import RevealText from "@/components/ui/RevealText";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/** Full-bleed cover with scroll parallax. */
function CoverHero({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const inner = ref.current.querySelector("[data-cover]");
    if (!inner) return;
    const tween = gsap.fromTo(
      inner,
      { yPercent: 0 },
      {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.5 },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <header ref={ref} className="relative overflow-hidden pt-32 md:pt-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p data-reveal className="t-label mb-6 text-(--muted)">
          {project.role} · {project.year} · {project.categories.join(" / ")}
        </p>
        <RevealText
          as="h1"
          lines={
            project.title.length > 14
              ? project.title.split(" ").reduce<string[]>((acc, w) => {
                  const last = acc[acc.length - 1];
                  if (last !== undefined && (last + " " + w).length <= 16) {
                    acc[acc.length - 1] = last + " " + w;
                  } else acc.push(w);
                  return acc;
                }, [])
              : [project.title]
          }
          className="t-hero text-(--ink)"
        />
        <div data-reveal data-delay="0.3" className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div data-reveal data-delay="0.4" className="mt-14">
          <div data-cover className="will-change-transform">
            <ProjectCover slug={project.slug} interactive={false} />
          </div>
        </div>
      </div>
    </header>
  );
}

/** Sticky-label two-column block. */
function StickySection({
  label,
  paragraphs,
  accent,
}: {
  label: string;
  paragraphs: string[];
  accent: string;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-4">
        <p
          data-reveal
          className="t-label sticky top-32 flex items-center gap-3"
          style={{ color: accent }}
        >
          <span aria-hidden className="h-px w-8" style={{ background: accent }} />
          {label}
        </p>
      </div>
      <div className="space-y-6 md:col-span-7 md:col-start-6">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            data-reveal
            data-delay={String(i * 0.08)}
            className="text-lg leading-relaxed text-(--muted)"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetail({ project, next }: { project: Project; next: Project }) {
  return (
    <article>
      <CoverHero project={project} />

      <div className="mx-auto max-w-[1400px] space-y-28 px-6 py-24 md:px-10 md:py-32">
        <StickySection label="The problem" paragraphs={project.problem} accent="var(--orange)" />
        <StickySection label="The build" paragraphs={project.build} accent="var(--teal)" />

        {/* Highlights */}
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p data-reveal className="t-label sticky top-32 flex items-center gap-3 text-(--orange)">
              <span aria-hidden className="h-px w-8" style={{ background: "var(--orange)" }} />
              Highlights
            </p>
          </div>
          <ul className="md:col-span-7 md:col-start-6">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                data-reveal
                data-delay={String(i * 0.06)}
                className="flex gap-6 border-b py-5 first:pt-0"
                style={{ borderColor: "var(--line)" }}
              >
                <span
                  className="font-display text-sm font-semibold text-(--muted)"
                  style={{ fontFamily: "Clash Display, system-ui, sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-(--ink)">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stack strip */}
        <div data-reveal className="flex flex-wrap gap-2 border-t pt-12" style={{ borderColor: "var(--line)" }}>
          {project.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {/* Links */}
        {project.links.length > 0 && (
          <div data-reveal className="flex flex-wrap gap-3">
            {project.links.map((l, i) => (
              <Button key={l.href} href={l.href} external variant={i === 0 ? "filled" : "ghost"}>
                {l.label} <span aria-hidden>↗</span>
              </Button>
            ))}
          </div>
        )}
      </div>

      <NextProject project={next} />
    </article>
  );
}
