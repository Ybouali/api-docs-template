import type { ErrorEntry } from './types';

/** Replace with your API’s error catalog. */
export const errorCatalog: ErrorEntry[] = [
    {
        code: 'unauthorized',
        httpStatus: 401,
        message: 'Invalid or missing API key.',
        description: 'Send a valid Bearer token in the Authorization header.',
    },
    {
        code: 'forbidden',
        httpStatus: 403,
        message: 'The key does not have access to this resource.',
        description: 'Use a key from the same environment and account as the resource.',
    },
    {
        code: 'not_found',
        httpStatus: 404,
        message: 'The requested resource does not exist.',
        description: 'Check the id and that it was not deleted.',
    },
    {
        code: 'validation_error',
        httpStatus: 400,
        message: 'The request body failed validation.',
        description: 'The `details` array lists field-level issues.',
    },
    {
        code: 'rate_limited',
        httpStatus: 429,
        message: 'Too many requests.',
        description: 'Respect Retry-After. Default sandbox limit is 100 requests per minute.',
    },
    {
        code: 'internal_error',
        httpStatus: 500,
        message: 'An unexpected error occurred.',
        description: 'Retry with backoff. Contact support if it persists.',
    },
];
