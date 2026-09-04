import { useId, useState } from 'react';
import type { CodeExample } from '../../types/api';

interface CodeExampleTabsProps {
    examples: CodeExample[];
}

export function CodeExampleTabs({ examples }: CodeExampleTabsProps) {
    const [index, setIndex] = useState(0);
    const tabId = useId();
    const active = examples[index];

    if (!examples.length) return null;

    return (
        <div>
            <div role="tablist" aria-label="Code examples" className="flex flex-wrap gap-2 mb-3">
                {examples.map((ex, i) => {
                    const selected = i === index;
                    return (
                        <button
                            key={ex.label}
                            type="button"
                            role="tab"
                            id={`${tabId}-tab-${i}`}
                            aria-selected={selected}
                            aria-controls={`${tabId}-panel`}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => setIndex(i)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                selected
                                    ? 'bg-brand-600 text-white'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                        >
                            {ex.label}
                        </button>
                    );
                })}
            </div>
            <pre
                role="tabpanel"
                id={`${tabId}-panel`}
                aria-labelledby={`${tabId}-tab-${index}`}
                tabIndex={0}
                className="json-viewer text-sm"
            >
                {active.code}
            </pre>
        </div>
    );
}
