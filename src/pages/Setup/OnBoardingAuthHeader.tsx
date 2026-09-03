import { KeyRound, ShieldCheck, Globe, Zap, Check } from 'lucide-react';

type OnBoardingAuthType = {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    progress: number;
};

function OnBoardingAuth({
    currentStep,
    setCurrentStep,
    progress,
}: OnBoardingAuthType) {
    const handleStepClick = (step: number) => {
        if (step <= progress + 1) {
            setCurrentStep(step);
        }
    };

    const steps = [
        { icon: KeyRound,   title: 'Enter API Key',      description: 'Paste your secret key'       },
        { icon: ShieldCheck, title: 'Whitelist IP',       description: 'Add your server / client IP' },
        { icon: Globe,       title: 'Pick Environment',   description: 'Choose test or production'   },
        { icon: Zap,         title: 'Test Connection',    description: 'Verify everything works'     },
    ];

    const isStepCompleted = (stepNumber: number) => stepNumber <= progress;

    return (
        <div className="w-full flex items-center justify-center overflow-x-auto pb-4 scrollbar-none">
            <div className="flex flex-row md:grid md:grid-cols-4 gap-4 w-full min-w-200 md:min-w-0 px-4">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = isStepCompleted(stepNumber);
                    const isCurrentStep = stepNumber === currentStep;

                    return (
                        <button
                            key={index}
                            onClick={() => handleStepClick(stepNumber)}
                            aria-current={isCurrentStep ? 'step' : undefined}
                            className={`
                                flex-1 group relative flex flex-col p-6 rounded-2xl border-2 transition-all duration-300 text-left
                                ${
                                    isCompleted
                                        ? 'border-brand-600 bg-brand-50/30 dark:bg-brand-900/5'
                                        : isCurrentStep
                                        ? 'border-brand-400 bg-white dark:bg-neutral-800 shadow-lg shadow-brand-100/20'
                                        : 'border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900 opacity-60 hover:opacity-100 hover:border-neutral-200'
                                }
                            `}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div
                                    className={`
                                    w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                                    ${
                                        isCompleted
                                            ? 'bg-success text-white'
                                            : isCurrentStep
                                            ? 'bg-brand-600 text-white'
                                            : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500'
                                    }
                                `}
                                >
                                    {isCompleted ? (
                                        <Check className="w-6 h-6" />
                                    ) : (
                                        <step.icon className="w-5 h-5" />
                                    )}
                                </div>
                                <span
                                    className={`text-[10px] font-black uppercase tracking-widest ${
                                        isCurrentStep ? 'text-brand-600' : 'text-neutral-400'
                                    }`}
                                >
                                    Step 0{stepNumber}
                                </span>
                            </div>

                            <div>
                                <h3
                                    className={`font-bold text-sm ${
                                        isCurrentStep
                                            ? 'text-brand-900 dark:text-white'
                                            : 'text-neutral-600 dark:text-neutral-400'
                                    }`}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-[11px] text-neutral-400 mt-1 leading-snug font-medium">
                                    {step.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default OnBoardingAuth;
