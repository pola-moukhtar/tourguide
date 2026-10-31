import { ArrowDown, ArrowRight } from 'lucide-react';
import { ButtonLink } from '../../shared/Button';
import { Container } from '../../shared/Container';
import { AnimatedSection } from '../../shared/AnimatedSection';
import { HeroMedia } from './HeroMedia';
import { heroMedia, sectionsConfig } from '../../../config/sections.config';
import { siteConfig } from '../../../config/site.config';
import { isSectionEnabled } from '../../../lib/utils';

export function Hero() {
  const canExploreTours = isSectionEnabled('tours', sectionsConfig);
  const canMeetGuide = isSectionEnabled('about', sectionsConfig);

  return <AnimatedSection id="hero" className="hero-section">
    <HeroMedia media={heroMedia} />
    <div className="hero-shade" />
    <Container className="hero-content">
      <p className="eyebrow hero-eyebrow">A personal guide to meaningful travel</p>
      <h1>Go beyond<br /><em>the usual route.</em></h1>
      <p className="hero-intro">{siteConfig.tagline}</p>
      {(canExploreTours || canMeetGuide) && <div className="hero-actions">
        {canExploreTours && <ButtonLink href="#tours">Explore experiences <ArrowRight size={17} aria-hidden="true" /></ButtonLink>}
        {canMeetGuide && <a className="text-link" href="#about">Meet your guide <ArrowDown size={16} aria-hidden="true" /></a>}
      </div>}
      <p className="placeholder-note">Temporary demo media and copy · replace with approved guide photography</p>
    </Container>
  </AnimatedSection>;
}
