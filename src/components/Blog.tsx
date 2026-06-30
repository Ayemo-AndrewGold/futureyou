import Link from "next/link";
import BlogCard from "./BlogCard";

const Blog = () => {
  return (
    <section
      className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16"
      data-aos="fade-up"
    >
      {/* Header row */}
      <div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div>
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
            Blog &amp; insights
          </div>

          <h2 className="font-lato font-extrabold text-[1.9rem] sm:text-[2.4rem] lg:text-[2.8rem] text-[#0E0E1D] leading-[1.1] tracking-tight mb-3 max-w-xl">
            Insights, Stories &amp; Tools to{" "}
            <span className="text-[#293C97]">Fuel Your Growth</span>
          </h2>

          <p className="font-montserrat text-base text-[#555] leading-relaxed max-w-lg">
            From personal breakthroughs to business funding wins real
            stories, expert advice, and inspiration.
          </p>
        </div>

        {/* CTA top-right on desktop */}
        <div className="shrink-0">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap shadow-sm shadow-[#293C97]/20"
          >
            See more stories
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div data-aos="fade-up" data-aos-delay="200">
        <BlogCard />
      </div>
    </section>
  );
};

export default Blog;