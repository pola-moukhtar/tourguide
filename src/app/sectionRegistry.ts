import type { ComponentType } from 'react';
import type { SectionId } from '../types/section';
import { Hero } from '../components/sections/Hero/Hero';
import { About } from '../components/sections/About/About';
import { Destinations } from '../components/sections/Destinations/Destinations';
import { Tours } from '../components/sections/Tours/Tours';
import { Gallery } from '../components/sections/Gallery/Gallery';
import { Reviews } from '../components/sections/Reviews/Reviews';
import { FAQ } from '../components/sections/FAQ/FAQ';
import { Contact } from '../components/sections/Contact/Contact';
import { CallToAction } from '../components/sections/CallToAction/CallToAction';

export const sectionRegistry: Record<SectionId, ComponentType> = {
  hero: Hero,
  about: About,
  destinations: Destinations,
  tours: Tours,
  gallery: Gallery,
  reviews: Reviews,
  faq: FAQ,
  contact: Contact,
  callToAction: CallToAction,
};
