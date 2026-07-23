"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import {
  Calendar, MapPin, Users, Clock, ChevronDown, ChevronUp,
  ArrowRight, BookOpen, Target, Award, Network, Lightbulb,
  TrendingUp, Briefcase, DollarSign, Megaphone, ShoppingCart,
  Globe, Rocket, BarChart2, CheckCircle,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────── */
const REGISTRATION_URL = "https://bit.ly/TFUEBP";
const FLYER_URL =
  "https://res.cloudinary.com/yaovkmpi/image/upload/v1784807464/IMG-20260722-WA0020_xl4kzx.jpg";
const DEADLINE = new Date("2026-08-10T23:59:59");
const TRAINING_DATE = "10 – 11 August 2026";

/* ─────────────────────────────────────────────────────────────
   Animation primitives
───────────────────────────────────────────────────────────── */
const E = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: E, delay },
});

/* ─────────────────────────────────────────────────────────────
   Countdown hook — hydration-safe
   • Initialises to zeroes on the server (avoids SSR/client mismatch)
   • Populates on the first client effect tick
   • Cleans up the interval on unmount
───────────────────────────────────────────────────────────── */
function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000)  / 60_000),
      seconds: Math.floor((diff % 60_000)     / 1_000),
    };
  };

  // Start with zeros so server HTML and first client render match exactly
  const [t, set] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Hydrate immediately on mount, then tick every second
    set(calc());
    const id = setInterval(() => set(calc()), 1_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // target is a module-level constant — safe to omit

  return t;
}

