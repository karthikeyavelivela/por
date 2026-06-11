import Image from "next/image";
import { getProject } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Project cover panel. Renders the real screenshot when the project has an
 * `image`; otherwise falls back to CSS art (layered radial gradients, 44px
 * grid, huge outlined mark). Both variants keep the floating fact chips.
 */
export default function ProjectCover({
  slug,
  className,
  interactive = true,
}: {
  slug: string;
  className?: string;
  interactive?: boolean;
}) {
  const p = getProject(slug);
  if (!p) return null;

  return (
    <div
      className={cn(
        "relative aspect-[16/11] overflow-hidden rounded-(--radius) border",
        className
      )}
      style={{
        borderColor: "var(--line)",
        background: p.image
          ? "var(--surface)"
          : [
              `radial-gradient(ellipse 75% 70% at 22% 18%, ${p.hueA}33 0%, transparent 60%)`,
              `radial-gradient(ellipse 65% 60% at 85% 85%, ${p.hueB}29 0%, transparent 58%)`,
              `radial-gradient(ellipse 100% 100% at 50% 120%, ${p.hueA}14 0%, transparent 70%)`,
              "var(--surface)",
            ].join(", "),
      }}
    >
      {p.image ? (
        <>
          <Image
            src={p.image}
            alt={`${p.title} — interface screenshot`}
            fill
            sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw"
            className={cn(
              "object-cover object-top",
              interactive &&
                "transition-transform duration-700 group-hover:scale-[1.03]"
            )}
            style={{ transitionTimingFunction: "var(--ease)" }}
          />
          {/* legibility wash behind the chips */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,10,8,0.25) 0%, transparent 30%, transparent 65%, rgba(11,10,8,0.35) 100%)",
            }}
          />
        </>
      ) : (
        <>
          {/* 44px grid overlay */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          {/* huge outlined mark */}
          <span
            aria-hidden
            data-parallax
            className="absolute bottom-[-6%] right-[2%] select-none font-display font-bold leading-none"
            style={{
              fontFamily: "Clash Display, system-ui, sans-serif",
              fontSize: "clamp(7rem, 14vw, 15rem)",
              color: "transparent",
              WebkitTextStroke: `1.5px ${p.hueA}66`,
              letterSpacing: "-0.04em",
            }}
          >
            {p.mark}
          </span>
        </>
      )}

      {/* floating glass chips with real facts */}
      <div
        className={cn(
          "glass absolute left-[7%] top-[12%] rounded-full px-4 py-2 text-xs font-medium tracking-wide",
          interactive &&
            "transition-transform duration-700 group-hover:-translate-y-2"
        )}
        style={{
          color: p.image ? "#F2EFE9" : "var(--ink)",
          ...(p.image ? { background: "rgba(11,10,8,0.45)" } : {}),
          transitionTimingFunction: "var(--ease)",
        }}
      >
        {p.chips[0]}
      </div>
      <div
        className={cn(
          "glass absolute bottom-[14%] left-[12%] rounded-full px-4 py-2 text-xs font-medium tracking-wide",
          interactive &&
            "transition-transform delay-75 duration-700 group-hover:-translate-y-2"
        )}
        style={{
          color: p.image ? "#F2EFE9" : "var(--muted)",
          ...(p.image ? { background: "rgba(11,10,8,0.45)" } : {}),
          transitionTimingFunction: "var(--ease)",
        }}
      >
        {p.chips[1]}
      </div>
    </div>
  );
}
