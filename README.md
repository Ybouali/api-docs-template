# API Developer Portal Template

A **reusable, API-agnostic developer portal**. Clone it, change configuration and content, and publish documentation for any HTTP API (SaaS, fintech, logistics, internal platforms).

This is **not** an API backend, auth server, or sandbox that calls your production APIs. It is a static React app: docs, a data-driven API reference, search, and theming.

## Features

- Central config for company name, colors, API URLs, and sidebar navigation
- Documentation pages driven by typed content (not hardcoded UI copy)
- API reference components: method badge, path, parameter table, status codes, code tabs
- Client-side search (Fuse.js) over pages, endpoints, and errors — <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd>
- Light / dark theme (system default, persisted)
- Responsive sidebar, skip link, keyboard-friendly search
- CI: lint, typecheck, tests, and production build

## Tech stack

React 19, TypeScript, Vite 7, Tailwind CSS v4, React Router 7, Framer Motion, Lucide, Fuse.js, Vitest.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL Vite prints (typically `http://localhost:5173`).

## Configuration

Edit **`src/config/site.ts`**. That file is the source of truth for:

| Section | What it controls |
| --- | --- |
| `company` | Name, description, logo, favicon, support email, social links |
| `branding` | Primary/accent/success/error colors, font, default theme |
| `api` | Display name, version, sandbox/production URLs, dashboard URL |
| `storage` | `localStorage` key names (not secrets) |
| `nav.items` | Sidebar labels, icons, routes |
| `search` | Placeholder and shortcut label |
| `meta` | Title template, OG tags, canonical site URL |
| `deployment.basePath` | Router basename (`/` or `/repo-name/`) |

Colors in the UI also live in **`src/index.css`** (`--color-brand-*`, `--color-accent-*`). Change both the hex palette and `branding.primaryColor` so the theme toggle and CSS stay aligned.

Optional build-time overrides: copy `.env.example` to `.env.local` and use `VITE_` variables (never put secrets in `VITE_` values).

If you deploy under a subpath (GitHub Pages):

1. Set `deployment.basePath` to `'/your-repo-name/'`
2. Set `base` in `vite.config.ts` to the same value

## Adding documentation

Pages are TypeScript objects in `src/content/`:

- `pages.ts` — Introduction, Getting Started, Authentication, Webhooks, Changelog
- `guides.ts` — extra how-tos (`/guides/:slug`)
- `endpoints.ts` — API reference (`EndpointCard` renders this array)
- `errors.ts` — error catalog

Each doc page has `slug`, `href`, `title`, `description`, and `blocks` (heading, paragraph, list, code, callout, table). Use `{{sandboxUrl}}` placeholders; they are filled from config at render time.

Add a sidebar item in `siteConfig.nav.items` **and** a `<Route>` in `src/App.tsx` when you introduce a new top-level URL.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run test` | Vitest |
| `npm run build` | Production bundle |
| `npm run validate` | lint + typecheck + test + build |
| `npm run preview` | Serve the production build |

## Deployment

The app is a static `dist/` folder. Host it on GitHub Pages, Netlify, Vercel, or any static host.

- **GitHub Actions:** `.github/workflows/ci.yml` runs `validate` on push/PR. `.github/workflows/deploy.yml` publishes `dist/` to GitHub Pages after validation.
- Set `permissions` / Pages settings on the repository if you use the deploy workflow.

## Project layout

```
src/config/     site.ts — edit this first
src/content/    documentation + sample Widget API
src/components/api/   reusable reference UI
src/search/     Fuse.js index
src/theme/      light/dark
```

## License

Use this template in your own products. Replace sample Widget copy before you go live.
