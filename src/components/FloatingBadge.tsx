"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingBadgeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FloatingBadge({ children, className = "", delay = 0 }: FloatingBadgeProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className={`inline-flex items-center px-6 py-3 bg-white rounded-full shadow-soft text-sm font-medium border border-foreground/5 ${className}`}
    >
      {children}
    </motion.div>
  );
}
