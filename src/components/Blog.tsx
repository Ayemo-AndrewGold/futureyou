import React from "react";
import Link from "next/link";
import BlogCard from "./BlogCard";
import { getPosts } from "@/lib/api";

export const dynamic = 'force-dynamic';

const Blog = async () => {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 3); // homepage teaser: only the 3 most recent

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
          <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
            Blog &amp; insights
          </div>

          <h2 className="font-lato font-extrabold text-[1.9rem] sm:text-[2.4rem] lg:text-[2.8rem] text-[#0E0E1D] leading-[1.1] tracking-tight mb-3 max-w-xl">
            Insights That{" "}
            <span className="text-[#293C97]">Inspire Growth.</span>
             
          </h2>

          <p className="font-montserrat text-base text-[#555] leading-relaxed max-w-lg">
            Discover practical advice, expert perspectives, and inspiring stories to help you grow 
            personally, professionally, and in business.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap shadow-sm shadow-[#293C97]/20"
          >
            Explore All Articles
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div data-aos="fade-up" data-aos-delay="200">
        {latestPosts.length > 0 ? (
          <BlogCard posts={latestPosts} />
        ) : (
          <p className="text-sm text-[#888]">No posts published yet.</p>
        )}
      </div>
    </section>
  );
};

export default Blog;