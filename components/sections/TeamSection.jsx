'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { TEAM } from '@/data/constants';
import { TeamCard } from '@/components/ui/TeamCard.jsx';
import { useCallback, useMemo } from 'react';
import { MathUtils } from '@/utils/math';
import { useLocalStorage } from '@/hooks/useLocalStorage';

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
 * @property {(member: TeamMember) => void} [onMemberSelect]
 */
const TeamSection = ({
  kicker = 'Nossa Equipe',
  title = 'Os integrantes por trás da Optic Fusion',
  description = 'Um time multidisciplinar de estudantes comprometidos com inovação, pesquisa e entrega de qualidade.',
  members = TEAM,
  onMemberSelect = () => {},
}) => {
  const revealRef = useRevealAll();

  const {
    value: favoriteIdx,
    setValue: setFavoriteIdx,
    removeValue: clearFavorite,
  } = useLocalStorage('opticfusion:favorite-member', null);

  const teamStats = useMemo(() => {
    const rmValues = members
      .map((m) => Number(String(m.rm).replace(/[^0-9]/g, '')) || 0)
      .filter((n) => n > 0);
    const total = rmValues.length;
    const sum = rmValues.reduce((acc, n) => acc + n, 0);
    const average = total > 0 ? MathUtils.average(...rmValues) : 0;
    const min = total > 0 ? MathUtils.min(...rmValues) : 0;
    const max = total > 0 ? MathUtils.max(...rmValues) : 0;
    const span = max - min;
    return {
      total,
      sum,
      average: MathUtils.round(average, 2),
      min,
      max,
      span,
      sumDigits: String(sum).split('').reduce((a, d) => a + MathUtils.abs(Number(d) || 0), 0),
      rmGCD: total >= 2
        ? rmValues.reduce((acc, n, i) => (i === 0 ? n : MathUtils.GCD(acc, n)), 0)
        : 0,
    };
  }, [members]);

  const handleMemberClick = useCallback(
    (member, idx) => {
      setFavoriteIdx(idx);
      onMemberSelect({ ...member });
    },
    [setFavoriteIdx, onMemberSelect]
  );

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
          <p
            className="muted reveal"
            style={{ marginTop: '10px', fontSize: '13px' }}
            aria-label="Estatísticas da equipe"
          >
            {teamStats.total} integrantes • RM médio: <strong>{teamStats.average}</strong>
            {' '}• Mín/RM: {teamStats.min} • Máx/RM: {teamStats.max}
            {' '}• Amplitude: {teamStats.span} • Soma dígitos (Σ RM): {teamStats.sumDigits}
            • MDC RMs: {teamStats.rmGCD}
          </p>
          {favoriteIdx !== null && members[favoriteIdx] && (
            <div
              className="reveal row"
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '10px',
                padding: '10px 14px',
                background: 'rgba(0, 212, 255, .08)',
                borderRadius: '12px',
                border: '1px solid rgba(0, 212, 255, .15)',
              }}
              role="status"
              aria-live="polite"
            >
              <p style={{ margin: 0, fontSize: '13px' }}>
                ⭐ Membro destaque salvo: <strong>{members[favoriteIdx].name}</strong>
                {' '}<span className="muted">({members[favoriteIdx].role})</span>
              </p>
              <button
                type="button"
                onClick={clearFavorite}
                style={{
                  background: 'none',
                  border: '1px solid var(--border)',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  color: 'var(--muted)',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Limpar destaque
              </button>
            </div>
          )}
        </header>

        <div className="team-grid" role="list">
          {members.map((member, idx) => {
            const orderPct = MathUtils.percentage(idx + 1, MathUtils.max(members.length, 1));
            const isFavorite = favoriteIdx === idx;
            return (
              <div
                className={`team-wrap reveal ${isFavorite ? 'is-favorite' : ''}`}
                role="listitem"
                key={`team-${idx}`}
                onClick={() => handleMemberClick(member, idx)}
                style={{ cursor: 'pointer' }}
                title={`Ordem ${idx + 1}/${members.length} (${MathUtils.round(orderPct, 0)}%)${isFavorite ? ' • Destaque' : ''}`}
              >
                <TeamCard
                  name={member.name}
                  role={member.role}
                  rm={member.rm}
                  desc={member.desc}
                  highlighted={isFavorite}
                  order={idx + 1}
                  orderPercent={MathUtils.round(orderPct, 0)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { TeamSection };
