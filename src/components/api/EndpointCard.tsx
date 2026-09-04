import type { ApiEndpoint } from '../../types/api';
import { MethodBadge } from './MethodBadge';
import { ApiPath } from './ApiPath';
import { ParameterTable } from './ParameterTable';
import { StatusCodeList } from './StatusCodeList';
import { CodeExampleTabs } from './CodeExampleTabs';
import { ResponseViewer } from './ResponseViewer';

interface EndpointCardProps {
    endpoint: ApiEndpoint;
    baseUrl?: string;
}

export function EndpointCard({ endpoint, baseUrl }: EndpointCardProps) {
    return (
        <article
            id={endpoint.id}
            className="card p-6 md:p-8 space-y-6"
            aria-labelledby={`${endpoint.id}-title`}
        >
            <header className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                    <MethodBadge method={endpoint.method} />
                    <ApiPath path={endpoint.path} baseUrl={baseUrl} />
                </div>
                <h2
                    id={`${endpoint.id}-title`}
                    className="text-2xl font-bold text-neutral-900 dark:text-neutral-100"
                >
                    {endpoint.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">{endpoint.description}</p>
            </header>

            {endpoint.parameters && endpoint.parameters.length > 0 && (
                <section aria-labelledby={`${endpoint.id}-params`}>
                    <h3 id={`${endpoint.id}-params`} className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
                        Parameters
                    </h3>
                    <ParameterTable parameters={endpoint.parameters} />
                </section>
            )}

            {endpoint.requestBody && (
                <section aria-labelledby={`${endpoint.id}-body`}>
                    <h3 id={`${endpoint.id}-body`} className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
                        Request body
                        <span className="ml-2 font-mono font-normal normal-case text-neutral-400">
                            {endpoint.requestBody.contentType}
                        </span>
                    </h3>
                    {endpoint.requestBody.description && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                            {endpoint.requestBody.description}
                        </p>
                    )}
                    <ResponseViewer value={endpoint.requestBody.example} label="Request body example" />
                </section>
            )}

            <section aria-labelledby={`${endpoint.id}-responses`}>
                <h3 id={`${endpoint.id}-responses`} className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
                    Responses
                </h3>
                <StatusCodeList responses={endpoint.responses} />
            </section>

            <section aria-labelledby={`${endpoint.id}-examples`}>
                <h3 id={`${endpoint.id}-examples`} className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
                    Examples
                </h3>
                <CodeExampleTabs examples={endpoint.examples} />
            </section>
        </article>
    );
}
