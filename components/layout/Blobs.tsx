import { cn } from "@/lib/utils";

/**
 * Two drifting gradient blobs behind all content.
 * `intense` bumps opacity slightly (used on /contact).
 */
export default function Blobs({ intense = false }: { intense?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className={cn(
          "absolute -top-[18%] -right-[12%] h-[52vw] w-[52vw] rounded-full animate-blob-a",
          intense ? "opacity-[0.17]" : "opacity-[0.12]"
        )}
        style={{
          background: "radial-gradient(circle, var(--orange) 0%, transparent 62%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className={cn(
          "absolute -bottom-[20%] -left-[14%] h-[48vw] w-[48vw] rounded-full animate-blob-b",
          intense ? "opacity-[0.15]" : "opacity-[0.10]"
        )}
        style={{
          background: "radial-gradient(circle, var(--teal) 0%, transparent 62%)",
          filter: "blur(120px)",
        }}
      />
    </div>
  );
}
