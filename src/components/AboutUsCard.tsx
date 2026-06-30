"use client";

import { WhyWeExistCard } from "@/constants";
import Image from "next/image";

const AboutUsCard = () => {
  return (
    <section className="w-full max-w-5xl flex flex-col gap-8 py-6">
      {WhyWeExistCard.map(({ id, text, img }) => (
        <div key={id} className="flex items-center gap-4 sm:gap-8">
          
          <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16">
            <Image
              src={img}
              alt="Why we exist"
              width={64}
              height={64}
            />
          </div>

          <p className="text-white text-sm sm:text-base leading-relaxed">
            {text}
          </p>
        </div>
      ))}
    </section>
  );
};

export default AboutUsCard;
