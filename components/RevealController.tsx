'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

export function RevealController() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('.reveal-up');
    if (!revealItems.length) return;

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    revealItems.forEach((element) => {
      const bounds = element.getBoundingClientRect();

      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        element.classList.add('is-visible');
        return;
      }

      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
