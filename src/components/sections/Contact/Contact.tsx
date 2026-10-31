import { Mail, MoveUpRight } from 'lucide-react';
import { siteConfig } from '../../../config/site.config';
import { AnimatedSection } from '../../shared/AnimatedSection';
import { Container } from '../../shared/Container';

export function Contact() {
  return <AnimatedSection id="contact" className="section section-contact"><Container className="contact-inner">
    <div><p className="eyebrow">YOUR NEXT CHAPTER</p><h2>Have a place in mind?</h2><p>Contact information will be added when the guide’s preferred details are provided.</p></div>
    {siteConfig.contactEmail ? <a className="button button-light" href={`mailto:${siteConfig.contactEmail}`}><Mail size={17} aria-hidden="true" /> Get in touch <MoveUpRight size={16} aria-hidden="true" /></a> : <span className="contact-pending"><Mail size={17} aria-hidden="true" /> Contact details to be added</span>}
  </Container></AnimatedSection>;
}
