"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/api";

export interface BlogCategory {
  name: string;
  slug?: string;
}

export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string;
  published_at: string;
  category?: BlogCategory;
}

interface BlogExplorerProps {
  posts: BlogPost[];
}

const ALL_CATEGORY = "All";
const POSTS_PER_PAGE = 9; // matches the 3-column grid — 3 full rows per page

const BlogExplorer: React.FC<BlogExplorerProps> = ({ posts }) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const names = posts
      .map((p) => p.category?.name)
      .filter((name): name is string => Boolean(name));
    return [ALL_CATEGORY, ...Array.from(new Set(names))];
  }, [posts]);

  const isFiltering = query.trim().length > 0 || activeCategory !== ALL_CATEGORY;

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === ALL_CATEGORY || post.category?.name === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [posts, query, activeCategory]);

  // Featured article only makes sense as the "default" view — once someone
  // is searching or filtering, pin their results instead of a fixed pick.
  const featured = !isFiltering ? posts[0] : null;
  const gridPosts = !isFiltering ? filteredPosts.slice(1) : filteredPosts;

  const totalPages = Math.max(1, Math.ceil(gridPosts.length / POSTS_PER_PAGE));

  // Whenever the search term or category changes, the underlying result set
  // changes shape — jump back to page 1 so nobody lands on an empty page.
  useEffect(() => {
    setCurrentPage(1);
  }, [query, activeCategory]);

  // If posts shrink (e.g. category change) and current page no longer exists, clamp it.
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return gridPosts.slice(start, start + POSTS_PER_PAGE);
  }, [gridPosts, currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    // Scroll the grid back into view so the new page doesn't render off-screen
    document.getElementById("blog-grid-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Search */}
      <div className="w-full max-w-xl mx-auto sm:mx-0" data-aos="fade-up" data-aos-delay="100">
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-5 py-3.5 shadow-sm transition-all duration-200 focus-within:border-[#293C97] focus-within:ring-2 focus-within:ring-[#293C97]/15">
          <svg
            className="w-[18px] h-[18px] text-[#888] shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, strategies..."
            className="flex-1 text-sm font-montserrat text-[#0E0E1D] placeholder:text-[#a0a0ab] outline-none bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="text-[#aaa] hover:text-[#293C97] transition-colors text-sm shrink-0"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category pills */}
      {categories.length > 1 && (
        <div
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                  isActive
                    ? "bg-[#293C97] text-white border-[#293C97] shadow-sm shadow-[#293C97]/25"
                    : "bg-white text-[#3a3a4a] border-gray-200 hover:border-[#293C97] hover:text-[#293C97]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Featured article */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-[#293C97]/10 transition-all duration-500"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="relative w-full h-64 sm:h-80 lg:h-full min-h-[280px] overflow-hidden order-1">
            <Image
              src={featured.cover_image}
              alt={featured.title}
              fill
              unoptimized={featured.cover_image.includes("127.0.0.1")}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent lg:bg-gradient-to-r" />
            {featured.category && (
              <span className="absolute top-5 left-5 text-[11px] font-semibold text-[#293C97] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {featured.category.name}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12 order-2">
            <div className="flex items-center gap-2.5">
              <span className="block w-8 h-[3px] bg-[#293C97] rounded-full" />
              <span className="text-xs font-bold text-[#293C97] uppercase tracking-widest">
                Featured Read
              </span>
            </div>

            <h2 className="font-lato font-extrabold text-[1.6rem] sm:text-[2rem] text-[#0E0E1D] leading-tight tracking-tight">
              {featured.title}
            </h2>

            <p className="font-montserrat text-base text-[#555] leading-relaxed line-clamp-3">
              {featured.excerpt}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-[#888]">{formatDate(featured.published_at)}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#293C97]">
                Read the story
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Latest articles */}
      <div className="flex flex-col gap-8">
        <div id="blog-grid-top" className="flex items-center gap-2.5 scroll-mt-24" data-aos="fade-up">
          <span className="block w-8 h-[3px] bg-[#293C97] rounded-full" />
          <h3 className="font-lato font-extrabold text-lg sm:text-xl text-[#0E0E1D] tracking-tight">
            {isFiltering ? "Search results" : "Latest Articles"}
          </h3>
          {isFiltering && (
            <span className="text-sm text-[#888] font-montserrat">
              ({filteredPosts.length})
            </span>
          )}
        </div>

        {gridPosts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center text-center gap-3 py-20 bg-[#F7F8FC] rounded-2xl border border-dashed border-gray-200"
            data-aos="fade-up"
          >
            <span className="text-3xl">🔍</span>
            <p className="font-lato font-bold text-[#0E0E1D]">No articles match that search</p>
            <p className="font-montserrat text-sm text-[#888] max-w-xs">
              Try a different keyword or clear the filter to see everything we've published.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory(ALL_CATEGORY);
              }}
              className="mt-2 text-sm font-semibold text-[#293C97] border-[1.5px] border-[#293C97] px-5 py-2 rounded-lg hover:bg-[#293C97] hover:text-white transition-all duration-200"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#c7cef0] hover:shadow-xl hover:shadow-[#293C97]/8 hover:-translate-y-1.5 transition-all duration-300 will-change-transform"
                  data-aos="fade-up"
                  data-aos-delay={Math.min(index * 60, 240)}
                >
                  <div className="relative w-full h-52 overflow-hidden">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      unoptimized={post.cover_image.includes("127.0.0.1")}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />

                    {post.category && (
                      <span className="absolute top-3 left-3 text-[11px] font-semibold text-[#293C97] bg-white/90 backdrop-blur-sm border border-[#c7cef0] px-3 py-1 rounded-full">
                        {post.category.name}
                      </span>
                    )}

                    <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-[#293C97] flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300">
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

                    <div className="flex items-center justify-between mt-auto pt-1">
                      <p className="text-xs text-[#888]">{formatDate(post.published_at)}</p>
                      <span className="inline-flex items-center gap-1 text-[#293C97] font-semibold text-sm">
                        Read
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Builds a page-number list with ellipses, e.g. 1 ... 4 5 6 ... 12
function getPageList(current: number, total: number): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  const window = 1; // how many pages to show on each side of current

  const start = Math.max(2, current - window);
  const end = Math.min(total - 1, current + window);

  pages.push(1);
  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("ellipsis");
  if (total > 1) pages.push(total);

  return pages;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageList = getPageList(currentPage, totalPages);

  return (
    <nav
      aria-label="Blog pagination"
      className="flex items-center justify-center gap-1.5 sm:gap-2 pt-4"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#0E0E1D] hover:border-[#293C97] hover:text-[#293C97] disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-[#0E0E1D] disabled:cursor-not-allowed transition-all duration-200"
      >
        ←
      </button>

      {pageList.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#888] text-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full text-sm font-semibold transition-all duration-200 ${
              page === currentPage
                ? "bg-[#293C97] text-white shadow-sm shadow-[#293C97]/25"
                : "text-[#3a3a4a] hover:bg-[#293C97]/10 hover:text-[#293C97]"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#0E0E1D] hover:border-[#293C97] hover:text-[#293C97] disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-[#0E0E1D] disabled:cursor-not-allowed transition-all duration-200"
      >
        →
      </button>
    </nav>
  );
};

export default BlogExplorer;