import React, { useEffect } from "react";
import { markIcon } from "../assets/icons";
import Button from "./Button";


const Confirmation = () => {


  return (
    <section className="w-full  max-w-2xl mx-auto px-4 pt-60 sm:pt-35 text-center">
      <div className="flex flex-col items-center gap-5">
        <img src={markIcon} alt="Success" className="w-16 h-16" />
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E1D] leading-tight">
          Thank you! <br />
          We’ve received your information.
        </h1>
        <p className="text-gray-700 text-base sm:text-lg">
          You’ll also receive onboarding instructions via email soon.
        </p>
      </div>

      <div className="flex flex-row gap-5 w-full sm:w-auto xl:justify-between mt-10">
        <Button
          label="Explore Learning Hub"
          bgcolor="bg-[#0E0E1D]"
          color="text-white"
          className="w-full sm:w-auto py-3 sm:py-5 px-0.1 sm:px-6  text-[14px] sm:text-[1.2rem] text-center"
          onClick={() =>("/coaching")}
        />

          <Button
            label="Home"
            bgcolor="bg-[#293C97]"
            color="text-white"
            className="w-full sm:w-auto py-3 sm:py-5 px-0.1 sm:px-6  text-[14px] sm:text-[1.2rem] text-center"
            onClick={() =>("/")}
          />
      </div>
    </section>
  );
};

export default Confirmation;
