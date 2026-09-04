# Audit Report — api-docs-template

> Generated: 2026-09-04  
> Purpose: Convert a ChariBaaS-specific documentation portal into a generic, reusable API developer portal template.

---

## 1. Project overview

| Property | Current value |
| --- | --- |
| Stack | React 19, TypeScript, Vite 7, Tailwind CSS v4, Framer Motion, React Router v7 |
| Original purpose | Interactive sandbox for **ChariBaaS** (Moroccan BaaS APIs) |
| Current purpose (partial) | Some branding/config generalized; pages still model fintech sandbox flows |
| Tests | Scripts exist (`vitest`) but **no test files** and **vitest is not in package.json** |
| CI | GitHub Pages deploy only (`.github/workflows/deploy.yml`) — no lint/typecheck/test job |
| Package name | `api-docs-template` (already renamed from `chari_baas_docs`) |

The app is a client-side SPA. It still mixes two jobs:

1. **Documentation UI** — headers, sidebar, cards, meta tags (keep and generalize).
2. **Interactive sandbox** — live calls to customer/KYC/operations endpoints (Chari-shaped; not suitable as a generic docs template).

---

## 2. Architecture (current)

```
index.html  →  src/main.tsx  →  ConfigProvider + BrowserRouter  →  App
                                                            │
                                         LeftSidebar ← siteConfig.nav
                                                            │
                    /  /setup  /customer  /kyc  /operations  /beneficiaries  /cards  /agents  /tools
```

**State:** React local state + `localStorage` for an API key. No Redux/Zustand.

**Styling:** Tailwind v4 `@theme` tokens already renamed from `chari-*` to `brand-*` / `accent-*` / `success` / `error`. Dark-mode classes exist; there is **no theme toggle**.

---

## 3. Project structure map

| Path | Role | Disposition |
| --- | --- | --- |
| `src/config/site.ts` | Central config (company, branding, API, nav, locale, KYC copy) | **KEEP** — extend for docs/search |
| `src/config/index.ts`, `hooks.ts`, `SiteConfigContext.tsx` | Config public API | **KEEP** |
| `src/components/LeftSidebar.tsx` | Config-driven nav | **KEEP** — add search/theme/a11y |
| `src/components/Card.tsx`, `MetaTags.tsx` | Reusable UI | **KEEP** |
| `src/components/common/ApiResultDisplay.tsx` | Live-call response viewer | **GENERALIZE** → request/response viewer |
| `src/components/customer/*` | 9 Chari customer endpoint tabs | **REMOVE** (replace with generic API reference) |
| `src/components/kyc/*` | KYC forms + Morocco-oriented compliance UI | **REMOVE** / extract generic `ErrorCodes` pattern |
| `src/components/operations/*` | Cash-in, transfer, MAD, IBAN | **REMOVE** |
| `src/pages/Home/*` | Hero + cards + “Quick Actions” | **GENERALIZE** (actions still say Register Customer / Test Transfer) |
| `src/pages/Setup/*` | Onboarding stepper (API key, IP, env, curl) | **REPLACE** with Getting Started / Authentication docs |
| `src/pages/Customer`, `Kyc`, `Operations*` | Sandbox pages | **REMOVE** |
| `src/pages/Beneficiaries`, `Cards`, `Agents`, `Tools` | Stub pages | **REMOVE** |
| `src/utils/kycValidation.ts` | `MOROCCAN_PHONE_REGEX`, `MOROCCAN_CIN_REGEX` | **REMOVE** |
| `src/utils/validation.ts` | Generic validators | **REMOVE** if no sandbox forms remain |
| `src/index.css` | Design tokens | **KEEP** — fill missing brand shades, apply from config |
| `public/vite.svg` | Default Vite favicon | **KEEP** as placeholder |

---

## 4. Entry points & routing

- `index.html` title already generic (`API Developer Portal`).
- `vite.config.ts` `base: "/api-docs-template"` — **MOVE TO CONFIGURATION** (template default should be `/`).
- `src/main.tsx` uses `config.deployment.basePath` — good.
- Routes in `App.tsx` are **hardcoded** to fintech screens, not driven by content files.

---

## 5. Documentation system

There is **no** content model. Copy lives inside React components. There is no Markdown/MDX, no changelog, no generic API reference data, no search index.

**Required:** typed content modules (`slug`, `title`, `description`, blocks) plus data-driven endpoints.

---

## 6. State management

