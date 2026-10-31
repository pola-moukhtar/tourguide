# Static deployment

The production output is a static site in `dist/`. The page does not need a database, API server, build-time secret, or environment secret to render. The only optional setting is `VITE_BASE_PATH`, which controls the URL prefix used by built assets.

## Requirements and local checks

- Node.js 22.12 or later and npm.
- Install dependencies with `npm ci` from the lockfile.
- Run `npm run typecheck`, `npm test`, then `npm run build` before publishing.
- Upload the contents of `dist/`; do not upload `node_modules/` or generated local files.

`npm run preview` serves the built output locally. This project uses fragment links such as `#tours` and has no client-side route paths, so the hosting provider only needs to serve `index.html` at the site root.

## Root domain hosting

The Vite base defaults to `/`, suitable for a site served at a domain root. Build with:

```sh
npm run build
```

Upload the generated `dist/` directory to a static host.

## GitHub Pages project site

For a repository site such as `https://account.github.io/repository/`, build with:

```sh
VITE_BASE_PATH=/repository/ npm run build
```

In PowerShell, use:

```powershell
$env:VITE_BASE_PATH = '/repository/'
npm run build
Remove-Item Env:VITE_BASE_PATH
```

Set the value to the exact repository path, including both slashes. A user or organization site served at `https://account.github.io/` uses `/` instead. `vite.config.ts` applies this base path to bundled assets. Public asset references should use `import.meta.env.BASE_URL` when constructed in code.

The existing workflow at `.github/workflows/deploy.yml` builds and deploys on pushes to `main` and on manual dispatch. It derives `/repository-name/` for project sites and `/` for `owner.github.io` sites. Before using that workflow, confirm the actual repository name, that `main` is the intended deployment branch, and that the repository’s Pages source is set to GitHub Actions. Those repository settings are not stored in this workspace and were not changed as part of this preparation.

The workflow requires no application secret. Never commit `.env` files, personal tokens, or provider credentials. `.gitignore` excludes `.env*`, `dist/`, and `node_modules/`; it allows `.env.example` for non-secret documentation only.

## Assets and hosting limits

The current `public/` media is a small SVG hero illustration and favicons. Legacy root MP4s and source files were removed after review. Add only approved media under `public/images/` or `public/videos/`. Prefer optimized WebP or AVIF images with responsive variants. Compress videos, supply a poster and a lightweight mobile image, and keep autoplay muted; static hosting does not transcode or resize media for you.

Contact is a `mailto:` link only after an email is configured; static hosting does not receive or store form submissions. A future form or dynamic booking flow would need a separate form provider or backend. Hosting plans and free-tier commercial-use terms vary, so confirm the chosen provider’s current limits before publishing for commercial use.
