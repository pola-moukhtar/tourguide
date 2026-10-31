import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  label: string;
  previousLabel?: string;
  nextLabel?: string;
  disabled?: boolean;
}

export function CarouselControls({ onPrevious, onNext, label, previousLabel = 'Previous item', nextLabel = 'Next item', disabled = false }: CarouselControlsProps) {
  return <div className="carousel-controls" aria-label={label}>
    <button type="button" onClick={onPrevious} aria-label={previousLabel} disabled={disabled}><ArrowLeft aria-hidden="true" /></button>
    <button type="button" onClick={onNext} aria-label={nextLabel} disabled={disabled}><ArrowRight aria-hidden="true" /></button>
  </div>;
}
