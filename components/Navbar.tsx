'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navItems } from '@/lib/site';

type NavItem = (typeof navItems)[number];

function isActive(pathname: string, hash: string, match: string): boolean {
  const normalizedPathname = pathname.replace(/\.html$/, '');
  const isHome = normalizedPathname === '/' || normalizedPathname === '/index';

  if (match === 'work' || match === 'about') {
    return isHome && hash === `#${match}`;
  }
  if (match === 'writings') {
    return (
      normalizedPathname === '/writings' ||
      normalizedPathname.includes('chords') ||
      normalizedPathname.includes('airtag') ||
      normalizedPathname.includes('switzerland')
    );
  }
  return normalizedPathname === `/${match}`;
}

function NavigationLink({ item, active = false, onClick }: { item: NavItem; active?: boolean; onClick?: () => void }) {
  const className = active ? 'active' : undefined;

  if (item.href.includes('#')) {
    return (
      <a href={item.href} className={className} onClick={onClick}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav id="navbar" className={isScrolled ? 'scrolled' : undefined}>
        <Link href="/index.html" className="nav-logo" onClick={() => setIsOpen(false)}>
          GI
        </Link>
        <div className="nav-links">
          {navItems.map((item) => (
            <NavigationLink key={item.label} item={item} active={isActive(pathname, activeHash, item.match)} />
          ))}
        </div>
        <button
          className={`nav-toggle${isOpen ? ' open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${isOpen ? ' open' : ''}`} id="mobileMenu">
        {navItems.map((item) => (
          <NavigationLink key={item.label} item={item} onClick={() => setIsOpen(false)} />
        ))}
      </div>
    </>
  );
}
