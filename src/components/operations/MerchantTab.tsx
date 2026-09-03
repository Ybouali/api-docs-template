import React, { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import { validatePhone } from '../../utils/validation';
import { siteConfig } from '../../config/site';

interface MerchantTabProps {
    onSubmit: (data: Record<string, unknown>) => void;
    isLoading: boolean;
}

export const MerchantTab: React.FC<MerchantTabProps> = ({ onSubmit, isLoading }) => {
    const [merchantId, setMerchantId] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [invoiceRef, setInvoiceRef] = useState('');
    const [errors, setErrors] = useState<{
        merchantId?: string;
        phone?: string;
        amount?: string;
    }>({});

    const handleExecute = () => {
        const phoneResult = validatePhone(phone);
        const amountNum = parseFloat(amount);

        const newErrors = {
            merchantId: merchantId.length >= 4 ? undefined : 'Valid Merchant ID is required',
            phone: phoneResult.isValid ? undefined : phoneResult.error,
            amount: amountNum > 0 ? undefined : 'Amount must be > 0',
        };

        if (newErrors.merchantId || newErrors.phone || newErrors.amount) {
            setErrors(newErrors);
            return;
        }

        onSubmit({
            merchantId,
            phone,
            amount: amountNum,
            invoiceRef,
            currency: siteConfig.currency,
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-brand-600" />
                    <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-neutral-100">
                        Merchant Payment
                    </h2>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                    Execute a payment from customer wallet to a merchant
                </p>
                <div className="pt-1">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                        POST /api/v1/payments/merchant
                    </span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label
                        htmlFor="merchant-id"
                        className={`block text-[10px] font-black uppercase tracking-widest ${
                            errors.merchantId ? 'text-error' : 'text-neutral-500'
                        }`}
                    >
                        Merchant ID / Code *
                    </label>
                    <input
                        id="merchant-id"
                        type="text"
                        value={merchantId}
                        onChange={(e) => setMerchantId(e.target.value)}
                        placeholder="M-123456"
                        className={`input-base ${errors.merchantId ? 'border-error' : ''}`}
                    />
                    {errors.merchantId && (
                        <p className="text-[10px] text-error font-bold">{errors.merchantId}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="merchant-phone"
                        className={`block text-[10px] font-black uppercase tracking-widest ${
                            errors.phone ? 'text-error' : 'text-neutral-500'
                        }`}
                    >
                        Customer Phone *
                    </label>
                    <input
                        id="merchant-phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={siteConfig.phonePlaceholder}
                        className={`input-base ${errors.phone ? 'border-error focus:ring-error/30' : ''}`}
                    />
                    {errors.phone && (
                        <p className="text-[10px] text-error font-bold">{errors.phone}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="merchant-amount"
                        className={`block text-[10px] font-black uppercase tracking-widest ${
                            errors.amount ? 'text-error' : 'text-neutral-500'
                        }`}
                    >
                        Amount ({siteConfig.currency}) *
                    </label>
                    <input
                        id="merchant-amount"
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
                        htmlFor="merchant-invoice"
                        className="block text-[10px] font-black uppercase tracking-widest text-neutral-500"
                    >
                        Invoice Ref (Optional)
                    </label>
                    <input
                        id="merchant-invoice"
                        type="text"
                        value={invoiceRef}
                        onChange={(e) => setInvoiceRef(e.target.value)}
                        placeholder="INV-2024-001"
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
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <CreditCard className="w-5 h-5" />
                        Execute Payment
                    </>
                )}
            </button>
        </div>
    );
};
