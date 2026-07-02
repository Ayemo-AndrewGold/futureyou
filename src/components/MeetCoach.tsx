"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { coachCards } from "@/constants";
import { useEffect } from "react";
import AOS from "aos";

interface CoachCard {
  id: string;
  title: string;
  text: string;
  img: string | StaticImageData;
}

const MeetCoach: React.FC = () => {
  useEffect(() => {

    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  return (
    <>
      {(coachCards as CoachCard[]).map(({ id, title, text, img }, index) => (
        <div
          key={id}
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay={`${index * 100}`}
          className="
            min-w-[85%] sm:min-w-[60%] lg:min-w-[38%]
            max-w-[85%] sm:max-w-[60%] lg:max-w-[38%]
            flex-shrink-0 snap-start
            bg-white border border-gray-100 rounded-2xl
            overflow-hidden flex flex-col
          "
        >
          {/* Image with number badge */}
          <div className="relative w-full h-[240px] sm:h-[260px]">
            <Image
              src={img}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 38vw"
            />
            {/* Number badge */}
            <span className="absolute top-4 left-4 bg-[#293C97] text-white text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
              {String(id).padStart(2, "0")}
            </span>
          </div>

          {/* Card body */}
          <div className="flex flex-col gap-3 p-5 flex-1">

            {/* Title row with accent line */}
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-8 bg-[#293C97] rounded-full flex-shrink-0" />
              <h3 className="font-lato font-semibold text-[1.05rem] text-[#0E0E1D] leading-snug">
                {title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-[#555] leading-relaxed font-montserrat">
              {text}
            </p>

            {/* CTA button pushed to bottom */}
            <div className="mt-auto pt-3">
              <Link href="/coaching">
                <button className="
                  w-full py-3 rounded-lg
                  bg-[#293C97] hover:bg-[#1e2e7a]
                  text-white text-sm font-semibold
                  tracking-wide transition-colors duration-200
                ">
                  Get Loan support
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MeetCoach;