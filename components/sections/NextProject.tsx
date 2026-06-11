import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectCover from "@/components/sections/ProjectCover";

/** Full-width next-project footer — keeps the user flowing through all five. */
export default function NextProject({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="view"
      className="group block border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <div className="md:col-span-7">
          <p className="t-label mb-4 text-(--muted)">Next project</p>
          <p
            className="font-display font-semibold leading-[0.98] tracking-tight text-(--ink) transition-colors duration-500 group-hover:text-(--orange)"
            style={{
              fontFamily: "Clash Display, system-ui, sans-serif",
              fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </p>
          <p className="mt-4 max-w-md text-sm text-(--muted)">{project.oneLiner}</p>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <div
            className="origin-center scale-[1.06] transition-transform duration-700 group-hover:scale-100"
            style={{ transitionTimingFunction: "var(--ease)" }}
          >
            <ProjectCover slug={project.slug} interactive={false} />
          </div>
        </div>
      </div>
    </Link>
  );
}
