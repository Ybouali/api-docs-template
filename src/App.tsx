import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LeftSidebar from './components/LeftSidebar';
import { SearchDialog } from './components/search/SearchDialog';
import { ThemeToggle } from './components/layout/ThemeToggle';
import Home from './pages/Home';
import { MarkdownPage } from './pages/MarkdownPage';
import { GuidesPage } from './pages/GuidesPage';
import { ApiReferencePage } from './pages/ApiReferencePage';
import { ErrorsPage } from './pages/ErrorsPage';
import {
    gettingStartedPage,
    authenticationPage,
    webhooksPage,
    changelogPage,
} from './content/pages';

function App() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-lg"
            >
                Skip to content
            </a>

            {isOpen && (
                <button
                    type="button"
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    aria-label="Close navigation"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <LeftSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-72 ${
                    isOpen ? 'ml-72' : 'ml-16'
                }`}
            >
                <header className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
                    <SearchDialog />
                    <ThemeToggle />
                </header>

                <main id="main-content" className="flex-1 p-4 sm:p-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/getting-started"
                            element={<MarkdownPage page={gettingStartedPage} />}
                        />
                        <Route
                            path="/authentication"
                            element={<MarkdownPage page={authenticationPage} />}
                        />
                        <Route path="/guides" element={<GuidesPage />} />
                        <Route path="/guides/:slug" element={<GuidesPage />} />
                        <Route path="/api-reference" element={<ApiReferencePage />} />
                        <Route path="/errors" element={<ErrorsPage />} />
                        <Route
                            path="/webhooks"
                            element={<MarkdownPage page={webhooksPage} />}
                        />
                        <Route
                            path="/changelog"
                            element={<MarkdownPage page={changelogPage} />}
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;
