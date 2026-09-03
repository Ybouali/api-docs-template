import { motion } from 'framer-motion';
import { Zap, Activity, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../../../../config/site';

export default function TestConnection() {
    const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

    const runTest = () => {
        setStatus('testing');
        // Replace with a real connectivity check against siteConfig.api.sandboxUrl
        // e.g.: fetch(`${siteConfig.api.sandboxUrl}/health`).then(...).catch(...)
        setTimeout(() => {
            setStatus('success');
        }, 2500);
    };

    return (
        <div className="w-full">
            <div className="card border-0 bg-linear-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 p-8 shadow-2xl overflow-hidden relative">
                {status === 'testing' && (
                    <div className="absolute inset-0 bg-brand-500/5 animate-pulse" />
                )}

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div
                        className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl transition-all duration-500
                        ${status === 'idle'    ? 'bg-neutral-100 text-neutral-400'                    : ''}
                        ${status === 'testing' ? 'bg-brand-100 text-brand-600 rotate-180 animate-pulse' : ''}
                        ${status === 'success' ? 'bg-success-600/20 text-success scale-110'            : ''}
                        ${status === 'error'   ? 'bg-error/20 text-error'                              : ''}
                    `}
                    >
                        {status === 'idle'    && <Zap        className="w-8 h-8" />}
                        {status === 'testing' && <Loader2    className="w-8 h-8 animate-spin" />}
                        {status === 'success' && <CheckCircle2 className="w-8 h-8" />}
                        {status === 'error'   && <XCircle    className="w-8 h-8" />}
                    </div>

                    <h2 className="text-2xl font-black text-brand-900 dark:text-neutral-100 mb-1">
                        Step 4: Test Connection
                    </h2>
                    <p className="text-neutral-500 mb-8 max-w-sm text-sm">
                        Everything is set! Let's ping the {siteConfig.api.name} servers
                        to verify your API configuration.
                    </p>

                    <div className="w-full space-y-4">
                        <button
                            onClick={runTest}
                            disabled={status === 'testing'}
                            className={`
                                w-full py-4 rounded-2xl font-black text-lg transition-all shadow-xl
                                ${status === 'testing'
                                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed shadow-none'
                                    : 'btn-primary'
                                }
                            `}
                        >
                            {status === 'testing' ? 'Pinging Servers...' : 'Run Connection Test'}
                        </button>

                        {status === 'idle' && (
                            <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm font-medium">
                                <Activity className="w-4 h-4" />
                                <span>Approximate latency: ~45ms</span>
                            </div>
                        )}

                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-success-600/10 border border-success-600/20 rounded-xl text-success font-bold flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                <span>API Handshake Successful!</span>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-error/10 border border-error/20 rounded-xl text-error font-bold flex items-center justify-center gap-2"
                            >
                                <XCircle className="w-5 h-5" />
                                <span>Connection failed. Check your API key and network.</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <p className="text-center mt-8 text-sm text-neutral-400">
                Facing issues?{' '}
                <a
                    href={siteConfig.company.supportEmail ? `mailto:${siteConfig.company.supportEmail}` : '#'}
                    className="text-brand-600 underline font-bold"
                >
                    Contact Support
                </a>
            </p>
        </div>
    );
}
