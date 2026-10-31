import type { MediaAsset } from './media';

export interface DestinationDetails {
  description?: string;
  highlights?: readonly string[];
  visitorNotes?: string;
}

export interface TourDetails {
  description?: string;
  itinerary?: readonly string[];
  included?: readonly string[];
  preparation?: string;
}

export interface Tour {
  id: string;
  title: string;
  summary: string;
  duration?: string;
  destinationId?: string;
  media?: MediaAsset;
  details?: TourDetails;
  /** Omit or set true to show the item; set false to hide it without deleting its data. */
  isVisible?: boolean;
  isPlaceholder?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  summary: string;
  media?: MediaAsset;
  details?: DestinationDetails;
  /** Omit or set true to show the item; set false to hide it without deleting its data. */
  isVisible?: boolean;
  isPlaceholder?: boolean;
}
