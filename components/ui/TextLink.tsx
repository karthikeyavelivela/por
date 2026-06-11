import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TextLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(
    "u-draw inline-flex items-center gap-2 text-sm font-medium text-(--muted) transition-colors duration-300 hover:text-(--ink)",
    className
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
