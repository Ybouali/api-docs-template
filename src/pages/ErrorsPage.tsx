import { MetaTags } from '../components/MetaTags';
import { ResponseViewer } from '../components/api';
import { errorCatalog } from '../content/errors';

const exampleBody = {
    error: {
        code: 'validation_error',
        message: 'The request body failed validation.',
        details: [{ field: 'name', issue: 'is required' }],
    },
};

export function ErrorsPage() {
    return (
        <>
            <MetaTags
                title="Errors"
                description="HTTP status codes and error payload format."
            />
            <div className="w-full max-w-4xl mx-auto pb-16 space-y-8">
                <header>
                    <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-neutral-100">
                        Errors
                    </h1>
                    <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
                        Failed requests return JSON with a stable <code className="font-mono text-sm">error.code</code>.
                        Edit the catalog in <code className="font-mono text-sm">src/content/errors.ts</code>.
                    </p>
                </header>

                <section>
                    <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">
                        Payload shape
                    </h2>
                    <ResponseViewer value={exampleBody} label="Error payload example" />
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                        Catalog
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700">
                        <table className="w-full min-w-[36rem] text-left text-sm">
                            <thead className="bg-neutral-50 dark:bg-neutral-900 text-xs uppercase text-neutral-500">
                                <tr>
                                    <th scope="col" className="px-4 py-3">HTTP</th>
                                    <th scope="col" className="px-4 py-3">Code</th>
                                    <th scope="col" className="px-4 py-3">Message</th>
                                    <th scope="col" className="px-4 py-3">When</th>
                                </tr>
                            </thead>
                            <tbody>
                                {errorCatalog.map((err) => (
                                    <tr
                                        key={err.code}
                                        id={err.code}
                                        className="border-t border-neutral-200 dark:border-neutral-700 scroll-mt-24"
                                    >
                                        <td className="px-4 py-3 font-mono font-semibold text-error-600">
                                            {err.httpStatus}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-brand-700 dark:text-brand-300">
                                            {err.code}
                                        </td>
                                        <td className="px-4 py-3 text-neutral-800 dark:text-neutral-200">
                                            {err.message}
                                        </td>
                                        <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                                            {err.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
}
