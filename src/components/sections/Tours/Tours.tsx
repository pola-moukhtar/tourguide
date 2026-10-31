import { useState } from 'react';
import { tours } from '../../../data/tours';
import type { Tour } from '../../../types/tour';
import { getVisibleItems } from '../../../lib/utils';
import { AnimatedSection } from '../../shared/AnimatedSection';
import { Container } from '../../shared/Container';
import { SectionHeading } from '../../shared/SectionHeading';
import { Modal } from '../../ui/Modal';
import { TourCard } from './TourCard';
import { TourDetail } from './TourDetail';

const visibleTours = getVisibleItems(tours);

export function Tours() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  return <AnimatedSection id="tours" className="section section-tours"><Container>
    <SectionHeading eyebrow="MADE FOR THE MOMENT" title="Experiences, not checklists." description="The final experiences will be added with the guide’s confirmed details." />
    {visibleTours.length > 0 ? <div className="tour-grid">{visibleTours.map((tour) => <TourCard key={tour.id} tour={tour} onViewDetails={setSelectedTour} />)}</div> : <p className="empty-state">Experience details will be shared here when available.</p>}
    <Modal id="tour-detail-dialog" open={selectedTour !== null} eyebrow="GUIDED EXPERIENCE" title={selectedTour?.title ?? 'Experience details'} titleId="tour-detail-title" onClose={() => setSelectedTour(null)}>
      {selectedTour && <TourDetail tour={selectedTour} />}
    </Modal>
  </Container></AnimatedSection>;
}
