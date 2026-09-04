import Fuse from 'fuse.js';
import { endpoints } from '../content/endpoints';
import { errorCatalog } from '../content/errors';
import { getAllDocPages } from '../content';

export type SearchKind = 'page' | 'endpoint' | 'error';

export interface SearchRecord {
    id: string;
    kind: SearchKind;
    title: string;
    description: string;
    href: string;
}

export function buildSearchIndex(): SearchRecord[] {
    const pages: SearchRecord[] = getAllDocPages().map((p) => ({
        id: `page:${p.slug}`,
        kind: 'page',
        title: p.title,
        description: p.description,
        href: p.href,
    }));

    const api: SearchRecord[] = endpoints.map((e) => ({
        id: `endpoint:${e.id}`,
        kind: 'endpoint',
        title: `${e.method} ${e.path}`,
        description: e.title + ' — ' + e.description,
        href: `/api-reference#${e.id}`,
    }));

    const errors: SearchRecord[] = errorCatalog.map((err) => ({
        id: `error:${err.code}`,
        kind: 'error',
        title: `${err.httpStatus} ${err.code}`,
        description: err.message,
        href: `/errors#${err.code}`,
    }));

    return [...pages, ...api, ...errors];
}

export function createSearcher(records: SearchRecord[] = buildSearchIndex()) {
    return new Fuse(records, {
        keys: [
            { name: 'title', weight: 0.5 },
            { name: 'description', weight: 0.3 },
            { name: 'kind', weight: 0.2 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
        minMatchCharLength: 1,
    });
}

export function searchDocs(query: string, fuse = createSearcher()): SearchRecord[] {
    const q = query.trim();
    if (!q) return [];
    return fuse.search(q).map((r) => r.item);
}
