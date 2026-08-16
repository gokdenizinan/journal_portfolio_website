import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-shell container">
        <div className="not-found-card reveal-up">
          <div className="not-found-status" aria-hidden="true">
            <span>GET</span>
            <strong>/missing-page</strong>
            <em>404 Not Found</em>
          </div>

          <span className="small-note-kicker">Page not found</span>
          <h1>404: This page wandered off.</h1>
          <p className="not-found-copy">The site is alive. The path just does not point anywhere useful.</p>

          <div className="not-found-note">
            <span className="not-found-note-label">Small note</span>
            <p>
              404 comes from HTTP status codes. The first 4 means the problem is on the client/request side, and 04
              identifies “not found”.
            </p>
          </div>

          <div className="not-found-actions" aria-label="Helpful links">
            <Link href="/index.html" className="btn-primary">
              Go home
            </Link>
            <Link href="/writings.html" className="btn-ghost">
              Read writings
            </Link>
            <a href="/index.html#work" className="btn-ghost">
              View projects
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
