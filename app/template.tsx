"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollTrigger } from "@/lib/gsap";
import { curtain, pageContent } from "@/lib/animations";
import RevealInit from "@/components/layout/RevealInit";
import Logo from "@/components/ui/Logo";

/**
 * Route transition: curtain (surface + monogram) sweeps up while the
 * incoming page rises in. template.tsx remounts per navigation, so the
 * reveal system re-initializes and ScrollTrigger gets refreshed.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 750);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        variants={curtain}
        initial="initial"
        animate="animate"
        className="pointer-events-none fixed inset-0 z-9600 flex origin-top items-center justify-center"
        style={{ background: "var(--surface)" }}
      >
        <Logo className="text-5xl opacity-40" />
      </motion.div>
      <motion.div variants={pageContent} initial="initial" animate="animate">
        <RevealInit />
        {children}
      </motion.div>
    </>
  );
}
