"use client";

import { useRef, useEffect, useState } from "react";
import { coachCards } from "../constants";
import MeetCoach from "./MeetCoach";

const NeedToGrow = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = coachCards.length;

  const scrollRight = () => {
    if (!scrollRef.current) return;
    const next = activeIndex >= total - 1 ? 0 : activeIndex + 1;
    scrollRef.current.scrollTo({
      left: next === 0 ? 0 : scrollRef.current.offsetWidth * next,
      behavior: next === 0 ? "auto" : "smooth",
    });
    setActiveIndex(next);
  };

  const scrollLeft = () => {
    if (!scrollRef.current || activeIndex === 0) return;
    scrollRef.current.scrollBy({
      left: -scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
    setActiveIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(scrollRight, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="w-full mb-16 sm:mb-28">

      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-sm font-semibold text-[#293C97] uppercase tracking-widest mb-2">
           About Future You
          </p>
          <h2 className="font-lato font-bold text-3xl sm:text-4xl text-[#0E0E1D] leading-tight max-w-lg">
            Helping You Become the Future <br className="hidden sm:block" /> Version of Yourself.
          </h2>
        </div>

        {/* Arrows — desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={scrollLeft}
            aria-label="Previous"
            disabled={activeIndex === 0}
            className="w-10 h-10 hidden sm:flex rounded-full border border-gray-300 flex items-center justify-center text-[#0E0E1D] hover:border-[#293C97] hover:text-[#293C97] disabled:opacity-30 transition-all duration-200"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            aria-label="Next"
            className="w-10 hidden sm:flex h-10 rounded-full bg-[#293C97] flex items-center justify-center text-white hover:bg-[#1e2e7a] transition-all duration-200"
          >
            →
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory pb-4"
      >
        <MeetCoach />
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {coachCards.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              scrollRef.current?.scrollTo({
                left: scrollRef.current.offsetWidth * i,
                behavior: "smooth",
              });
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === activeIndex
                ? "w-6 h-[6px] bg-[#293C97]"
                : "w-[6px] h-[6px] bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Arrows — mobile */}
      <div className="hidden sm:flex justify-center gap-4 mt-5">
        <button
          onClick={scrollLeft}
          aria-label="Previous"
          disabled={activeIndex === 0}
          
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-[#0E0E1D] disabled:opacity-30 transition-all"
        >
          ←
        </button>
        <button
          onClick={scrollRight}
          aria-label="Next"
          className="w-10 h-10 rounded-full bg-[#293C97] flex items-center justify-center text-white transition-all"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default NeedToGrow;