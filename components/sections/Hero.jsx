'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { Button } from '@/components/ui/Button.jsx';

/**
 * @typedef {Object} HeroProps
 * @property {string} [kicker]
 * @property {string} [titlePrefix]
 * @property {string} [titleHighlight]
 * @property {string} [subtitle]
 * @property {string} [primaryCtaLabel]
 * @property {string} [primaryCtaHref]
 * @property {string} [secondaryCtaLabel]
 * @property {string} [secondaryCtaHref]
 * @property {string[]} [trustBadges]
 * @property {string} [scrollHint]
 */
const Hero = ({
  kicker = 'OPTIC FUSION',
  titlePrefix = 'Fotografia inteligente',
  titleHighlight = 'movida por IA',
  subtitle = 'A câmera que entende o momento perfeito, ajusta o enquadramento em tempo real e transforma qualquer captura em algo impecável.',
  primaryCtaLabel = 'Quero testar a Optic Fusion assistent',
  primaryCtaHref = '#early',
  secondaryCtaLabel = 'Ver demonstração',
  secondaryCtaHref = '#demo',
  trustBadges = ['Real‑time guidance', 'Auto‑correction', 'Premium optics'],
  scrollHint = 'scroll',
}) => {
  const revealRef = useRevealAll();

  return (
    <header className="hero hero--cinematic" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-noise"></div>
        <div className="hero-orbs"></div>
        <div className="hero-particles"></div>
      </div>

      <div className="container hero-inner" ref={revealRef}>
        <div className="hero-copy">
          <p className="kicker reveal">{kicker}</p>
          <h1 className="reveal">
            {titlePrefix}
            <br />
            <span className="grad">{titleHighlight}</span>.
          </h1>
          <p className="subhead reveal">{subtitle}</p>

          <div className="hero-actions reveal">
            <Button variant="primary" size="lg" asLink href={primaryCtaHref}>
              {primaryCtaLabel}
            </Button>
            <Button variant="ghost" size="lg" asLink href={secondaryCtaHref}>
              {secondaryCtaLabel}
            </Button>
          </div>

          <div className="trust reveal" aria-label="Selos de confiança">
            {trustBadges.map((badge) => (
              <span className="pill" key={badge}>{badge}</span>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="device anim-float">
            <div className="device-frame"></div>
            <div className="device-screen">
              <div className="hud">
                <div className="hud-top">
                  <span className="hud-dot"></span>
                  <span className="hud-text">AI ACTIVE</span>
                </div>
                <div className="hud-guides">
                  <span className="guide h"></span>
                  <span className="guide v"></span>
                  <span className="corner tl"></span>
                  <span className="corner tr"></span>
                  <span className="corner bl"></span>
                  <span className="corner br"></span>
                </div>
                <div className="hud-bottom">
                  <span className="meter"></span>
                  <span className="meter"></span>
                  <span className="meter"></span>
                </div>
              </div>
            </div>
            <div className="device-glow"></div>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">{scrollHint}</div>
    </header>
  );
};

export { Hero };
