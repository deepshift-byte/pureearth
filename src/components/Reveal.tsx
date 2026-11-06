"use client";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Uncovers a photo from the bottom edge the first time it scrolls into view. */
export function RevealPic({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ clipPath: "inset(14% 0 0 0)", opacity: 0.2 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.05, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Lifts a block of text into place. */
export function Rise({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ y: 26, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-6% 0px" }} transition={{ duration: 0.85, ease, delay }}>
      {children}
    </motion.div>
  );
}
