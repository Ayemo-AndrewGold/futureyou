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
    <div className="mt-12 border-t border-gray-100 pt-8">
      {/* Reactions */}
      <div className="flex gap-3 mb-10">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleReact(emoji)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm transition-colors ${
              userReaction === emoji
                ? 'bg-[#293C97] text-white border-[#293C97]'
                : 'bg-white text-[#333] border-gray-200 hover:border-[#293C97]'
            }`}
          >
            <span>{emoji}</span>
            <span>{reactionCounts[emoji] || 0}</span>
          </button>
        ))}
      </div>

      {/* Comments list */}
      <h2 className="font-lato font-bold text-xl mb-4">Comments ({comments.length})</h2>
      <div className="flex flex-col gap-4 mb-10">
        {comments.length === 0 && (
          <p className="text-sm text-[#888]">No comments yet. Be the first to share your thoughts.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="border border-gray-100 rounded-xl p-4">
            <p className="font-semibold text-sm text-[#0E0E1D]">{c.author_name}</p>
            <p className="text-sm text-[#666] mt-1">{c.content}</p>
          </div>
        ))}
      </div>

      {/* Comment form */}
      <h2 className="font-lato font-bold text-xl mb-4">Leave a comment</h2>
      {submitted ? (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl p-4">
          Thanks! Your comment is awaiting moderation and will appear once approved.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
          <input
            type="text"
            placeholder="Your name"
            required
            maxLength={100}
            value={form.author_name}
            onChange={(e) => setForm({ ...form, author_name: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="email"
            placeholder="Your email (not shown publicly)"
            required
            value={form.author_email}
            onChange={(e) => setForm({ ...form, author_email: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Your comment"
            required
            minLength={3}
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="self-start bg-[#293C97] text-white text-sm font-semibold px-5 py-2 rounded-lg disabled:opacity-50"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}
    </div>
  );
}