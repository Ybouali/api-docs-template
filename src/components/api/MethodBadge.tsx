import type { HttpMethod } from '../../types/api';

const METHOD_CLASS: Record<HttpMethod, string> = {
    GET: 'bg-success/15 text-success-700 dark:text-success',
    POST: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
    PUT: 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300',
    PATCH: 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300',
    DELETE: 'bg-error/15 text-error-600',
};

interface MethodBadgeProps {
    method: HttpMethod | string;
    className?: string;
}

export function MethodBadge({ method, className = '' }: MethodBadgeProps) {
    const key = method.toUpperCase() as HttpMethod;
    const color = METHOD_CLASS[key] ?? 'bg-neutral-200 text-neutral-700';

    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide ${color} ${className}`}
        >
            {method}
        </span>
    );
}
