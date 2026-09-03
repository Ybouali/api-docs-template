import React, { useRef } from 'react';
import { CheckCircle, Loader2, Camera, IdCard, Upload, Play } from 'lucide-react';
import { siteConfig } from '../../config/site';

interface ConfirmSectionProps {
    phoneNumber: string;
    setPhoneNumber: (val: string) => void;
    otp: string;
    setOtp: (val: string) => void;
    idNumber: string;
    setIdNumber: (val: string) => void;
    files: {
        idFront: string;
        idBack: string;
        selfie: string;
    };
    onFileChange: (type: 'idFront' | 'idBack' | 'selfie', file: File) => void;
    onSubmit: () => void;
    isLoading: boolean;
    onTestClick: () => void;
    errors?: {
        phone?: string;
        otp?: string;
        idNumber?: string;
        idFront?: string;
        idBack?: string;
        selfie?: string;
    };
}

export const ConfirmSection: React.FC<ConfirmSectionProps> = ({
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    idNumber,
    setIdNumber,
    files,
    onFileChange,
    onSubmit,
    isLoading,
    onTestClick,
    errors,
}) => {
    const handleFileChange =
        (type: 'idFront' | 'idBack' | 'selfie') =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) onFileChange(type, file);
        };

    const hasErrors = errors && Object.keys(errors).some((k) => !!errors[k as keyof typeof errors]);
    const isComplete =
        phoneNumber &&
        otp.length === 6 &&
        idNumber &&
        files.idFront &&
        files.idBack &&
        files.selfie;

    return (
        <div className="card p-6 md:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                            Confirmation
                        </h3>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                            POST /api/v1/kyc/confirm
                        </p>
                    </div>
                </div>
                <button
                    onClick={onTestClick}
                    className="btn-secondary py-1 px-3 text-[10px] uppercase font-black tracking-tighter flex items-center gap-1.5"
                >
                    <Play className="w-3 h-3 fill-current" />
                    Simulate Submit
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label
                        htmlFor="confirm-kyc-phone"
                        className={`block text-xs font-black uppercase tracking-widest ${
                            errors?.phone ? 'text-error' : 'text-neutral-500'
                        }`}
                    >
                        Phone Number *
                    </label>
                    <input
                        id="confirm-kyc-phone"
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
                    {errors?.phone && (
                        <p className="text-xs text-error font-bold">{errors.phone}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="confirm-kyc-otp"
                        className={`block text-xs font-black uppercase tracking-widest ${
                            errors?.otp ? 'text-error' : 'text-neutral-500'
                        }`}
                    >
                        OTP Code *
                    </label>
                    <input
                        id="confirm-kyc-otp"
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        className={`input-base font-mono tracking-[0.5em] text-center ${
                            errors?.otp
                                ? 'border-error focus:border-error focus:ring-error/30'
                                : ''
                        }`}
                    />
                    {errors?.otp && (
                        <p className="text-xs text-error font-bold">{errors.otp}</p>
                    )}
                </div>

                <div className="md:col-span-2 space-y-1.5">
                    <label
                        htmlFor="confirm-kyc-id"
                        className={`block text-xs font-black uppercase tracking-widest ${
                            errors?.idNumber ? 'text-error' : 'text-neutral-500'
                        }`}
                    >
                        {siteConfig.identityDocumentLabel} Number *
                    </label>
                    <input
                        id="confirm-kyc-id"
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeholder="ID123456"
                        className={`input-base uppercase font-bold ${
                            errors?.idNumber
                                ? 'border-error focus:border-error focus:ring-error/30'
                                : ''
                        }`}
                    />
                    {errors?.idNumber && (
                        <p className="text-xs text-error font-bold">{errors.idNumber}</p>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-widest text-neutral-500">
                    Documents Verification *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FileUploadCard
                        label={siteConfig.identityDocumentFrontLabel}
                        icon={IdCard}
                        preview={files.idFront}
                        onUpload={handleFileChange('idFront')}
                        error={errors?.idFront}
                    />
                    <FileUploadCard
                        label={siteConfig.identityDocumentBackLabel}
                        icon={IdCard}
                        preview={files.idBack}
                        onUpload={handleFileChange('idBack')}
                        error={errors?.idBack}
                    />
                    <FileUploadCard
                        label="Selfie"
                        icon={Camera}
                        preview={files.selfie}
                        onUpload={handleFileChange('selfie')}
                        error={errors?.selfie}
                    />
                </div>
            </div>

            <button
                onClick={onSubmit}
                disabled={isLoading || !isComplete || !!hasErrors}
                className={`btn-primary w-full py-4 flex items-center justify-center gap-2 text-md uppercase font-black ${
                    isLoading || !isComplete || hasErrors
                        ? 'opacity-60 cursor-not-allowed grayscale'
                        : ''
                }`}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting KYC...
                    </>
                ) : (
                    <>
                        <CheckCircle className="w-5 h-5" />
                        Finalize Verification
                    </>
                )}
            </button>
        </div>
    );
};

interface FileUploadCardProps {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    preview: string;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({
    label,
    icon: Icon,
    preview,
    onUpload,
    error,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-2">
            <div
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label={`Upload ${label}`}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                className={`group relative h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all overflow-hidden
                    ${
                        error
                            ? 'border-error bg-error/5'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-brand-500 hover:bg-brand-50/10'
                    }
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onUpload}
                    accept="image/*"
                    className="hidden"
                    aria-label={`File input for ${label}`}
                />
                {preview ? (
                    <div className="absolute inset-0 w-full h-full p-1 bg-white dark:bg-neutral-900">
                        <img
                            src={preview}
                            alt={label}
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Upload className="w-6 h-6 text-white" />
                        </div>
                    </div>
                ) : (
                    <>
                        <div
                            className={`p-3 rounded-full transition-colors ${
                                error
                                    ? 'bg-error/20'
                                    : 'bg-neutral-50 dark:bg-neutral-900 group-hover:bg-brand-50/50'
                            }`}
                        >
                            <Icon
                                className={`w-5 h-5 ${
                                    error
                                        ? 'text-error'
                                        : 'text-neutral-400 group-hover:text-brand-600'
                                }`}
                            />
                        </div>
                        <span
                            className={`text-[10px] font-black uppercase tracking-wider ${
                                error
                                    ? 'text-error'
                                    : 'text-neutral-500 group-hover:text-brand-600'
                            }`}
                        >
                            {label}
                        </span>
                    </>
                )}
            </div>
            {error && (
                <p className="text-[10px] text-error font-bold text-center">{error}</p>
            )}
        </div>
    );
};
