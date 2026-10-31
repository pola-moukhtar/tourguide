import type { Destination } from '../../../types/tour';
import { Media } from '../../shared/Media';

export function DestinationDetail({ destination }: { destination: Destination }) {
  const details = destination.details;

  return <article className="detail-content">
    <Media media={destination.media} className="detail-media" />
    <div className="detail-copy">
      {destination.isPlaceholder && <p className="detail-placeholder">Demonstration content · replace with guide-approved information</p>}
      <p className="detail-description">{details?.description ?? destination.summary}</p>
      {details?.highlights && details.highlights.length > 0 && <section className="detail-block">
        <h3>Highlights</h3>
        <ul>{details.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
      </section>}
      {details?.visitorNotes && <section className="detail-block"><h3>Visitor notes</h3><p>{details.visitorNotes}</p></section>}
      {destination.isPlaceholder && !details?.description && !details?.highlights?.length && !details?.visitorNotes && <p className="detail-pending">More destination information will be added when confirmed.</p>}
    </div>
  </article>;
}
