"use client";

import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import AboutUsCard from "@/components/AboutUsCard";
import AboutUsHelpTransform from "@/components/AboutUsHelpTransform";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import About from "@/components/About";

const AboutUsPage = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Nav />

      <main className="w-full max-w-screen-xl mx-auto pt-28 pb-16 px-6 sm:px-10 lg:px-16">

        {/* ── Intro ── */}
        <section
          className="flex flex-col gap-6 mb-16"
          data-aos="fade-up"
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
            About FutureYou
          </div>

          <h1 className="font-lato font-extrabold text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] text-[#0E0E1D] leading-[1.08] tracking-tight max-w-3xl">
            Helping You Become the Person{" "}
            <span className="text-[#293C97]">You Were Meant to Be.</span>
          </h1>

          <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed max-w-2xl">
            We guide everyday people through real transformation — from stuck
            to stable, from broken to bold, from lost to led.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/start-journey"
              aria-label="Start your journey"
              className="inline-flex items-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold px-6 py-3.5 rounded-lg transition-all duration-200 shadow-sm shadow-[#293C97]/20"
            >
              Start your journey <span>→</span>
            </Link>
            <Link
              href="#why-we-exist"
              className="inline-flex items-center gap-2 text-[#293C97] border-[1.5px] border-[#293C97] hover:bg-[#293C97] hover:text-white text-sm font-semibold px-6 py-3.5 rounded-lg transition-all duration-200"
            >
              Learn more
            </Link>
          </div>
        </section>

        {/* ── Hero image ── */}
        <section
          className="w-full mb-20 rounded-2xl overflow-hidden"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <Image
            src="/images/aboutusImage.webp"
            alt="FutureYou — About Us"
            width={1280}
            height={600}
            className="w-full h-auto object-cover rounded-2xl"
            priority
          />
        </section>

        {/* ── Why We Exist ── */}
        <section
          id="why-we-exist"
          className="mb-20"
          data-aos="fade-up"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
            Our mission
          </div>

          <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] text-[#0E0E1D] leading-tight tracking-tight mb-5">
            Why We Exist
          </h2>

          <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed max-w-3xl mb-10">
            Future You was created to fill a gap — for the people who were
            trying to change, grow, or rebuild their lives but didn't know how.
            Too many people are walking through life wounded, directionless, or
            unsupported. We built Future You to change that — by giving you the
            right tools, community, and coaching to move forward.
          </p>

          {/* Stats/cards strip */}
          <div className="bg-[#293C97] rounded-2xl p-6 sm:p-8 overflow-x-auto">
            <AboutUsCard />
          </div>
        </section>

        {/* ── Why People Trust FutureYou (video section) ── */}
        <section
          className="mb-20"
          data-aos="fade-up"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
            Our story
          </div>

          <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-[#0E0E1D] leading-[1.1] tracking-tight mb-4">
            Why People Trust{" "}
            <span className="text-[#293C97]">FutureYou</span>
          </h2>

          <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed max-w-2xl mb-10">
            This isn't motivation — it's transformation. Real people, real
            results, real change.
          </p>

          <About />
        </section>

        {/* ── How We Help ── */}
        <section
          className="mb-20"
          data-aos="fade-up"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
            How it works
          </div>

          <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] text-[#0E0E1D] leading-tight tracking-tight mb-8">
            How We Help You{" "}
            <span className="text-[#293C97]">Transform</span>
          </h2>

          <AboutUsHelpTransform />
        </section>

        {/* ── Community ── */}
        <section data-aos="fade-up">
          <Community />
        </section>

      </main>

      {/* ── Footer ── */}
      <div className="relative w-full min-h-[420px] overflow-hidden">
        <Image
          src="/images/footer.webp"
          alt="Footer background"
          fill
          className="object-cover object-top pointer-events-none select-none"
          loading="lazy"
        />
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;