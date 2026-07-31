"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/api";

type State = "idle" | "loading" | "success" | "error";

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setState("loading");
    setMessage("");

    try {
      const res = await subscribeToNewsletter({ email: trimmed });
      setMessage(res.message || "You're subscribed!");
      setState("success");
      setEmail("");
    } catch (err: unknown) {
      setMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setState("error");
    }
  };

  return (
    <div
      className="relative w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20"
      data-aos="fade-up"
    >
      <div className="relative overflow-hidden bg-[#293C97] rounded-3xl px-6 sm:px-12 lg:px-20 py-14 sm:py-16 flex flex-col items-center text-center gap-6">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
          Stay in the loop
        </div>

        <h2 className="relative font-lato font-extrabold text-[1.8rem] sm:text-[2.3rem] text-white leading-tight tracking-tight max-w-lg">
          Get new articles before anyone else does.
        </h2>

        <p className="relative font-montserrat text-sm sm:text-base text-white/75 max-w-md leading-relaxed">
          One email, once a week. Strategies, stories, and resources for people
          building their next chapter.
        </p>

        {state === "success" ? (
          <div className="relative flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-semibold px-5 py-3 rounded-lg">
            ✓ {message}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-md pt-1"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") { setState("idle"); setMessage(""); }
              }}
              placeholder="you@example.com"
              disabled={state === "loading"}
              aria-label="Email address"
              className="w-full flex-1 text-sm font-montserrat text-[#0E0E1D] placeholder:text-[#a0a0ab] bg-white rounded-full px-5 py-3.5 outline-none focus:ring-2 focus:ring-white/50 transition-shadow disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full sm:w-auto shrink-0 bg-white text-[#293C97] text-sm font-bold px-6 py-3.5 rounded-full hover:bg-[#EEF0FA] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Subscribing…
                </span>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        )}

        {/* Inline error — sits below the form row */}
        {state === "error" && message && (
          <p className="relative text-sm text-red-300 font-medium -mt-2">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;
