interface ApiPathProps {
    path: string;
    baseUrl?: string;
}

export function ApiPath({ path, baseUrl }: ApiPathProps) {
    return (
        <code
            className="text-sm font-mono text-neutral-800 dark:text-neutral-200 break-all"
            aria-label={`Path ${path}`}
        >
            {baseUrl ? (
                <>
                    <span className="text-neutral-400">{baseUrl}</span>
                    {path}
                </>
            ) : (
                path
            )}
        </code>
    );
}
