import type { Variants } from "framer-motion";
import { EASE_EXPO, EASE_QUART } from "./utils";

/** Framer Motion is used for page transitions + micro-interactions only. */

export const pageContent: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.35, ease: EASE_EXPO },
  },
};

export const curtain: Variants = {
  initial: { scaleY: 1 },
  animate: {
    scaleY: 0,
    transition: { duration: 0.65, delay: 0.05, ease: EASE_QUART },
  },
};

/** GSAP reveal defaults — single source of truth for the data-reveal system. */
export const REVEAL = {
  y: 36,
  duration: 1.05,
  ease: "expo.out",
  stagger: 0.08,
  start: "top 86%",
} as const;
