"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
    const pathname = usePathname();

  useEffect(() => {
    // Scroll to top whenever the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
