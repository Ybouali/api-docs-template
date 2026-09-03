import React, { useState } from 'react';
import { Wallet, Loader2 } from 'lucide-react';
import { TabContentWrapper } from '../TabContentWrapper';
import { ApiResultDisplay } from '../../common/ApiResultDisplay';
import type { ApiResult } from '../../../types/api';
import { siteConfig } from '../../../config/site';

export const BalanceTab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<ApiResult | null>(null);

    const handleGetBalance = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone.trim()) {
            setError('Phone number is required');
            return;
        }
        setError('');
        setIsLoading(true);
        setResult(null);

        const apiKey =
            localStorage.getItem(siteConfig.apiKeyStorageKey) ?? 'sk_test_dummy';
        const url = `${siteConfig.apiBaseUrl}/api/v1/customer/balance?phoneNumber=${encodeURIComponent(phone)}`;

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
                title="Customer Balance"
                description="Check the current real-time balance for a customer"
                icon={Wallet}
            >
                <form onSubmit={handleGetBalance} className="space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="balance-phone"
                            className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            Phone Number
                        </label>
                        <input
                            id="balance-phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={siteConfig.phonePlaceholder}
                            className={`input-base ${error ? 'border-error focus:ring-error/30' : ''}`}
                        />
                        {error && <p className="text-xs text-error font-medium">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Retrieving...
                            </>
                        ) : (
                            <>
                                <Wallet className="w-5 h-5" />
                                Get Current Balance
                            </>
                        )}
                    </button>
                </form>
            </TabContentWrapper>

            {result && <ApiResultDisplay {...result} />}
        </div>
    );
};
