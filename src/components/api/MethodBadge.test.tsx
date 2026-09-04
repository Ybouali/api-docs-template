import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MethodBadge } from './MethodBadge';

describe('MethodBadge', () => {
    it('renders the HTTP method', () => {
        render(<MethodBadge method="GET" />);
        expect(screen.getByText('GET')).toBeInTheDocument();
    });
});
