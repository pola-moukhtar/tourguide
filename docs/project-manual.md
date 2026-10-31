# Tour Guide Portfolio — Project Manual

This guide describes the current codebase as it exists today. It is a static React application: the browser downloads built HTML, JavaScript, CSS, and public media. There is no server, database, login, or admin dashboard. Content changes are made in source files, then rebuilt and deployed.

## 1. How the application starts and renders

1. `index.html` supplies the document shell, viewport, icons, initial metadata, root element, and Vite entry script.
2. `src/app/main.tsx` imports global CSS, creates the React root, and mounts the application inside Strict Mode and the shared error boundary.
3. `src/app/App.tsx` reads site, theme, section, and navigation configuration. It updates document metadata, applies theme CSS variables, adds the skip link, and renders the navigation, configured sections, and footer.
4. `src/lib/utils.ts` filters and sorts section settings and derives navigation/home links.
5. `src/components/layout/SectionRenderer.tsx` maps the visible section IDs to the registry and renders them in order.
6. Each section imports its data and shared presentation components. Shared `Media` handles image/video output; shared `Modal` presents destination and experience details.

The homepage does not contain a hand-written list of section components. Visibility and order come from `src/config/sections.config.ts`; the registry in `src/app/sectionRegistry.ts` resolves each enabled ID to a component.

## 2. Project structure and file responsibilities

### Root files

| File | Purpose and important lines/parts |
| --- | --- |
| `index.html` | Static document shell. `lang`, charset, and viewport support browser/accessibility behavior; `%BASE_URL%` prefixes favicons; metadata is a safe initial value; `#root` is where React mounts; the module script points at `main.tsx`. |
| `package.json` | Declares runtime and development dependencies. Scripts are the supported commands: `dev`, `build`, `typecheck`, `test`, and `preview`. `build` runs TypeScript project checks before Vite bundles the site. |
| `package-lock.json` | Pins the dependency graph so `npm ci` can reproduce installs. Update it with package changes; do not edit it by hand. |
| `tsconfig.json` | References the app and tooling TypeScript projects. |
| `tsconfig.app.json` | Strict browser/app TypeScript settings, JSX, module resolution, and source include rules. |
| `tsconfig.node.json` | TypeScript settings for Vite/Vitest configuration files running in Node. |
| `vite.config.ts` | Enables React and Tailwind Vite plugins. `base` reads `VITE_BASE_PATH`, supporting `/` or a repository subpath. |
| `vitest.config.ts` | Configures jsdom, React plugin, test setup, and mock restoration for Vitest. |
| `.gitignore` | Excludes installed packages, builds, test output, local env/secrets, logs, temp files, and local IDE settings. `.env.example` is deliberately allowed. |
| `README.md` | Quick start, checks, deployment, current tree, and maintenance summary. |

### Application entry and layout

| File | Purpose and important lines/parts |
| --- | --- |
| `src/app/main.tsx` | Imports `globals.css`, locates `#root`, and mounts `<App />` in React Strict Mode and `ErrorBoundary`. This is the one browser entry point. |
| `src/app/App.tsx` | Converts theme values into CSS custom properties; computes visible sections/navigation/home target; sets page language/title/description/social metadata; repairs a direct section hash after first render; composes skip link, Navbar, `main`, SectionRenderer, and Footer. |
| `src/app/sectionRegistry.ts` | Exhaustive `Record<SectionId, ComponentType>` mapping. TypeScript catches a missing component mapping when `SectionId` grows. |
| `src/components/layout/SectionRenderer.tsx` | Receives already-filtered/sorted settings, resolves each ID from the registry, and renders with stable section ID keys. |
| `src/components/layout/Navbar.tsx` | Responsive desktop navigation and mobile-menu trigger; receives links from configuration-derived props instead of maintaining a second list. |
| `src/components/layout/MobileMenu.tsx` | Touch/keyboard-friendly mobile navigation state and menu behavior. Choosing a link closes the menu. |
| `src/components/layout/Footer.tsx` | Site footer and home link; its target comes from the same visible-section calculation as the navigation. |

### Sections

All section components present content and behavior; content records live under `src/data/`. Section heading, container, animation, button, media, modal, cards, and controls are shared where appropriate.

