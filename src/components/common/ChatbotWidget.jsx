// @ts-nocheck
"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ── Paste your webhook URL here ──────────────────────────────────────────────
// Every message is POSTed as JSON: { sessionId, message, timestamp, page }
// Your AI agent should respond with JSON: { message: "..." }  (or reply / text / output)
const WEBHOOK_URL = "YOUR_WEBHOOK_URL_HERE";
// ─────────────────────────────────────────────────────────────────────────────

const BOT_GREETING = {
  id: "greeting",
  role: "bot",
  text: "👋 Hi! Welcome to **Farrell Motors**. How can I help you today?",
  timestamp: new Date(),
};

const QUICK_REPLIES = [
  "View available cars",
  "Apply for finance",
  "Book a test drive",
  "Contact us",
];

function formatText(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

function formatTime(d) {
  return d.toLocaleTimeString("en-IE", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen]       = useState(false);
  const [messages, setMessages]   = useState([BOT_GREETING]);
  const [input, setInput]         = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping]   = useState(false);
  const [sessionId] = useState(
    () => `session_${Date.now()}_${Math.random().toString(36).slice(2)}`
  );
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isSending) return;

    // Add user message immediately
    const userMsg = {
      id: `user_${Date.now()}`,
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);
    setIsTyping(true); // show typing dots while waiting for AI reply

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message:   text.trim(),
          timestamp: new Date().toISOString(),
          page:      typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (response.ok) {
        let botText = null;
        try {
          const data = await response.json();
          // Accept whichever key your AI agent returns
          botText =
            data.message ||
            data.reply   ||
            data.text    ||
            data.output  ||
            data.response||
            (typeof data === "string" ? data : null);
        } catch {
          // agent returned non-JSON — ignore
        }

        setIsTyping(false);

        // Only display a bubble if the agent actually replied
        if (botText) {
          setMessages((prev) => [
            ...prev,
            {
              id:        `bot_${Date.now()}`,
              role:      "bot",
              text:      botText,
              timestamp: new Date(),
            },
          ]);
        }
      } else {
        // Webhook returned an error — just stop typing, show nothing
        setIsTyping(false);
      }
    } catch {
      // Network error — stop typing, show nothing automated
      setIsTyping(false);
    } finally {
      setIsSending(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSending, sessionId]);

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-[#015581] shadow-[0_8px_30px_rgba(1,85,129,0.4)] transition-all duration-300 hover:bg-[#004468] hover:scale-110 active:scale-95"
      >
        <span className={`absolute transition-all duration-300 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"}`}>
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
        <span className={`absolute transition-all duration-300 ${isOpen ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}>
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </span>

        {/* Red notification dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e33935] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e33935] m-auto" />
          </span>
        )}
      </button>

      {/* ── Chat Window ── */}
      <div
        className={`fixed bottom-24 right-6 z-[9997] flex flex-col w-[calc(100vw-3rem)] max-w-[380px] rounded-2xl bg-white shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        style={{ height: "520px" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-[#015581] px-5 py-4 flex-shrink-0">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#015581] bg-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-black text-white">Farrell Motors</p>
            <p className="text-[10px] text-white/70 font-medium">Online · Typically replies instantly</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors p-1">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
              {msg.role === "bot" && (
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#015581] mt-1">
                  <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div className={`max-w-[75%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed font-medium ${
                  msg.role === "user"
                    ? "bg-[#015581] text-white rounded-tr-sm"
                    : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"
                }`}>
                  {formatText(msg.text)}
                </div>
                <span className="text-[9px] text-gray-400 font-medium px-1">{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator — shown while waiting for AI */}
          {isTyping && (
            <div className="flex justify-start gap-2">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#015581] mt-1">
                <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies — visible only at start */}
        {messages.length <= 1 && !isTyping && (
          <div className="flex gap-2 px-4 py-2 overflow-x-auto flex-shrink-0 bg-gray-50/50" style={{ scrollbarWidth: "none" }}>
            {QUICK_REPLIES.map((reply) => (
              <button key={reply} onClick={() => sendMessage(reply)} disabled={isSending}
                className="flex-shrink-0 rounded-full border border-[#015581] px-3 py-1.5 text-[10px] font-black text-[#015581] hover:bg-[#015581] hover:text-white transition-all whitespace-nowrap disabled:opacity-50">
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 bg-white flex-shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isSending}
            className="flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-[13px] font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#015581]/30 focus:bg-white transition-all disabled:opacity-50"
          />
          <button type="submit" disabled={!input.trim() || isSending}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#015581] text-white transition-all hover:bg-[#004468] active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed">
            {isSending ? (
              <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="px-4 py-2 bg-white border-t border-gray-50 text-center flex-shrink-0">
          <p className="text-[9px] text-gray-300 font-medium">Powered by Farrell Motors · Bray, Co. Wicklow</p>
        </div>
      </div>
    </>
  );
}
