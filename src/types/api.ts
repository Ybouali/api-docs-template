export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiParameter {
    name: string;
    in: 'path' | 'query' | 'header';
    type: string;
    required: boolean;
    description: string;
}

export interface ApiRequestBody {
    contentType: string;
    description?: string;
    example: unknown;
}

export interface ApiResponse {
    status: number;
    description: string;
    example?: unknown;
}

export interface CodeExample {
    language: string;
    label: string;
    code: string;
}

export interface ApiEndpoint {
    id: string;
    title: string;
    description: string;
    method: HttpMethod;
    path: string;
    parameters?: ApiParameter[];
    requestBody?: ApiRequestBody;
    responses: ApiResponse[];
    examples: CodeExample[];
}

/** Live sandbox call result (optional; used by JSON viewers). */
export interface ApiResult {
    method: string;
    url: string;
    status?: number;
    response?: unknown;
    error?: string;
}
