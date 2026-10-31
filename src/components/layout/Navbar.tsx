import { Compass } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { MobileMenu } from './MobileMenu';
import type { NavigationItem } from '../../types/section';

interface NavbarProps { items: readonly NavigationItem[]; homeHref: string }

export function Navbar({ items, homeHref }: NavbarProps) {
  return <header className="site-header">
    <nav className="navbar container" aria-label="Main navigation">
      <a className="brand" href={homeHref} aria-label={`${siteConfig.name}, home`}><span className="brand-icon"><Compass aria-hidden="true" /></span><span>{siteConfig.name}</span></a>
      <div className="desktop-navigation">{items.map((item) => <a key={item.sectionId} href={`#${item.sectionId}`}>{item.label}</a>)}</div>
      <MobileMenu items={items} />
    </nav>
  </header>;
}
