'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { EXPERIENCE_STEPS } from '@/data/constants';

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
 */
const ExperienceSteps = ({ steps = EXPERIENCE_STEPS }) => {
  const revealRef = useRevealAll();

  return (
    <section className="experience-steps section" ref={revealRef}>
      <div className="container">
        <div className="steps-grid">
          {steps.map(({ number, image, text, success, focus, ...rest }) => (
          <article
            key={`step-${number}`}
            className={`glass-panel step-card reveal ${success ? 'success-card' : ''}`}
            {...rest}
          >
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
              <p className={success ? 'success-text' : ''}>{text}</p>
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
};

export { ExperienceSteps };
