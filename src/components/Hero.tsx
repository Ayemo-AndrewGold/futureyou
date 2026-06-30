import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f6ff] via-white to-white -z-10" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#293C97]/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-24 xl:py-0 flex flex-col xl:flex-row items-center gap-12 xl:gap-8">

        {/* ── Text column ── */}
        <div
          className="order-2 xl:order-1 w-full xl:w-1/2 flex flex-col items-start gap-6"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          {/* Eyebrow pill */}
          <div className="flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
            Loan &amp; Business Coaching
          </div>

          {/* Headline */}
          <div>
            <h1 className="font-lato font-extrabold text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem] text-[#0E0E1D] leading-[1.08] tracking-tight">
              See Who You
            </h1>
            <h1 className="font-lato font-extrabold text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem] leading-[1.08] tracking-tight">
              Can{" "}
              <span className="text-[#293C97]">Become.</span>
            </h1>
          </div>

          {/* Body */}
          <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed max-w-[480px]">
            You don't have to stay stuck in who you are. Unlock your next
            chapter, transform your life or business, and step into the
            empowered, fulfilled, future ready version of you.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <Link
              href="/startjourney"
              aria-label="Start your journey with FutureYou"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold px-6 py-3.5 rounded-lg transition-all duration-200 whitespace-nowrap shadow-sm shadow-[#293C97]/30"
            >
              Start your journey
              <span className="text-base">→</span>
            </Link>
            <Link
              href="/startjourney"
              aria-label="Apply for Business Support"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#293C97] text-sm font-semibold px-6 py-3.5 rounded-lg border-[1.5px] border-[#293C97] transition-all duration-200 whitespace-nowrap"
            >
              Apply for Loan
            </Link>
          </div>

          {/* Social proof stats */}
          <div className="flex items-center gap-6 pt-2">
            {[
              { value: "500+", label: "Lives transformed" },
              { value: "98%", label: "Client satisfaction" },
              { value: "10+ yrs", label: "Experience" },
            ].map((stat, i, arr) => (
              <div key={stat.label} className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="font-lato font-bold text-xl text-[#0E0E1D]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#888] mt-0.5">{stat.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px h-8 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Image column ── */}
        <div
          className="order-1 xl:order-2 w-full xl:w-1/2 flex justify-center items-center sm:mt-20 xl:mt-0 relative"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          {/* Floating badge — top right */}
          <div className="absolute top-2 sm:top-8 right-[-15px] sm:right-4 sm:right-8 xl:-right-2 z-10 bg-[#293C97] text-white rounded-xl px-4 py-3 shadow-lg">
            <p className="text-xs font-bold leading-none">New session</p>
            <p className="text-[11px] text-[#c5cae9] mt-0.5">Available now</p>
          </div>

          {/* Floating badge — bottom left */}
          <div className="absolute bottom-3 sm:bottom-4 left-[-20px] sm:left-8 xl:-left-4 z-10 bg-white border border-gray-100 rounded-xl px-1 sm:px-3 sm:py-1 py-1 sm:py-4 flex items-center gap-3 shadow-md">
            <div className="w-9 h-9 rounded-full bg-[#EEF0FA] flex items-center justify-center shrink-0">
              <span className="text-base">⭐</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#0E0E1D] leading-none">Top rated coach</p>
              <p className="text-[11px] text-[#888] mt-0.5">★★★★★ 5.0</p>
            </div>
          </div>

             {/* Hero video */}
      <video
        src="/videos/herovid.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full max-w-[460px] sm:max-w-[560px] xl:max-w-[640px] h-auto object-contain relative z-0 rounded-2xl"
        style={{ filter: "none" }}
        onLoadedMetadata={(e) => {
          // ✅ Slow the video to 75% of normal speed
          (e.target as HTMLVideoElement).playbackRate = 0.75;
        }}
      />                 
       </div>

      </div>
    </section>
  );
};

export default Hero;