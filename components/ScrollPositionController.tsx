'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollPositionController() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (window.location.hash) return;

    const scrollToTop = () => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;

      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previousScrollBehavior;
    };

    scrollToTop();

    const firstFrame = window.requestAnimationFrame(scrollToTop);
    const secondFrame = window.requestAnimationFrame(() => window.requestAnimationFrame(scrollToTop));
    const shortDelay = window.setTimeout(scrollToTop, 80);
    const longerDelay = window.setTimeout(scrollToTop, 220);

    const handlePageShow = () => scrollToTop();
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(shortDelay);
      window.clearTimeout(longerDelay);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [pathname]);

  return null;
}
