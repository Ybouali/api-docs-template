import React from 'react';

export const CustomerHeader: React.FC = () => {
    return (
        <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-brand-900 dark:text-neutral-100 tracking-tighter text-center md:text-left">
                Customer Management
            </h1>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400 font-medium text-center md:text-left text-lg">
                Register, verify, and maintain customer lifecycle through standardized API flows.
            </p>
        </div>
    );
};
