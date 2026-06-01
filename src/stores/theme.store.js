import { create } from 'zustand';
function getSystemTheme() {
    if (typeof window === 'undefined')
        return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function resolveTheme(mode) {
    return mode === 'auto' ? getSystemTheme() : mode;
}
function applyTheme(resolved) {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
}
export const useThemeStore = create()((set) => {
    // Read saved preference or default to light
    const saved = (typeof localStorage !== 'undefined'
        ? localStorage.getItem('pf_theme')
        : null);
    const mode = saved ?? 'light';
    const resolved = resolveTheme(mode);
    // Apply on init
    if (typeof document !== 'undefined') {
        applyTheme(resolved);
    }
    // Listen for system theme changes
    if (typeof window !== 'undefined') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            const current = useThemeStore.getState();
            if (current.mode === 'auto') {
                const newResolved = getSystemTheme();
                applyTheme(newResolved);
                set({ resolvedTheme: newResolved });
            }
        });
    }
    return {
        mode,
        resolvedTheme: resolved,
        setMode: (newMode) => {
            const newResolved = resolveTheme(newMode);
            localStorage.setItem('pf_theme', newMode);
            applyTheme(newResolved);
            set({ mode: newMode, resolvedTheme: newResolved });
        },
    };
});
