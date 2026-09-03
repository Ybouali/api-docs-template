/**
 * usePageTitle
 *
 * Sets document.title using the config title template and restores the
 * site name on unmount.  Use MetaTags for full OG/canonical management;
 * use this hook when you only need to change the tab title.
 *
 * @example
 * usePageTitle('Authentication & Setup');
 * // → "Authentication & Setup — API Developer Portal"
 */

import { useEffect } from 'react';
import { useConfig } from '../config';

export function usePageTitle(pageTitle: string): void {
    const { meta, api } = useConfig();

    useEffect(() => {
        document.title = meta.titleTemplate
            .replace('{page}', pageTitle)
            .replace('{site}', api.name);

        return () => {
            document.title = api.name;
        };
    }, [pageTitle, meta.titleTemplate, api.name]);
}
