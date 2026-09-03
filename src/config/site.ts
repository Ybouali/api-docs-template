/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  site.ts  —  Single source of truth for the API Developer Portal Template
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  QUICK START
 *  ───────────
 *  1. Fill in company.*        — organisation name, description, URLs
 *  2. Fill in branding.*       — primary/secondary colors, font
 *  3. Fill in api.*            — API name, version, base URL
 *  4. Adjust nav.items         — sidebar navigation tree
 *  5. Adjust locale.*          — phone format, currency, ID document labels
 *  6. Adjust kyc.*             — compliance text and error codes
 *  7. Set deployment.basePath  — '/' for root, '/repo-name/' for GitHub Pages
 *
 *  Sensitive values (real API keys, secrets) must go in .env files, NOT here.
 *  See .env.example for available environment variable overrides.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SocialLink {
    platform: 'github' | 'twitter' | 'linkedin' | 'discord' | 'youtube' | string;
    label: string;
    url: string;
}

export interface NavItem {
    /** Display label in the sidebar */
    name: string;
    /**
     * Lucide icon name. Available values:
     * Home | Key | Users | ShieldCheck | DollarSign | Store |
     * Wrench | BookOpen | Settings | Globe | Code | FileText
     */
    icon: string;
    /** Route path (must match react-router-dom <Route path>) */
    href: string;
}

export interface ErrorCodeEntry {
    code: string;
    message: string;
}

// ─── Config definition ───────────────────────────────────────────────────────

const config = {
    // ── Company / organisation ────────────────────────────────────────────
    company: {
        name: 'Your Company',
        description:
            'A modern API platform for developers. Build, test, and integrate faster.',
        /** Absolute URL of your logo image, or relative path from /public */
        logoUrl: null as string | null,
        /** Path to favicon from /public (e.g. '/favicon.svg') */
        faviconUrl: '/vite.svg',
        websiteUrl: 'https://example.com',
        supportEmail: 'support@example.com',
        socialLinks: [
            {
                platform: 'github',
                label: 'GitHub',
                url: 'https://github.com/your-org/your-repo',
            },
            {
                platform: 'twitter',
                label: 'Twitter',
                url: 'https://twitter.com/yourhandle',
            },
        ] as SocialLink[],
    },

    // ── Branding ──────────────────────────────────────────────────────────
    branding: {
        /**
         * Primary / brand color (hex).
         * Maps to the --color-brand-* CSS custom properties in index.css.
         * Change the hex values in index.css to reflect a different palette.
         */
        primaryColor: '#2563eb',
        secondaryColor: '#f97316',
        successColor: '#10b981',
        errorColor: '#ef4444',
        fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },

    // ── API ───────────────────────────────────────────────────────────────
    api: {
        /** Full display name shown in the hero section */
        name: 'API Developer Portal',
        /** Short abbreviation (2-3 chars) shown in collapsed sidebar */
        shortName: 'API',
        /** Semantic version shown in the hero badge */
        version: '1.0',
        /** Human-readable release date shown in the hero badge */
        releaseDate: 'January 2026',
        /** Approximate endpoint count shown in the hero badge */
        endpointCount: '50+',
        /** Sandbox / test base URL (no trailing slash) */
        sandboxUrl: 'https://api-sandbox.example.com',
        /** Production base URL (no trailing slash) */
        productionUrl: 'https://api.example.com',
        /** URL to the developer dashboard where users obtain API keys */
        dashboardUrl: 'https://dashboard.example.com',
    },

    // ── Storage ───────────────────────────────────────────────────────────
    storage: {
        /**
         * localStorage key used to persist the developer's API key.
         * Change to something unique (e.g. 'myapi_key').
         * Never store an actual secret here — this is just the KEY NAME.
         */
        apiKeyName: 'api_key',
    },

    // ── Locale / region ───────────────────────────────────────────────────
    locale: {
        phonePlaceholder: '+1 (555) 000-0000',
        examplePhone: '+15550001234',
        currency: 'USD',
        ibanPlaceholder: 'XX00 0000 0000 0000 0000 0000',
        exampleFirstName: 'Jane',
        exampleLastName: 'Doe',
    },

    // ── KYC / Compliance ──────────────────────────────────────────────────
    kyc: {
        complianceTitle: 'Regulatory Compliance',
        complianceBody:
            'All users must complete identity verification as required by applicable financial regulations. A government-issued photo ID is required to access financial services.',
        complianceTags: ['Regulatory', 'Security First'] as readonly string[],
        documentLabel: 'Government-issued ID',
        documentFrontLabel: 'ID Front',
        documentBackLabel: 'ID Back',
        errorCodes: [
            { code: 'ERR_001', message: 'Invalid ID format. Please check the document number.' },
            { code: 'ERR_002', message: 'Document image quality too low. Ensure good lighting and no glare.' },
            { code: 'ERR_003', message: 'ID already registered. This document is linked to another account.' },
            { code: 'ERR_004', message: 'Face verification failed. Selfie does not match the ID photo.' },
            { code: 'ERR_005', message: 'OTP expired. Please request a new verification code.' },
        ] as readonly ErrorCodeEntry[],
    },

    // ── Navigation ────────────────────────────────────────────────────────
    nav: {
        items: [
            { name: 'Home',             icon: 'Home',        href: '/'              },
            { name: 'Auth & Setup',     icon: 'Key',         href: '/setup'         },
            { name: 'Customers',        icon: 'Users',       href: '/customer'      },
            { name: 'KYC',             icon: 'ShieldCheck', href: '/kyc'           },
            { name: 'Operations',       icon: 'DollarSign',  href: '/operations'    },
            { name: 'Beneficiaries',    icon: 'Users',       href: '/beneficiaries' },
            { name: 'Agents',           icon: 'Store',       href: '/agents'        },
            { name: 'Tools & Webhooks', icon: 'Wrench',      href: '/tools'         },
        ] as readonly NavItem[],
    },

    // ── SEO / Meta ────────────────────────────────────────────────────────
    meta: {
        /** Browser tab title template. Use {page} and {site} as placeholders. */
        titleTemplate: '{page} — {site}',
        defaultDescription:
            'Interactive API documentation and developer sandbox. Test endpoints, explore authentication, and build integrations.',
        siteUrl: 'https://example.com',
        ogImageUrl: null as string | null,
        twitterCard: 'summary_large_image' as 'summary' | 'summary_large_image',
        twitterSite: null as string | null,
    },

    // ── Deployment ────────────────────────────────────────────────────────
    deployment: {
        /**
         * Base path for the React app.
         *   '/'              → root deployment (Vercel, Netlify, custom domain)
         *   '/repo-name/'    → GitHub Pages subdirectory
         * Must also match `base` in vite.config.ts when not '/'.
         */
        basePath: '/',
    },
};

