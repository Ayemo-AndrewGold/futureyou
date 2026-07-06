import React from "react";
import Footer from "@/components/Footer";
import Nav from "@/components/Header";
import Image from "next/image";
import { getPosts } from "@/lib/api";
import Header from "@/components/Header";
import BlogExplorer from "@/components/BlogExplorer";
import NewsletterSignup from "@/components/NewsletterSignup";

const Blog = async () => {
  const allPosts = await getPosts();
  const posts = allPosts.filter((post) => post.published_at !== null);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative w-full overflow-hidden" data-aos="fade-up" >
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/future.jpeg"
            alt="Blog hero background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,_rgba(3,7,18,0.82)_0%,_rgba(3,7,18,0.62)_100%,_rgba(41,60,151,0.45)_100%)]" />
        </div>

        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-start gap-6 px-6 pb-12 pt-28 sm:px-10 sm:pb-16 sm:pt-36 lg:px-16 lg:pb-20">
          <div
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm"
            data-aos="fade-up"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#293C97]" />
            Insights &amp; Resources
          </div>

          <div className="grid w-full items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1
                className="max-w-3xl font-lato text-[2.2rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[3rem] lg:text-[3.6rem]"
                data-aos="fade-up"
                data-aos-delay="50"
              >
                Stories and strategies for your next{" "}
                <span className="text-[#293C97]"> chapter.</span>
              </h1>

              <p
                className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Real guidance on growth, business, and personal transformation
                from the FutureYou team{posts.length > 0 && (
                  <> {posts.length} article{posts.length === 1 ? "" : "s"} and counting.</>
                )}
              </p>
            </div>

            <div
              className="rounded-[1.5rem] hidden sm:flex border border-white/20 bg-white/10 p-5 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.35)] backdrop-blur-md sm:p-6"
              data-aos="fade-up"
              data-aos-delay="140"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">What you’ll find</p>
              <div className="mt-4 space-y-3 text-sm text-slate-100">
                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                  <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#7dd3fc]" />
                  <span>Practical insight for growth, leadership, and personal evolution.</span>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                  <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#7dd3fc]" />
                  <span>Clear, thoughtful stories that make complex ideas feel simple.</span>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                  <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#7dd3fc]" />
                  <span>Fresh perspectives to help you move forward with confidence.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explorer: search, filters, featured, grid */}
      <section className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 mt-5 pb-20 flex flex-col gap-10">
        <BlogExplorer posts={posts as any} />
      </section>

      {/* Newsletter CTA */}
      <NewsletterSignup />

      {/* Footer */}
      <div className="relative w-full min-h-[420px] overflow-hidden">
        <Image src="/images/footer.webp" alt="Footer background" fill className="object-cover" />
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Blog;