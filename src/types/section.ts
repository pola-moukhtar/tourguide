export type SectionId =
  | 'hero'
  | 'about'
  | 'destinations'
  | 'tours'
  | 'gallery'
  | 'reviews'
  | 'faq'
  | 'contact'
  | 'callToAction';

export interface SectionSetting {
  id: SectionId;
  enabled: boolean;
  order: number;
}

export interface NavigationItem {
  sectionId: SectionId;
  label: string;
}
