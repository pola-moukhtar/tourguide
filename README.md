# Tour Guide Portfolio

A static, responsive portfolio foundation for an individual tour guide. The page uses clearly labeled example content; it does not claim to describe a real guide, offer real tours, or include real customer reviews.

## Start locally

Requires Node.js 22.12 or later.

```sh
npm install
npm run dev
```

Vite prints the local development URL. Other useful commands:

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

## Deployment

This builds to static files in `dist/` and does not need a backend, database, or secret. Use Node.js 22.12 or later. Before publishing, install from the lockfile and run:

```sh
npm ci
npm run typecheck
npm test
npm run build
```

Upload the contents of `dist/` to a static host. For a GitHub Pages project site, the Vite base path must match the repository path (including both slashes), for example `VITE_BASE_PATH=/repository-name/`. The existing workflow derives this path from GitHub’s repository name and deploys from `main` or a manual dispatch. Before relying on it, verify the repository name, intended branch, and Pages source setting in the repository; this workspace cannot confirm those settings. No deployment or repository setting was changed. See [deployment instructions](docs/deployment.md) for root-site builds, Windows syntax, media guidance, and hosting limits.

## Project structure

The tree below documents the tracked project files. `.gitkeep` files preserve empty asset folders until approved media is added. Generated `node_modules/` and `dist/` folders are excluded.

```text
tour-guide-portfolio/
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
│   │   │   ├── Hero/Hero.tsx
│   │   │   ├── Hero/HeroMedia.tsx
│   │   │   ├── About/About.tsx
│   │   │   ├── Destinations/Destinations.tsx
│   │   │   ├── Destinations/DestinationCard.tsx
│   │   │   ├── Destinations/DestinationDetail.tsx
│   │   │   ├── Destinations/Destinations.test.tsx
│   │   │   ├── Tours/Tours.tsx
│   │   │   ├── Tours/TourCard.tsx
│   │   │   ├── Tours/TourDetail.tsx
│   │   │   ├── Tours/Tours.test.tsx
│   │   │   ├── Gallery/Gallery.tsx
│   │   │   ├── Reviews/Reviews.tsx
│   │   │   ├── Reviews/ReviewCard.tsx
│   │   │   ├── Reviews/ReviewCarousel.tsx
│   │   │   ├── Reviews/ReviewCarousel.test.tsx
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

For a dedicated copy of the structure, see [docs/project-structure.md](docs/project-structure.md).

## Where to make changes

- `src/config/sections.config.ts`: turn sections on or off, change order, and select hero media. Navigation follows this visible order.
- `src/config/navigation.config.ts`: set labels for sections that should appear in the navigation; disabled sections are filtered out automatically.
- `src/config/features.config.ts`: active site-wide switches, currently review pagination visibility.
- `src/config/site.config.ts` and `src/config/theme.config.ts`: site identity, metadata, contact address, colors, type, spacing, and shared shape settings.
- `src/data/`: guide profile, destinations, tours, reviews, gallery items, and FAQ content.
- Destination and tour records control their own visibility with `isVisible`; each card opens a detail dialog populated from that record. See [the content guide](docs/content-guide.md) for add, update, hide, and remove steps.
- `src/components/sections/`: section presentation. Register a new section in `src/app/sectionRegistry.ts` and add its setting in `sections.config.ts`.
- `src/components/shared/Media.tsx`: shared image and video renderer.
- `src/styles/`: global design rules and animation tokens.

Read [the content guide](docs/content-guide.md) before replacing examples and [deployment notes](docs/deployment.md) for static hosting. The GitHub Pages workflow deploys when pushed to `main` after Pages is enabled for the repository.

For a file-by-file explanation and content maintenance recipes, read the [project manual](docs/project-manual.md). For the recorded phase briefs and additional project instructions, see [phases and prompts](docs/phases-and-prompts.md).

## Section maintenance

The homepage reads `sections.config.ts`, filters enabled entries, sorts them by `order`, and renders each one through `sectionRegistry.ts`. Navigation links use that same visible order and skip sections without a navigation entry.

- **Add a section:** create its component under `src/components/sections/`, add its ID to the `SectionId` union in `src/types/section.ts`, register the component in `src/app/sectionRegistry.ts`, then add an `{ id, enabled, order }` entry to `src/config/sections.config.ts`. Add a label in `src/config/navigation.config.ts` only if it should appear in the navigation. `App.tsx` and the section renderer do not need edits.
- **Edit a section:** change its content in the matching `src/data/` file; adjust its appearance in that section’s component and shared styles.
- **Hide or show a section:** change only its `enabled` value in `sections.config.ts`. Navigation updates automatically. The home and back-to-top links choose the first visible section if the hero is hidden.
- **Reorder sections:** change their `order` numbers in `sections.config.ts`. Use a distinct number for each section; navigation follows the same order.
- **Remove a section:** remove its config entry, navigation entry if present, registry entry, ID from `SectionId`, and component files. Remove section-only data only when it is no longer used. Remaining sections render from the updated registry and configuration.

Add a feature setting only alongside implemented behavior that consumes it; the current unused contact-form and autoplay flags were removed.
