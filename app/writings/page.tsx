import type { Metadata } from 'next';
import { SmallNoteCard } from '@/components/SmallNoteCard';
import { WritingsArchive } from '@/components/WritingsArchive';
import { revealDelay } from '@/lib/styles';
import { getEssays, getSmallNotes } from '@/lib/writings';

export const metadata: Metadata = {
  title: 'Writings',
  description: 'Deep-dives on technology, economics, and how systems work.',
  alternates: {
    canonical: '/writings',
  },
};

export default function WritingsPage() {
  const essays = getEssays();
  const notes = getSmallNotes();

  return (
    <main>
      <header className="page-header">
        <div className="container">
          <span className="section-label reveal-up" style={revealDelay('0ms')}>
            Writings
          </span>
          <h1 className="page-title reveal-up" style={revealDelay('80ms')}>
            Things I&apos;ve learned,
            <br />
            <em>written down.</em>
          </h1>
          <p className="page-sub reveal-up" style={revealDelay('160ms')}>
            Long-form essays and shorter notes on music, systems, language, and small curiosities.
          </p>
        </div>
      </header>

      <section className="writing-updates">
        <div className="container">
          <div className="writing-updates-card reveal-up">
            <div className="writing-updates-copy">
              <span className="small-note-kicker">Email Updates</span>
              <h2>Get new writings in your inbox.</h2>
              <p>Leave your email and Buttondown will notify you when I publish a new essay or note.</p>
            </div>
            <div className="writing-updates-cta" aria-labelledby="writingUpdatesTitle">
              <span className="writing-updates-eyebrow">Handled by Buttondown</span>
              <h3 id="writingUpdatesTitle">Subscribe from the official page</h3>
              <p>
                Buttondown handles the signup, spam check, and confirmation email there. After subscribing, open the
                confirmation link in your inbox to start receiving new writing.
              </p>
              <div className="writing-updates-actions">
                <a
                  className="btn-primary"
                  href="https://buttondown.com/gokdenizinan#subscribe-form"
                  target="_blank"
                  rel="noopener"
                >
                  Subscribe on Buttondown
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WritingsArchive essays={essays} />

      <section className="small-notes-section" id="small-notes">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Small Notes</span>
          </div>
          <div className="small-notes-grid">
            {notes.map((note) => (
              <SmallNoteCard key={note.slug} note={note} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
