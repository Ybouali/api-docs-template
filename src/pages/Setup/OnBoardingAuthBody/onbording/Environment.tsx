import { useState } from 'react';
import { Globe, Server, Check } from 'lucide-react';
import { siteConfig } from '../../../../config/site';

export default function Environment({ onNext }: { onNext?: () => void }) {
    const [selected, setSelected] = useState('sandbox');

    const envs = [
        {
            id: 'sandbox',
            name: 'Sandbox',
            desc: 'Unlimited testing, mock data, no real money involved.',
            icon: Globe,
            url: siteConfig.apiBaseUrl,
        },
        {
            id: 'production',
            name: 'Production',
            desc: 'Real transactions, live customers, secure network.',
            icon: Server,
            url: siteConfig.apiProductionUrl,
        },
    ];

    return (
        <div className="w-full">
            <div className="card border-0 bg-linear-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 p-8 shadow-2xl overflow-hidden relative">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-brand-900 dark:text-neutral-100">
                        Step 3: Pick Environment
                    </h2>
                    <p className="text-neutral-500 mt-1 text-sm">
                        Select where you want to execute your API calls.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {envs.map((env) => (
                        <button
                            key={env.id}
                            onClick={() => setSelected(env.id)}
                            className={`
                                relative p-5 rounded-xl border-2 text-left transition-all duration-300
                                ${
                                    selected === env.id
                                        ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-900/10'
                                        : 'border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-800 hover:border-brand-200'
                                }
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`
                                    w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                                    ${
                                        selected === env.id
                                            ? 'bg-brand-600 text-white'
                                            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500'
                                    }
                                `}
                                >
                                    <env.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-brand-900 dark:text-neutral-100 leading-tight">
                                        {env.name}
                                    </h3>
                                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                        {env.url}
                                    </p>
                                </div>
                                {selected === env.id && (
                                    <Check className="w-5 h-5 text-brand-600" />
                                )}
                            </div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3 leading-relaxed">
                                {env.desc}
                            </p>
                        </button>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onNext}
                        className="btn-primary px-10 py-3.5 flex items-center gap-2"
                    >
                        <Check className="w-5 h-5" />
                        Confirm Environment & Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
