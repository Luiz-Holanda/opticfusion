'use client';

/**
 * @typedef {Object} FooterProps
 * @property {string} [logoSrc]
 * @property {string} [brandTitle]
 * @property {string} [brandHighlight]
 * @property {string} [tagline]
 * @property {{label:string,href:string}[]} [links]
 * @property {string} [legal]
 * @property {string} [techStack]
 */
const Footer = ({
  logoSrc = '/img/logo.png',
  brandTitle = 'OPTIC',
  brandHighlight = 'FUSION',
  tagline = 'Optic Fusion — Te ajudando à ver o mundo de um ângulo melhor',
  links = [
    { label: 'Problema', href: '#problem' },
    { label: 'Demonstração', href: '#demo' },
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Early access', href: '#early' },
  ],
  legal = '© 2026 OPTIC FUSION. All rights reserved.',
  techStack = 'Feito com HTML + CSS + JavaScript puro.',
}) => {
  return (
    <footer className="footer footer--premium">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand brand--footer">
            <img src={logoSrc} alt="Logo" className="brand-mark" />
            <span className="brand-text">
              {brandTitle}
              <span>{brandHighlight}</span>
            </span>
          </div>
          <p className="muted">{tagline}</p>
        </div>

        <div className="footer-links" aria-label="Links">
          {links.map(({ label, href }) => (
            <a key={`${href}-${label}`} href={href}>
              {label}
            </a>
          ))}
        </div>

        <div className="footer-legal muted">
          <p>{legal}</p>
          <p>{techStack}</p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
