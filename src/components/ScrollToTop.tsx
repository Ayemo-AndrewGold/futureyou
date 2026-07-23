"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

const SCROLL_THRESHOLD = 400;

/*
  Vertical stack in the bottom-right corner (same column as ChatWidget):
  ─────────────────────────────────────────────────────────────────────
  ChatWidget toggle:  48×48px on mobile  (bottom: 12px / right: 12px)
                      56×56px on sm+     (bottom: 20px / right: 20px)
  Gap above toggle:   ~14px
  ScrollToTop:        sits at bottom: 74px mobile  / 96px sm+
  ─────────────────────────────────────────────────────────────────────
  We track the sm breakpoint (640px) in JS so we can feed the right
  bottom/right values into the `style` prop — CSS media queries can't
  be used inside a `style` object.
*/

export default function ScrollToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [isSm, setIsSm] = useState(false);

  const isHidden = SITE_CONFIG.hiddenWidgetPaths.some((p: string) =>
    pathname.startsWith(p)
  );

  /* Track viewport width for responsive positioning */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsSm(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsSm(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isHidden) return;
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHidden]);

  if (isHidden) return null;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /*
    Positioning values:
      mobile  → right: 12px  bottom: 74px   (toggle 48px + 12px base + 14px gap)
      sm+     → right: 20px  bottom: 96px   (toggle 56px + 20px base + 20px gap)
  */
  const right = isSm ? "1.25rem" : "0.75rem";
  const bottom = isSm ? "6rem" : "4.625rem";

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          /* ── Entrance / exit: spring pop ── */
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          /* ── Hover lifts slightly; tap shrinks ── */
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.88 }}
          className={[
            "fixed z-50",
            /* Slightly smaller on mobile */
            "w-10 h-10 sm:w-11 sm:h-11",
            "rounded-full flex items-center justify-center",
            "bg-[#293C97] text-white",
            /* Premium layered shadow */
            "shadow-[0_2px_8px_rgba(41,60,151,0.28),0_6px_24px_rgba(41,60,151,0.18)]",
            "hover:bg-[#1e2d85] transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-[#293C97] focus-visible:ring-offset-2",
          ].join(" ")}
          style={{ right, bottom }}
        >
          {/* Pulse ring — gentle attention-draw, repeats every ~3.6 s */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-[#293C97]/40"
            animate={{ scale: [1, 1.55, 1], opacity: [0.6, 0, 0.6] }}
            transition={{
              duration: 2.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1.4,
            }}
          />

          <ArrowUp
            className="w-4 h-4 sm:w-[18px] sm:h-[18px] relative z-10"
            strokeWidth={2.5}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
