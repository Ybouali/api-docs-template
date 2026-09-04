# Transformation summary

The portal is no longer a ChariBaaS sandbox. It is a **generic developer documentation template**.

## What changed

- **Removed** customer/KYC/operations playgrounds, Moroccan validators, stub fintech pages, and live `fetch` sandbox screens.
- **Kept** the Vite/React/Tailwind shell, config context, sidebar, cards, meta tags, and design tokens (already renamed from `chari-*` to `brand-*`).
- **Added** typed content (`src/content/`), reusable API reference components, Fuse.js search, light/dark theme, placeholder docs (Intro → Changelog), tests, and CI.

## How to brand it

1. Edit `src/config/site.ts` (name, URLs, nav).
2. Edit `src/index.css` for the color palette.
3. Replace sample Widget data in `src/content/endpoints.ts`, `errors.ts`, and the doc pages.

## Validation (2026-09-04)

Run `npm run validate` (lint, typecheck, test, build).

## Readiness

**READY** as a clone-and-configure documentation portal.

Not **PRODUCTION READY** for a live API until you replace example.com URLs, Widget endpoints, and sample copy with your product’s real documentation. The template itself is suitable to publish as a starter.
