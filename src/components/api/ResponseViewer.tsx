interface ResponseViewerProps {
    value: unknown;
    label?: string;
}

export function ResponseViewer({ value, label = 'JSON' }: ResponseViewerProps) {
    const text =
        typeof value === 'string' ? value : JSON.stringify(value, null, 2);

    return (
        <pre
            className="json-viewer text-brand-900 dark:text-brand-100"
            tabIndex={0}
            aria-label={label}
        >
            {text}
        </pre>
    );
}
