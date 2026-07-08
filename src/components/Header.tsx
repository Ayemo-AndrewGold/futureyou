"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const toggleMenu = (): void => setMenuOpen((prev) => !prev);
  const closeMenu = (): void => setMenuOpen(false);

  // Needed because createPortal requires document.body, which isn't
  // available during SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  // Close drawer automatically if window is resized up to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200/80 h-[60px]"
          : "bg-white h-[68px]"
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-2 sm:px-12 lg:px-20 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="shrink-0 flex items-center">
          <Image
            src="/images/headerLogo.svg"
            alt="FutureYou Limited"
            width={140}
            height={44}
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ href, label }: { href: string; label: string }) => {
            const isActive = pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`relative text-[17px] font-semibold tracking-wide transition-colors duration-200 group ${
                    isActive ? "text-[#293C97]" : "text-[#3a3a4a] hover:text-[#293C97]"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-[3px] left-0 h-[2px] bg-[#293C97] rounded-full transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            href="/contactus"
            className="text-[0.885rem] font-bold text-[#293C97] border-[1.5px] border-[#293C97] px-5 py-[8px] rounded-lg hover:bg-[#293C97] hover:text-white transition-all duration-200"
          >
            Contact us
          </Link>
          <Link
            href="/startjourney"
            className="text-[0.885rem] font-bold text-white bg-[#293C97] px-5 py-[8px] rounded-lg hover:bg-[#1e2d85] transition-all duration-200 flex items-center gap-1.5"
          >
            Get started
            <span className="text-[0.75rem]">→</span>
          </Link>
        </div>

        {/* Hamburger — forced to always stay on-screen and clickable */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          className="lg:hidden relative z-[210] pointer-events-auto shrink-0 flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors"
        >
          <span
            className={`w-5 h-[1.5px] bg-[#0E0E1D] rounded-full transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`h-[1.5px] bg-[#0E0E1D] rounded-full transition-all duration-300 ${
              menuOpen ? "w-0 opacity-0" : "w-5 opacity-100"
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-[#0E0E1D] rounded-full transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Overlay + Drawer are portaled to document.body so that NOTHING
          this <header> does to itself (backdrop-blur, filter, transform,
          etc.) can ever hijack their `fixed` positioning again. Without
          this, adding backdrop-blur-md on scroll creates a new containing
          block for these fixed children, collapsing them into the header's
          own (60px-tall) box instead of the full viewport. */}
      {mounted &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              onClick={closeMenu}
              aria-hidden="true"
              className={`fixed inset-0 bg-black/40 z-[99998] lg:hidden transition-opacity duration-300 ease-out ${
                menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            />

            {/* Drawer */}
            <div
              id="mobile-drawer"
              className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[100000] flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-[61px] border-b border-gray-100 shrink-0">
                <Image
                  src="/images/headerLogo.svg"
                  alt="FutureYou Limited"
                  width={120}
                  height={38}
                  className="object-contain"
                />
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-1 px-4 pt-4 flex-1">
                {navLinks.map(({ href, label }, index) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      style={{
                        transitionDelay: menuOpen ? `${100 + index * 60}ms` : "0ms",
                      }}
                      className={`flex items-center text-[0.9rem] font-semibold py-[10px] px-3 rounded-lg transition-all duration-300 ease-out ${
                        menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                      } ${
                        isActive
                          ? "text-[#293C97] bg-[#EEF0FA]"
                          : "text-[#1a1a2e] hover:text-[#293C97] hover:bg-gray-50"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1 h-4 bg-[#293C97] rounded-full mr-2.5 shrink-0" />
                      )}
                      {label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile CTAs */}
              <div className="px-4 pb-8 pt-4 border-t border-gray-100 flex flex-col gap-3 shrink-0">
                <Link
                  href="/contactus"
                  onClick={closeMenu}
                  style={{
                    transitionDelay: menuOpen
                      ? `${100 + navLinks.length * 60}ms`
                      : "0ms",
                  }}
                  className={`text-sm font-semibold text-center text-[#293C97] border-[1.5px] border-[#293C97] py-[10px] rounded-lg hover:bg-[#293C97] hover:text-white transition-all duration-300 ease-out ${
                    menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                  }`}
                >
                  Contact us
                </Link>
                <Link
                  href="/startjourney"
                  onClick={closeMenu}
                  style={{
                    transitionDelay: menuOpen
                      ? `${160 + navLinks.length * 60}ms`
                      : "0ms",
                  }}
                  className={`text-sm font-semibold text-center text-white bg-[#293C97] py-[10px] rounded-lg hover:bg-[#1e2d85] transition-all duration-300 ease-out ${
                    menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                  }`}
                >
                  Get started →
                </Link>
              </div>
            </div>
          </>,
          document.body
        )}
    </header>
  );
};

export default Header;