import type { SectionSetting } from '../types/section';
import type { MediaAsset } from '../types/media';

/** Use the labeled illustration until guide approved photography is supplied.
 * The legacy video remains in the project, but its baked-in promotional text is
 * not suitable as portfolio media.
 */
export const heroMedia: MediaAsset = {
  kind: 'image',
  src: `${import.meta.env.BASE_URL}images/hero/hero-mobile-placeholder.svg`,
  alt: 'Illustrated landscape placeholder; replace with an approved guide or destination photograph',
};

/** Change enabled/order here; the homepage and navigation follow this list. */
export const sectionsConfig: readonly SectionSetting[] = [
  { id: 'hero', enabled: true, order: 0 },
  { id: 'about', enabled: true, order: 1 },
  { id: 'destinations', enabled: true, order: 2 },
  { id: 'tours', enabled: true, order: 3 },
  { id: 'gallery', enabled: false, order: 4 },
  { id: 'reviews', enabled: true, order: 5 },
  { id: 'faq', enabled: false, order: 6 },
  { id: 'contact', enabled: true, order: 7 },
  { id: 'callToAction', enabled: false, order: 8 },
];
