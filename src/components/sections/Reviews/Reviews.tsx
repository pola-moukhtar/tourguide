import { reviews } from '../../../data/reviews';
import { AnimatedSection } from '../../shared/AnimatedSection';
import { Container } from '../../shared/Container';
import { SectionHeading } from '../../shared/SectionHeading';
import { ReviewCarousel } from './ReviewCarousel';
import { featuresConfig } from '../../../config/features.config';

export function Reviews() {
  const hasDemonstrationContent = reviews.some((review) => review.isPlaceholder);

  return <AnimatedSection id="reviews" className="section section-reviews"><Container>
    <div className="reviews-heading"><SectionHeading eyebrow="GUEST STORIES" title="Stories shared by guests" description={reviews.length === 0 ? 'Guest feedback will appear here when supplied.' : undefined} />{hasDemonstrationContent && <span className="review-demo-badge">Demonstration content · not real testimonials</span>}</div>
    <ReviewCarousel reviews={reviews} showPagination={featuresConfig.showReviewPagination} />
  </Container></AnimatedSection>;
}
