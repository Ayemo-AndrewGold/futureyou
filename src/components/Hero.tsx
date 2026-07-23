'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   Carousel slides — high-quality Unsplash images
   covering education, coaching, career & success
───────────────────────────────────────────────*/
const SLIDES = [


  {
    src: 'https://res.cloudinary.com/yaovkmpi/image/upload/v1784807463/futu_izegrp.avif',
    alt: 'Online learning and digital education',
  },
  {
    src: 'https://res.cloudinary.com/yaovkmpi/image/upload/v1784807463/fam_jn9lop.avif',
    alt: 'Students collaborating in a modern learning environment',
  },
];



/* ─── Animation helpers ──────────────────────*/
const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const upAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

const inAnim = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
});

/* ─── Main component ─────────────────────────*/
const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  /* Auto-advance carousel */
  const advance = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, 5000);
    return () => clearInterval(id);
  }, [advance]);

  /* Manual dot navigation */
  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ══════════════════════════════════════
          BACKGROUND CAROUSEL
      ══════════════════════════════════════ */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SLIDES[current].src}
              alt={SLIDES[current].alt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060917]/75 via-[#0a1035]/65 to-[#060917]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060917]/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#293C97]/10 mix-blend-multiply" />
      </div>

      {/* ══════════════════════════════════════
          DECORATIVE ELEMENTS
      ══════════════════════════════════════ */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#293C97]/30 blur-[120px] opacity-60" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 w-[380px] h-[380px] rounded-full bg-[#4a5fd4]/25 blur-[90px] opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-5 sm:px-10 lg:px-16 pt-32 pb-24 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── Left / Text column ── */}
        <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start text-center lg:text-left gap-6">

          {/* Eyebrow pill */}
          {/* <motion.div
            {...upAnim(0.1)}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7b8ef5] inline-block animate-pulse" />
            Coaching · Consulting · Capital Solutions
          </motion.div> */}

          {/* Main headline */}
          <div>
            <motion.h1
              {...upAnim(0.2)}
              className="font-lato font-extrabold text-[2.8rem] sm:text-[3.6rem] lg:text-[4rem] xl:text-[4.6rem] text-white leading-[1.05] tracking-tight"
            >
              Build the Future
            </motion.h1>
            <motion.h1
              {...upAnim(0.32)}
              className="font-lato text-white font-extrabold text-[2.8rem] sm:text-[3.6rem] lg:text-[4rem] xl:text-[4.6rem] leading-[1.05] tracking-tight"
            >
              You{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#7b8ef5] to-[#a5b4fc]">
                  Deserve.
                </span>
                <motion.span
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#7b8ef5] to-[#a5b4fc]"
                />
              </span>
            </motion.h1>
          </div>

          {/* Supporting paragraph */}
          <motion.p
            {...upAnim(0.44)}
            className="font-montserrat text-base sm:text-lg text-white/75 leading-relaxed max-w-[520px] mx-auto lg:mx-0"
          >
            At FutureYou, we empower individuals, professionals, and businesses through
            expert coaching, strategic consulting, and growth capital helping you unlock
            your potential and build lasting success.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...upAnim(0.54)}
            className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto"
            >
              <Link
                href="/startjourney"
                aria-label="Start your journey with FutureYou"
                className="group flex-1 inline-flex items-center justify-center relative bg-[#293C97] hover:bg-[#1e2d85] active:scale-[0.97] text-white text-xs sm:text-base font-bold px-3 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#293C97]/40 hover:shadow-[#293C97]/60 overflow-hidden whitespace-nowrap"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                <span className="hidden xs:inline">Get Started Today</span>
                <span className="xs:hidden">Get Started</span>
                <span className="ml-1 inline-block transition-transform group-hover:translate-x-1 duration-200">
                  →
                </span>
              </Link>

              <Link
                href="/aboutus"
                aria-label="See how FutureYou helps"
                className="flex-1 inline-flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-[0.97] backdrop-blur-sm text-white text-xs sm:text-base font-semibold px-3 sm:px-8 py-3 sm:py-4 rounded-xl border border-white/25 hover:border-white/40 transition-all duration-200 whitespace-nowrap"
              >
                <span className="hidden xs:inline">See How We Help</span>
                <span className="xs:hidden">Learn More</span>
              </Link>
            </motion.div>

          {/* Credential pills */}
          {/* <motion.div
            {...upAnim(0.64)}
            className="flex flex-wrap justify-center lg:justify-start gap-2.5 mt-1"
          >
            {CREDENTIALS.map((c) => (
              <div
                key={c.label}
                className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium px-3.5 py-2 rounded-full"
              >
                <span className="text-sm">{c.icon}</span>
                {c.label}
              </div>
            ))}
          </motion.div> */}
        </div>

        {/* ── Right / Video column (desktop only) ── */}
        <motion.div
          initial={{ opacity: 0, x: 48, y: 16 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease }}
          className="hidden lg:flex w-full lg:w-[50%] justify-center items-center"
        >
          {/* Outer glow ring */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[#293C97]/50 via-[#7b8ef5]/30 to-[#a5b4fc]/20 blur-xl opacity-80" />

            {/* Glass frame */}
            <div className="relative rounded-[22px] p-[3px] bg-gradient-to-br from-white/30 via-white/10 to-white/5 shadow-2xl">
              {/* Inner container with backdrop blur header bar */}
              <div className="relative overflow-hidden rounded-[20px] bg-black/40 backdrop-blur-sm">

                {/* Faux browser / app chrome bar */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-white/8 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="ml-3 text-[11px] text-white/35 font-medium tracking-wide select-none">
                    futureyoulimited.com
                  </span>
                </div>

                {/* Video */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-auto object-cover block"
                  onLoadedMetadata={(e) => {
                    e.currentTarget.playbackRate = 0.75;
                  }}
                >
                  <source
                    src="https://res.cloudinary.com/yaovkmpi/video/upload/v1784012596/herovideo_rsq5ti.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* Subtle inner vignette on the video */}
                <div className="absolute inset-0 rounded-b-[20px] bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating badge — top right */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.75, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5, type: 'spring', bounce: 0.35 }}
              className="absolute -top-5 -right-5 z-10 flex items-center gap-2.5 bg-white/90 backdrop-blur-md border border-white/60 rounded-2xl px-3.5 py-2.5 shadow-xl"
            >
              <div className="w-8 h-8 rounded-xl bg-[#EEF0FA] flex items-center justify-center shrink-0 text-base">
                ⭐
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#0E0E1D] leading-tight">Top Rated Coach</p>
                <p className="text-[10px] text-[#666] mt-0.5">Expert-led programmes</p>
              </div>
            </motion.div> */}

            {/* Floating badge — bottom left */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5, type: 'spring', bounce: 0.35 }}
              className="absolute -bottom-5 -left-5 z-10 flex items-center gap-2.5 bg-white/90 backdrop-blur-md border border-white/60 rounded-2xl px-3.5 py-2.5 shadow-xl"
            >
              <div className="w-8 h-8 rounded-xl bg-[#EEF0FA] flex items-center justify-center shrink-0 text-base">
                🟢
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#0E0E1D] leading-tight">Session Available</p>
                <p className="text-[10px] text-[#666] mt-0.5">Book a free consultation</p>
              </div>
            </motion.div> */}
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          CAROUSEL DOTS + SCROLL INDICATOR
      ══════════════════════════════════════ */}
      <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Scroll mouse */}
        <motion.div
          {...inAnim(1.3)}
          className="flex flex-col items-center gap-1 text-white/35 select-none"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-5 h-7 rounded-full border border-white/25 flex items-start justify-center pt-1"
          >
            <div className="w-1 h-1.5 rounded-full bg-white/45" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
