"use client";

import { CommunityCards, CommunityStatistics } from "@/constants";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

/* ── Helpers ── */
const parseValue = (value: string): number =>
  Number(value.replace(/[^\d]/g, "")) || 0;

const getSuffix = (value: string): string =>
  value.match(/[^0-9]+$/)?.[0] ?? "";

const getPrefix = (value: string): string =>
  value.match(/^[^\d]+/)?.[0] ?? "";

/* ── Component ── */
const CommunityCard: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="flex flex-col gap-5 h-full">

      {/* Text cards */}
      <div className="flex flex-col gap-3 flex-1">
        {CommunityCards.map(({ text }, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm hover:border-[#293C97]/20 hover:shadow-md transition-all duration-200"
          >
            <p className="font-montserrat text-sm text-[#555] leading-relaxed">
              {text}
            </p>
          </div>
        ))}
      </div>

      {/* Stats grid */}
      <div
        ref={ref}
        className="grid grid-cols-3 gap-3"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {CommunityStatistics.map((stat, index) => {
          const number = parseValue(stat.value);
          const suffix = getSuffix(stat.value);
          const prefix = getPrefix(stat.value);

          return (
            <div
              key={stat.label}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="bg-[#EEF0FA] border border-[#c7cef0] rounded-xl p-4 flex flex-col items-center text-center gap-1"
            >
              {/* Animated number */}
              <p
                className="font-lato font-extrabold text-xl sm:text-2xl text-[#293C97] leading-none"
                aria-label={`${stat.label}: ${prefix}${number}${suffix}`}
              >
                {inView ? (
                  <>
                    {prefix}
                    <CountUp end={number} duration={2.5} separator="," />
                    {suffix}
                  </>
                ) : (
                  `${prefix}0${suffix}`
                )}
              </p>

              {/* Label */}
              <p className="font-montserrat text-[11px] sm:text-xs text-[#555] leading-snug">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityCard;