"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send } from "lucide-react";
import { SUGGESTED_QUESTIONS } from "@/lib/chatbot-data";
import type { ChatMessage } from "@/types";

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm SolarPulse AI. Ask me about installation, savings, pricing, or booking a site visit.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again or contact us directly.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Chat panel — rendered inline (no portal needed since FloatingActions
          is already outside transform-creating providers in PageShell) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed z-[10000] w-[min(calc(100vw-2rem),380px)] rounded-2xl overflow-hidden shadow-2xl border border-white/30 bg-white/95"
            style={{
              right: 16,
              bottom: "calc(1rem + 7rem)",
              maxHeight: "calc(100dvh - 10rem)",
            }}
            role="dialog"
            aria-label="AI chat assistant"
          >
            <div className="flex items-center justify-between p-4 border-b border-outline-variant/20 bg-primary/5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" aria-hidden />
                <p className="font-semibold text-primary m-0 text-sm">
                  SolarPulse AI
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-surface-container touch-manipulation"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable message area with capped height */}
            <div
              className="flex flex-col overflow-hidden"
              style={{ maxHeight: "calc(100dvh - 18rem)" }}
            >
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 h-64 sm:h-80">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <p
                      className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm m-0 ${
                        msg.role === "user"
                          ? "bg-primary text-white"
                          : "bg-surface-container text-on-surface"
                      }`}
                    >
                      {msg.content}
                    </p>
                  </div>
                ))}
                {typing && (
                  <p className="text-sm text-on-surface-variant animate-pulse m-0">
                    Typing…
                  </p>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="p-3 border-t border-outline-variant/20 flex flex-wrap gap-2 shrink-0">
                {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-2 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 touch-manipulation"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="p-3 flex gap-2 border-t border-outline-variant/20 shrink-0"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about solar…"
                  className="flex-1 rounded-full px-4 py-2 text-sm bg-surface-container-low border border-outline-variant/30 focus:ring-2 focus:ring-secondary min-h-11"
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  className="p-3 rounded-full gradient-cta text-white shrink-0 touch-manipulation min-h-11 min-w-11 flex items-center justify-center"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center gap-2 bg-primary text-white min-h-12 min-w-12 px-4 py-3 rounded-full shadow-2xl touch-manipulation active:scale-95"
        aria-expanded={open}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
      >
        <Sparkles className="h-6 w-6 shrink-0" aria-hidden />
        <span className="text-sm font-semibold hidden sm:inline">AI Q&A</span>
      </button>
    </>
  );
}