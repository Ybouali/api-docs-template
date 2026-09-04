export type CalloutVariant = 'info' | 'warning' | 'tip';

export type DocBlock =
    | { type: 'heading'; level: 2 | 3; text: string; id?: string }
    | { type: 'paragraph'; text: string }
    | { type: 'list'; ordered?: boolean; items: string[] }
    | { type: 'code'; language: string; code: string }
    | { type: 'callout'; variant: CalloutVariant; title?: string; text: string }
    | { type: 'table'; headers: string[]; rows: string[][] };

export interface DocPage {
    slug: string;
    href: string;
    title: string;
    description: string;
    blocks: DocBlock[];
}

export interface ErrorEntry {
    code: string;
    httpStatus: number;
    message: string;
    description: string;
}
