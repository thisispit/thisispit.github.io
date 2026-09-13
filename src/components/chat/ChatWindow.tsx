"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, RotateCcw, Sparkles } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import SuggestedPrompts from "./SuggestedPrompts";
import { ChatMessage as ChatMessageType } from "@/lib/chatService";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onClearHistory: () => void;
  messages: ChatMessageType[];
  isLoading: boolean;
  streamingMessageId: string | null;
  onSendMessage: (text: string) => void;
  onStopStreaming: () => void;
}

export default function ChatWindow({
  isOpen,
  onClose,
  onClearHistory,
  messages,
  isLoading,
  streamingMessageId,
  onSendMessage,
  onStopStreaming,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll cleanly without jitter
  useEffect(() => {
    if (containerRef.current) {
      if (streamingMessageId) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, streamingMessageId]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className="fixed bottom-[86px] right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[480px] md:w-[500px] h-[580px] max-h-[85vh] bg-secondary-background rounded-3xl shadow-soft-lg border border-foreground/10 flex flex-col overflow-hidden will-change-transform"
    >
      {/* 1. Header */}
      <div className="px-5 py-4 bg-white/90 backdrop-blur-md border-b border-foreground/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-background overflow-hidden border border-foreground/10 shadow-xs">
            <Image
              src="/media/img/profile4.png"
              alt="Pitamber Singh"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-poppins font-extrabold uppercase tracking-tight text-foreground">
                Pitamber
              </h3>
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold border transition-all duration-300 ${
                  isLoading
                    ? "bg-foreground/5 text-foreground border-foreground/15"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isLoading ? "bg-foreground/40" : "bg-emerald-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                      isLoading ? "bg-foreground/75" : "bg-emerald-500"
                    }`}
                  />
                </span>
                {isLoading ? "Responding..." : "Online"}
              </span>
            </div>
            <p className="text-[11px] font-inter text-foreground/50">
              Data Engineer · Ask me anything
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1 text-foreground/50">
          <button
            type="button"
            onClick={onClearHistory}
            title="Reset conversation"
            aria-label="Reset conversation"
            className="w-8 h-8 rounded-full hover:bg-foreground/5 hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Close chat"
            aria-label="Close chat"
            className="w-8 h-8 rounded-full hover:bg-foreground/5 hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* 2. Messages Viewport */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-5 py-4 space-y-2 no-scrollbar"
      >
        {/* Welcome Greeting Banner */}
        <div className="p-4 bg-white/70 rounded-2xl border border-foreground/5 mb-4 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-foreground font-poppins font-bold text-xs uppercase tracking-wider">
            <Sparkles size={14} className="text-foreground/70" />
            <span>Hey there! 👋</span>
          </div>
          <p className="text-xs text-foreground/75 leading-relaxed font-inter">
            Glad you dropped by. Feel free to ask about my projects like <strong>NewsFlow</strong> or <strong>MindTiles</strong>, my engineering background, or getting in touch:
          </p>

          <SuggestedPrompts
            onSelectPrompt={onSendMessage}
            disabled={isLoading}
          />
        </div>

        {/* Message Thread */}
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isStreaming={msg.id === streamingMessageId}
          />
        ))}

        {/* Fallback Loading Placeholder (smooth undulating dots, no jerky bounce) */}
        {isLoading && !streamingMessageId && (
          <div className="flex items-center gap-2.5 text-xs text-foreground/60 p-2">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center border border-foreground/10 shadow-xs">
              <Sparkles size={13} className="text-foreground" />
            </div>
            <div className="flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-foreground/50"
                  animate={{
                    y: [0, -3.5, 0],
                    opacity: [0.35, 0.95, 0.35],
                  }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.18,
                  }}
                />
              ))}
            </div>
            <span className="font-inter text-[11px] text-foreground/50">Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 2.5 Active Typing Indicator Bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="px-5 py-1.5 bg-white/70 backdrop-blur-sm border-t border-foreground/5 flex items-center gap-2 select-none overflow-hidden shrink-0"
          >
            <span className="font-inter text-[11px] font-medium text-foreground/60">
              Pitamber is typing
            </span>
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-foreground/50"
                  animate={{
                    y: [0, -3, 0],
                    opacity: [0.35, 1, 0.35],
                  }}
                  transition={{
                    duration: 0.85,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Input Footer */}
      <ChatInput
        onSendMessage={onSendMessage}
        onStopStreaming={onStopStreaming}
        isLoading={isLoading}
      />
    </motion.div>
  );
}
