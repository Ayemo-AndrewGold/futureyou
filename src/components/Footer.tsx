"use client";

import { useState } from "react";
import { FaFacebook, FaLinkedin, FaTiktok, FaInstagram } from "react-icons/fa";
import toast from "react-hot-toast";
import { subscribeToNewsletter } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

/* ── Inline newsletter subscription ───────────────────────── */
function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    if (!trimmed) { toast.error("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) { toast.error("Please enter a valid email address."); return; }
    try {
      await toast.promise(
        subscribeToNewsletter({ email: trimmed }),
        {
          loading: "Subscribing…",
          success: (res) => {
            setEmail("");
            return typeof res === "object" && res !== null && "message" in res
              ? (res as { message: string }).message
              : "Subscription successful!";
          },
          error: (err) => err instanceof Error ? err.message : "Subscription failed. Please try again.",
        }
      );
    } catch { /* handled by toast.promise */ }
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }}
      className="flex items-center gap-2 mt-5 w-full max-w-sm"
    >
      <input
        type="email"
        autoComplete="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 min-w-0 bg-[#f7f8ff] border border-[#e0e3f5] focus:border-[#293C97]/40 rounded-lg px-4 py-2.5 text-[13px] text-[#0E0E1D] placeholder:text-[#aaa] outline-none transition-colors duration-200"
      />
      <button
        type="submit"
        className="shrink-0 bg-[#293C97] hover:bg-[#1e2d85] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}

/* ── Shared: footer nav link ───────────────────────────────── */
function FooterLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = "group inline-flex items-center gap-1.5 text-[#555] hover:text-[#293C97] text-[13px] font-medium transition-colors duration-200 py-0.5";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <span className="relative">
          {children}
          <span className="absolute -bottom-px left-0 w-0 h-px bg-[#293C97]/40 group-hover:w-full transition-all duration-300 rounded-full" />
        </span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      <span className="relative">
        {children}
          <span className="absolute -bottom-px left-0 w-0 h-px bg-[#293C97]/40 group-hover:w-full transition-all duration-300 rounded-full" />
      </span>
    </Link>
  );
}

