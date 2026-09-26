import type { Metadata } from 'next';
import Link from 'next/link';
import { ReadingProgress } from '@/components/ReadingProgress';
import { projects } from '@/lib/projects';
import { revealDelay } from '@/lib/styles';

const project = projects.find((item) => item.slug === 'momentum-grids');

export const metadata: Metadata = {
  title: 'Momentum Grids',
  description:
    'A habit tracker for recording the days you show up and seeing your progress across the year, on the web and iOS.',
  alternates: {
    canonical: '/momentum-grids',
  },
};

export default function MomentumGridsPage() {
  if (!project) {
    throw new Error('Momentum Grids project metadata is missing.');
  }

  return (
    <main>
      <ReadingProgress />
      <header className="post-header">
        <div className="container container-narrow">
          <a href="/index.html#work" className="back-link reveal-up" style={revealDelay('0ms')}>
            ← Back to projects
          </a>
          <div className="post-header-meta reveal-up" style={revealDelay('60ms')}>
            {project.technologies.map((technology) => (
              <span className="post-tag" key={technology}>
                {technology}
              </span>
            ))}
          </div>
          <h1 className="post-heading reveal-up" style={revealDelay('120ms')}>
            {project.title}
          </h1>
          <p className="post-lede reveal-up" style={revealDelay('180ms')}>
            A calmer way to keep track of the habits you want to make part of your life.
          </p>
          <div className="post-actions reveal-up" style={revealDelay('240ms')}>
            <Link href={project.liveUrl ?? 'https://momentumgrids.com/'} className="btn-primary" target="_blank" rel="noopener">
              Open the web app ↗
            </Link>
            {project.appStoreUrl ? (
              <Link href={project.appStoreUrl} className="btn-ghost" target="_blank" rel="noopener">
                Download on the App Store ↗
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      <article className="post-content">
        <div className="container container-narrow">
          <h2>The problem</h2>
          <p>
            Building a habit happens in small moments, so it can be hard to notice the progress while you are in the
            middle of it. A missed day can feel bigger than a week of effort, and notes scattered across different
            places make it difficult to see the pattern you are creating.
          </p>

          <h2>A year of small wins, in one view</h2>
          <p>
            Momentum Grids gives each day a place in a year-at-a-glance heatmap. Mark the days you show up, then look
            back to see your rhythm take shape. The goal is not a perfect streak; it is making your effort visible so
            you can recognise what is working and return after the days that do not go to plan.
          </p>
          <p>
            Use it for reading, exercise, practising an instrument, or any routine you want to build. The grid turns an
            abstract intention into a simple record you can understand at a glance.
          </p>

          <h2>Made for steady progress</h2>
          <ul>
            <li>Track the habits that matter to you and record the days you complete them.</li>
            <li>See your consistency across the year in a heatmap-style view.</li>
            <li>Use a simple, focused space to notice progress without turning it into a competition.</li>
            <li>Pick up your routine again after a gap; one missed day does not erase the work around it.</li>
          </ul>

          <div className="related-link-card">
            <span className="small-note-kicker">Find Your Rhythm</span>
            <h2>Start with one square</h2>
            <p>
              Choose one habit you would like to make more consistent. Record it, give it time, and let the grid show
              you the progress that is easy to miss day by day.
            </p>
            <div className="post-actions related-writing-actions">
              <Link href={project.liveUrl ?? 'https://momentumgrids.com/'} className="btn-primary" target="_blank" rel="noopener">
                Try Momentum Grids on the web ↗
              </Link>
              {project.appStoreUrl ? (
                <Link href={project.appStoreUrl} className="btn-ghost" target="_blank" rel="noopener">
                  Get the iOS app ↗
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
