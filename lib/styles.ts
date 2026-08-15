import type { CSSProperties } from 'react';

export function revealDelay(delay: string): CSSProperties {
  return { '--d': delay } as CSSProperties;
}
