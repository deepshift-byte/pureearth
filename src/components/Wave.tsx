"use client";
import { motion, useReducedMotion } from "motion/react";

const A = "M0,70 C130,15 270,10 400,50 C520,88 640,95 760,60 C850,34 930,25 1000,40 L1000,120 L0,120 Z";
const B = "M0,52 C150,30 250,38 400,66 C530,90 650,74 760,48 C860,26 930,40 1000,58 L1000,120 L0,120 Z";

/** The land line from the logo. It moves slowly, like water, unless motion is reduced. */
export function Wave({ fill, className, style, still }: { fill: string; className?: string; style?: React.CSSProperties; still?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <svg className={className} style={style} viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
      {still || reduce ? (
        <path d={A} fill={fill} />
      ) : (
        <motion.path d={A} fill={fill} animate={{ d: [A, B, A] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
      )}
    </svg>
  );
}
