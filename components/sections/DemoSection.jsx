'use client';

import { useRevealAll } from '@/hooks/useReveal';
import { useCallback, useMemo, useState } from 'react';
import { DEMO_BULLETS } from '@/data/constants';
import { MathUtils } from '@/utils/math';

/**
 * @typedef {Object} DemoSectionProps
 * @property {string} [kicker]
 * @property {string} [titlePrefix]
 * @property {string} [titleHighlight]
 * @property {string} [description]
 * @property {string} [beforeImg]
 * @property {string} [afterImg]
 * @property {number} [initialPos]
 * @property {string[]} [bullets]
 */
const DemoSection = ({
  kicker = 'Demonstração',
  titlePrefix = 'Seu enquadramento.',
  titleHighlight = 'Aprimorado em tempo real.',
  description = 'A Optic Fusion assistent analisa o cenário, identifica linhas, rosto e iluminação — e sugere correções instantâneas para deixar a foto pronta antes mesmo de você tocar no botão.',
  beforeImg = '/img/before.png',
  afterImg = '/img/after.png',
  initialPos = 55,
  bullets = DEMO_BULLETS,
}) => {
  const [pos, setPos] = useState(initialPos);
  const revealRef = useRevealAll();

  const clampedPos = useMemo(() => MathUtils.clamp(pos, 10, 90), [pos]);
  const posPct = clampedPos + '%';
  const cssVarStyle = { '--pos': posPct };
  const compareAfterStyle = { width: posPct };
  const compareHandleStyle = { left: posPct };

  const handleRangeChange = useCallback((e) => {
    const rawVal = Number(e.target.value);
    setPos(MathUtils.round(rawVal, 0));
  }, []);

  return (
    <section id="demo" className="section section--dark" ref={revealRef}>
      <div className="container">
        <div className="demo">
          <div className="demo-copy">
            <p className="kicker reveal">{kicker}</p>
            <h2 className="reveal">
              {titlePrefix}
              <br />
              <span className="grad">{titleHighlight}</span>
            </h2>
            <p className="muted reveal">{description}</p>

            <div className="demo-bullets reveal">
              {bullets.map((item) => (
                <div className="bullet" key={item}>
                  <span className="bullet-dot"></span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="compare reveal" aria-label="Comparação antes e depois">
            <div className="compare-box" id="compareBox" style={cssVarStyle}>
              <div className="compare-before">
                <img src={beforeImg} alt="Imagem antes" className="compare-img" />
                <div className="compare-label">Antes</div>
              </div>
              <div className="compare-after" id="compareAfter" style={compareAfterStyle}>
                <img src={afterImg} alt="Imagem depois" className="compare-img" />
                <div className="compare-label">Depois</div>
                <div className="compare-guides" aria-hidden="true"></div>
              </div>
              <div
                className="compare-handle"
                id="compareHandle"
                aria-hidden="true"
                style={compareHandleStyle}
              ></div>
            </div>
            <input
              id="compareRange"
              className="compare-range"
              type="range"
              min="10"
              max="90"
              value={clampedPos}
              aria-label="Arraste para comparar"
              onChange={handleRangeChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { DemoSection };
