import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { DocBlock } from '../../content/types';
import { Callout } from './Callout';

interface DocRendererProps {
    blocks: DocBlock[];
    vars?: Record<string, string>;
}

function interpolate(text: string, vars: Record<string, string>): string {
    return text.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? '');
}

/** Inline **bold**, `code`, and [label](/path) — enough for docs without a markdown parser. */
function InlineText({ text }: { text: string }) {
    const parts: ReactNode[] = [];
    const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    let last = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > last) {
            parts.push(text.slice(last, match.index));
        }
        const token = match[0];
        if (token.startsWith('**')) {
            parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
        } else if (token.startsWith('`')) {
            parts.push(
                <code
                    key={key++}
                    className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[0.9em]"
                >
                    {token.slice(1, -1)}
                </code>,
            );
        } else {
            const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (link) {
                const [, label, href] = link;
                if (href.startsWith('/')) {
                    parts.push(
                        <Link key={key++} to={href} className="text-brand-600 dark:text-brand-400 underline underline-offset-2">
                            {label}
                        </Link>,
                    );
                } else {
                    parts.push(
                        <a
                            key={key++}
                            href={href}
                            className="text-brand-600 dark:text-brand-400 underline underline-offset-2"
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            target={href.startsWith('http') ? '_blank' : undefined}
                        >
                            {label}
                        </a>,
                    );
                }
            }
        }
        last = match.index + token.length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return <>{parts}</>;
}

export function DocRenderer({ blocks, vars = {} }: DocRendererProps) {
    return (
        <div className="space-y-5 max-w-3xl">
            {blocks.map((block, i) => {
                switch (block.type) {
                    case 'heading': {
                        const Tag = block.level === 2 ? 'h2' : 'h3';
                        const size = block.level === 2 ? 'text-2xl' : 'text-lg';
                        return (
                            <Tag
                                key={i}
                                id={block.id}
                                className={`${size} font-bold text-neutral-900 dark:text-neutral-100 tracking-tight scroll-mt-24`}
                            >
                                {block.text}
                            </Tag>
                        );
                    }
                    case 'paragraph':
                        return (
                            <p key={i} className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                <InlineText text={interpolate(block.text, vars)} />
                            </p>
                        );
                    case 'list': {
                        const ListTag = block.ordered ? 'ol' : 'ul';
                        return (
                            <ListTag
                                key={i}
                                className={`space-y-2 text-neutral-700 dark:text-neutral-300 leading-relaxed pl-5 ${
                                    block.ordered ? 'list-decimal' : 'list-disc'
                                }`}
                            >
                                {block.items.map((item) => (
                                    <li key={item}>
                                        <InlineText text={interpolate(item, vars)} />
                                    </li>
                                ))}
                            </ListTag>
                        );
                    }
                    case 'code':
                        return (
                            <pre key={i} tabIndex={0} className="json-viewer text-sm">
                                {interpolate(block.code, vars)}
                            </pre>
                        );
                    case 'callout':
                        return (
                            <Callout key={i} variant={block.variant} title={block.title}>
                                <InlineText text={interpolate(block.text, vars)} />
                            </Callout>
                        );
                    case 'table':
                        return (
                            <div
                                key={i}
                                className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700"
                            >
                                <table className="w-full min-w-[24rem] text-left text-sm">
                                    <thead className="bg-neutral-50 dark:bg-neutral-900 text-xs uppercase text-neutral-500">
                                        <tr>
                                            {block.headers.map((h) => (
                                                <th key={h} scope="col" className="px-4 py-3 font-semibold">
                                                    <InlineText text={h} />
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {block.rows.map((row, ri) => (
                                            <tr
                                                key={ri}
                                                className="border-t border-neutral-200 dark:border-neutral-700"
                                            >
                                                {row.map((cell, ci) => (
                                                    <td
                                                        key={ci}
                                                        className="px-4 py-3 text-neutral-700 dark:text-neutral-300"
                                                    >
                                                        <InlineText text={interpolate(cell, vars)} />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}
