# Tour Guide Portfolio — project scope

## Objective

Build a professional, responsive static portfolio website for one individual tour guide. Use React, TypeScript, Vite, Tailwind CSS, Motion for React, Lucide React, Vitest, and React Testing Library. Keep the code maintainable for a developer learning React. The existing project may contain useful material, but its old implementation does not have to remain.

## Architecture

- Separate components, data, configuration, types, hooks, styles, and tests.
- Use a strongly typed section registry. Central configuration controls section order and visibility; navigation follows the sections enabled there.
- Keep content in dedicated data files and customization in readable configuration files.
- Use one typed shared Media component for images and video, including responsive options, accessibility text, loading behavior, and missing-media fallbacks.
- Keep section components small. A new section should need a component, a registry entry, and a configuration entry.

## Supported sections

Hero, About, Destinations, Tours and Experiences, Gallery, Reviews, FAQ, Contact, and optional calls to action. Each section can be independently enabled or disabled. The hero can use image or video media. Videos that autoplay must be muted. A configured mobile image should be used instead of downloading desktop video on mobile.

## Reviews

Review data belongs in `src/data/reviews.ts`. Support unique IDs, tourist name, optional country, review text, optional rating/date, optional image or video, and optional source attribution. The carousel updates the full review together, supports keyboard and touch, labels controls, respects reduced motion, and has autoplay disabled by default. Placeholder copy must remain clearly labeled and must never read like a real endorsement.

## Content safeguards

Do not invent guide details, destinations, tours, prices, contact information, or customer endorsements. Mark example content plainly. Preserve the existing videos until their contents and roles have been reviewed. Never overwrite original media without permission.

## Accessibility and performance

Use semantic HTML, sensible heading order, working keyboard navigation, visible focus, meaningful image alt text, reduced-motion support, responsive layouts, lazy loading below the fold, and suitable video loading behavior. Avoid horizontal overflow. Add basic page metadata and graceful missing-media and rendering fallbacks.

## Hosting and exclusions

The initial app is a static frontend with deployable assets and a configurable Vite base path for GitHub Pages or root-domain hosting. Keep deployment configuration separate from site content. Do not implement a chatbot, LLM integration, embeddings, vector storage, agent framework, retrieval pipeline, backend, or database.

## Agreed implementation phases

1. **Phase 1 — Foundation:** React/TypeScript/Vite/Tailwind setup, strict types, project structure, section registry/configuration, site/navigation/theme settings, shared components and Media, typed data, responsive initial page, safe placeholders, metadata/accessibility, tests, and developer documentation. Validate install, type checking, tests, production build, representative viewport layout, section order/visibility, and media switching.
2. **Phase 2 — Responsive design and visual polish:** refine the configurable hero media, navigation and mobile menu, About section, destination and tour cards, typography and spacing, centralized theme, responsive layouts from phones through large desktops, restrained reduced-motion-aware animations, calls to action, contrast, focus visibility, and accessible navigation. Preserve the architecture and do not invent guide facts, prices, destinations, or reviews.
3. **Phase 3 — Reviews carousel.**
4. **Phase 4 — Configuration and maintainability audit.**
5. **Phase 5 — Deployment preparation.**

The implementation brief for Phase 1 was provided by the site owner in the project conversation. This file records its scope so later phases can preserve the same constraints.