| Concern | Mechanism | Notes |
| --- | --- | --- |
| API key | `localStorage` via `siteConfig.apiKeyStorageKey` | Fine for a template; keep only if a “save key” widget remains |
| Sidebar open | `useState` in `App` | Keep |
| Theme | CSS `.dark` only | **ADD** `localStorage` + toggle |
| Docs content | none | **ADD** static modules |

---

## 7. Styling system

Tokens in `src/index.css` are already generic (`brand`, `accent`, `success`, `error`, `neutral`). Header still references `brand-800` / `brand-950` which are **not defined** in `@theme`. Fonts are not applied from `siteConfig.branding.fontFamily`. Selection color is hardcoded orange.

---

## 8. Dependency audit

**Production:** `react`, `react-dom`, `react-router-dom`, `framer-motion`, `lucide-react`, `tailwindcss`, `@tailwindcss/vite`.

**Missing for the mission:**

- `fuse.js` — client search
- `vitest`, `jsdom`, Testing Library — tests
- No MDX compiler (prefer typed TS content to avoid extra build complexity)

No unused Chari-specific packages.

---

## 9. Chari-specific content search (source, excluding this report)

Search terms: `Chari`, `ChariBaaS`, `baas.ma`, `Moroccan`, `+212`, `CNI`, `Bank Al-Maghrib`.

| File | Occurrence | Classification |
| --- | --- | --- |
| `src/utils/kycValidation.ts` | `MOROCCAN_PHONE_REGEX`, `+212`, CIN | **REMOVE** |
| `src/pages/Home/QuickActions.tsx` | Register Customer / Test Transfer | **GENERALIZE** |
| Many tab components (customer/operations/setup) | Placeholders `+212`, MAD, charimoney URLs, “ChariBaas” copy | **REMOVE** with those files (config already has generic URLs; components often still hardcode) |
| `AUDIT_REPORT.md` | Documents Chari as the *source* product | **KEEP** (historical audit) |

Remaining `chari` hits in `package-lock.json` are integrity hashes, not product names.

---

## 10. Classification list (summary)

### REMOVE

- Moroccan phone/CIN validators
- Bank Al-Maghrib / CNI / “Moroccan residents” copy (if any leftover in KYC)
- Fake transaction samples with `+212` numbers
- Entire customer / KYC / operations / stub page trees
- Hardcoded sandbox `fetch` playgrounds (not essential for a docs portal; mission forbids building backends)

### GENERALIZE

- Home hero, cards, sidebar, meta tags
- `ApiResultDisplay` → method badge + JSON viewer
- Error code list component (already reads `siteConfig.kyc.errorCodes`)
- CSS token names (already done)

### MOVE TO CONFIGURATION

- Company name, logo, favicon, colors, fonts
- API name, version, sandbox/production URLs, dashboard URL
- Nav tree
- `deployment.basePath` **and** Vite `base`
- Search shortcut / placeholder
- Default theme

### KEEP

- Config context + hooks
- Card, MetaTags, LeftSidebar shell
- Tailwind v4 theme layer
- Framer Motion usage on home cards

---

## 11. Code quality issues

| ID | Issue |
| --- | --- |
| Q1 | `package.json` has `"test": "vitest run"` but vitest is not installed |
| Q2 | No tests, no `validate` script, CI does not gate PRs |
| Q3 | Duplicate `Operations.tsx` vs `pages/Operations/` |
| Q4 | `kycValidation.ts` vs `validation.ts` overlap |
| Q5 | Dark mode incomplete (no toggle, incomplete tokens) |
| Q6 | Sidebar not overlay/collapsible in a documented mobile pattern (toggle exists; no backdrop, no skip link) |
| Q7 | Quick actions still fintech-specific |

---

## 12. Migration checklist (phases)

- [x] Phase 0 — This audit
- [x] Phase 1 — Delete Chari/sandbox trees; app still builds
- [x] Phase 2 — Complete config as single source of truth
- [x] Phase 3 — Generic API reference components
- [x] Phase 4 — Content model + placeholder docs + dynamic routes
- [x] Phase 5 — Fuse.js search
- [x] Phase 6 — Theme tokens + light/dark
- [x] Phase 7 — Responsive sidebar, tables, ARIA
- [x] Phase 8 — lint / typecheck / test / build / validate + GitHub Actions
- [x] Phase 9 — README
- [x] Phase 10 — Residual search, validate, readiness

See `TRANSFORMATION_SUMMARY.md` for post-migration status (**READY** as a template).

---

## Readiness (post-transformation)

**READY** as a clone-and-configure developer portal. Remaining work for a live product is content and branding only (`site.ts` + `src/content/` + CSS tokens).
