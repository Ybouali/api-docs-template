import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { createSearcher, searchDocs, type SearchRecord } from '../../search';
import { useSearchConfig } from '../../config';

const KIND_LABEL: Record<SearchRecord['kind'], string> = {
    page: 'Page',
    endpoint: 'API',
    error: 'Error',
};

export function SearchDialog() {
    const searchConfig = useSearchConfig();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const fuse = useMemo(() => createSearcher(), []);
    const results = useMemo(() => searchDocs(query, fuse), [query, fuse]);

    const close = useCallback(() => {
        setOpen(false);
        setQuery('');
        setActive(0);
    }, []);

    const openDialog = useCallback(() => {
        setActive(0);
        setOpen(true);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const meta = e.metaKey || e.ctrlKey;
            if (meta && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen((v) => {
                    if (v) {
                        setQuery('');
                        setActive(0);
                        return false;
                    }
                    setActive(0);
                    return true;
                });
            }
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [close]);

    useEffect(() => {
        if (!open) return;
        const id = requestAnimationFrame(() => inputRef.current?.focus());
        return () => cancelAnimationFrame(id);
    }, [open]);

    const go = (item: SearchRecord) => {
        const [path, hash] = item.href.split('#');
        navigate(path);
        close();
        if (hash) {
            requestAnimationFrame(() => {
                document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
            });
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={openDialog}
                className="flex items-center gap-2 w-full max-w-md px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-500 hover:border-brand-400 transition-colors"
                aria-label="Open search"
                aria-haspopup="dialog"
                aria-keyshortcuts="Control+K Meta+K"
            >
                <SearchIcon size={16} aria-hidden />
                <span className="flex-1 text-left truncate">{searchConfig.placeholder}</span>
                <kbd className="hidden sm:inline text-[10px] font-semibold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-700 text-neutral-500">
                    {searchConfig.shortcutLabel}
                </kbd>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-80 flex items-start justify-center pt-[12vh] px-4 bg-black/40"
                    onClick={close}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Search documentation"
                        className="w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <label className="sr-only" htmlFor="portal-search">
                            Search
                        </label>
                        <input
                            id="portal-search"
                            ref={inputRef}
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setActive(0);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
                                } else if (e.key === 'ArrowUp') {
                                    e.preventDefault();
                                    setActive((i) => Math.max(i - 1, 0));
                                } else if (e.key === 'Enter' && results[active]) {
                                    e.preventDefault();
                                    go(results[active]);
                                }
                            }}
                            placeholder={searchConfig.placeholder}
                            className="w-full px-4 py-3 text-base bg-transparent outline-none border-b border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                            autoComplete="off"
                        />
                        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
                            {query && results.length === 0 && (
                                <li className="px-3 py-6 text-center text-sm text-neutral-500">
                                    No results for “{query}”
                                </li>
                            )}
                            {results.map((item, i) => (
                                <li key={item.id} role="option" aria-selected={i === active}>
                                    <button
                                        type="button"
                                        onClick={() => go(item)}
                                        onMouseEnter={() => setActive(i)}
                                        className={`w-full text-left px-3 py-2 rounded-lg ${
                                            i === active
                                                ? 'bg-brand-50 dark:bg-brand-900/30'
                                                : ''
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] uppercase font-bold tracking-wide text-neutral-400">
                                                {KIND_LABEL[item.kind]}
                                            </span>
                                            <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                                                {item.title}
                                            </span>
                                        </div>
                                        <p className="text-xs text-neutral-500 line-clamp-1">{item.description}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
