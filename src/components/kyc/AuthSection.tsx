import React from 'react';
import { Smartphone, Loader2, Play } from 'lucide-react';
import { siteConfig } from '../../config/site';

interface AuthSectionProps {
    phoneNumber: string;
    setPhoneNumber: (val: string) => void;
    onSendOtp: () => void;
    isLoading: boolean;
    onTestClick: () => void;
    errors?: { phone?: string };
}

export const AuthSection: React.FC<AuthSectionProps> = ({
    phoneNumber,
    setPhoneNumber,
    onSendOtp,
    isLoading,
    onTestClick,
    errors,
}) => {
    return (
        <div className="card p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                        <Smartphone className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                            Authentication
                        </h3>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                            POST /api/v1/kyc/auth
                        </p>
                    </div>
                </div>
                <button
                    onClick={onTestClick}
                    className="btn-secondary py-1 px-3 text-[10px] uppercase font-black tracking-tighter flex items-center gap-1.5"
                >
                    <Play className="w-3 h-3 fill-current" />
                    Test Connection
                </button>
            </div>

            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label
                        htmlFor="kyc-phone"
                        className={`block text-xs font-black uppercase tracking-widest ${
                            errors?.phone ? 'text-error' : 'text-neutral-500'
                        }`}
                    >
                        Phone Number *
                    </label>
                    <input
                        id="kyc-phone"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={siteConfig.phonePlaceholder}
                        className={`input-base ${
                            errors?.phone
                                ? 'border-error focus:border-error focus:ring-error/30'
                                : ''
                        }`}
                    />
                    {errors?.phone ? (
                        <p className="text-xs text-error font-bold animate-in fade-in slide-in-from-top-1">
                            {errors.phone}
                        </p>
                    ) : (
                        <p className="text-[10px] text-neutral-400 font-medium">
                            A 6-digit verification code will be sent to this number.
                        </p>
                    )}
                </div>

                <button
                    onClick={onSendOtp}
                    disabled={isLoading || !!errors?.phone || !phoneNumber}
                    className={`btn-primary w-full py-3.5 flex items-center justify-center gap-2 ${
                        isLoading || !!errors?.phone || !phoneNumber
                            ? 'opacity-60 cursor-not-allowed'
                            : ''
                    }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Requesting Code...
                        </>
                    ) : (
                        <>
                            <Smartphone className="w-5 h-5" />
                            Send OTP Code
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
