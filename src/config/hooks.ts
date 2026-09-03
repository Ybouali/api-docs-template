/**
 * src/config/hooks.ts
 *
 * Convenience hooks that return a single sub-section of the config.
 * Prefer these over useConfig() when a component only needs one concern —
 * it makes dependencies explicit and makes tests easier to mock.
 *
 * All hooks read from the SiteConfigContext, so they respect any value
 * override passed to <ConfigProvider value={...}>.
 */

import { useSiteConfig } from './SiteConfigContext';

/** API identity, versions, and URLs */
export const useApiConfig     = () => useSiteConfig().api;

/** Company identity, logo, favicon, socials */
export const useCompanyConfig = () => useSiteConfig().company;

/** Regional locale: phone format, currency, IBAN, example data */
export const useLocaleConfig  = () => useSiteConfig().locale;

/** KYC compliance copy, document labels, error codes */
export const useKycConfig     = () => useSiteConfig().kyc;

/** Sidebar navigation items */
export const useNavConfig     = () => useSiteConfig().nav;

/** SEO / Open Graph meta configuration */
export const useMetaConfig    = () => useSiteConfig().meta;

/** Brand colors and typography */
export const useBrandingConfig = () => useSiteConfig().branding;
