"use client";

import { subscriptionPlanCard } from "@/constants";
import Image from "next/image"
import Button from "./Button";


const SubscriptionCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptionPlanCard.map(({ id, title, text, img, amount, label, bgcolor }, index) => (
            <div
              key={id}
              data-aos="fade-up"
              data-aos-delay={index * 100} 
              className="bg-[#F9F9F9] w-full rounded-lg shadow-md flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-lg p-5"
            >
         
              <div className="flex flex-col items-center gap-3 mb-3">
                <Image
                  src={img}
                  alt={title}
                  className="w-10 h-10 object-contain transition-transform duration-300 hover:rotate-12"
                  loading="lazy"
                />
                <p>
                  {amount}
                </p>
                <h2 className="font-semibold text-[20px] text-[#0E0E1D] leading-snug transition-all duration-300 hover:text-[#293C97]">
                  {title}
                </h2>
              <p className="text-[1.04rem] sm:text[1rem] text-gray-600 transition-opacity duration-300 hover:opacity-80">
                {text}
              </p>
              </div>

              <Button
               label={label}
              bgcolor={bgcolor}
              color="text-white"
              className="py-3  w-full "
            />
            </div>
          ))}
        </div>
  )
}

export default SubscriptionCard