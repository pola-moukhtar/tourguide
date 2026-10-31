import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { getHomeHref, getNavigationItems, getVisibleSections } from '../lib/utils';
import type { NavigationItem, SectionSetting } from '../types/section';
import { siteConfig } from '../config/site.config';
import { themeConfig } from '../config/theme.config';

describe('homepage configuration', () => {
  it('renders enabled sections and omits disabled sections and navigation links', () => {
    render(<App />);
    expect(document.getElementById('hero')).toBeInTheDocument();
    expect(document.getElementById('about')).toBeInTheDocument();
    expect(document.getElementById('reviews')).toBeInTheDocument();
    expect(document.getElementById('gallery')).not.toBeInTheDocument();
    expect(document.getElementById('faq')).not.toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Reviews' }).length).toBeGreaterThan(0);
    expect(screen.queryByRole('link', { name: 'FAQ' })).not.toBeInTheDocument();
  });

  it('renders section order from the centralized settings', () => {
    render(<App />);
    const main = screen.getByRole('main');
    const ids = Array.from(main.children).map((section) => section.id);
    expect(ids).toEqual(['hero', 'about', 'destinations', 'tours', 'reviews', 'contact']);
  });

  it('orders navigation with visible sections and excludes disabled or unlinked sections', () => {
    const settings: readonly SectionSetting[] = [
      { id: 'reviews', enabled: true, order: 2 },
      { id: 'gallery', enabled: false, order: 1 },
      { id: 'contact', enabled: true, order: 0 },
      { id: 'hero', enabled: true, order: 3 },
    ];
    const navigation: readonly NavigationItem[] = [
      { sectionId: 'reviews', label: 'Reviews' },
      { sectionId: 'gallery', label: 'Gallery' },
      { sectionId: 'contact', label: 'Contact' },
    ];

    const items = getNavigationItems(getVisibleSections(settings), navigation);

    expect(items.map(({ sectionId }) => sectionId)).toEqual(['contact', 'reviews']);
  });

  it('keeps home links valid when the hero is hidden or no sections are enabled', () => {
    expect(getHomeHref([{ id: 'about', enabled: true, order: 1 }])).toBe('#about');
    expect(getHomeHref([])).toBe('#main-content');
  });

  it('does not leave links pointing to sections that are not rendered', () => {
    render(<App />);
    const brokenLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
      .filter((link) => !document.getElementById(link.hash.slice(1)));

    expect(brokenLinks).toEqual([]);
  });

  it('applies centralized site and theme settings', () => {
    const { container } = render(<App />);
    const appShell = container.querySelector<HTMLElement>('.app-shell');

    expect(document.title).toBe(`${siteConfig.name} — Tour Guide Portfolio`);
    expect(document.documentElement.lang).toBe(siteConfig.language);
    expect(appShell?.style.getPropertyValue('--section-space')).toBe(themeConfig.layout.sectionSpace);
  });

  it('restores a section fragment after React renders the page', () => {
    const originalUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const rafDescriptor = Object.getOwnPropertyDescriptor(window, 'requestAnimationFrame');
    const cancelRafDescriptor = Object.getOwnPropertyDescriptor(window, 'cancelAnimationFrame');
    const scrollDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView');
    const scrollIntoView = vi.fn();
    Object.defineProperty(window, 'requestAnimationFrame', { configurable: true, value: (callback: FrameRequestCallback) => { callback(0); return 1; } });
    Object.defineProperty(window, 'cancelAnimationFrame', { configurable: true, value: vi.fn() });
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: scrollIntoView });

    window.history.replaceState(null, '', '#reviews');
    const { unmount } = render(<App />);
    expect(scrollIntoView).toHaveBeenCalled();
    unmount();
    window.history.replaceState(null, '', originalUrl);

    if (rafDescriptor) Object.defineProperty(window, 'requestAnimationFrame', rafDescriptor);
    else Reflect.deleteProperty(window, 'requestAnimationFrame');
    if (cancelRafDescriptor) Object.defineProperty(window, 'cancelAnimationFrame', cancelRafDescriptor);
    else Reflect.deleteProperty(window, 'cancelAnimationFrame');
    if (scrollDescriptor) Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', scrollDescriptor);
    else Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView');
  });
});
