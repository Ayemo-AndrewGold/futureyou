"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";

const Nav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200/80 h-[60px]"
          : "bg-white h-[68px]"
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 h-full flex items-center justify-between">

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

        {/* Desktop links — centered */}
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
        <div className="hidden lg:flex items-center gap-3">
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

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-md hover:bg-gray-100 transition-colors"
        >
          <span className={`w-5 h-[1.5px] bg-[#0E0E1D] rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`h-[1.5px] bg-[#0E0E1D] rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-5 opacity-100"}`} />
          <span className={`w-5 h-[1.5px] bg-[#0E0E1D] rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={closeMenu}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-[68px] border-b border-gray-100 shrink-0">
                <Image
                  src="/images/headerLogo.svg"
                  alt="FutureYou Limited"
                  width={120}
                  height={38}
                  className="object-contain"
                />
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-1 px-4 pt-4 flex-1">
                {navLinks.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      className={`flex items-center text-[0.9rem] font-semibold py-[10px] px-3 rounded-lg transition-colors duration-150 ${
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
                  className="text-sm font-semibold text-center text-[#293C97] border-[1.5px] border-[#293C97] py-[10px] rounded-lg hover:bg-[#293C97] hover:text-white transition-all duration-200"
                >
                  Contact us
                </Link>
                <Link
                  href="/startjourney"
                  onClick={closeMenu}
                  className="text-sm font-semibold text-center text-white bg-[#293C97] py-[10px] rounded-lg hover:bg-[#1e2d85] transition-all duration-200"
                >
                  Get started →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Nav;