import { cn } from "@/lib/utils";

export default function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "glass inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-(--muted)",
        className
      )}
    >
      {children}
    </span>
  );
}
