import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, config } from './config';
import { ThemeProvider } from './theme/ThemeProvider';
import './index.css';
import App from './App.tsx';

const basename =
    config.deployment.basePath === '/' ? undefined : config.deployment.basePath;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider>
            <ThemeProvider>
                <BrowserRouter basename={basename}>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </ConfigProvider>
    </StrictMode>,
);
