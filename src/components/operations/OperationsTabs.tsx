import React from 'react';
import {
    ArrowDownCircle,
    Send,
    Building,
    CreditCard,
    List,
    type LucideIcon,
} from 'lucide-react';

export type OperationTabType =
    | 'Cash In'
    | 'Transfer'
    | 'Bank Virement'
    | 'Merchant Payment'
    | 'Operations';

interface OperationsTabsProps {
    activeTab: OperationTabType;
    onTabChange: (tab: OperationTabType) => void;
}

const TABS: { id: OperationTabType; label: string; icon: LucideIcon }[] = [
    { id: 'Cash In', label: 'Cash In', icon: ArrowDownCircle },
    { id: 'Transfer', label: 'Transfer', icon: Send },
    { id: 'Bank Virement', label: 'Virement', icon: Building },
    { id: 'Merchant Payment', label: 'Merchant', icon: CreditCard },
    { id: 'Operations', label: 'History', icon: List },
];

export const OperationsTabs: React.FC<OperationsTabsProps> = ({
    activeTab,
    onTabChange,
}) => {
    return (
        <div
            className="flex items-center gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800/50 rounded-2xl overflow-x-auto no-scrollbar shadow-inner mt-8"
            role="tablist"
            aria-label="Payment operations"
        >
            {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl whitespace-nowrap transition-all duration-300 group
                            ${
                                isActive
                                    ? 'bg-white dark:bg-neutral-900 text-brand-600 shadow-sm'
                                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50'
                            }
                        `}
                    >
                        <Icon
                            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                                isActive ? 'text-brand-600' : 'text-neutral-400'
                            }`}
                        />
                        <span
                            className={`text-sm font-black uppercase tracking-widest ${
                                isActive ? '' : 'opacity-80'
                            }`}
                        >
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
