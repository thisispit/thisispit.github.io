"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
        const el = containerRef.current;
        const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 140;
        if (isNearBottom) {
          el.scrollTop = el.scrollHeight;
        }
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
          <div className="relative w-9 h-9 rounded-full bg-background overflow-hidden border border-foreground/10 shadow-xs shrink-0">
            <Image
              src="/media/img/profile4.png"
              alt="Pitamber Singh"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-poppins font-bold tracking-tight text-foreground">
              Pitamber&apos;s AI
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
            Glad you dropped by. I&apos;m here to give you a little more insight into Pit—his work, engineering background, skills, and journey.
          </p>
          <p className="text-xs text-foreground/75 leading-relaxed font-inter mt-1.5">
            Feel free to ask me anything:
          </p>

          <SuggestedPrompts
            onSelectPrompt={onSendMessage}
            disabled={isLoading}
          />
        </div>

        {/* Message Thread (renders user messages, messages with content, and active streaming message) */}
        {messages
          .filter((msg) => msg.role === "user" || msg.content.trim().length > 0 || msg.id === streamingMessageId)
          .map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isStreaming={msg.id === streamingMessageId}
            />
          ))}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Input Footer */}
      <ChatInput
        onSendMessage={onSendMessage}
        onStopStreaming={onStopStreaming}
        isLoading={isLoading}
      />
    </motion.div>
  );
}
