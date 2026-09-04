import { describe, expect, it } from 'vitest';
import { buildSearchIndex, searchDocs } from './index';

describe('search', () => {
    it('indexes pages, endpoints, and errors', () => {
        const index = buildSearchIndex();
        expect(index.some((r) => r.kind === 'page')).toBe(true);
        expect(index.some((r) => r.kind === 'endpoint')).toBe(true);
        expect(index.some((r) => r.kind === 'error')).toBe(true);
    });

    it('fuzzy-matches endpoints', () => {
        const hits = searchDocs('widget');
        expect(hits.length).toBeGreaterThan(0);
        expect(hits.some((h) => h.href.includes('/api-reference'))).toBe(true);
    });

    it('returns nothing for empty query', () => {
        expect(searchDocs('   ')).toEqual([]);
    });

    it('finds error codes', () => {
        const hits = searchDocs('rate_limited');
        expect(hits.some((h) => h.id.includes('rate_limited'))).toBe(true);
    });
});
