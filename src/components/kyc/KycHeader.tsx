import React from 'react';

export const KycHeader: React.FC = () => {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-neutral-100 text-center tracking-tight">
                KYC & Identity Verification
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-neutral-500 dark:text-neutral-400 text-center font-medium leading-relaxed">
                Complete Know Your Customer verification to meet compliance requirements
                and secure your financial operations.
            </p>
        </div>
    );
};
