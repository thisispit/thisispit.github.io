"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Resume", href: "/media/resume.pdf", highlight: true, target: "_blank" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 md:py-8 pointer-events-none">
      <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
        <Link href="/#about" className="pointer-events-auto group shrink-0">
          <div className="bg-white/50 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full shadow-soft border border-foreground/5 font-poppins font-extrabold text-sm md:text-lg tracking-tighter uppercase transition-transform hover:scale-105 active:scale-95">
            Pitamber
            <span className="text-foreground/40 group-hover:text-foreground transition-colors">.</span>
          </div>
        </Link>
        <div className="flex items-center gap-2 md:gap-4 pointer-events-auto bg-white/50 backdrop-blur-md px-3 md:px-6 py-1.5 md:py-2 rounded-full shadow-soft border border-foreground/5 ml-2 overflow-x-auto no-scrollbar max-w-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.target}
              rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
              className={`text-[8px] md:text-xs font-inter font-bold uppercase tracking-widest transition-all relative group whitespace-nowrap ${
                link.highlight 
                  ? "bg-foreground text-background px-3 md:px-6 py-1.5 md:py-2 rounded-full hover:bg-foreground/80" 
                  : "text-foreground/60 hover:text-foreground py-1.5 px-1 md:px-2"
              }`}
            >
              {link.name}
              {!link.highlight && (
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all group-hover:w-full"></span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
