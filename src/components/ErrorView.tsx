"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, RefreshCw, ArrowLeft } from "lucide-react";

/* ─── Error type config ──────────────────────────────────────── */
export type ErrorKind =
  | "not-found"
  | "server"
  | "api"
  | "network"
  | "data"
  | "generic";

interface ErrorConfig {
  code:       string;
  headline:   string;
  subline:    string;
  showRetry:  boolean;
}

const CONFIG: Record<ErrorKind, ErrorConfig> = {
  "not-found": {
    code:      "",
    headline:  "We couldn't find that page.",
    subline:   "The page you're looking for may have moved, been updated. Let's get you back on track.",
    showRetry: false,
  },
  "server": {
    code:      "500",
    headline:  "Something went wrong on our end.",
    subline:   "We've encountered an unexpected issue. Our team has been notified. Please try again in a moment.",
    showRetry: true,
  },
  "api": {
    code:      "—",
    headline:  "We're having trouble connecting.",
    subline:   "Something went wrong while loading this information. Please check your connection and try again.",
    showRetry: true,
  },
  "network": {
    code:      "—",
    headline:  "Connection interrupted.",
    subline:   "It looks like your connection dropped or the server is temporarily unreachable. Please try again.",
    showRetry: true,
  },
  "data": {
    code:      "—",
    headline:  "We couldn't load this content.",
    subline:   "The content you requested couldn't be retrieved right now. This is temporary — please try again shortly.",
    showRetry: true,
  },
  "generic": {
    code:      "—",
    headline:  "Something unexpected happened.",
    subline:   "We ran into an issue we didn't expect. The team has been alerted. Returning home usually fixes this.",
    showRetry: true,
  },
};

/* ─── Animation helpers ──────────────────────────────────────── */
const E = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const up = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: E, delay },
});

