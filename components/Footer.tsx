import Link from 'next/link';
import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <span className="footer-name">{site.name}</span>
          <div className="footer-links">
            <Link href={site.github} target="_blank" rel="noopener">
              GitHub
            </Link>
            <Link href={site.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </Link>
            <Link href={`mailto:${site.email}`}>Email</Link>
          </div>
          <span className="footer-copy">© 2026</span>
        </div>
      </div>
    </footer>
  );
}
