import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReadingProgress } from '@/components/ReadingProgress';
import { revealDelay } from '@/lib/styles';
import { getAllWritings, getWritingBySlug } from '@/lib/writings';
import { site } from '@/lib/site';

type SlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllWritings().map((writing) => ({ slug: writing.slug }));
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const writing = getWritingBySlug(slug);

  if (!writing) {
    return {};
  }

  return {
    title: writing.title,
    description: writing.description,
    alternates: {
      canonical: `/${writing.slug}`,
    },
    openGraph: {
      title: `${writing.title} — ${site.name}`,
      description: writing.description,
      url: `${site.url}/${writing.slug}`,
      type: 'article',
      publishedTime: writing.date,
    },
  };
}

export default async function WritingPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const writing = getWritingBySlug(slug);

  if (!writing) {
    notFound();
  }

  return (
    <main>
      <ReadingProgress />
      <header className="post-header">
        <div className="container container-narrow">
          <Link
            href={writing.kind === 'note' ? '/writings.html#small-notes' : '/writings.html'}
            className="back-link reveal-up"
            style={revealDelay('0ms')}
          >
            ← Back to {writing.kind === 'note' ? 'small notes' : 'writings'}
          </Link>
          <div className="post-header-meta reveal-up" style={revealDelay('60ms')}>
            <span className="post-tag">{writing.category}</span>
            <span className="post-date">{writing.displayDate}</span>
          </div>
          <h1 className="post-heading reveal-up" style={revealDelay('120ms')}>
            {writing.title}
          </h1>
          <p className="post-lede reveal-up" style={revealDelay('180ms')}>
            {writing.description}
          </p>
        </div>
      </header>

      <article className="post-content">
        <div className="container container-narrow" dangerouslySetInnerHTML={{ __html: writing.html }} />
      </article>
    </main>
  );
}
