"use client";

import FutureYouJourneyCard from "./FutureYouJourneyCard";

const FutureYouJourney = () => {
  return (
    <section
      className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 sm:py-24 overflow-hidden"
      data-aos="fade-up"
      aria-labelledby="future-you-journey-heading"
    >
      {/* Header */}
      <div className="mb-14" data-aos="fade-up" data-aos-delay="100">

        {/* Eyebrow pill — matches site design language */}
        <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
          How it Works
        </div>

        <h2
          id="future-you-journey-heading"
          className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-[#0E0E1D] leading-[1.1] tracking-tight mb-4"
        >
          Five Simple Steps to Your{" "}
          <span className="text-[#293C97]">Future You</span>
         
        </h2>

        <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed max-w-2xl">
          We make transformation simple. From your first conversation to achieving your goals, 
          our step-by-step approach provides the guidance, strategy, and support you need to succeed.
        </p>
      </div>

      {/* Cards */}
      <div data-aos="fade-up" data-aos-delay="150">
        <FutureYouJourneyCard />
      </div>
    </section>
  );
};

export default FutureYouJourney;