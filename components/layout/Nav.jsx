'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NAV_LINKS } from '@/data/constants';
import { Button } from '@/components/ui/Button.jsx';
import { MathUtils } from '@/utils/math';
import { useLocalStorage } from '@/hooks/useLocalStorage';

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
  const { value: lastVisit, setValue: setLastVisit } = useLocalStorage('opticfusion:last-visit', null);
  const { value: visitCount, setValue: setVisitCount } = useLocalStorage('opticfusion:visit-count', 0);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const totalLinks = useMemo(() => links.length, [links]);
  const visitNumber = useMemo(
    () => MathUtils.round(Number(visitCount) || 0, 0),
    [visitCount]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const nowIso = new Date().toISOString();
    const isNewVisit = !lastVisit
      || (Date.now() - new Date(lastVisit).getTime()) > MathUtils.pow(60, 2) * 1000;

    if (isNewVisit) {
      setVisitCount(MathUtils.round(Number(visitCount) || 0, 0) + 1);
      setLastVisit(nowIso);
    }
  }, [lastVisit, setLastVisit, setVisitCount, visitCount]);

  const onScroll = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledY = window.scrollY;
    const pct = docHeight > 0
      ? MathUtils.clamp(MathUtils.percentage(scrolledY, docHeight), 0, 100)
      : 0;
    setScrollProgress(pct);
    setScrolled(scrolledY > MathUtils.max(10, 1));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    const handle = requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(handle);
    };
  }, [onScroll]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  const goToLogin = useCallback(() => {
    closeMenu();
    onOpenLogin();
  }, [closeMenu, onOpenLogin]);

  const goToRM = useCallback(() => {
    closeMenu();
    onOpenRMLookup();
  }, [closeMenu, onOpenRMLookup]);

  return (
    <nav
      id="navbar"
      className={`nav nav--premium ${scrolled ? 'nav--scrolled' : ''}`}
      aria-label="Menu principal"
    >
      <div
        className="nav-progress"
        role="progressbar"
        aria-label="Progresso de rolagem"
        aria-valuenow={MathUtils.round(scrollProgress, 0)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--cyan), #8b5cf6, #ec4899)',
          transition: 'width 120ms linear',
          zIndex: 30,
        }}
      />
      <div className="container nav-inner">
        <Link
          className="brand"
          href="#top"
          aria-label={`${brandTitle} ${brandHighlight}`}
          onClick={closeMenu}
          title={isMounted && lastVisit ? `Última visita: ${new Date(lastVisit).toLocaleString('pt-BR')}` : undefined}
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
          <div
            className="muted"
            style={{
              fontSize: '11px',
              marginRight: '10px',
              textAlign: 'right',
              lineHeight: 1.2,
              display: (isMounted && visitNumber > 0) ? 'block' : 'none',
            }}
            aria-label={`Visitante número ${isMounted ? visitNumber : 0}`}
          >
            Visita #{isMounted ? visitNumber : 0}
            <br />
            <span style={{ opacity: .7 }}>{totalLinks} seções</span>
          </div>
          <Button variant="ghost" onClick={goToRM} type="button">
            Consultar RM
          </Button>
          <Button variant="primary" onClick={goToLogin} type="button">
            Acesso interno
          </Button>
        </div>
      </div>
    </nav>
  );
};

export { Nav };
