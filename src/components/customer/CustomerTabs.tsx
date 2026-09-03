import React from 'react';

export type TabType =
    | 'Status'
    | 'Check'
    | 'Register'
    | 'Confirm'
    | 'Resend OTP'
    | 'Reset PIN'
    | 'Balance'
    | 'Info'
    | 'Unregister';

export interface TabConfig {
    name: TabType;
    icon: React.ComponentType<{ className?: string }>;
    method: string;
    endpoint: string;
    description: string;
}

interface CustomerTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    tabsConfig: TabConfig[];
}

export const CustomerTabs: React.FC<CustomerTabsProps> = ({
    activeTab,
    onTabChange,
    tabsConfig,
}) => {
    return (
        <div
            className="flex overflow-x-auto gap-2 p-1 bg-neutral-100 dark:bg-neutral-800/50 rounded-2xl no-scrollbar mb-8 scroll-smooth shadow-inner"
            role="tablist"
            aria-label="Customer API operations"
        >
            {tabsConfig.map((config) => {
                const isActive = activeTab === config.name;
                const Icon = config.icon;

                return (
                    <button
                        key={config.name}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onTabChange(config.name)}
                        className={`
                            group flex items-center gap-3 px-6 py-3.5 rounded-xl transition-all duration-300 whitespace-nowrap
                            ${
                                isActive
                                    ? 'bg-white dark:bg-neutral-700 text-brand-800 dark:text-neutral-100 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-600'
                                    : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-white/50 dark:hover:bg-neutral-700/30'
                            }
                        `}
                    >
                        <Icon
                            className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-brand-600' : 'text-neutral-400'}`}
                        />
                        <span className="text-sm font-black tracking-tight">
                            {config.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
