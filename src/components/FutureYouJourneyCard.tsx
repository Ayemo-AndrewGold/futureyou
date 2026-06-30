"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { FutureYouJourneyCards } from "@/constants";

interface JourneyCard {
  id: number;
  title: string;
  text: string;
  img: string | StaticImageData;
}

const FutureYouJourneyCard: React.FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleCards((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting) {
              next.add(index);     // card entered → show image
            } else {
              next.delete(index);  // card left → hide image again
            }
            return next;
          });
        },
        { threshold: 0.35 }       // triggers when 35% of card is visible
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {FutureYouJourneyCards.map(({ id, title, text, img }: JourneyCard, index) => {
        const isEven = index % 2 === 0;
        const isVisible = visibleCards.has(index);
        const stepLabel = String(id).padStart(2, "0");

        return (
          <div
            key={id}
            ref={(el) => { cardRefs.current[index] = el; }}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className={`flex flex-col md:flex-row gap-10 xl:gap-20 items-center py-14 ${
              !isEven ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image — animates in when card enters viewport */}
            <div className="w-full md:w-[48%]">
              <div
                className={`relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 group transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"       // fully visible
                    : "opacity-0 translate-y-8 scale-[0.97]"      // hidden + slightly down + scaled
                }`}
              >
                <Image
                  src={img}
                  alt={title}
                  width={640}
                  height={420}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Step number badge on image */}
                <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#293C97] text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {id}
                </div>
              </div>
            </div>

            {/* Text */}
            <div
              className={`w-full md:w-[48%] flex flex-col gap-4 transition-all duration-700 ease-out delay-150 ${
                isVisible
                  ? "opacity-100 translate-y-0"     // text fades in slightly after image
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="text-xs font-bold text-[#293C97] uppercase tracking-widest">
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
                href="/coaching"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#293C97] mt-2 group w-fit"
              >
                Learn more
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FutureYouJourneyCard;