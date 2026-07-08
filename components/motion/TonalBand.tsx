"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/*
  The home page's tonal journey (CLAUDE.md §3): the workshop band darkens from
  bone to charcoal as it scrolls into view, then the page returns to light.
  Scroll-linked colour only — no scroll-jacking. Static charcoal under
  prefers-reduced-motion.
*/
const BONE = "#f9f3ec";
const CHARCOAL = "#191410";
const INK = "#2b221b";

export default function TonalBand({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 35%"],
  });
  const backgroundColor = useTransform(scrollYProgress, [0, 1], [BONE, CHARCOAL]);
  const color = useTransform(scrollYProgress, [0, 1], [INK, BONE]);

  if (reduce) {
    return (
      <section
        ref={ref}
        className={className}
        style={{ backgroundColor: CHARCOAL, color: BONE }}
      >
        {children}
      </section>
    );
  }
  return (
    <motion.section ref={ref} className={className} style={{ backgroundColor, color }}>
      {children}
    </motion.section>
  );
}
