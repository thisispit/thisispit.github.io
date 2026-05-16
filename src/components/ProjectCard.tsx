"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  details?: string[];
  githubUrl?: string;
  liveUrl?: string;
  previewAesthetic?: ReactNode;
}

export default function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  liveUrl,
  previewAesthetic,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2rem] overflow-hidden shadow-soft border border-foreground/5 flex flex-col h-full group"
    >
      {/* Preview Section - Clickable */}
      <a 
        href={liveUrl || githubUrl || "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative h-64 w-full bg-secondary-background overflow-hidden flex items-center justify-center block"
      >
        {previewAesthetic || (
          <div className="absolute inset-0 flex items-center justify-center text-foreground/10 font-poppins text-xl font-bold uppercase tracking-tighter">
            {title}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
          <ArrowUpRight size={18} className="text-foreground" />
        </div>
      </a>

      <div className="p-8 md:p-10 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 bg-background rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground/60 border border-foreground/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-3xl font-poppins font-black mb-4 leading-none tracking-tighter uppercase">
          {title}
        </h3>

        {/* Description */}
        <p className="text-foreground/70 font-inter text-base mb-8 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto pt-6 border-t border-foreground/5">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-4 px-6 rounded-full bg-foreground text-background text-center text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors shadow-soft"
            >
              Live View
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:flex-1 py-4 px-6 rounded-full border border-foreground/10 text-center text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-background transition-colors ${!liveUrl ? 'bg-foreground text-background border-none' : 'text-foreground/60'}`}
            >
              View Project
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
