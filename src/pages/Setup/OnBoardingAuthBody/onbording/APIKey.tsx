import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { siteConfig } from '../../../../config/site';

interface APIKeyProps {
    onNext?: () => void;
    isLoading?: boolean;
    errorMessage?: string;
}

export default function APIKey({
    onNext,
    isLoading = false,
    errorMessage,
}: APIKeyProps) {
    const [apiKey, setApiKey] = useState('');
    const [localError, setLocalError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!apiKey.trim()) {
            setLocalError('Please enter your API key');
            return;
        }

        setLocalError('');
        localStorage.setItem(siteConfig.apiKeyStorageKey, apiKey.trim());

        if (onNext) onNext();
    };

    const displayError = errorMessage ?? localError;

    return (
        <div className="w-full">
            <div className="card border-0 bg-linear-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 p-8 shadow-2xl overflow-hidden relative">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                            Step 1: Enter API Key
                        </h1>
                        <p className="text-neutral-500 mt-2 text-sm">
                            Get your API key from the{' '}
                            <a
                                href={siteConfig.dashboardUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-600 hover:text-brand-700 font-medium underline"
                            >
                                developer dashboard
                            </a>
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="api-key"
                            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                            Your API Key
                        </label>
                        <input
                            id="api-key"
                            type="text"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                            disabled={isLoading}
                            className={`input-base ${
                                displayError
                                    ? 'border-error focus:border-error focus:ring-error/30'
                                    : ''
                            }`}
                        />
                        {displayError && (
                            <p className="text-sm text-error mt-1.5">{displayError}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !apiKey.trim()}
                        className={`btn-primary w-full py-3.5 flex items-center justify-center gap-2 ${
                            isLoading || !apiKey.trim()
                                ? 'opacity-60 cursor-not-allowed'
                                : ''
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5 text-white" />
                                Saving...
                            </>
                        ) : (
                            'Save & Continue'
                        )}
                    </button>

                    <p className="text-center text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                        Secure connection • Your key is stored safely
                    </p>
                </form>
            </div>
        </div>
    );
}
