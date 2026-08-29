'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { TARGET_AUDIENCE } from '@/data/constants';

/**
 * @typedef {Object} AudienceItem
 * @property {string} icon
 * @property {string} title
 * @property {string} desc
 *
 * @typedef {Object} TargetAudienceSectionProps
 * @property {string} [kicker]
 * @property {string} [title]
 * @property {string} [description]
 * @property {AudienceItem[]} [items]
 */
const TargetAudienceSection = ({
  kicker = 'Público-Alvo',
  title = 'Quem se beneficia com a Optic Fusion?',
  description = 'Nossa solução foi pensada para diferentes perfis — de quem tira fotos no dia a dia até profissionais que buscam excelência sem complicação.',
  items = TARGET_AUDIENCE,
}) => {
  const revealRef = useRevealAll();

  return (
    <section
      id="target-audience"
      className="section section--wide"
      ref={revealRef}
      aria-labelledby="audience-title"
    >
      <div className="container">
        <header className="section-head">
          <p className="kicker reveal">{kicker}</p>
          <h2 id="audience-title" className="reveal">{title}</h2>
          <p className="muted reveal">{description}</p>
        </header>

        <div className="audience-grid" role="list">
          {items.map(({ icon, title: itemTitle, desc }, idx) => (
            <article className="audience-card reveal" role="listitem" key={`audience-${idx}`}>
              <div className="audience-icon" aria-hidden="true">{icon}</div>
              <h3>{itemTitle}</h3>
              <p className="muted">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { TargetAudienceSection };
