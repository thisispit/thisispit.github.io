"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useSpring(0, { damping: 20, stiffness: 250, mass: 0.5 });
  const mouseY = useSpring(0, { damping: 20, stiffness: 250, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = 
        target.closest("a") || 
        target.closest("button") || 
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsHovered(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-foreground/20 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isHovered ? 2 : 1,
        backgroundColor: isHovered ? "rgba(var(--foreground-rgb), 0.05)" : "rgba(var(--foreground-rgb), 0)",
        borderColor: isHovered ? "rgba(var(--foreground-rgb), 0.1)" : "rgba(var(--foreground-rgb), 0.2)",
      }}
      transition={{ duration: 0.2 }}
    />
  );
}
