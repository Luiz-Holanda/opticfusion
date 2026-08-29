'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { TARGET_AUDIENCE } from '@/data/constants';
import { useCallback, useMemo } from 'react';
import { MathUtils } from '@/utils/math';
import { useLocalStorage } from '@/hooks/useLocalStorage';

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
 * @property {(profile: AudienceItem, idx: number) => void} [onProfileSelect]
 */
const TargetAudienceSection = ({
  kicker = 'Público-Alvo',
  title = 'Quem se beneficia com a Optic Fusion?',
  description = 'Nossa solução foi pensada para diferentes perfis — de quem tira fotos no dia a dia até profissionais que buscam excelência sem complicação.',
  items = TARGET_AUDIENCE,
  onProfileSelect = () => {},
}) => {
  const revealRef = useRevealAll();

  const {
    value: selectedProfileIdx,
    setValue: setSelectedProfileIdx,
    removeValue: clearSelectedProfile,
  } = useLocalStorage('opticfusion:audience-profile', null);

  const profileWeights = useMemo(() => {
    const weights = items.map((_, idx) => {
      const reverse = items.length - idx;
      return MathUtils.abs(reverse) + 1;
    });
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    return items.map((item, idx) => {
      const pct = MathUtils.percentage(weights[idx], totalWeight);
      return {
        ...item,
        weight: weights[idx],
        sharePercent: MathUtils.round(pct, 1),
        normalized: MathUtils.normalize(weights[idx], MathUtils.min(...weights), MathUtils.max(...weights)),
      };
    });
  }, [items]);

  const totalProfiles = useMemo(() => profileWeights.length, [profileWeights]);
  const avgShare = useMemo(
    () => MathUtils.round(MathUtils.average(...profileWeights.map((p) => p.sharePercent)), 1),
    [profileWeights]
  );
  const avgShareSqrt = useMemo(() => MathUtils.sqrt(avgShare), [avgShare]);

  const handleSelect = useCallback(
    (p, idx) => {
      setSelectedProfileIdx(idx);
      onProfileSelect({ ...p }, idx);
    },
    [setSelectedProfileIdx, onProfileSelect]
  );

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
          <p
            className="muted reveal"
            style={{ marginTop: '10px', fontSize: '13px' }}
            aria-label="Distribuição do público-alvo"
          >
            {totalProfiles} perfis • Part. média: <strong>{avgShare}%</strong>
            {' '}• √partic. média ≈ {MathUtils.round(avgShareSqrt, 2)}
          </p>
          {selectedProfileIdx !== null && profileWeights[selectedProfileIdx] && (
            <div
              className="reveal"
              style={{
                marginTop: '10px',
                padding: '10px 14px',
                background: 'rgba(139, 92, 246, .08)',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, .18)',
              }}
              role="status"
              aria-live="polite"
            >
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, fontSize: '13px' }}>
                  👉 Perfil salvo: <strong>{profileWeights[selectedProfileIdx].title}</strong>
                  {' '}<span className="muted">(part. {profileWeights[selectedProfileIdx].sharePercent}%)</span>
                </p>
                <button
                  type="button"
                  onClick={clearSelectedProfile}
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
                  Limpar
                </button>
              </div>
            </div>
          )}
        </header>

        <div className="audience-grid" role="list">
          {profileWeights.map(({ icon, title: itemTitle, desc, sharePercent, normalized, weight }, idx) => {
            const isSelected = selectedProfileIdx === idx;
            const barPct = MathUtils.clamp(
              MathUtils.map(normalized, 0, 1, 30, 100),
              0,
              100
            );
            return (
              <article
                className={`audience-card reveal ${isSelected ? 'is-selected' : ''}`}
                role="listitem"
                key={`audience-${idx}`}
                onClick={() => handleSelect({ icon, title: itemTitle, desc }, idx)}
                style={{ cursor: 'pointer' }}
                title={`Peso #${weight} • Share ${sharePercent}%`}
              >
                <div
                  aria-hidden="true"
                  style={{
                    height: '3px',
                    width: `${barPct}%`,
                    background: 'linear-gradient(90deg, #8b5cf6, var(--cyan))',
                    borderRadius: '2px',
                    marginBottom: '12px',
                    opacity: isSelected ? 1 : .85,
                  }}
                />
                <div className="audience-icon" aria-hidden="true">{icon}</div>
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3>{itemTitle}</h3>
                  <span
                    className="pill"
                    style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      background: isSelected ? 'rgba(139, 92, 246, .18)' : 'rgba(255,255,255,.06)',
                    }}
                  >
                    {sharePercent}%
                  </span>
                </div>
                <p className="muted">{desc}</p>
                <p
                  className="muted"
                  style={{
                    fontSize: '11px',
                    marginTop: '6px',
                    marginBottom: 0,
                  }}
                  aria-label="Indicadores do perfil"
                >
                  W={weight} • N={MathUtils.round(normalized, 2)}
                  {' '}• √W ≈ {MathUtils.round(MathUtils.sqrt(weight), 2)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { TargetAudienceSection };
