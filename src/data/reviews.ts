import type { Review } from '../types/review';

/** These are layout placeholders, not customer statements or endorsements. */
export const reviews: readonly Review[] = [
  {
    id: 'review-placeholder-1', touristName: 'Tourist name to be added',
    text: 'A real guest comment can be added here after it has been supplied and approved. Placeholder only; not a testimonial.',
    isPlaceholder: true,
  },
  {
    id: 'review-placeholder-2', touristName: 'Another tourist name to be added',
    text: 'Replace this text with a guest review shared with permission. Placeholder only; not a testimonial.',
    isPlaceholder: true,
  },
];
