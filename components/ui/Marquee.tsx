import { cn } from "@/lib/utils";

type Props = {
  phrases: string[];
  /** Alternate solid/outlined display type with ✦ separators. */
  display?: boolean;
  slow?: boolean;
  className?: string;
};

/** Seamless CSS marquee — track duplicated once, translated -50%. */
export default function Marquee({ phrases, display = true, slow, className }: Props) {
  const row = [...phrases, ...phrases];
  return (
    <div
      className={cn(
        "group relative -skew-y-1 overflow-hidden py-6",
        "[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "flex w-max items-center gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]",
          slow ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {row.map((phrase, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={cn(
                display
                  ? "font-display text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tight"
                  : "font-display text-2xl font-medium tracking-tight",
                i % 2 === 0 ? "text-(--ink)" : "t-outline"
              )}
              style={{ fontFamily: "Clash Display, system-ui, sans-serif" }}
            >
              {phrase}
            </span>
            <span aria-hidden className="text-xl" style={{ color: "var(--orange)" }}>
              ✦
            </span>
          </span>
        ))}
      </div>
      <span className="sr-only">{phrases.join(", ")}</span>
    </div>
  );
}
