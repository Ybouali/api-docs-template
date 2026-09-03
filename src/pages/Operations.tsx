import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

import { MetaTags } from '../components/MetaTags';
import { OperationsHeader } from '../components/operations/OperationsHeader';
import { OperationsTabs } from '../components/operations/OperationsTabs';
import type { OperationTabType } from '../components/operations/OperationsTabs';
import { CashInTab } from '../components/operations/CashInTab';
import { TransferTab } from '../components/operations/TransferTab';
import { VirementTab } from '../components/operations/VirementTab';
import { MerchantTab } from '../components/operations/MerchantTab';
import { TransactionsTab } from '../components/operations/TransactionsTab';
import { ApiResultDisplay } from '../components/common/ApiResultDisplay';
import { siteConfig } from '../config/site';
import type { ApiResult } from '../types/api';

export default function Operations() {
    const [activeTab, setActiveTab] = useState<OperationTabType>('Cash In');
    const [isMockMode, setIsMockMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [apiResult, setApiResult] = useState<ApiResult | null>(null);

    const apiKey = localStorage.getItem(siteConfig.apiKeyStorageKey);

    const handleOperation = async (
        data: Record<string, unknown>,
        endpoint: string,
    ) => {
        setIsLoading(true);
        setApiResult(null);

        const url = `${siteConfig.apiBaseUrl}${endpoint}`;

        if (isMockMode) {
            await new Promise<void>((resolve) => setTimeout(resolve, 1200));
            setApiResult({
                method: 'POST',
                url: `(MOCK) ${url}`,
                status: 200,
                response: {
                    status: 'success',
                    transactionId: `mock-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
                    message: `${activeTab} executed successfully in mock mode`,
                    data,
                    timestamp: new Date().toISOString(),
                },
            });
        } else {
            if (!apiKey) {
                setApiResult({
                    method: 'POST',
                    url,
                    status: 401,
                    error: 'API Key missing. Please set it in the Setup page or enable Mock Mode.',
                });
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const responseData: unknown = await response.json();
                setApiResult({
                    method: 'POST',
                    url,
                    status: response.status,
                    response: responseData,
                });
            } catch (err: unknown) {
                const message =
                    err instanceof Error ? err.message : 'Connection failed';
                setApiResult({ method: 'POST', url, status: 500, error: message });
            }
        }

        setIsLoading(false);
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Cash In':
                return (
                    <CashInTab
                        onSubmit={(d) =>
                            handleOperation(d, '/api/v1/payments/cash-in')
                        }
                        isLoading={isLoading}
                    />
                );
            case 'Transfer':
                return (
                    <TransferTab
                        onSubmit={(d) =>
                            handleOperation(d, '/api/v1/payments/transfer')
                        }
                        isLoading={isLoading}
                    />
                );
            case 'Bank Virement':
                return (
                    <VirementTab
                        onSubmit={(d) =>
                            handleOperation(d, '/api/v1/payments/virement')
                        }
                        isLoading={isLoading}
                    />
                );
            case 'Merchant Payment':
                return (
                    <MerchantTab
                        onSubmit={(d) =>
                            handleOperation(d, '/api/v1/payments/merchant')
                        }
                        isLoading={isLoading}
                    />
                );
            case 'Operations':
                return <TransactionsTab />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 px-4 py-8 md:py-16">
            <MetaTags
                title="Payments & Operations"
                description="Execute transfers, cash-ins, merchant payments, and manage transaction history."
            />
            <div className="max-w-4xl mx-auto space-y-12">
                <OperationsHeader
                    isMockMode={isMockMode}
                    setIsMockMode={setIsMockMode}
                />

                {!apiKey && !isMockMode && (
                    <div className="p-4 bg-error/5 border border-error/20 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
                        <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-sm font-black text-error uppercase tracking-wider">
                                Authentication Required
                            </p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                                Real API calls require a valid key. Configure your
                                credentials in{' '}
                                <a
                                    href="/setup"
                                    className="mx-1 font-bold text-brand-600 underline"
                                >
                                    Setup
                                </a>{' '}
                                or enable <span className="font-bold">Mock Mode</span> to
                                preview the UI.
                            </p>
                        </div>
                    </div>
                )}

                <div>
                    <OperationsTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    <div className="card mt-8 p-6 md:p-10 min-h-[400px]">
                        {renderActiveTab()}
                    </div>
                </div>

                {apiResult && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        <ApiResultDisplay {...apiResult} />
                    </div>
                )}
            </div>
        </div>
    );
}
