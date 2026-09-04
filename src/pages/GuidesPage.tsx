import { Link, useParams } from 'react-router-dom';
import { MetaTags } from '../components/MetaTags';
import { DocRenderer } from '../components/docs/DocRenderer';
import { guides, guidesIndexPage } from '../content';
import { useConfig } from '../config';

export function GuidesPage() {
    const { slug } = useParams();
    const { api } = useConfig();
    const vars = {
        sandboxUrl: api.sandboxUrl,
        productionUrl: api.productionUrl,
        dashboardUrl: api.dashboardUrl,
        apiName: api.name,
    };

    const guide = slug ? guides.find((g) => g.slug === slug) : undefined;

    if (slug && !guide) {
        return (
            <div className="max-w-3xl mx-auto">
                <MetaTags title="Guide not found" />
                <h1 className="text-2xl font-bold mb-4">Guide not found</h1>
                <Link to="/guides" className="text-brand-600 underline">
                    Back to guides
                </Link>
            </div>
        );
    }

    if (guide) {
        return (
            <>
                <MetaTags title={guide.title} description={guide.description} />
                <article className="w-full max-w-4xl mx-auto pb-16">
                    <p className="text-sm mb-4">
                        <Link to="/guides" className="text-brand-600 dark:text-brand-400">
                            Guides
                        </Link>
                        <span className="text-neutral-400"> / {guide.title}</span>
                    </p>
                    <h1 className="text-3xl font-black mb-2 text-neutral-900 dark:text-neutral-100">
                        {guide.title}
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">{guide.description}</p>
                    <DocRenderer blocks={guide.blocks} vars={vars} />
                </article>
            </>
        );
    }

    return (
        <>
            <MetaTags title={guidesIndexPage.title} description={guidesIndexPage.description} />
            <div className="w-full max-w-4xl mx-auto pb-16">
                <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-neutral-100 mb-2">
                    {guidesIndexPage.title}
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                    {guidesIndexPage.description}
                </p>
                <DocRenderer blocks={guidesIndexPage.blocks} vars={vars} />
                <ul className="mt-8 grid gap-4">
                    {guides.map((g) => (
                        <li key={g.slug}>
                            <Link
                                to={g.href}
                                className="block card p-5 hover:border-brand-400 transition-colors"
                            >
                                <h2 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
                                    {g.title}
                                </h2>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                    {g.description}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
