"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type ProjectCategory } from "@/data/projects";
import ProjectCover from "@/components/sections/ProjectCover";
import Tag from "@/components/ui/Tag";
import RevealText from "@/components/ui/RevealText";
import { cn, EASE_EXPO } from "@/lib/utils";

const FILTERS = ["All", "Product", "Security", "Open source"] as const;
type Filter = (typeof FILTERS)[number];

export default function WorkIndex() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(filter as ProjectCategory));

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-36 pb-28 md:px-10 md:pt-44">
      <p data-reveal className="t-label mb-5 flex items-center gap-3 text-(--muted)">
        <span aria-hidden className="h-px w-10" style={{ background: "var(--orange)" }} />
        Work
      </p>
      <RevealText as="h1" lines={["Things I've", "built & broken."]} className="t-title" />

      {/* filter pills */}
      <div data-reveal data-delay="0.25" className="mt-12 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
              filter === f ? "text-(--bg)" : "glass text-(--muted) hover:text-(--ink)"
            )}
          >
            {filter === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--ink)" }}
                transition={{ duration: 0.45, ease: EASE_EXPO }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>

      {/* grid */}
      <motion.div layout className="mt-16 grid gap-10 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: EASE_EXPO }}
              className={cn(i === 0 && filter === "All" && "md:col-span-2")}
            >
              <Link
                href={`/work/${p.slug}`}
                data-cursor="view"
                aria-label={`View ${p.title}`}
                className="group block"
              >
                <ProjectCover
                  slug={p.slug}
                  className="transition-[transform,box-shadow] duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
                />
                <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h2
                      className="font-display text-2xl font-semibold tracking-tight text-(--ink) transition-colors duration-300 group-hover:text-(--orange) md:text-3xl"
                      style={{ fontFamily: "Clash Display, system-ui, sans-serif" }}
                    >
                      {p.title}
                    </h2>
                    <p className="mt-2 max-w-lg text-sm text-(--muted)">{p.oneLiner}</p>
                  </div>
                  <span className="t-label text-(--muted)">{p.year}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 5).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
