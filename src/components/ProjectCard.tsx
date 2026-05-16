"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Globe } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  image,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl overflow-hidden shadow-soft border border-foreground/5 flex flex-col h-full"
    >
      {image && (
        <div className="relative h-48 w-full bg-secondary-background overflow-hidden">
          {/* Placeholder for project image */}
          <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-poppins text-xl font-bold uppercase tracking-tighter">
            {title}
          </div>
        </div>
      )}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-background rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-poppins font-extrabold mb-3 leading-tight uppercase tracking-tighter">
          {title}
        </h3>
        <p className="text-foreground/70 font-inter text-sm mb-6 flex-grow">
          {description}
        </p>
        <div className="flex gap-4 mt-auto">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-background transition-colors"
            >
              <Globe size={20} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-background transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
