'use client';

import { useState, useEffect, useCallback } from 'react';
import { subscribeToNewsletter } from '@/lib/api';
import toast from "react-hot-toast";

const STORAGE_KEYS = {
  SUBSCRIBED: 'mb_newsletter_subscribed',
} as const;

const SHOW_DELAY_MS = 7000; // pops up 7s after arriving on the site

function hasSubscribed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.SUBSCRIBED) === 'true';
  } catch {
    return false;
  }
}

export default function NewsletterPopup() {
  const [shouldRender, setShouldRender] = useState(false); // mounted in DOM
  const [isVisible, setIsVisible] = useState(false);       // slide-in animation state
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Decide, on mount, whether this visitor should ever see the popup at all.
  useEffect(() => {
    if (hasSubscribed()) return;

    const timer = setTimeout(() => {
      setShouldRender(true);
      // small extra tick so the mount + the transition class don't collide
      requestAnimationFrame(() => setIsVisible(true));
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = useCallback(() => {
    setIsVisible(false);
    // wait for the exit transition before unmounting
    setTimeout(() => setShouldRender(false), 300);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await subscribeToNewsletter({ email });
      toast.success(res.message);
      setEmail('');
      try {
        localStorage.setItem(STORAGE_KEYS.SUBSCRIBED, 'true');
      } catch {
        // ignore storage failures — subscription itself still succeeded
      }
      // auto-close a couple seconds after a successful subscribe
      setTimeout(() => closePopup(), 2500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div
        onClick={() => closePopup()}
        aria-hidden="true"
        className="absolute inset-0 bg-[#080b1f]/60 backdrop-blur-sm"
      />

      {/* Card */}
      <div
        role="dialog"
        aria-label="Newsletter subscription"
        className={`relative w-full max-w-[400px] rounded-[28px] p-6 sm:p-7 overflow-hidden
          border border-white/[0.08] shadow-[0_24px_70px_-12px_rgba(10,15,60,0.55)]
          transition-all duration-300 ease-out
          ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-3'}`}
        style={{
          background:
            'linear-gradient(155deg, #2c3fa0 0%, #1f2c78 55%, #161f5c 100%)',
        }}
      >
        {/* Soft organic texture layer — replaces flat color fill */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.16] pointer-events-none"
          viewBox="0 0 400 460"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="40" cy="30" r="150" fill="#7C8BFF" />
          <circle cx="380" cy="90" r="110" fill="#FBBF24" />
          <circle cx="360" cy="420" r="170" fill="#4C5FD6" />
        </svg>
        {/* subtle top glass highlight */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

        {/* Close button */}
        <button
          onClick={() => closePopup()}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/[0.1] transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Badge */}
        <div className="relative inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] text-white text-[0.68rem] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-4">
          <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          Newsletter
        </div>

        {/* Heading */}
        <h2 className="relative text-[1.3rem] font-extrabold text-white leading-snug mb-2 pr-4">
          Grow With Future You.
        </h2>

        <p className="relative text-white/55 text-[0.85rem] leading-relaxed mb-5">
          Get expert insights, inspiring stories, and exclusive updates on coaching, consulting, and growth capital, straight to your inbox.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); setSuccess(''); }}
            placeholder="Enter your email address"
            className="w-full h-11 px-3.5 rounded-xl bg-white/[0.07] border border-white/[0.12] text-white placeholder:text-white/30 text-[0.85rem] focus:outline-none focus:border-yellow-400/50 focus:bg-white/[0.10] transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-11 px-5 bg-yellow-400 text-[#071a0f] font-bold text-[0.85rem] rounded-xl hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(251,191,36,0.35)]"
          >
            {loading ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>

        {/* Success message */}
        {success && (
          <div className="relative flex items-center gap-2 mt-3 text-green-400 text-[0.8rem]">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {success}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="relative flex items-center gap-2 mt-3 text-red-400 text-[0.8rem]">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {/* Privacy note */}
        <p className="relative text-white/25 text-[0.7rem] mt-3">
          No spam. Just valuable insights, practical resources, and opportunities to help you become your future self.
        </p>
      </div>
    </div>
  );
}