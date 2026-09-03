import { Shield, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function WhitelistIP({ onNext }: { onNext?: () => void }) {
    const [ipAddress, setIpAddress] = useState('192.168.1.1');
    const [isDetecting, setIsDetecting] = useState(false);

    const handleDetectIP = () => {
        setIsDetecting(true);
        // In a real implementation, call an IP detection service here.
        // e.g.: fetch('https://api.ipify.org?format=json').then(r => r.json()).then(d => setIpAddress(d.ip))
        setTimeout(() => {
            setIsDetecting(false);
        }, 1200);
    };

    return (
        <div className="w-full">
            <div className="card border-0 bg-linear-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 p-8 shadow-2xl overflow-hidden relative">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="p-3 bg-brand-50 rounded-2xl mb-3">
                        <Shield className="w-7 h-7 text-brand-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-900 dark:text-neutral-100">
                        Step 2: Whitelist IP
                    </h2>
                    <p className="text-neutral-500 mt-2 text-sm leading-relaxed">
                        For security, your server or client IP must be whitelisted
                        before making API calls. Enter the IP address below.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="ip-address"
                            className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                            IP Address
                        </label>
                        <div className="relative">
                            <input
                                id="ip-address"
                                type="text"
                                value={ipAddress}
                                onChange={(e) => setIpAddress(e.target.value)}
                                className="input-base pr-24"
                                placeholder="0.0.0.0"
                            />
                            <button
                                onClick={handleDetectIP}
                                disabled={isDetecting}
                                className="absolute right-2 top-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-xs font-bold text-brand-700 dark:text-brand-300 rounded-lg transition-colors flex items-center gap-1.5"
                            >
                                <RefreshCcw
                                    className={`w-3 h-3 ${isDetecting ? 'animate-spin' : ''}`}
                                />
                                {isDetecting ? 'Detecting...' : 'My IP'}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={onNext}
                        className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 group"
                    >
                        <CheckCircle2 className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        Save IP Configuration & Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
