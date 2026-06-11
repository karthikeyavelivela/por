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

/** Floating pill nav — detached glass capsule, active link carries an ink pill. */
export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
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
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.55, ease: EASE_EXPO }}
        className="fixed inset-x-0 top-4 z-9700 flex justify-center px-4 md:top-5"
      >
        <nav
          aria-label="Main navigation"
          className="glass flex items-center gap-1 rounded-full p-1.5 pl-5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)]"
        >
          <Link href="/" aria-label="Karthikeya Velivela — home" onClick={() => setOpen(false)}>
            <Logo className="text-xl" />
          </Link>

          <div className="mx-2 hidden h-5 w-px md:block" style={{ background: "var(--line)" }} />

          <ul className="hidden items-center md:flex">
            {LINKS.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <li key={l.href} className="relative">
                  <Link
                    href={l.href}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      active ? "text-(--bg)" : "text-(--muted) hover:text-(--ink)"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: "var(--ink)" }}
                        transition={{ duration: 0.5, ease: EASE_EXPO }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mx-1 hidden h-5 w-px md:block" style={{ background: "var(--line)" }} />

          <ThemeToggle className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 hover:bg-(--surface-2)" />

          <Link
            href="/contact"
            className="group relative ml-1 hidden overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium md:block"
            style={{ background: "var(--orange)", color: "#0B0A08" }}
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
              style={{ background: "var(--grad)", transitionTimingFunction: "var(--ease)" }}
            />
            <span className="relative z-10">Let&apos;s talk</span>
          </Link>

          <button
            className="relative z-9800 flex h-9 w-9 flex-col items-center justify-center gap-[6px] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={cn(
                "h-px w-5 transition-transform duration-400",
                open && "translate-y-[3.5px] rotate-45"
              )}
              style={{ background: "var(--ink)", transitionTimingFunction: "var(--ease)" }}
            />
            <span
              className={cn(
                "h-px w-5 transition-transform duration-400",
                open && "-translate-y-[3.5px] -rotate-45"
              )}
              style={{ background: "var(--ink)", transitionTimingFunction: "var(--ease)" }}
            />
          </button>
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
              Open to opportunities
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
