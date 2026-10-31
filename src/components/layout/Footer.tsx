import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { Container } from '../shared/Container';

export function Footer({ homeHref }: { homeHref: string }) {
  return <footer className="site-footer"><Container className="footer-inner">
    <div><p className="brand footer-brand">{siteConfig.name}</p><p>{siteConfig.tagline}</p></div>
    <a href={homeHref}>Back to top <ArrowUpRight size={16} aria-hidden="true" /></a>
  </Container></footer>;
}
