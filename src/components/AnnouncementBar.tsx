"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell } from "lucide-react";
import { EVENT_CONFIG } from "@/app/event/page";

/* ── Messages swap based on event status ─────────────────────── */
const ACTIVE_MARQUEE = [
  "🚀 Applications are now open for the Future You Enterprise Boost Programme",
  "•",
  "2-Day Intensive Business Training",
  "•",
  "4 Weeks Coaching & Accountability",
  "•",
  "Access to Industry Experts & Mentors",
  "•",
  "Networking Opportunities",
  "•",
  "Limited Spaces Available",
  "•",
  "Lagos State · 10–11 August 2026",
  "•",
];

const POSTPONED_MARQUEE = [
  "📢 Future You Enterprise Boost Programme — Postponed",
  "•",
  "A new date will be announced soon",
  "•",
  "Stay connected for updates",
  "•",
  "Explore our programmes in the meantime",
  "•",
  "Coaching · Loan Services · Consulting",
  "•",
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const dismiss = () => setVisible(false);

  const isPostponed = !EVENT_CONFIG.active;
  const MARQUEE_TEXT = isPostponed ? POSTPONED_MARQUEE : ACTIVE_MARQUEE;

  const strip = (
    <span className="flex items-center gap-5 pr-5 whitespace-nowrap text-[12.5px] sm:text-[13px] font-medium text-white/90">
      {MARQUEE_TEXT.map((segment, i) =>
        segment === "•" ? (
          <span key={i} className="text-white/30 text-[10px]">●</span>
        ) : (
          <span key={i}>{segment}</span>
        )
      )}
    </span>
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden w-full z-[10000] relative"
          style={{
            background: isPostponed
              ? "linear-gradient(90deg, #78350f 0%, #92400e 50%, #78350f 100%)"
              : "linear-gradient(90deg, #1a237e 0%, #293C97 50%, #1e2d85 100%)",
          }}
        >
          <div className="flex items-center h-9 sm:h-10">
            {/* Scrolling track */}
            <div className="flex-1 overflow-hidden relative">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10"
                style={{ background: isPostponed ? "linear-gradient(to right, #78350f, transparent)" : "linear-gradient(to right, #1a237e, transparent)" }} />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10"
                style={{ background: isPostponed ? "linear-gradient(to left, #78350f, transparent)" : "linear-gradient(to left, #1e2d85, transparent)" }} />
              <div className="animate-marquee">
                {strip}
                {strip}
              </div>
            </div>

            {/* Fixed right section */}
            <div className="flex items-center gap-1.5 sm:gap-2 pl-2 pr-2.5 sm:pr-3 shrink-0 border-l border-white/10 h-full">
              <Link href="/event"
                className="hidden sm:inline-flex items-center text-[11.5px] font-semibold text-white/65 hover:text-white transition-colors duration-150 whitespace-nowrap px-2">
                {isPostponed ? "Learn More" : "Learn More"}
              </Link>
              {isPostponed ? (
                <Link href="#stay-updated" as="/event#stay-updated"
                  onClick={dismiss}
                  className="inline-flex items-center gap-1 bg-amber-400 text-amber-900 font-bold text-[11px] sm:text-[12px] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-md hover:bg-amber-300 transition-colors duration-150 shadow-sm whitespace-nowrap">
                  <Bell size={10} />
                  Get Notified
                </Link>
              ) : (
                <a href="/event"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-white text-[#293C97] font-bold text-[11px] sm:text-[12px] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-md hover:bg-[#EEF0FA] transition-colors duration-150 shadow-sm whitespace-nowrap">
                  Apply Now
                </a>
              )}
              <button onClick={dismiss} aria-label="Dismiss announcement"
                className="p-1 ml-0.5 rounded text-white/35 hover:text-white hover:bg-white/10 transition-colors duration-150">
                <X size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
