"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "./Button";
import { StartJourneyCards } from "@/constants";

interface SelectedCard {
  title: string;
  pathUpClose: string;
}

const StartJourneyPageCard: React.FC = () => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  const handleContinue = () => {
    if (!selectedCard) return;

    router.push(
      `/bio-data?title=${encodeURIComponent(
        selectedCard.title
      )}&pathUpClose=${encodeURIComponent(selectedCard.pathUpClose)}`
    );
  };

  return (
    <section className="px-4 py-10">
      <h1 className="text-center text-2xl font-bold mb-6 text-[#293C97]">
        What kind of transformation are you seeking?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {StartJourneyCards.map((card, index) => (
          <div
            key={card.id}
            onClick={() =>
              setSelectedCard({
                title: card.title,
                pathUpClose: card.pathUpClose,
              })
            }
            className={`cursor-pointer bg-[#F9F9F9] w-full rounded-lg shadow-md p-5 flex flex-col justify-between 
              transition-all duration-500 hover:shadow-xl hover:-translate-y-2
              ${
                selectedCard?.title === card.title
                  ? "border-2 border-[#293C97] shadow-lg scale-[1.02]"
                  : ""
              }`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-duration="800"
          >
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={card.img}
                alt={card.title}
                width={40}
                height={40}
                className="object-contain"
              />
              <h2 className="font-semibold text-[20px] text-[#0E0E1D] leading-snug">
                {card.title}
              </h2>
            </div>
            <p className="text-[15px] text-gray-600">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button
          title="Continue"
          onClick={handleContinue}
          isDisabled={!selectedCard}
        />
      </div>
    </section>
  );
};

export default StartJourneyPageCard;
