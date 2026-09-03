import { useState } from 'react';
import {
    Search,
    UserPlus,
    CheckCircle,
    RefreshCw,
    Lock,
    Wallet,
    Info,
    UserX,
    Activity,
} from 'lucide-react';

import { CustomerHeader } from '../../components/customer/CustomerHeader';
import { CustomerTabs } from '../../components/customer/CustomerTabs';
import type { TabType } from '../../components/customer/CustomerTabs';
import { StatusTab } from '../../components/customer/tabs/StatusTab';
import { RegisterTab } from '../../components/customer/tabs/RegisterTab';
import { ConfirmTab } from '../../components/customer/tabs/ConfirmTab';
import { CheckTab } from '../../components/customer/tabs/CheckTab';
import { ResendOtpTab } from '../../components/customer/tabs/ResendOtpTab';
import { ResetPinTab } from '../../components/customer/tabs/ResetPinTab';
import { BalanceTab } from '../../components/customer/tabs/BalanceTab';
import { InfoTab } from '../../components/customer/tabs/InfoTab';
import { UnregisterTab } from '../../components/customer/tabs/UnregisterTab';

const TABS_CONFIG = [
    {
        name: 'Status' as TabType,
        icon: Activity,
        method: 'GET',
        endpoint: '/api/v1/customer/status',
        description: 'Overview of customer platform health and statistics',
    },
    {
        name: 'Check' as TabType,
        icon: Search,
        method: 'GET',
        endpoint: '/api/v1/customer/check',
        description: 'Check if a phone number is already registered',
    },
    {
        name: 'Register' as TabType,
        icon: UserPlus,
        method: 'POST',
        endpoint: '/api/v1/customer/register',
        description: 'Create a new customer account',
    },
    {
        name: 'Confirm' as TabType,
        icon: CheckCircle,
        method: 'POST',
        endpoint: '/api/v1/customer/confirm',
        description: 'Confirm a pending registration using OTP',
    },
    {
        name: 'Resend OTP' as TabType,
        icon: RefreshCw,
        method: 'POST',
        endpoint: '/api/v1/customer/resend-otp',
        description: 'Resend verification code to the customer',
    },
    {
        name: 'Reset PIN' as TabType,
        icon: Lock,
        method: 'POST',
        endpoint: '/api/v1/customer/reset-pin',
        description: 'Securely reset customer account PIN',
    },
    {
        name: 'Balance' as TabType,
        icon: Wallet,
        method: 'GET',
        endpoint: '/api/v1/customer/balance',
        description: 'Retrieve current account balance',
    },
    {
        name: 'Info' as TabType,
        icon: Info,
        method: 'GET',
        endpoint: '/api/v1/customer/info',
        description: 'Get detailed customer account profile',
    },
    {
        name: 'Unregister' as TabType,
        icon: UserX,
        method: 'DELETE',
        endpoint: '/api/v1/customer/unregister',
        description: 'Permanently remove customer account',
    },
];

export default function Customer() {
    const [activeTab, setActiveTab] = useState<TabType>('Status');

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Status':
                return <StatusTab />;
            case 'Check':
                return <CheckTab />;
            case 'Register':
                return <RegisterTab />;
            case 'Confirm':
                return <ConfirmTab />;
            case 'Resend OTP':
                return <ResendOtpTab />;
            case 'Reset PIN':
                return <ResetPinTab />;
            case 'Balance':
                return <BalanceTab />;
            case 'Info':
                return <InfoTab />;
            case 'Unregister':
                return <UnregisterTab />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full flex flex-col bg-neutral-50 dark:bg-neutral-900 pb-20">
            <div className="max-w-5xl mx-auto w-full px-4">
                <CustomerHeader />

                <CustomerTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    tabsConfig={TABS_CONFIG}
                />

                <div className="mb-8 flex items-center justify-between p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-100 dark:border-brand-800/30">
                            <span className="text-xs font-mono font-bold text-brand-600 uppercase tracking-tighter">
                                {TABS_CONFIG.find((t) => t.name === activeTab)?.method}
                            </span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] uppercase font-black text-neutral-400 tracking-widest">
                                Target Endpoint
                            </span>
                            <span className="text-xs md:text-sm font-mono font-medium text-neutral-700 dark:text-neutral-300">
                                {TABS_CONFIG.find((t) => t.name === activeTab)?.endpoint}
                            </span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-neutral-50 dark:bg-neutral-900/50 rounded-full border border-neutral-200 dark:border-neutral-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tight">
                            API Live
                        </span>
                    </div>
                </div>

                <div className="w-full min-h-100">{renderActiveTab()}</div>
            </div>
        </div>
    );
}
