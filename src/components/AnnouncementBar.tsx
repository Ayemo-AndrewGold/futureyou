"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EVENT_CONFIG } from "@/app/event/page";

/* ── Marquee text — swaps based on event status ──────────────── */
const ACTIVE_MARQUEE = [
  "🚀 Register Free — Future You Enterprise Boost Programme",
  "·",
  "4th & 5th September 2026 · Lekki, Lagos",
  "·",
  "2-Day Intensive Business Training",
  "·",
  "4 Weeks Coaching & Accountability",
  "·",
  "Grant Pool of up to ₦750,000",
  "·",
  "Registration Deadline — 21 August 2026",
  "·",
  "Limited Spaces Available",
  "·",
];

const POSTPONED_MARQUEE = [
  "📢 Future You Enterprise Boost Programme — Postponed",
  "·",
  "A new date will be announced soon",
  "·",
  "Stay connected for updates",
  "·",
  "Explore our programmes in the meantime",
  "·",
  "Coaching · Loan Services · Consulting",
  "·",
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const dismiss = () => setVisible(false);

  /* Auto-dismiss after 15 seconds */
  useEffect(() => {
    const timer = setTimeout(dismiss, 15_000);
    return () => clearTimeout(timer);
  }, []);

  const isPostponed  = !EVENT_CONFIG.active;
  const MARQUEE_TEXT = isPostponed ? POSTPONED_MARQUEE : ACTIVE_MARQUEE;

  const bgGrad    = isPostponed
    ? "linear-gradient(90deg,#78350f 0%,#92400e 50%,#78350f 100%)"
    : "linear-gradient(90deg,#1a237e 0%,#293C97 50%,#1e2d85 100%)";
  const fadeLeft  = isPostponed ? "#78350f" : "#1a237e";
  const fadeRight = isPostponed ? "#78350f" : "#1e2d85";

  /* Each copy is a <div> so the flex container measures width correctly */
  const Strip = () => (
    <div className="flex items-center gap-5 pr-8 whitespace-nowrap shrink-0">
      {MARQUEE_TEXT.map((seg, i) =>
        seg === "·" ? (
          <span key={i} className="text-white/30 text-[10px] select-none">●</span>
        ) : (
          <span key={i} className="text-[12.5px] sm:text-[13px] font-medium text-white/90">
            {seg}
          </span>
        )
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="announcement-bar"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden w-full relative"
          style={{ zIndex: 10000, background: bgGrad }}
        >
          <div className="flex items-center h-9 sm:h-10">

            {/* ── Scrolling track ── */}
            <div className="flex-1 overflow-hidden relative min-w-0">
              {/* Left fade */}
              <div
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10"
                style={{ background: `linear-gradient(to right,${fadeLeft},transparent)` }}
              />
              {/* Right fade */}
              <div
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10"
                style={{ background: `linear-gradient(to left,${fadeRight},transparent)` }}
              />
              {/* Two copies — seamless infinite loop */}
              <div className="animate-marquee">
                <Strip />
                <Strip />
              </div>
            </div>

            {/* ── Fixed right: CTA + close ── */}
            <div className="flex items-center gap-1.5 sm:gap-2 pl-2 pr-2.5 sm:pr-3 shrink-0 border-l border-white/10 h-full">
              <Link
                href="/event"
                className="hidden sm:inline-flex items-center text-[11.5px] font-semibold text-white/65 hover:text-white transition-colors duration-150 whitespace-nowrap px-2"
              >
                Learn More
              </Link>

              <a
                href="/event"
                className="inline-flex items-center gap-1 bg-white text-[#293C97] font-bold text-[11px] sm:text-[12px] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-md hover:bg-[#EEF0FA] transition-colors duration-150 shadow-sm whitespace-nowrap"
              >
                {isPostponed ? "Learn More" : "Apply Now"}
              </a>

              <button
                onClick={dismiss}
                aria-label="Dismiss announcement"
                className="p-1 ml-0.5 rounded text-white/35 hover:text-white hover:bg-white/10 transition-colors duration-150"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
