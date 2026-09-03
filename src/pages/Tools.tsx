import { MetaTags } from '../components/MetaTags';

export default function Tools() {
    return (
        <>
            <MetaTags
                title="Tools & Webhooks"
                description="Developer tools, webhook configuration, and event testing."
            />
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-3xl font-bold text-brand-900 dark:text-brand-300">
                    Tools & Webhooks
                </h1>
                <p className="mt-2 text-sm text-neutral-500 italic">
                    Endpoint tester coming soon…
                </p>
            </div>
        </>
    );
}
