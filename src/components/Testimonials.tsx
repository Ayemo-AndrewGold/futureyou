"use client";

import About from "./About";

const Testimonials = () => {
  return (
    <section
      className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-20"
      data-aos="fade-up"
    >
      {/* Header */}
      <div
        className="flex flex-col items-center text-center mb-14"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
          Our story
        </div>

        <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-[#0E0E1D] leading-[1.1] tracking-tight mb-4">
          Why People Trust{" "}
          <span className="text-[#293C97]">FutureYou</span>
        </h2>

        <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed max-w-2xl">
          This isn't motivation it's transformation. Real people, real
          results, real change.
        </p>
      </div>

      {/* Content */}
      <div data-aos="fade-up" data-aos-delay="150">
        <About />
      </div>
    </section>
  );
};

export default Testimonials;