"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn, EASE_EXPO, EASE_QUART } from "@/lib/utils";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 300 && y > lastY.current && !open);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE_EXPO }}
        className={cn(
          "fixed inset-x-0 top-0 z-9700 transition-[background,border-color,backdrop-filter] duration-500",
          scrolled && !open
            ? "border-b backdrop-blur-[18px]"
            : "border-b border-transparent"
        )}
        style={
          scrolled && !open
            ? { background: "var(--nav-bg)", borderColor: "var(--line)" }
            : undefined
        }
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10"
        >
          <Link href="/" aria-label="Karthikeya Velivela — home" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "u-draw text-sm font-medium tracking-wide transition-colors duration-300",
                  pathname.startsWith(l.href)
                    ? "text-(--ink)"
                    : "text-(--muted) hover:text-(--ink)"
                )}
              >
                {l.label}
                {pathname.startsWith(l.href) && (
                  <span aria-hidden className="ml-2 inline-block h-1 w-1 rounded-full align-middle" style={{ background: "var(--orange)" }} />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="glass rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:text-(--orange)"
              style={{ color: "var(--ink)" }}
            >
              Get in touch
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="relative z-9800 flex h-11 w-11 flex-col items-center justify-center gap-[7px]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={cn(
                "h-px w-7 transition-transform duration-400",
                open && "translate-y-1 rotate-45"
              )}
              style={{ background: "var(--ink)", transitionTimingFunction: "var(--ease)" }}
            />
            <span
              className={cn(
                "h-px w-7 transition-transform duration-400",
                open && "-translate-y-1 -rotate-45"
              )}
              style={{ background: "var(--ink)", transitionTimingFunction: "var(--ease)" }}
            />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE_QUART }}
            className="fixed inset-0 z-9750 flex flex-col justify-center px-8 md:hidden"
            style={{ background: "var(--overlay-bg)", backdropFilter: "blur(24px)" }}
          >
            <nav aria-label="Mobile navigation">
              <ul className="space-y-2">
                {[{ href: "/", label: "Home" }, ...LINKS].map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: EASE_EXPO }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "font-display text-5xl font-semibold tracking-tight",
                          pathname === l.href ||
                            (l.href !== "/" && pathname.startsWith(l.href))
                            ? "t-grad"
                            : "text-(--ink)"
                        )}
                        style={{ fontFamily: "Clash Display, system-ui, sans-serif" }}
                      >
                        {l.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="t-label mt-14 text-(--muted)"
            >
              Vijayawada, IN — Open to opportunities
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
