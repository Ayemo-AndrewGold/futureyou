import Image from "next/image";
import Link from "next/link";
import CommunityCard from "./CommunityCard";

const Community = () => {
  return (
    <section
      className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-25"
      data-aos="fade-up"
    >
      {/* Header */}
      <div className="mb-12" data-aos="fade-up" data-aos-delay="100">

        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
          Our community
        </div>

        <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-[#0E0E1D] leading-[1.1] tracking-tight mb-4">
          Grow Together.{" "}
          <span className="text-[#293C97]">Succeed Together.</span>
        </h2>

        <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed max-w-2xl">
          At Future You, transformation is more than a personal journey, it's a shared experience. 
          Our community brings together individuals, entrepreneurs, professionals, and leaders who 
          are committed to learning, growing, and helping one another succeed.
        </p>
      </div>

      {/* Content grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        {/* Image column */}
        <div
          className="relative min-h-[300px] md:min-h-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <Image
            src="/images/communityImage.webp"
            alt="People collaborating in a supportive community"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Floating badge */}
          <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg">
            <div className="w-9 h-9 rounded-lg bg-[#EEF0FA] flex items-center justify-center shrink-0">
              <span className="text-base">❤️</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#0E0E1D] leading-none">Active & growing</p>
              <p className="text-[11px] text-[#888] mt-0.5">New members weekly</p>
            </div>
          </div>
        </div>

        {/* Card + stats column */}
        <div
          className="flex flex-col gap-6"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <CommunityCard />
        </div>
      </div>

      {/* CTA */}
      {/* <div
        className="flex justify-center mt-12"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        <Link
          href="/start-journey"
          aria-label="Start your transformation journey"
          className="inline-flex items-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-sm shadow-[#293C97]/20"
        >
          Start your journey
          <span>→</span>
        </Link>
      </div> */}
    </section>
  );
};

export default Community;