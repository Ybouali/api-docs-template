import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    // For gh-pages branch deployment – this makes assets load from /api-docs-template/assets/...
    base: '/api-docs-template/', 
    plugins: [react(), tailwindcss()],
});
