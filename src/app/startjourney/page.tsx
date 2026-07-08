"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StartJourneyCards } from "@/constants";

interface SelectedCard {
  title: string;
  pathUpClose: string;
}

const steps = [
  { number: 1, label: "Journey" },
  { number: 2, label: "About you" },
  { number: 3, label: "Confirm" },
];

const StartJourneyPage: React.FC = () => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  const handleContinue = () => {
    if (!selectedCard) return;
    router.push(`/biodata?journey=${encodeURIComponent(selectedCard.title)}`);
  };

  return (
    <section className="min-h-screen bg-[#f8f9ff] px-2 sm:px-10 pt-3 pb-3">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">

        {/* ── Step progress indicator ── */}
        <div
          className="flex items-center gap-3 mb-10"
          data-aos="fade-down"
        >
          {steps.map((step, i) => {
            const isActive = step.number === 1;
            const isDone = step.number < 1;
            return (
              <div key={step.number} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                      isActive
                        ? "bg-[#293C97] text-white"
                        : isDone
                        ? "bg-[#293C97] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isDone ? "✓" : step.number}
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:block ${
                      isActive ? "text-[#293C97]" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-10 sm:w-16 h-[1.5px] bg-gray-200" />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Header ── */}
        <div
          className="text-center max-w-2xl mb-12"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          <h1 className="font-lato font-extrabold text-3xl sm:text-4xl lg:text-[2.8rem] text-[#0E0E1D] leading-tight tracking-tight mb-4">
            Our{" "}
            <span className="text-[#293C97]">Services</span>
             
          </h1>
          <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed">
           Every transformation is unique. Whether you're growing personally, strengthening 
           your business, or seeking funding, Future You has the right support for your journey.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[980px] mb-8 justify-center mx-auto">
          {StartJourneyCards.slice(0, 3).map((card, index) => {
            const isSelected = selectedCard?.title === card.title;

            return (
              <button
                key={card.id ?? index}
                type="button"
                // data-aos="fade-up"
                // data-aos-delay={`${index * 60}`}
                onClick={() =>
                  setSelectedCard({
                    title: card.title,
                    pathUpClose: card.pathUpClose,
                  })
                }
                className={`relative text-left rounded-2xl p-6 flex flex-col items-start gap-4 transition-all duration-200 border ${
                  isSelected
                    ? "bg-white border-[#293C97] shadow-lg shadow-[#293C97]/10 -translate-y-1"
                    : "bg-white border-gray-100 shadow-sm hover:border-[#293C97]/30 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {/* Checkmark badge */}
                <span
                  className={`absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200 ${
                    isSelected
                      ? "bg-[#293C97] text-white scale-100"
                      : "bg-gray-100 text-gray-300 scale-90"
                  }`}
                >
                  ✓
                </span>

                {/* Icon tile */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                    isSelected ? "bg-[#293C97]" : "bg-[#F3F4FA]"
                  }`}
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={22}
                    height={22}
                    className={`object-contain transition-all duration-200`}
                  />
                </div>

                <div>
                  <h2 className="font-lato font-bold text-sm sm:text-base text-[#0E0E1D] leading-snug mb-1.5">
                    {card.title}
                  </h2>
                  <p className="font-montserrat text-xs sm:text-sm text-[#666] leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Selection hint ── */}
        <div className="mb-4 h-7 flex items-center justify-center">
          {selectedCard ? (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#293C97] bg-[#EEF0FA] border border-[#c7cef0] px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
              Selected: {selectedCard.title}
            </span>
          ) : (
            <p className="text-xs text-[#999]">
              Select an option above to continue
            </p>
          )}
        </div>

        {/* ── Action buttons ── */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full text-sm font-semibold text-[#444] border-[1.5px] border-gray-200 bg-white hover:bg-gray-50 py-3.5 rounded-xl transition-colors duration-200"
          >
            ← Go back
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedCard}
            className={`w-full text-sm font-semibold py-3.5 rounded-xl transition-all duration-200 ${
              selectedCard
                ? "bg-[#293C97] hover:bg-[#1e2d85] text-white shadow-sm shadow-[#293C97]/20 cursor-pointer"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            Continue →
          </button>
        </div>

      </div>
    </section>
  );
};

export default StartJourneyPage;