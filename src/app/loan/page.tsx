"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StartJourneyCards } from "@/constants";

interface JourneyCard {
  id?: string | number;
  title: string;
  text: string;
  img: any;
  // some card data use `pathUpClose` while others may use `path`
  path?: string;
  pathUpClose?: string;
}

interface SelectedCard {
  title: string;
  pathUpClose: string;
}

const StartJourneyPage = () => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  const handleContinue = () => {
    if (!selectedCard) return;
    // Next.js router doesn't support passing state like react-router.
    // Pass via query param or sessionStorage instead — see note below.
    sessionStorage.setItem("journeySelection", JSON.stringify(selectedCard));
    router.push("/bio-data");
  };

  return (
    <section className="min-h-screen bg-white px-4 sm:px-10 pt-28 pb-16" data-aos="fade-up">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
            Step 1 of 3
          </div>
          <h1 className="font-lato font-extrabold text-3xl sm:text-4xl lg:text-[2.6rem] text-[#0E0E1D] leading-tight tracking-tight">
            What kind of transformation are you seeking?
          </h1>
          <p className="mt-4 text-[#555] text-base sm:text-lg leading-relaxed font-montserrat">
            Choose a journey that reflects where you are now — and where you want to go. We&apos;ll guide you from there.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {(StartJourneyCards as JourneyCard[]).map((card, index) => {
            const isSelected = selectedCard?.title === card.title;
            return (
              <button
                key={card.id ?? index}
                type="button"
                onClick={() =>
                  setSelectedCard({ title: card.title, pathUpClose: card.pathUpClose ?? card.path ?? "" })
                }
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className={`relative text-left bg-white rounded-2xl p-6 flex flex-col items-start gap-4 transition-all duration-200 border ${
                  isSelected
                    ? "border-[#293C97] shadow-lg shadow-[#293C97]/10 -translate-y-1"
                    : "border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {/* Selected checkmark */}
                {isSelected && (
                  <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#293C97] text-white text-[11px] flex items-center justify-center font-bold">
                    ✓
                  </span>
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                    isSelected ? "bg-[#293C97]" : "bg-[#F3F4FA]"
                  }`}
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={24}
                    height={24}
                    className={`object-contain transition-all duration-200 ${
                      isSelected ? "brightness-0 invert" : ""
                    }`}
                  />
                </div>

                <div>
                  <h2 className="font-lato font-bold text-base sm:text-lg text-[#0E0E1D] leading-snug">
                    {card.title}
                  </h2>
                  <p className="text-sm text-[#666] mt-1.5 leading-relaxed font-montserrat">
                    {card.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-12 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:flex-1 text-sm font-semibold text-[#0E0E1D] border-[1.5px] border-gray-200 hover:bg-gray-50 py-3.5 rounded-lg transition-colors duration-200"
          >
            Go back
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedCard}
            className={`w-full sm:flex-1 text-sm font-semibold py-3.5 rounded-lg transition-colors duration-200 ${
              selectedCard
                ? "bg-[#293C97] hover:bg-[#1e2d85] text-white cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>

        {/* Progress hint */}
        <p className="text-center text-xs text-[#999] mt-6">
          {selectedCard
            ? `Selected: ${selectedCard.title}`
            : "Select an option above to continue"}
        </p>
      </div>
    </section>
  );
};

export default StartJourneyPage;