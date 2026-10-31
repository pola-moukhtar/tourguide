import { Quote, Star } from 'lucide-react';
import type { Review } from '../../../types/review';
import { Media } from '../../shared/Media';

export function ReviewCard({ review }: { review: Review }) {
  return <article className="review-card">
    <div className="review-photo">
      <Media
        media={review.media}
        className="review-media"
        fallbackLabel="Guide and tourist media placeholder"
        fallbackText="Guide and tourist media to be added"
      />
    </div>
    <div className="review-words"><Quote className="quote-mark" size={30} aria-hidden="true" />
      <p className="review-placeholder-label">{review.isPlaceholder ? 'Review placeholder — not a real testimonial' : 'Guest review'}</p>
      {review.rating != null && <div className="review-rating" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, i) => <Star key={i} size={15} fill="currentColor" aria-hidden="true" />)}</div>}
      <blockquote>{review.text}</blockquote>
      <div className="review-author"><strong>{review.touristName}</strong>{review.country && <span>{review.country}</span>}{review.date && <time>{review.date}</time>}</div>
      {review.attribution && <p className="review-source">Source: {review.attribution}</p>}
    </div>
  </article>;
}
