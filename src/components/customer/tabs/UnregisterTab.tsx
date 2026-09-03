import React, { useState } from 'react';
import { UserX, Loader2, AlertTriangle } from 'lucide-react';
import { TabContentWrapper } from '../TabContentWrapper';
import { ApiResultDisplay } from '../../common/ApiResultDisplay';
import type { ApiResult } from '../../../types/api';
import { siteConfig } from '../../../config/site';

export const UnregisterTab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<ApiResult | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleUnregister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone.trim()) {
            setError('Phone number is required');
            return;
        }
        if (!isConfirmed) {
            setError('Please confirm that you want to delete this account');
            return;
        }
        setError('');
        setIsLoading(true);
        setResult(null);

        const apiKey =
            localStorage.getItem(siteConfig.apiKeyStorageKey) ?? 'sk_test_dummy';
        const url = `${siteConfig.apiBaseUrl}/api/v1/customer/unregister`;
        const body = { phoneNumber: phone };

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data: unknown = await response.json();
            setResult({ method: 'DELETE', url, status: response.status, response: data });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to connect to API';
            setResult({ method: 'DELETE', url, status: 500, error: message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <TabContentWrapper
                title="Unregister Customer"
                description="Permanently delete a customer account and all associated data"
                icon={UserX}
            >
                <form onSubmit={handleUnregister} className="space-y-6">
                    <div className="p-4 bg-error/5 border border-error/20 rounded-xl flex items-start gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-error">Danger Zone</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                                This action is irreversible. The customer's balance and
                                transaction history will be permanently deleted.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="unregister-phone"
                            className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            Phone Number
                        </label>
                        <input
                            id="unregister-phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={siteConfig.phonePlaceholder}
                            className={`input-base ${error && !phone ? 'border-error focus:ring-error/30' : ''}`}
                        />
                    </div>

                    <div
                        className="flex items-center gap-3 p-3 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                        onClick={() => setIsConfirmed((v) => !v)}
                        role="checkbox"
                        aria-checked={isConfirmed}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === ' ' && setIsConfirmed((v) => !v)}
                    >
                        <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                isConfirmed ? 'bg-error border-error' : 'border-neutral-300'
                            }`}
                        >
                            {isConfirmed && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                        </div>
                        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                            I understand this action will permanently delete the customer account
                        </span>
                    </div>

                    {error && (
                        <p className="text-xs text-error font-medium">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !isConfirmed}
                        className={`w-full py-3.5 flex items-center justify-center gap-2 mt-4 rounded-xl font-medium text-white bg-error hover:bg-error-600 transition-colors shadow ${
                            !isConfirmed ? 'opacity-50 grayscale cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <UserX className="w-5 h-5" />
                                Permanently Unregister
                            </>
                        )}
                    </button>
                </form>
            </TabContentWrapper>

            {result && <ApiResultDisplay {...result} />}
        </div>
    );
};
