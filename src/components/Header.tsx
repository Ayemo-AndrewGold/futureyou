"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/constants";

/* ─── Services menu data ─────────────────────────────────────────
   Two groups:
     1. Loan Services — primary / flagship (4 products)
     2. Professional Services — Coaching & Consulting
──────────────────────────────────────────────────────────────── */
const LOAN_ITEMS = [
  {
    label: "SME Term Loan",
    href:  "/biodata?journey=SME+Term+Loan",
    desc:  "Flexible term financing for growing businesses",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[15px] h-[15px]">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "Asset Financing",
    href:  "/biodata?journey=Asset+Financing",
    desc:  "Fund equipment and assets for your business",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[15px] h-[15px]">
        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "Payday Loan",
    href:  "/biodata?journey=Payday+Loan",
    desc:  "Short-term loans to bridge income gaps",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[15px] h-[15px]">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "LPO Financing",
    href:  "/biodata?journey=LPO+Financing",
    desc:  "Finance local purchase orders with ease",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[15px] h-[15px]">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const PROFESSIONAL_ITEMS = [
  {
    label: "Coaching",
    href:  "/startjourney",
    desc:  "Personal & business coaching programmes",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[15px] h-[15px]">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z" />
      </svg>
    ),
  },
  {
    label: "Consulting",
    href:  "/startjourney",
    desc:  "Strategic consulting for business growth",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[15px] h-[15px]">
        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
      </svg>
    ),
  },
];

/* ─── About dropdown items ───────────────────────────────────────
   Two sub-pages beneath the About nav item.
──────────────────────────────────────────────────────────────── */
const ABOUT_ITEMS = [
  {
    label: "About Us",
    href:  "/aboutus",
    desc:  "Our mission, vision, and team",
    icon: (
      <svg viewBox="0 0 10 10" fill="none" stroke="#293C97" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"  className="w-[25px] h-[25px]">
        <circle cx="5" cy="3" r="1.5" />
      </svg>
    ),
  },
  {
    label: "Contact Us",
    href:  "/contactus",
    desc:  "Our contact information and support",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[15px] h-[15px]">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    ),
  },
];

/* ─── Icon map: small inline SVGs per nav item ───────────────────
   Keeps the mobile drawer rich without an extra icon dependency.
──────────────────────────────────────────────────────────────── */
const NAV_ICONS: Record<string, React.ReactNode> = {
  Home: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 11h1v6a1 1 0 001 1h4v-4h2v4h4a1 1 0 001-1v-6h1a1 1 0 00.707-1.707l-7-7z" />
    </svg>
  ),
  Services: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  ),
  Blog: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
    </svg>
  ),
  About: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  Contact: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  ),
  Careers: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
    </svg>
  ),
};

