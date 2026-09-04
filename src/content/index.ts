import { staticPages } from './pages';
import { guides } from './guides';
import type { DocPage } from './types';

export { staticPages, introductionPage, gettingStartedPage, authenticationPage, webhooksPage, changelogPage, guidesIndexPage } from './pages';
export { guides } from './guides';
export { endpoints, getEndpointById } from './endpoints';
export { errorCatalog } from './errors';
export type { DocPage, DocBlock, ErrorEntry } from './types';

export function getDocPageBySlug(slug: string): DocPage | undefined {
    return [...staticPages, ...guides].find((p) => p.slug === slug);
}

export function getAllDocPages(): DocPage[] {
    return [...staticPages, ...guides];
}

export function interpolate(template: string, vars: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? '');
}
