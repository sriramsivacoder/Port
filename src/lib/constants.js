import { TEMPLATE_REGISTRY, TEMPLATE_FAMILIES, getAllTemplateIds, getTemplateConfig } from '@/templates/templateRegistry';

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
  'github-stats': 'GitHub Stats',
  'tech-stack': 'Tech Stack',
  'case-studies': 'Case Studies',
  gallery: 'Gallery',
  services: 'Services',
  testimonials: 'Testimonials',
  publications: 'Publications',
  timeline: 'Timeline',
  'media-showcase': 'Media Showcase',
  'social-proof': 'Social Proof',
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
  'github-stats': 'Github',
  'tech-stack': 'Cpu',
  'case-studies': 'FileSearch',
  gallery: 'Image',
  services: 'Package',
  testimonials: 'Quote',
  publications: 'BookOpen',
  timeline: 'Clock',
  'media-showcase': 'Play',
  'social-proof': 'Trophy',
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

/** All available section types grouped by category. */
export const SECTION_CATEGORIES = {
  Core: ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact'],
  Developer: ['github-stats', 'tech-stack'],
  Designer: ['case-studies', 'gallery'],
  Business: ['services', 'testimonials', 'social-proof'],
  Academic: ['publications'],
  Creative: ['timeline', 'media-showcase'],
};

/** Flat array of all possible section types. */
export const ALL_SECTION_TYPES = Object.values(SECTION_CATEGORIES).flat();

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

// ---- Template Definitions (from registry) ----
// Build TEMPLATE_INFO from the registry for backward compatibility
export const TEMPLATE_INFO = {};
for (const [id, config] of Object.entries(TEMPLATE_REGISTRY)) {
  TEMPLATE_INFO[id] = {
    name: config.name,
    description: config.description,
    category: config.family,
    family: config.family,
  };
}

export const TEMPLATE_IDS = getAllTemplateIds();

/** Template families with their metadata. */
export { TEMPLATE_FAMILIES } from '@/templates/templateRegistry';

// ---- Font Options ----
export const HEADING_FONT_OPTIONS = [
  { value: "'Inter', sans-serif", label: 'Inter' },
  { value: "'Outfit', sans-serif", label: 'Outfit' },
  { value: "'JetBrains Mono', monospace", label: 'JetBrains Mono' },
  { value: "'Playfair Display', serif", label: 'Playfair Display' },
  { value: "'DM Sans', sans-serif", label: 'DM Sans' },
  { value: "'Space Grotesk', sans-serif", label: 'Space Grotesk' },
  { value: "'Syne', sans-serif", label: 'Syne' },
  { value: "'EB Garamond', serif", label: 'EB Garamond' },
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
  { id: 'template', label: 'Template', description: 'Choose your template' },
  { id: 'processing', label: 'Generating', description: 'Building your portfolio' },
];

// ---- Auto-save ----
export const AUTOSAVE_DEBOUNCE_MS = 2000;
