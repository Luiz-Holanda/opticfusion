'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { PAIN_POINTS } from '@/data/constants';

/**
 * @typedef {Object} PainPoint
 * @property {'tilt'|'crop'|'light'} variant
 * @property {string} title
 * @property {string} desc
 *
 * @typedef {Object} ProblemSectionProps
 * @property {string} [kicker]
 * @property {string} [title]
 * @property {string} [description]
 * @property {PainPoint[]} [items
 */
const ProblemSection = ({
  kicker = 'O problema',
  title = 'Você já perdeu uma foto perfeita por um pequeno detalhe?',
  description = 'Um recorte errado. Um ângulo torto. Uma luz que estoura. Na hora do “clique”, o momento passa — e a lembrança fica imperfeita.',
  items = PAIN_POINTS,
}) => {
  const revealRef = useRevealAll();

  return (
    <section id="problem" className="section section--wide" ref={revealRef}>
      <div className="container">
        <header className="section-head">
          <p className="kicker reveal">{kicker}</p>
          <h2 className="reveal">{title}</h2>
          <p className="muted reveal">{description}</p>
        </header>

        <div className="pain-points">
          {items.map(({ variant, title: itemTitle, desc, ...rest }) => (
            <article className="shot-card reveal" key={`${variant}-${itemTitle}`} {...rest}>
              <div className={`shot shot--${variant}`} aria-hidden="true"></div>
              <h3>{itemTitle}</h3>
              <p className="muted">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProblemSection };
