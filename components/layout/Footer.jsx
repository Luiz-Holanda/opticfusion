'use client';

import Link from 'next/link';
import { TEAM } from '@/data/constants';


const Footer = ({
  logoSrc = '/img/logo.png',
  brandTitle = 'OPTIC',
  brandHighlight = 'FUSION',
  tagline = 'Optic Fusion — Te ajudando a ver o mundo de um ângulo melhor.',
  links = [
    { label: 'A Solução', href: '/#solution' },
    { label: 'Público-Alvo', href: '/#target-audience' },
    { label: 'Nossa Equipe', href: '/#team' },
    { label: 'Consulta RM', href: '/consulta-rm' },
    { label: 'Área Interna', href: '/login' },
  ],
  legal = '© 2026 OPTIC FUSION. Todos os direitos reservados.',
  techStack = 'Desenvolvido com Next.js, React, Tailwind CSS e API Routes.',
}) => {
  return (
    <footer
      className="footer"
      role="contentinfo"
      aria-label="Rodapé do site Optic Fusion"
    >
      <div className="container">
        <div className="footer-inner">
          <article className="footer-brand">
            <Link href="/#top" className="brand" aria-label="Voltar ao topo">
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
            </Link>
            <p className="muted" style={{ marginTop: '12px' }}>{tagline}</p>
          </article>

          <nav className="footer-links-col" aria-label="Links rápidos do rodapé">
            <h3 style={{ fontSize: '.95rem', marginBottom: '12px', color: 'rgba(246,247,251,.85)' }}>
              Navegação
            </h3>
            <ul className="footer-links" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
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
            <p>{legal}</p>
            <p className="muted">{techStack}</p>
            <p className="muted" style={{ fontSize: '.85rem' }}>
              {TEAM.length} integrantes • Projeto acadêmico Sprint 4
            </p>
          </article>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
