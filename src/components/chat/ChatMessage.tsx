"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, User, Terminal } from "lucide-react";
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
  const isDebug = message.isDebug;

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
              className={`absolute -inset-1 rounded-full blur-xs pointer-events-none ${
                isDebug ? "bg-emerald-500/20" : "bg-foreground/10"
              }`}
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
            className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-xs border ${
              isDebug
                ? "bg-[#0c1017] border-emerald-500/30 text-emerald-400"
                : "bg-background border-foreground/15 text-foreground"
            }`}
          >
            {isDebug ? <Terminal size={14} /> : <Sparkles size={14} />}
          </motion.div>
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`relative text-sm shadow-soft overflow-hidden ${
          isUser
            ? "max-w-[90%] sm:max-w-[88%] bg-foreground text-background rounded-2xl rounded-tr-xs px-4 py-3 font-inter leading-relaxed"
            : isDebug
            ? "max-w-[95%] sm:max-w-[92%] bg-[#0d1117] text-slate-200 border border-emerald-500/30 rounded-2xl rounded-tl-xs px-4 py-3 font-mono text-xs"
            : isStreaming && !message.content.trim()
            ? "w-fit bg-white text-foreground rounded-2xl rounded-tl-xs px-4 py-2.5 border border-foreground/10 flex items-center"
            : "max-w-[90%] sm:max-w-[88%] bg-white text-foreground rounded-2xl rounded-tl-xs px-4 py-3 font-inter border border-foreground/5"
        }`}
      >
        {/* Terminal Header Bar if in Debug Mode */}
        {isDebug && !isUser && (
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-emerald-400/80 font-mono select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/70 inline-block" />
              <span className="w-2 h-2 rounded-full bg-amber-500/70 inline-block" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/70 inline-block" />
              <span className="ml-1 text-slate-400">pitamber@sys-core:~$</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              DEBUG_LOG
            </span>
          </div>
        )}

        {/* Shimmer accent while streaming text */}
        {!isUser && isStreaming && message.content.trim().length > 0 && (
          <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden rounded-b-2xl pointer-events-none">
            <motion.div
              className={`h-full w-28 ${
                isDebug
                  ? "bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
                  : "bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
              }`}
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
              {/* While waiting for words to start, show 3-dot typing wave */}
              {isStreaming && !message.content.trim() ? (
                <div className="flex items-center gap-1.5 py-1 px-0.5 select-none">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className={`w-2 h-2 rounded-full inline-block ${
                        isDebug ? "bg-emerald-400/70" : "bg-foreground/60"
                      }`}
                      animate={{
                        y: [0, -4, 0],
                        opacity: [0.35, 1, 0.35],
                        scale: [0.85, 1.15, 0.85],
                      }}
                      transition={{
                        duration: 0.85,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.14,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className={`${
                    isDebug
                      ? "text-slate-200 leading-relaxed text-xs font-mono"
                      : "text-foreground/90 leading-relaxed text-sm font-inter"
                  }`}
                >
                  <div
                    className={`${
                      isDebug
                        ? "[&>p]:my-1.5 [&>pre]:bg-black/60 [&>pre]:text-emerald-300 [&>pre]:p-2.5 [&>pre]:rounded-lg [&>pre]:border [&>pre]:border-emerald-500/20 [&>code]:bg-white/10 [&>code]:text-emerald-300 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded"
                        : "[&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>ul]:my-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:my-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>li]:my-0.5 [&>code]:bg-black/5 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs [&>code]:font-mono [&>pre]:bg-neutral-900 [&>pre]:text-neutral-100 [&>pre]:p-3 [&>pre]:rounded-xl [&>pre]:my-2 [&>pre]:overflow-x-auto [&>pre]:text-xs [&>pre]:font-mono"
                    } ${
                      isStreaming
                        ? "[&>*:last-child]:after:content-[''] [&>*:last-child]:after:inline-block [&>*:last-child]:after:w-1.5 [&>*:last-child]:after:h-4 [&>*:last-child]:after:ml-1.5 [&>*:last-child]:after:bg-current [&>*:last-child]:after:align-middle [&>*:last-child]:after:animate-pulse [&>*:last-child]:after:rounded-xs"
                        : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: renderedHtml }}
                  />
                </div>
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
