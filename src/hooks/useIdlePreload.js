import { useEffect } from "react";

export default function useIdlePreload(routes = []) {
  useEffect(() => {
    if (!routes.length) return;

    const preloadAll = () => {
      routes.forEach(route => {
        if (route.preload) route.preload();
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preloadAll, { timeout: 2000 });
    } else {
      const timeout = setTimeout(preloadAll, 2000);
      return () => clearTimeout(timeout);
    }
  }, [routes]);
}
