"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInit = () => {
  const pathname = usePathname();

  // Init once, on first mount
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,        // set false if you want animations to replay every time they scroll into view
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  // Re-scan the DOM every time the route changes, since App Router
  // navigations don't trigger a full page reload — without this,
  // data-aos elements on newly rendered pages never get picked up.
  useEffect(() => {
    AOS.refresh();
  }, [pathname]);

  return null;
};

export default AOSInit;