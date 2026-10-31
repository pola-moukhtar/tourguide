import { useState } from 'react';
import { destinations } from '../../../data/destinations';
import type { Destination } from '../../../types/tour';
import { getVisibleItems } from '../../../lib/utils';
import { AnimatedSection } from '../../shared/AnimatedSection';
import { Container } from '../../shared/Container';
import { SectionHeading } from '../../shared/SectionHeading';
import { Modal } from '../../ui/Modal';
import { DestinationCard } from './DestinationCard';
import { DestinationDetail } from './DestinationDetail';

const visibleDestinations = getVisibleItems(destinations);

export function Destinations() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  return <AnimatedSection id="destinations" className="section section-destinations">
    <Container><div className="section-topline"><SectionHeading eyebrow="PLACES WITH A STORY" title="Where would you like to wander?" description="Replace these examples with destinations the guide knows and loves." />{visibleDestinations.length > 0 && <span className="section-number">01 — {String(visibleDestinations.length).padStart(2, '0')}</span>}</div>
      {visibleDestinations.length > 0 ? <div className="destination-grid">{visibleDestinations.map((destination, index) => <DestinationCard key={destination.id} destination={destination} index={index} onViewDetails={setSelectedDestination} />)}</div> : <p className="empty-state">Destination details will be shared here when available.</p>}
      <Modal id="destination-detail-dialog" open={selectedDestination !== null} eyebrow="DESTINATION" title={selectedDestination?.name ?? 'Destination details'} titleId="destination-detail-title" onClose={() => setSelectedDestination(null)}>
        {selectedDestination && <DestinationDetail destination={selectedDestination} />}
      </Modal>
    </Container>
  </AnimatedSection>;
}
