import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, config } from './config';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider>
            <BrowserRouter basename={config.deployment.basePath}>
                <App />
            </BrowserRouter>
        </ConfigProvider>
    </StrictMode>,
);
