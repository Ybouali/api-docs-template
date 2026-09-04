import { useSiteConfig } from './SiteConfigContext';

export const useApiConfig = () => useSiteConfig().api;
export const useCompanyConfig = () => useSiteConfig().company;
export const useLocaleConfig = () => useSiteConfig().locale;
export const useNavConfig = () => useSiteConfig().nav;
export const useMetaConfig = () => useSiteConfig().meta;
export const useBrandingConfig = () => useSiteConfig().branding;
export const useSearchConfig = () => useSiteConfig().search;