/* ─── Hamburger icon ─────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
      <span
        className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${
          open ? "rotate-45 translate-y-[7px]" : ""
        }`}
      />
      <span
        className={`h-[2px] bg-current rounded-full transition-all duration-300 ${
          open ? "w-0 opacity-0" : "w-5 opacity-100"
        }`}
      />
      <span
        className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${
          open ? "-rotate-45 -translate-y-[7px]" : ""
        }`}
      />
    </span>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const pathname = usePathname();
  const desktopDropdownRef = useRef<HTMLLIElement>(null);
  const desktopAboutRef = useRef<HTMLLIElement>(null);

  const toggleMenu = () => setMenuOpen((p) => !p);
  const closeMenu = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileAboutOpen(false);
  };

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close desktop dropdowns on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        desktopDropdownRef.current?.blur();
        desktopAboutRef.current?.blur();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-white/90 backdrop-blur-2xl shadow-[0_2px_32px_rgba(0,0,0,0.07)] h-[66px]"
          : "bg-white h-[72px]"
      }`}
    >
      {/* Gradient hairline — intensifies on scroll */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-500 bg-gradient-to-r from-transparent via-gray-200/80 to-transparent ${
          isScrolled ? "opacity-100" : "opacity-60"
        }`}
      />

      <nav className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-full flex items-center justify-between">

        {/* ── Logo ── */}
        <Link
          href="/"
          onClick={closeMenu}
          className="shrink-0 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97] focus-visible:ring-offset-2 rounded-sm"
          aria-label="FutureYou — go to homepage"
        >
          <Image
            src="/images/headerLogo.svg"
            alt="FutureYou Limited"
            width={138}
            height={42}
            priority
            className="object-contain"
          />
        </Link>

        {/* ── Desktop nav links ── */}
        <ul
          role="list"
          className="hidden lg:flex items-center gap-0.5"
        >
          {navLinks.map(({ href, label }: { href: string; label: string }) => {
            const isActive = pathname === href || (label === "Services" && pathname.startsWith("/services"));

            /* ── Services: hover + focus-within dropdown ── */
            if (label === "Services") {
              return (
                <li
                  key={label}
                  ref={desktopDropdownRef}
                  className="relative group"
                  /* Keep dropdown open when focus moves inside it */
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      (e.currentTarget.querySelector("button") as HTMLElement)?.focus();
                    }
                  }}
                >
                  {/* Trigger — acts as the "Services" nav item */}
                  <button
                    className={`group/btn relative inline-flex flex-col items-center px-4 py-2 text-[0.875rem] font-medium tracking-[-0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97]/40 rounded-lg ${
                      isActive
                        ? "text-[#293C97]"
                        : "text-[#4a4a5a] hover:text-[#1a1a2e] group-hover:text-[#1a1a2e]"
                    }`}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="flex items-center gap-1.5">
                      {label}
                      {/* Chevron — rotates when dropdown is visible */}
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      >
                        <path d="M2 4l4 4 4-4" />
                      </svg>
                    </span>
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0.5 h-[1.5px] rounded-full bg-[#293C97] transition-all duration-300 ease-out ${
                        isActive
                          ? "w-4 opacity-100"
                          : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-60"
                      }`}
                    />
                  </button>

                  {/* Dropdown panel
                      Opens on :hover of the <li> OR :focus-within (keyboard).
                      Pure CSS — no JS state, no flash, no layout shift.
                  */}
                  <div
                    className="
                      absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[320px]
                      opacity-0 invisible translate-y-2 pointer-events-none
                      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto
                      focus-within:opacity-100 focus-within:visible focus-within:translate-y-0 focus-within:pointer-events-auto
                      transition-all duration-200 ease-out
                      z-50
                    "
                    role="menu"
                    aria-label="Services submenu"
                  >
                    {/* Invisible bridge — cursor can travel from trigger to panel */}
                    <div className="absolute -top-1.5 left-0 right-0 h-2" />

                    {/* Panel */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">

                      {/* ── SECTION 1: Loan Services (flagship) ── */}
                      <div className="px-3 pt-3.5 pb-2">
                        {/* Section label */}
                        <div className="flex items-center gap-2 px-2 mb-2">
                          <div className="w-4 h-4 rounded-md bg-[#293C97] flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 10 10" fill="white" className="w-2.5 h-2.5">
                              <path d="M1 2a1 1 0 011-1h6a1 1 0 011 1v.5H1V2zM1 4h8v3a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm1.5 1.5a.5.5 0 000 1H3a.5.5 0 000-1h-.5zm2 0a.5.5 0 000 1h1a.5.5 0 000-1h-1z" />
                            </svg>
                          </div>
                          <span className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#293C97]">
                            Loan Services
                          </span>
                        </div>

                        {/* Loan items */}
                        <ul role="none" className="space-y-0.5">
                          {LOAN_ITEMS.map((item) => {
                            const itemActive = pathname === item.href;
                            return (
                              <li key={item.label} role="none">
                                <Link
                                  href={item.href}
                                  role="menuitem"
                                  className={`group/item flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97]/35 ${
                                    itemActive
                                      ? "bg-[#EEF0FA] text-[#293C97]"
                                      : "hover:bg-[#f4f5fd] text-[#2a2a3a] hover:text-[#293C97]"
                                  }`}
                                >
                                  {/* Icon */}
                                  <span
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 ${
                                      itemActive
                                        ? "bg-[#293C97] text-white"
                                        : "bg-[#EEF0FA] text-[#293C97] group-hover/item:bg-[#293C97] group-hover/item:text-white"
                                    }`}
                                  >
                                    {item.icon}
                                  </span>
                                  {/* Text */}
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-[13.5px] font-semibold leading-tight tracking-[-0.01em]">
                                      {item.label}
                                    </span>
                                    <span className="text-[11.5px] text-[#888] group-hover/item:text-[#293C97]/55 transition-colors duration-150 mt-0.5 leading-snug">
                                      {item.desc}
                                    </span>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* ── Divider ── */}
                      <div className="mx-3 my-1 h-px bg-gray-100" />

                      {/* ── SECTION 2: Professional Services ── */}
                      <div className="px-3 pt-2 pb-3">
                        {/* Section label */}
                        <div className="flex items-center gap-2 px-2 mb-2">
                          <div className="w-4 h-4 rounded-md bg-[#f4f5fd] flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 10 10" fill="none" stroke="#293C97" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                              <circle cx="5" cy="3" r="1.5" />
                              <path d="M2 8.5c0-1.657 1.343-3 3-3s3 1.343 3 3" />
                            </svg>
                          </div>
                          <span className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#555]">
                            Professional Services
                          </span>
                        </div>

                        {/* Coaching + Consulting */}
                        <ul role="none" className="space-y-0.5">
                          {PROFESSIONAL_ITEMS.map((item) => {
                            const itemActive = pathname === item.href;
                            return (
                              <li key={item.label} role="none">
                                <Link
                                  href={item.href}
                                  role="menuitem"
                                  className={`group/item flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97]/35 ${
                                    itemActive
                                      ? "bg-[#EEF0FA] text-[#293C97]"
                                      : "hover:bg-[#f4f5fd] text-[#2a2a3a] hover:text-[#293C97]"
                                  }`}
                                >
                                  <span
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 ${
                                      itemActive
                                        ? "bg-[#293C97] text-white"
                                        : "bg-gray-100 text-gray-500 group-hover/item:bg-[#EEF0FA] group-hover/item:text-[#293C97]"
                                    }`}
                                  >
                                    {item.icon}
                                  </span>
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-[13.5px] font-semibold leading-tight tracking-[-0.01em]">
                                      {item.label}
                                    </span>
                                    <span className="text-[11.5px] text-[#888] group-hover/item:text-[#293C97]/55 transition-colors duration-150 mt-0.5 leading-snug">
                                      {item.desc}
                                    </span>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* ── Footer CTA ── */}
                      {/* <div className="mx-3 mb-3 mt-0.5 bg-gradient-to-r from-[#EEF0FA] to-[#f4f5fd] rounded-xl px-4 py-2.5 flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-[#293C97]">Explore all services</span>
                        <Link
                          href="/startjourney"
                          className="inline-flex items-center gap-1 text-[11.5px] font-bold text-white bg-[#293C97] hover:bg-[#1e2d85] px-3 py-1.5 rounded-lg transition-colors duration-150"
                        >
                          Get Started
                          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                            <path d="M2 5h6M5 2l3 3-3 3" />
                          </svg>
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </li>
              );
            }

            /* ── About: hover + focus-within dropdown ── */
            if (label === "Company") {
              return (
                <li
                  key={label}
                  ref={desktopAboutRef}
                  className="relative group"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      (e.currentTarget.querySelector("button") as HTMLElement)?.focus();
                    }
                  }}
                >
                  <button
                    className={`group/btn relative inline-flex flex-col items-center px-4 py-2 text-[0.875rem] font-medium tracking-[-0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97]/40 rounded-lg ${
                      isActive
                        ? "text-[#293C97]"
                        : "text-[#4a4a5a] hover:text-[#1a1a2e] group-hover:text-[#1a1a2e]"
                    }`}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="flex items-center gap-1.5">
                      {label}
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      >
                        <path d="M2 4l4 4 4-4" />
                      </svg>
                    </span>
                    <span
                      className={`absolute bottom-0.5 h-[1.5px] rounded-full bg-[#293C97] transition-all duration-300 ease-out ${
                        isActive
                          ? "w-4 opacity-100"
                          : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-60"
                      }`}
                    />
                  </button>

                  <div
                    className="
                      absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[240px]
                      opacity-0 invisible translate-y-2 pointer-events-none
                      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto
                      focus-within:opacity-100 focus-within:visible focus-within:translate-y-0 focus-within:pointer-events-auto
                      transition-all duration-200 ease-out
                      z-50
                    "
                    role="menu"
                    aria-label="About submenu"
                  >
                    <div className="absolute -top-1.5 left-0 right-0 h-2" />
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
                      <div className="px-3 pt-3.5 pb-3">
                        <div className="flex items-center gap-2 px-2 mb-2">
                          {/* <div className="w-4 h-4 rounded-md bg-[#f4f5fd] flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-[15px] h-[15px]">
                             <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                            </svg>
                          </div> */}
                          <span className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#555]">
                            Our Company
                          </span>
                        </div>
                        <ul role="none" className="space-y-0.5">
                          {ABOUT_ITEMS.map((item) => {
                            const itemActive = pathname === item.href;
                            return (
                              <li key={item.label} role="none">
                                <Link
                                  href={item.href}
                                  role="menuitem"
                                  className={`group/item flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97]/35 ${
                                    itemActive
                                      ? "bg-[#EEF0FA] text-[#293C97]"
                                      : "hover:bg-[#f4f5fd] text-[#2a2a3a] hover:text-[#293C97]"
                                  }`}
                                >
                                  {/* <span
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 ${
                                      itemActive
                                        ? "bg-[#293C97] text-white"
                                        : "bg-gray-100 text-gray-500 group-hover/item:bg-[#EEF0FA] group-hover/item:text-[#293C97]"
                                    }`}
                                  >
                                    {item.icon}
                                  </span> */}
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-[13.5px] font-semibold leading-tight tracking-[-0.01em]">
                                      {item.label}
                                    </span>
                                    <span className="text-[11.5px] text-[#888] group-hover/item:text-[#293C97]/55 transition-colors duration-150 mt-0.5 leading-snug">
                                      {item.desc}
                                    </span>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {/* <div className="mx-3 mb-3 mt-0.5 bg-gradient-to-r from-[#EEF0FA] to-[#f4f5fd] rounded-xl px-4 py-2.5 flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-[#293C97]">Learn more about us</span>
                        <Link
                          href="/aboutus"
                          className="inline-flex items-center gap-1 text-[11.5px] font-bold text-white bg-[#293C97] hover:bg-[#1e2d85] px-3 py-1.5 rounded-lg transition-colors duration-150"
                        >
                          Visit
                          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                            <path d="M2 5h6M5 2l3 3-3 3" />
                          </svg>
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </li>
              );
            }

            /* ── All other nav items — unchanged ── */
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`group relative inline-flex flex-col items-center px-4 py-2 text-[0.875rem] font-medium tracking-[-0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97]/40 rounded-lg ${
                    isActive
                      ? "text-[#293C97]"
                      : "text-[#4a4a5a] hover:text-[#1a1a2e]"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0.5 h-[1.5px] rounded-full bg-[#293C97] transition-all duration-300 ease-out ${
                      isActive
                        ? "w-4 opacity-100"
                        : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-60"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop CTAs ── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Ghost / text CTA */}
          {/* <Link
            href="/contactus"
            className="inline-flex items-center text-[0.875rem] font-medium text-[#4a4a5a] hover:text-[#1a1a2e] px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97]/40"
          >
            Contact
          </Link> */}

          {/* Divider */}
          {/* <div className="w-px h-5 bg-gray-200 shrink-0" /> */}

          {/* Primary CTA */}
          <Link
            href="/startjourney"
            className="group relative overflow-hidden inline-flex items-center gap-2 text-[0.875rem] font-semibold text-white bg-[#293C97] hover:bg-[#1e2d85] px-[18px] py-[9px] rounded-[10px] transition-all duration-200 shadow-[0_1px_3px_rgba(41,60,151,0.25),0_4px_12px_rgba(41,60,151,0.15)] hover:shadow-[0_1px_3px_rgba(41,60,151,0.35),0_6px_20px_rgba(41,60,151,0.25)] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97] focus-visible:ring-offset-2"
          >
            {/* Shine sweep */}
            <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
            Get Started
            <svg
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </Link>
        </div>

        {/* ── Hamburger (mobile / tablet) ── */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          className={`lg:hidden relative z-[210] shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293C97]/50 ${
            menuOpen
              ? "bg-[#EEF0FA] text-[#293C97]"
              : "text-[#0E0E1D] hover:bg-gray-100 active:bg-gray-200"
          }`}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* ── Portal: overlay + slide-in drawer ────────────────────────
          Portaled to document.body so backdrop-blur on the header
          never creates a new containing block for fixed children.
      ──────────────────────────────────────────────────────────── */}
      {mounted &&
        createPortal(
          <>
            {/* Dimmed overlay */}
            <div
              onClick={closeMenu}
              aria-hidden="true"
              className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[99998] lg:hidden transition-opacity duration-300 ${
                menuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            />

            {/* Drawer */}
            <aside
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className={`fixed top-0 right-0 h-full w-[300px] z-[100000] flex flex-col lg:hidden bg-white shadow-[−2px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Drawer header */}
              <div className="relative flex items-center justify-between px-5 h-[70px] shrink-0 border-b border-gray-100">
                {/* Subtle blue top-edge accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#293C97] via-[#7b8ef5] to-transparent rounded-t-none" />

                <Link href="/" onClick={closeMenu} aria-label="FutureYou home">
                  <Image
                    src="/images/headerLogo.svg"
                    alt="FutureYou Limited"
                    width={120}
                    height={38}
                    className="object-contain"
                  />
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Section label */}
              {/* <p className="px-5 pt-5 pb-2 text-[10px] font-bold text-gray-400 tracking-[0.18em] uppercase select-none">
                Navigation
              </p> */}

              {/* Nav links */}
              <nav className="flex flex-col gap-0.5 px-3 flex-1 overflow-y-auto">
                {navLinks.map(({ href, label }, index) => {
                  const isActive = pathname === href || (label === "Services" && pathname.startsWith("/services"));

                  /* ── Services: accordion in mobile drawer ── */
                  if (label === "Services") {
                    return (
                      <div key={label}>
                        {/* Accordion trigger */}
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen((o) => !o)}
                          style={{ transitionDelay: menuOpen ? `${80 + index * 50}ms` : "0ms" }}
                          className={`w-full flex items-center gap-3 text-[0.9rem] font-semibold py-3 px-3.5 rounded-xl transition-all duration-300 ease-out ${
                            menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                          } ${
                            isActive
                              ? "text-[#293C97] bg-[#EEF0FA]"
                              : "text-[#2a2a3a] hover:text-[#293C97] hover:bg-[#f4f5fd]"
                          }`}
                        >
                          {/* Icon */}
                          <span className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200 shrink-0 ${
                            isActive ? "bg-[#293C97] text-white" : "bg-gray-100 text-gray-500"
                          }`}>
                            {NAV_ICONS["Services"]}
                          </span>

                          <span className="flex-1 text-left">Services</span>

                          {/* Chevron */}
                          <svg
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`w-3.5 h-3.5 text-[#293C97]/50 transition-transform duration-250 shrink-0 ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          >
                            <path d="M2 4l4 4 4-4" />
                          </svg>
                        </button>

                        {/* Sub-items — two groups */}
                        <AnimatePresence initial={false}>
                          {mobileServicesOpen && (
                            <motion.div
                              key="services-sub"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="overflow-hidden"
                            >
                              {/* Loan Services group */}
                              <div className="pl-5 pr-1 pt-1 pb-0.5">
                                <p className="text-[9.5px] font-bold tracking-[0.18em] uppercase text-[#293C97]/70 px-3 py-1.5">
                                  Loan Services
                                </p>
                                <ul className="space-y-0.5">
                                  {LOAN_ITEMS.map((item) => {
                                    const itemActive = pathname === item.href;
                                    return (
                                      <li key={item.href}>
                                        <Link
                                          href={item.href}
                                          onClick={closeMenu}
                                          className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-[0.875rem] font-semibold transition-all duration-150 ${
                                            itemActive
                                              ? "text-[#293C97] bg-[#EEF0FA]"
                                              : "text-[#2a2a3a] hover:text-[#293C97] hover:bg-[#f4f5fd]"
                                          }`}
                                        >
                                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 ${
                                            itemActive ? "bg-[#293C97] text-white" : "bg-[#EEF0FA] text-[#293C97]"
                                          }`}>
                                            {item.icon}
                                          </span>
                                          {item.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>

                              {/* Divider */}
                              <div className="ml-5 mr-4 my-2 h-px bg-gray-100" />

                              {/* Professional Services group */}
                              <div className="pl-5 pr-1 pb-1.5">
                                <p className="text-[9.5px] font-bold tracking-[0.18em] uppercase text-[#555] px-3 py-1.5">
                                  Professional Services
                                </p>
                                <ul className="space-y-0.5">
                                  {PROFESSIONAL_ITEMS.map((item) => {
                                    const itemActive = pathname === item.href;
                                    return (
                                      <li key={item.href}>
                                        <Link
                                          href={item.href}
                                          onClick={closeMenu}
                                          className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-[0.875rem] font-semibold transition-all duration-150 ${
                                            itemActive
                                              ? "text-[#293C97] bg-[#EEF0FA]"
                                              : "text-[#2a2a3a] hover:text-[#293C97] hover:bg-[#f4f5fd]"
                                          }`}
                                        >
                                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 ${
                                            itemActive ? "bg-[#293C97] text-white" : "bg-gray-100 text-gray-500"
                                          }`}>
                                            {item.icon}
                                          </span>
                                          {item.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  /* ── About: accordion in mobile drawer ── */
                  if (label === "About") {
                    return (
                      <div key={label}>
                        <button
                          type="button"
                          onClick={() => setMobileAboutOpen((o) => !o)}
                          style={{ transitionDelay: menuOpen ? `${80 + index * 50}ms` : "0ms" }}
                          className={`w-full flex items-center gap-3 text-[0.9rem] font-semibold py-3 px-3.5 rounded-xl transition-all duration-300 ease-out ${
                            menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                          } ${
                            isActive
                              ? "text-[#293C97] bg-[#EEF0FA]"
                              : "text-[#2a2a3a] hover:text-[#293C97] hover:bg-[#f4f5fd]"
                          }`}
                        >
                          <span className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200 shrink-0 ${
                            isActive ? "bg-[#293C97] text-white" : "bg-gray-100 text-gray-500"
                          }`}>
                            {NAV_ICONS["About"]}
                          </span>
                          <span className="flex-1 text-left">About</span>
                          <svg
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`w-3.5 h-3.5 text-[#293C97]/50 transition-transform duration-200 shrink-0 ${
                              mobileAboutOpen ? "rotate-180" : ""
                            }`}
                          >
                            <path d="M2 4l4 4 4-4" />
                          </svg>
                        </button>

                        <AnimatePresence initial={false}>
                          {mobileAboutOpen && (
                            <motion.ul
                              key="about-sub"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="overflow-hidden pl-5 pr-1 mt-0.5 space-y-0.5"
                            >
                              {ABOUT_ITEMS.map((item) => {
                                const itemActive = pathname === item.href;
                                return (
                                  <li key={item.label}>
                                    <Link
                                      href={item.href}
                                      onClick={closeMenu}
                                      className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-[0.875rem] font-semibold transition-all duration-150 ${
                                        itemActive
                                          ? "text-[#293C97] bg-[#EEF0FA]"
                                          : "text-[#2a2a3a] hover:text-[#293C97] hover:bg-[#f4f5fd]"
                                      }`}
                                    >
                                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 ${
                                        itemActive ? "bg-[#293C97] text-white" : "bg-gray-100 text-gray-500"
                                      }`}>
                                        {item.icon}
                                      </span>
                                      {item.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  /* ── All other mobile nav items — unchanged ── */
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      style={{
                        transitionDelay: menuOpen ? `${80 + index * 50}ms` : "0ms",
                      }}
                      className={`flex items-center gap-3 text-[0.9rem] font-semibold py-3 px-3.5 rounded-xl transition-all duration-300 ease-out ${
                        menuOpen
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      } ${
                        isActive
                          ? "text-[#293C97] bg-[#EEF0FA]"
                          : "text-[#2a2a3a] hover:text-[#293C97] hover:bg-[#f4f5fd]"
                      }`}
                    >
                      {/* Icon */}
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200 ${
                          isActive
                            ? "bg-[#293C97] text-white"
                            : "bg-gray-100 text-gray-500 group-hover:bg-[#EEF0FA] group-hover:text-[#293C97]"
                        }`}
                      >
                        {NAV_ICONS[label] ?? (
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        )}
                      </span>

                      <span className="flex-1">{label}</span>

                      {/* Active chevron */}
                      {isActive && (
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#293C97] shrink-0">
                          <path d="M6 4l4 4-4 4" />
                        </svg>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* CTA footer */}
              <div
                style={{
                  transitionDelay: menuOpen
                    ? `${80 + navLinks.length * 50 + 40}ms`
                    : "0ms",
                }}
                className={`px-4 pb-8 pt-4 border-t border-gray-100 flex flex-col gap-2.5 shrink-0 transition-all duration-300 ease-out ${
                  menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                {/* <Link
                  href="/contactus"
                  onClick={closeMenu}
                  className="flex items-center justify-center text-sm font-semibold text-[#293C97] border-[1.5px] border-[#293C97]/30 py-3 rounded-xl hover:border-[#293C97] hover:bg-[#EEF0FA] transition-all duration-200"
                >
                  Contact Us
                </Link> */}
                <Link
                  href="/startjourney"
                  onClick={closeMenu}
                  className="group relative overflow-hidden flex items-center justify-center gap-2 text-sm font-bold text-white bg-[#293C97] py-3 rounded-xl hover:bg-[#1e2d85] transition-all duration-200 shadow-md shadow-[#293C97]/20"
                >
                  <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                  Get Started
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 duration-200">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>

                {/* Tagline */}
                <p className="text-center text-[11px] text-gray-400 mt-1 select-none">
                  Expert Loan Services · Coaching · Consulting
                </p>
              </div>
            </aside>
          </>,
          document.body
        )}
    </header>
  );
};

export default Header;
