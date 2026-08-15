import type { Metadata } from 'next';
import Link from 'next/link';
import { revealDelay } from '@/lib/styles';

export const metadata: Metadata = {
  title: 'Music',
  description: 'Published songs and artist profiles for Gökdeniz İnan.',
  alternates: {
    canonical: '/music',
  },
};

const platforms = [
  {
    name: 'Spotify',
    className: 'spotify-card',
    logoClassName: 'spotify-logo',
    href: 'https://open.spotify.com/intl-tr/artist/78fBgtsBVKMD5eGsrqEYIz?si=etJJXqFrTKmdIUxs4ehf7w',
    title: 'Listen on Spotify',
    copy: 'Follow my artist profile and listen to my published songs.',
    action: 'Open Spotify →',
  },
  {
    name: 'Deezer',
    className: 'deezer-card',
    logoClassName: 'deezer-logo',
    href: 'https://www.deezer.com/tr/artist/392680771',
    title: 'Listen on Deezer',
    copy: 'Find my artist page and releases on Deezer.',
    action: 'Open Deezer →',
  },
  {
    name: 'YouTube Music',
    className: 'youtube-card',
    logoClassName: 'youtube-logo',
    href: 'https://music.youtube.com/@tunesbygokdeniz',
    title: 'Listen on YouTube Music',
    copy: 'Listen through my YouTube Music artist channel.',
    action: 'Open YouTube Music →',
  },
];

export default function MusicPage() {
  return (
    <main>
      <header className="page-header">
        <div className="container">
          <span className="section-label reveal-up" style={revealDelay('0ms')}>
            Music
          </span>
          <h1 className="page-title reveal-up" style={revealDelay('80ms')}>
            Tunes by
            <br />
            <em>Gökdeniz.</em>
          </h1>
          <p className="page-sub reveal-up" style={revealDelay('160ms')}>
            I also have two published songs. You can listen on Spotify, Deezer, and YouTube Music.
          </p>
        </div>
      </header>

      <section className="music-page">
        <div className="container">
          <div className="music-platforms">
            {platforms.map((platform) => (
              <Link
                className={`music-card ${platform.className} reveal-up`}
                href={platform.href}
                key={platform.name}
                target="_blank"
                rel="noopener"
              >
                <span className={`music-logo ${platform.logoClassName}`} aria-hidden="true">
                  {platform.logoClassName === 'deezer-logo' ? (
                    <>
                      <i />
                      <i />
                      <i />
                      <i />
                    </>
                  ) : null}
                </span>
                <div>
                  <span className="music-kicker">{platform.name}</span>
                  <h2>{platform.title}</h2>
                  <p>{platform.copy}</p>
                </div>
                <span className="music-card-action">{platform.action}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
