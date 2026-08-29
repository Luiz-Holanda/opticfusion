'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { TEAM } from '@/data/constants';
import { TeamCard } from '@/components/ui/TeamCard.jsx';

/**
 * @typedef {Object} TeamMember
 * @property {string} name
 * @property {string} rm
 * @property {string} role
 * @property {string} [desc]
 *
 * @typedef {Object} TeamSectionProps
 * @property {string} [kicker]
 * @property {string} [title]
 * @property {string} [description]
 * @property {TeamMember[]} [members]
 */
const TeamSection = ({
  kicker = 'Nossa Equipe',
  title = 'Os integrantes por trás da Optic Fusion',
  description = 'Um time multidisciplinar de estudantes comprometidos com inovação, pesquisa e entrega de qualidade.',
  members = TEAM,
}) => {
  const revealRef = useRevealAll();

  return (
    <section
      id="team"
      className="section section--wide"
      ref={revealRef}
      aria-labelledby="team-title"
    >
      <div className="container">
        <header className="section-head">
          <p className="kicker reveal">{kicker}</p>
          <h2 id="team-title" className="reveal">{title}</h2>
          <p className="muted reveal">{description}</p>
        </header>

        <div className="team-grid" role="list">
          {members.map((member, idx) => (
            <div className="team-wrap reveal" role="listitem" key={`team-${idx}`}>
              <TeamCard
                name={member.name}
                role={member.role}
                rm={member.rm}
                desc={member.desc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { TeamSection };
