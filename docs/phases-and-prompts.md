# Project Phases and Prompts

This document preserves the project scope, the five implementation phase briefs, and the additional instructions that shaped the work. Prompts are retained so future changes can be checked against the owner’s intent. The five phases are complete as a project sequence; any new work should be approved before it begins.

## Project-wide scope (Phase 1 analysis brief)

> I have an existing tour guide portfolio website built with HTML, CSS, and JavaScript. Modernize and restructure it into a professional, responsive, maintainable website for an individual tour guide. Existing project content and media may be useful; the old implementation need not be preserved. The content will be replaced and expanded later. Do not invent real guide information, testimonials, prices, or contact details. The main objective is a clean architecture that makes future modifications easy.
>
> Use React, TypeScript, Vite, Tailwind CSS, Motion for React, Lucide React, Vitest, and React Testing Library, with compatible stable versions. Keep components, data, configuration, types, hooks, styles, and tests in clear responsibilities. Use a typed section registry and centralized section visibility/order configuration. Keep navigation consistent with enabled sections. Design to support Hero, About, Destinations, Tours/Experiences, Gallery, Reviews, FAQ, Contact, and optional CTA sections, each independently configurable.
>
> Use one reusable strongly typed Media component for images and videos: alt text, video posters, autoplay/muted/loop settings, responsive media, sensible loading, missing-media fallback, and mobile alternatives that avoid downloading a large desktop video when a mobile image is configured. Autoplay video must be muted.
>
> Reviews belong in a dedicated data file and support unique ID, tourist name, optional country, text, optional rating/date, image/video, and optional attribution. The guide-and-tourist media sits beside the review on desktop and stacks on mobile. Previous/next controls keep media and review details synchronized; subtle transitions, optional pagination, keyboard operation, accessible labels, reduced-motion support, no autoplay by default, stable layout, and empty/missing-media handling are required. Use marked placeholders, never fabricated endorsements; adding a review must not require editing the carousel.
>
> Use mobile-first responsive layouts across small phones through large desktops. Support touch and keyboard navigation, no horizontal overflow, comfortable controls, centralized site/theme/content/feature configuration, and readable developer-facing documentation. Avoid unnecessary dependencies/abstractions, excessive gradients/glass/animation, and generic styling. Preserve useful existing assets until reviewed; never overwrite original media without permission.
>
> Implement semantic HTML, headings, labeled forms, visible focus, meaningful alt text, reduced motion, responsive images, lazy below-the-fold media, suitable video loading, page metadata, and graceful errors. The initial app is a static frontend that builds into deployable assets, supports the configured base path including GitHub Pages, and needs no database, permanent backend, paid API, or secret. Keep deployment config separate. RAG/chatbot/LLM/embeddings/vector DB/agents/Python backend/retrieval pipelines are explicitly out of scope until the portfolio is complete.
>
> First task is analysis only: do not change application files. Inspect the whole project and identify current files and responsibilities, useful assets, links/forms/interactions, bugs/limitations, proposed structure, deployment considerations, and phased plan. Recommend the smallest clean architecture, explain trade-offs for a beginner, and wait for approval before implementation.

## Phase 1 — Foundation and initial implementation

The owner’s implementation brief asked to review the approved plan and files, then:

1. Set up React, TypeScript, Vite, and Tailwind; enable strict TypeScript.
2. Create the agreed folder structure.
3. Implement section registry/configuration and site, navigation, and theme configuration.
4. Create shared layout/UI and typed image/video Media component.
5. Create strongly typed tour, destination, review, gallery, and FAQ data structures.
6. Implement the responsive homepage with identified placeholder content, metadata, accessibility, and error handling.
7. Configure unit testing and document project modifications.
8. Preserve existing assets unless reviewed; avoid backend/RAG, giant components, duplicated media logic, hardcoded review text/section visibility, fake reviews, or inert-looking controls.
9. Validate install, typechecking, build, tests, mobile/desktop layout where browser tools are available, section ordering/visibility, and image/video switching. Report changed files, architecture, actual checks, limitations, and dev-server command.

## Phase 2 — Responsive design and visual polish

> Improve the visual design of the existing Tour Guide Portfolio. First inspect the current implementation and preserve the approved architecture.
>
> Focus on:
> - A polished hero section with configurable image or video media.
> - A professional navigation bar and mobile menu.
> - A clear About section.
> - Attractive destination and tour cards.
> - Consistent typography, spacing, and visual hierarchy.
> - A coherent theme that can be changed centrally.
> - Responsive layouts for phones, tablets, laptops, and large desktops.
> - Smooth but restrained scroll and entrance animations.
> - Clear calls to action.
> - Good contrast, visible keyboard focus, and accessible navigation.
>
> Use existing media assets when appropriate, but do not assume that they represent the final content. Do not fabricate guide credentials, prices, destinations, or customer reviews. Do not implement RAG. After implementation, run the build and tests and fix any regressions.