| File(s) | Purpose |
| --- | --- |
| `src/components/sections/Hero/Hero.tsx` | Top section: guide-facing headline/intro, calls to action, and hero media. Reads `heroMedia` from section configuration. |
| `src/components/sections/Hero/HeroMedia.tsx` | Hero-specific composition around the shared Media renderer. It does not implement a second `<img>`/`<video>` pipeline. |
| `src/components/sections/About/About.tsx` | Presents the guide profile from `data/guide.ts`. |
| `src/components/sections/Destinations/Destinations.tsx` | Filters visible destination records and lays out cards/detail state. |
| `src/components/sections/Destinations/DestinationCard.tsx` | Visual destination card; selecting it opens a detail view using that record. |
| `src/components/sections/Destinations/DestinationDetail.tsx` | Destination-specific modal content. It receives a selected destination rather than embedding destination facts. |
| `src/components/sections/Tours/Tours.tsx` | Filters visible tour records, lays out cards, and coordinates selected experience detail state. |
| `src/components/sections/Tours/TourCard.tsx` | Experience card and selection affordance. |
| `src/components/sections/Tours/TourDetail.tsx` | Experience-specific modal content populated from the chosen record. |
| `src/components/sections/Reviews/Reviews.tsx` | Section shell and review data handoff to the carousel. |
| `src/components/sections/Reviews/ReviewCarousel.tsx` | Selects one complete review at a time, including its media and text, controls transitions, keyboard behavior, and empty state. Adding a record does not require carousel edits. |
| `src/components/sections/Reviews/ReviewCard.tsx` | Presentation of the selected review details and media. |
| `src/components/sections/Gallery/Gallery.tsx` | Maps gallery records into a responsive media layout. |
| `src/components/sections/FAQ/FAQ.tsx` | Presents configured FAQ question/answer records. |
| `src/components/sections/Contact/Contact.tsx` | Shows contact action only when a contact email is configured; this is a `mailto:` link, not a message-submission backend. |
| `src/components/sections/CallToAction/CallToAction.tsx` | Optional CTA section; visibility is controlled like other sections. |

### Shared components and hooks

| File | Purpose and important parts |
| --- | --- |
| `src/components/shared/Media.tsx` | Central image/video rendering. It chooses mobile alternatives, sets alt/label, lazy/eager loading, decoding/fetch priority, video poster/preload/controls/loop/muted/autoplay, and renders a labelled fallback if media is absent or fails. Autoplay is off unless configured, and autoplay is muted. |
| `src/components/shared/Container.tsx` | Reusable content-width wrapper. |
| `src/components/shared/SectionHeading.tsx` | Consistent section heading and optional supporting copy. |
| `src/components/shared/Button.tsx` | Shared button/link styling and variants. Use a real link for navigation and a button for an action. |
| `src/components/shared/AnimatedSection.tsx` | Reusable entrance animation that can respect reduced-motion preferences. |
| `src/components/shared/ErrorBoundary.tsx` | Catches render errors below the boundary and displays a fallback instead of leaving a blank page. |
| `src/components/ui/Modal.tsx` | Shared native dialog wrapper for card details, including open/close lifecycle, close control, and dialog semantics. |
| `src/components/ui/CarouselControls.tsx` | Shared accessible previous/next control presentation. |
| `src/hooks/useCarousel.ts` | Reusable index movement and wrapping behavior for a list. |
| `src/hooks/useMediaQuery.ts` | Tracks a media query for responsive behavior and updates when the viewport changes. |
| `src/lib/utils.ts` | Small shared pure helpers: section filtering/sorting, navigation filtering/order, home-link fallback, item visibility, and base-safe URL helpers. Pure functions are easy to test. |

### Configuration

| File | What to change |
| --- | --- |
| `src/config/sections.config.ts` | Each section has `id`, `enabled`, and `order`. The same file currently sets `heroMedia`. |
| `src/config/navigation.config.ts` | Navigation label and inclusion for section IDs. The app filters entries against enabled sections and follows section order. |
| `src/config/site.config.ts` | Public site name, tagline, description, language, and optional contact email. Do not put secrets here. |
| `src/config/theme.config.ts` | Central color, font, radius, content-width, and section-spacing values. `App.tsx` exposes them as CSS variables. |
| `src/config/features.config.ts` | Implemented optional switches only; currently controls review pagination visibility. |

### Content data and types

