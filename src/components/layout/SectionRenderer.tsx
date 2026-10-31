import type { SectionSetting } from '../../types/section';
import { sectionRegistry } from '../../app/sectionRegistry';

export function SectionRenderer({ sections }: { sections: readonly SectionSetting[] }) {
  return <>{sections.map(({ id }) => {
    const Section = sectionRegistry[id];
    return <Section key={id} />;
  })}</>;
}
