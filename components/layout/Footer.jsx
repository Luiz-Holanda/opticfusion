'use client';

import { useEffect, useState } from 'react';
import { TEAM } from '@/data/constants';

/**
 * @typedef {Object} FooterProps
 * @property {string} [logoSrc]
 * @property {string} [brandTitle]
 * @property {string} [brandHighlight]
 * @property {string} [tagline]
 * @property {{label: string, href: string}[]} [links]
 * @property {string} [legal]
 * @property {string} [techStack]
 */
const Footer = ({
  logoSrc = '/img/logo.png',
  brandTitle = 'OPTIC',
  brandHighlight = 'FUSION',
  tagline = 'Optic Fusion — Te ajudando à ver o mundo de um ângulo melhor',
  links = [
    { label: 'A Solução', href: '#solution' },
    { label: 'Público-Alvo', href: '#target-audience' },
    { label: 'Nossa Equipe', href: '#team' },
    { label: 'Contato', href: '#contact' },
  ],
  legal = '© 2026 OPTIC FUSION. Todos os direitos reservados.',
  techStack = 'Desenvolvido com Next.js, React, JavaScript e CSS Grid.',
}) => {
  const [year] = useState(() => {
    if (typeof window === 'undefined') return null;
    return new Date().getFullYear();
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  const displayYear = mounted ? (year ?? new Date().getFullYear()) : null;
  const legalText = displayYear ? legal.replace('2026', String(displayYear)) : legal;

  return (
    <footer
      className="footer"
      role="contentinfo"
      aria-label="Rodapé do site Optic Fusion"
    >
      <div className="container">
        <div className="footer-inner">
          <article className="footer-brand">
            <a href="#top" className="brand" aria-label="Voltar ao topo">
              <img
                src={logoSrc}
                alt={`Logotipo ${brandTitle} ${brandHighlight}`}
                className="brand-mark"
                width={32}
                height={32}
              />
              <span className="brand-text">
                {brandTitle} <span>{brandHighlight}</span>
              </span>
            </a>
            <p className="muted" style={{ marginTop: '12px' }}>{tagline}</p>
          </article>

          <nav className="footer-links-col" aria-label="Links rápidos do rodapé">
            <h3 style={{ fontSize: '.95rem', marginBottom: '12px', color: 'rgba(246,247,251,.85)' }}>
              Navegação
            </h3>
            <ul className="footer-links" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {links.map(({ label, href }) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="footer-legal" aria-labelledby="footer-legal-title">
            <h3
              id="footer-legal-title"
              style={{ fontSize: '.95rem', marginBottom: '12px', color: 'rgba(246,247,251,.85)' }}
            >
              Informações
            </h3>
            <p>{legalText}</p>
            <p className="muted">{techStack}</p>
            <p className="muted" style={{ fontSize: '.85rem' }}>
              {TEAM.length} integrantes • Projeto acadêmico
            </p>
          </article>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
