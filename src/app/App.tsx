import { useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SectionRenderer } from '../components/layout/SectionRenderer';
import { navigationConfig } from '../config/navigation.config';
import { sectionsConfig } from '../config/sections.config';
import { getHomeHref, getNavigationItems, getVisibleSections } from '../lib/utils';
import { themeConfig } from '../config/theme.config';
import { siteConfig } from '../config/site.config';
import type { CSSProperties } from 'react';

const themeVariables = {
  '--color-ink': themeConfig.colors.ink,
  '--color-muted': themeConfig.colors.muted,
  '--color-paper': themeConfig.colors.paper,
  '--color-surface': themeConfig.colors.surface,
  '--color-accent': themeConfig.colors.accent,
  '--color-accent-dark': themeConfig.colors.accentDark,
  '--color-line': themeConfig.colors.line,
  '--color-forest': themeConfig.colors.forest,
  '--color-forest-deep': themeConfig.colors.forestDeep,
  '--color-warm': themeConfig.colors.warm,
  '--color-sand': themeConfig.colors.sand,
  '--color-landscape-sky': themeConfig.colors.landscapeSky,
  '--color-landscape-hill': themeConfig.colors.landscapeHill,
  '--color-landscape-shadow': themeConfig.colors.landscapeShadow,
  '--radius-card': themeConfig.radius.card,
  '--radius-pill': themeConfig.radius.pill,
  '--font-body': themeConfig.typography.body,
  '--font-display': themeConfig.typography.display,
  '--content-width': themeConfig.layout.contentWidth,
  '--section-space': themeConfig.layout.sectionSpace,
} as CSSProperties;

export default function App() {
  const visibleSections = getVisibleSections(sectionsConfig);
  const navigationItems = getNavigationItems(visibleSections, navigationConfig);
  const homeHref = getHomeHref(visibleSections);

  useEffect(() => {
    document.documentElement.lang = siteConfig.language;
    document.title = `${siteConfig.name} — Tour Guide Portfolio`;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', siteConfig.description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', siteConfig.description);

    const initialSectionId = window.location.hash.slice(1);
    if (initialSectionId) {
      const animationFrame = window.requestAnimationFrame(() => {
        document.getElementById(initialSectionId)?.scrollIntoView({ block: 'start' });
      });
      return () => window.cancelAnimationFrame(animationFrame);
    }
  }, []);

  return <div className="app-shell" style={themeVariables}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar items={navigationItems} homeHref={homeHref} />
    <main id="main-content"><SectionRenderer sections={visibleSections} /></main>
    <Footer homeHref={homeHref} />
  </div>;
}
