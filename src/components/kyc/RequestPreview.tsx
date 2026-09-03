import React from 'react';

interface RequestPreviewProps {
    payload: Record<string, unknown>;
}

export const RequestPreview: React.FC<RequestPreviewProps> = ({ payload }) => {
    return (
        <div className="card p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                Request Preview
            </h3>
            <pre className="json-viewer text-brand-100/90">
                {JSON.stringify(payload, null, 2)}
            </pre>
        </div>
    );
};
