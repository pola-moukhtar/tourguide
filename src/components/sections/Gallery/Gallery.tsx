import { gallery } from '../../../data/gallery';
import { AnimatedSection } from '../../shared/AnimatedSection';
import { Container } from '../../shared/Container';
import { SectionHeading } from '../../shared/SectionHeading';
import { Media } from '../../shared/Media';

export function Gallery() {
  return <AnimatedSection id="gallery" className="section"><Container><SectionHeading eyebrow="IN PICTURES" title="A few moments along the way" />
    <div className="gallery-grid">{gallery.map((item) => <figure key={item.id}><Media media={item.media} /><figcaption>{item.caption}</figcaption></figure>)}</div>
  </Container></AnimatedSection>;
}
