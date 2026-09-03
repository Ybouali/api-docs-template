import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

import { MetaTags } from '../../components/MetaTags';
import { KycHeader } from '../../components/kyc/KycHeader';
import { ComplianceInfo } from '../../components/kyc/ComplianceInfo';
import { AuthSection } from '../../components/kyc/AuthSection';
import { ConfirmSection } from '../../components/kyc/ConfirmSection';
import { RequestPreview } from '../../components/kyc/RequestPreview';
import { ErrorCodes } from '../../components/kyc/ErrorCodes';
import { ApiResultDisplay } from '../../components/common/ApiResultDisplay';

import {
    validatePhone,
    validateOtp,
    validateId,
    validateFile,
} from '../../utils/validation';
import { siteConfig } from '../../config/site';
import type { ApiResult } from '../../types/api';

interface KycErrors {
    phone?: string;
    otp?: string;
    idNumber?: string;
    idFront?: string;
    idBack?: string;
    selfie?: string;
}

export default function KYC() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [files, setFiles] = useState({
        idFront: '',
        idBack: '',
        selfie: '',
    });

    const [errors, setErrors] = useState<KycErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiResult, setApiResult] = useState<ApiResult | null>(null);

    useEffect(() => {
        if (phoneNumber) {
            const result = validatePhone(phoneNumber);
            setErrors((prev) => ({
                ...prev,
                phone: result.isValid ? undefined : result.error,
            }));
        } else {
            setErrors((prev) => ({ ...prev, phone: undefined }));
        }
    }, [phoneNumber]);

    useEffect(() => {
        if (otp) {
            const result = validateOtp(otp);
            setErrors((prev) => ({
                ...prev,
                otp: result.isValid ? undefined : result.error,
            }));
        } else {
            setErrors((prev) => ({ ...prev, otp: undefined }));
        }
    }, [otp]);

    useEffect(() => {
        if (idNumber) {
            const result = validateId(idNumber, siteConfig.identityDocumentLabel);
            setErrors((prev) => ({
                ...prev,
                idNumber: result.isValid ? undefined : result.error,
            }));
        } else {
            setErrors((prev) => ({ ...prev, idNumber: undefined }));
        }
    }, [idNumber]);

    const handleFileChange = (
        type: 'idFront' | 'idBack' | 'selfie',
        file: File,
    ) => {
        const labelMap = {
            idFront: siteConfig.identityDocumentFrontLabel,
            idBack: siteConfig.identityDocumentBackLabel,
            selfie: 'Selfie',
        };
        const result = validateFile(file, labelMap[type]);

        if (!result.isValid) {
            setErrors((prev) => ({ ...prev, [type]: result.error }));
            setFiles((prev) => ({ ...prev, [type]: '' }));
            return;
        }

        setErrors((prev) => ({ ...prev, [type]: undefined }));
        const reader = new FileReader();
        reader.onloadend = () => {
            setFiles((prev) => ({ ...prev, [type]: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleSendOtp = async () => {
        const phoneVal = validatePhone(phoneNumber);
        if (!phoneVal.isValid) {
            setErrors((prev) => ({ ...prev, phone: phoneVal.error }));
            return;
        }

        setIsLoading(true);
        setApiResult(null);

        const apiKey =
            localStorage.getItem(siteConfig.apiKeyStorageKey) ?? 'sk_test_dummy';
        const url = `${siteConfig.apiBaseUrl}/api/v1/kyc/auth`;
        const body = { phoneNumber };

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
            setApiResult({ method: 'POST', url, status: response.status, response: data });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Connection failed';
            setApiResult({ method: 'POST', url, status: 500, error: message });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitKyc = async () => {
        const phoneVal = validatePhone(phoneNumber);
        const otpVal = validateOtp(otp);
        const idVal = validateId(idNumber, siteConfig.identityDocumentLabel);

        const newErrors: KycErrors = {
            phone: phoneVal.isValid ? undefined : phoneVal.error,
            otp: otpVal.isValid ? undefined : otpVal.error,
            idNumber: idVal.isValid ? undefined : idVal.error,
            idFront: files.idFront ? undefined : `${siteConfig.identityDocumentFrontLabel} is required`,
            idBack: files.idBack ? undefined : `${siteConfig.identityDocumentBackLabel} is required`,
            selfie: files.selfie ? undefined : 'Selfie is required',
        };

        if (Object.values(newErrors).some((e) => !!e)) {
            setErrors(newErrors);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsLoading(true);
        setApiResult(null);

        const apiKey =
            localStorage.getItem(siteConfig.apiKeyStorageKey) ?? 'sk_test_dummy';
        const url = `${siteConfig.apiBaseUrl}/api/v1/kyc/confirm`;
        const body = {
            phoneNumber,
            idNumber,
            otp,
            documents: {
                idFront: files.idFront,
                idBack: files.idBack,
                selfie: files.selfie,
            },
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
            setApiResult({ method: 'POST', url, status: response.status, response: data });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Connection failed';
            setApiResult({ method: 'POST', url, status: 500, error: message });
        } finally {
            setIsLoading(false);
        }
    };

    const hasErrors = Object.values(errors).some((e) => !!e);
    const hasApiKey = !!localStorage.getItem(siteConfig.apiKeyStorageKey);

    const previewObject: Record<string, unknown> = hasErrors
        ? { error: 'Form contains validation errors' }
        : {
              phoneNumber,
              idNumber: idNumber || 'Pending...',
              otp: otp || 'Pending...',
              documents: {
                  idFront: files.idFront ? 'data:image/...;base64,...' : null,
                  idBack: files.idBack ? 'data:image/...;base64,...' : null,
                  selfie: files.selfie ? 'data:image/...;base64,...' : null,
              },
          };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 px-4 py-8 md:py-16">
            <MetaTags
                title="KYC & Identity Verification"
                description="Complete Know Your Customer verification and identity document upload."
            />
            <div className="max-w-4xl mx-auto space-y-12">
                <KycHeader />

                {hasErrors && (
                    <div className="p-4 bg-error/5 border border-error/20 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                        <AlertCircle className="w-5 h-5 text-error shrink-0" />
                        <p className="text-sm font-bold text-error">
                            Please fix the validation errors below before submitting.
                        </p>
                    </div>
                )}

                {!hasApiKey && (
                    <div className="p-4 bg-accent-50 dark:bg-accent-900/10 border border-accent-200 dark:border-accent-800/30 rounded-2xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-sm font-black text-neutral-900 dark:text-neutral-100 uppercase">
                                Sandbox Mode Active
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                                No API Key found. Using{' '}
                                <span className="text-brand-600 font-bold">sk_test_dummy</span>{' '}
                                for simulated requests. Configure your real key in{' '}
                                <a
                                    href="/setup"
                                    className="underline font-bold text-brand-600"
                                >
                                    Setup
                                </a>{' '}
                                for live validation.
                            </p>
                        </div>
                    </div>
                )}

                <ComplianceInfo />

                <div className="grid grid-cols-1 gap-10">
                    <AuthSection
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        onSendOtp={handleSendOtp}
                        isLoading={isLoading}
                        onTestClick={() => {}}
                        errors={errors}
                    />

                    <ConfirmSection
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        otp={otp}
                        setOtp={setOtp}
                        idNumber={idNumber}
                        setIdNumber={setIdNumber}
                        files={files}
                        onFileChange={handleFileChange}
                        onSubmit={handleSubmitKyc}
                        isLoading={isLoading}
                        onTestClick={() => {}}
                        errors={errors}
                    />

                    <RequestPreview payload={previewObject} />

                    <ErrorCodes />
                </div>

                {apiResult && <ApiResultDisplay {...apiResult} />}
            </div>
        </div>
    );
}
