"use client";

import React from "react";
import { FolderGit2, Zap, Cpu, Sparkles, FileText, Mail, HelpCircle, Terminal } from "lucide-react";
import { SUGGESTED_QUESTIONS } from "@/data/portfolioKnowledge";

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
  isDebugMode?: boolean;
}

function getPromptIcon(prompt: string) {
  const lower = prompt.toLowerCase();
  if (lower.includes("debug") || lower.startsWith("/")) {
    return Terminal;
  }
  if (lower.includes("top projects") || lower.includes("projects")) {
    return FolderGit2;
  }
  if (lower.includes("hurdle") || lower.includes("newsflow")) {
    return Zap;
  }
  if (lower.includes("tech stack") || lower.includes("ai background")) {
    return Cpu;
  }
  if (lower.includes("jamflow") || lower.includes("mindtiles")) {
    return Sparkles;
  }
  if (lower.includes("resume") || lower.includes("cv")) {
    return FileText;
  }
  if (lower.includes("touch") || lower.includes("hire") || lower.includes("contact")) {
    return Mail;
  }
  return HelpCircle;
}

const DEBUG_COMMANDS = [
  "/sysinfo",
  "/stack",
  "/projects",
  "/exit",
];

export default function SuggestedPrompts({
  onSelectPrompt,
  disabled,
  isDebugMode = false,
}: SuggestedPromptsProps) {
  if (isDebugMode) {
    return (
      <div className="py-2">
        <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 mb-2 px-1">
          Telemetry Commands:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {DEBUG_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              disabled={disabled}
              onClick={() => onSelectPrompt(cmd)}
              className="inline-flex items-center gap-1.5 text-xs font-mono bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/30 shadow-xs transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Terminal size={11} className="text-emerald-400" />
              <span>{cmd}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      <p className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider mb-2 px-1">
        Suggested Inquiries:
      </p>
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTED_QUESTIONS.map((prompt) => {
          const Icon = getPromptIcon(prompt);
          return (
            <button
              key={prompt}
              type="button"
              disabled={disabled}
              onClick={() => onSelectPrompt(prompt)}
              className="inline-flex items-center gap-1.5 text-xs text-left bg-white/80 hover:bg-white text-foreground/80 hover:text-foreground px-3 py-1.5 rounded-full border border-foreground/10 hover:border-foreground/25 shadow-xs transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <Icon size={12} className="shrink-0 text-foreground/50" />
              <span>{prompt}</span>
            </button>
          );
        })}

        {/* Easter egg Dev Terminal chip */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => onSelectPrompt("/debug")}
          className="inline-flex items-center gap-1.5 text-xs text-left bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground px-3 py-1.5 rounded-full border border-foreground/10 shadow-xs transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer font-mono"
        >
          <Terminal size={11} className="shrink-0 text-foreground/50" />
          <span>/debug</span>
        </button>
      </div>
    </div>
  );
}
