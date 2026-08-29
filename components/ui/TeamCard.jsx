'use client';

/**
 * @typedef {Object} TeamCardProps
 * @property {string} name
 * @property {string} role
 * @property {string} [rm]
 * @property {string} [desc]
 * @property {string} [avatar]
 */
const TeamCard = ({ name, role, rm = '', desc = '', avatar = '' }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article className="team-card glass-panel" aria-labelledby={`team-${name.replace(/\s+/g, '-')}`}>
      <div className="team-avatar" aria-hidden="true">
        {avatar ? (
          <img src={avatar} alt={`Foto de ${name}`} className="team-avatar-img" />
        ) : (
          <span className="team-initials">{initials}</span>
        )}
      </div>
      <h3 id={`team-${name.replace(/\s+/g, '-')}`} className="team-name">{name}</h3>
      <p className="team-role">{role}</p>
      {rm && <p className="team-rm muted">RM: {rm}</p>}
      {desc && <p className="team-desc muted">{desc}</p>}
    </article>
  );
};

export { TeamCard };
