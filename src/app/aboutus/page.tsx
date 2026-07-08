"use client";

import Link from "next/link";
import Image from "next/image";
import AboutUsCard from "@/components/AboutUsCard";
import AboutUsHelpTransform from "@/components/AboutUsHelpTransform";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Header from "@/components/Header";

const AboutUsPage = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Header />

      <main className="w-full max-w-screen-xl mx-auto pt-22 pb-16 px-2 sm:px-10 lg:px-16">

        {/* ── Intro ── */}
        <section
          className="flex flex-col gap-6 mb-5"
          data-aos="fade-up"
        >

          <h1 className="font-lato font-extrabold text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] text-[#0E0E1D] leading-[1.08] tracking-tight max-w-3xl">
            Helping You Become the{" "}
         
            <span className="text-[#293C97]">Future Version of Yourself.</span>
          </h1>

          <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed max-w-2xl">
            At Future You, we empower individuals and businesses through coaching, strategic consulting, 
            and growth capital providing the guidance, resources, and support needed to achieve lasting transformation.
          </p>
        </section>

        {/* ── About Us Video ── */}
        <About />

        

        {/* ── Why We Exist ── */}
        <section
          id="why-we-exist"
          className=" mt-10"
          data-aos="fade-up"
        >
          {/* Eyebrow */}
          {/* <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
            Future You
          </div> */}

          <h2 className="font-lato text-center font-extrabold text-[2rem] sm:text-[2.6rem] text-[#0E0E1D] leading-tight tracking-tight mb-5">
           
          </h2>
          <h2 className="font-lato font-extrabold text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] mb-7 text-[#0E0E1D] leading-[1.08] tracking-tight max-w-3xl">
            Our{" "}
         
            <span className="text-[#293C97]">Purpose</span>
          </h2>

          {/* Stats/cards strip */}
          <div className="bg-[#293C97] sm:rounded-2xl rounded-[5px] p-2 sm:p-6 sm:p-8 overflow-x-auto">
            <AboutUsCard />
          </div>
        </section>

        {/* ── How We Help ── */}
        <section
          className="mb-20 mt-16"
          data-aos="fade-up"
        >

          <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] text-[#0E0E1D] leading-tight tracking-tight mb-1">
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