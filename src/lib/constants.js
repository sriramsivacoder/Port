// ---- Section Definitions ----
export const SECTION_LABELS = {
    hero: 'Hero',
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    education: 'Education',
    certifications: 'Certifications',
    contact: 'Contact',
};
export const SECTION_ICONS = {
    hero: 'Sparkles',
    about: 'User',
    skills: 'Wrench',
    experience: 'Briefcase',
    projects: 'FolderOpen',
    education: 'GraduationCap',
    certifications: 'Award',
    contact: 'Mail',
};
export const DEFAULT_SECTION_ORDER = [
    'hero',
    'about',
    'skills',
    'experience',
    'projects',
    'education',
    'certifications',
    'contact',
];
// ---- Animation Options ----
export const ANIMATION_OPTIONS = [
    { value: 'fade', label: 'Fade', category: 'Soft' },
    { value: 'rise', label: 'Rise Up', category: 'Soft' },
    { value: 'drop', label: 'Drop In', category: 'Soft' },
    { value: 'slideLeft', label: 'Slide Left', category: 'Directional' },
    { value: 'slideRight', label: 'Slide Right', category: 'Directional' },
    { value: 'scale', label: 'Scale Pop', category: 'Depth' },
    { value: 'zoomBlur', label: 'Zoom Blur', category: 'Depth' },
    { value: 'flip', label: '3D Flip', category: 'Kinetic' },
    { value: 'tilt', label: 'Tilt Reveal', category: 'Kinetic' },
    { value: 'clip', label: 'Mask Reveal', category: 'Editorial' },
    { value: 'blur', label: 'Focus In', category: 'Editorial' },
    { value: 'none', label: 'None', category: 'None' },
];
export const ANIMATION_EASING_OPTIONS = [
    { value: 'smooth', label: 'Smooth' },
    { value: 'spring', label: 'Spring' },
    { value: 'snappy', label: 'Snappy' },
    { value: 'luxury', label: 'Luxury' },
];
export const ANIMATION_PRESETS = [
    {
        id: 'polished',
        name: 'Polished Flow',
        description: 'Soft rise with subtle cascading delays.',
        animation: { type: 'rise', duration: 650, delay: 0, distance: 28, easing: 'smooth', repeatOnScroll: false },
    },
    {
        id: 'kinetic',
        name: 'Kinetic Studio',
        description: 'Bolder motion with alternating slide energy.',
        animation: { type: 'slideLeft', duration: 720, delay: 0, distance: 44, easing: 'snappy', repeatOnScroll: false },
    },
    {
        id: 'editorial',
        name: 'Editorial Reveal',
        description: 'Masked section reveals with premium pacing.',
        animation: { type: 'clip', duration: 820, delay: 0, distance: 32, easing: 'luxury', repeatOnScroll: false },
    },
    {
        id: 'depth',
        name: 'Depth Stack',
        description: 'Zoom and blur for modern portfolio sections.',
        animation: { type: 'zoomBlur', duration: 760, delay: 0, distance: 26, easing: 'smooth', repeatOnScroll: false },
    },
];
// ---- Template Definitions ----
export const TEMPLATE_INFO = {
    notion: {
        name: 'Notion',
        description: 'Clean, blocky layout inspired by Notion. Monochrome with blue accents.',
        category: 'Minimal',
    },
    minimal: {
        name: 'Minimal',
        description: 'Maximum whitespace with thin typography and floating cards.',
        category: 'Minimal',
    },
    developer: {
        name: 'Developer',
        description: 'Terminal-inspired with monospace headings and green accents.',
        category: 'Professional',
    },
    modern: {
        name: 'Modern Professional',
        description: 'Bold headings with gradient accents and card-based layout.',
        category: 'Professional',
    },
    creative: {
        name: 'Creative Portfolio',
        description: 'Asymmetric grids with serif headings and warm amber accents.',
        category: 'Creative',
    },
    editorial: {
        name: 'Editorial Split',
        description: 'Magazine-like spacing, refined contrast, and structured content flow.',
        category: 'Creative',
    },
    neon: {
        name: 'Neon Lab',
        description: 'High-contrast tech style with vivid cyan accents and sharp panels.',
        category: 'Developer',
    },
    executive: {
        name: 'Executive Brief',
        description: 'Premium resume-style portfolio with quiet luxury and dense readability.',
        category: 'Professional',
    },
};
export const TEMPLATE_IDS = ['notion', 'minimal', 'developer', 'modern', 'creative', 'editorial', 'neon', 'executive'];
// ---- Font Options ----
export const HEADING_FONT_OPTIONS = [
    { value: "'Inter', sans-serif", label: 'Inter' },
    { value: "'Outfit', sans-serif", label: 'Outfit' },
    { value: "'JetBrains Mono', monospace", label: 'JetBrains Mono' },
    { value: "'Playfair Display', serif", label: 'Playfair Display' },
];
export const BODY_FONT_OPTIONS = [
    { value: "'Inter', sans-serif", label: 'Inter' },
    { value: "'Outfit', sans-serif", label: 'Outfit' },
];
export const DEVICE_DIMENSIONS = {
    desktop: { width: 1280, height: 800 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 812 },
};
// ---- File Upload ----
export const ACCEPTED_RESUME_TYPES = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};
export const MAX_RESUME_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
// ---- Wizard Steps ----
export const WIZARD_STEPS = [
    { id: 'resume', label: 'Resume', description: 'Upload a resume or start from other sources' },
    { id: 'github', label: 'GitHub', description: 'Connect your GitHub profile' },
    { id: 'linkedin', label: 'LinkedIn', description: 'Add your LinkedIn profile' },
    { id: 'processing', label: 'Generating', description: 'Building your portfolio' },
];
// ---- Auto-save ----
export const AUTOSAVE_DEBOUNCE_MS = 2000;
