import React from 'react';
import { siteConfig } from '../../config/site';

export const ErrorCodes: React.FC = () => {
    return (
        <div className="card p-6 md:p-8 space-y-6">
            <h3 className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                Common Reference Codes
            </h3>

            <div className="space-y-4">
                {siteConfig.errorCodes.map((error) => (
                    <div
                        key={error.code}
                        className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0 last:pb-0"
                    >
                        <span className="text-sm font-black text-error uppercase tracking-wider shrink-0 w-24">
                            {error.code}
                        </span>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                            {error.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
