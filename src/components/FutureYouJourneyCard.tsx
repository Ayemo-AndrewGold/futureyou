"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import { FutureYouJourneyCards } from "@/constants";

interface JourneyCard {
  id: number;
  title: string;
  text: string;
  img: string | StaticImageData;
}

const FutureYouJourneyCard: React.FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    AOS.refresh(); // tell AOS to re-scan the DOM and pick up dynamically rendered elements
  }, []);

  // Track which card is currently in view, same pattern as the
  // original FutureYouJourneyCard — used to fade/highlight the active step.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.6,
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {FutureYouJourneyCards.map(({ id, title, text, img }: JourneyCard, index) => {
        const isEven = index % 2 === 0;
        const stepLabel = String(id).padStart(2, "0");
        const isActive = activeIndex === index;

        return (
          <div
            key={id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`flex flex-col md:flex-row gap-10 xl:gap-20 items-center py-14 ${
              !isEven ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`w-full md:w-[48%] transition-opacity duration-700 ${
                isActive ? "opacity-100" : "opacity-40"
              }`}
              data-aos={isEven ? "fade-right" : "fade-left"}
              data-aos-duration="800"
              data-aos-delay="100"
              data-aos-once="true"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                <Image
                  src={img}
                  alt={title}
                  width={640}
                  height={420}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div
                  className={`absolute top-4 left-4 w-9 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-md transition-colors duration-500 ${
                    isActive ? "bg-[#293C97]" : "bg-[#293C97]/60"
                  }`}
                >
                  {id}
                </div>
              </div>
            </div>

            {/* Text */}
            <div
              className="w-full md:w-[48%] flex flex-col gap-4"
              data-aos={isEven ? "fade-left" : "fade-right"}
              data-aos-duration="800"
              data-aos-delay="200"
              data-aos-once="true"
            >
              <span
                className={`text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
                  isActive ? "text-[#293C97]" : "text-[#293C97]/50"
                }`}
              >
                Step {stepLabel}
              </span>

              <h3 className="font-lato font-extrabold text-[1.5rem] sm:text-[1.8rem] text-[#0E0E1D] leading-tight tracking-tight">
                {title}
              </h3>

              <span className="block w-10 h-[3px] bg-[#293C97] rounded-full" />

              <p className="font-montserrat text-base text-[#555] leading-relaxed">
                {text}
              </p>

              <Link
                href="/startjourney"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#293C97] mt-2 group w-fit"
              >
                Explore Paths
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FutureYouJourneyCard;