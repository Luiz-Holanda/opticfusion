'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { EXPERIENCE_STEPS } from '@/data/constants';
import { useCallback, useMemo } from 'react';
import { MathUtils } from '@/utils/math';
import { useLocalStorage } from '@/hooks/useLocalStorage';

/**
 * @typedef {Object} Step
 * @property {number} number
 * @property {string} image
 * @property {string} text
 * @property {boolean} [success]
 * @property {boolean} [focus]
 *
 * @typedef {Object} ExperienceStepsProps
 * @property {Step[]} [steps]
 * @property {(step: Step, idx: number) => void} [onStepInteract]
 */
const ExperienceSteps = ({ steps = EXPERIENCE_STEPS, onStepInteract = () => {} }) => {
  const revealRef = useRevealAll();

  const {
    value: lastStepIdx,
    setValue: setLastStepIdx,
  } = useLocalStorage('opticfusion:last-experience-step', null);

  const progressMetrics = useMemo(() => {
    const total = steps.length;
    const totalSqrt = MathUtils.round(MathUtils.sqrt(total), 2);
    const midPoint = MathUtils.ceil(total / 2);
    const firstHalf = MathUtils.floor(total / 2);
    const spanAngle = MathUtils.round(MathUtils.degreesToRadians(360 / MathUtils.max(total, 1)), 3);
    return {
      total,
      totalSqrt,
      midPoint,
      firstHalf,
      spanAngle,
      hypotenuseCard: MathUtils.round(MathUtils.hypotenuse(16, 9), 2),
    };
  }, [steps]);

  const handleStepClick = useCallback(
    (step, idx) => {
      setLastStepIdx(idx);
      onStepInteract({ ...step }, idx);
    },
    [setLastStepIdx, onStepInteract]
  );

  return (
    <section className="experience-steps section" ref={revealRef}>
      <div className="container">
        <div
          style={{
            paddingBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'baseline',
          }}
          className="reveal"
        >
          <div>
            <p className="kicker" style={{ margin: 0 }}>Jornada de Uso</p>
            <h2 style={{ marginTop: '8px' }} className="reveal">
              Experimente a <span className="grad">experiência passo a passo</span>
            </h2>
          </div>
          <p
            className="muted"
            style={{ fontSize: '13px', margin: 0, maxWidth: '420px' }}
            aria-label="Métricas da jornada"
          >
            {progressMetrics.total} etapas • √total ≈ {progressMetrics.totalSqrt}
            {' '}• Início → meio ≈ {progressMetrics.firstHalf}/{progressMetrics.midPoint}
            {' '}• Ângulo por etapa ≈ {MathUtils.radiansToDegrees(progressMetrics.spanAngle)}°
            {' '}• D. diagonal ≈ {progressMetrics.hypotenuseCard}&quot;
          </p>
        </div>
        {lastStepIdx !== null && steps[lastStepIdx] && (
          <div
            className="reveal"
            style={{
              marginBottom: '18px',
              padding: '10px 14px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, .06)',
              border: '1px solid rgba(16, 185, 129, .18)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
            }}
            role="status"
            aria-live="polite"
          >
            <p style={{ margin: 0, fontSize: '13px' }}>
              🧭 Última etapa visualizada: <strong>#{steps[lastStepIdx].number} — {steps[lastStepIdx].text}</strong>
            </p>
            <span
              className="pill"
              style={{
                fontSize: '11px',
                background: 'rgba(16, 185, 129, .12)',
                padding: '4px 10px',
              }}
            >
              {MathUtils.round(MathUtils.percentage(lastStepIdx + 1, progressMetrics.total), 0)}% concluído
            </span>
          </div>
        )}
        <div className="steps-grid">
          {steps.map(({ number, image, text, success, focus, ...rest }, idx) => {
            const stepProgress = MathUtils.percentage(idx + 1, progressMetrics.total);
            const lerpScale = MathUtils.lerp(0.94, 1, stepProgress / 100);
            const isLastSeen = lastStepIdx === idx;
            return (
              <article
                key={`step-${number}`}
                className={`glass-panel step-card reveal ${success ? 'success-card' : ''} ${isLastSeen ? 'is-last' : ''}`}
                {...rest}
                onClick={() => handleStepClick({ number, image, text, success, focus }, idx)}
                style={{
                  cursor: 'pointer',
                  transform: `scale(${lerpScale})`,
                  transition: 'transform .3s ease',
                }}
                title={`Etapa ${idx + 1}/${progressMetrics.total} • ${MathUtils.round(stepProgress, 0)}%`}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '3px',
                    width: `${MathUtils.clamp(stepProgress, 0, 100)}%`,
                    background: 'linear-gradient(90deg, var(--cyan, #00d4ff), #10b981)',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    zIndex: 2,
                  }}
                />
                <div className={`step-number ${success ? 'success-number' : ''}`}>{number}</div>
                <div className="step-visual">
                  <img
                    src={image}
                    alt={`Passo ${number}`}
                    loading="lazy"
                    className={success ? 'success-image' : ''}
                  />
                  {focus && <div className="step-focus"></div>}
                </div>
                <div className="step-info">
                  <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className={success ? 'success-text' : ''}>{text}</p>
                    <span
                      className="pill"
                      aria-label="Progresso da etapa"
                      style={{
                        fontSize: '10px',
                        padding: '2px 7px',
                        background: isLastSeen ? 'rgba(16, 185, 129, .18)' : 'rgba(255,255,255,.06)',
                        flexShrink: 0,
                      }}
                    >
                      {MathUtils.round(stepProgress, 0)}%
                    </span>
                  </div>
                  <p
                    className="muted"
                    style={{ fontSize: '11px', marginTop: '6px', marginBottom: 0 }}
                    aria-label="Métricas da etapa"
                  >
                    N={idx} • √N°{number} ≈ {MathUtils.round(MathUtils.sqrt(number), 2)}
                    {' '}• N! ≈ {MathUtils.factorial(MathUtils.min(number, 10))}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { ExperienceSteps };
