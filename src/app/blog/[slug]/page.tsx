import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPost, formatDate } from "@/lib/api";
import PostInteractions from "./PostInteractions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ShareBar from "@/components/ShareBar";
import { FaChevronLeft } from 'react-icons/fa'


// Rough estimate from the HTML content — strips tags, counts words,
// assumes ~200wpm. Good enough for "X min read", not meant to be exact.
const estimateReadTime = (html: string) => {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const Slug = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const approvedComments = post.comments.filter((c) => c.is_approved);
  const readTime = estimateReadTime(post.content);

  return (
    <>
      
      <Header />
      <article className="max-w-[48rem] mx-auto sm:px-6 px-2 py-20 sm:py-28">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[#888] hover:text-[#293C97] transition-colors duration-200 mb-5"
        >
          <span className="text-base leading-none"><FaChevronLeft /></span>
          Back to Blog
        </Link>

        {/* Title */}
        <h1 className="font-lato font-extrabold text-[1.9rem] sm:text-[2.5rem] text-[#0E0E1D] leading-[1.15] tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-7">
          <div className="flex items-center gap-3 text-sm text-[#888]">
            {post.author_image && (
              <Image
                src={post.author_image}
                alt={post.author_name}
                width={38}
                height={38}
                unoptimized={post.author_image.includes("127.0.0.1")}
                className="rounded-full object-cover w-[38px] h-[38px] border border-gray-100"
              />
            )}
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-[#333]">{post.author_name}</span>
              <span className="text-xs text-[#999]">
                {formatDate(post.published_at)}
              </span>
            </div>
          </div>

          <div className="ml-auto scale-75 origin-right sm:scale-100">
            <ShareBar title={post.title} slug={post.slug} />
          </div>
        </div>

        {/* Cover image */}
        {post.cover_image && (
          <div className="relative w-full h-64 sm:h-[26rem] rounded-sm overflow-hidden mb-10 shadow-sm">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              unoptimized={post.cover_image.includes("127.0.0.1")}
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 42rem"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-neutral sm:prose-lg max-w-none font-montserrat text-[#333] leading-[1.85]
            prose-headings:font-lato prose-headings:font-bold prose-headings:text-[#0E0E1D] prose-headings:tracking-tight
            prose-h2:text-[1.5rem] prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-[1.2rem] prose-h3:mt-9 prose-h3:mb-3
            prose-p:my-5
            prose-a:text-[#293C97] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#0E0E1D]
            prose-blockquote:border-l-[3px] prose-blockquote:border-[#293C97] prose-blockquote:not-italic
            prose-blockquote:text-[#333] prose-blockquote:font-medium prose-blockquote:bg-[#F7F8FC]
            prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
            prose-img:rounded-2xl prose-img:border prose-img:border-gray-100
            prose-code:text-[#293C97] prose-code:bg-[#EEF0FA] prose-code:px-1.5 prose-code:py-0.5
            prose-code:rounded prose-code:font-mono prose-code:text-[0.85em] prose-code:before:content-none prose-code:after:content-none
            prose-hr:border-gray-200
            prose-li:my-1.5"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* View count, quietly, after the read rather than competing with the meta row */}
        {/* <p className="text-xs text-[#aaa] mt-10">{(post.view_count ?? 0).toLocaleString()} views</p> */}

        <div className="h-px bg-gray-100 mb-5" />

        <PostInteractions
          slug={post.slug}
          initialReactionCounts={post.reaction_counts}
          initialUserReaction={post.user_reaction}
          initialComments={approvedComments}
        />
      </article>

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
    </>
  );
};

export default Slug;