'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { FEATURES } from '@/data/constants';

/**
 * @typedef {Object} Feature
 * @property {string} icon
 * @property {string} title
 * @property {string} desc
 *
 * @typedef {Object} FeaturesSectionProps
 * @property {string} [kicker]
 * @property {string} [titlePrefix]
 * @property {string} [titleHighlight]
 * @property {Feature[]} [features]
 */
const FeaturesSection = ({
  kicker = 'Funcionalidades',
  titlePrefix = 'Um conjunto de IA pensado para',
  titleHighlight = 'fotografia premium',
  features = FEATURES,
}) => {
  const revealRef = useRevealAll();

  return (
    <section id="features" className="section" ref={revealRef}>
      <div className="container">
        <header className="section-head">
          <p className="kicker reveal">{kicker}</p>
          <h2 className="reveal">
            {titlePrefix} <span className="grad">{titleHighlight}</span>.
          </h2>
        </header>
        <div className="features" id="featuresList">
          {features.map(({ icon, title, desc, ...rest }) => (
            <article className="feature-card reveal" key={`${title}-${icon}`} {...rest}>
              <div className="feature-icon">{icon}</div>
              <h3 className="feature-title">{title}</h3>
              <p className="muted">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { FeaturesSection };
