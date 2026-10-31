import type { MediaAsset } from '../types/media';

export interface GalleryItem { id: string; caption: string; media?: MediaAsset; isPlaceholder: boolean }

export const gallery: readonly GalleryItem[] = [
  { id: 'gallery-placeholder', caption: 'Add an approved travel photograph or clip.', isPlaceholder: true },
];
