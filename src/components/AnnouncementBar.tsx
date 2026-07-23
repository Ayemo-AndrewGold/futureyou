"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const REGISTRATION_URL = "https://bit.ly/TFUEBP";

/* The marquee message is duplicated so the loop is seamless.
   We render it twice side-by-side; when the first copy exits left
   the second is already in position — no gap, no jump.            */
const MARQUEE_TEXT = [
  "Applications are now open for the Future You Enterprise Boost Programme",
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

export default function AnnouncementBar() {
  // Visible by default on every page load — no persistence needed.
  // The close button only hides it for the current session.
  const [visible, setVisible] = useState(true);

  const dismiss = () => setVisible(false);

  /* Single copy of the scrolling text */
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
          style={{ background: "linear-gradient(90deg, #1a237e 0%, #293C97 50%, #1e2d85 100%)" }}
        >
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

          <div className="flex items-center h-9 sm:h-10">
            {/* Scrolling track — fills all space between edges */}
            <div className="flex-1 overflow-hidden relative">
              {/* Left fade mask */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10"
                style={{ background: "linear-gradient(to right, #1a237e, transparent)" }} />
              {/* Right fade mask */}
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10"
                style={{ background: "linear-gradient(to left, #1e2d85, transparent)" }} />

              {/* The marquee — two copies for seamless loop */}
              <div className="animate-marquee">
                {strip}
                {strip}
              </div>
            </div>

            {/* Fixed right section — always visible */}
            <div className="flex items-center gap-1.5 sm:gap-2 pl-2 pr-2.5 sm:pr-3 shrink-0 border-l border-white/10 h-full">
              <Link
                href="/event"
                className="hidden sm:inline-flex items-center text-[11.5px] font-semibold text-white/65 hover:text-white transition-colors duration-150 whitespace-nowrap px-2"
              >
                Learn More
              </Link>
              <a
                href="/event"
                // target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-white text-[#293C97] font-bold text-[11px] sm:text-[12px] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-md hover:bg-[#EEF0FA] transition-colors duration-150 shadow-sm whitespace-nowrap"
              >
                Apply Now
                <ArrowRight size={10} />
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
