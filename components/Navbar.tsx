'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navItems } from '@/lib/site';

function isActive(pathname: string, match: string): boolean {
  const normalizedPathname = pathname.replace(/\.html$/, '');

  if (match === 'work' || match === 'about') return normalizedPathname === '/';
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

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
            <Link key={item.label} href={item.href} className={isActive(pathname, item.match) ? 'active' : undefined}>
              {item.label}
            </Link>
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
          <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
