import type { ReactNode } from 'react';
import type { CalloutVariant } from '../../content/types';

const STYLES: Record<CalloutVariant, string> = {
    info: 'border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-800 dark:bg-brand-900/20 dark:text-brand-100',
    warning:
        'border-accent-200 bg-accent-50 text-accent-900 dark:border-accent-900 dark:bg-accent-900/20 dark:text-accent-100',
    tip: 'border-success/30 bg-success/10 text-success-700 dark:text-success',
};

interface CalloutProps {
    variant: CalloutVariant;
    title?: string;
    children: ReactNode;
}

export function Callout({ variant, title, children }: CalloutProps) {
    return (
        <aside
            className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${STYLES[variant]}`}
            role="note"
        >
            {title && <p className="font-semibold mb-1">{title}</p>}
            <div>{children}</div>
        </aside>
    );
}
