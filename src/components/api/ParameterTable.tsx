import type { ApiParameter } from '../../types/api';

interface ParameterTableProps {
    parameters: ApiParameter[];
}

export function ParameterTable({ parameters }: ParameterTableProps) {
    if (parameters.length === 0) {
        return (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">No parameters.</p>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700">
            <table className="w-full min-w-[32rem] text-left text-sm">
                <caption className="sr-only">Request parameters</caption>
                <thead className="bg-neutral-50 dark:bg-neutral-900 text-xs uppercase tracking-wide text-neutral-500">
                    <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                        <th scope="col" className="px-4 py-3 font-semibold">In</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Type</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Required</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {parameters.map((p) => (
                        <tr
                            key={`${p.in}-${p.name}`}
                            className="border-t border-neutral-200 dark:border-neutral-700"
                        >
                            <td className="px-4 py-3 font-mono text-brand-700 dark:text-brand-300 whitespace-nowrap">
                                {p.name}
                            </td>
                            <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{p.in}</td>
                            <td className="px-4 py-3 font-mono text-neutral-600 dark:text-neutral-400">
                                {p.type}
                            </td>
                            <td className="px-4 py-3">{p.required ? 'Yes' : 'No'}</td>
                            <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">{p.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
