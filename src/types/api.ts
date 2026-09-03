/**
 * Shared API types used throughout the portal.
 */

/** Shape of every API call result stored in component state. */
export interface ApiResult {
    method: string;
    url: string;
    status?: number;
    response?: unknown;
    error?: string;
}
