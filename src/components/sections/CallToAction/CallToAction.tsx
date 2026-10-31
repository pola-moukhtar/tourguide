import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '../../shared/AnimatedSection';
import { Container } from '../../shared/Container';
import { sectionsConfig } from '../../../config/sections.config';
import { siteConfig } from '../../../config/site.config';
import { isSectionEnabled } from '../../../lib/utils';

export function CallToAction() {
  const canContact = Boolean(siteConfig.contactEmail) && isSectionEnabled('contact', sectionsConfig);

  return <AnimatedSection id="callToAction" className="section section-cta"><Container><p className="eyebrow">A NOTE FROM YOUR GUIDE</p><h2>Let’s make room for the unexpected.</h2>{canContact && <a href="#contact">Plan a journey <ArrowRight size={17} aria-hidden="true" /></a>}</Container></AnimatedSection>;
}