// ─── Flat aliases ─────────────────────────────────────────────────────────────
// These flat properties are consumed by components.
// Defined once here so no component duplicates the nesting path.

const flat = {
    // identity
    projectName:     config.api.name,
    projectShortName: config.api.shortName,
    version:         config.api.version,
    releaseDate:     config.api.releaseDate,
    endpointCount:   config.api.endpointCount,

    // api
    apiBaseUrl:       config.api.sandboxUrl,
    apiProductionUrl: config.api.productionUrl,
    dashboardUrl:     config.api.dashboardUrl,

    // storage
    apiKeyStorageKey: config.storage.apiKeyName,

    // locale
    phonePlaceholder:  config.locale.phonePlaceholder,
    examplePhone:      config.locale.examplePhone,
    currency:          config.locale.currency,
    ibanPlaceholder:   config.locale.ibanPlaceholder,
    exampleFirstName:  config.locale.exampleFirstName,
    exampleLastName:   config.locale.exampleLastName,

    // kyc
    complianceTitle:            config.kyc.complianceTitle,
    complianceBody:             config.kyc.complianceBody,
    complianceTags:             config.kyc.complianceTags,
    identityDocumentLabel:      config.kyc.documentLabel,
    identityDocumentFrontLabel: config.kyc.documentFrontLabel,
    identityDocumentBackLabel:  config.kyc.documentBackLabel,
    errorCodes:                 config.kyc.errorCodes,

    // nav
    navItems: config.nav.items,

    // deployment
    basePath: config.deployment.basePath,
};

/**
 * siteConfig — the complete configuration object.
 *
 * Supports both nested access (siteConfig.api.sandboxUrl) and
 * flat access (siteConfig.apiBaseUrl) for backward compatibility.
 *
 * Change values by editing the `config` object above.
 */
export const siteConfig = { ...config, ...flat };

/** Type of the merged config object */
export type SiteConfig = typeof siteConfig;

/*
 * ─── ENVIRONMENT VARIABLES ────────────────────────────────────────────────────
 *
 *  Vite exposes variables prefixed VITE_ to client code via import.meta.env.
 *  NEVER put secrets (private keys, tokens) in VITE_ variables — they are
 *  bundled into the JS and visible to anyone who downloads the page.
 *
 *  Safe uses for VITE_ variables:
 *    VITE_API_BASE_URL    Override sandboxUrl at build time
 *    VITE_APP_VERSION     Inject version from CI
 *    VITE_SITE_URL        Canonical domain for OG tags
 *
 *  Usage example (replace the hardcoded string above):
 *    sandboxUrl: import.meta.env.VITE_API_BASE_URL ?? 'https://api-sandbox.example.com',
 *
 *  See .env.example for the full list. https://vitejs.dev/guide/env-and-mode
 * ─────────────────────────────────────────────────────────────────────────────
 */
