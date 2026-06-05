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
export function normalizeAnimation(animation = {}, index = 0) {
    const duration = animation.duration ?? 650;
    const delay = animation.delay ?? index * 60;
    return {
        type: animation.type === 'slide' ? 'rise' : animation.type ?? 'rise',
        duration: duration > 10 ? duration : duration * 1000,
        delay: delay > 10 ? delay : delay * 1000,
        distance: animation.distance ?? 28,
        easing: animation.easing ?? 'smooth',
        repeatOnScroll: animation.repeatOnScroll ?? false,
    };
}
export function getAnimationVariants(type, distance = 28) {
    switch (type) {
        case 'rise':
            return {
                hidden: { opacity: 0, y: distance },
                visible: { opacity: 1, y: 0 },
            };
        case 'drop':
            return {
                hidden: { opacity: 0, y: -distance },
                visible: { opacity: 1, y: 0 },
            };
        case 'slideLeft':
            return {
                hidden: { opacity: 0, x: distance },
                visible: { opacity: 1, x: 0 },
            };
        case 'slideRight':
            return {
                hidden: { opacity: 0, x: -distance },
                visible: { opacity: 1, x: 0 },
            };
        case 'scale':
            return {
                hidden: { opacity: 0, scale: 0.92 },
                visible: { opacity: 1, scale: 1 },
            };
        case 'zoomBlur':
            return {
                hidden: { opacity: 0, scale: 0.9, filter: 'blur(12px)' },
                visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
            };
        case 'flip':
            return {
                hidden: { opacity: 0, rotateX: -18, y: distance / 2 },
                visible: { opacity: 1, rotateX: 0, y: 0 },
            };
        case 'tilt':
            return {
                hidden: { opacity: 0, rotate: -3, y: distance },
                visible: { opacity: 1, rotate: 0, y: 0 },
            };
        case 'clip':
            return {
                hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
                visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
            };
        case 'blur':
            return {
                hidden: { opacity: 0, filter: 'blur(16px)' },
                visible: { opacity: 1, filter: 'blur(0px)' },
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
export function getAnimationEase(easing) {
    switch (easing) {
        case 'spring':
            return [0.34, 1.56, 0.64, 1];
        case 'snappy':
            return [0.16, 1, 0.3, 1];
        case 'luxury':
            return [0.83, 0, 0.17, 1];
        default:
            return [0.22, 1, 0.36, 1];
    }
}
