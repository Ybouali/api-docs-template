/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { siteConfig } from '../config/site';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
    theme: ThemeMode;
    resolved: 'light' | 'dark';
    setTheme: (mode: ThemeMode) => void;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemDark(): boolean {
    return Boolean(window.matchMedia?.('(prefers-color-scheme: dark)').matches);
}

function applyDom(resolved: 'light' | 'dark') {
    const root = document.documentElement;
    root.classList.toggle('dark', resolved === 'dark');
    root.style.colorScheme = resolved;
    root.style.setProperty('--font-sans', siteConfig.branding.fontFamily);
    root.style.setProperty('--color-brand-600', siteConfig.branding.primaryColor);
    root.style.setProperty('--color-accent-500', siteConfig.branding.secondaryColor);
    root.style.setProperty('--color-success', siteConfig.branding.successColor);
    root.style.setProperty('--color-error', siteConfig.branding.errorColor);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ThemeMode>(() => {
        const stored =
            typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function'
                ? localStorage.getItem(siteConfig.storage.themeName)
                : null;
        if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
        return siteConfig.branding.defaultTheme;
    });

    const resolved: 'light' | 'dark' =
        theme === 'system' ? (getSystemDark() ? 'dark' : 'light') : theme;

    useEffect(() => {
        applyDom(resolved);
        localStorage.setItem?.(siteConfig.storage.themeName, theme);
    }, [theme, resolved]);

    useEffect(() => {
        const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
        if (!mq) return;
        const onChange = () => {
            if (theme === 'system') applyDom(mq.matches ? 'dark' : 'light');
        };
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            resolved,
            setTheme: setThemeState,
            toggle: () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
        }),
        [theme, resolved],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
