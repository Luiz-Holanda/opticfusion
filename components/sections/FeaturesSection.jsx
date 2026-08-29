'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { FEATURES } from '@/data/constants';
import { useCallback, useMemo } from 'react';
import { MathUtils } from '@/utils/math';
import { useLocalStorage } from '@/hooks/useLocalStorage';

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
 * @property {(feature: Feature, idx: number) => void} [onFeatureSelect]
 */
const FeaturesSection = ({
  kicker = 'Funcionalidades',
  titlePrefix = 'Um conjunto de IA pensado para',
  titleHighlight = 'fotografia premium',
  features = FEATURES,
  onFeatureSelect = () => {},
}) => {
  const revealRef = useRevealAll();

  const {
    value: pinnedFeatures,
    setValue: setPinnedFeatures,
    removeValue: resetPinned,
  } = useLocalStorage('opticfusion:pinned-features', []);

  const gridMetrics = useMemo(() => {
    const total = features.length;
    const colsLower = MathUtils.floor(MathUtils.sqrt(total));
    const colsUpper = MathUtils.ceil(MathUtils.sqrt(total));
    const bestCols = MathUtils.clamp(colsLower * colsUpper >= total ? colsLower : colsUpper, 2, 3);
    return {
      total,
      sqrt: MathUtils.round(MathUtils.sqrt(total), 2),
      cbrt: MathUtils.round(MathUtils.cbrt(total), 2),
      bestCols,
      rows: MathUtils.ceil(total / bestCols),
      areaCells: MathUtils.ceil(bestCols * MathUtils.ceil(total / bestCols)),
      areaCircleEq: MathUtils.round(MathUtils.circleArea(bestCols), 2),
    };
  }, [features]);

  const impactScores = useMemo(() => {
    const base = features.length * 10;
    return features.map((f, idx) => {
      const raw = (base - idx * 7 + MathUtils.abs(idx * 3 - base / 2)) % 100;
      const score = MathUtils.round(MathUtils.clamp(raw, 20, 100), 0);
      return {
        ...f,
        score,
        scoreNorm: MathUtils.normalize(score, 20, 100),
        radius: MathUtils.round(MathUtils.sqrt(score / Math.PI), 2),
      };
    });
  }, [features]);

  const togglePin = useCallback(
    (idx, feature) => {
      const current = Array.isArray(pinnedFeatures) ? pinnedFeatures : [];
      const next = current.includes(idx)
        ? current.filter((i) => i !== idx)
        : [...current, idx].slice(0, MathUtils.min(3, features.length));
      setPinnedFeatures(next);
      onFeatureSelect({ ...feature }, idx);
    },
    [pinnedFeatures, setPinnedFeatures, onFeatureSelect, features.length]
  );

  return (
    <section id="features" className="section" ref={revealRef}>
      <div className="container">
        <header className="section-head">
          <p className="kicker reveal">{kicker}</p>
          <h2 className="reveal">
            {titlePrefix} <span className="grad">{titleHighlight}</span>.
          </h2>
          <p
            className="muted reveal"
            style={{ marginTop: '10px', fontSize: '13px' }}
            aria-label="Métricas do conjunto de funcionalidades"
          >
            {gridMetrics.total} funcionalidades • √total ≈ {gridMetrics.sqrt}
            {' '}• ∛total ≈ {gridMetrics.cbrt}
            {' '}• Grid ideal: {gridMetrics.bestCols}×{gridMetrics.rows}
            {' '}• Área eq. (r=cols): {gridMetrics.areaCircleEq}
          </p>
          {Array.isArray(pinnedFeatures) && pinnedFeatures.length > 0 && (
            <div
              className="reveal"
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '12px',
                background: 'rgba(236, 72, 153, .06)',
                border: '1px solid rgba(236, 72, 153, .15)',
              }}
            >
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, fontSize: '13px' }}>
                  📌 Fixadas: <strong>{pinnedFeatures.length}/{MathUtils.min(3, features.length)}</strong> —{' '}
                  {pinnedFeatures.map((idx) => features[idx]?.title).filter(Boolean).join(' • ')}
                </p>
                <button
                  type="button"
                  onClick={resetPinned}
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
                  Resetar
                </button>
              </div>
            </div>
          )}
        </header>
        <div className="features" id="featuresList">
          {impactScores.map(({ icon, title, desc, score, scoreNorm, radius }, idx) => {
            const isPinned = Array.isArray(pinnedFeatures) && pinnedFeatures.includes(idx);
            const barPct = MathUtils.lerp(25, 100, scoreNorm);
            return (
              <article
                className={`feature-card reveal ${isPinned ? 'is-pinned' : ''}`}
                key={`${title}-${icon}`}
                onClick={() => togglePin(idx, { icon, title, desc })}
                style={{ cursor: 'pointer' }}
                title={`Impacto: ${score}/100 • Raio eq. r=${radius}${isPinned ? ' • Fixada' : ''}`}
              >
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="feature-icon">{icon}</div>
                  <span
                    className="pill"
                    style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      background: isPinned
                        ? 'rgba(236, 72, 153, .18)'
                        : 'rgba(255,255,255,.06)',
                    }}
                    aria-label={`Score de impacto ${score} sobre 100`}
                  >
                    {isPinned ? '📌 ' : ''}{score}/100
                  </span>
                </div>
                <div
                  aria-hidden="true"
                  style={{
                    height: '4px',
                    width: `${barPct}%`,
                    background: 'linear-gradient(90deg, var(--cyan), #ec4899)',
                    borderRadius: '2px',
                    margin: '6px 0 10px',
                    transition: 'width .3s ease',
                  }}
                />
                <h3 className="feature-title">{title}</h3>
                <p className="muted">{desc}</p>
                <p
                  className="muted"
                  style={{ fontSize: '11px', marginTop: '8px', marginBottom: 0 }}
                >
                  Score norm. N={MathUtils.round(scoreNorm, 2)} • r≅{radius}
                  {' '}• 2πr≅{MathUtils.round(MathUtils.circleCircumference(radius), 1)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { FeaturesSection };