/* ─── Animated SVG illustration ─────────────────────────────── */
function ErrorIllustration({ kind }: { kind: ErrorKind }) {
  const is404 = kind === "not-found";

  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto select-none">
      {/* Outer glow ring */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.15, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-[#293C97]/20 blur-2xl"
      />

      {/* Central circle */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: E, delay: 0.1 }}
        className="absolute inset-8 rounded-full bg-gradient-to-br from-[#EEF0FA] to-white border border-[#e0e3f5] shadow-xl flex items-center justify-center"
      >
        <svg
          viewBox="0 0 80 80"
          fill="none"
          className="w-28 h-28 sm:w-32 sm:h-32"
          aria-hidden="true"
        >
          {is404 ? (
            /* 404: magnifying glass finding nothing */
            <>
              {/* Glass circle */}
              <motion.circle
                cx="36" cy="34" r="18"
                stroke="#293C97" strokeWidth="4" strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              />
              {/* Handle */}
              <motion.line
                x1="49" y1="47" x2="60" y2="58"
                stroke="#293C97" strokeWidth="4" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 1.0, ease: "easeOut" }}
              />
              {/* Question mark inside */}
              <motion.text
                x="30" y="40"
                fill="#293C97" fontSize="18" fontWeight="800"
                fontFamily="system-ui"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.3 }}
              >
                ?
              </motion.text>
            </>
          ) : (
            /* Other errors: broken link / connection */
            <>
              {/* Left plug */}
              <motion.path
                d="M20 38 L36 38 M36 32 L36 44"
                stroke="#293C97" strokeWidth="4" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              />
              {/* Gap */}
              <motion.path
                d="M44 38 L60 38 M44 32 L44 44"
                stroke="#293C97" strokeWidth="4" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              />
              {/* Zigzag break in middle */}
              <motion.path
                d="M36 38 L39 32 L41 44 L44 38"
                stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
              />
            </>
          )}
        </svg>
      </motion.div>

      {/* Floating dots */}
      {[
        { x: "10%", y: "15%", delay: 0.2, size: "w-2 h-2" },
        { x: "80%", y: "20%", delay: 0.5, size: "w-3 h-3" },
        { x: "75%", y: "72%", delay: 0.8, size: "w-2 h-2" },
        { x: "15%", y: "78%", delay: 1.1, size: "w-2.5 h-2.5" },
      ].map(({ x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className={`absolute ${size} rounded-full bg-[#293C97]/25`}
          style={{ left: x, top: y }}
          animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.8 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT — used by all error/not-found pages
═══════════════════════════════════════════════════════════════ */
interface ErrorViewProps {
  kind?:      ErrorKind;
  onRetry?:   () => void;
  showLogo?:  boolean;
}

export default function ErrorView({
  kind = "generic",
  onRetry,
  showLogo = true,
}: ErrorViewProps) {
  const cfg = CONFIG[kind];

  return (
    <div
      className="min-h-screen bg-[#F7F8FC] flex flex-col"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(41,60,151,0.05) 0%, transparent 50%), " +
          "radial-gradient(circle at 80% 80%, rgba(41,60,151,0.04) 0%, transparent 50%)",
      }}
    >
      {/* Subtle top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#293C97] via-[#7b8ef5] to-transparent shrink-0" />

      {/* Logo */}
      {showLogo && (
        <motion.div {...up(0)} className="px-6 sm:px-10 pt-7 pb-0">
          <Link href="/" aria-label="FutureYou — go to homepage">
            <Image
              src="/images/headerLogo.svg"
              alt="FutureYou Limited"
              width={130}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </motion.div>
      )}

      {/* Main content — centred */}
      <div className="flex-1 flex items-center justify-center px-5 sm:px-10">
        <div className="w-full max-w-xl text-center flex flex-col items-center gap-8">

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: E }}
          >
            <ErrorIllustration kind={kind} />
          </motion.div>

          {/* Code badge — only when it's a real HTTP code */}
          {cfg.code !== "—" && (
            <motion.p
              {...up(0.15)}
              className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#293C97]/60"
            >
               {cfg.code}
            </motion.p>
          )}

          {/* Headline */}
          <motion.h1
            {...up(0.22)}
            className="font-lato font-extrabold text-[1.8rem] sm:text-[2.4rem] text-[#0E0E1D] leading-[1.1] tracking-tight -mt-4"
          >
            {cfg.headline}
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            {...up(0.3)}
            className="font-montserrat text-[15px] sm:text-[16px] text-[#666] leading-[1.8] max-w-md -mt-2"
          >
            {cfg.subline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...up(0.38)}
            className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto"
          >
            <Link
              href="/"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white text-xs sm:text-base font-bold px-3 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#293C97]/25 hover:shadow-[#293C97]/40 hover:-translate-y-px w-full sm:w-auto"
            >
              <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
              <Home size={15} />
              Go Back Home
            </Link>

            {cfg.showRetry && onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#293C97] font-semibold text-white text-xs sm:text-base font-semibold px-3 sm:px-8 py-3 sm:py-4 rounded-xl border-[1.5px] border-[#293C97]/25 hover:border-[#293C97]/50 transition-all duration-200 w-full sm:w-auto"
              >
                <RefreshCw size={14} />
                Try Again
              </button>
            )}

            {!cfg.showRetry && (
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#555] font-semibold text-sm px-8 py-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 w-full sm:w-auto"
              >
                <ArrowLeft size={14} />
                Go Back
              </button>
            )}
          </motion.div>

          {/* Helpful links — only on 404 */}
          {kind === "not-found" && (
            <motion.div {...up(0.46)} className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2">
              {[
                { label: "Blog",         href: "/blog" },
                { label: "About Us",     href: "/aboutus" },
                { label: "Our Services", href: "/startjourney" },
                { label: "Contact",      href: "/contactus" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[13px] font-medium text-[#293C97]/70 hover:text-[#293C97] transition-colors duration-150 underline underline-offset-2 decoration-[#293C97]/30 hover:decoration-[#293C97]"
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer strip */}
      <motion.div
        {...up(0.55)}
        className="px-6 sm:px-10 pb-7 pt-0 flex items-center justify-between gap-4 flex-wrap"
      >
        <p className="text-[12px] text-[#bbb] font-medium">
          © {new Date().getFullYear()} Future You Limited
        </p>
        <Link href="/contactus" className="text-[12px] text-[#bbb] hover:text-[#293C97] transition-colors duration-150 font-medium">
          Need help? Contact us →
        </Link>
      </motion.div>
    </div>
  );
}
