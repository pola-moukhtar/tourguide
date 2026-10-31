import { useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CarouselControls } from '../../ui/CarouselControls';
import { ReviewCard } from './ReviewCard';
import type { Review } from '../../../types/review';
import { useCarousel } from '../../../hooks/useCarousel';

interface ReviewCarouselProps {
  reviews: readonly Review[];
  showPagination?: boolean;
}

export function ReviewCarousel({ reviews, showPagination = true }: ReviewCarouselProps) {
  const { index, next, previous, goTo } = useCarousel(reviews.length);
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState<1 | -1>(1);

  if (reviews.length === 0) {
    return <p className="empty-state" role="status">Guest reviews will appear here when supplied.</p>;
  }

  const activeReview = reviews[index];
  if (!activeReview) {
    return <p className="empty-state" role="status">Guest reviews will appear here when supplied.</p>;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setDirection(-1);
      previous();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setDirection(1);
      next();
    }
  }

  function selectReview(targetIndex: number) {
    setDirection(targetIndex < index ? -1 : 1);
    goTo(targetIndex);
  }

  return <div
    className="review-carousel"
    role="region"
    aria-label="Guest reviews"
    aria-roledescription="carousel"
    tabIndex={0}
    onKeyDown={handleKeyDown}
  >
    <div className="review-stage" aria-live="polite" aria-atomic="false">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={activeReview.id}
          className="review-slide"
          role="group"
          aria-roledescription="slide"
          aria-label={`Review ${index + 1} of ${reviews.length}`}
          initial={{ opacity: 0, x: reduceMotion ? 0 : direction * 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reduceMotion ? 0 : direction * -12 }}
          transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
        >
          <ReviewCard review={activeReview} />
        </motion.div>
      </AnimatePresence>
    </div>

    <div className="review-footer">
      <span className="review-counter" aria-label={`Review ${index + 1} of ${reviews.length}`}>
        <span aria-hidden="true">{String(index + 1).padStart(2, '0')} <i /> {String(reviews.length).padStart(2, '0')}</span>
      </span>
      <div className="review-navigation">
        {showPagination && reviews.length > 1 && <div className="review-pagination" aria-label="Choose a review">
          {reviews.map((review, reviewIndex) => <button
            key={review.id}
            className="review-page-dot"
            type="button"
            aria-label={`Show review ${reviewIndex + 1} of ${reviews.length}`}
            aria-current={reviewIndex === index ? 'true' : undefined}
            onClick={() => selectReview(reviewIndex)}
          />)}
        </div>}
        <CarouselControls
          onPrevious={() => { setDirection(-1); previous(); }}
          onNext={() => { setDirection(1); next(); }}
          label="Review carousel controls"
          previousLabel="Previous review"
          nextLabel="Next review"
          disabled={reviews.length < 2}
        />
      </div>
    </div>
  </div>;
}
