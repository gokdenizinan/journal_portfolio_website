'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>('.post-content');
    if (!article) return;

    const update = () => {
      const articleTop = article.offsetTop - window.innerHeight;
      const articleHeight = article.offsetHeight;
      const nextProgress = Math.min(100, Math.max(0, ((window.scrollY - articleTop) / articleHeight) * 100));
      setProgress(nextProgress);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div className="reading-progress" id="readingProgress" style={{ width: `${progress}%` }} />;
}
