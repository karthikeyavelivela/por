import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p
        aria-hidden
        className="font-display font-bold leading-none"
        style={{
          fontFamily: "Clash Display, system-ui, sans-serif",
          fontSize: "clamp(7rem, 24vw, 18rem)",
          color: "transparent",
          WebkitTextStroke: "1.5px var(--line-strong)",
          letterSpacing: "-0.04em",
        }}
      >
        404
      </p>
      <h1 className="sr-only">Page not found</h1>
      <p className="mt-2 max-w-sm text-(--muted)">
        This page slipped through the threat model.
      </p>
      <div className="mt-10">
        <Button href="/">
          Back home <span aria-hidden>→</span>
        </Button>
      </div>
    </div>
  );
}
