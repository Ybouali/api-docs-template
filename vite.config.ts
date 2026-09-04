/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import {siteConfig} from "./src/config/site"

export default defineConfig({
    base: siteConfig.deployment.basePath,
    plugins: [react(), tailwindcss()],
    test: {
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: false,
    },
});