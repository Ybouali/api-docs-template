import React from 'react';
import { ToggleLeft, ToggleRight, Info } from 'lucide-react';

interface OperationsHeaderProps {
    isMockMode: boolean;
    setIsMockMode: (val: boolean) => void;
}

export const OperationsHeader: React.FC<OperationsHeaderProps> = ({
    isMockMode,
    setIsMockMode,
}) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                        Payments &{' '}
                        <span className="text-brand-600">Operations</span>
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium">
                        Execute transfers, cash-ins, merchant payments, and manage
                        transactions
                    </p>
                </div>

                <div className="flex items-center justify-center md:justify-end gap-4">
                    <div className="flex items-center gap-3 p-1.5 bg-neutral-100 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                        <span
                            className={`text-[10px] font-black uppercase tracking-widest px-3 ${
                                !isMockMode ? 'text-neutral-500' : 'text-brand-600'
                            }`}
                        >
                            Mock Mode
                        </span>
                        <button
                            onClick={() => setIsMockMode(!isMockMode)}
                            aria-pressed={isMockMode}
                            aria-label="Toggle mock mode"
                            className="transition-all active:scale-95"
                        >
                            {isMockMode ? (
                                <ToggleRight className="w-10 h-10 text-brand-600 fill-brand-600/10" />
                            ) : (
                                <ToggleLeft className="w-10 h-10 text-neutral-400 fill-neutral-400/10" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMockMode && (
                <div className="p-4 bg-brand-50 dark:bg-brand-900/10 border border-brand-200 dark:border-brand-800/30 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <Info className="w-5 h-5 text-brand-600 shrink-0" />
                    <p className="text-xs text-brand-800 dark:text-brand-200 font-bold">
                        Simulation Active: API calls are bypassed. Success/Failure JSON
                        will be generated locally.
                    </p>
                </div>
            )}
        </div>
    );
};
