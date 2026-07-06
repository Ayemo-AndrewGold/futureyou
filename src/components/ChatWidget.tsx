"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import Image from "next/image";

const PRIMARY = "#293C97";
const PRIMARY_DARK = "#1e2d85";
const BACKGROUND = "#F7F8FC";
const BORDER = "#E5E7F2";

const WHATSAPP_NUMBER = "2348124106198"; // 👉 international format, no + or spaces

const quickOptions = [
  "How do I get started?",
  "I want to apply for business support",
  "Talk to a human agent",
];

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    setHasInteracted(true);
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, sender: "user" },
    ]);
    setMessage("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks for reaching out! Tap below to continue this on WhatsApp — our team will respond right away.",
          sender: "bot",
        },
      ]);
    }, 900);
  };

  const continueOnWhatsApp = () => {
    const lastUserMessage =
      [...messages].reverse().find((m) => m.sender === "user")?.text ||
      "Hi! I'd like to know more about FutureYou.";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lastUserMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">

      {/* Chat panel */}
      {open && (
        <div
          className="w-[340px] max-w-[90vw] h-[480px] max-h-[70vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border animate-chatPop origin-bottom-right pointer-events-auto"
          style={{ borderColor: BORDER }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3.5 shrink-0"
            style={{ backgroundColor: PRIMARY }}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                <Image
                  src="/images/headerLogo.svg"
                  alt="FutureYou"
                  width={26}
                  height={26}
                  className="object-contain"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white leading-tight">
                  FutureYou Support
                </h4>
                <span className="text-[11px] text-white/70">
                  Typically replies in a few minutes
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
            style={{ backgroundColor: BACKGROUND }}
          >
            {/* Welcome bubble */}
            <div className="flex items-end gap-2 max-w-[85%]">
              <div className="w-7 h-7 rounded-full bg-white border shrink-0 flex items-center justify-center" style={{ borderColor: BORDER }}>
                <Image src="/images/headerLogo.svg" alt="" width={16} height={16} className="object-contain" />
              </div>
              <div className="bg-white text-[#333] text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm">
                👋 Hi there! How can we help you today?
              </div>
            </div>

            {/* Message history */}
            {messages.map((msg) =>
              msg.sender === "user" ? (
                <div key={msg.id} className="flex justify-end">
                  <div
                    className="text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[85%] shadow-sm"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex items-end gap-2 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-white border shrink-0 flex items-center justify-center" style={{ borderColor: BORDER }}>
                    <Image src="/images/headerLogo.svg" alt="" width={16} height={16} className="object-contain" />
                  </div>
                  <div className="bg-white text-[#333] text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm">
                    {msg.text}
                  </div>
                </div>
              )
            )}

            {/* Typing indicator */}
            {typing && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-white border shrink-0 flex items-center justify-center" style={{ borderColor: BORDER }}>
                  <Image src="/images/headerLogo.svg" alt="" width={16} height={16} className="object-contain" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {/* Quick options */}
            {!hasInteracted && !typing && (
              <div className="flex flex-col gap-2 mt-1">
                {quickOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => sendMessage(option)}
                    className="text-left text-sm px-4 py-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-150"
                    style={{ border: `1px solid ${BORDER}`, color: PRIMARY }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* WhatsApp continue CTA — appears after first exchange */}
            {hasInteracted && !typing && (
              <button
                onClick={continueOnWhatsApp}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-white py-2.5 rounded-xl mt-1 transition-colors duration-150"
                style={{ backgroundColor: "#25D366" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.6 6.32A8.86 8.86 0 0 0 12.06 4a8.91 8.91 0 0 0-7.7 13.42L3 21l3.7-1.31a8.93 8.93 0 0 0 4.36 1.12 8.9 8.9 0 0 0 8.9-8.91 8.78 8.78 0 0 0-2.36-5.58Zm-5.54 13.68a7.4 7.4 0 0 1-3.77-1.03l-.27-.16-2.79.97.91-2.71-.18-.28a7.4 7.4 0 1 1 13.69-3.98 7.4 7.4 0 0 1-7.59 7.19Zm4.06-5.54c-.22-.11-1.31-.65-1.51-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.06-.22-.11-1.27-.47-2.18-1.34-.85-.76-1.27-1.31-1.4-1.53-.13-.22 0-.34.13-.45.11-.1.24-.27.36-.4.12-.13.16-.22.24-.37.08-.15.04-.28-.02-.4-.06-.11-.55-1.33-.76-1.81-.2-.47-.4-.4-.55-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.65.31-.22.25-.86.85-.86 2.06 0 1.21.88 2.39 1 2.55.13.17 1.71 2.6 4.15 3.55 2.43.94 2.43.63 2.87.59.43-.04 1.31-.53 1.5-1.05.18-.51.18-.95.13-1.05-.05-.1-.2-.16-.42-.27Z" />
                </svg>
                Continue on WhatsApp
              </button>
            )}
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3 border-t bg-white shrink-0"
            style={{ borderColor: BORDER }}
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(message)}
              placeholder="Type a message..."
              className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 transition-shadow"
              style={{ border: `1px solid ${BORDER}` }}
            />
            <button
              onClick={() => sendMessage(message)}
              disabled={!message.trim()}
              aria-label="Send message"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 transition-colors disabled:opacity-40"
              style={{ backgroundColor: PRIMARY }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 pointer-events-auto"
        style={{
          backgroundColor: open ? PRIMARY_DARK : PRIMARY,
        }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}

        {/* Notification ping — only shows before first open */}
        {!open && !hasInteracted && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-white">
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping" />
          </span>
        )}
      </button>
    </div>
  );
}