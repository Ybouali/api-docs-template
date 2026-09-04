import { MetaTags } from '../components/MetaTags';
import { DocRenderer } from '../components/docs/DocRenderer';
import type { DocPage } from '../content/types';
import { useConfig } from '../config';

interface MarkdownPageProps {
    page: DocPage;
}

export function MarkdownPage({ page }: MarkdownPageProps) {
    const { api, company } = useConfig();
    const vars = {
        sandboxUrl: api.sandboxUrl,
        productionUrl: api.productionUrl,
        dashboardUrl: api.dashboardUrl,
        companyName: company.name,
        apiName: api.name,
    };

    return (
        <>
            <MetaTags title={page.title} description={page.description} />
            <article className="w-full max-w-4xl mx-auto pb-16">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {page.title}
                    </h1>
                    <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">{page.description}</p>
                </header>
                <DocRenderer blocks={page.blocks} vars={vars} />
            </article>
        </>
    );
}
