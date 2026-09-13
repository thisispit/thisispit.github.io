"use client";

import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, Square } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onStopStreaming?: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSendMessage,
  onStopStreaming,
  isLoading,
  placeholder = "Ask anything about Pitamber's projects or skills...",
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    // Focus input on load if not mobile
    if (window.innerWidth > 640) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-white/90 backdrop-blur-md border-t border-foreground/10 flex items-center gap-2"
    >
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 bg-secondary-background/80 hover:bg-secondary-background focus:bg-white text-foreground text-sm rounded-full px-4 py-2.5 outline-none border border-foreground/10 focus:border-foreground/30 transition-all placeholder:text-foreground/40 disabled:opacity-60"
      />

      {isLoading && onStopStreaming ? (
        <button
          type="button"
          onClick={onStopStreaming}
          aria-label="Stop generating"
          className="w-10 h-10 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground flex items-center justify-center transition-colors shrink-0 cursor-pointer"
        >
          <Square size={14} className="fill-current" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
          className="w-10 h-10 rounded-full bg-foreground text-background hover:bg-foreground/80 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all duration-200 shrink-0 shadow-soft cursor-pointer active:scale-95"
        >
          <SendHorizontal size={16} />
        </button>
      )}
    </form>
  );
}
