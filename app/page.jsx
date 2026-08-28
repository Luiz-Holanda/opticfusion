'use client';

import { Nav } from '@/components/layout/Nav.jsx';
import { Hero } from '@/components/sections/Hero.jsx';
import { ProblemSection } from '@/components/sections/ProblemSection.jsx';
import { ExperienceSteps } from '@/components/sections/ExperienceSteps.jsx';
import { DemoSection } from '@/components/sections/DemoSection.jsx';
import { FeaturesSection } from '@/components/sections/FeaturesSection.jsx';
import { HighlightsSection } from '@/components/sections/HighlightsSection.jsx';
import { EarlyAccessCTA } from '@/components/sections/EarlyAccessCTA.jsx';
import { Footer } from '@/components/layout/Footer.jsx';
import { LoginModal } from '@/components/modals/LoginModal.jsx';
import { RMLookupModal } from '@/components/modals/RMLookupModal.jsx';
import { useModal } from '@/hooks/useModal';

/**
 * @typedef {Object} HomeProps
 * @property {React.ComponentProps<typeof Nav>} [navProps]
 * @property {React.ComponentProps<typeof Hero>} [heroProps]
 * @property {React.ComponentProps<typeof ProblemSection>} [problemProps]
 * @property {React.ComponentProps<typeof ExperienceSteps>} [stepsProps]
 * @property {React.ComponentProps<typeof DemoSection>} [demoProps]
 * @property {React.ComponentProps<typeof FeaturesSection>} [featuresProps]
 * @property {React.ComponentProps<typeof HighlightsSection>} [highlightsProps]
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
    <>
      <Nav {...sharedHandlers} {...navProps} />

      <main id="top">
        <Hero {...heroProps} />
        <ProblemSection {...problemProps} />
        <ExperienceSteps {...stepsProps} />
        <DemoSection {...demoProps} />
        <FeaturesSection {...featuresProps} />
        <HighlightsSection {...highlightsProps} />
        <EarlyAccessCTA {...sharedHandlers} {...ctaProps} />
      </main>

      <Footer {...footerProps} />

      <LoginModal isOpen={loginModal.isOpen} onClose={loginModal.closeModal} />
      <RMLookupModal isOpen={rmModal.isOpen} onClose={rmModal.closeModal} />
    </>
  );
}
