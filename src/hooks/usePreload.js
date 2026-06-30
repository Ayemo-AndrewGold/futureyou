// hooks/usePreload.js
import { useRef, useCallback } from 'react';

/**
 * usePreload hook
 * @param {React.LazyExoticComponent} page - a lazy-loaded component with optional .preload method
 * @returns {Object} { ref, onMouseEnter }
 */
const usePreload = (page) => {
  const ref = useRef(null);

  // Preload function
  const onMouseEnter = useCallback(() => {
    if (page && typeof page.preload === 'function') {
      page.preload();
    }
  }, [page]);

  return { ref, onMouseEnter };
};

export default usePreload;
