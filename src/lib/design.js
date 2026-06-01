import { TEMPLATE_COLORS } from '@/shared/template.js';
export const COLOR_FIELDS = [
    { key: 'primary', label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'accent', label: 'Accent' },
    { key: 'background', label: 'Background' },
    { key: 'surface', label: 'Surface' },
    { key: 'text', label: 'Text' },
    { key: 'textSecondary', label: 'Text secondary' },
    { key: 'border', label: 'Border' },
];
/** Ensure all color keys exist (partial palettes from old saves still work). */
export function ensureColorSettings(colors, templateId = 'notion', themeMode = 'light') {
    const defaults = TEMPLATE_COLORS[templateId][themeMode];
    return {
        primary: colors?.primary ?? defaults.primary,
        secondary: colors?.secondary ?? defaults.secondary,
        accent: colors?.accent ?? defaults.accent,
        background: colors?.background ?? defaults.background,
        surface: colors?.surface ?? defaults.surface,
        text: colors?.text ?? defaults.text,
        textSecondary: colors?.textSecondary ?? defaults.textSecondary,
        border: colors?.border ?? defaults.border,
    };
}
/** Stable key so preview remounts when palette changes. */
export function designColorKey(design) {
    const c = design.colors;
    return [
        c.primary,
        c.secondary,
        c.accent,
        c.background,
        c.surface,
        c.text,
        c.textSecondary,
        c.border,
        design.borderShadow.borderRadius,
        design.borderShadow.shadowIntensity,
    ].join('|');
}
