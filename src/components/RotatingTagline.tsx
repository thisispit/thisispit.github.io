"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = [
  "curiosity",
  "code",
  "ideas",
  "debugging",
  "ambition"
];

export default function RotatingTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="flex flex-col items-center"
    >
      <div className="flex items-center justify-center gap-x-2 text-[10px] md:text-xs font-inter uppercase tracking-[0.2em] text-foreground/90">
        <span className="font-semibold">Powered by chai and</span>
        <div className="relative h-[1.2em] min-w-[10ch] flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ y: 8, opacity: 0, filter: "blur(2px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -8, opacity: 0, filter: "blur(2px)" }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute left-0 font-playfair italic font-bold lowercase tracking-normal text-foreground whitespace-nowrap"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
