import { MetaTags } from '../components/MetaTags';

export default function Beneficiaries() {
    return (
        <>
            <MetaTags
                title="Beneficiaries"
                description="Manage payment beneficiaries and saved recipients."
            />
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-3xl font-bold text-brand-900 dark:text-brand-300">
                    Beneficiaries
                </h1>
                <p className="mt-2 text-sm text-neutral-500 italic">
                    Endpoint tester coming soon…
                </p>
            </div>
        </>
    );
}
