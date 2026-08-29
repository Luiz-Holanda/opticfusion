'use client';

import { Nav } from '@/components/layout/Nav.jsx';
import { Hero } from '@/components/sections/Hero.jsx';
import { ProblemSection } from '@/components/sections/ProblemSection.jsx';
import { ExperienceSteps } from '@/components/sections/ExperienceSteps.jsx';
import { DemoSection } from '@/components/sections/DemoSection.jsx';
import { FeaturesSection } from '@/components/sections/FeaturesSection.jsx';
import { HighlightsSection } from '@/components/sections/HighlightsSection.jsx';
import { TargetAudienceSection } from '@/components/sections/TargetAudienceSection.jsx';
import { TeamSection } from '@/components/sections/TeamSection.jsx';
import { EarlyAccessCTA } from '@/components/sections/EarlyAccessCTA.jsx';
import { Footer } from '@/components/layout/Footer.jsx';
import { LoginModal } from '@/components/modals/LoginModal.jsx';
import { RMLookupModal } from '@/components/modals/RMLookupModal.jsx';
import { useModal } from '@/hooks/useModal';
import { SOLUTION_ASIDE_FACTS } from '@/data/constants';

/**
 * @typedef {Object} HomeProps
 * @property {React.ComponentProps<typeof Nav>} [navProps]
 * @property {React.ComponentProps<typeof Hero>} [heroProps]
 * @property {React.ComponentProps<typeof ProblemSection>} [problemProps]
 * @property {React.ComponentProps<typeof ExperienceSteps>} [stepsProps]
 * @property {React.ComponentProps<typeof DemoSection>} [demoProps]
 * @property {React.ComponentProps<typeof FeaturesSection>} [featuresProps]
 * @property {React.ComponentProps<typeof HighlightsSection>} [highlightsProps]
 * @property {React.ComponentProps<typeof TargetAudienceSection>} [audienceProps]
 * @property {React.ComponentProps<typeof TeamSection>} [teamProps]
 * @property {React.ComponentProps<typeof EarlyAccessCTA>} [ctaProps]
 * @property {React.ComponentProps<typeof Footer>} [footerProps]
 */
export default function Home({
  navProps = {},
  heroProps = {},
  problemProps = {},
  stepsProps = {},
  demoProps = {},
  featuresProps = {},
  highlightsProps = {},
  audienceProps = {},
  teamProps = {},
  ctaProps = {},
  footerProps = {},
}) {
  const loginModal = useModal(false);
  const rmModal = useModal(false);

  const sharedHandlers = {
    onOpenLogin: loginModal.openModal,
    onOpenRMLookup: rmModal.openModal,
  };

  return (
    <div className="page">
      <header role="banner">
        <Nav {...sharedHandlers} {...navProps} />
      </header>

      <main id="conteudo-principal" role="main">
        <Hero {...heroProps} />

        <section
          id="solution"
          aria-labelledby="solution-title"
          className="section"
        >
          <div className="container">
            <header className="section-head" style={{ display: 'block' }}>
              <p className="kicker reveal">A Solução</p>
              <h2 id="solution-title" className="reveal">
                Como a Optic Fusion resolve o problema da fotografia amadora
              </h2>
              <p className="muted reveal">
                Uma combinação de Inteligência Artificial, feedback visual em tempo real e correção automática de parâmetros para entregar fotos de qualidade profissional no primeiro clique.
              </p>
            </header>

            <div className="solution-layout">
              <div className="solution-main">
                <ProblemSection {...problemProps} />
              </div>

              <aside
                className="solution-aside"
                aria-labelledby="solution-aside-title"
                role="complementary"
              >
                <div className="solution-aside-card">
                  <h3 id="solution-aside-title" className="solution-aside-title">
                    Fatos rápidos
                  </h3>
                  <ul className="fact-list">
                    {SOLUTION_ASIDE_FACTS.map((fact, idx) => (
                      <li className="fact-item" key={`sa-${idx}`}>
                        <span className="fact-check" aria-hidden="true">✓</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <ExperienceSteps {...stepsProps} />
        <DemoSection {...demoProps} />
        <FeaturesSection {...featuresProps} />
        <HighlightsSection {...highlightsProps} />
        <TargetAudienceSection {...audienceProps} />

        <TeamSection {...teamProps} />

        <EarlyAccessCTA {...sharedHandlers} {...ctaProps} />
      </main>

      <Footer {...footerProps} />

      <LoginModal isOpen={loginModal.isOpen} onClose={loginModal.closeModal} />
      <RMLookupModal isOpen={rmModal.isOpen} onClose={rmModal.closeModal} />
    </div>
  );
}
