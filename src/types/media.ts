export interface ImageMedia {
  kind: 'image';
  src: string;
  alt: string;
  mobileSrc?: string;
  mobileAlt?: string;
}

export interface VideoMedia {
  kind: 'video';
  src: string;
  poster?: string;
  /** A mobile image is preferred so a large desktop video is not downloaded on phones. */
  mobileImage?: ImageMedia;
  mobileVideoSrc?: string;
  preload?: 'none' | 'metadata' | 'auto';
  loop?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  label: string;
}

export type MediaAsset = ImageMedia | VideoMedia;
