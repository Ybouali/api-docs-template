
import { describe, expect, it } from 'vitest';
import { siteConfig } from './site';

describe('siteConfig', () => {
    it('exposes required branding, API, and deployment fields', () => {
        expect(siteConfig.company.name).toBeTruthy();
        expect(siteConfig.api.name).toBeTruthy();
        expect(siteConfig.api.sandboxUrl).toMatch(/^https?:\/\//);
        expect(siteConfig.deployment.basePath).toBe('/api-docs-template/');
        expect(siteConfig.nav.items.length).toBeGreaterThan(3);
    });

    it('nav hrefs are unique and start with /', () => {
        const hrefs = siteConfig.nav.items.map((i) => i.href);
        expect(new Set(hrefs).size).toBe(hrefs.length);

        for (const href of hrefs) {
            expect(href.startsWith('/')).toBe(true);
        }
    });
});
