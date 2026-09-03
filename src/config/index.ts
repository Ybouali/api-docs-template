/**
 * src/config/index.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Public API for the portal configuration system.
 *
 * USAGE
 * ─────
 * Import from this file everywhere you need config:
 *
 *   // Direct import (works in any file — server, worker, or component)
 *   import { config } from '../config';
 *   console.log(config.api.name);
 *
 *   // React hook (preferred inside components — picks up any test overrides)
 *   import { useConfig } from '../config';
 *   const { api, company, locale } = useConfig();
 *
 *   // Access a specific sub-section
 *   import { useApiConfig, useCompanyConfig } from '../config';
 *
 * CUSTOMISING
 * ───────────
 * Edit src/config/site.ts only.  This file just re-exports everything from
 * there — no values live here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Config object & types ─────────────────────────────────────────────────────
export { siteConfig as config } from './site';
export type {
    SiteConfig,
    SiteConfig as Config,   // alias for external callers that prefer "Config"
    NavItem,
    SocialLink,
    ErrorCodeEntry,
} from './site';

// ── React Context & hooks ─────────────────────────────────────────────────────
export { SiteConfigProvider as ConfigProvider } from './SiteConfigContext';
export { useSiteConfig as useConfig } from './SiteConfigContext';

// ── Convenience section hooks ─────────────────────────────────────────────────
export {
    useApiConfig,
    useCompanyConfig,
    useLocaleConfig,
    useKycConfig,
    useNavConfig,
    useMetaConfig,
    useBrandingConfig,
} from './hooks';
