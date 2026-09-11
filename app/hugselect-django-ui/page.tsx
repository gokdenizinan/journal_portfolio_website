import type { Metadata } from 'next';
import Link from 'next/link';
import { ReadingProgress } from '@/components/ReadingProgress';
import { projects } from '@/lib/projects';
import { revealDelay } from '@/lib/styles';

const project = projects.find((item) => item.slug === 'hugselect-django-ui');

export const metadata: Metadata = {
  title: 'HugSelect Django UI',
  description:
    project?.description ??
    'A Django interface for searching, filtering, comparing, and explaining Hugging Face foundation model recommendations.',
  alternates: {
    canonical: '/hugselect-django-ui',
  },
};

export default function HugSelectDjangoUiPage() {
  if (!project) {
    throw new Error('HugSelect Django UI project metadata is missing.');
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
            <span className="post-date">Research internship · 2026</span>
          </div>
          <h1 className="post-heading reveal-up" style={revealDelay('120ms')}>
            {project.title}
          </h1>
          <p className="post-lede reveal-up" style={revealDelay('180ms')}>
            A Django-based interface for exploring HugSelect model recommendations.
          </p>
          {project.githubUrl ? (
            <div className="post-actions reveal-up" style={revealDelay('240ms')}>
              <Link href={project.githubUrl} className="btn-primary" target="_blank" rel="noopener">
                View on GitHub ↗
              </Link>
            </div>
          ) : null}
        </div>
      </header>

      <article className="post-content">
        <div className="container container-narrow">
          <h2>Overview</h2>
          <p>
            HugSelect Django UI is the project I worked on during my student researcher internship at Wageningen
            University. The project focuses on building a user-facing Django interface for HugSelect, a research system
            that recommends Hugging Face foundation models.
          </p>
          <p>
            The work sits between research infrastructure and product interface design: understanding how model
            recommendations are produced, then making those results easier to search, filter, compare, and explain.
          </p>

          <h2>What I Worked On</h2>
          <ul>
            <li>Studied the existing HugSelect recommendation pipeline and processed model datasets.</li>
            <li>Worked with an Elasticsearch-based search flow for model discovery.</li>
            <li>Designed interface flows for searching and filtering foundation model recommendations.</li>
            <li>Explored comparison views that help users evaluate multiple models side by side.</li>
            <li>Focused on making recommendation results more understandable through explanatory UI elements.</li>
          </ul>

          <h2>Why It Matters</h2>
          <p>
            Foundation model selection can be difficult because the best model depends on the task, constraints, and
            available metadata. A recommendation system is useful only if people can understand and work with its
            results. This project was about turning a research pipeline into something easier to inspect and use.
          </p>

          <h2>Technical Focus</h2>
          <p>
            The interface is built around Django and standard web technologies, with Elasticsearch supporting the search
            experience. The project gave me practical experience with connecting backend search logic to a clear,
            research-oriented user interface.
          </p>
          <ul>
            <li>Python and Django for the application structure.</li>
            <li>Elasticsearch for search and filtering workflows.</li>
            <li>Hugging Face model metadata and recommendation outputs.</li>
            <li>HTML, CSS, and JavaScript for the user-facing interface.</li>
            <li>Git for project development and version control.</li>
          </ul>

          <h2>What I Learned</h2>
          <p>
            This project helped me practise reading an existing research codebase, understanding data flow before
            designing screens, and thinking carefully about how technical recommendations should be presented to users.
          </p>
          <p>
            It also made me more aware of the gap between “the system can compute something” and “a person can actually
            understand and use the result.”
          </p>

          <h2>Project Status</h2>
          <p>
            <strong>Status:</strong> Internship project completed.
          </p>

          <div className="related-link-card">
            <span className="small-note-kicker">Related Context</span>
            <h2>From research pipeline to usable interface</h2>
            <p>
              This project reflects the part of software engineering I keep coming back to: taking a complex system and
              making it easier for people to inspect, compare, and reason about.
            </p>
            <div className="post-actions related-writing-actions">
              <Link href="/cv.html" className="btn-primary">
                See it in my CV
              </Link>
              {project.githubUrl ? (
                <Link href={project.githubUrl} className="btn-ghost" target="_blank" rel="noopener">
                  Open the repository
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
