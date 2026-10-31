# Content guide

The page is intentionally populated with examples so its layout can be reviewed. Replace them only with guide-approved copy and media.

## Main content files

- `src/data/guide.ts`: guide name, role, introduction, and biography.
- `src/data/destinations.ts`: destination cards and their detail-window content. Each item needs a unique `id`, name, short summary, and optional `MediaAsset`. Add confirmed long description, highlights, and visitor notes under `details` as they become available.
- `src/data/tours.ts`: experience cards and their detail-window content. Add confirmed descriptions, duration, itinerary, included items, and preparation notes under `details`. Do not add prices until they are supplied.

Destination and experience cards open an accessible in-page dialog. Copy an item in the relevant data file to add one, edit that object to update it, or remove that object to delete it. Set `isVisible: false` to hide an item while keeping its content for later; items are visible by default when `isVisible` is omitted. The section itself can still be enabled or disabled in `src/config/sections.config.ts`.
- `src/data/reviews.ts`: reviews in a dedicated file. Each needs a unique ID, tourist name, review text, and `isPlaceholder`; country, rating, date, media, and attribution are optional. Replace placeholder records only with real, approved reviews. The carousel reads all displayed content and media from each record, so adding or updating a review does not require editing its component.
- `src/data/gallery.ts`: gallery captions and optional media.
- `src/data/faq.ts`: confirmed questions and answers.

For image media, provide meaningful alternative text. For videos, provide a concise accessible label, keep autoplay muted, and consider adding a poster and a small mobile image. `src/components/shared/Media.tsx` selects the mobile image when configured, avoiding a desktop video download on narrow screens.

## Media locations

New website media belongs under `public/images/` or `public/videos/`, grouped by purpose. Public files are served from the site root and do not need to be imported. Use `import.meta.env.BASE_URL` when constructing a public URL that must work under a GitHub Pages repository path.

The old root-level MP4 videos and unused JavaScript/CSS files from the previous site were removed after review. Add new, approved assets under `public/images/` or `public/videos/`. The hero currently uses the labeled SVG illustration at `public/images/hero/hero-mobile-placeholder.svg`; change `heroMedia` in `src/config/sections.config.ts` when approved photography or video is ready.

## Section setup

Edit `src/config/sections.config.ts` to set `enabled` and `order`. The homepage renders enabled sections in that order, and navigation follows the same order while omitting disabled or unlinked sections. The brand and footer home links fall back to the first visible section if Hero is disabled. Calls to contact are shown only when Contact is enabled and a contact email is configured.

To add a section, create its component, add its ID to `SectionId` in `src/types/section.ts`, register it in `src/app/sectionRegistry.ts`, and add its enabled/order entry in `src/config/sections.config.ts`. Add a `navigation.config.ts` label only when you want the section linked in the main navigation. To hide, show, or reorder an existing section, edit only `sections.config.ts`. For complete add/edit/hide/show/reorder/remove steps, see [Section maintenance](../README.md#section-maintenance).

Keep external integrations disabled until the guide supplies contact details and a submission method. The old Google Apps Script URL has not been carried into this application.
