import React, { useState } from 'react';
import { Activity, Loader2 } from 'lucide-react';
import { TabContentWrapper } from '../TabContentWrapper';
import { ApiResultDisplay } from '../../common/ApiResultDisplay';
import type { ApiResult } from '../../../types/api';
import { siteConfig } from '../../../config/site';

export const StatusTab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ApiResult | null>(null);

    const handleCheckStatus = async () => {
        setIsLoading(true);
        setResult(null);

        const apiKey =
            localStorage.getItem(siteConfig.apiKeyStorageKey) ?? 'sk_test_dummy';
        const url = `${siteConfig.apiBaseUrl}/api/v1/customer/status`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });

            const data: unknown = await response.json();
            setResult({ method: 'GET', url, status: response.status, response: data });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to connect to API';
            setResult({ method: 'GET', url, status: 500, error: message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <TabContentWrapper
                title="Status"
                description="Overview of the customer platform health and statistics"
                icon={Activity}
            >
                <div className="flex flex-col gap-6">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Pings the API infrastructure to verify the status of the customer management subsystem.
                    </p>

                    <button
                        onClick={handleCheckStatus}
                        disabled={isLoading}
                        className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Querying API...
                            </>
                        ) : (
                            <>
                                <Activity className="w-5 h-5" />
                                Check System Status
                            </>
                        )}
                    </button>
                </div>
            </TabContentWrapper>

            {result && <ApiResultDisplay {...result} />}
        </div>
    );
};