| File | Purpose |
| --- | --- |
| `src/data/guide.ts` | Guide display name, role, introduction, about copy, and placeholder marker. |
| `src/data/destinations.ts` | Destination records. |
| `src/data/tours.ts` | Tour/experience records. |
| `src/data/reviews.ts` | Review records; current entries are explicitly marked layout placeholders and are not endorsements. |
| `src/data/gallery.ts` | Gallery captions/media and placeholder marker. |
| `src/data/faq.ts` | FAQ question/answer records and placeholder marker. |
| `src/types/media.ts` | Discriminated image/video union, including responsive choices and video behavior. |
| `src/types/review.ts` | Review fields: ID, tourist, optional country/rating/date/media/attribution, text, and placeholder marker. |
| `src/types/tour.ts` | Shared tour and destination record types and visibility fields. |
| `src/types/section.ts` | Allowed section ID union, strongly typed section settings, and navigation item shape. |

### Styles, tests, and static files

| File/folder | Purpose |
| --- | --- |
| `src/styles/globals.css` | Tailwind import, design-token defaults, global element rules, responsive layouts, component classes, visible focus, skip link, modal/cards/navigation styles, and reduced-motion overrides. Theme colors/spacing use variables supplied by `App`. |
| `src/styles/animations.css` | Shared keyframes/animation rules used by reusable motion styling. |
| `src/test/setup.ts` | Loads Testing Library matchers and test environment setup. |
| `src/app/App.test.tsx` | App composition, configured rendering, and navigation/hash behavior. |
| `src/components/layout/MobileMenu.test.tsx` | Mobile menu interaction and accessibility checks. |
| `src/components/sections/Destinations/Destinations.test.tsx` | Destination list/detail interaction behavior. |
| `src/components/sections/Tours/Tours.test.tsx` | Experience list/detail interaction behavior. |
| `src/components/sections/Reviews/ReviewCarousel.test.tsx` | Review navigation, synchronization, keyboard behavior, empty state, and media-related rendering. |
| `src/components/shared/Media.test.tsx` | Image/video selection and missing/failing-media behavior. |
| `public/images`, `public/videos`, `public/icons` | Static assets served as files. Use purpose folders and base-aware URLs; do not place credentials here. Empty `.gitkeep` markers preserve folder structure. |
| `public/favicon.ico`, `public/favicon.svg` | Browser/site icons. |
| `.github/workflows/deploy.yml` | Optional GitHub Actions static build/deploy workflow; it does not change repository Pages settings. |
| `docs/content-guide.md` | Content and media editing notes. |
| `docs/deployment.md` | Static build and hosting instructions. |
| `docs/project-structure.md` | Full current tree. |
| `docs/PROJECT_SPEC.md` | Project scope and persistent constraints. |

## 3. Content editing recipes

All source-data edits below require a new build and deployment to become public. Keep IDs unique and stable. Use the types in `src/types/` as the authoritative field list; TypeScript reports missing or wrongly typed fields.

### Guide profile

Edit `src/data/guide.ts`. Replace the placeholder values only with approved guide information. Update `isPlaceholder` when real approved copy replaces the example. Do not put an email or secret in this file; the public contact address belongs in `site.config.ts`.

### Destinations

Edit `src/data/destinations.ts`. Add a record that satisfies `Destination` with a unique `id`, name, summary, and `isPlaceholder` marker. Optional supported fields are visible in `src/types/tour.ts` (for example media/detail copy, depending on the declared type). Set `isVisible: false` to hide a record; set it to `true` or omit it to show. Delete the object to remove it permanently. Cards and detail dialogs read from the record.

### Tours and experiences

Edit `src/data/tours.ts`. Add a uniquely identified `Tour` record and fill only fields declared in `src/types/tour.ts`. Set `isVisible: false` to hide, `true`/omitted to show, and remove the object to delete. The card and detail dialog update from the record without editing their components.

### Reviews

Edit `src/data/reviews.ts`. Each review requires a unique ID, tourist-name field, text, and `isPlaceholder`. Country, rating, date, media, and attribution are optional. Keep `isPlaceholder: true` for instructional examples; only use a real review after it is supplied and approved. The carousel consumes each full record, so media and all copy change as one item. There is currently no `isVisible` field: hiding a review means removing it from the array until individual visibility support is added.

### Gallery and FAQ

Edit `src/data/gallery.ts` or `src/data/faq.ts` respectively. Add/remove/update records there. Both record types currently have no item-level visibility flag, so hide by removing the record (keep it in version history) or by disabling the whole section. Add typed `isVisible` support and filter it in the section if individual hide/show is needed.

### Media

