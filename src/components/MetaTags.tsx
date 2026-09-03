/**
 * MetaTags.tsx
 *
 * Imperatively manages <head> tags for a page: document.title, meta description,
 * Open Graph, Twitter Card, canonical link, and favicon.
 *
 * Renders nothing in the DOM — all side-effects happen in useEffect.
 *
 * USAGE — place at the top of every page component:
 *
 *   <MetaTags
 *     title="Authentication & Setup"
 *     description="Configure your API key, whitelist IPs, and test connectivity."
 *   />
 *
 * Values that aren't provided fall back to siteConfig.meta defaults.
 */

import { useEffect } from 'react';
import { useConfig } from '../config';

interface MetaTagsProps {
    /**
     * Page-specific part of the browser tab title.
     * Full title is built from the config template: "{page} — {site}"
     */
    title: string;
    /** Override the default meta description for this page. */
    description?: string;
    /** Override the og:image for this page. */
    ogImageUrl?: string;
}

// ── helpers ───────────────────────────────────────────────────────────────────

function upsertMeta(
    selector: string,
    attrName: string,
    attrValue: string,
    content: string,
) {
    let el = document.querySelector<HTMLMetaElement>(selector);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function removeMeta(selector: string) {
    document.querySelector(selector)?.remove();
}

function upsertLink(rel: string, href: string, type?: string) {
    let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
    }
    el.href = href;
    if (type) el.type = type;
}

// ── component ─────────────────────────────────────────────────────────────────

export function MetaTags({ title, description, ogImageUrl }: MetaTagsProps) {
    const { meta, api, company } = useConfig();

    useEffect(() => {
        // ── Title
        const fullTitle = meta.titleTemplate
            .replace('{page}', title)
            .replace('{site}', api.name);
        document.title = fullTitle;

        // ── Standard meta
        const desc = description ?? meta.defaultDescription;
        upsertMeta('meta[name="description"]', 'name', 'description', desc);

        // ── Open Graph
        upsertMeta('meta[property="og:type"]',        'property', 'og:type',        'website');
        upsertMeta('meta[property="og:site_name"]',   'property', 'og:site_name',   api.name);
        upsertMeta('meta[property="og:title"]',       'property', 'og:title',       fullTitle);
        upsertMeta('meta[property="og:description"]', 'property', 'og:description', desc);
        upsertMeta('meta[property="og:url"]',         'property', 'og:url',
            `${meta.siteUrl}${window.location.pathname}`);

        const img = ogImageUrl ?? meta.ogImageUrl;
        if (img) {
            upsertMeta('meta[property="og:image"]', 'property', 'og:image', img);
        } else {
            removeMeta('meta[property="og:image"]');
        }

        // ── Twitter Card
        upsertMeta('meta[name="twitter:card"]',        'name', 'twitter:card',        meta.twitterCard);
        upsertMeta('meta[name="twitter:title"]',       'name', 'twitter:title',       fullTitle);
        upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc);
        if (meta.twitterSite) {
            upsertMeta('meta[name="twitter:site"]', 'name', 'twitter:site', meta.twitterSite);
        }

        // ── Canonical
        upsertLink('canonical', `${meta.siteUrl}${window.location.pathname}`);

        // ── Favicon (applied once; updating on route change is a no-op)
        const faviconType = company.faviconUrl.endsWith('.svg')
            ? 'image/svg+xml'
            : 'image/x-icon';
        upsertLink('icon', company.faviconUrl, faviconType);

        // ── Restore on unmount
        return () => {
            document.title = api.name;
        };
    }, [title, description, ogImageUrl, meta, api, company]);

    return null;
}
