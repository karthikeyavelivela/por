import { cn } from "@/lib/utils";

/**
 * Typographic brand: "kv/" — initials in Clash Display with the slash in
 * orange. The slash is the motif (paths, code, offense/defense divide) and
 * carries into the favicon.
 */
export default function Logo({
  className,
  outlined = false,
}: {
  className?: string;
  outlined?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-baseline font-display font-bold tracking-tight",
        className
      )}
      style={{
        fontFamily: "Clash Display, system-ui, sans-serif",
        ...(outlined
          ? { color: "transparent", WebkitTextStroke: "1px var(--line-strong)" }
          : { color: "var(--ink)" }),
      }}
    >
      kv
      <span
        className="inline-block"
        style={
          outlined
            ? { color: "transparent", WebkitTextStroke: "1px var(--orange)" }
            : { color: "var(--orange)" }
        }
      >
        /
      </span>
    </span>
  );
}
