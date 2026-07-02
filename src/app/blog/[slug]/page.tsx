import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPost, formatDate } from '@/lib/api';
import PostInteractions from './PostInteractions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Slug = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const approvedComments = post.comments.filter((c) => c.is_approved);

  return (
    <>
      <Header />
      <article className="max-w-3xl mx-auto px-4 py-24">
        {/* <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            unoptimized={post.cover_image.includes('127.0.0.1')}
            className="object-cover"
          />
        </div> */}
        {post.category && (
          <span className="inline-block text-[11px] font-semibold text-[#293C97] bg-[#eef0fb] px-3 py-1 rounded-full mb-4">
            {post.category.name}
          </span>
        )}

        <h1 className="font-lato font-bold text-3xl text-[#0E0E1D] mb-3">{post.title}</h1>

        <div className="flex items-center gap-3 text-sm text-[#888] mb-8">
          {post.author_image && (
            <Image
              src={post.author_image}
              alt={post.author_name}
              width={36}
              height={36}
              unoptimized={post.author_image.includes('127.0.0.1')}
              className="rounded-full object-cover w-9 h-9"
            />
          )}
          <span className="font-medium text-[#333]">{post.author_name}</span>
          <span>•</span>
          <span>{formatDate(post.published_at)}</span>
          <span>•</span>
          <span>{post.view_count} views</span>
        </div>

        <div
          className="prose max-w-none font-montserrat text-[#333] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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