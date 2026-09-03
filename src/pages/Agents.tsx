import { MetaTags } from '../components/MetaTags';

export default function Agents() {
    return (
        <>
            <MetaTags
                title="Agents"
                description="Manage agent network and distribution channels."
            />
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-3xl font-bold text-brand-900 dark:text-brand-300">
                    Agents
                </h1>
                <p className="mt-2 text-sm text-neutral-500 italic">
                    Endpoint tester coming soon…
                </p>
            </div>
        </>
    );
}
