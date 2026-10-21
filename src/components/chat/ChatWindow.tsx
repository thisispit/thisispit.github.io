"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, RotateCcw, Sparkles, Terminal, Briefcase, Code, Handshake } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import SuggestedPrompts from "./SuggestedPrompts";
import { ChatMessage as ChatMessageType, VisitorIntent, getIndianTimeInfo } from "@/lib/chatService";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onClearHistory: () => void;
  messages: ChatMessageType[];
  isLoading: boolean;
  streamingMessageId: string | null;
  onSendMessage: (text: string) => void;
  onStopStreaming: () => void;
  isDebugMode?: boolean;
  onToggleDebug?: () => void;
  visitorIntent?: VisitorIntent;
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
  isDebugMode = false,
  onToggleDebug,
  visitorIntent = "curious",
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeInfo, setTimeInfo] = useState(getIndianTimeInfo);

  // Update time info periodically
  useEffect(() => {
    setTimeInfo(getIndianTimeInfo());
    const interval = setInterval(() => {
      setTimeInfo(getIndianTimeInfo());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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

  const isNight = timeInfo.period === "late-night";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className={`fixed bottom-[86px] right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[480px] md:w-[500px] h-[580px] max-h-[85vh] rounded-3xl shadow-soft-lg flex flex-col overflow-hidden will-change-transform border transition-colors ${
        isDebugMode
          ? "bg-[#0c1017] border-emerald-500/30 text-slate-100"
          : "bg-secondary-background border-foreground/10 text-foreground"
      }`}
    >
      {/* 1. Header */}
      <div
        className={`px-4 sm:px-5 py-3.5 border-b backdrop-blur-md flex items-center justify-between shrink-0 transition-colors ${
          isDebugMode
            ? "bg-[#0d131d]/95 border-emerald-500/20 text-slate-200"
            : "bg-white/90 border-foreground/10 text-foreground"
        }`}
      >
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div
            className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border shadow-xs shrink-0 ${
              isDebugMode ? "border-emerald-500/40 bg-black" : "border-foreground/10 bg-background"
            }`}
          >
            <Image
              src="/media/img/profile4.png"
              alt="Pitamber Singh"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-xs sm:text-sm font-poppins font-bold tracking-tight truncate">
                {isDebugMode ? "Pitamber Terminal" : "Pitamber's AI"}
              </h3>

              {/* Visitor Intent Badge */}
              {visitorIntent === "recruiter" && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <Briefcase size={10} />
                  <span>Recruiter</span>
                </span>
              )}
              {visitorIntent === "engineer" && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                  <Code size={10} />
                  <span>Dev View</span>
                </span>
              )}
              {visitorIntent === "collaborator" && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Handshake size={10} />
                  <span>Collab</span>
                </span>
              )}
            </div>

            {/* Online Status */}
            <div className="flex items-center gap-1.5 text-[10px] text-foreground/50">
              <span
                className={`inline-flex items-center gap-1 font-medium ${
                  isLoading
                    ? "text-foreground/70"
                    : isDebugMode
                    ? "text-emerald-400"
                    : "text-emerald-600"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                {isLoading
                  ? "Typing..."
                  : isDebugMode
                  ? "Terminal active"
                  : isNight
                  ? "Night owl"
                  : "Online"}
              </span>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1 text-foreground/50 shrink-0">
          {/* Debug Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDebug}
            title={isDebugMode ? "Exit developer mode" : "Toggle developer mode (/debug)"}
            aria-label="Toggle developer mode"
            className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all flex items-center gap-1 border cursor-pointer ${
              isDebugMode
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-xs"
                : "bg-foreground/5 text-foreground/60 border-foreground/10 hover:text-foreground hover:bg-foreground/10"
            }`}
          >
            <Terminal size={11} />
            <span>DEV</span>
          </button>

          <button
            type="button"
            onClick={onClearHistory}
            title="Reset conversation"
            aria-label="Reset conversation"
            className="w-8 h-8 rounded-full hover:bg-foreground/5 hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Close chat"
            aria-label="Close chat"
            className="w-8 h-8 rounded-full hover:bg-foreground/5 hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* 2. Messages Viewport */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-2 no-scrollbar"
      >
        {/* Welcome Greeting Banner */}
        <div
          className={`p-3 sm:p-4 rounded-2xl border mb-4 shadow-xs transition-colors ${
            isDebugMode
              ? "bg-[#0f1622] border-emerald-500/20 text-slate-300 font-mono text-xs"
              : "bg-white/70 border-foreground/5 text-foreground font-inter"
          }`}
        >
          <div className="flex items-center gap-1.5 font-poppins font-bold text-xs uppercase tracking-wider mb-2">
            {isDebugMode ? (
              <>
                <Terminal size={13} className="text-emerald-400" />
                <span className="text-emerald-400 font-mono text-xs">PITAMBER OS v2.1</span>
              </>
            ) : (
              <>
                <Sparkles size={14} className="text-foreground/70" />
                <span>Hey there! 👋</span>
              </>
            )}
          </div>

          <p className="text-xs text-foreground/75 leading-relaxed">
            {isDebugMode ? (
              <>
                <span className="hidden sm:inline">
                  Developer terminal mode active. Type /help for all commands, or ask anything — responses include telemetry headers.
                </span>
                <span className="sm:hidden">
                  Terminal active. Type /help or pick a command below.
                </span>
              </>
            ) : (
              "Glad you dropped by. I'm here to give you insight into Pit—his engineering background, projects, Java/Python stack, and journey."
            )}
          </p>

          <p className="text-xs text-foreground/75 leading-relaxed mt-1.5">
            {isDebugMode ? "Quick commands:" : "Feel free to ask me anything:"}
          </p>

          <SuggestedPrompts
            onSelectPrompt={onSendMessage}
            disabled={isLoading}
            isDebugMode={isDebugMode}
          />
        </div>

        {/* Message Thread */}
        {messages
          .filter(
            (msg) =>
              msg.role === "user" ||
              msg.content.trim().length > 0 ||
              msg.id === streamingMessageId
          )
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
        placeholder={
          isDebugMode
            ? "Enter a command or query..."
            : "Ask me anything..."
        }
      />
    </motion.div>
  );
}
