'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { useState } from 'react';
import { SLIDES } from '@/data/constants';

/**
 * @typedef {Object} Slide
 * @property {string} badge
 * @property {string} title
 * @property {string} text
 * @property {string} image
 *
 * @typedef {Object} HighlightsSectionProps
 * @property {string} [kicker]
 * @property {string} [titlePrefix]
 * @property {string} [titleHighlight]
 * @property {Slide[]} [slides]
 */
const HighlightsSection = ({
  kicker = 'Highlights',
  titlePrefix = 'A experiência de câmera que parece',
  titleHighlight = 'futuro',
  slides = SLIDES,
}) => {
  const [current, setCurrent] = useState(0);
  const revealRef = useRevealAll();

  const goTo = (idx) => setCurrent(idx);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const s = slides[current];

  return (
    <section id="highlights" className="section section--wide section--dark" ref={revealRef}>
      <div className="container">
        <header className="section-head">
          <p className="kicker reveal">{kicker}</p>
          <h2 className="reveal">
            {titlePrefix} <span className="grad">{titleHighlight}</span>.
          </h2>
        </header>

        <div className="carousel reveal" aria-label="Slideshow de destaques">
          <button className="car-btn" id="prevSlide" aria-label="Anterior" onClick={prev}>
            ‹
          </button>
          <div className="car-stage" id="slides" aria-live="polite">
            <div className="slide fade-in" key={`${current}-${s.title}`}>
              <img className="slide-image" src={s.image} alt={s.title} />
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <div className="slide-top">
                  <span className="slide-badge">{s.badge}</span>
                  <span className="muted">{current + 1}/{slides.length}</span>
                </div>
                <h3>{s.title}</h3>
                <p className="muted">{s.text}</p>
              </div>
            </div>
          </div>
          <button className="car-btn" id="nextSlide" aria-label="Próximo" onClick={next}>
            ›
          </button>
        </div>

        <div className="dots" id="slideDots" aria-label="Navegação do slideshow">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              aria-label={`Ir para o highlight ${i + 1}`}
              onClick={() => goTo(i)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HighlightsSection };
