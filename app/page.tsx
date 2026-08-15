import Link from 'next/link';
import { Fragment } from 'react';
import { ProjectList } from '@/components/ProjectList';
import { SectionHeader } from '@/components/SectionHeader';
import { SmallNoteCard } from '@/components/SmallNoteCard';
import { WritingCard } from '@/components/WritingCard';
import { revealDelay } from '@/lib/styles';
import { getLatestFeaturedEssays, getSmallNotes } from '@/lib/writings';
import { site } from '@/lib/site';

export default function HomePage() {
  const latestWritings = getLatestFeaturedEssays(3);
  const latestNote = getSmallNotes()[0];

  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-tag reveal-up" style={revealDelay('0ms')}>
            Developer & Writer
          </div>
          <h1 className="hero-title">
            <span className="line reveal-up" style={revealDelay('80ms')}>
              Building things,
            </span>
            <span className="line reveal-up italic-word" style={revealDelay('160ms')}>
              understanding
            </span>
            <span className="line reveal-up" style={revealDelay('240ms')}>
              how they work.
            </span>
          </h1>
          <p className="hero-sub reveal-up" style={revealDelay('340ms')}>
            I write about technology, economics, and the hidden mechanisms
            <br />
            behind the systems we use every day.
          </p>
          <div className="hero-cta reveal-up" style={revealDelay('440ms')}>
            <Link href="/writings.html" className="btn-primary">
              Read Writings
            </Link>
            <Link href="/index.html#work" className="btn-ghost">
              See Projects
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {[
            'Music Theory',
            'Technology',
            'Economics',
            'Systems Thinking',
            'Open Source',
            'Finance',
            'Machine Learning',
            'Music Theory',
            'Technology',
            'Economics',
            'Systems Thinking',
            'Open Source',
            'Finance',
            'Machine Learning',
          ].map((item, index) => (
            <Fragment key={`${item}-${index}`}>
              <span>{item}</span>
              <span className="dot">·</span>
            </Fragment>
          ))}
        </div>
      </div>

      <section className="section" id="writings-preview">
        <div className="container">
          <SectionHeader label="Latest Writings" href="/writings.html" linkLabel="View all →" />
          <div className="posts-grid">
            {latestWritings.map((writing) => (
              <WritingCard key={writing.slug} writing={writing} />
            ))}
          </div>
        </div>
      </section>

      <section className="section small-notes-preview">
        <div className="container">
          <SectionHeader label="Small Notes" href="/writings.html#small-notes" linkLabel="View notes →" />
          <div className="small-notes-grid">{latestNote ? <SmallNoteCard note={latestNote} /> : null}</div>
        </div>
      </section>

      <section className="section section-dark" id="work">
        <div className="container">
          <SectionHeader label="Selected Projects" light />
          <ProjectList />
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-left">
              <span className="section-label">About</span>
              <h2 className="about-title">
                Curious about
                <br />
                <em>how things work.</em>
              </h2>
            </div>
            <div className="about-right">
              <p>
                I&apos;m a developer who can&apos;t stop asking &quot;why?&quot; — whether it&apos;s tracing a TCP
                packet through the network stack, or understanding how a central bank decision ripples into mortgage
                rates.
              </p>
              <p>
                This site is where I think out loud. I write deep-dives on topics I&apos;m learning, and share the
                projects I build along the way.
              </p>
              <p>
                Currently based in <strong>Wageningen, Netherlands</strong>, learning through small software projects
                and music theory experiments.
              </p>
              <div className="about-links">
                <Link href="/cv.html" className="btn-primary">
                  View CV
                </Link>
                <Link href={`mailto:${site.email}`} className="btn-ghost">
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
