export function designToCssVars(design) {
    const { colors: rawColors, typography, spacing, borderShadow } = design;
    const colors = {
        primary: rawColors.primary ?? '#111111',
        secondary: rawColors.secondary ?? '#666666',
        accent: rawColors.accent ?? '#2563eb',
        background: rawColors.background ?? '#ffffff',
        surface: rawColors.surface ?? '#f8fafc',
        text: rawColors.text ?? '#111111',
        textSecondary: rawColors.textSecondary ?? '#666666',
        border: rawColors.border ?? '#e5e7eb',
    };
    const shadowMap = {
        none: 'none',
        subtle: '0 1px 3px rgba(0,0,0,0.04)',
        medium: '0 4px 12px rgba(0,0,0,0.08)',
        strong: '0 8px 24px rgba(0,0,0,0.12)',
    };
    return {
        '--pf-primary': colors.primary,
        '--pf-secondary': colors.secondary,
        '--pf-accent': colors.accent,
        '--pf-bg': colors.background,
        '--pf-surface': colors.surface,
        '--pf-text': colors.text,
        '--pf-text-secondary': colors.textSecondary,
        '--pf-border': colors.border,
        '--pf-heading-font': typography.headingFont,
        '--pf-body-font': typography.bodyFont,
        '--pf-heading-weight': String(typography.headingWeight),
        '--pf-body-weight': String(typography.bodyWeight),
        '--pf-base-size': `${typography.baseSize}px`,
        '--pf-line-height': String(typography.lineHeight),
        '--pf-letter-spacing': `${typography.letterSpacing}em`,
        '--pf-section-padding': `${spacing.sectionPadding}px`,
        '--pf-max-width': `${spacing.contentMaxWidth}px`,
        '--pf-card-gap': `${spacing.cardGap}px`,
        '--pf-radius': `${borderShadow.borderRadius}px`,
        '--pf-border-width': `${borderShadow.borderWidth}px`,
        '--pf-shadow': shadowMap[borderShadow.shadowIntensity],
    };
}
export function getAnimationVariants(type) {
    switch (type) {
        case 'slide':
            return {
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
            };
        case 'scale':
            return {
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
            };
        case 'fade':
            return {
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            };
        default:
            return {
                hidden: { opacity: 1 },
                visible: { opacity: 1 },
            };
    }
}
