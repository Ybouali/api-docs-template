/**
 * SiteConfigContext.tsx
 *
 * Provides the portal configuration to the entire React tree.
 */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, type ReactNode } from 'react';
import { siteConfig } from './site';
import type { SiteConfig } from './site';

const SiteConfigContext = createContext<SiteConfig>(siteConfig);

interface SiteConfigProviderProps {
    /**
     * Pass a custom config to override defaults.
     * Useful in Storybook, tests, or multi-tenant builds.
     */
    value?: SiteConfig;
    children: ReactNode;
}

export function SiteConfigProvider({
    value = siteConfig,
    children,
}: SiteConfigProviderProps) {
    return (
        <SiteConfigContext.Provider value={value}>
            {children}
        </SiteConfigContext.Provider>
    );
}

/**
 * Returns the current SiteConfig from context.
 *
 * @example
 * const { api, company, locale } = useSiteConfig();
 */
export function useSiteConfig(): SiteConfig {
    return useContext(SiteConfigContext);
}
