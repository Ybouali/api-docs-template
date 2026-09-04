import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { EndpointCard } from './EndpointCard';
import type { ApiEndpoint } from '../../types/api';

const sample: ApiEndpoint = {
    id: 'ping',
    title: 'Ping',
    description: 'Health check',
    method: 'GET',
    path: '/v1/ping',
    parameters: [
        {
            name: 'verbose',
            in: 'query',
            type: 'boolean',
            required: false,
            description: 'Include extra fields',
        },
    ],
    responses: [{ status: 200, description: 'OK', example: { ok: true } }],
    examples: [{ language: 'bash', label: 'cURL', code: 'curl /v1/ping' }],
};

describe('EndpointCard', () => {
    it('renders title, method, path, and parameters from props', () => {
        render(
            <MemoryRouter>
                <EndpointCard endpoint={sample} />
            </MemoryRouter>,
        );
        expect(screen.getByRole('heading', { name: 'Ping' })).toBeInTheDocument();
        expect(screen.getByText('GET')).toBeInTheDocument();
        expect(screen.getByLabelText('Path /v1/ping')).toBeInTheDocument();
        expect(screen.getByText('verbose')).toBeInTheDocument();
        expect(screen.getByText('Health check')).toBeInTheDocument();
    });
});