Place approved files in `public/images/<purpose>/` or `public/videos/<purpose>/`. Public asset strings should include `import.meta.env.BASE_URL` when built URLs are assembled in code. Create an `ImageMedia` object with `kind: 'image'`, `src`, and meaningful `alt`, or `VideoMedia` with `kind: 'video'`, `src`, and a concise `label`. Optional mobile image/video, poster, preload, loop, autoplay, muted, and controls fields are declared in `src/types/media.ts`. Prefer `mobileImage` to avoid downloading desktop video to phones. Do not enable audible autoplay.

### Contact and identity

Set the public email in `src/config/site.config.ts` when supplied. Contact stays absent as a usable email action while this value is empty. This only opens the visitor’s email app; it does not submit or retain form data.

## 4. Section add, hide, show, reorder, remove

### Hide or show a complete section

Edit its `enabled` value in `src/config/sections.config.ts`. The homepage and matching navigation are derived from enabled sections. Gallery, FAQ, and CallToAction are currently disabled there. Do not hide a section by adding conditionals inside its component.

### Reorder sections

Change `order` values in `sections.config.ts`; lower values appear earlier. Keep values distinct for an unambiguous order. Navigation derives the same visible order.

### Add a section

1. Create a focused component under `src/components/sections/<SectionName>/`.
2. Add its string ID to `SectionId` in `src/types/section.ts`.
3. Import/map it in `src/app/sectionRegistry.ts`.
4. Add one `id/enabled/order` entry in `src/config/sections.config.ts`.
5. Add a `sectionId/label` entry in `src/config/navigation.config.ts` if it belongs in the navigation.
6. Add typed content in `src/data/` when needed; add/extend a type in `src/types/`.
7. Add tests for new behavior and update `docs/project-structure.md` and README tree if a file was added.

The homepage renderer itself should not need editing. Run `npm run typecheck`, `npm test`, and `npm run build` after changes.

### Remove a section

Remove its config entry, navigation entry, registry import/mapping, ID union member, component files, and any data/types used only by it. Check shared usage before removing a shared component. The registry and `SectionId` are exhaustive TypeScript contracts, so an incomplete removal should surface as a type error.

## 5. Architecture boundaries and future admin dashboard

Today, the records are static TypeScript imports bundled with the site. This keeps a small portfolio simple and type-checked, but an admin cannot edit live data through a browser. Tours and destinations have per-item visibility; review/gallery/FAQ item visibility is not implemented. Section enable/order is configuration-time only. There is no content API or repository abstraction yet.

For a hosted dashboard, a clean future change would introduce a content service boundary (read published content from an API; write only through authenticated admin endpoints), typed server/database records with stable IDs and visibility/order fields, and media records containing storage key, URL, alt text, poster, and responsive variants. The public static site could fetch published records at runtime or consume content during a rebuild. A separate protected admin surface would validate inputs and enforce roles. A managed database/storage provider can do this, but privileged keys must never be shipped in `VITE_*` client variables. Use server-side authorization or provider row-level security and signed/presigned uploads. Keep the current static mode available until a concrete backend is chosen.

## 6. Checks and practical limitations

- `npm run typecheck`: strict app and tooling types.
- `npm test`: Vitest/Testing Library unit and component tests.
- `npm run build`: type-checks then writes static output to `dist/`.
- `npm run dev`: local Vite server.
- `npm run preview`: serves the production output locally.

Component tests do not substitute for browser checks at phone/tablet/desktop sizes, real keyboard/screen-reader review, media network inspection, or contrast auditing. There is no automated accessibility scanner or end-to-end browser suite currently. The static site has no server-side contact form and cannot protect private data embedded in the frontend bundle. See `deployment.md` before publishing.

## 7. How to read a source file

In a typical `.tsx` file, imports at the top show its dependencies; `interface`/`type` declarations define the inputs; the exported function is the component; hooks near its start manage local interactive state; derived variables prepare display data; the returned JSX describes semantic HTML and component composition; `className` values refer to `globals.css` and/or Tailwind utilities. In `.ts` data files, exported objects/arrays are the editable content and imported types describe required fields. In configuration, values are intended knobs; do not add a knob unless code reads it. Comments explain non-obvious decisions, while type declarations and function bodies are the source of truth for behavior.

This manual explains each current file and the purpose of its important blocks/operations. It intentionally does not paraphrase every punctuation mark or repeat every style declaration: individual CSS declarations are best changed alongside the selector and token they belong to, and all JSX details should be read in the relevant component listed above.
