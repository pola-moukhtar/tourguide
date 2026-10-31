# Project structure

This is the current application layout. `.gitkeep` files preserve empty image, video, and icon folders in version control. Reviewed unused legacy source files and videos were removed; build output (`dist/`) and installed packages (`node_modules/`) are generated and ignored.

```text
tour-guide-portfolio/
│
├── public/
│   ├── images/
│   │   ├── guide/.gitkeep
│   │   ├── destinations/.gitkeep
│   │   ├── tours/.gitkeep
│   │   ├── reviews/.gitkeep
│   │   ├── gallery/.gitkeep
│   │   └── hero/hero-mobile-placeholder.svg
│   ├── videos/
│   │   ├── hero/.gitkeep
│   │   ├── tours/.gitkeep
│   │   └── reviews/.gitkeep
│   ├── icons/.gitkeep
│   ├── favicon.ico
│   └── favicon.svg
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── App.test.tsx
│   │   ├── main.tsx
│   │   └── sectionRegistry.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── MobileMenu.test.tsx
│   │   │   └── SectionRenderer.tsx
│   │   ├── sections/
│   │   │   ├── Hero/
│   │   │   │   ├── Hero.tsx
│   │   │   │   └── HeroMedia.tsx
│   │   │   ├── About/About.tsx
│   │   │   ├── Destinations/
│   │   │   │   ├── DestinationCard.tsx
│   │   │   │   ├── DestinationDetail.tsx
│   │   │   │   ├── Destinations.test.tsx
│   │   │   │   └── Destinations.tsx
│   │   │   ├── Tours/
│   │   │   │   ├── Tours.tsx
│   │   │   │   ├── TourCard.tsx
│   │   │   │   ├── TourDetail.tsx
│   │   │   │   └── Tours.test.tsx
│   │   │   ├── Gallery/Gallery.tsx
│   │   │   ├── Reviews/
│   │   │   │   ├── Reviews.tsx
│   │   │   │   ├── ReviewCard.tsx
│   │   │   │   ├── ReviewCarousel.tsx
│   │   │   │   └── ReviewCarousel.test.tsx
│   │   │   ├── FAQ/FAQ.tsx
│   │   │   ├── Contact/Contact.tsx
│   │   │   └── CallToAction/CallToAction.tsx
│   │   ├── shared/
│   │   │   ├── Button.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── Media.tsx
│   │   │   ├── Media.test.tsx
│   │   │   ├── AnimatedSection.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   └── ui/
│   │       ├── CarouselControls.tsx
│   │       └── Modal.tsx
│   ├── config/
│   │   ├── site.config.ts
│   │   ├── sections.config.ts
│   │   ├── theme.config.ts
│   │   ├── navigation.config.ts
│   │   └── features.config.ts
│   ├── data/
│   │   ├── guide.ts
│   │   ├── tours.ts
│   │   ├── destinations.ts
│   │   ├── reviews.ts
│   │   ├── gallery.ts
│   │   └── faq.ts
│   ├── hooks/
│   │   ├── useCarousel.ts
│   │   └── useMediaQuery.ts
│   ├── lib/utils.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── animations.css
│   ├── test/setup.ts
│   └── types/
│       ├── media.ts
│       ├── review.ts
│       ├── tour.ts
│       └── section.ts
│
├── docs/
│   ├── content-guide.md
│   ├── deployment.md
│   ├── PROJECT_SPEC.md
│   ├── project-structure.md
│   ├── project-manual.md
│   └── phases-and-prompts.md
├── .github/workflows/deploy.yml
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── .gitignore
└── README.md
```

## Main responsibilities

- **`public/`** holds static images, video, icons, and favicons. Add guide-approved assets to the folder that matches their use. The hero currently uses the labeled SVG illustration in `public/images/hero/`.
- **`src/app/`** starts React, builds the homepage, and maps section IDs to section components.
- **`src/components/`** holds page layout, individual sections, shared presentation pieces, and small UI controls.
- **Destination and tour detail content** is rendered by `DestinationDetail.tsx` and `TourDetail.tsx` inside the shared native dialog in `src/components/ui/Modal.tsx`. The section owns the selected item; the data remains in its existing data file.
- **`src/config/`** controls site identity and metadata, theme tokens, navigation labels, hero media, section visibility/order, and active feature switches. `features.config.ts` currently controls review pagination; unused contact-form and autoplay flags were removed.
- **`src/data/`** holds typed page content. Review entries are examples and must be replaced only with approved reviews.
- **`src/hooks/`, `src/lib/`, `src/styles/`, and `src/types/`** hold reusable state logic, helpers, styling, and shared contracts.
- **`docs/`** explains content editing, deployment, project scope, and this file layout.
- **`.github/workflows/deploy.yml`** builds and deploys a static site when pushed to `main` after GitHub Pages is enabled. It does not deploy from the local workspace.

Unused legacy videos and source files from the original site were removed after review. Keep future approved media under `public/images/` or `public/videos/`. For adding, hiding, ordering, and removing sections, see [the maintenance guide in README](../README.md#section-maintenance).
