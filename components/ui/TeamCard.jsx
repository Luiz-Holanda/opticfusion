'use client';

import { useMemo } from 'react';
import { MathUtils } from '@/utils/math';

/**
 * @typedef {Object} TeamCardProps
 * @property {string} name
 * @property {string} role
 * @property {string} [rm]
 * @property {string} [desc]
 * @property {string} [avatar]
 * @property {boolean} [highlighted]
 * @property {number} [order]
 * @property {number} [orderPercent]
 */
const TeamCard = ({
  name,
  role,
  rm = '',
  desc = '',
  avatar = '',
  highlighted = false,
  order,
  orderPercent,
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const badgeProgress = useMemo(() => {
    if (orderPercent === undefined || orderPercent === null) return undefined;
    return MathUtils.clamp(orderPercent, 0, 100);
  }, [orderPercent]);

  return (
    <article
      className={`team-card glass-panel ${highlighted ? 'is-highlighted' : ''}`}
      aria-labelledby={`team-${name.replace(/\s+/g, '-')}`}
      style={{
        position: 'relative',
        outline: highlighted ? '1px solid rgba(0, 212, 255, .5)' : undefined,
        boxShadow: highlighted ? '0 0 0 2px rgba(0, 212, 255, .12) inset' : undefined,
      }}
    >
      {badgeProgress !== undefined && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '3px',
            width: `${badgeProgress}%`,
            background: highlighted
              ? 'linear-gradient(90deg, var(--cyan), #ec4899)'
              : 'rgba(255,255,255,.25)',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
          }}
        />
      )}
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
      {order !== undefined && (
        <p
          className="muted"
          style={{ marginTop: '8px', marginBottom: 0, fontSize: '11px' }}
          aria-label="Ordem do integrante"
        >
          Ordem #{order} • Σ dígitos RM: {
            String(rm).replace(/[^0-9]/g, '').split('').reduce((acc, d) => acc + MathUtils.abs(Number(d) || 0), 0)
          }
        </p>
      )}
    </article>
  );
};

export { TeamCard };
