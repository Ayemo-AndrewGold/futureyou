'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Nav from '@/components/Header';
import { getPosts } from '@/lib/api';
import { formatDate } from '@/lib/api';

const Blog = async () => {
  const posts = await getPosts();

  return (
    <>
      <Nav />
      <section
        className="w-full max-w-[90rem] mx-auto px-1 sm:px-3 py-20 mt-10 sm:mt-20 flex flex-col gap-10"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 will-change-transform"
              data-aos="fade-up"
            >
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    unoptimized={post.cover_image.includes('127.0.0.1')}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                />

                {post.category && (
                  <span className="absolute top-3 left-3 text-[11px] font-semibold text-[#293C97] bg-white/90 backdrop-blur-sm border border-[#c7cef0] px-3 py-1 rounded-full">
                    {post.category.name}
                  </span>
                )}

                <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-[#293C97] flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  ↗
                </div>
              </div>

              <div className="flex flex-col gap-3 p-5 flex-1">
                <h3 className="font-lato font-bold text-[0.95rem] text-[#0E0E1D] leading-snug">
                  {post.title}
                </h3>

                <p className="font-montserrat text-sm text-[#666] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <p className="text-xs text-[#888]">{formatDate(post.published_at)}</p>

                <span className="self-start text-[#293C97] font-semibold text-sm group-hover:underline">
                  Read More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

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