'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { Button } from '@/components/ui/Button.jsx';
import { useEffect, useState } from 'react';
import { HERO_STATS_LABELS, SOLUTION_ASIDE_FACTS } from '@/data/constants';

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
 * @property {string} [asideTitle]
 * @property {string[]} [asideFacts]
 */
const Hero = ({
  kicker = 'OPTIC FUSION',
  titlePrefix = 'Fotografia inteligente',
  titleHighlight = 'movida por IA',
  subtitle = 'A câmera que entende o momento perfeito, ajusta o enquadramento em tempo real e transforma qualquer captura em algo impecável — sem edição posterior.',
  primaryCtaLabel = 'Quero testar a Optic Fusion assistent',
  primaryCtaHref = '#solution',
  secondaryCtaLabel = 'Ver demonstração',
  secondaryCtaHref = '#demo',
  trustBadges = ['Real‑time guidance', 'Auto‑correction', 'Premium optics'],
  scrollHint = 'scroll',
  asideTitle = 'Por que usar?',
  asideFacts = SOLUTION_ASIDE_FACTS,
}) => {
  const revealRef = useRevealAll();
  const [stats, setStats] = useState(
    HERO_STATS_LABELS.map((label) => ({ number: 0, label }))
  );

  useEffect(() => {
    const target = HERO_STATS_LABELS.map((label) => {
      let min = 60;
      let max = 95;
      if (label.includes('Tempo')) {
        min = 40;
        max = 80;
      } else if (label.includes('Qualidade')) {
        min = 70;
        max = 95;
      } else if (label.includes('Tentativas')) {
        min = 65;
        max = 88;
      }
      const value = Math.floor(Math.random() * (max - min + 1)) + min;
      return Math.min(Math.max(value, min), max);
    });

    const duration = 1400;
    const steps = 28;
    const stepTime = Math.round(duration / steps);
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setStats(
        target.map((finalVal, idx) => ({
          number: Math.round(finalVal * eased),
          label: HERO_STATS_LABELS[idx],
        }))
      );

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero hero--cinematic"
      id="top"
      aria-labelledby="hero-title"
    >
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-noise"></div>
        <div className="hero-orbs"></div>
        <div className="hero-particles"></div>
      </div>

      <div className="container hero-inner" ref={revealRef}>
        <div className="hero-copy">
          <p className="kicker reveal">{kicker}</p>
          <h1 id="hero-title" className="reveal">
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

          <div
            className="hero-stats reveal"
            aria-label="Métricas de impacto da solução"
            role="group"
          >
            {stats.map((stat, idx) => (
              <article className="stat-card" key={`stat-${idx}`}>
                <span
                  className="stat-number"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {stat.number}%
                </span>
                <p className="stat-label">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="device anim-float" aria-hidden="true">
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

          <aside
            className="solution-aside"
            aria-labelledby="hero-aside-title"
            style={{ display: 'none' }}
          >
            <div className="solution-aside-card">
              <h2 id="hero-aside-title" className="solution-aside-title">{asideTitle}</h2>
              <ul className="fact-list">
                {asideFacts.map((fact, idx) => (
                  <li className="fact-item" key={`hf-${idx}`}>
                    <span className="fact-check" aria-hidden="true">✓</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">{scrollHint}</div>
    </section>
  );
};

export { Hero };
