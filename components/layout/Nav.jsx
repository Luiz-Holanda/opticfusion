'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/data/constants';
import { Button } from '@/components/ui/Button.jsx';

/**
 * @typedef {Object} NavProps
 * @property {() => void} [onOpenLogin]
 * @property {() => void} [onOpenRMLookup]
 * @property {{label:string,href:string}[]} [links]
 * @property {string} [brandLogo]
 * @property {string} [brandTitle]
 * @property {string} [brandHighlight]
 */
const Nav = ({
  onOpenLogin = () => {},
  onOpenRMLookup = () => {},
  links = NAV_LINKS,
  brandLogo = '/img/logo.png',
  brandTitle = 'OPTIC',
  brandHighlight = 'FUSION',
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav
      id="navbar"
      className={`nav nav--premium ${scrolled ? 'nav--scrolled' : ''}`}
      aria-label="Menu principal"
    >
      <div className="container nav-inner">
        <Link
          className="brand"
          href="#top"
          aria-label={`${brandTitle} ${brandHighlight}`}
          onClick={closeMenu}
        >
          <img src={brandLogo} alt="Logo" className="brand-mark" />
          <span className="brand-text">
            {brandTitle}
            <span>{brandHighlight}</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          id="navToggle"
          aria-expanded={menuOpen}
          aria-label="Abrir menu"
          onClick={toggleMenu}
        >
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
          {links.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              <Link href={link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          <Button variant="ghost" asLink href="#early" onClick={closeMenu}>
            Early Access
          </Button>
          <Button variant="primary" asLink href="#early" onClick={closeMenu}>
            Solicitar demo
          </Button>
        </div>
      </div>
    </nav>
  );
};

export { Nav };
