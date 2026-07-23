"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Calendar, MapPin } from "lucide-react";
import QRCode from "react-qr-code";

const REGISTRATION_URL = "https://bit.ly/TFUEBP";
const FLYER_SRC = "https://res.cloudinary.com/yaovkmpi/image/upload/v1784807464/IMG-20260722-WA0020_xl4kzx.jpg";

/*
  Display logic — "show up to 3 times across page loads, then stop":

  localStorage key "fy_popup_show_count" stores how many times the popup
  has actually been SHOWN (not just dismissed). We increment it the moment
  the popup becomes visible, so each page load that qualifies counts once
  regardless of how the user closes it.

  ┌─────────────────────────────────────────────────────────────────┐
  │ count = 0  → show popup  → increment to 1                      │
  │ count = 1  → show popup  → increment to 2                      │
  │ count = 2  → show popup  → increment to 3                      │
  │ count ≥ 3  → do not show popup                                  │
  └─────────────────────────────────────────────────────────────────┘

  Closing the popup (any button, including Apply Now / Learn More)
  does NOT touch the counter — that was already incremented when
  the popup appeared. Closing only hides it for this page session.
*/
const STORAGE_KEY = "fy_popup_show_count";
const MAX_SHOWS   = 3;
const SHOW_DELAY  = 6000; // ms

export default function EventPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Read current show count from localStorage
    let count = 0;
    try {
      count = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10) || 0;
    } catch { /* localStorage unavailable — treat as 0 */ }

    // Already shown the maximum number of times — never show again
    if (count >= MAX_SHOWS) return;

    const timer = setTimeout(() => {
      // Increment BEFORE showing so even a hard-refresh after the tab
      // crashes still counts this display
      try {
        localStorage.setItem(STORAGE_KEY, String(count + 1));
      } catch { /* ignore */ }

      setOpen(true);
    }, SHOW_DELAY);

    return () => clearTimeout(timer);
  }, []); // runs once per page load — correct behaviour

  // Closing only hides the popup for this session.
  // The counter is NOT modified here — it was already incremented above.
  const dismiss = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismiss}
            aria-hidden="true"
            className="fixed inset-0 z-[99990] bg-black/55 backdrop-blur-[3px]"
          />

          {/* Modal */}
          <motion.div
            key="popup-modal"
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 32 }}
            transition={{ duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Future You Enterprise Boost Programme"
            className="fixed inset-0 z-[99991] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div className="relative w-full max-w-[480px] bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto">

              {/* Close button */}
              <button
                onClick={dismiss}
                aria-label="Close popup"
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors duration-150"
              >
                <X size={16} />
              </button>

              {/* Flyer image */}
              <div className="relative w-full aspect-[3/2] bg-[#0d1445]">
                <Image
                  src={FLYER_SRC}
                  alt="Future You Enterprise Boost Programme"
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 100vw, 480px"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* Badge on flyer */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-white/70 text-[10px] font-bold tracking-widest uppercase mb-1">Upcoming Programme</p>
                    <h3 className="font-lato font-extrabold text-white text-lg sm:text-xl leading-tight drop-shadow-md">
                      Enterprise Boost<br />Programme
                    </h3>
                  </div>
                  <span className="shrink-0 bg-[#293C97] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg">
                    Aug 2026
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pt-5 pb-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#555] font-medium">
                    <Calendar size={13} className="text-[#293C97]" />
                    10 – 11 August 2026
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#555] font-medium">
                    <MapPin size={13} className="text-[#293C97]" />
                    Lagos State, Nigeria
                  </div>
                </div>

                <p className="font-montserrat text-sm text-[#555] leading-relaxed mb-5">
                  A transformational programme for ambitious entrepreneurs featuring intensive training, four weeks of coaching, and access to industry experts. <strong className="text-[#0E0E1D]">Limited spaces available.</strong>
                </p>

                {/* CTAs */}
                <div className="flex gap-3">
                  <a
                    href={REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={dismiss}
                    className="group flex-1 relative overflow-hidden inline-flex items-center justify-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white font-bold text-sm py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-[#293C97]/25"
                  >
                    <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
                    Apply Now
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <Link
                    href="/event"
                    onClick={dismiss}
                    className="flex-1 inline-flex items-center justify-center text-sm font-semibold text-[#293C97] border-[1.5px] border-[#293C97]/30 hover:border-[#293C97] hover:bg-[#EEF0FA] py-3.5 rounded-xl transition-all duration-200"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Dismiss link */}
                <button
                  onClick={dismiss}
                  className="w-full text-center text-[11px] text-gray-400 hover:text-gray-600 mt-3 transition-colors duration-150"
                >
                  No thanks, maybe later
                </button>

                {/* QR row — secondary registration option */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  {/* Generated QR — white bg, adequate quiet zone via padding */}
                  <div className="bg-white rounded-xl p-2 shadow-sm ring-1 ring-gray-100 shrink-0">
                    <QRCode
                      value={REGISTRATION_URL}
                      size={60}
                      level="H"
                      bgColor="#ffffff"
                      fgColor="#0a0f2e"
                      style={{ display: "block" }}
                    />
                  </div>
                  <div>
                    <p className="font-lato font-bold text-[#0E0E1D] text-[13px] leading-tight mb-0.5">Scan to Register</p>
                    <p className="font-montserrat text-[11px] text-[#888] leading-snug">
                      Point your camera at the code to apply instantly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
