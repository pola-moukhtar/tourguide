import type { MediaAsset } from './media';

export interface Review {
  id: string;
  touristName: string;
  country?: string;
  text: string;
  rating?: number;
  date?: string;
  media?: MediaAsset;
  attribution?: string;
  isPlaceholder: boolean;
}
