import React, { useState } from 'react';
import { Building, Loader2 } from 'lucide-react';
import { siteConfig } from '../../config/site';

interface VirementTabProps {
    onSubmit: (data: Record<string, unknown>) => void;
    isLoading: boolean;
}

export const VirementTab: React.FC<VirementTabProps> = ({ onSubmit, isLoading }) => {
    const [iban, setIban] = useState('');
    const [beneficiary, setBeneficiary] = useState('');
    const [amount, setAmount] = useState('');
    const [bankCode, setBankCode] = useState('');
    const [errors, setErrors] = useState<{
        iban?: string;
        amount?: string;
        beneficiary?: string;
    }>({});

    const handleExecute = () => {
        const amountNum = parseFloat(amount);
        const newErrors = {
            iban: iban.length >= 10 ? undefined : 'Valid IBAN / account number is required',
            beneficiary: beneficiary.length >= 3 ? undefined : 'Beneficiary name is required',
            amount: amountNum > 0 ? undefined : 'Amount must be > 0',
        };

        if (newErrors.iban || newErrors.beneficiary || newErrors.amount) {
            setErrors(newErrors);
            return;
        }

        onSubmit({ iban, beneficiary, amount: amountNum, bankCode, currency: siteConfig.currency });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <Building className="w-6 h-6 text-brand-600" />
                    <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-neutral-100">
                        Bank Transfer
                    </h2>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                    External bank transfer to a verified bank account
                </p>
                <div className="pt-1">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                        POST /api/v1/payments/virement
                    </span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-1.5">
                    <label
                        htmlFor="virement-beneficiary"
                        className={`block text-[10px] font-black uppercase tracking-widest ${
                            errors.beneficiary ? 'text-error' : 'text-neutral-500'
                        }`}
                    >
                        Beneficiary Name *
                    </label>
                    <input
                        id="virement-beneficiary"
                        type="text"
                        value={beneficiary}
                        onChange={(e) => setBeneficiary(e.target.value)}
                        placeholder="Full Legal Name"
                        className={`input-base ${errors.beneficiary ? 'border-error' : ''}`}
                    />
                    {errors.beneficiary && (
                        <p className="text-[10px] text-error font-bold">{errors.beneficiary}</p>
                    )}
                </div>

                <div className="md:col-span-2 space-y-1.5">
                    <label
                        htmlFor="virement-iban"
                        className={`block text-[10px] font-black uppercase tracking-widest ${
                            errors.iban ? 'text-error' : 'text-neutral-500'
                        }`}
                    >
                        IBAN / Account Number *
                    </label>
                    <input
                        id="virement-iban"
                        type="text"
                        value={iban}
                        onChange={(e) => setIban(e.target.value)}
                        placeholder={siteConfig.ibanPlaceholder}
                        className={`input-base font-mono ${errors.iban ? 'border-error' : ''}`}
                    />
                    {errors.iban && (
                        <p className="text-[10px] text-error font-bold">{errors.iban}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="virement-amount"
                        className={`block text-[10px] font-black uppercase tracking-widest ${
                            errors.amount ? 'text-error' : 'text-neutral-500'
                        }`}
                    >
                        Amount ({siteConfig.currency}) *
                    </label>
                    <input
                        id="virement-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className={`input-base ${errors.amount ? 'border-error' : ''}`}
                    />
                    {errors.amount && (
                        <p className="text-[10px] text-error font-bold">{errors.amount}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="virement-bankcode"
                        className="block text-[10px] font-black uppercase tracking-widest text-neutral-500"
                    >
                        Bank Code (Optional)
                    </label>
                    <input
                        id="virement-bankcode"
                        type="text"
                        value={bankCode}
                        onChange={(e) => setBankCode(e.target.value)}
                        placeholder="e.g. 011"
                        className="input-base"
                    />
                </div>
            </div>

            <button
                onClick={handleExecute}
                disabled={isLoading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-md uppercase font-black"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Building className="w-5 h-5" />
                        Execute Bank Transfer
                    </>
                )}
            </button>
        </div>
    );
};
