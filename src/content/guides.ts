import type { DocPage } from './types';

export const paginationGuide: DocPage = {
    slug: 'pagination',
    href: '/guides/pagination',
    title: 'Pagination',
    description: 'Walk list endpoints using cursor parameters.',
    blocks: [
        {
            type: 'heading',
            level: 2,
            text: 'Cursor pagination',
            id: 'cursor',
        },
        {
            type: 'paragraph',
            text: 'List endpoints return `data` plus `next_cursor`. Pass `next_cursor` as `cursor` on the following request until it is `null`.',
        },
        {
            type: 'code',
            language: 'bash',
            code: 'curl "{{sandboxUrl}}/v1/widgets?limit=20&cursor=wdg_abc"',
        },
        {
            type: 'table',
            headers: ['Query param', 'Default', 'Description'],
            rows: [
                ['`limit`', '20', 'Page size (1–100)'],
                ['`cursor`', '—', 'Opaque cursor from the previous page'],
            ],
        },
    ],
};

export const idempotencyGuide: DocPage = {
    slug: 'idempotency',
    href: '/guides/idempotency',
    title: 'Idempotency',
    description: 'Safely retry POST requests.',
    blocks: [
        {
            type: 'heading',
            level: 2,
            text: 'Idempotency-Key header',
            id: 'header',
        },
        {
            type: 'paragraph',
            text: 'Send a unique `Idempotency-Key` (UUID) on create requests. Replays with the same key and body return the original response instead of creating duplicates.',
        },
        {
            type: 'code',
            language: 'http',
            code: 'Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        },
        {
            type: 'callout',
            variant: 'warning',
            text: 'Changing the body while reusing a key returns `409 Conflict`.',
        },
    ],
};

export const guides: DocPage[] = [paginationGuide, idempotencyGuide];