## Phase 3 — Reviews carousel

> Implement the customer reviews section.
>
> Requirements:
> 1. Store review data separately from the components.
> 2. Support tourist name, country, review text, optional rating, and optional image or video.
> 3. Display the guide-and-tourist media beside the review on desktop.
> 4. Use a readable vertical layout on mobile.
> 5. Implement previous and next buttons.
> 6. Keep the photo or video and all review text synchronized.
> 7. Animate transitions with a subtle fade-and-slide effect.
> 8. Include optional pagination indicators.
> 9. Support keyboard navigation and accessible button labels.
> 10. Respect reduced-motion preferences.
> 11. Disable autoplay by default.
> 12. Prevent layout shifts during transitions.
> 13. Handle empty review lists and missing media gracefully.
>
> Adding a review must require editing only the review data file. Do not fabricate real testimonials. Use clearly marked demonstration data or placeholders. Add tests for navigation, content synchronization, empty data, and media rendering. Run the tests and production build before reporting completion.

## Phase 4 — Configuration and maintainability audit

> Audit the entire Tour Guide Portfolio for maintainability. Do not redesign the website unless a specific problem requires it.
>
> Verify that sections can be enabled/disabled and reordered centrally; hidden sections do not render; navigation matches enabled sections; adding a section requires component, registry entry, and configuration entry; tours, destinations, gallery items, FAQs, and reviews remain separate from presentation; image/video rendering uses shared Media; site/theme settings are centralized; behavior does not depend on duplicated config; no inert buttons are presented as working; strict TypeScript is enabled; dependencies/abstractions are justified; and README explains maintenance.
>
> Fix verified problems and add tests where appropriate. Finish with a practical guide to add, edit, hide, show, reorder, and remove a section.

## Phase 5 — Deployment preparation

> Prepare the completed Tour Guide Portfolio for static deployment.
>
> Requirements:
> 1. Verify the production build.
> 2. Ensure the website does not require a backend server.
> 3. Document environment and build requirements.
> 4. Configure the selected hosting provider's base path correctly.
> 5. Verify static assets after deployment.
> 6. Check navigation, media, and page refresh behavior.
> 7. Optimize images and videos where appropriate.
> 8. Add deployment instructions to README.
> 9. Configure automated deployment only after confirming the target provider and repository settings.
> 10. Avoid secrets and unnecessary generated files.
>
> Explain hosting limitations. Do not deploy or change repository settings without approval. Run applicable checks and report actual results.

## Additional owner prompts and decisions

### Project tree and structure documentation

The owner supplied a proposed tree covering `public/images` and `public/videos` purpose folders; `src/app`, layout, section, shared and UI components; config, data, hooks, lib, styles, types; docs; GitHub workflow; and root Vite/TypeScript/package files. They asked to record it in a `project structure` Markdown file, ensure files were in the right place, include new files in the tree, and put the tree in README. The current tree documents actual files, including tests and current extra components.

### Card detail windows

The owner asked whether destination/experience cards could open an in-site detail window like a supplied portfolio reference, whether the tree would change, what it would contain, whether it was recommended, and then asked for the full proposed tree and to implement the agreed structure. Current implementation includes `DestinationDetail.tsx`, `TourDetail.tsx`, and shared `ui/Modal.tsx`; selected record data populates each detail view.

### Modal follow-up

The owner asked to run Phase 2 again because the opened modal looked poor, then reported a `GUIDED EXPERIENCE` dialog that opened by itself and would not close. Those instructions mean modal behavior/design should be checked if future visual work touches it; do not change it as part of documentation-only work.

### Original-file cleanup and Git ignore

The owner requested removing original files no longer in use and ensuring `.gitignore` excludes unnecessary upload/generated files. The project README and deployment guide describe the reviewed cleanup and current ignore rules. The deployment workflow and repository settings must remain unchanged absent approval.

### Audit and documentation request

The owner requested a no-code audit of architecture, data, media, content/presentation separation, admin-dash readiness, CRUD/visibility/order capability, hosted DB/media-storage changes, security/accessibility/responsive/testing concerns, a prioritized plan, and approval before new application work. They then requested this comprehensive project manual and this phases/prompts record. This documentation task does not authorize implementing a dashboard or backend.

## Current explicit exclusions

No RAG, chatbot, LLM API, embeddings, vector database, agent framework, retrieval pipeline, Python service, database, or permanent backend is implemented. No real guide credentials, destinations, prices, contact information, or customer endorsements should be invented.
