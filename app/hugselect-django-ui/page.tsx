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
    'An evidence-driven Django decision-support tool for selecting Hugging Face foundation models.',
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
            An evidence-driven decision-support tool for selecting Hugging Face foundation models.
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
            University. It is a Django application for HugSelect, an evidence-driven multi-criteria decision-support
            tool for selecting reusable foundation models from Hugging Face.
          </p>
          <p>
            Instead of treating model selection as a simple text search, HugSelect turns a natural-language request and
            user-controlled MoSCoW priorities into structured criteria. It then searches a local Elasticsearch snapshot
            of 69,000 Hugging Face model records and keeps the evidence used to rank, compare, and explain candidates.
          </p>

          <h2>What The System Does</h2>
          <ul>
            <li>Accepts natural-language model-selection requests and explicit MoSCoW priorities.</li>
            <li>Separates hard feasibility constraints from softer ranking preferences.</li>
            <li>Retrieves candidates from a released Elasticsearch snapshot containing 69,000 model records.</li>
            <li>Verifies whether ranked Hugging Face model pages are publicly reachable.</li>
            <li>Shows criterion-level explanations for why a model matched the request.</li>
            <li>Supports relation graphs, two- or three-model comparison, and Decision Stress sensitivity views.</li>
            <li>Exports retained search, comparison, and sensitivity evidence into PDF decision records.</li>
          </ul>

          <h2>My Contribution</h2>
          <p>
            My work focused on software implementation, validation, visualisation, and writing around the released
            HugSelect system. Practically, this meant working across the Django application, recommendation evidence
            flow, interface behaviour, release verification, and manuscript-level explanation of the tool.
          </p>
          <p>
            The project was especially valuable because it was not only about making a page look usable. It required
            understanding how repository metadata, extracted functional features, quality evidence, constraints,
            availability checks, and comparison views all fit together in one decision-support workflow.
          </p>

          <h2>Why It Matters</h2>
          <p>
            Foundation model selection can be difficult because the best model depends on the task, constraints, and
            available evidence. A model can look relevant but still miss a required licence, task, language, lineage, or
            capability. HugSelect makes those trade-offs visible instead of hiding them behind a single recommendation.
          </p>
          <p>
            The important part is accountability: the system preserves the original request, normalized priorities,
            candidate evidence, comparisons, sensitivity results, and report output so that a model choice can be
            reviewed later.
          </p>

          <h2>Technical Focus</h2>
          <p>
            The runtime is coordinated by Django views, while search and decision logic live in service modules.
            Candidate retrieval uses a local Elasticsearch 7.17.29 knowledge base rather than querying Hugging Face for
            discovery at search time. External calls are used after ranking to verify whether model pages are reachable.
          </p>
          <ul>
            <li>Python 3.14.5 and Django 6.0.7 for the web application.</li>
            <li>Elasticsearch 7.17.29 for the local model index.</li>
            <li>HTML, CSS, and JavaScript for user-facing decision-support views.</li>
            <li>Gemini for primary intent extraction, with controlled fallback paths.</li>
            <li>ReportLab for generating PDF decision records.</li>
          </ul>

          <h2>Validation</h2>
          <p>
            The revised release describes HugSelect v1.0.1 as a reproducible software release rather than only a
            prototype. Verification includes 147 automated tests, exact restoration of the 69,000-record Elasticsearch
            snapshot, checksum validation, a Docker end-to-end exercise, versioned ranking configuration, and a public
            reproducibility package.
          </p>
          <p>
            The system is careful about its claims: feature-match percentages are requirement coverage, not benchmark
            performance, and missing indexed evidence does not prove that a model lacks a capability.
          </p>

          <h2>Limitations</h2>
          <ul>
            <li>The knowledge base is a finite 2025 snapshot and does not include later model changes.</li>
            <li>Hugging Face metadata can be incomplete, inconsistent, or outdated.</li>
            <li>Licence metadata is treated as evidence, not legal advice.</li>
            <li>Community-derived quality evidence reflects public discussion and automated processing.</li>
            <li>Availability checks show public reachability at search time, not long-term suitability.</li>
          </ul>

          <h2>What I Learned</h2>
          <p>
            This project helped me practise working with a research-grade codebase, understanding data flow before
            designing screens, and thinking carefully about how technical recommendations should be presented to users.
          </p>
          <p>
            It also made me more aware of the gap between “the system can compute something” and “a person can actually
            understand, challenge, compare, and use the result.”
          </p>

          <h2>Project Status</h2>
          <p>
            <strong>Status:</strong> Internship project completed. HugSelect v1.0.1 is described as a revised software
            release with reproducibility artifacts.
          </p>

          <div className="related-link-card">
            <span className="small-note-kicker">Related Context</span>
            <h2>From research pipeline to usable interface</h2>
            <p>
              This project reflects the part of software engineering I keep coming back to: taking a complex evidence
              pipeline and making it easier for people to inspect, compare, stress-test, and reason about.
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
