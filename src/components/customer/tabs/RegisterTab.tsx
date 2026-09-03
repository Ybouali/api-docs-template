import React, { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import { TabContentWrapper } from '../TabContentWrapper';
import { ApiResultDisplay } from '../../common/ApiResultDisplay';
import type { ApiResult } from '../../../types/api';
import { siteConfig } from '../../../config/site';

export const RegisterTab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<ApiResult | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!phone.trim()) {
            setError('Phone number is required');
            return;
        }

        setIsLoading(true);
        setResult(null);

        const apiKey =
            localStorage.getItem(siteConfig.apiKeyStorageKey) ?? 'sk_test_dummy';
        const url = `${siteConfig.apiBaseUrl}/api/v1/customer/register`;
        const body = {
            phoneNumber: phone,
            firstName: name.split(' ')[0] || 'User',
            lastName: name.split(' ').slice(1).join(' ') || 'Test',
        };

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
                title="Register Customer"
                description="Create a new customer account in the system"
                icon={UserPlus}
            >
                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="reg-phone"
                            className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            Phone Number
                        </label>
                        <input
                            id="reg-phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={siteConfig.phonePlaceholder}
                            className={`input-base ${error ? 'border-error focus:ring-error/30' : ''}`}
                        />
                        {error && <p className="text-xs text-error font-medium">{error}</p>}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="reg-name"
                            className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            Full Name
                        </label>
                        <input
                            id="reg-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jane Doe"
                            className="input-base"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <UserPlus className="w-5 h-5" />
                                Register Customer
                            </>
                        )}
                    </button>
                </form>
            </TabContentWrapper>

            {result && <ApiResultDisplay {...result} />}
        </div>
    );
};
