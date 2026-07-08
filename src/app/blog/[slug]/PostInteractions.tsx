'use client';

import { useState } from 'react';
import { postComment, reactToPost } from '@/lib/api';
import { Comment } from '@/lib/types';

const EMOJIS = ['❤️', '👏', '🔥', '💡', '😢'];

export default function PostInteractions({
  slug,
  initialReactionCounts,
  initialUserReaction,
  initialComments,
}: {
  slug: string;
  initialReactionCounts: Record<string, number>;
  initialUserReaction: string | null;
  initialComments: Comment[];
}) {
  const [reactionCounts, setReactionCounts] = useState(initialReactionCounts);
  const [userReaction, setUserReaction] = useState(initialUserReaction);
  const [comments] = useState(initialComments);

  const [form, setForm] = useState({ author_name: '', author_email: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleReact = async (emoji: string) => {
    if (userReaction === emoji) return; // already reacted with this one
    try {
      await reactToPost(slug, emoji);
      setReactionCounts((prev) => {
        const next = { ...prev };
        if (userReaction) next[userReaction] = Math.max(0, (next[userReaction] || 1) - 1);
        next[emoji] = (next[emoji] || 0) + 1;
        return next;
      });
      setUserReaction(emoji);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await postComment(slug, form);
      setSubmitted(true);
      setForm({ author_name: '', author_email: '', content: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" space-y-8 ">
      <section className="rounded-[1.5rem] border border-gray-100 bg-[#FAFBFF] p-2 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#293C97]">How did this article feel?</p>
            <p className="text-sm text-[#6b7280]">Choose a reaction to let the author know.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReact(emoji)}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all ${
                  userReaction === emoji
                    ? 'border-[#293C97] bg-[#293C97] text-white shadow-sm'
                    : 'border-gray-200 bg-white text-[#333] hover:border-[#293C97] hover:text-[#293C97]'
                }`}
              >
                <span className="text-base">{emoji}</span>
                <span>{reactionCounts[emoji] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-gray-100 bg-white p-2 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-lato text-xl font-bold text-[#0E0E1D]">Comments ({comments.length})</h2>
            <p className="text-sm text-[#6b7280]">Join the conversation and share your perspective.</p>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3">
          {comments.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-[#FAFBFF] p-4 text-sm text-[#888]">
              No comments yet. Be the first to share your thoughts.
            </div>
          )}
          {comments.map((c) => (
            <div key={c.id} className="rounded-2xl border border-gray-100 bg-[#FCFCFF] p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF0FA] text-sm font-semibold text-[#293C97]">
                  {c.author_name.charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold text-sm text-[#0E0E1D]">{c.author_name}</p>
              </div>
              <p className="text-sm leading-7 text-[#666]">{c.content}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[1.25rem] border border-gray-100 bg-[#FAFBFF] sm:py-4 sm:px-4 px-1 sm:p-5">
          <h3 className="mb-4 font-lato text-lg mt-1 font-semibold text-[#0E0E1D]">Leave a comment</h3>
          {submitted ? (
            <p className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              Thanks! Your comment is awaiting moderation and will appear once approved.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your name"
                required
                maxLength={100}
                value={form.author_name}
                onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                className="rounded-xl border border-gray-200 bg-white px-2 py-2.5 text-sm text-[#111827] outline-none transition focus:border-[#293C97] focus:ring-2 focus:ring-[#293C97]/10"
              />
              <input
                type="email"
                placeholder="Your email"
                required
                value={form.author_email}
                onChange={(e) => setForm({ ...form, author_email: e.target.value })}
                className="rounded-xl border border-gray-200 bg-white px-2 py-2.5 text-sm text-[#111827] outline-none transition focus:border-[#293C97] focus:ring-2 focus:ring-[#293C97]/10"
              />
              <textarea
                placeholder="Write your comment"
                required
                minLength={3}
                rows={4}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="md:col-span-2 rounded-xl border border-gray-200 bg-white px-2 py-2.5 text-sm text-[#111827] outline-none transition focus:border-[#293C97] focus:ring-2 focus:ring-[#293C97]/10"
              />
              {error && <p className="md:col-span-2 text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="md:col-span-2 inline-flex w-fit items-center justify-center rounded-full bg-[#293C97] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f2f79] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}