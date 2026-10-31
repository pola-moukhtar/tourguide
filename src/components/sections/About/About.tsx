import { Map, MoveUpRight } from 'lucide-react';
import { guide } from '../../../data/guide';
import { AnimatedSection } from '../../shared/AnimatedSection';
import { Container } from '../../shared/Container';
import { SectionHeading } from '../../shared/SectionHeading';
import { sectionsConfig } from '../../../config/sections.config';
import { siteConfig } from '../../../config/site.config';
import { isSectionEnabled } from '../../../lib/utils';

export function About() {
  const canContact = Boolean(siteConfig.contactEmail) && isSectionEnabled('contact', sectionsConfig);

  return <AnimatedSection id="about" className="section section-about">
    <Container className="about-layout">
      <div className="about-visual" aria-label="Guide portrait placeholder" role="img"><span className="about-mark"><Map aria-hidden="true" /></span><span>Guide portrait to be added</span><span className="about-index">01 / THE GUIDE</span></div>
      <div className="about-copy"><SectionHeading eyebrow="A LITTLE ABOUT ME" title={guide.role} description={guide.introduction} />
        <p className="body-copy">{guide.about}</p>
        {canContact && <a className="inline-link" href="#contact">Start a conversation <MoveUpRight size={16} aria-hidden="true" /></a>}
      </div>
    </Container>
  </AnimatedSection>;
}
