"use client";

import Image from "next/image";
import Link from "next/link";
import { transformCards } from "@/constants";

interface TransformCard {
  id: number;
  title: string;
  text: string;
  img: string;
}

// Cycle through these for card accent colours
const accentColors: { bg: string; iconBg: string }[] = [
  { bg: "bg-white",      iconBg: "bg-[#EEF0FA]" },
  { bg: "bg-white",      iconBg: "bg-[#f0fdf4]" },
  { bg: "bg-[#EEF0FA]",  iconBg: "bg-[#293C97]" },
];

const TransformPathCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {(transformCards as TransformCard[]).map(({ id, title, text, img }, index) => {
        const accent = accentColors[index % accentColors.length];
        const isHighlighted = index % 3 === 2;

        return (
          <div
            key={id}
            data-aos="fade-up"
            data-aos-delay={index * 80}
            className={`group relative flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 will-change-transform ${
              accent.bg
            } ${
              isHighlighted
                ? "border-[#c7cef0]"
                : "border-gray-100 hover:border-[#293C97]/20"
            }`}
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${accent.iconBg}`}
            >
              <Image
                src={img}
                alt={title}
                width={26}
                height={26}
                className={`object-contain transition-transform duration-300 group-hover:scale-110`}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="font-lato font-bold text-[1.1rem] text-[#0E0E1D] leading-snug">
                {title}
              </h3>
              <p className="font-montserrat text-[16px] text-[#666] leading-relaxed">
                {text}
              </p>
            </div>

            {/* Learn more link */}
            <Link
              href="/coaching"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#293C97] mt-auto group-hover:gap-3 transition-all duration-200"
            >
              Learn more
              <span className="text-base transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TransformPathCard;