import '@testing-library/jest-dom/vitest';

const store = new Map<string, string>();

const memoryStorage: Storage = {
    get length() {
        return store.size;
    },
    clear: () => store.clear(),
    getItem: (key) => store.get(key) ?? null,
    key: (index) => [...store.keys()][index] ?? null,
    removeItem: (key) => {
        store.delete(key);
    },
    setItem: (key, value) => {
        store.set(key, String(value));
    },
};

Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: memoryStorage,
});

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    }),
});
