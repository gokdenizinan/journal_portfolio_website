'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Writing } from '@/lib/writings';

type WritingSummary = Pick<Writing, 'title' | 'slug' | 'listDate' | 'description' | 'category'>;

type WritingsArchiveProps = {
  essays: WritingSummary[];
};

export function WritingsArchive({ essays }: WritingsArchiveProps) {
  const categories = useMemo(() => ['All', ...Array.from(new Set(essays.map((writing) => writing.category)))], [essays]);
  const [activeCategory, setActiveCategory] = useState('All');
  const visibleEssays =
    activeCategory === 'All' ? essays : essays.filter((writing) => writing.category === activeCategory);

  return (
    <>
      <div className="filter-bar">
        <div className="container">
          <div className="filters">
            {categories.map((category) => (
              <button
                className={`filter-btn${activeCategory === category ? ' active' : ''}`}
                data-filter={category === 'All' ? 'all' : category}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="writings-list">
        <div className="container">
          <div className="writing-section-heading">
            <span className="section-label">Long-form essays</span>
          </div>

          {visibleEssays.map((writing) => (
            <Link href={`/${writing.slug}`} className="writing-row reveal-up" data-category={writing.category} key={writing.slug}>
              <div className="writing-meta">
                <span className="post-tag">{writing.category}</span>
                <span className="post-date">{writing.listDate}</span>
              </div>
              <div className="writing-body">
                <h2 className="writing-title">{writing.title}</h2>
                <p className="writing-excerpt">{writing.description}</p>
              </div>
              <span className="writing-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
