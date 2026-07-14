"use client";

import Image from "next/image";
import Link from "next/link";

const features = ["Fast Wi-Fi", "Private desks", "Meeting rooms", "Community events"];

const WorkSpace = () => {
  return (
    <section
      className="w-full max-w-screen-xl mx-auto pt-8 lg:px-1 mb-10 sm:mb-20 overflow-hidden"
      aria-label="Co-working space section"
      // data-aos="fade-up"
    >
      <div className="flex flex-col xl:flex-row rounded-xl overflow-hidden border border-gray-100 shadow-sm min-h-[480px]">

        {/* ── Text column ── */}
        <div
          className="flex-1 flex flex-col justify-center gap-6 py-4 px-4 sm:p-12 bg-white"
          data-aos="fade-right"
          // data-aos-delay="100"
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
            Co-working space
          </div>

          {/* Heading */}
          <div>
            <h2 className="font-lato font-extrabold text-[1.9rem] sm:text-[2.4rem] text-[#0E0E1D] leading-[1.1] tracking-tight mb-4">
              Work. Connect. Grow.{" "}
              <span className="text-[#293C97]">At FutureYou Space.</span>
            </h2>
            <p className="font-montserrat text-base text-[#555] leading-relaxed max-w-md">
              Need a space to focus, build, or collaborate? Our co-working hub
              is designed for entrepreneurs, freelancers, and change makers who
              are ready to evolve.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {features.map((f) => (
              <span
                key={f}
                className="text-xs font-semibold text-[#293C97] bg-[#EEF0FA] border border-[#c7cef0] px-3 py-1.5 rounded-full"
              >
                {f}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/co-working"
              aria-label="Book a co-working space"
              className="inline-flex items-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-sm shadow-[#293C97]/20"
            >
              Book a space
              <span>→</span>
            </Link>
            <Link
              href="/co-working#tour"
              aria-label="Take a virtual tour"
              className="inline-flex items-center gap-2 text-[#293C97] border-[1.5px] border-[#293C97] hover:bg-[#293C97] hover:text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200"
            >
              Take a tour
            </Link>
          </div>
        </div>

        {/* ── Image column ── */}
        <div
          className="relative flex-1 min-h-[300px] xl:min-h-0"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <Image
            src="https://res.cloudinary.com/yaovkmpi/image/upload/v1784037526/workSpace_mj221e.webp"      // 👈 your actual workspace image
            alt="FutureYou co-working space interior"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 50vw"
            loading="lazy"
          />

          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Floating stat card */}
          <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-lg bg-[#EEF0FA] flex items-center justify-center shrink-0">
              <span className="text-lg">👥</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#0E0E1D] leading-none">200+ members</p>
              <p className="text-[11px] text-[#888] mt-0.5">Active community</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WorkSpace;