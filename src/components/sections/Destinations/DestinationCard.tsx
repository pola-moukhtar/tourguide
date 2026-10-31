import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Destination } from '../../../types/tour';
import { Media } from '../../shared/Media';

interface DestinationCardProps {
  destination: Destination;
  index: number;
  onViewDetails: (destination: Destination) => void;
}

export function DestinationCard({ destination, index, onViewDetails }: DestinationCardProps) {
  return <article className="destination-card">
    <div className={`destination-image destination-tone-${(index % 3) + 1}`}><Media media={destination.media} className="destination-media" /><span className="destination-count">{String(index + 1).padStart(2, '0')}</span><MapPin aria-hidden="true" /></div>
    <div className="destination-copy"><div><h3>{destination.name}</h3><p>{destination.summary}</p></div>
      <button className="detail-trigger destination-detail-trigger" type="button" aria-haspopup="dialog" aria-controls="destination-detail-dialog" aria-label={`View details for ${destination.name}`} onClick={() => onViewDetails(destination)}><span>View details</span><ArrowUpRight aria-hidden="true" /></button>
    </div>
    {destination.isPlaceholder && <span className="placeholder-chip">Example content</span>}
  </article>;
}
