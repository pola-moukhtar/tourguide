import type { MediaAsset } from '../../../types/media';
import { Media } from '../../shared/Media';

interface HeroMediaProps { media?: MediaAsset }

export function HeroMedia({ media }: HeroMediaProps) {
  return <div className="hero-media-wrap" aria-hidden="true"><Media media={media} className="hero-media" priority /></div>;
}
