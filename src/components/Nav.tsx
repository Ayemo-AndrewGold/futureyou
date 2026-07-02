"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";

const Nav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  // const toggleMenu = (): void => setMenuOpen((prev) => !prev);
  const closeMenu = (): void => setMenuOpen(false);

    const toggleMenu = (): void => {
    console.log("toggleMenu fired, current state:", menuOpen);
    setMenuOpen((prev) => !prev);
  };

  useEffect((): (() => void) => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect((): (() => void) => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
    return () => {};
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 font-[lato] ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-16 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="shrink-0">
          <Image
            src="/images/headerLogo.png"
            alt="FutureYou Limited logo"
            width={150}
            height={50}
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-10 items-center font-[lato]">
          {navLinks.map(({ href, label }: { href: string; label: string }) => {
            const isActive = pathname === href;

            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`relative inline-block text-[1.1rem] font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-[#293C97]"
                      : "text-[#0E0E1D] hover:text-[#293C97]"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute left-0 -bottom-[2px] h-[2px] bg-[#293C97] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger */}
        <div className="lg:hidden relative z-[60]">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="relative flex flex-col gap-[5px] w-8 h-8 items-center justify-center"
          >
            <span
              className={`h-[2px] w-6 bg-black transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-black transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-black transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-2/4 max-w-xs bg-white z-50 shadow-lg"
          >
            <div className="p-6 pt-24 flex flex-col gap-6 font-[lato] font-semibold">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className={`text-[1.1rem] ${
                    pathname === href
                      ? "text-[#293C97]"
                      : "text-[#0E0E1D] hover:text-[#293C97]"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}
    </header>
  );
};

export default Nav;