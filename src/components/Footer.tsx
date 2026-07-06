"use client";

import { useState } from "react";
import { FaFacebook, FaLinkedin, FaTiktok, FaInstagram } from "react-icons/fa";
import toast from "react-hot-toast";
import { subscribeToNewsletter } from "@/lib/api";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await toast.promise(
        subscribeToNewsletter({
          email: trimmedEmail,
        }),
        {
          loading: "Subscribing...",
          success: (res) => {
            setEmail("");
            return typeof res === "object" && res !== null && "message" in res
              ? (res as { message: string }).message
              : "Subscription successful!";
          },
          error: (err) =>
            err instanceof Error
              ? err.message
              : "Subscription failed. Please try again.",
        }
      );
    } catch {
      // toast.promise already handles errors
    }
  };

  return (
    <section
      className="px-4 sm:px-16 pt-10 flex flex-col items-center gap-8 relative"
      data-aos="fade-up"
    >
      <div className="bg-[#FFFFFF] w-full max-w-[1440px] p-5 flex flex-wrap justify-between gap-8 rounded-lg relative">

        {/* Logo for small screens */}
        <div className="block sm:hidden" data-aos="fade-up" data-aos-delay="100">
          <Image
            src="/images/headerLogo.svg"
            width={120}
            height={120}
            alt="Future You logo"
            className="object-contain"
          />
        </div>

        {/* Newsletter block */}
        <div className="block lg:w-[40%] w-full" data-aos="fade-right">
          <h1 className="text-[#293C97] font-semibold text-2xl sm:text-3xl">
            Newsletter
          </h1>
          <p className="text-[14px] mb-3 mt-3">
            Get practical insights, transformation stories, expert advice, and updates on coaching,
            consulting, and growth capital delivered straight to your inbox.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubscribe();
            }}
            className="flex justify-between items-center border border-[#293C97] rounded-lg p-2 w-full"
          >
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none px-4 py-2 text-sm text-[#0E0E1D]"
            />
            <Button
              type="submit"
              label="Subscribe"
              bgcolor="bg-[#293C97] text-white"
              className="py-2 px-4 text-[13px] font-semibold"
            />
          </form>
        </div>

        {/* Logo for larger screens */}
        <div className="hidden sm:block relative w-32 h-12" data-aos="fade-up" data-aos-delay="200">
          <Image
            src="/images/headerLogo.svg"
            alt="Future You logo"
            fill
            className="object-contain"
          />
        </div>

        {/* Explore links */}
        <div className="text-[13px] font-semibold w-[45%] sm:w-auto" data-aos="fade-up" data-aos-delay="300">
          <ul>
            <li className="mb-4 text-[#1B1819] font-normal"><a href="#">Explore</a></li>
            <li><a href="/aboutus">About Future You</a></li>
            <li><a href="/coaching">Coaching & Mentorship</a></li>
            <li><a href="/learning-hub">Learning Hub</a></li>
            <li><a href="/start-journey">Apply for Support</a></li>
            <li><a href="/co-working">Co-Working Space</a></li>
            <li><a href="/join-our-team">Join Our Team</a></li>
          </ul>
        </div>

        {/* Help links */}
        <div className="text-[13px] font-semibold w-[40%] sm:w-auto" data-aos="fade-up" data-aos-delay="400">
          <ul className="text-[#0E0E1D]">
            <li className="mb-4 text-[#1B1819] font-normal"><a href="#">Help & Legal</a></li>
            <li><a href="#">FAQs</a></li>
            <li><Link href="/contact-us" className="hover:text-[#293C97] transition-colors duration-300">Contact Us</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-[#293C97] transition-colors duration-300">Terms and Conditions</Link></li>
            <li>
              <button onClick={() => setShowPrivacy(true)} className="hover:text-[#293C97] transition-colors duration-300">
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Contact + Call button */}
        <div className="text-[13px] w-full sm:w-auto" data-aos="fade-left" data-aos-delay="500">
          <a href="tel:08169159291">
            <Button
              label="Request a Call"
              bgcolor="bg-[#0E0E1D]"
              color="text-white"
              className="py-3 px-5 mb-4 text-sm"
            />
          </a>
          <ul className="font-semibold">
            <li><a href="tel:08169159291">08169159291</a></li>
            <li><a href="mailto:futureyoulimited@gmail.com" target="_blank">futureyoulimited@gmail.com</a></li>
          </ul>
          <h1 className="font-bold">Business Hours:</h1>
          <p><span className="font-bold">Monday:</span> Friday: 9:00 AM – 6:00 PM</p>
          <p><span className="font-bold">Saturday:</span> 10:00 AM – 2:00 PM</p>
        </div>

        {/* Social icons & address */}
        <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-5 sm:gap-0 text-[14px] mt-4" data-aos="zoom-in" data-aos-delay="600">
          <div className="flex gap-5">
            <a href="https://www.instagram.com/futureyoulimited" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition" aria-label="Visit FutureYou on Instagram"><FaInstagram className="w-6 h-6" /></a>
            <a href="https://www.linkedin.com/company/futureyou-limited/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition" aria-label="Visit FutureYou on LinkedIn"><FaLinkedin className="w-6 h-6" /></a>
            <a href="https://www.tiktok.com/@futureyoulimited" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition" aria-label="Visit FutureYou on TikTok"><FaTiktok className="w-6 h-6" /></a>
            <a href="https://www.facebook.com/share/16oRt3oVEa/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition" aria-label="Visit FutureYou on Facebook"><FaFacebook className="w-6 h-6" /></a>
          </div>

          <div id="address" className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-10">
            <p className="text-[#0E0E1D]">Blk F3 Suite 256 Eastline HFP Complex, Lekki-Epe Expressway, Lagos.</p>
          </div>
        </div>
      </div>

      {/* Bottom message */}
      <div className="text-start w-full max-w-[1440px] flex flex-col gap-4">
        <h1 className="text-[#fff] font-semibold text-[1.3rem] sm:text-2xl leading-none">
          Helping individuals and businesses <br /> become who they were meant to be
        </h1>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-row sm:flex-row justify-between text-white w-full text-[13px]">
        <p className="text-[#fff]">2025 Future You. All rights reserved.</p>
        <p className="text-end">
          <button onClick={() => setShowPrivacy(true)} className="hover:underline">
            Privacy
          </button>
        </p>
      </div>

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative">
            <button onClick={() => setShowPrivacy(false)} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">✕</button>
            <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              FutureYou values your privacy. We collect limited personal and usage information to provide and improve our services. Your data is never sold and is protected with appropriate security measures. By using our services, you agree to our data practices.
              <br /><br />
              <Link
                href="/privacypolicy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                onClick={() => setShowPrivacy(false)}
              >
                Read Full Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Footer;
