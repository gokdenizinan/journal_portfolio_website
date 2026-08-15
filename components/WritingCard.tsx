import Link from 'next/link';
import type { Writing } from '@/lib/writings';

type WritingCardProps = {
  writing: Writing;
};

export function WritingCard({ writing }: WritingCardProps) {
  return (
    <Link href={`/${writing.slug}.html`} className="post-card reveal-up">
      <div className="post-meta">
        <span className="post-tag">{writing.category}</span>
        <span className="post-date">{writing.listDate}</span>
      </div>
      <h3 className="post-title">{writing.title}</h3>
      <p className="post-excerpt">{writing.description}</p>
      <span className="post-read">Read more →</span>
    </Link>
  );
}
