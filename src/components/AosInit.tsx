"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AosInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,       // animate in once, stay visible — no disappearing on scroll up
      easing: "ease-out-cubic",
      offset: 80,       // trigger 80px before element enters viewport
    });
  }, []);

  return null; // renders nothing, just runs the init
};

export default AosInit;