/* ─────────────────────────────────────────────────────────────
   Reusable: eyebrow label
───────────────────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-[#293C97] mb-4">
      <span className="w-5 h-px bg-[#293C97]/50 rounded-full" />
      {children}
      <span className="w-5 h-px bg-[#293C97]/50 rounded-full" />
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────
   Reusable: premium Apply button
───────────────────────────────────────────────────────────── */
function ApplyBtn({ size = "md", white = false }: { size?: "sm" | "md" | "lg"; white?: boolean }) {
  const pad = size === "lg" ? "px-10 py-5 text-base" : size === "sm" ? "px-5 py-2.5 text-xs" : "px-7 py-3.5 text-sm";
  const base = white
    ? "bg-white text-[#293C97] hover:bg-[#EEF0FA] shadow-xl"
    : "bg-[#293C97] text-white hover:bg-[#1e2d85] shadow-lg shadow-[#293C97]/25";
  return (
    <a
      href={REGISTRATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden inline-flex items-center gap-2 font-bold rounded-xl transition-all duration-200 hover:-translate-y-px ${pad} ${base}`}
    >
      <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
      Apply Now
      <ArrowRight size={size === "lg" ? 18 : 14} className="transition-transform group-hover:translate-x-0.5 duration-200" />
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   Reusable: the flyer displayed in a premium frame
───────────────────────────────────────────────────────────── */
function Flyer({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: E }}
      whileHover={{ y: -5 }}
      className={`relative select-none ${className}`}
    >
      {/* Layered glow */}
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#293C97]/30 via-[#7b8ef5]/15 to-transparent blur-2xl pointer-events-none" />
      {/* Outer ring */}
      <div className="relative rounded-[20px] p-[2px] bg-gradient-to-br from-white/40 via-white/10 to-white/0 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        {/* Image */}
        <div className="relative overflow-hidden rounded-[18px]">
          <Image
            src={FLYER_URL}
            alt="Future You Enterprise Boost Programme"
            width={520}
            height={680}
            className="w-full h-auto object-cover block"
            priority
            sizes="(max-width: 768px) 90vw, 460px"
          />
          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────── */
const GAINS = [
  { icon: BookOpen,   title: "2-Day Intensive Training",          desc: "In-depth workshops across six business growth pillars, led by practitioners." },
  { icon: Target,     title: "4 Weeks of Coaching",               desc: "Weekly accountability sessions to embed your learnings into real action." },
  { icon: Award,      title: "Expert Mentors",                    desc: "Direct access to coaches with decades of combined business experience." },
  { icon: Network,    title: "Peer Networking",                   desc: "Build relationships with ambitious founders across Lagos." },
  { icon: Lightbulb,  title: "Practical Strategies",              desc: "Frameworks you can implement the same week no theory for theory's sake." },
  { icon: TrendingUp, title: "Performance-Based Support",         desc: "Top performers unlock further funding access and ongoing mentorship." },
];

const LEARN = [
  { n: "01", icon: Briefcase,    topic: "Business Management" },
  { n: "02", icon: DollarSign,   topic: "Financial Management" },
  { n: "03", icon: Megaphone,    topic: "Branding & Marketing" },
  { n: "04", icon: ShoppingCart, topic: "Sales & Customer Acquisition" },
  { n: "05", icon: Globe,        topic: "Digital Visibility" },
  { n: "06", icon: Rocket,       topic: "Growth & Funding Readiness" },
];

const AUDIENCE = [
  "Fashion", "Beauty", "Haircare", "Food", "Furniture",
  "Arts & Crafts", "Printing & Branding", "Jewellery", "Leather Works",
];

const PHASES = [
  { n: "01", title: "2-Day Intensive Training",            badge: "Day 1 & 2",   desc: "Six pillars of business growth, delivered by industry practitioners through workshops, peer learning, and expert masterclasses." },
  { n: "02", title: "4 Weeks Coaching & Accountability",   badge: "Weeks 1–4",   desc: "Weekly sessions to implement learnings, track business metrics, and stay accountable with expert coaches." },
  { n: "03", title: "Performance-Based Business Support",  badge: "Ongoing",     desc: "Top-performing participants unlock additional support, funding pathways, and extended mentorship." },
];

const DETAILS = [
  { icon: Calendar,  label: "Training",          value: "10 – 11 August 2026" },
  { icon: MapPin,    label: "Location",           value: "Lagos State, Nigeria" },
  { icon: Users,     label: "For",                value: "Creative & Product Businesses" },
  { icon: Clock,     label: "Coaching",           value: "4 Weeks Post-Training" },
  { icon: BarChart2, label: "Deadline",           value: "10 August 2026" },
];

const FAQS = [
  { q: "Who can apply?",
    a: "Existing founders of creative and product-based businesses in Lagos State — fashion, beauty, haircare, food, furniture, arts & crafts, printing & branding, jewellery, leather works, and more." },
  { q: "Is the programme free to join?",
    a: "Visit the registration link for full details on fees and available spots: bit.ly/TFUEBP" },
  { q: "Where will the training take place?",
    a: "In Lagos State. Exact venue details are communicated to registered participants after application." },
  { q: "What happens after the two-day training?",
    a: "You enter a structured four-week coaching and accountability programme with weekly sessions, progress reviews, and mentor access." },
  { q: "How do I apply?",
    a: "Click any Apply Now button on this page, or go directly to https://bit.ly/TFUEBP to complete your application." },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function EventPage() {
  const time = useCountdown(DEADLINE);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sticky, setSticky] = useState(false);
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => {
      const rect = finalRef.current?.getBoundingClientRect();
      setSticky(window.scrollY > 500 && !(rect && rect.top < window.innerHeight));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-white text-[#0E0E1D]">
      <Header />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-[100svh] flex items-center overflow-hidden pt-[72px]"
      >
        {/* Dark background */}
        <div className="absolute inset-0 bg-[#06091e]" />
        {/* Diagonal colour split — right half slightly lighter */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(120deg, #06091e 55%, #0d1340 100%)" }} />
        {/* Glows */}
        <div className="pointer-events-none absolute -top-40 right-[5%] w-[700px] h-[700px] rounded-full bg-[#293C97]/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-[#4a5fd4]/10 blur-[120px]" />
        {/* Dot grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-5 sm:px-10 lg:px-16 py-20 lg:py-0 min-h-[calc(100svh-72px)] flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

          {/* ── Left column ── */}
          <div className="w-full lg:w-[52%] flex flex-col items-center lg:items-start text-center lg:text-left gap-7 lg:pr-10 xl:pr-16">

            {/* Eyebrow */}
            {/* <motion.div {...up(0.05)}
              className="inline-flex items-center gap-2.5 border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7b8ef5] animate-pulse" />
              <span className="text-white/80 text-[11px] font-bold tracking-[0.2em] uppercase">Lagos · August 2026</span>
            </motion.div> */}

            {/* Headline */}
            <motion.div {...up(0.12)} className="space-y-1">
              <h1 className="font-lato font-extrabold text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.6rem] text-white leading-[1.04] tracking-[-0.02em]">
                Future You
              </h1>
              <h1 className="font-lato font-extrabold text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.6rem] leading-[1.04] tracking-[-0.02em]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] via-[#a5b4fc] to-[#c7d2fe]">Enterprise Boost</span>
              </h1>
              <h1 className="font-lato font-extrabold text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.6rem] text-white/90 leading-[1.04] tracking-[-0.02em]">
                Programme
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p {...up(0.2)}
              className="font-montserrat text-lg sm:text-xl text-[#818cf8] font-medium tracking-[-0.01em] max-w-md mx-auto lg:mx-0">
              Turn Your Business into a Growth-Ready Enterprise
            </motion.p>

            {/* Description */}
            <motion.p {...up(0.27)}
              className="font-montserrat text-base sm:text-[17px] text-white/55 leading-[1.75] max-w-[480px] mx-auto lg:mx-0">
              A transformational programme equipping ambitious Lagos entrepreneurs with expert coaching, practical strategies, and the accountability needed to build something that lasts.
            </motion.p>

            {/* Date strip */}
            <motion.div {...up(0.33)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2">
              <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
                <Calendar size={15} className="text-[#818cf8]" />
                {TRAINING_DATE}
              </div>
              <span className="text-white/20 hidden sm:inline">|</span>
              <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
                <MapPin size={15} className="text-[#818cf8]" />
                Lagos State, Nigeria
              </div>
            </motion.div>

            {/* CTAs */}
         <motion.div
            {...up(0.39)}
            className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto"
            >
            <div className="flex-1">
                <ApplyBtn size="md" />
            </div>

            <a
                href="#about"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 backdrop-blur-sm text-white/85 font-semibold text-xs sm:text-sm px-4 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-200 whitespace-nowrap"
            >
                Learn More
                <ChevronDown size={14} className="opacity-60" />
            </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div {...up(0.44)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-1">
              {["Expert-Led", "Free to Apply", "Lagos-Based", "Limited Spaces"].map((tag) => (
                <div key={tag} className="flex items-center gap-1.5 text-white/40 text-xs font-medium">
                  <CheckCircle size={12} className="text-[#818cf8]/70" />
                  {tag}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — flyer ── */}
          <div className="w-full lg:w-[48%] flex justify-center lg:justify-end items-center lg:pl-8">
            <div className="w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px]">
              <Flyer />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          COUNTDOWN — minimal strip
      ════════════════════════════════════════ */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">Application Deadline</p>
              <p className="font-lato font-extrabold text-2xl sm:text-3xl text-[#0E0E1D] tracking-tight">10 August 2026</p>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-3 sm:gap-5">
              {(["days", "hours", "minutes", "seconds"] as const).map((unit, i) => (
                <div key={unit} className="flex items-center gap-3 sm:gap-5">
                  <div className="flex flex-col items-center">
                    <AnimatePresence mode="popLayout">
                      <motion.span key={time[unit]}
                        initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 12, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="font-lato font-extrabold text-[2.2rem] sm:text-[3rem] text-[#293C97] tabular-nums leading-none">
                        {String(time[unit]).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-gray-400 mt-1.5 capitalize">{unit}</span>
                  </div>
                  {i < 3 && <span className="text-gray-200 text-2xl font-light mb-3">:</span>}
                </div>
              ))}
            </div>

            <ApplyBtn size="md" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT — editorial two-column
      ════════════════════════════════════════ */}
      <section id="about" className="py-24 sm:py-32 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">

            {/* Flyer — left on desktop */}
            <motion.div {...up(0.05)} className="flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-[380px]">
                <Flyer />
              </div>
            </motion.div>

            {/* Text — right */}
            <div className="order-1 lg:order-2 space-y-7">
              <motion.div {...up()}>
                <Eyebrow>About the Programme</Eyebrow>
                <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-[#0E0E1D] leading-[1.1] tracking-[-0.02em] mt-1">
                  What is the Enterprise<br className="hidden sm:block" /> Boost Programme?
                </h2>
              </motion.div>

              <motion.p {...up(0.08)} className="font-montserrat text-[17px] text-[#555] leading-[1.8]">
                The <strong className="text-[#0E0E1D] font-semibold">Future You Enterprise Boost Programme</strong> is a transformational business development programme designed to equip ambitious entrepreneurs with the knowledge, mentorship, practical strategies, and accountability needed to build stronger and more sustainable businesses.
              </motion.p>

              <motion.p {...up(0.14)} className="font-montserrat text-[17px] text-[#555] leading-[1.8]">
                Whether you want to stabilise your operations, grow your customer base, sharpen your finances, or get funding-ready this programme delivers the tools, community, and expert guidance to make it happen.
              </motion.p>

              <motion.div {...up(0.2)} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {["Founder-focused curriculum", "Mentors with real track records", "Community & peer accountability", "Performance-based support"].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2.5 border-b border-gray-100">
                    <div className="w-5 h-5 rounded-full bg-[#EEF0FA] flex items-center justify-center shrink-0">
                      <CheckCircle size={12} className="text-[#293C97]" />
                    </div>
                    <span className="font-montserrat text-sm text-[#333] font-medium">{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div {...up(0.25)}>
                <ApplyBtn size="md" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHAT YOU'LL GAIN — clean cards
      ════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#fafafa]">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-10 lg:px-16">
          <motion.div {...up()} className="mb-14">
            <Eyebrow>Programme Benefits</Eyebrow>
            <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-[#0E0E1D] leading-[1.1] tracking-[-0.02em] mt-1 max-w-xl">
              Six things you'll walk away with
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {GAINS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...up(i * 0.06)}
                className="group bg-white hover:bg-[#f5f6ff] p-8 transition-colors duration-300 cursor-default">
                <div className="w-10 h-10 rounded-xl bg-[#EEF0FA] flex items-center justify-center mb-6 group-hover:bg-[#293C97] transition-colors duration-300">
                  <Icon size={19} className="text-[#293C97] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-lato font-bold text-[1rem] text-[#0E0E1D] mb-2.5 leading-snug">{title}</h3>
                <p className="font-montserrat text-sm text-[#777] leading-[1.7]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHAT YOU'LL LEARN — numbered editorial
      ════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

            <motion.div {...up()} className="lg:sticky lg:top-28">
              <Eyebrow>Curriculum</Eyebrow>
              <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[2.8rem] text-[#0E0E1D] leading-[1.1] tracking-[-0.02em] mt-1 mb-6">
                What you'll learn
              </h2>
              <p className="font-montserrat text-[16px] text-[#666] leading-[1.75] mb-8">
                Six core modules crafted around the most critical skills every Lagos entrepreneur needs to build a sustainable, fundable business.
              </p>
              <ApplyBtn size="sm" />
            </motion.div>

            <div className="space-y-0 divide-y divide-gray-100">
              {LEARN.map(({ n, icon: Icon, topic }, i) => (
                <motion.div key={topic} {...up(i * 0.06)}
                  className="group flex items-center gap-6 py-5 hover:pl-3 transition-all duration-300">
                  <span className="font-lato font-bold text-[11px] text-gray-300 tabular-nums shrink-0 group-hover:text-[#293C97] transition-colors duration-300">{n}</span>
                  <div className="w-9 h-9 rounded-lg bg-[#f5f6ff] flex items-center justify-center shrink-0 group-hover:bg-[#EEF0FA] transition-colors duration-300">
                    <Icon size={17} className="text-[#293C97]/60 group-hover:text-[#293C97] transition-colors duration-300" />
                  </div>
                  <span className="font-lato font-bold text-[1rem] sm:text-[1.05rem] text-[#0E0E1D] tracking-tight group-hover:text-[#293C97] transition-colors duration-300">{topic}</span>
                  <ArrowRight size={14} className="ml-auto text-gray-200 group-hover:text-[#293C97] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHO SHOULD APPLY
      ════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#06091e] relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-[#293C97]/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#818cf8]/8 blur-[100px]" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">

            <div className="space-y-7">
              <motion.div {...up()}>
                <Eyebrow>Eligibility</Eyebrow>
                <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-white leading-[1.1] tracking-[-0.02em] mt-1">
                  Built for creative<br className="hidden sm:block" /> entrepreneurs in Lagos
                </h2>
              </motion.div>

              <motion.p {...up(0.08)} className="font-montserrat text-[17px] text-white/55 leading-[1.8] max-w-lg">
                If you own or run a creative or product-based business in Lagos State, this programme was built for you. Applicants must operate an existing business.
              </motion.p>

              {/* Pill row */}
              <motion.div {...up(0.14)} className="flex flex-wrap gap-2.5">
                {AUDIENCE.map((label) => (
                  <span key={label}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/75 bg-white/6 hover:bg-white/12 border border-white/10 hover:border-white/25 px-4 py-2 rounded-full transition-all duration-200 cursor-default">
                    {label}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#818cf8] bg-[#293C97]/20 border border-[#293C97]/30 px-4 py-2 rounded-full">
                  + More
                </span>
              </motion.div>

              <motion.div {...up(0.2)}>
                <ApplyBtn size="md" white />
              </motion.div>
            </div>

            {/* Right — flyer */}
            <motion.div {...up(0.1)} className="hidden lg:flex justify-end">
              <div className="w-full max-w-[360px]">
                <Flyer />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROGRAMME JOURNEY — left-rail timeline
      ════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-10 lg:px-16">
          <motion.div {...up()} className="mb-14 max-w-xl">
            <Eyebrow>Programme Journey</Eyebrow>
            <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-[#0E0E1D] leading-[1.1] tracking-[-0.02em] mt-1">
              Three phases. One transformation.
            </h2>
          </motion.div>

          <div className="relative pl-8 sm:pl-12 max-w-3xl">
            {/* Vertical rail */}
            <div className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[#293C97] via-[#818cf8]/40 to-transparent" />

            {PHASES.map(({ n, title, badge, desc }, i) => (
              <motion.div key={n} {...up(i * 0.1)}
                className="relative mb-12 last:mb-0">
                {/* Rail dot */}
                <div className="absolute -left-8 sm:-left-12 top-0 w-6 h-6 rounded-full bg-white border-2 border-[#293C97] flex items-center justify-center shadow-md">
                  <div className="w-2 h-2 rounded-full bg-[#293C97]" />
                </div>

                <div className="bg-[#fafafa] hover:bg-white border border-gray-100 hover:border-[#293C97]/20 hover:shadow-lg rounded-2xl p-7 transition-all duration-300 group">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="font-lato font-bold text-[11px] text-[#293C97] tracking-widest uppercase bg-[#EEF0FA] px-3 py-1 rounded-full">Phase {i + 1}</span>
                    <span className="text-[11px] text-gray-400 font-medium">{badge}</span>
                  </div>
                  <h3 className="font-lato font-bold text-[1.1rem] text-[#0E0E1D] mb-3 leading-snug group-hover:text-[#293C97] transition-colors duration-300">{title}</h3>
                  <p className="font-montserrat text-sm text-[#666] leading-[1.75]">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          EVENT DETAILS — single horizontal bar
      ════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#fafafa] border-y border-gray-100">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-10 lg:px-16">
          <motion.div {...up()} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-gray-200 rounded-2xl overflow-hidden">
            {DETAILS.map(({ icon: Icon, label, value }, i) => (
              <motion.div key={label} {...up(i * 0.06)}
                className="bg-white hover:bg-[#f5f6ff] transition-colors duration-300 px-6 py-7 flex flex-col gap-3">
                <Icon size={18} className="text-[#293C97]/70" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">{label}</p>
                  <p className="font-lato font-bold text-[#0E0E1D] text-sm leading-snug">{value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ — large-type borderless
      ════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_1.8fr] gap-16 items-start">

            <motion.div {...up()} className="lg:sticky lg:top-28">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] text-[#0E0E1D] leading-[1.1] tracking-[-0.02em] mt-1 mb-5">
                Questions answered
              </h2>
              <p className="font-montserrat text-[16px] text-[#666] leading-[1.75] mb-7">
                Can't find what you're looking for? Reach out directly through our contact page.
              </p>
              <ApplyBtn size="sm" />
            </motion.div>

            <div className="space-y-0 divide-y divide-gray-100">
              {FAQS.map(({ q, a }, i) => (
                <motion.div key={q} {...up(i * 0.06)}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-lato font-bold text-[1rem] sm:text-[1.05rem] text-[#0E0E1D] leading-snug group-hover:text-[#293C97] transition-colors duration-200">
                      {q}
                    </span>
                    <span className="shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center mt-0.5 group-hover:border-[#293C97]/30 transition-colors duration-200">
                      {openFaq === i
                        ? <ChevronUp size={14} className="text-[#293C97]" />
                        : <ChevronDown size={14} className="text-gray-400 group-hover:text-[#293C97] transition-colors" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="font-montserrat text-[15px] text-[#555] leading-[1.75] pb-6">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <div ref={finalRef}>
        <section className="relative py-28 sm:py-40 bg-[#06091e] overflow-hidden">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-[800px] h-[500px] rounded-full bg-[#293C97]/25 blur-[140px]" />
          </div>
          {/* Dot grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-10 text-center">
            <motion.div {...up()}>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#818cf8]/70 mb-6">Limited Spaces Available</p>
              <h2 className="font-lato font-extrabold text-[2.4rem] sm:text-[3.2rem] lg:text-[3.8rem] text-white leading-[1.06] tracking-[-0.02em] mb-6">
                Ready to build something<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] to-[#c7d2fe]">that lasts?</span>
              </h2>
              <p className="font-montserrat text-[17px] text-white/50 leading-[1.8] mb-10 max-w-lg mx-auto">
                Join the Future You Enterprise Boost Programme. Expert coaching, practical strategies, and a community built for your growth.
              </p>

              {/* CTA + QR — side by side on desktop, stacked on mobile */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">

                {/* Primary button */}
                <div className="flex flex-col items-center gap-4">
                  <ApplyBtn size="lg" white />
                  <p className="text-white/25 text-xs font-medium">Applications close 10 August 2026</p>
                </div>

                {/* Divider — desktop only */}
                <div className="hidden sm:flex flex-col items-center gap-2 self-stretch justify-center">
                  <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                  <span className="text-white/25 text-[10px] font-bold tracking-widest uppercase px-1">or</span>
                  <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                </div>

                {/* QR card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: E, delay: 0.1 }}
                  className="flex flex-col items-center gap-4"
                >
                  {/* Card */}
                  <div className="relative bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[0_12px_50px_rgba(41,60,151,0.35)] transition-shadow duration-300 group">
                    {/* Scanner-frame corner accents */}
                    {(["top-2.5 left-2.5", "top-2.5 right-2.5", "bottom-2.5 left-2.5", "bottom-2.5 right-2.5"] as const).map((pos) => (
                      <span
                        key={pos}
                        aria-hidden="true"
                        className={`absolute ${pos} w-4 h-4 rounded-sm pointer-events-none border-[#293C97]/35 group-hover:border-[#293C97]/60 transition-colors duration-300`}
                        style={{ borderWidth: "2.5px", borderStyle: "solid" }}
                      />
                    ))}
                    {/* Dynamic QR — generated from the live registration URL */}
                    <QRCode
                      value={REGISTRATION_URL}
                      size={152}
                      level="H"
                      bgColor="#ffffff"
                      fgColor="#0a0f2e"
                      style={{ display: "block" }}
                    />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="font-lato font-bold text-white text-sm tracking-tight">Scan to Register</p>
                    <p className="font-montserrat text-white/40 text-[12px] leading-snug max-w-[160px]">
                      Point your phone camera at the code to apply instantly
                    </p>
                  </div>
                </motion.div>
              </div>

              <p className="text-white/20 text-xs mt-10 font-medium">Lagos State, Nigeria</p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="relative w-full overflow-hidden pb-3">
        <Image src="/images/footer.webp" alt="" fill
          className="object-cover object-top pointer-events-none select-none" loading="lazy" />
        <div className="relative z-10"><Footer /></div>
      </div>

      {/* ════════════════════════════════════════
          STICKY BAR
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {sticky && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-[9000] border-t border-white/8 bg-[#06091e]/96 backdrop-blur-xl"
          >
            {/* Desktop */}
            <div className="hidden sm:flex items-center justify-between gap-6 max-w-screen-xl mx-auto px-8 py-4">
              <div>
                <p className="font-lato font-bold text-white text-[13px] leading-tight">Future You Enterprise Boost Programme</p>
                <p className="text-white/40 text-xs mt-0.5">{TRAINING_DATE} · Lagos State · Limited spaces</p>
              </div>
              <ApplyBtn size="sm" />
            </div>
            {/* Mobile */}
            <div className="sm:hidden px-4 py-3">
              <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white font-bold text-sm w-full py-4 rounded-xl transition-colors duration-200">
                Apply Now — Enterprise Boost Programme
                <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
