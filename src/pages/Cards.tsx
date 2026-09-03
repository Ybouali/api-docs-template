import { MetaTags } from '../components/MetaTags';

export default function Cards() {
    return (
        <>
            <MetaTags
                title="Cards"
                description="Manage virtual and physical payment cards."
            />
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-3xl font-bold text-brand-900 dark:text-brand-300">
                    Cards
                </h1>
                <p className="mt-2 text-sm text-neutral-500 italic">
                    Endpoint tester coming soon…
                </p>
            </div>
        </>
    );
}
