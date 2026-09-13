"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ChatTrigger from "./ChatTrigger";
import ChatWindow from "./ChatWindow";
import { ChatMessage, streamChatResponse } from "@/lib/chatService";

const STORAGE_KEY = "pitamber_portfolio_chat_v1";

function isPageReload(): boolean {
  if (typeof window === "undefined" || !window.performance) return false;
  try {
    const navEntries = window.performance.getEntriesByType("navigation");
    if (navEntries.length > 0) {
      return (navEntries[0] as PerformanceNavigationTiming).type === "reload";
    }
    // Fallback for older browser engines
    return (window.performance as unknown as { navigation?: { type: number } }).navigation?.type === 1;
  } catch {
    return false;
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      // If the page was refreshed (F5 / reload), reset the chat
      if (isPageReload()) {
        sessionStorage.removeItem(STORAGE_KEY);
        return [];
      }

      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore sessionStorage parsing errors
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Save chat history to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // Storage quota full or unavailable
      }
    }
  }, [messages]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClearHistory = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    setIsLoading(false);
    setStreamingMessageId(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setStreamingMessageId(null);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: Date.now(),
    };

    const assistantMsgId = `assistant-${Date.now()}`;
    const initialAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, initialAssistantMsg]);
    setIsLoading(true);
    setStreamingMessageId(assistantMsgId);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await streamChatResponse(
        newMessages,
        (chunk) => {
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === assistantMsgId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        },
        controller.signal
      );
    } catch (err: unknown) {
      if ((err as Error)?.name !== "AbortError") {
        console.error("Chat error:", err);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content:
                    msg.content ||
                    "I encountered a temporary connection issue. Please try again or reach out to Pitamber directly at pitambersiingh@gmail.com.",
                }
              : msg
          )
        );
      }
    } finally {
      setIsLoading(false);
      setStreamingMessageId(null);
      abortControllerRef.current = null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            isOpen={isOpen}
            onClose={handleClose}
            onClearHistory={handleClearHistory}
            messages={messages}
            isLoading={isLoading}
            streamingMessageId={streamingMessageId}
            onSendMessage={handleSendMessage}
            onStopStreaming={handleStopStreaming}
          />
        )}
      </AnimatePresence>

      <ChatTrigger
        isOpen={isOpen}
        onToggle={handleToggle}
        isLoading={isLoading}
      />
    </>
  );
}
