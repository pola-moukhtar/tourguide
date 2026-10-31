import { useState } from 'react';
import type { MediaAsset } from '../../types/media';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface MediaProps {
  media?: MediaAsset;
  className?: string;
  priority?: boolean;
  fallbackLabel?: string;
  fallbackText?: string;
}

function MissingMedia({ className = '', fallbackLabel, fallbackText }: Pick<MediaProps, 'className' | 'fallbackLabel' | 'fallbackText'>) {
  return <div className={`media-fallback ${className}`} role="img" aria-label={fallbackLabel ?? 'Media placeholder'}>{fallbackText ?? 'Image or video to be added'}</div>;
}

export function Media({ media, className = '', priority = false, fallbackLabel, fallbackText }: MediaProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [failed, setFailed] = useState(false);

  if (!media || failed) return <MissingMedia className={className} fallbackLabel={fallbackLabel} fallbackText={fallbackText} />;

  if (media.kind === 'image') {
    return (
      <picture className={className}>
        {media.mobileSrc && <source media="(max-width: 767px)" srcSet={media.mobileSrc} />}
        <img
          src={media.src}
          alt={isMobile ? media.mobileAlt ?? media.alt : media.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      </picture>
    );
  }

  if (isMobile && media.mobileImage) {
    return <Media media={media.mobileImage} className={className} priority={priority} />;
  }

  const videoSource = isMobile && media.mobileVideoSrc ? media.mobileVideoSrc : media.src;
  const autoplay = Boolean(media.autoplay);
  return (
    <video
      key={videoSource}
      className={className}
      aria-label={media.label}
      poster={media.poster}
      autoPlay={autoplay}
      muted={autoplay || media.muted !== false}
      loop={media.loop ?? false}
      controls={media.controls ?? false}
      playsInline
      preload={priority ? 'metadata' : media.preload ?? 'none'}
      onError={() => setFailed(true)}
    >
      <source src={videoSource} type="video/mp4" />
      Your browser does not support embedded video.
    </video>
  );
}
