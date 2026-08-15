import Link from 'next/link';
import type { Writing } from '@/lib/writings';

type SmallNoteCardProps = {
  note: Writing;
};

export function SmallNoteCard({ note }: SmallNoteCardProps) {
  return (
    <Link href={`/${note.slug}.html`} className="small-note-card small-note-card-empty reveal-up">
      <span className="small-note-kicker">{note.category}</span>
      <h2>{note.title}</h2>
      <p>{note.description}</p>
    </Link>
  );
}
