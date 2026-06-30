"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TestimonialCards } from "@/constants";

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = TestimonialCards.length;

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (totalSlides === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  if (totalSlides === 0) return null;

  const testimonial = TestimonialCards[currentIndex];

  return (
    <section className="w-full relative flex justify-center items-center px-2 sm:px-8">
      {/* Left Arrow (Desktop) */}
      <Image
        src="/images/leftButton.webp"
        alt="Previous testimonial"
        width={40}
        height={40}
        onClick={handlePrev}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10 select-none"
      />

      {/* Animated Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full max-w-2xl md:p-10 flex flex-col md:flex-row items-stretch gap-6 sm:px-10 bg-[#FCFCFC] rounded-xl shadow-lg"
        >
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
            {/* Desktop Image */}
            <Image
              src={testimonial.img}
              alt={testimonial.name}
              width={200}
              height={200}
              className="hidden md:block object-cover rounded-full shadow-md"
            />

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-4">
              <Image
                src={testimonial.img2}
                alt={`${testimonial.name} mobile`}
                width={64}
                height={64}
                className="object-cover rounded-full shadow"
              />
              <div>
                <h3 className="text-base font-semibold text-[#0E0E1D]">
                  {testimonial.name}
                </h3>
                <h4 className="text-sm text-[#0E0E1D] opacity-80">
                  {testimonial.title}
                </h4>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-2/3 flex flex-col justify-center text-center md:text-left">
            <div className="hidden md:block mb-2">
              <h3 className="text-lg font-semibold text-[#0E0E1D]">
                {testimonial.name}
              </h3>
              <h4 className="text-sm text-[#0E0E1D] opacity-70">
                {testimonial.title}
              </h4>
            </div>

            <p className="text-sm sm:text-base text-[#0E0E1D] leading-relaxed mt-2">
              {testimonial.text}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Right Arrow (Desktop) */}
      <Image
        src="/images/rightButton.webp"
        alt="Next testimonial"
        width={40}
        height={40}
        onClick={handleNext}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10 select-none"
      />
    </section>
  );
};

export default TestimonialSlider;
