/**
 * Single source of truth for the API developer portal template.
 *
 * Edit this file to brand the portal. Do not put secrets here.
 * See .env.example for optional VITE_ build-time overrides.
 */

export interface SocialLink {
    platform: string;
    label: string;
    url: string;
}

export interface NavItem {
    name: string;
    /**
     * Lucide icon name. See ICON_MAP in LeftSidebar.
     */
    icon: string;
    href: string;
}

const config = {
    company: {
        name: 'Your Company',
        description:
            'A modern API platform for developers. Build, test, and integrate faster.',
        logoUrl: null as string | null,
        faviconUrl: '/vite.svg',
        websiteUrl: 'https://example.com',
        supportEmail: 'support@example.com',
        socialLinks: [
            {
                platform: 'github',
                label: 'GitHub',
                url: 'https://github.com/your-org/your-repo',
            },
        ] as SocialLink[],
    },

    branding: {
        primaryColor: '#2563eb',
        secondaryColor: '#f97316',
        successColor: '#10b981',
        errorColor: '#ef4444',
        fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        defaultTheme: 'system' as 'light' | 'dark' | 'system',
    },

    api: {
        name: 'API Developer Portal',
        shortName: 'API',
        version: '1.0',
        releaseDate: 'January 2026',
        endpointCount: '4',
        sandboxUrl: 'https://api-sandbox.example.com',
        productionUrl: 'https://api.example.com',
        dashboardUrl: 'https://dashboard.example.com',
        authHeader: 'Authorization',
        authScheme: 'Bearer',
    },

    storage: {
        apiKeyName: 'api_key',
        themeName: 'portal_theme',
    },

    locale: {
        phonePlaceholder: '+1 (555) 000-0000',
        examplePhone: '+15550001234',
        currency: 'USD',
        ibanPlaceholder: 'XX00 0000 0000 0000 0000 0000',
        exampleFirstName: 'Jane',
        exampleLastName: 'Doe',
    },

    search: {
        placeholder: 'Search docs, endpoints, errors…',
        shortcutLabel: '⌘K',
    },

    nav: {
        items: [
            { name: 'Introduction', icon: 'Home', href: '/' },
            { name: 'Getting Started', icon: 'Rocket', href: '/getting-started' },
            { name: 'Authentication', icon: 'Key', href: '/authentication' },
            { name: 'Guides', icon: 'BookOpen', href: '/guides' },
            { name: 'API Reference', icon: 'Code', href: '/api-reference' },
            { name: 'Errors', icon: 'AlertCircle', href: '/errors' },
            { name: 'Webhooks', icon: 'Webhook', href: '/webhooks' },
            { name: 'Changelog', icon: 'History', href: '/changelog' },
        ] as readonly NavItem[],
    },

    meta: {
        titleTemplate: '{page} — {site}',
        defaultDescription:
            'Interactive API documentation. Explore authentication, endpoints, and guides.',
        siteUrl: 'https://example.com',
        ogImageUrl: null as string | null,
        twitterCard: 'summary_large_image' as 'summary' | 'summary_large_image',
        twitterSite: null as string | null,
    },

    deployment: {
        /**
         * Must match `base` in vite.config.ts when not serving from domain root.
         */
        basePath: '/',
    },
};

const flat = {
    projectName: config.api.name,
    projectShortName: config.api.shortName,
    version: config.api.version,
    releaseDate: config.api.releaseDate,
    endpointCount: config.api.endpointCount,
    apiBaseUrl: config.api.sandboxUrl,
    apiProductionUrl: config.api.productionUrl,
    dashboardUrl: config.api.dashboardUrl,
    apiKeyStorageKey: config.storage.apiKeyName,
    phonePlaceholder: config.locale.phonePlaceholder,
    examplePhone: config.locale.examplePhone,
    currency: config.locale.currency,
    navItems: config.nav.items,
    basePath: config.deployment.basePath,
};

export const siteConfig = { ...config, ...flat };

export type SiteConfig = typeof siteConfig;
