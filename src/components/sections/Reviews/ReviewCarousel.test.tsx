import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import type { Review } from '../../../types/review';
import { ReviewCarousel } from './ReviewCarousel';

const demoReviews: readonly Review[] = [
  {
    id: 'demo-image-review',
    touristName: 'Demonstration Guest One',
    country: 'Example Country',
    text: 'Demonstration review text one. This is not a real testimonial.',
    rating: 5,
    media: { kind: 'image', src: '/demo-guide-and-guest.jpg', alt: 'Demonstration guide beside a tourist' },
    isPlaceholder: true,
  },
  {
    id: 'demo-video-review',
    touristName: 'Demonstration Guest Two',
    country: 'Sample Country',
    text: 'Demonstration review text two. This is not a real testimonial.',
    media: { kind: 'video', src: '/demo-tour-clip.mp4', label: 'Demonstration tour video', controls: true },
    isPlaceholder: true,
  },
];

describe('ReviewCarousel', () => {
  it('synchronizes the selected review text, tourist details, rating, and image or video', async () => {
    const user = userEvent.setup();
    render(<ReviewCarousel reviews={demoReviews} />);

    const firstSlide = screen.getByRole('group', { name: 'Review 1 of 2' });
    expect(within(firstSlide).getByText('Demonstration review text one. This is not a real testimonial.')).toBeInTheDocument();
    expect(within(firstSlide).getByText('Demonstration Guest One')).toBeInTheDocument();
    expect(within(firstSlide).getByText('Example Country')).toBeInTheDocument();
    expect(within(firstSlide).getByRole('img', { name: 'Demonstration guide beside a tourist' })).toHaveAttribute('loading', 'lazy');
    expect(within(firstSlide).getByLabelText('5 out of 5 stars')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next review' }));
    const secondSlide = await screen.findByRole('group', { name: 'Review 2 of 2' });
    expect(within(secondSlide).getByText('Demonstration review text two. This is not a real testimonial.')).toBeInTheDocument();
    expect(within(secondSlide).getByText('Demonstration Guest Two')).toBeInTheDocument();
    expect(within(secondSlide).getByText('Sample Country')).toBeInTheDocument();
    expect(within(secondSlide).getByLabelText('Demonstration tour video')).toBeInTheDocument();
    expect(within(secondSlide).queryByLabelText('5 out of 5 stars')).not.toBeInTheDocument();
  });

  it('supports keyboard navigation and optional pagination controls', async () => {
    const user = userEvent.setup();
    render(<ReviewCarousel reviews={demoReviews} />);

    const carousel = screen.getByRole('region', { name: 'Guest reviews' });
    carousel.focus();
    await user.keyboard('{ArrowRight}');
    expect(await screen.findByRole('group', { name: 'Review 2 of 2' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show review 1 of 2' }));
    expect(await screen.findByRole('group', { name: 'Review 1 of 2' })).toBeInTheDocument();
  });

  it('shows an accessible empty state when there are no reviews', () => {
    render(<ReviewCarousel reviews={[]} />);

    expect(screen.getByRole('status')).toHaveTextContent('Guest reviews will appear here when supplied.');
    expect(screen.queryByRole('button', { name: 'Next review' })).not.toBeInTheDocument();
  });

  it('provides a labeled fallback when a review has no media', () => {
    const [review] = demoReviews;
    if (!review) throw new Error('Expected a demonstration review');
    const reviewWithoutMedia: Review = { ...review, id: 'demo-no-media', media: undefined };
    render(<ReviewCarousel reviews={[reviewWithoutMedia]} />);

    expect(screen.getByRole('img', { name: 'Guide and tourist media placeholder' })).toHaveTextContent('Guide and tourist media to be added');
    expect(screen.getByRole('button', { name: 'Previous review' })).toBeDisabled();
    expect(screen.queryByRole('button', { name: /Show review/ })).not.toBeInTheDocument();
  });

  it('can hide pagination while keeping previous and next navigation', () => {
    render(<ReviewCarousel reviews={demoReviews} showPagination={false} />);

    expect(screen.getByRole('button', { name: 'Previous review' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next review' })).toBeEnabled();
    expect(screen.queryByRole('button', { name: /Show review/ })).not.toBeInTheDocument();
  });
});
