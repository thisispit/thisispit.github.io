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
      {/* Subtle, GPU-accelerated dual-layer ambient pulsating glow */}
      {!isOpen && (
        <>
          <motion.div
            animate={{
              scale: isLoading ? [1, 1.15, 1] : [1, 1.12, 1],
              opacity: isLoading ? [0.4, 0.8, 0.4] : [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: isLoading ? 1.8 : 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-1 rounded-full bg-foreground/15 blur-md pointer-events-none will-change-transform"
          />
          <motion.div
            animate={{
              scale: [1, 1.22, 1],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.35,
            }}
            className="absolute -inset-2.5 rounded-full bg-emerald-500/20 blur-lg pointer-events-none will-change-transform"
          />
        </>
      )}

      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
        className="relative flex items-center gap-3 px-5 py-3 rounded-full bg-white text-foreground border-2 border-foreground/18 hover:border-foreground/35 shadow-soft-xl cursor-pointer group select-none transition-all"
      >
        <div className="relative shrink-0">
          <motion.div
            animate={{
              rotate: isOpen ? 90 : 0,
              scale: !isOpen ? [1, 1.08, 1] : 1,
            }}
            transition={{
              scale: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
              rotate: { type: "spring", stiffness: 350, damping: 25 },
            }}
            className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center shadow-xs"
          >
            {isOpen ? <X size={16} /> : <Sparkles size={16} className="text-white" />}
          </motion.div>

          {/* Live status pulse dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isLoading ? "bg-foreground/50" : "bg-emerald-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 border-2 border-white ${
                isLoading ? "bg-foreground" : "bg-emerald-500"
              }`}
            />
          </span>
        </div>

        <span className="text-[13.5px] font-poppins font-black uppercase tracking-wider text-foreground pr-0.5">
          ASK PIT
        </span>
      </motion.button>
    </div>
  );
}
