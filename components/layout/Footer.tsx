"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { SOCIALS, SITE } from "@/data/site";
import { useISTClock } from "@/lib/hooks";
import { useLenis } from "@/components/layout/SmoothScroll";

export default function Footer() {
  const time = useISTClock();
  const lenisRef = useLenis();

  const toTop = () => {
    const lenis = lenisRef?.current;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 px-6 py-16 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <Logo className="text-3xl" />
          <p className="mt-4 max-w-xs text-sm text-(--muted)">
            The engineer who builds the product — and the attacker who tries to
            break it.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              { href: "/work", label: "Work" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="u-draw text-(--muted) hover:text-(--ink)">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-hop u-draw text-(--muted) hover:text-(--orange)"
                >
                  {s.label} <span className="arrow" aria-hidden>↗</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${SITE.email}`} className="u-draw text-(--muted) hover:text-(--orange)">
                Email
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <p className="t-label text-(--muted)" suppressHydrationWarning>
            {time} IST
          </p>
          <button
            onClick={toTop}
            className="u-draw text-sm font-medium text-(--muted) hover:text-(--ink)"
          >
            Back to top ↑
          </button>
        </div>
      </div>
      <div
        className="border-t py-5 text-center text-xs text-(--muted)"
        style={{ borderColor: "var(--line)" }}
      >
        © 2026 — Designed & built by Karthikeya Velivela
      </div>
    </footer>
  );
}
