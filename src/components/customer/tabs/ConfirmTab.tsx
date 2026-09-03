import React, { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { TabContentWrapper } from '../TabContentWrapper';
import { ApiResultDisplay } from '../../common/ApiResultDisplay';
import type { ApiResult } from '../../../types/api';
import { siteConfig } from '../../../config/site';

export const ConfirmTab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<ApiResult | null>(null);

    const handleConfirm = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!phone.trim()) {
            setError('Phone number is required');
            return;
        }
        if (otp.length !== 6) {
            setError('OTP must be 6 digits');
            return;
        }

        setIsLoading(true);
        setResult(null);

        const apiKey =
            localStorage.getItem(siteConfig.apiKeyStorageKey) ?? 'sk_test_dummy';
        const url = `${siteConfig.apiBaseUrl}/api/v1/customer/confirm`;
        const body = { phoneNumber: phone, otp };

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
                title="Confirm Customer"
                description="Verify customer registration with OTP code"
                icon={CheckCircle}
            >
                <form onSubmit={handleConfirm} className="space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="confirm-phone"
                            className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            Phone Number
                        </label>
                        <input
                            id="confirm-phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={siteConfig.phonePlaceholder}
                            className={`input-base ${error && !phone ? 'border-error focus:ring-error/30' : ''}`}
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="confirm-otp"
                            className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            OTP Code
                        </label>
                        <input
                            id="confirm-otp"
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            className={`input-base tracking-[0.5em] text-center font-mono ${error && otp.length !== 6 ? 'border-error focus:ring-error/30' : ''}`}
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
                                Validating...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                Confirm Registration
                            </>
                        )}
                    </button>
                </form>
            </TabContentWrapper>

            {result && <ApiResultDisplay {...result} />}
        </div>
    );
};
