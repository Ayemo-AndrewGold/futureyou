"use client";

import { useState } from "react";

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire this up to your actual newsletter endpoint / provider.
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div
      className="relative w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20"
      data-aos="fade-up"
    >
      <div className="relative overflow-hidden bg-[#293C97] rounded-3xl px-6 sm:px-12 lg:px-20 py-14 sm:py-16 flex flex-col items-center text-center gap-6">
        {/* Decorative accent blobs, matches homepage Hero treatment */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
          Stay in the loop
        </div>

        <h2 className="relative font-lato font-extrabold text-[1.8rem] sm:text-[2.3rem] text-white leading-tight tracking-tight max-w-lg">
          Get new articles before anyone else does.
        </h2>

        <p className="relative font-montserrat text-sm sm:text-base text-white/75 max-w-md leading-relaxed">
          One email, once a week. Strategies, stories, and resources for
          people building their next chapter.
        </p>

        {submitted ? (
          <div className="relative flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-semibold px-5 py-3 rounded-lg">
            ✓ You're subscribed — check your inbox to confirm.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col sm:flex-row items-center gap-3 w-full max-w-md pt-1"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full flex-1 text-sm font-montserrat text-[#0E0E1D] placeholder:text-[#a0a0ab] bg-white rounded-full px-5 py-3.5 outline-none focus:ring-2 focus:ring-white/50 transition-shadow"
            />
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 bg-white text-[#293C97] text-sm font-bold px-6 py-3.5 rounded-full hover:bg-[#EEF0FA] transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;