/* ── Social icons ──────────────────────────────────────────── */
const SOCIALS = [
  { icon: FaInstagram, href: "https://www.instagram.com/futureyoulimited", label: "Instagram", hoverColor: "hover:text-[#e1306c]" },
  { icon: FaLinkedin,  href: "https://www.linkedin.com/company/futureyou-limited/", label: "LinkedIn", hoverColor: "hover:text-[#0a66c2]" },
  { icon: FaTiktok,    href: "https://www.tiktok.com/@futureyoulimited", label: "TikTok", hoverColor: "hover:text-white" },
  { icon: FaFacebook,  href: "https://www.facebook.com/share/16oRt3oVEa/", label: "Facebook", hoverColor: "hover:text-[#1877f2]" },
];

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="relative px-3 sm:px-8 lg:px-16 pt-12 pb-6 flex flex-col items-center">

      {/* ── Main card ─────────────────────────────────────── */}
      <div className="w-full max-w-[1440px] bg-white border border-gray-100 rounded-2xl shadow-sm px-2 sm:px-8 lg:px-10 py-10 sm:py-12">

        {/* Top row: newsletter + logo + nav columns + contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_auto_1fr_1fr_1.2fr] gap-x-8 gap-y-10">

          {/* Newsletter */}
          <div>
            {/* Logo shown only on mobile inside newsletter block */}
            <div className="block sm:hidden mb-6">
              <Image src="/images/headerLogo.svg" width={110} height={34} alt="FutureYou" className="object-contain" />
            </div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#293C97]/50 mb-3">Newsletter</p>
            <h2 className="font-lato font-bold text-[#0E0E1D] text-lg sm:text-xl leading-snug">
              Stay in the loop
            </h2>
            <p className="text-[13px] text-[#666] leading-relaxed mt-2.5 max-w-xs">
              Practical insights, transformation stories, expert advice, and updates on loan services, coaching, and consulting delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>

          {/* Logo — desktop / tablet */}
          <div className="hidden sm:flex items-start justify-center pt-6 lg:pt-8 pl-2 lg:pl-4">
            <Image src="/images/headerLogo.svg" width={100} height={32} alt="FutureYou" className="object-contain" />
          </div>

          {/* Explore */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#293C97]/50 mb-5">Explore</p>
            <ul className="flex flex-col gap-3">
              <li><FooterLink href="/aboutus">About Future You</FooterLink></li>
              <li><FooterLink href="/coaching">Coaching & Mentorship</FooterLink></li>
              <li><FooterLink href="/startjourney">Apply for Support</FooterLink></li>
              <li><FooterLink href="/career">Join Our Team</FooterLink></li>
              <li><FooterLink href="/event">Enterprise Boost</FooterLink></li>
            </ul>
          </div>

          {/* Help & Legal */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#293C97]/50 mb-5">Help & Legal</p>
            <ul className="flex flex-col gap-3">
              <li><FooterLink href="/contactus">Contact Us</FooterLink></li>
              <li><FooterLink href="/privacypolicy">Terms & Conditions</FooterLink></li>
              <li>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="group inline-flex items-center text-[#555] hover:text-[#293C97] text-[13px] font-medium transition-colors duration-200 py-0.5"
                >
                  <span className="relative">
                    Privacy Policy
                    <span className="absolute -bottom-px left-0 w-0 h-px bg-[#293C97]/40 group-hover:w-full transition-all duration-300 rounded-full" />
                  </span>
                </button>
              </li>
              <li><FooterLink href="#">FAQs</FooterLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#293C97]/50 mb-5">Contact</p>
            <ul className="flex flex-col gap-3 mb-5">
              <li>
                <a href="tel:08169159291"
                  className="text-[13px] text-[#555] hover:text-[#293C97] font-medium transition-colors duration-200">
                  08169159291
                </a>
              </li>
              <li>
                <a href="mailto:futureyoulimited@gmail.com" target="_blank"
                  className="text-[13px] text-[#555] hover:text-[#293C97] font-medium transition-colors duration-200 break-all">
                  info@futureyoulimited.com 
                </a>
              </li>
            </ul>
            <div className="space-y-1 mb-5">
              <p className="text-[11px] font-bold text-[#293C97]/50 uppercase tracking-widest">Business Hours</p>
              <p className="text-[13px] text-[#666]">Mon – Fri: 9:00 AM – 6:00 PM</p>
              <p className="text-[13px] text-[#666]">Saturday: 10:00 AM – 2:00 PM</p>
            </div>
            <a
              href="tel:08169159291"
              className="inline-flex items-center gap-2 bg-[#0E0E1D] hover:bg-[#1a1a2e] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm"
            >
              Request a Call
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 mb-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Bottom row: social + address */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, href, label, hoverColor }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit FutureYou on ${label}`}
                className={`text-[#aaa] ${hoverColor} transition-all duration-200 hover:scale-110`}
              >
                <Icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>

          {/* Address */}
          <p className="text-[12px] text-[#aaa] leading-relaxed max-w-xs sm:text-right">
            Blk F3 Suite 256 Eastline HFP Complex,<br className="hidden sm:block" />
            Lekki-Epe Expressway, Lagos
          </p>
        </div>
      </div>

      {/* ── Tagline + copyright ─────────────────────────── */}
      <div className="w-full max-w-[1440px] mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 px-1">
        <h2 className="font-lato font-bold text-white text-[1.1rem] sm:text-[1.3rem] leading-snug">
          Helping individuals and businesses<br />become who they were meant to be
        </h2>
        <div className="flex items-center gap-4 shrink-0">
          <p className="text-white/35 text-[12px]">© 2026 Future You Limited. All rights reserved.</p>
          <button
            onClick={() => setShowPrivacy(true)}
            className="text-white/35 hover:text-white text-[12px] transition-colors duration-200"
          >
            Privacy
          </button>
        </div>
      </div>

      {/* ── Privacy modal ───────────────────────────────── */}
      {showPrivacy && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[3px] z-[99999] p-4"
          onClick={() => setShowPrivacy(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPrivacy(false)}
              aria-label="Close privacy policy"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-150"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <h3 className="font-lato font-bold text-[#0E0E1D] text-lg mb-4">Privacy Policy</h3>
            <p className="text-[14px] text-[#555] leading-relaxed">
              FutureYou values your privacy. We collect limited personal and usage information
              to provide and improve our services. Your data is never sold and is protected
              with appropriate security measures. By using our services, you agree to our
              data practices.
            </p>
            <div className="mt-5">
              <Link
                href="/privacypolicy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowPrivacy(false)}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#293C97] hover:text-[#1e2d85] transition-colors duration-150"
              >
                Read full Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
