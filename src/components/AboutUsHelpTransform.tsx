"use client";

import React, { useState } from 'react';
import { AboutUsHelpTransform } from '../constants';
import Image from 'next/image';

const AboutUsHelpTransformComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row gap-12 py-16 px-4 sm:px-8">
      {/* Left Side with IDs and Text */}
      <div className="w-full md:w-1/2 flex flex-col gap-10">
        {AboutUsHelpTransform.map(({ id, title, text }, index) => (
          <div
            key={id}
            onMouseEnter={() => setActiveIndex(index)}
            className={`flex items-start gap-4 transition-all duration-300 cursor-pointer ${
              activeIndex === index ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {/* ID Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  activeIndex === index
                    ? 'border-[#293C97] text-[#293C97]'
                    : 'border-gray-300 text-[#0E0E1D]'
                }`}
              >
                {id}
              </div>
            </div>

            {/* Text */}
            <div className="space-y-2 max-w-lg">
              <h2
                className={`text-lg sm:text-xl font-semibold leading-snug transition-all ${
                  activeIndex === index ? 'text-[#293C97]' : 'text-[#0E0E1D]'
                }`}
              >
                {title}
              </h2>
              <p className="text-sm sm:text-base text-[#333] leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side with Image */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="relative w-full max-w-sm h-[300px] sm:h-[400px] md:h-[500px]">
          {AboutUsHelpTransform.map(({ id, img }, index) => (
            <Image
              key={id}
              src={img}
              alt=""
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover rounded-md transition-opacity duration-700 ${
                activeIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsHelpTransformComponent;
