import { useState } from 'react';
import CurlExample from './CurlExample';
import Header from './Header';
import OnBoardingAuthBody from './OnBoardingAuthBody';
import OnBoardingAuth from './OnBoardingAuthHeader';
import { MetaTags } from '../../components/MetaTags';

export default function Setup() {
    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(0);

    return (
        <>
            <MetaTags
                title="Authentication & Setup"
                description="Configure your API key, whitelist IPs, pick an environment, and verify connectivity."
            />
            <div className="flex flex-col items-center gap-12 w-full max-w-7xl mx-auto pb-12">
                <Header />
                <OnBoardingAuth
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    progress={progress}
                />
                <OnBoardingAuthBody
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    progress={progress}
                    setProgress={setProgress}
                />
                <CurlExample />
            </div>
        </>
    );
}
