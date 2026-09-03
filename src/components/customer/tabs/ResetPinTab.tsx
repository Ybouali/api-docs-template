import React, { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { TabContentWrapper } from '../TabContentWrapper';
import { ApiResultDisplay } from '../../common/ApiResultDisplay';
import type { ApiResult } from '../../../types/api';
import { siteConfig } from '../../../config/site';

export const ResetPinTab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [newPin, setNewPin] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<ApiResult | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone.trim()) {
            setError('Phone number is required');
            return;
        }
        if (newPin.length !== 4) {
            setError('PIN must be 4 digits');
            return;
        }
        setError('');
        setIsLoading(true);
        setResult(null);

        const apiKey =
            localStorage.getItem(siteConfig.apiKeyStorageKey) ?? 'sk_test_dummy';
        const url = `${siteConfig.apiBaseUrl}/api/v1/customer/reset-pin`;
        const body = { phoneNumber: phone, newPin };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data: unknown = await response.json();
            setResult({ method: 'POST', url, status: response.status, response: data });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to connect to API';
            setResult({ method: 'POST', url, status: 500, error: message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <TabContentWrapper
                title="Reset PIN"
                description="Update the customer's secure access PIN"
                icon={Lock}
            >
                <form onSubmit={handleReset} className="space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="resetpin-phone"
                            className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            Phone Number
                        </label>
                        <input
                            id="resetpin-phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={siteConfig.phonePlaceholder}
                            className={`input-base ${error && !phone ? 'border-error focus:ring-error/30' : ''}`}
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="resetpin-pin"
                            className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            New 4-Digit PIN
                        </label>
                        <input
                            id="resetpin-pin"
                            type="password"
                            maxLength={4}
                            value={newPin}
                            onChange={(e) => setNewPin(e.target.value)}
                            placeholder="••••"
                            className={`input-base tracking-[1em] text-center font-mono ${error && newPin.length !== 4 ? 'border-error focus:ring-error/30' : ''}`}
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
                                Updating...
                            </>
                        ) : (
                            <>
                                <Lock className="w-5 h-5" />
                                Reset Customer PIN
                            </>
                        )}
                    </button>
                </form>
            </TabContentWrapper>

            {result && <ApiResultDisplay {...result} />}
        </div>
    );
};
