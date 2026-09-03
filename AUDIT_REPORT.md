# Audit Report — api-docs-template

> Generated: 2026-09-03  
> Auditor: Kiro (automated full-repository inspection)  
> Purpose: Convert ChariBaaS-specific documentation portal into a generic, reusable API Developer Portal Template

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture Diagram](#2-architecture-diagram)
3. [Project Structure Map](#3-project-structure-map)
4. [Entry Points & Routing](#4-entry-points--routing)
5. [Documentation System](#5-documentation-system)
6. [State Management](#6-state-management)
7. [Styling System](#7-styling-system)
8. [Dependency Audit](#8-dependency-audit)
9. [Chari-Specific Content Search](#9-chari-specific-content-search)
10. [Classification List](#10-classification-list)
11. [Code Quality Issues](#11-code-quality-issues)
12. [Migration Checklist](#12-migration-checklist)

---

## 1. Project Overview

| Property | Value |
|----------|-------|
| Stack | React 19, TypeScript, Vite 7, Tailwind CSS v4, framer-motion, react-router-dom v7 |
| Purpose | Interactive API documentation & sandbox playground for ChariBaaS (a Moroccan BaaS product) |
| Tests | **None** — no test framework, no test files |
| Deployment | GitHub Pages via `peaceiris/actions-gh-pages@v4` |
| Node version (CI) | 24 |
| Package name | `chari_baas_docs` ← needs rename |

The application is a client-side SPA. It serves two functions:
1. **Documentation** — explains the API structure, authentication, and KYC requirements
2. **Interactive sandbox** — lets developers call API endpoints directly from the browser

---

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  index.html  (title: "chari_baas_docs", favicon: /vite.svg)    │
│  src/main.tsx  (BrowserRouter basename="/chari_baas_docs")      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                    src/App.tsx
                  ┌──────┴──────────────────────────────┐
                  │                                     │
           LeftSidebar                           <main> area
        (fixed, collapsible)                  (flex-1, shifts right)
        ┌──────────────┐                    ┌──────────────────────┐
        │ Brand logo   │                    │   React Router v7    │
        │ Nav items    │                    │   <Routes>           │
        │ Version      │                    └──────┬───────────────┘
        └──────────────┘                           │
                             ┌─────────────────────┼─────────────────────┐
                             │                     │                     │
                           /            /setup    /customer    /kyc  /operations
                          Home          Setup     Customer     KYC   Operations
                           │             │            │          │        │
                        Header        Header      CustomerHeader  KycHeader  OperationsHeader
                        Cards         Stepper     CustomerTabs    ComplianceInfo OperationsTabs
                        QuickActions  APIKey      9×Tab           AuthSection  5×Tab
                                      WhitelistIP                ConfirmSection
                                      Environment                ErrorCodes
                                      TestConnection             RequestPreview
                                      CurlExample
                             │
                        /beneficiaries /cards /agents /tools  ← all stubs
```

**Data flow:**
```
localStorage('api_key') ←→ APIKey.tsx (save)
                        ←→ Customer tabs (read)
                        ←→ KYC/index.tsx (read)
                        ←→ Operations.tsx (read)

BASE_URL (hardcoded) → fetch() in every tab component
```

---

## 3. Project Structure Map

```
api-docs-template/
├── .github/
│   └── workflows/
│       └── deploy.yml              CI/CD — GitHub Pages deployment
├── public/
│   └── vite.svg                    Default Vite favicon (no custom logo)
├── src/
│   ├── assets/
│   │   └── react.svg               Default React logo — UNUSED
│   ├── components/
│   │   ├── Card.tsx                Generic animated card wrapper ✓ reusable
│   │   ├── LeftSidebar.tsx         Navigation — hardcoded brand name/version
│   │   ├── common/
│   │   │   └── ApiResultDisplay.tsx  API response viewer ✓ reusable (minor type fix)
│   │   ├── customer/
│   │   │   ├── CustomerHeader.tsx  Static header ✓ generic
│   │   │   ├── CustomerTabs.tsx    Tab bar — tabsConfig: any[] (needs typing)
│   │   │   ├── TabContentWrapper.tsx  Slot wrapper ✓ generic
│   │   │   └── tabs/               9 tab components (each duplicates BASE_URL + storage key)
│   │   │       ├── StatusTab.tsx   "Pings the ChariBaas infrastructure"
│   │   │       ├── CheckTab.tsx
│   │   │       ├── RegisterTab.tsx  phone placeholder: +2126xxxxxxx
│   │   │       ├── ConfirmTab.tsx
│   │   │       ├── ResendOtpTab.tsx
│   │   │       ├── ResetPinTab.tsx
│   │   │       ├── BalanceTab.tsx
│   │   │       ├── InfoTab.tsx
│   │   │       └── UnregisterTab.tsx
│   │   ├── kyc/
│   │   │   ├── KycHeader.tsx       "Moroccan compliance" copy
│   │   │   ├── ComplianceInfo.tsx  Bank Al-Maghrib, CNI — entirely Morocco-specific
│   │   │   ├── AuthSection.tsx     OTP sender — phone placeholder: +2126xxxxxxx
│   │   │   ├── ConfirmSection.tsx  Document upload — CIN-specific labels
│   │   │   ├── ErrorCodes.tsx      5 KYC error codes referencing Moroccan CIN
│   │   │   └── RequestPreview.tsx  JSON payload viewer — generic (weak typing)
│   │   └── operations/
│   │       ├── OperationsHeader.tsx   Mock mode toggle ✓ generic
│   │       ├── OperationsTabs.tsx     icon: any (needs typing)
│   │       ├── CashInTab.tsx          currency: MAD, phone: +2126xxxxxxxx
│   │       ├── TransferTab.tsx        currency: MAD, phone: +2126xxxxxxxx
│   │       ├── VirementTab.tsx        currency: MAD, IBAN: MA64...
│   │       ├── MerchantTab.tsx        currency: MAD, phone: +2126xxxxxxxx
│   │       └── TransactionsTab.tsx    +212 phone data, MAD currency, marketing copy
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── index.tsx           Composes Header + Cards + QuickActions
│   │   │   ├── Header.tsx          "Explore ChariBaas APIs", "81 endpoints", "v1.8"
│   │   │   ├── Cards.tsx           "New to ChariBaas?", localStorage('chari_api_key')
│   │   │   └── QuickActions.tsx    Quick navigation buttons — generic structure
│   │   ├── Setup/
│   │   │   ├── index.tsx           Composes all Setup sub-components ✓ generic
│   │   │   ├── Header.tsx          "building with ChariBaas"
│   │   │   ├── CurlExample.tsx     api.charimoney.com URL, Moroccan sample data
│   │   │   ├── OnBoardingAuthHeader.tsx  Step indicator ✓ generic
│   │   │   └── OnBoardingAuthBody/
│   │   │       ├── index.tsx        Step switcher ✓ generic
│   │   │       └── onbording/       [sic — typo in directory name]
│   │   │           ├── APIKey.tsx   'use client', French errors, https://chari.ma/
│   │   │           ├── WhitelistIP.tsx  "Chari requires...", fake IP detection
│   │   │           ├── Environment.tsx  charimoney.com URLs
│   │   │           └── TestConnection.tsx  motion import bug, "ChariBaas servers"
│   │   ├── Customer/
│   │   │   └── index.tsx           9-tab API tester — generic structure, locale data
│   │   ├── Kyc/
│   │   │   └── index.tsx           BASE_URL + 'chari_api_key', Morocco-specific validation
│   │   ├── Operations/
│   │   │   └── index.tsx           ⚠ DEAD FILE — stub, never routed, can be deleted
│   │   ├── Operations.tsx          Routed operations page — BASE_URL + 'chari_api_key'
│   │   ├── Beneficiaries.tsx       Stub — "coming soon"
│   │   ├── Cards.tsx               Stub — "coming soon"
│   │   ├── Agents.tsx              Stub — "coming soon"
│   │   └── Tools.tsx               Stub — "coming soon"
│   ├── utils/
│   │   └── kycValidation.ts        MOROCCAN_PHONE_REGEX, MOROCCAN_CIN_REGEX — entirely Morocco-specific
│   ├── App.tsx                     Layout + routing ✓ generic
│   ├── index.css                   All design tokens prefixed chari-* (chari-blue-*, etc.)
│   └── main.tsx                    basename="/chari_baas_docs", no StrictMode
├── index.html                      title="chari_baas_docs", favicon=/vite.svg
├── package.json                    name="chari_baas_docs"
├── vite.config.ts                  base='/chari_baas_docs/'
├── tsconfig.app.json               strict: true, no unused locals/params ✓ good
├── eslint.config.js                Standard typescript-eslint + react-hooks
├── .hintrc                         webhint development preset
└── README.md                       ⚠ Default Vite template README — no project info
```

---

## 4. Entry Points & Routing

### Entry chain

```
index.html
  └── src/main.tsx
        └── BrowserRouter (basename="/chari_baas_docs")
              └── App.tsx
                    ├── LeftSidebar
                    └── Routes
```

### Route table

| Route | Component file | Status |
|-------|---------------|--------|
| `/` | `src/pages/Home/index.tsx` | ✅ Implemented |
| `/setup` | `src/pages/Setup/index.tsx` | ✅ Implemented |
| `/customer` | `src/pages/Customer/index.tsx` | ✅ Implemented |
| `/kyc` | `src/pages/Kyc/index.tsx` | ✅ Implemented |
| `/operations` | `src/pages/Operations.tsx` | ✅ Implemented |
| `/beneficiaries` | `src/pages/Beneficiaries.tsx` | 🚧 Stub |
| `/cards` | `src/pages/Cards.tsx` | 🚧 Stub |
| `/agents` | `src/pages/Agents.tsx` | 🚧 Stub |
| `/tools` | `src/pages/Tools.tsx` | 🚧 Stub |

> **Note:** `src/pages/Operations/index.tsx` exists but is never imported or routed. It is dead code.

### Navigation

Navigation items are **hardcoded** in `src/components/LeftSidebar.tsx` as a static `navItems` array. There is no dynamic or config-driven navigation system.

---

## 5. Documentation System

The project does **not** use Markdown, MDX, OpenAPI, or any external documentation format. All documentation content is embedded directly in React components as JSX and TypeScript literals.

| Content type | How stored |
|---|---|
| API endpoint names | Hardcoded strings in tab components |
| Request/response examples | Hardcoded JSX in `CurlExample.tsx` |
| Error codes | Hardcoded array in `ErrorCodes.tsx` |
| Compliance copy | Hardcoded JSX in `ComplianceInfo.tsx` |
| Endpoint paths | Hardcoded strings in `Customer/index.tsx` TABS_CONFIG array |
| Navigation | Hardcoded array in `LeftSidebar.tsx` |

**Assessment:** The React-as-documentation approach is appropriate for an interactive sandbox. The critical problem is that all content is scattered across source files instead of being centralised in a configuration layer.

---

## 6. State Management

No global state management library (Redux, Zustand, Jotai, etc.). State is entirely local.

| Concern | Mechanism | Location |
|---|---|---|
| API key persistence | `localStorage` — key: `'chari_api_key'` | 13 files |
| Sidebar open/close | `useState` in `App.tsx`, prop-drilled to `LeftSidebar` | App.tsx |
| Setup wizard step | `useState` in `Setup/index.tsx` | Setup/index.tsx |
| API call results | `useState<any>` per tab | Every tab component |
| Form values | `useState` per field per tab | Every tab component |
| Loading state | `useState<boolean>` per tab | Every tab component |
| Validation errors | `useState<{field?: string}>` per tab | Every tab component |

**Issues:**
- `localStorage` key `'chari_api_key'` is hardcoded in 13 places — any key name change requires 13 edits
- `useState<any>` used for API results in every tab — should be `useState<ApiResult | null>`
- No React Context — acceptable given the app's scope, but the API key would benefit from a simple context

---

## 7. Styling System

| Property | Value |
|---|---|
| CSS framework | Tailwind CSS v4 (via `@tailwindcss/vite` plugin) |
| Theme definition | `@theme` block in `src/index.css` |
| Dark mode | Tailwind `dark:` prefix, class-based (no toggle UI implemented) |
| Animations | framer-motion |
| Icons | lucide-react |

### Design tokens (all prefixed `chari-*`)

```css
/* src/index.css — @theme block */
--color-chari-blue-50  … --color-chari-blue-900    (primary/brand color — standard blue)
--color-chari-orange-50 … --color-chari-orange-900  (accent color — standard orange)
--color-chari-green, -600, -700                      (success states)
--color-chari-red, -600                              (error states)
```

**Problem:** The `chari-` prefix is baked into every Tailwind utility class across every component file (~200+ usages). The hex values are standard blue/orange/green/red — only the naming is brand-tied. Renaming to `brand-*` / `accent-*` / `success*` / `error*` is the single highest-leverage change.

### Global component utilities

Defined in `src/index.css` — these are well-written and fully generic:

| Class | Purpose |
|---|---|
| `.btn-primary` | Primary CTA button |
| `.btn-secondary` | Secondary/outline button |
| `.card` | Card container with border + shadow |
| `.input-base` | Form input base styles |
| `.json-viewer` | Monospace JSON display block |
| `.no-scrollbar` | Hides scrollbar cross-browser |

---

## 8. Dependency Audit

### Production dependencies

| Package | Version | Status | Notes |
|---|---|---|---|
| `react` | ^19.2.0 | ✅ Keep | |
| `react-dom` | ^19.2.0 | ✅ Keep | |
| `react-router-dom` | ^7.13.1 | ✅ Keep | |
| `tailwindcss` | ^4.2.1 | ✅ Keep | |
| `@tailwindcss/vite` | ^4.2.1 | ✅ Keep | Tailwind v4 Vite plugin |
| `framer-motion` | ^12.35.0 | ✅ Keep | Used throughout for animations |
| `lucide-react` | ^0.577.0 | ✅ Keep | Icon library |

No unused or Chari-specific production dependencies. The stack is clean and modern.

### Dev dependencies

| Package | Version | Status | Notes |
|---|---|---|---|
| `vite` | ^7.3.1 | ✅ Keep | |
| `@vitejs/plugin-react` | ^5.1.1 | ✅ Keep | |
| `typescript` | ~5.9.3 | ✅ Keep | |
| `@types/react` | ^19.2.7 | ✅ Keep | |
| `@types/react-dom` | ^19.2.3 | ✅ Keep | |
| `@types/node` | ^24.10.1 | ✅ Keep | |
| `eslint` | ^9.39.1 | ✅ Keep | |
| `@eslint/js` | ^9.39.1 | ✅ Keep | |
| `typescript-eslint` | ^8.48.0 | ✅ Keep | |
| `eslint-plugin-react-hooks` | ^7.0.1 | ✅ Keep | |
| `eslint-plugin-react-refresh` | ^0.4.24 | ✅ Keep | |
| `globals` | ^16.5.0 | ✅ Keep | |

**Missing (to be added):**
- `vitest` — no test runner
- `@testing-library/react` — no component testing
- `@testing-library/user-event` — no interaction testing
- `jsdom` — test environment for DOM testing

**Missing scripts:**
- `typecheck` (`tsc --noEmit`) — no way to run a type check without triggering a build

---

## 9. Chari-Specific Content Search

Full search results, every occurrence classified.

### 9.1 Brand names

| File | Content | Classification |
|---|---|---|
| `index.html` | `<title>chari_baas_docs</title>` | MOVE TO CONFIGURATION |
| `package.json` | `"name": "chari_baas_docs"` | GENERALIZE |
| `vite.config.ts` | `base: '/chari_baas_docs/'` | MOVE TO CONFIGURATION |
| `src/main.tsx` | `basename="/chari_baas_docs"` | MOVE TO CONFIGURATION |
| `src/components/LeftSidebar.tsx` | `"ChariBaas"` (logo text) | MOVE TO CONFIGURATION |
| `src/components/LeftSidebar.tsx` | `"CB"` (collapsed abbreviation) | MOVE TO CONFIGURATION |
| `src/pages/Home/Header.tsx` | `"Explore ChariBaas APIs"` | MOVE TO CONFIGURATION |
| `src/pages/Home/Cards.tsx` | `"New to ChariBaas?"` | MOVE TO CONFIGURATION |
| `src/pages/Setup/Header.tsx` | `"building with ChariBaas"` | MOVE TO CONFIGURATION |
| `src/pages/Setup/OnBoardingAuthBody/onbording/WhitelistIP.tsx` | `"Chari requires your IP"` | GENERALIZE |
| `src/pages/Setup/OnBoardingAuthBody/onbording/TestConnection.tsx` | `"ChariBaas servers"` | GENERALIZE |
| `src/pages/Setup/CurlExample.tsx` | `"your actual Chari API key"` | GENERALIZE |
| `src/components/customer/tabs/StatusTab.tsx` | `"Pings the ChariBaas infrastructure"` | GENERALIZE |

### 9.2 Hardcoded URLs

| File | URL | Classification |
|---|---|---|
| `src/pages/Setup/OnBoardingAuthBody/onbording/APIKey.tsx` | `https://chari.ma/` (dashboard link) | MOVE TO CONFIGURATION |
| `src/pages/Setup/OnBoardingAuthBody/onbording/Environment.tsx` | `https://api-sandbox.charimoney.com` | MOVE TO CONFIGURATION |
| `src/pages/Setup/OnBoardingAuthBody/onbording/Environment.tsx` | `https://api.charimoney.com` | MOVE TO CONFIGURATION |
| `src/pages/Setup/CurlExample.tsx` | `https://api.charimoney.com/v1/customer/register` | MOVE TO CONFIGURATION |
| `src/pages/Kyc/index.tsx` | `BASE_URL = 'https://api-sandbox.charimoney.com'` | MOVE TO CONFIGURATION |
| `src/pages/Operations.tsx` | `BASE_URL = 'https://api-sandbox.charimoney.com'` | MOVE TO CONFIGURATION |
| All 9 `src/components/customer/tabs/*.tsx` | `BASE_URL = 'https://api-sandbox.charimoney.com'` | MOVE TO CONFIGURATION |

**Total:** 12 hardcoded copies of the same API URL.

### 9.3 localStorage key

| File | Key | Classification |
|---|---|---|
| `src/pages/Home/Cards.tsx` | `'chari_api_key'` (read + write) | MOVE TO CONFIGURATION |
| `src/pages/Kyc/index.tsx` | `'chari_api_key'` (read × 2) | MOVE TO CONFIGURATION |
| `src/pages/Operations.tsx` | `'chari_api_key'` (read) | MOVE TO CONFIGURATION |
| All 9 `src/components/customer/tabs/*.tsx` | `'chari_api_key'` (read each) | MOVE TO CONFIGURATION |

**Total:** 13 hardcoded copies of the same storage key.

### 9.4 Moroccan phone format (+212)

| File | Content | Classification |
|---|---|---|
| `src/components/kyc/AuthSection.tsx` | placeholder `+2126xxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/kyc/ConfirmSection.tsx` | placeholder `+2126xxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/customer/tabs/RegisterTab.tsx` | placeholder `+2126xxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/customer/tabs/CheckTab.tsx` | placeholder `+2126xxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/customer/tabs/ConfirmTab.tsx` | placeholder `+2126xxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/customer/tabs/ResendOtpTab.tsx` | placeholder `+2126xxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/customer/tabs/ResetPinTab.tsx` | placeholder `+2126xxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/customer/tabs/BalanceTab.tsx` | placeholder `+2126xxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/customer/tabs/InfoTab.tsx` | placeholder `+2126xxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/customer/tabs/UnregisterTab.tsx` | placeholder `+2126xxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/operations/CashInTab.tsx` | placeholder `+2126xxxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/operations/TransferTab.tsx` | placeholder `+2126xxxxxxxx` (×2) | MOVE TO CONFIGURATION |
| `src/components/operations/MerchantTab.tsx` | placeholder `+2126xxxxxxxx` | MOVE TO CONFIGURATION |
| `src/components/operations/TransactionsTab.tsx` | sample data `+212612345678`, `+212687654321`, etc. | REMOVE |
| `src/pages/Setup/CurlExample.tsx` | sample data `+212612345678` | MOVE TO CONFIGURATION |
| `src/utils/kycValidation.ts` | `MOROCCAN_PHONE_REGEX = /^(\+212\|06\|07)/` | REMOVE |

### 9.5 Moroccan CNI / ID document

| File | Content | Classification |
|---|---|---|
| `src/utils/kycValidation.ts` | `MOROCCAN_CIN_REGEX`, `validateCin()`, "Invalid Moroccan phone number" | REMOVE |
| `src/components/kyc/ComplianceInfo.tsx` | "Bank Al-Maghrib regulations", "CNI (Carte d'Identité Nationale)", "Moroccan residents" | REMOVE |
| `src/components/kyc/KycHeader.tsx` | "Moroccan compliance" | GENERALIZE |
| `src/components/kyc/ConfirmSection.tsx` | "CIN Number", "CIN Front", "CIN Back" | MOVE TO CONFIGURATION |
| `src/components/kyc/ErrorCodes.tsx` | "Moroccan standard (e.g. AB123456)", CIN-specific messages | MOVE TO CONFIGURATION |
| `src/pages/Kyc/index.tsx` | `validateCin()`, `cin` state, CIN-specific field logic | GENERALIZE |

### 9.6 Currency (MAD — Moroccan Dirham)

| File | Content | Classification |
|---|---|---|
| `src/components/operations/CashInTab.tsx` | `currency: 'MAD'`, label "Amount (MAD)" | MOVE TO CONFIGURATION |
| `src/components/operations/TransferTab.tsx` | `currency: 'MAD'`, label "Amount (MAD)" | MOVE TO CONFIGURATION |
| `src/components/operations/VirementTab.tsx` | `currency: 'MAD'`, label "Amount (MAD)" | MOVE TO CONFIGURATION |
| `src/components/operations/MerchantTab.tsx` | `currency: 'MAD'` | MOVE TO CONFIGURATION |
| `src/components/operations/TransactionsTab.tsx` | `MAD` label in table | MOVE TO CONFIGURATION |

### 9.7 Moroccan IBAN

| File | Content | Classification |
|---|---|---|
| `src/components/operations/VirementTab.tsx` | placeholder `MA64 0000 0000 0000 0000 0000` | MOVE TO CONFIGURATION |
| `src/components/operations/VirementTab.tsx` | description "Moroccan bank accounts" | GENERALIZE |

### 9.8 Sample data with Moroccan names

| File | Content | Classification |
|---|---|---|
| `src/pages/Setup/CurlExample.tsx` | `firstName: "Ahmed"`, `lastName: "Bennani"` | MOVE TO CONFIGURATION |
| `src/components/operations/TransactionsTab.tsx` | `+212612345678`, `+212687654321`, `+212699887766` (fake transactions) | REMOVE |

### 9.9 Design tokens (CSS)

| Token | Used as | Classification |
|---|---|---|
| `--color-chari-blue-50` … `chari-blue-900` | Primary/brand color (~150 usages) | MOVE TO CONFIGURATION |
| `--color-chari-orange-50` … `chari-orange-900` | Accent color (~40 usages) | MOVE TO CONFIGURATION |
| `--color-chari-green`, `-600`, `-700` | Success state (~25 usages) | GENERALIZE (rename to `success`) |
| `--color-chari-red`, `-600` | Error state (~20 usages) | GENERALIZE (rename to `error`) |

### 9.10 Other branding / product-specific copy

| File | Content | Classification |
|---|---|---|
| `src/components/LeftSidebar.tsx` | `"Version 1.8"`, `"November 2025"`, `"v1.8"` | MOVE TO CONFIGURATION |
| `src/pages/Home/Header.tsx` | `"81 endpoints"`, `"v1.8"`, `"Nov 2025"` | MOVE TO CONFIGURATION |
| `src/pages/Home/Cards.tsx` | `"120+ endpoints"` | MOVE TO CONFIGURATION |
| `src/components/operations/TransactionsTab.tsx` | `"Upgrade to merchant portal for full ledger."` | REMOVE |
| `src/pages/Setup/OnBoardingAuthBody/onbording/WhitelistIP.tsx` | `"Maximum 5 IPs allowed per environment"` | REMOVE |

---

## 10. Classification List

### REMOVE — Delete or replace entirely

| # | Item | File |
|---|------|------|
| R1 | `MOROCCAN_PHONE_REGEX` and Moroccan-specific phone validation | `src/utils/kycValidation.ts` |
| R2 | `MOROCCAN_CIN_REGEX` and CIN-specific validation | `src/utils/kycValidation.ts` |
| R3 | French validation error messages ("Veuillez entrer votre clé API") | `src/pages/Setup/.../APIKey.tsx` |
| R4 | `'use client'` directive (Next.js-only, meaningless in Vite) | `src/pages/Setup/.../APIKey.tsx` |
| R5 | "Bank Al-Maghrib regulations", "CNI (Carte d'Identité Nationale)", "Moroccan residents" | `src/components/kyc/ComplianceInfo.tsx` |
| R6 | Fake hardcoded IP detection (`'82.145.32.11'`) | `src/pages/Setup/.../WhitelistIP.tsx` |
| R7 | Sample transactions with Moroccan phone numbers (`+212...`) | `src/components/operations/TransactionsTab.tsx` |
| R8 | "Upgrade to merchant portal for full ledger." — product marketing copy | `src/components/operations/TransactionsTab.tsx` |
| R9 | "Maximum 5 IPs allowed per environment" | `src/pages/Setup/.../WhitelistIP.tsx` |
| R10 | `motion` stub at bottom of file (shadows framer-motion import — it's a bug) | `src/pages/Setup/.../TestConnection.tsx` |
| R11 | `src/assets/react.svg` — unused default asset | `src/assets/react.svg` |
| R12 | Dead file `src/pages/Operations/index.tsx` — never routed | `src/pages/Operations/index.tsx` |

### GENERALIZE — Keep the concept, make the content generic

| # | Item | File | Action |
|---|------|------|--------|
| G1 | KYC compliance section | `src/components/kyc/ComplianceInfo.tsx` | Read title/body/tags from config |
| G2 | KYC error codes | `src/components/kyc/ErrorCodes.tsx` | Read error array from config |
| G3 | KYC header copy | `src/components/kyc/KycHeader.tsx` | Remove "Moroccan compliance" |
| G4 | "Pings the ChariBaas infrastructure" | `src/components/customer/tabs/StatusTab.tsx` | Generic description |
| G5 | Bank transfer description "Moroccan bank accounts" | `src/components/operations/VirementTab.tsx` | "external bank accounts" |
| G6 | "building with ChariBaas" | `src/pages/Setup/Header.tsx` | Read project name from config |
| G7 | "Chari requires your IP to be whitelisted" | `src/pages/Setup/.../WhitelistIP.tsx` | Generic IP security copy |
| G8 | "Let's ping the ChariBaas servers" | `src/pages/Setup/.../TestConnection.tsx` | Generic connection test copy |
| G9 | "CIN Front", "CIN Back" document labels | `src/components/kyc/ConfirmSection.tsx` | Read from config |
| G10 | Validation utilities — genericise phone + ID validators | `src/utils/kycValidation.ts` | Rename to `validation.ts`, generic regexes |
| G11 | `tabsConfig: any[]` in CustomerTabs | `src/components/customer/CustomerTabs.tsx` | Proper `TabConfig` interface |
| G12 | `icon: any` in ConfirmSection + OperationsTabs | Multiple | `React.ComponentType<{className?: string}>` |
| G13 | `onSubmit: (data: any)` in operation tabs | CashIn/Transfer/Virement/Merchant | `Record<string, unknown>` |
| G14 | `response?: any` in ApiResultDisplay | `src/components/common/ApiResultDisplay.tsx` | `response?: unknown` |
| G15 | `catch (err: any)` — 13 instances | Throughout | `catch (err: unknown)` + type narrowing |
| G16 | `useState<any>(null)` for API results — 13 instances | Throughout | `useState<ApiResult \| null>` |

### MOVE TO CONFIGURATION — Extract to `src/config/site.ts`

| # | Item | Current location | Config key |
|---|------|-----------------|------------|
| C1 | `basename="/chari_baas_docs"` | `src/main.tsx` | `siteConfig.basePath` |
| C2 | `base: '/chari_baas_docs/'` | `vite.config.ts` | `'/'` (template default) |
| C3 | `<title>chari_baas_docs</title>` | `index.html` | `siteConfig.projectName` |
| C4 | `"ChariBaas"` logo text | `LeftSidebar.tsx` | `siteConfig.projectName` |
| C5 | `"CB"` collapsed abbreviation | `LeftSidebar.tsx` | `siteConfig.projectShortName` |
| C6 | `"Version 1.8"`, `"November 2025"` | `LeftSidebar.tsx` | `siteConfig.version`, `siteConfig.releaseDate` |
| C7 | `"Explore ChariBaas APIs"` | `Home/Header.tsx` | `siteConfig.projectName` |
| C8 | `"81 endpoints"`, `"v1.8"`, `"Nov 2025"` | `Home/Header.tsx` | `siteConfig.endpointCount`, `siteConfig.version`, `siteConfig.releaseDate` |
| C9 | `"New to ChariBaas?"` | `Home/Cards.tsx` | `siteConfig.projectName` |
| C10 | `'chari_api_key'` (localStorage) | 13 files | `siteConfig.apiKeyStorageKey` |
| C11 | `BASE_URL = 'https://api-sandbox.charimoney.com'` | 12 files | `siteConfig.apiBaseUrl` |
| C12 | `https://api.charimoney.com` | `Environment.tsx`, `CurlExample.tsx` | `siteConfig.apiProductionUrl` |
| C13 | `https://chari.ma/` (dashboard link) | `APIKey.tsx` | `siteConfig.dashboardUrl` |
| C14 | `+2126xxxxxxx` phone placeholders | 14 files | `siteConfig.phonePlaceholder` |
| C15 | `+212612345678` example phone | `CurlExample.tsx` | `siteConfig.examplePhone` |
| C16 | `"Ahmed"`, `"Bennani"` example names | `CurlExample.tsx` | `siteConfig.exampleFirstName`, `.exampleLastName` |
| C17 | `currency: 'MAD'`, `"Amount (MAD)"` | 5 operations files | `siteConfig.currency` |
| C18 | `MA64 0000...` IBAN placeholder | `VirementTab.tsx` | `siteConfig.ibanPlaceholder` |
| C19 | Compliance title, body, tags | `ComplianceInfo.tsx` | `siteConfig.compliance*` |
| C20 | Error codes array | `ErrorCodes.tsx` | `siteConfig.errorCodes` |
| C21 | `"CIN Front"`, `"CIN Back"` doc labels | `ConfirmSection.tsx` | `siteConfig.identityDocument*Label` |
| C22 | Navigation items array | `LeftSidebar.tsx` | `siteConfig.navItems` |

### KEEP AS EXAMPLE — Well-written patterns worth preserving

| # | Item | Why keep |
|---|------|---------|
| K1 | `src/components/Card.tsx` | Excellent framer-motion card pattern — fully generic |
| K2 | `src/components/common/ApiResultDisplay.tsx` | Clean API response renderer — just needs `unknown` typing |
| K3 | `src/components/customer/TabContentWrapper.tsx` | Good slot-based composition pattern |
| K4 | `src/components/operations/OperationsHeader.tsx` | Mock/live mode toggle — great DX pattern |
| K5 | `src/pages/Setup/OnBoardingAuthHeader.tsx` | Step indicator — clean multi-step UX |
| K6 | `src/pages/Setup/OnBoardingAuthBody/index.tsx` | Step switcher — good conditional render pattern |
| K7 | `src/App.tsx` layout | Sidebar + main shift pattern is correct |
| K8 | `src/index.css` utilities | `.btn-primary`, `.card`, `.input-base` — solid utility layer |
| K9 | TABS_CONFIG pattern in `Customer/index.tsx` | Config-driven tab definition is the right pattern (just needs typing) |
| K10 | `framer-motion` animation variants in `Card.tsx`, `QuickActions.tsx` | Good reusable spring animation patterns |

---

## 11. Code Quality Issues

### Bugs

| # | Severity | Description | File |
|---|---------|-------------|------|
| B1 | 🔴 High | `motion` import from framer-motion is shadowed by a local stub `const motion = { div: ... }` at the bottom of the file. The animated success state renders as a plain `<div>`. | `src/pages/Setup/.../TestConnection.tsx` |
| B2 | 🟡 Medium | `APIKey.tsx` calls `onNext()` on submit, but the parent never passes `onSubmit`, so the API key is never actually saved to localStorage during the Setup wizard flow. The only place it's saved is `Home/Cards.tsx`. | `src/pages/Setup/.../APIKey.tsx` + `OnBoardingAuthBody/index.tsx` |
| B3 | 🟡 Medium | `setIsOpen` prop typed as `(isOpen: boolean) => void` rather than `React.Dispatch<React.SetStateAction<boolean>>` — minor mismatch | `src/components/LeftSidebar.tsx` |

### TypeScript / type safety

| # | Pattern | Count | Correct type |
|---|---------|-------|-------------|
| T1 | `useState<any>(null)` for API results | 13 | `useState<ApiResult \| null>` |
| T2 | `catch (err: any)` | 13 | `catch (err: unknown)` |
| T3 | `onSubmit: (data: any) => void` | 4 | `(data: Record<string, unknown>) => void` |
| T4 | `icon: any` | 2 | `React.ComponentType<{ className?: string }>` |
| T5 | `tabsConfig: any[]` | 1 | `TabConfig[]` |
| T6 | `payload: any` | 1 | `Record<string, unknown>` |
| T7 | `response?: any` | 1 | `response?: unknown` |

### Directives / compatibility

| # | Issue | File |
|---|-------|------|
| D1 | `'use client'` directive — Next.js-specific, meaningless in Vite | `src/pages/Setup/.../APIKey.tsx` |
| D2 | No `React.StrictMode` wrapper | `src/main.tsx` |

### Duplication

| # | Duplicated value | Copies |
|---|-----------------|--------|
| DUP1 | `BASE_URL = 'https://api-sandbox.charimoney.com'` | 12 |
| DUP2 | `localStorage.getItem('chari_api_key')` | 13 |
| DUP3 | Identical fetch pattern (POST with Bearer auth) | 11 tab components |

### Internationalisation

| # | Issue | File |
|---|-------|------|
| I1 | Validation messages in French: `"Veuillez entrer votre clé API"`, `"Une erreur est survenue"` | `APIKey.tsx` |
| I2 | All other UI is in English — language is inconsistent | Throughout |

---

## 12. Migration Checklist

Use this checklist to track progress during implementation.

### Infrastructure

- [ ] Rename `package.json` `name` from `chari_baas_docs` to `api-docs-template`
- [ ] Add `typecheck` script to `package.json`: `"typecheck": "tsc --noEmit"`
- [ ] Update `vite.config.ts`: change `base` to `'/'`; remove Chari comment
- [ ] Update `src/main.tsx`: use `siteConfig.basePath`; add `<React.StrictMode>`
- [ ] Update `index.html`: replace title with template placeholder; update favicon reference
- [ ] Delete dead file `src/pages/Operations/index.tsx`
- [ ] Delete unused asset `src/assets/react.svg`

### Config layer

- [ ] Create `src/config/site.ts` with full `siteConfig` object
- [ ] Verify all config keys are typed with `as const`

### CSS tokens

- [ ] Rename `--color-chari-blue-*` → `--color-brand-*` in `src/index.css`
- [ ] Rename `--color-chari-orange-*` → `--color-accent-*` in `src/index.css`
- [ ] Rename `--color-chari-green*` → `--color-success*` in `src/index.css`
- [ ] Rename `--color-chari-red*` → `--color-error*` in `src/index.css`
- [ ] Bulk-replace all `chari-blue-` → `brand-` Tailwind classes in all source files
- [ ] Bulk-replace all `chari-orange-` → `accent-` Tailwind classes in all source files
- [ ] Bulk-replace all `chari-green` → `success` Tailwind classes in all source files
- [ ] Bulk-replace all `chari-red` → `error` Tailwind classes in all source files
- [ ] Fix stray `text-indigo-300` in `CurlExample.tsx` → `text-brand-300`

### Validation utilities

- [ ] Rewrite `src/utils/kycValidation.ts` → `src/utils/validation.ts` (generic)
- [ ] Replace `MOROCCAN_PHONE_REGEX` with permissive generic phone regex
- [ ] Replace `MOROCCAN_CIN_REGEX` with generic ID document regex
- [ ] Update all import paths from `kycValidation` → `validation`

### Type quality

- [ ] Create `ApiResult` interface in `src/types/api.ts`
- [ ] Replace all `useState<any>(null)` → `useState<ApiResult | null>`
- [ ] Replace all `catch (err: any)` → `catch (err: unknown)` with type narrowing
- [ ] Replace `onSubmit: (data: any)` → `(data: Record<string, unknown>)`
- [ ] Replace `icon: any` → `React.ComponentType<{ className?: string }>`
- [ ] Replace `tabsConfig: any[]` → `TabConfig[]`
- [ ] Replace `payload: any` → `Record<string, unknown>`
- [ ] Replace `response?: any` → `response?: unknown`
- [ ] Remove `'use client'` directive from `APIKey.tsx`
- [ ] Fix `setIsOpen` prop type in `LeftSidebar.tsx`

### Bug fixes

- [ ] Fix `motion` import override bug in `TestConnection.tsx`
- [ ] Wire `APIKey.tsx` `onSubmit` to save key to localStorage in `OnBoardingAuthBody`
- [ ] Fix French validation messages → English in `APIKey.tsx`

### Component rewiring (config → UI)

- [ ] `LeftSidebar.tsx` — brand name, short name, version, release date, nav items from config
- [ ] `Home/Header.tsx` — project name, endpoint count, version, release date from config
- [ ] `Home/Cards.tsx` — project name, localStorage key from config
- [ ] `Setup/Header.tsx` — project name from config
- [ ] `Setup/CurlExample.tsx` — API URL, example phone/name from config
- [ ] `Setup/.../APIKey.tsx` — dashboard URL from config; English messages
- [ ] `Setup/.../Environment.tsx` — sandbox + production URLs from config
- [ ] `Setup/.../WhitelistIP.tsx` — generic IP security copy; remove fake IP + product limit
- [ ] `Setup/.../TestConnection.tsx` — generic connection copy; fix motion bug
- [ ] `Kyc/index.tsx` — BASE_URL + localStorage key from config
- [ ] `kyc/ComplianceInfo.tsx` — title, body, tags, doc labels from config
- [ ] `kyc/ErrorCodes.tsx` — error codes from config
- [ ] `kyc/KycHeader.tsx` — remove "Moroccan compliance"
- [ ] `kyc/AuthSection.tsx` — phone placeholder from config
- [ ] `kyc/ConfirmSection.tsx` — doc labels from config; phone placeholder from config
- [ ] `Operations.tsx` — BASE_URL + localStorage key from config
- [ ] All 9 `customer/tabs/*.tsx` — BASE_URL + localStorage key from config; phone placeholder from config
- [ ] `operations/CashInTab.tsx` — currency + phone placeholder from config
- [ ] `operations/TransferTab.tsx` — currency + phone placeholder from config
- [ ] `operations/VirementTab.tsx` — currency + IBAN placeholder from config; generic description
- [ ] `operations/MerchantTab.tsx` — currency + phone placeholder from config
- [ ] `operations/TransactionsTab.tsx` — generic sample data; remove marketing copy
- [ ] `customer/tabs/StatusTab.tsx` — remove "ChariBaas infrastructure" copy

### CI & README

- [ ] Add `name:` to GitHub workflow
- [ ] Add lint + typecheck step to CI workflow
- [ ] Replace `README.md` with professional template README

### Tests

- [ ] Install `vitest`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`
- [ ] Add `test` script to `package.json`
- [ ] Write test: `siteConfig` has all required keys
- [ ] Write test: `validation.ts` — `validatePhone`, `validateOtp`, `validateFile`, `validateId`
- [ ] Write test: `ApiResultDisplay` renders method + URL + status
- [ ] Write test: `LeftSidebar` renders brand name from config

---

## Summary Statistics

| Category | Count |
|---|-------|
| Total Chari-specific occurrences | ~70 |
| Files requiring changes | 38 |
| Files that can be kept unchanged | 6 |
| Hardcoded URL copies to eliminate | 12 |
| Hardcoded storage key copies to eliminate | 13 |
| `any` type usages to fix | ~20 |
| Bug fixes required | 3 |
| New files to create | 3 (`site.ts`, `validation.ts`, `api.ts`) |
| Files to delete | 2 (`Operations/index.tsx`, `react.svg`) |
| Tests to write | 4 |

---

*End of AUDIT_REPORT.md*
