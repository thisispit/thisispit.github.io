"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";

interface ChatTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
  isLoading?: boolean;
}

export default function ChatTrigger({
  isOpen,
  onToggle,
  isLoading = false,
}: ChatTriggerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Subtle, GPU-accelerated ambient glow (pure opacity/scale, no box-shadow repaints) */}
      {!isOpen && (
        <motion.div
          animate={{
            scale: isLoading ? [1, 1.1, 1] : [1, 1.06, 1],
            opacity: isLoading ? [0.35, 0.75, 0.35] : [0.25, 0.6, 0.25],
          }}
          transition={{
            duration: isLoading ? 1.8 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-1 rounded-full bg-foreground/10 blur-md pointer-events-none will-change-transform"
        />
      )}

      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
        className="relative flex items-center gap-2.5 px-5 py-3 rounded-full bg-white text-foreground border border-foreground/12 hover:border-foreground/25 shadow-soft-lg cursor-pointer group select-none transition-colors"
      >
        <div className="relative shrink-0">
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-foreground/10 text-foreground shadow-xs"
          >
            {isOpen ? <X size={16} /> : <Sparkles size={16} />}
          </motion.div>

          {/* Live status pulse dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isLoading ? "bg-foreground/50" : "bg-emerald-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 border border-white ${
                isLoading ? "bg-foreground/80" : "bg-emerald-500"
              }`}
            />
          </span>
        </div>

        <span className="text-[13px] font-poppins font-extrabold uppercase tracking-wider text-foreground pr-1">
          ASK PIT
        </span>
      </motion.button>
    </div>
  );
}
