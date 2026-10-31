import { ArrowRight, Clock3, MoveUpRight } from 'lucide-react';
import type { Tour } from '../../../types/tour';
import { Media } from '../../shared/Media';
import { sectionsConfig } from '../../../config/sections.config';
import { siteConfig } from '../../../config/site.config';
import { isSectionEnabled } from '../../../lib/utils';

interface TourCardProps { tour: Tour; onViewDetails: (tour: Tour) => void }

export function TourCard({ tour, onViewDetails }: TourCardProps) {
  const canContact = Boolean(siteConfig.contactEmail) && isSectionEnabled('contact', sectionsConfig);

  return <article className="tour-card">
    <div className="tour-card-media"><Media media={tour.media} className="tour-media" /><span className="placeholder-chip">{tour.isPlaceholder ? 'Example experience' : 'Experience'}</span></div>
    <div className="tour-card-copy"><div className="tour-meta"><Clock3 size={15} aria-hidden="true" /> {tour.duration ?? 'Duration to be confirmed'}</div><h3>{tour.title}</h3><p>{tour.summary}</p>
      <div className="tour-card-actions"><button className="detail-trigger" type="button" aria-haspopup="dialog" aria-controls="tour-detail-dialog" aria-label={`View details for ${tour.title}`} onClick={() => onViewDetails(tour)}>View details <MoveUpRight size={16} aria-hidden="true" /></button>{canContact && <a href="#contact" aria-label={`Ask about ${tour.title}`}>Ask about this experience <ArrowRight size={16} aria-hidden="true" /></a>}</div>
    </div>
  </article>;
}
