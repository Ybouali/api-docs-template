import type { ApiResponse } from '../../types/api';
import { ResponseViewer } from './ResponseViewer';

interface StatusCodeListProps {
    responses: ApiResponse[];
}

function statusTone(status: number): string {
    if (status < 300) return 'text-success-700 dark:text-success';
    if (status < 400) return 'text-brand-700 dark:text-brand-300';
    return 'text-error-600';
}

export function StatusCodeList({ responses }: StatusCodeListProps) {
    return (
        <ul className="space-y-4" aria-label="Response status codes">
            {responses.map((r) => (
                <li key={r.status} className="space-y-2">
                    <div className="flex flex-wrap items-baseline gap-3">
                        <span className={`font-mono font-bold ${statusTone(r.status)}`}>{r.status}</span>
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">{r.description}</span>
                    </div>
                    {r.example !== undefined && <ResponseViewer value={r.example} />}
                </li>
            ))}
        </ul>
    );
}
