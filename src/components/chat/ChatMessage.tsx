"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import { marked } from "marked";
import { ChatMessage as ChatMessageType } from "@/lib/chatService";

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
}

// Configure marked to open external links and PDFs in new tabs safely
marked.use({
  gfm: true,
  breaks: true,
  renderer: {
    link({ href, title, text }: { href: string; title?: string | null; text: string }) {
      const isExternal = href.startsWith("http") || href.endsWith(".pdf");
      const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${title ? ` title="${title}"` : ""}${targetAttr} class="font-semibold text-foreground underline underline-offset-4 decoration-foreground/40 hover:decoration-foreground hover:text-black transition-colors">${text}</a>`;
    },
  },
} as Parameters<typeof marked.use>[0]);

export default function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  const renderedHtml = useMemo(() => {
    if (isUser) return "";
    try {
      return marked.parse(message.content) as string;
    } catch {
      return message.content;
    }
  }, [message.content, isUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`flex gap-3 my-3.5 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <div className="relative shrink-0 mt-0.5">
          {/* Subtle ambient aura while bot is responding */}
          {isStreaming && (
            <motion.div
              className="absolute -inset-1 rounded-full bg-foreground/10 blur-xs pointer-events-none"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
          <motion.div
            animate={isStreaming ? { rotate: [0, 8, -8, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-8 h-8 rounded-full bg-background border border-foreground/15 flex items-center justify-center shadow-xs"
          >
            <Sparkles size={14} className="text-foreground" />
          </motion.div>
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`relative max-w-[90%] sm:max-w-[88%] rounded-2xl px-4 py-3 text-sm shadow-soft overflow-hidden ${
          isUser
            ? "bg-foreground text-background rounded-tr-xs font-inter leading-relaxed"
            : "bg-white text-foreground rounded-tl-xs border border-foreground/5 font-inter"
        }`}
      >
        {/* Subtle, smooth gliding accent shimmer at the bottom of the card while streaming */}
        {!isUser && isStreaming && (
          <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden rounded-b-2xl pointer-events-none">
            <motion.div
              className="h-full w-28 bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
              animate={{
                x: ["-100%", "350%"],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        )}

        <div className="break-words">
          {isUser ? (
            <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div>
              {/* If streaming hasn't produced words yet, show classic smooth typing wave */}
              {isStreaming && !message.content.trim() ? (
                <div className="flex items-center gap-2 py-1.5 px-0.5 select-none">
                  <span className="font-inter text-xs text-foreground/55 font-medium">Typing</span>
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-foreground/60 inline-block"
                        animate={{
                          y: [0, -4, 0],
                          opacity: [0.35, 1, 0.35],
                          scale: [0.9, 1.15, 0.9],
                        }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.16,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="text-foreground/90 leading-relaxed text-sm"
                >
                  <div
                    className="[&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>ul]:my-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:my-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>li]:my-0.5 [&>code]:bg-black/5 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs [&>code]:font-mono [&>pre]:bg-neutral-900 [&>pre]:text-neutral-100 [&>pre]:p-3 [&>pre]:rounded-xl [&>pre]:my-2 [&>pre]:overflow-x-auto [&>pre]:text-xs [&>pre]:font-mono"
                    dangerouslySetInnerHTML={{ __html: renderedHtml }}
                  />
                  {isStreaming && (
                    <motion.span
                      className="inline-block w-2 h-4 ml-1.5 rounded-xs bg-foreground align-middle"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.65, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <User size={14} />
        </div>
      )}
    </motion.div>
  );
}
