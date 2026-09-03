import React from 'react';
import type { ApiResult } from '../../types/api';

type ApiResultDisplayProps = ApiResult;

export const ApiResultDisplay: React.FC<ApiResultDisplayProps> = ({
    method,
    url,
    status,
    response,
    error,
}) => {
    return (
        <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-6 bg-neutral-900 dark:bg-black rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-4">
                    <div className="flex items-center gap-3">
                        <span
                            className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${
                                method === 'GET'
                                    ? 'bg-success/20 text-success'
                                    : 'bg-brand-600/20 text-brand-400'
                            }`}
                        >
                            {method}
                        </span>
                        <code className="text-xs text-neutral-400 truncate max-w-[200px] md:max-w-md font-mono">
                            {url}
                        </code>
                    </div>
                    {status !== undefined && (
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                                Status:
                            </span>
                            <span
                                className={`text-sm font-black ${
                                    status < 300 ? 'text-success' : 'text-error'
                                }`}
                            >
                                {status}
                            </span>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="text-[10px] text-neutral-500 uppercase font-black mb-2 tracking-widest">
                            Response Body
                        </div>
                        <pre className="json-viewer bg-neutral-950/50 p-4 rounded-xl border border-neutral-800/50 text-brand-100/90 text-sm font-mono overflow-auto max-h-[400px]">
                            {response
                                ? JSON.stringify(response, null, 2)
                                : (error ?? 'No response data')}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};
