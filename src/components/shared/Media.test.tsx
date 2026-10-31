import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Media } from './Media';

describe('Media', () => {
  it('renders an accessible image with lazy loading by default', () => {
    render(<Media media={{ kind: 'image', src: '/guide.jpg', alt: 'A guide outdoors' }} />);
    expect(screen.getByRole('img', { name: 'A guide outdoors' })).toHaveAttribute('loading', 'lazy');
  });

  it('shows a labeled fallback when media is missing', () => {
    render(<Media />);
    expect(screen.getByRole('img', { name: 'Media placeholder' })).toBeInTheDocument();
  });

  it('renders videos muted when autoplay is enabled', () => {
    render(<Media media={{ kind: 'video', src: '/journey.mp4', label: 'Journey video', autoplay: true }} />);
    expect((screen.getByLabelText('Journey video') as HTMLVideoElement).muted).toBe(true);
  });

  it('uses the configured mobile image instead of a video on a narrow viewport', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
    render(<Media media={{
      kind: 'video', src: '/desktop.mp4', label: 'Journey video',
      mobileImage: { kind: 'image', src: '/mobile.jpg', alt: 'Mobile journey image' },
    }} />);
    expect(screen.getByRole('img', { name: 'Mobile journey image' })).toHaveAttribute('src', '/mobile.jpg');
  });
});
