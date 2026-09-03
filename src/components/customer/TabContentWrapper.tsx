import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface TabContentWrapperProps {
    title: string;
    description: string;
    icon: LucideIcon;
    children: React.ReactNode;
}

export const TabContentWrapper: React.FC<TabContentWrapperProps> = ({
    title,
    description,
    icon: Icon,
    children,
}) => {
    return (
        <div className="card p-6 md:p-8 max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-1">
                <Icon className="w-6 h-6 text-brand-600" />
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {title}
                </h2>
            </div>
            <p className="text-sm text-neutral-500 mb-8">{description}</p>
            {children}
        </div>
    );
};
