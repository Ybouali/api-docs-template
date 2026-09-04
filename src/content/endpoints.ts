import type { ApiEndpoint } from '../types/api';

/**
 * Sample Widget API — replace with your own endpoints.
 * Components render this data; they do not hardcode paths or examples.
 */
export const endpoints: ApiEndpoint[] = [
    {
        id: 'list-widgets',
        title: 'List widgets',
        description: 'Returns a paginated list of widgets for the authenticated account.',
        method: 'GET',
        path: '/v1/widgets',
        parameters: [
            {
                name: 'limit',
                in: 'query',
                type: 'integer',
                required: false,
                description: 'Number of items to return (1–100). Default 20.',
            },
            {
                name: 'cursor',
                in: 'query',
                type: 'string',
                required: false,
                description: 'Pagination cursor from a previous response.',
            },
        ],
        responses: [
            {
                status: 200,
                description: 'A page of widgets.',
                example: {
                    data: [{ id: 'wdg_abc', name: 'Sample widget', status: 'active' }],
                    next_cursor: null,
                },
            },
            { status: 401, description: 'Missing or invalid API key.' },
        ],
        examples: [
            {
                language: 'bash',
                label: 'cURL',
                code: `curl -sS "{{baseUrl}}/v1/widgets?limit=20" \\
  -H "Authorization: Bearer $API_KEY"`,
            },
            {
                language: 'javascript',
                label: 'JavaScript',
                code: `const res = await fetch("{{baseUrl}}/v1/widgets?limit=20", {
  headers: { Authorization: \`Bearer \${process.env.API_KEY}\` },
});
const body = await res.json();`,
            },
        ],
    },
    {
        id: 'create-widget',
        title: 'Create widget',
        description: 'Creates a widget. Send an Idempotency-Key header to make retries safe.',
        method: 'POST',
        path: '/v1/widgets',
        parameters: [
            {
                name: 'Idempotency-Key',
                in: 'header',
                type: 'string',
                required: false,
                description: 'UUID used to deduplicate create requests.',
            },
        ],
        requestBody: {
            contentType: 'application/json',
            description: 'Widget fields.',
            example: { name: 'Sample widget', metadata: { color: 'blue' } },
        },
        responses: [
            {
                status: 201,
                description: 'Widget created.',
                example: {
                    id: 'wdg_abc',
                    name: 'Sample widget',
                    status: 'active',
                    created_at: '2026-01-15T12:00:00Z',
                },
            },
            { status: 400, description: 'Validation error.' },
            { status: 401, description: 'Missing or invalid API key.' },
        ],
        examples: [
            {
                language: 'bash',
                label: 'cURL',
                code: `curl -sS -X POST "{{baseUrl}}/v1/widgets" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Sample widget"}'`,
            },
            {
                language: 'javascript',
                label: 'JavaScript',
                code: `const res = await fetch("{{baseUrl}}/v1/widgets", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "Sample widget" }),
});`,
            },
        ],
    },
    {
        id: 'get-widget',
        title: 'Retrieve widget',
        description: 'Fetches a single widget by id.',
        method: 'GET',
        path: '/v1/widgets/{id}',
        parameters: [
            {
                name: 'id',
                in: 'path',
                type: 'string',
                required: true,
                description: 'Widget id (for example `wdg_abc`).',
            },
        ],
        responses: [
            {
                status: 200,
                description: 'The widget.',
                example: { id: 'wdg_abc', name: 'Sample widget', status: 'active' },
            },
            { status: 404, description: 'Widget not found.' },
        ],
        examples: [
            {
                language: 'bash',
                label: 'cURL',
                code: `curl -sS "{{baseUrl}}/v1/widgets/wdg_abc" \\
  -H "Authorization: Bearer $API_KEY"`,
            },
        ],
    },
    {
        id: 'delete-widget',
        title: 'Delete widget',
        description: 'Permanently deletes a widget.',
        method: 'DELETE',
        path: '/v1/widgets/{id}',
        parameters: [
            {
                name: 'id',
                in: 'path',
                type: 'string',
                required: true,
                description: 'Widget id to delete.',
            },
        ],
        responses: [
            { status: 204, description: 'Deleted. Empty body.' },
            { status: 404, description: 'Widget not found.' },
        ],
        examples: [
            {
                language: 'bash',
                label: 'cURL',
                code: `curl -sS -X DELETE "{{baseUrl}}/v1/widgets/wdg_abc" \\
  -H "Authorization: Bearer $API_KEY"`,
            },
        ],
    },
];

export function getEndpointById(id: string): ApiEndpoint | undefined {
    return endpoints.find((e) => e.id === id);
}
