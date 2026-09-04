import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';
import { ConfigProvider } from './config';
import { ThemeProvider } from './theme/ThemeProvider';

function renderApp(path = '/') {
    return render(
        <ConfigProvider>
            <ThemeProvider>
                <MemoryRouter initialEntries={[path]}>
                    <App />
                </MemoryRouter>
            </ThemeProvider>
        </ConfigProvider>,
    );
}

describe('navigation', () => {
    it('renders introduction on /', () => {
        renderApp('/');
        expect(screen.getByRole('heading', { level: 1, name: /explore/i })).toBeInTheDocument();
    });

    it('sidebar links to the API reference', () => {
        renderApp('/');
        const links = screen.getAllByRole('link', { name: 'API Reference' });
        expect(links.length).toBeGreaterThan(0);
        expect(links[0]).toHaveAttribute('href', '/api-reference');
    });

    it('renders the API reference page', () => {
        renderApp('/api-reference');
        expect(
            screen.getByRole('heading', { level: 1, name: 'API Reference' }),
        ).toBeInTheDocument();
        expect(screen.getByText('List widgets')).toBeInTheDocument();
    });

    it('renders getting started content', () => {
        renderApp('/getting-started');
        expect(screen.getByRole('heading', { level: 1, name: 'Getting Started' })).toBeInTheDocument();
    });
});
