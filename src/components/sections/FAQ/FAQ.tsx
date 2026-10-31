import { faq } from '../../../data/faq';
import { AnimatedSection } from '../../shared/AnimatedSection';
import { Container } from '../../shared/Container';
import { SectionHeading } from '../../shared/SectionHeading';

export function FAQ() {
  return <AnimatedSection id="faq" className="section"><Container className="faq-layout"><SectionHeading eyebrow="GOOD TO KNOW" title="A few helpful answers" />
    <div className="faq-list">{faq.map((item) => <details key={item.id}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
  </Container></AnimatedSection>;
}
