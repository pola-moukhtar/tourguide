import type { NavigationItem, SectionId, SectionSetting } from '../types/section';

export function getVisibleSections(settings: readonly SectionSetting[]) {
  return [...settings].filter((section) => section.enabled).sort((a, b) => a.order - b.order);
}

export function getNavigationItems(
  visibleSections: readonly SectionSetting[],
  navigation: readonly NavigationItem[],
) {
  const navigationBySection = new Map(navigation.map((item) => [item.sectionId, item]));
  return visibleSections.flatMap(({ id }) => {
    const item = navigationBySection.get(id);
    return item ? [item] : [];
  });
}

export function isSectionEnabled(sectionId: SectionId, settings: readonly SectionSetting[]) {
  return settings.some((section) => section.id === sectionId && section.enabled);
}

export function getHomeHref(visibleSections: readonly SectionSetting[]) {
  const firstSection = visibleSections.find(({ id }) => id === 'hero') ?? visibleSections[0];
  return firstSection ? `#${firstSection.id}` : '#main-content';
}

export function getVisibleItems<T extends { isVisible?: boolean }>(items: readonly T[]): T[] {
  return items.filter((item) => item.isVisible !== false);
}
