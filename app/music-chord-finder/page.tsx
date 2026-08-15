import type { Metadata } from 'next';
import Link from 'next/link';
import { ReadingProgress } from '@/components/ReadingProgress';
import { projects } from '@/lib/projects';
import { revealDelay } from '@/lib/styles';

const project = projects.find((item) => item.slug === 'music-chord-finder');

export const metadata: Metadata = {
  title: 'Music Chord Finder',
  description: project?.description ?? 'A Python command-line app for identifying basic chords from musical notes.',
  alternates: {
    canonical: '/music-chord-finder',
  },
};

export default function MusicChordFinderPage() {
  if (!project) {
    throw new Error('Music Chord Finder project metadata is missing.');
  }

  return (
    <main>
      <ReadingProgress />
      <header className="post-header">
        <div className="container container-narrow">
          <Link href="/index.html#work" className="back-link reveal-up" style={revealDelay('0ms')}>
            ← Back to projects
          </Link>
          <div className="post-header-meta reveal-up" style={revealDelay('60ms')}>
            {project.technologies.map((technology) => (
              <span className="post-tag" key={technology}>
                {technology}
              </span>
            ))}
            <span className="post-date">Version 1 complete · Version 2 in progress</span>
          </div>
          <h1 className="post-heading reveal-up" style={revealDelay('120ms')}>
            {project.title}
          </h1>
          <p className="post-lede reveal-up" style={revealDelay('180ms')}>
            A Python command-line app for identifying basic chords from musical notes.
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
            Music Chord Finder is a small Python command-line project that takes musical notes as input and identifies
            whether they form a major, minor, diminished, or augmented chord.
          </p>
          <p>
            The project currently lives in one main file, <code>chord_finder.py</code>. The goal is not to make a
            complete music theory tool yet. Version 1 is complete and focuses on clean function design, user input
            handling, chord logic, and a simple command-line experience.
          </p>

          <h2>Why I Built It</h2>
          <p>
            I wanted to connect programming with music theory. While learning how chords work, especially intervals and
            inversions, I used this project to turn that understanding into code.
          </p>
          <p>
            Instead of only memorizing chord names, I wanted to model the logic behind them: notes become numbers,
            intervals become patterns, and those patterns can be checked by a program.
          </p>
          <p>
            I also wanted to spend some evenings away from AI-assisted coding and work through the problem manually.
            Part of the point was to keep the basic muscle active: thinking through the logic myself, typing the code by
            hand, making mistakes, and understanding why each piece belongs there.
          </p>

          <h2>What Version 1 Does</h2>
          <ul>
            <li>Accept notes from the terminal.</li>
            <li>Normalize user input.</li>
            <li>Work with sharp notes.</li>
            <li>Convert notes into numbers.</li>
            <li>Calculate intervals from possible roots.</li>
            <li>Match interval patterns against basic chord types.</li>
            <li>Recognize inversions.</li>
            <li>Handle invalid notes gracefully.</li>
          </ul>

          <h2>Example</h2>
          <p>If the user enters:</p>
          <p>
            <code>C E G</code>
          </p>
          <p>the program can identify the result as:</p>
          <p>
            <strong>C major</strong>
          </p>
          <p>
            It also supports inversions. For example, <code>E G C</code> can still be recognized as{' '}
            <strong>C major</strong>, because the program tests each note as a possible root.
          </p>

          <h2>Core Logic</h2>
          <p>
            A chord is identified not just by note names, but by the distances between notes. For example,{' '}
            <strong>C E G</strong> becomes <strong>0, 4, 7</strong>, which matches the major chord pattern.
          </p>
          <p>
            To support inversions, the program tests each note as a possible root. That way, notes like{' '}
            <strong>E G C</strong> can still be understood as a C major chord, even though C is not the first note
            entered.
          </p>

          <h2>Version 2 Focus</h2>
          <p>Version 2 is about improving the command-line experience without changing the core chord logic too much.</p>
          <ul>
            <li>Cleaner welcome screen.</li>
            <li>Clearer input instructions.</li>
            <li>Example inputs before the user types.</li>
            <li>Better formatting for successful chord results.</li>
            <li>Better formatting for invalid notes and no-match cases.</li>
            <li>Optional repeated input loop.</li>
            <li>
              Optional exit commands such as <code>q</code> or <code>quit</code>.
            </li>
            <li>Optional help command and supported chord type display.</li>
          </ul>

          <h2>Current Limitations</h2>
          <ul>
            <li>Flats are not supported yet.</li>
            <li>Seventh, ninth, eleventh, and thirteenth chords are not supported yet.</li>
            <li>The project is CLI-only.</li>
            <li>There is no Django or web interface yet.</li>
            <li>It is still intentionally small and educational.</li>
          </ul>

          <h2>Roadmap</h2>
          <ul>
            <li>
              <strong>v1.0:</strong> Basic chord finder with major, minor, diminished, augmented, inversions, sharp
              notes, and invalid note handling. Completed.
            </li>
            <li>
              <strong>v2.0:</strong> Better CLI experience with clearer instructions, repeated input, exit/help
              commands, and better result formatting. In progress.
            </li>
            <li>
              <strong>v3.0:</strong> Flats support, including notes such as <code>Bb</code>, <code>Eb</code>, and{' '}
              <code>Ab</code>.
            </li>
            <li>
              <strong>v4.0:</strong> Extended chords such as sevenths, ninths, elevenths, and possibly thirteenths.
            </li>
            <li>
              <strong>Future:</strong> A simple web app, possibly with Django, for a more user-friendly interface.
            </li>
          </ul>

          <h2>Project Status</h2>
          <p>
            <strong>Status:</strong> Version 1 complete. Version 2 is in progress.
          </p>
          <p>
            This is a small but meaningful learning project. It is intentionally limited, but it already captures the
            core idea: basic chord recognition can be expressed clearly through intervals, patterns, and careful input
            handling.
          </p>

          <div className="related-link-card">
            <span className="small-note-kicker">Related Writing</span>
            <h2>The music theory behind the project</h2>
            <p>
              This project started from my attempt to understand chords more deeply. I wrote about the major, minor,
              augmented, and diminished patterns that Version 1 currently recognizes, and also about seventh, ninth, and
              eleventh chords that may become the theory foundation for future versions.
            </p>
            <div className="post-actions related-writing-actions">
              <Link href="/major-minor-augmented-diminished-chords.html" className="btn-primary">
                Read the basic chord article
              </Link>
              <Link href="/music-theory-chords.html" className="btn-ghost">
                Read the extended chord article
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
