"use client";

import Image from "next/image";
import Link from "next/link";

const StartJourneyNow = () => {
  return (
    <section
      className="w-full max-w-screen-xl mx-auto sm:px-10 lg:px-16"
      data-aos="fade-up"
    >
      <div className="relative w-full rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[340px] flex items-center">

        {/* Background image — desktop */}
        <div className="hidden sm:block absolute inset-0">
          <Image
            src="/images/journeyBackground.webp"
            alt="Journey background"
            fill
            className="object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Background image — mobile */}
        <div className="block sm:hidden absolute inset-0">
          <Image
            src="/images/startJourney.webp"
            alt="Journey background"
            fill
            className="object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-14 right-20 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />

        {/* Content */}
        <div
          className="relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 px-2 sm:px-12 lg:px-16 py-10 sm:py-14"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Left: text */}
          <div className="flex flex-col gap-4 max-w-xl">

            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 inline-block" />
              Start today
            </div>

            <h2 className="font-lato font-extrabold text-[1.7rem] sm:text-[2.2rem] lg:text-[2.6rem] text-white leading-[1.1] tracking-tight">
              Your Future Starts{" "}
              <span className="text-blue-300">with One Decision.</span>
               
            </h2>

            <p className="font-montserrat text-sm sm:text-base text-white/75 leading-relaxed max-w-lg">
              Whether you're pursuing personal growth, building a business, or seeking your next 
              opportunity, Future You is here to guide you every step of the way.
            </p>

            {/* Trust signals */}
            {/* <div className="flex flex-wrap items-center gap-4 mt-1">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xs">★★★★★</span>
                <span className="text-white/60 text-xs">500+ lives transformed</span>
              </div>
            </div> */}
          </div>

          {/* Right: CTAs */}
          <div
            className="flex flex-col gap-3 w-full sm:w-auto"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <Link
              href="/startjourney"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#293C97] text-sm font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg whitespace-nowrap"
            >
              Start your journey
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartJourneyNow;