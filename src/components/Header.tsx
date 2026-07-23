"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";

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
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((p) => !p);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            const isActive = pathname === href;
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
                  {/* Animated underline — slides in from centre */}
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
              <p className="px-5 pt-5 pb-2 text-[10px] font-bold text-gray-400 tracking-[0.18em] uppercase select-none">
                Navigation
              </p>

              {/* Nav links */}
              <nav className="flex flex-col gap-0.5 px-3 flex-1 overflow-y-auto">
                {navLinks.map(({ href, label }, index) => {
                  const isActive = pathname === href;
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
                <Link
                  href="/contactus"
                  onClick={closeMenu}
                  className="flex items-center justify-center text-sm font-semibold text-[#293C97] border-[1.5px] border-[#293C97]/30 py-3 rounded-xl hover:border-[#293C97] hover:bg-[#EEF0FA] transition-all duration-200"
                >
                  Contact Us
                </Link>
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
                  Expert Coaching · Consulting · Growth Capital
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
