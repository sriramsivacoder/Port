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
    { value: 'fade', label: 'Fade In' },
    { value: 'slide', label: 'Slide Up' },
    { value: 'scale', label: 'Scale In' },
    { value: 'none', label: 'None' },
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
};
export const TEMPLATE_IDS = ['notion', 'minimal', 'developer', 'modern', 'creative'];
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
    { id: 'resume', label: 'Upload Resume', description: 'Upload your resume to get started' },
    { id: 'github', label: 'GitHub', description: 'Connect your GitHub profile' },
    { id: 'linkedin', label: 'LinkedIn', description: 'Add your LinkedIn profile' },
    { id: 'processing', label: 'Generating', description: 'AI is building your portfolio' },
];
// ---- Auto-save ----
export const AUTOSAVE_DEBOUNCE_MS = 2000;
