import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const ComplianceInfo: React.FC = () => {
    return (
        <div className="card p-6 md:p-8 bg-white dark:bg-neutral-800">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-2xl">
                    <ShieldCheck className="w-6 h-6 text-brand-600" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {siteConfig.complianceTitle}
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                        {siteConfig.complianceBody}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {siteConfig.complianceTags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 rounded-full text-[10px] font-black uppercase text-neutral-500 tracking-widest border border-neutral-200 dark:border-neutral-800"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
