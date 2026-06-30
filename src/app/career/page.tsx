"use client";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineUserGroup,
  HiOutlineTrendingUp,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineArrowRight,
  HiOutlineBriefcase,
  HiOutlineLightBulb,
} from "react-icons/hi";

const benefits = [
  { icon: HiOutlineUserGroup, text: "A supportive and innovative team" },
  { icon: HiOutlineTrendingUp, text: "Growth opportunities" },
  { icon: HiOutlineClock, text: "Flexible work environment" },
  { icon: HiOutlineCurrencyDollar, text: "Competitive compensation" },
  { icon: HiOutlineLightBulb, text: "Continuous learning & development" },
  { icon: HiOutlineBriefcase, text: "Meaningful, purpose-driven work" },
];

const openings = [
  { role: "Office Assistant / Admin Officer", status: "closed" },
  { role: "Sales / Marketing Officer", status: "closed" },
];

const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScMMw8B4IJqfUzxHYnfBo_xdnaE9yohsMYuJmqdLSu95guC3g/viewform";

const Career = () => {
  const isOpen = false; // 👈 flip to true when applications reopen

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <Nav />

      {/* ── Hero header ── */}
      <section className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-6">
        <div
          className="max-w-2xl mx-auto text-center mb-14"
          data-aos="fade-up"
        >
          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5 border ${
              isOpen
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-[#EEF0FA] border-[#c7cef0] text-[#293C97]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full inline-block ${
                isOpen ? "bg-green-500 animate-pulse" : "bg-[#293C97]"
              }`}
            />
            {isOpen ? "Now hiring" : "Applications closed"}
          </div>

          <h1 className="font-lato font-extrabold text-3xl sm:text-4xl lg:text-[2.8rem] text-[#0E0E1D] leading-tight tracking-tight mb-4">
            Join the{" "}
            <span className="text-[#293C97]">FutureYou Team</span>
          </h1>

          <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed">
            Great companies are built by great people. As we grow, we're
            looking for passionate, talented individuals who want to make an
            impact whether you're experienced or just getting started.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Image column ── */}
          <div
            className="relative w-full h-72 sm:h-96 lg:h-[620px] rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            data-aos="fade-right"
          >
            <Image
              src="/images/futureyouCareerImg.webp"
              alt="FutureYou team at work"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />

            {/* Overlay badge */}
            <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl px-4 py-3 shadow-md">
              <p className="text-[10px] font-bold text-[#293C97] uppercase tracking-widest mb-0.5">
                Our culture
              </p>
              <p className="text-sm font-bold text-[#0E0E1D] leading-tight">
                Purpose-driven &amp; people-first
              </p>
            </div>
          </div>

          {/* ── Details column ── */}
          <div
            className="flex flex-col gap-10"
            data-aos="fade-left"
            data-aos-delay="100"
          >

            {/* What you'll gain */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#293C97] mb-5">
                What you'll gain
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 bg-[#F9F9FC] border border-gray-100 rounded-xl p-4 hover:border-[#293C97]/20 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#EEF0FA] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#293C97]" />
                    </div>
                    <p className="text-sm text-[#454545] font-medium pt-1.5 leading-snug">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Available openings */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#293C97] mb-5">
                Available openings
              </p>
              <div className="flex flex-col gap-3">
                {openings.map(({ role, status }) => (
                  <div
                    key={role}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-[#293C97]/30 transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EEF0FA] flex items-center justify-center shrink-0">
                        <HiOutlineBriefcase className="w-4 h-4 text-[#293C97]" />
                      </div>
                      <span className="text-sm font-semibold text-[#0E0E1D]">
                        {role}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        status === "open"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {status === "open" ? "Open" : "Closed"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply card */}
            <div className="relative bg-[#293C97] rounded-2xl p-7 sm:p-8 overflow-hidden">
              {/* Decorative blobs */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#c5cae9] mb-2">
                    {isOpen ? "Apply now" : "Stay tuned"}
                  </p>
                  <h2 className="font-lato font-extrabold text-xl text-white leading-snug">
                    {isOpen
                      ? "Ready to join us?"
                      : "Applications are currently closed"}
                  </h2>
                  <p className="text-sm text-[#c5cae9] leading-relaxed mt-2">
                    {isOpen
                      ? "Fill out the application form and our HR team will get back to you shortly."
                      : "We're not hiring right now, but great things are coming. Check back soon or follow us on social media for updates."}
                  </p>
                </div>

                {isOpen ? (
                  <Link
                    href={APPLICATION_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#293C97] text-sm font-bold px-6 py-3.5 rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto"
                  >
                    Apply now
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <span className="inline-flex items-center justify-center gap-2 bg-white/10 text-white/70 text-sm font-semibold px-6 py-3.5 rounded-lg border border-white/20 cursor-not-allowed w-full sm:w-auto">
                      Applications closed
                    </span>
                    <Link
                      href="/#community"
                      className="inline-flex items-center justify-center gap-2 text-white border border-white/30 hover:bg-white/10 text-sm font-semibold px-6 py-3.5 rounded-lg transition-all duration-200 w-full sm:w-auto"
                    >
                      Join our community
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

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

export default Career;