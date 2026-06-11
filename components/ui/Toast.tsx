"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EASE_EXPO } from "@/lib/utils";

export default function Toast({ show, message }: { show: boolean; message: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.35, ease: EASE_EXPO }}
          role="status"
          className="glass fixed bottom-8 left-1/2 z-9950 -translate-x-1/2 rounded-full px-5 py-2.5 text-sm font-medium"
          style={{ color: "var(--teal)" }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
