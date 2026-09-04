import { MetaTags } from '../components/MetaTags';
import { EndpointCard } from '../components/api';
import { endpoints } from '../content/endpoints';
import { interpolate } from '../content';
import { useConfig } from '../config';
import type { ApiEndpoint } from '../types/api';

function withBaseUrl(endpoint: ApiEndpoint, baseUrl: string): ApiEndpoint {
    return {
        ...endpoint,
        examples: endpoint.examples.map((ex) => ({
            ...ex,
            code: interpolate(ex.code, { baseUrl }),
        })),
    };
}

export function ApiReferencePage() {
    const { api } = useConfig();

    return (
        <>
            <MetaTags
                title="API Reference"
                description={`HTTP endpoints for ${api.name}.`}
            />
            <div className="w-full max-w-4xl mx-auto pb-16 space-y-8">
                <header>
                    <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-neutral-100">
                        API Reference
                    </h1>
                    <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
                        Sample Widget API. Replace entries in <code className="font-mono text-sm">src/content/endpoints.ts</code> with your own.
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                        Base URL: <code className="font-mono">{api.sandboxUrl}</code>
                    </p>
                </header>

                <nav aria-label="On this page" className="flex flex-wrap gap-2">
                    {endpoints.map((e) => (
                        <a
                            key={e.id}
                            href={`#${e.id}`}
                            className="text-xs font-medium px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-brand-50 dark:hover:bg-brand-900/30"
                        >
                            {e.method} {e.path}
                        </a>
                    ))}
                </nav>

                {endpoints.map((e) => (
                    <EndpointCard key={e.id} endpoint={withBaseUrl(e, api.sandboxUrl)} />
                ))}
            </div>
        </>
    );
}
