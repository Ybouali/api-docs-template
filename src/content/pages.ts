import type { DocPage } from './types';

export const introductionPage: DocPage = {
    slug: 'introduction',
    href: '/',
    title: 'Introduction',
    description: 'What this developer portal is and how to use it as a template.',
    blocks: [
        {
            type: 'heading',
            level: 2,
            text: 'Welcome',
            id: 'welcome',
        },
        {
            type: 'paragraph',
            text: 'This is a **generic API developer portal**. Clone the repository, edit `src/config/site.ts` and the files in `src/content/`, and you have branded documentation for any HTTP API.',
        },
        {
            type: 'callout',
            variant: 'tip',
            title: 'Start here if you forked this template',
            text: 'Replace company name, colors, and sample Widget endpoints with your own. Do not leave example.com URLs in production.',
        },
        {
            type: 'heading',
            level: 2,
            text: 'What you will find',
            id: 'what-you-will-find',
        },
        {
            type: 'list',
            items: [
                '[Getting Started](/getting-started) — install a client and make your first request',
                '[Authentication](/authentication) — API keys and the Authorization header',
                '[Guides](/guides) — conceptual how-tos',
                '[API Reference](/api-reference) — methods, paths, parameters, and examples',
                '[Errors](/errors) — status codes and error payloads',
                '[Webhooks](/webhooks) — outbound event notifications',
                '[Changelog](/changelog) — version history',
            ],
        },
        {
            type: 'heading',
            level: 2,
            text: 'Environments',
            id: 'environments',
        },
        {
            type: 'table',
            headers: ['Environment', 'Base URL', 'Use for'],
            rows: [
                ['Sandbox', '`{{sandboxUrl}}`', 'Development and CI'],
                ['Production', '`{{productionUrl}}`', 'Live traffic'],
            ],
        },
    ],
};

export const gettingStartedPage: DocPage = {
    slug: 'getting-started',
    href: '/getting-started',
    title: 'Getting Started',
    description: 'Create credentials and send your first API request.',
    blocks: [
        {
            type: 'heading',
            level: 2,
            text: '1. Get an API key',
            id: 'api-key',
        },
        {
            type: 'paragraph',
            text: 'Sign in to the [developer dashboard]({{dashboardUrl}}) and create a sandbox key. Store it in an environment variable — never commit it to git.',
        },
        {
            type: 'code',
            language: 'bash',
            code: 'export API_KEY="sk_test_your_key_here"',
        },
        {
            type: 'heading',
            level: 2,
            text: '2. Send a request',
            id: 'first-request',
        },
        {
            type: 'paragraph',
            text: 'The sample API uses a Bearer token. Replace the host with your sandbox URL from configuration.',
        },
        {
            type: 'code',
            language: 'bash',
            code: `curl -sS "{{sandboxUrl}}/v1/widgets" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Accept: application/json"`,
        },
        {
            type: 'heading',
            level: 2,
            text: '3. Next steps',
            id: 'next',
        },
        {
            type: 'list',
            items: [
                'Read [Authentication](/authentication) for header details and key rotation',
                'Browse [API Reference](/api-reference) for every endpoint',
                'Subscribe to [Webhooks](/webhooks) if your product emits events',
            ],
        },
    ],
};

export const authenticationPage: DocPage = {
    slug: 'authentication',
    href: '/authentication',
    title: 'Authentication',
    description: 'How clients authenticate to the API.',
    blocks: [
        {
            type: 'heading',
            level: 2,
            text: 'API keys',
            id: 'api-keys',
        },
        {
            type: 'paragraph',
            text: 'Every request must include your secret key in the **Authorization** header using the Bearer scheme.',
        },
        {
            type: 'code',
            language: 'http',
            code: 'Authorization: Bearer sk_test_your_key_here',
        },
        {
            type: 'callout',
            variant: 'warning',
            title: 'Keep keys private',
            text: 'Server-side only. Do not embed production keys in mobile apps or public repositories.',
        },
        {
            type: 'heading',
            level: 2,
            text: 'Sandbox vs production',
            id: 'envs',
        },
        {
            type: 'paragraph',
            text: 'Sandbox keys only work against `{{sandboxUrl}}`. Production keys only work against `{{productionUrl}}`. Mixing them returns `401`.',
        },
        {
            type: 'heading',
            level: 3,
            text: 'Example (JavaScript)',
            id: 'js-example',
        },
        {
            type: 'code',
            language: 'javascript',
            code: `const res = await fetch("{{sandboxUrl}}/v1/widgets", {
  headers: {
    Authorization: \`Bearer \${process.env.API_KEY}\`,
    Accept: "application/json",
  },
});`,
        },
    ],
};

export const webhooksPage: DocPage = {
    slug: 'webhooks',
    href: '/webhooks',
    title: 'Webhooks',
    description: 'Receive asynchronous event notifications.',
    blocks: [
        {
            type: 'heading',
            level: 2,
            text: 'Overview',
            id: 'overview',
        },
        {
            type: 'paragraph',
            text: 'Register an HTTPS endpoint in the dashboard. The API POSTs JSON events when resources change. Respond with `2xx` quickly; retry logic uses exponential backoff.',
        },
        {
            type: 'heading',
            level: 2,
            text: 'Verify signatures',
            id: 'signatures',
        },
        {
            type: 'paragraph',
            text: 'Each request includes an `X-Webhook-Signature` header (HMAC-SHA256 of the raw body using your webhook secret). Reject requests with invalid signatures.',
        },
        {
            type: 'code',
            language: 'javascript',
            code: `import { createHmac, timingSafeEqual } from "node:crypto";

function isValid(rawBody, signature, secret) {
  const digest = createHmac("sha256", secret).update(rawBody).digest("hex");
  return timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}`,
        },
        {
            type: 'heading',
            level: 2,
            text: 'Example payload',
            id: 'payload',
        },
        {
            type: 'code',
            language: 'json',
            code: `{
  "id": "evt_123",
  "type": "widget.created",
  "created_at": "2026-01-15T12:00:00Z",
  "data": {
    "id": "wdg_abc",
    "name": "Sample widget"
  }
}`,
        },
        {
            type: 'callout',
            variant: 'info',
            text: 'Replace event types and payload fields with your product’s events in `src/content/pages.ts`.',
        },
    ],
};

export const changelogPage: DocPage = {
    slug: 'changelog',
    href: '/changelog',
    title: 'Changelog',
    description: 'API and portal version history.',
    blocks: [
        {
            type: 'heading',
            level: 2,
            text: '1.0.0 — January 2026',
            id: 'v1',
        },
        {
            type: 'list',
            items: [
                'Initial template release',
                'Sample Widget API reference',
                'Search, theming, and documentation pages',
            ],
        },
        {
            type: 'callout',
            variant: 'tip',
            title: 'How to maintain this page',
            text: 'Add a heading and list for each release in `src/content/pages.ts`. Keep dates and versions in sync with `siteConfig.api`.',
        },
    ],
};

export const guidesIndexPage: DocPage = {
    slug: 'guides',
    href: '/guides',
    title: 'Guides',
    description: 'Task-oriented walkthroughs.',
    blocks: [
        {
            type: 'paragraph',
            text: 'Guides explain workflows rather than a single endpoint. Add more pages in `src/content/guides.ts` and they will appear here automatically.',
        },
    ],
};

export const staticPages: DocPage[] = [
    introductionPage,
    gettingStartedPage,
    authenticationPage,
    webhooksPage,
    changelogPage,
    guidesIndexPage,
];
