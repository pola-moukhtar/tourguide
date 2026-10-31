import type { Tour } from '../../../types/tour';
import { Media } from '../../shared/Media';

export function TourDetail({ tour }: { tour: Tour }) {
  const details = tour.details;

  return <article className="detail-content">
    <Media media={tour.media} className="detail-media" />
    <div className="detail-copy">
      {tour.isPlaceholder && <p className="detail-placeholder">Demonstration content · replace with guide-approved information</p>}
      {tour.duration && <p className="detail-duration">{tour.duration}</p>}
      <p className="detail-description">{details?.description ?? tour.summary}</p>
      {details?.itinerary && details.itinerary.length > 0 && <section className="detail-block">
        <h3>Itinerary</h3>
        <ol>{details.itinerary.map((stop, index) => <li key={`${index}-${stop}`}>{stop}</li>)}</ol>
      </section>}
      {details?.included && details.included.length > 0 && <section className="detail-block">
        <h3>What’s included</h3>
        <ul>{details.included.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>}
      {details?.preparation && <section className="detail-block"><h3>Before you go</h3><p>{details.preparation}</p></section>}
      {tour.isPlaceholder && !details?.description && !details?.itinerary?.length && !details?.included?.length && !details?.preparation && <p className="detail-pending">Experience information will be added after details are confirmed.</p>}
    </div>
  </article>;
}
