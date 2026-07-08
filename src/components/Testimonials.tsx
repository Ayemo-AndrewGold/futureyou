"use client";

import About from "./About";

const Testimonials = () => {
  return (
    <section
      className="w-full max-w-screen-xl mx-auto px-3 sm:px-10 lg:px-16 pt-3 pb-10 sm:1 sm:pt-20 overflow-hidden"
      // data-aos="fade-up"
    >
      {/* Header */}
      <div
        className="flex flex-col items-center text-center mb-13"
        // data-aos="fade-up"
        // data-aos-delay="100"
      >
        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
          Why Future You
        </div>

        <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-[#0E0E1D] leading-[1.1] tracking-tight mb-4">
          Transformation You Can See.{" "} <br></br>
          <span className="text-[#293C97]">Results You Can Trust.</span>
        </h2>

        <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed max-w-2xl">
          We help individuals and businesses move from potential to progress through expert 
          coaching, strategic consulting, and growth capital.
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