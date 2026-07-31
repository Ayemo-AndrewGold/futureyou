'use client';

import { useState } from 'react';
import { postComment, reactToPost } from '@/lib/api';
import { Comment } from '@/lib/types';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const EMOJIS = ['❤️', '👏', '🔥', '💡', '😢'] as const;

const EMPTY_FORM = { author_name: '', author_email: '', content: '' };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type SubmitState = 'idle' | 'loading' | 'success' | 'error';

interface FieldErrors {
  author_name?: string;
  author_email?: string;
  content?: string;
  non_field?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse DRF field-level validation errors that look like:
 *   { "author_name": ["This field is required."], "content": ["..."] }
 * Returns a map of fieldName → first error message.
 */
function parseFieldErrors(message: string): FieldErrors {
  // If the error string contains " · " it came from parseDRFError() in api.ts
  // and encodes multiple field errors separated by that delimiter.
  const parts = message.split(' · ');
  const errors: FieldErrors = {};

  for (const part of parts) {
    if (part.startsWith('author_name:')) {
      errors.author_name = part.replace('author_name:', '').trim();
    } else if (part.startsWith('author_email:')) {
      errors.author_email = part.replace('author_email:', '').trim();
    } else if (part.startsWith('content:')) {
      errors.content = part.replace('content:', '').trim();
    } else {
      // non_field_errors or a plain detail message
      errors.non_field = part.trim();
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
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
  // Reactions
  const [reactionCounts, setReactionCounts] = useState(initialReactionCounts);
  const [userReaction, setUserReaction] = useState(initialUserReaction);
  const [reactingEmoji, setReactingEmoji] = useState<string | null>(null);

  // Comments list — starts with server-rendered approved comments
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // Form state
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // -------------------------------------------------------------------------
  // Reaction handler
  // -------------------------------------------------------------------------
  const handleReact = async (emoji: string) => {
    if (userReaction === emoji || reactingEmoji) return;
    setReactingEmoji(emoji);
    try {
      await reactToPost(slug, emoji);
      setReactionCounts((prev) => {
        const next = { ...prev };
        if (userReaction) next[userReaction] = Math.max(0, (next[userReaction] ?? 1) - 1);
        next[emoji] = (next[emoji] ?? 0) + 1;
        return next;
      });
      setUserReaction(emoji);
    } catch (err) {
      console.error('[reaction]', err);
    } finally {
      setReactingEmoji(null);
    }
  };

  // -------------------------------------------------------------------------
  // Comment submit handler
  // -------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setSubmitState('loading');

    try {
      await postComment(slug, form);
      setSubmitState('success');
      setForm(EMPTY_FORM);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setFieldErrors(parseFieldErrors(message));
      setSubmitState('error');
    }
  };

  const handleFieldChange = (
    field: keyof typeof EMPTY_FORM,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear that field's error as the user types
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const isSubmitting = submitState === 'loading';

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="space-y-8">

      {/* ── Reactions ── */}
      <section
        aria-label="Article reactions"
        className="rounded-[1.5rem] border border-gray-100 bg-[#FAFBFF] p-4 shadow-sm sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#293C97]">
              How did this article feel?
            </p>
            <p className="text-sm text-[#6b7280]">
              Choose a reaction to let the author know.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Reaction buttons">
            {EMOJIS.map((emoji) => {
              const isActive = userReaction === emoji;
              const isSpinning = reactingEmoji === emoji;
              return (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleReact(emoji)}
                  disabled={!!reactingEmoji}
                  aria-pressed={isActive}
                  aria-label={`React with ${emoji}`}
                  className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200
                    disabled:cursor-not-allowed disabled:opacity-70
                    ${isActive
                      ? 'border-[#293C97] bg-[#293C97] text-white shadow-sm'
                      : 'border-gray-200 bg-white text-[#333] hover:border-[#293C97] hover:text-[#293C97]'
                    }`}
                >
                  <span className={`text-base ${isSpinning ? 'animate-bounce' : ''}`}>
                    {emoji}
                  </span>
                  <span>{reactionCounts[emoji] ?? 0}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Comments ── */}
      <section
        aria-label="Comments"
        className="rounded-[1.5rem] border border-gray-100 bg-white p-4 shadow-sm sm:p-6"
      >
        <div className="mb-5">
          <h2 className="font-lato text-xl font-bold text-[#0E0E1D]">
            Comments ({comments.length})
          </h2>
          <p className="text-sm text-[#6b7280]">
            Join the conversation and share your perspective.
          </p>
        </div>

        {/* Comment list */}
        <div className="mb-6 flex flex-col gap-3" role="list" aria-label="Approved comments">
          {comments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-[#FAFBFF] p-4 text-sm text-[#888]">
              No comments yet. Be the first to share your thoughts.
            </div>
          ) : (
            comments.map((c) => (
              <article
                key={c.id}
                role="listitem"
                className="rounded-2xl border border-gray-100 bg-[#FCFCFF] p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF0FA] text-sm font-semibold text-[#293C97]"
                  >
                    {c.author_name.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-sm font-semibold text-[#0E0E1D]">
                    {c.author_name}
                  </p>
                </div>
                <p className="text-sm leading-7 text-[#666]">{c.content}</p>
              </article>
            ))
          )}
        </div>

        {/* ── Comment form ── */}
        <div className="rounded-[1.25rem] border border-gray-100 bg-[#FAFBFF] px-3 py-4 sm:p-5">
          <h3 className="mb-4 font-lato text-lg font-semibold text-[#0E0E1D]">
            Leave a comment
          </h3>

          {submitState === 'success' ? (
            /* ── Success state ── */
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col gap-3 rounded-2xl border border-green-200 bg-green-50 p-5"
            >
              <div className="flex items-center gap-2 text-green-700">
                <svg
                  className="w-5 h-5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-semibold">Comment submitted!</p>
              </div>
              <p className="text-sm text-green-700 leading-relaxed">
                Thanks for joining the conversation. Your comment is awaiting
                moderation and will appear once approved by our team.
              </p>
              <button
                type="button"
                onClick={() => setSubmitState('idle')}
                className="w-fit text-sm font-semibold text-green-700 underline underline-offset-2 hover:text-green-900 transition-colors"
              >
                Post another comment
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Comment form"
              className="grid gap-3 md:grid-cols-2"
            >
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="comment-name"
                  className="text-[11px] font-semibold uppercase tracking-wider text-[#888]"
                >
                  Your name <span aria-hidden="true" className="text-red-400">*</span>
                </label>
                <input
                  id="comment-name"
                  type="text"
                  placeholder="e.g. Chioma Okafor"
                  required
                  maxLength={100}
                  value={form.author_name}
                  onChange={(e) => handleFieldChange('author_name', e.target.value)}
                  disabled={isSubmitting}
                  aria-invalid={!!fieldErrors.author_name}
                  aria-describedby={fieldErrors.author_name ? 'err-name' : undefined}
                  className={`rounded-xl border bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition
                    focus:ring-2 focus:ring-[#293C97]/10 disabled:opacity-60
                    ${fieldErrors.author_name
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-gray-200 focus:border-[#293C97]'
                    }`}
                />
                {fieldErrors.author_name && (
                  <p id="err-name" role="alert" className="text-xs text-red-600">
                    {fieldErrors.author_name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="comment-email"
                  className="text-[11px] font-semibold uppercase tracking-wider text-[#888]"
                >
                  Your email <span aria-hidden="true" className="text-red-400">*</span>
                </label>
                <input
                  id="comment-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={form.author_email}
                  onChange={(e) => handleFieldChange('author_email', e.target.value)}
                  disabled={isSubmitting}
                  aria-invalid={!!fieldErrors.author_email}
                  aria-describedby={fieldErrors.author_email ? 'err-email' : undefined}
                  className={`rounded-xl border bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition
                    focus:ring-2 focus:ring-[#293C97]/10 disabled:opacity-60
                    ${fieldErrors.author_email
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-gray-200 focus:border-[#293C97]'
                    }`}
                />
                {fieldErrors.author_email && (
                  <p id="err-email" role="alert" className="text-xs text-red-600">
                    {fieldErrors.author_email}
                  </p>
                )}
              </div>

              {/* Comment content */}
              <div className="md:col-span-2 flex flex-col gap-1">
                <label
                  htmlFor="comment-content"
                  className="text-[11px] font-semibold uppercase tracking-wider text-[#888]"
                >
                  Comment <span aria-hidden="true" className="text-red-400">*</span>
                </label>
                <textarea
                  id="comment-content"
                  placeholder="Write your comment…"
                  required
                  minLength={3}
                  rows={4}
                  value={form.content}
                  onChange={(e) => handleFieldChange('content', e.target.value)}
                  disabled={isSubmitting}
                  aria-invalid={!!fieldErrors.content}
                  aria-describedby={fieldErrors.content ? 'err-content' : undefined}
                  className={`rounded-xl border bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition resize-none
                    focus:ring-2 focus:ring-[#293C97]/10 disabled:opacity-60
                    ${fieldErrors.content
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-gray-200 focus:border-[#293C97]'
                    }`}
                />
                {fieldErrors.content && (
                  <p id="err-content" role="alert" className="text-xs text-red-600">
                    {fieldErrors.content}
                  </p>
                )}
              </div>

              {/* Non-field / network error */}
              {fieldErrors.non_field && (
                <p
                  role="alert"
                  aria-live="assertive"
                  className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {fieldErrors.non_field}
                </p>
              )}

              {/* Submit */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#293C97] px-6 py-2.5 text-sm font-semibold text-white transition
                    hover:bg-[#1f2f79] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#293C97]
                    disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                      </svg>
                      Posting…
                    </>
                  ) : (
                    'Post Comment'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
