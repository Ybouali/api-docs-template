import APIKey from './onbording/APIKey';
import Environment from './onbording/Environment';
import TestConnection from './onbording/TestConnection';
import WhitelistIP from './onbording/WhitelistIP';

type OnBoardingAuthBodyProps = {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    progress: number;
    setProgress: (progress: number) => void;
};

function OnBoardingAuthBody({
    currentStep,
    setCurrentStep,
    progress,
    setProgress,
}: OnBoardingAuthBodyProps) {
    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleNext = (stepFinished: number) => {
        if (stepFinished > progress) {
            setProgress(stepFinished);
        }
        setCurrentStep(stepFinished + 1);
    };

    return (
        <div className="w-full flex flex-col items-center gap-6 py-6" id="onboarding-body">
            <div className="w-full max-w-3xl">
                {(() => {
                    switch (currentStep) {
                        case 1:
                            return <APIKey onNext={() => handleNext(1)} />;
                        case 2:
                            return <WhitelistIP onNext={() => handleNext(2)} />;
                        case 3:
                            return <Environment onNext={() => handleNext(3)} />;
                        case 4:
                            return <TestConnection />;
                        default:
                            return <APIKey onNext={() => handleNext(1)} />;
                    }
                })()}
            </div>

            {currentStep > 1 && (
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-neutral-500 hover:text-brand-600 font-bold text-sm transition-colors group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Back to previous step
                </button>
            )}
        </div>
    );
}

export default OnBoardingAuthBody;
