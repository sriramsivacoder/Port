// ============================================================================
// Template Registry — Single source of truth for all template families
// ============================================================================

// ---- Template Family Definitions ----
export const TEMPLATE_FAMILIES = [
  {
    id: 'developer',
    name: 'Software Developer',
    description: 'Recruiter-focused, technical credibility, project-centric',
    icon: 'Code2',
    targetAudience: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'Mobile Developer', 'AI Engineer'],
    designGoals: ['recruiter-focused', 'technical-credibility', 'fast-loading'],
    animationLevel: 'low',
  },
  {
    id: 'student',
    name: 'Student',
    description: 'Showcase potential, highlight projects and achievements',
    icon: 'GraduationCap',
    targetAudience: ['College Student', 'Fresher', 'Internship Seeker'],
    designGoals: ['showcase-potential', 'highlight-projects', 'placement-ready'],
    animationLevel: 'medium',
  },
  {
    id: 'uiux-designer',
    name: 'UI/UX Designer',
    description: 'Case-study focused, design thinking showcase',
    icon: 'Figma',
    targetAudience: ['Product Designer', 'UI Designer', 'UX Designer', 'UX Researcher'],
    designGoals: ['showcase-design-thinking', 'case-study-focused', 'visual-first'],
    animationLevel: 'medium-high',
  },
  {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    description: 'Portfolio-first, artwork-focused visual storytelling',
    icon: 'Palette',
    targetAudience: ['Brand Designer', 'Illustrator', 'Visual Designer', 'Art Director'],
    designGoals: ['portfolio-first', 'artwork-focused', 'visual-storytelling'],
    animationLevel: 'medium',
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'Client conversion focused with trust-building elements',
    icon: 'Briefcase',
    targetAudience: ['Web Developer', 'Designer', 'Consultant', 'Marketing Professional'],
    designGoals: ['client-conversion', 'trust-building', 'professional'],
    animationLevel: 'low',
  },
  {
    id: 'founder',
    name: 'Startup Founder',
    description: 'Personal branding and authority building',
    icon: 'Rocket',
    targetAudience: ['Founder', 'Entrepreneur', 'Startup Leader', 'CEO', 'CTO'],
    designGoals: ['personal-branding', 'authority-building', 'executive-presence'],
    animationLevel: 'low',
  },
  {
    id: 'photographer',
    name: 'Photographer',
    description: 'Image-first experience with gallery-focused layouts',
    icon: 'Camera',
    targetAudience: ['Photographer', 'Visual Artist', 'Cinematographer'],
    designGoals: ['image-first', 'gallery-focused', 'minimal-text'],
    animationLevel: 'medium',
  },
  {
    id: 'content-creator',
    name: 'Content Creator',
    description: 'Audience growth and content discovery',
    icon: 'Play',
    targetAudience: ['YouTuber', 'Blogger', 'Influencer', 'Podcaster', 'Streamer'],
    designGoals: ['audience-growth', 'content-discovery', 'media-focused'],
    animationLevel: 'medium',
  },
  {
    id: 'researcher',
    name: 'Researcher',
    description: 'Professional credibility with academic rigor',
    icon: 'BookOpen',
    targetAudience: ['Researcher', 'Professor', 'Academic', 'Scientist', 'PhD Student'],
    designGoals: ['professional-credibility', 'publication-focused', 'academic-rigor'],
    animationLevel: 'very-low',
  },
  {
    id: 'hybrid',
    name: 'Hybrid Professional',
    description: 'Dynamic composition for multi-category profiles',
    icon: 'Layers',
    targetAudience: ['Developer + Designer', 'Developer + Founder', 'Researcher + Entrepreneur', 'Student + Content Creator'],
    designGoals: ['dynamic-composition', 'visual-consistency', 'multi-category'],
    animationLevel: 'medium',
  },
];

// ---- All Template Variant Configurations ----
export const TEMPLATE_REGISTRY = {
  // ===================== DEVELOPER FAMILY =====================
  'dev-terminal': {
    id: 'dev-terminal',
    family: 'developer',
    name: 'Terminal',
    description: 'GitHub-inspired with contribution graphs and monospace headings.',
    animationLevel: 'low',
    defaultSections: ['hero', 'about', 'github-stats', 'tech-stack', 'projects', 'experience', 'education', 'contact'],
    sectionOverrides: {
      skills: 'tech-stack',
      hero: 'terminal',
    },
    colors: {
      light: {
        primary: '#24292E', secondary: '#586069', accent: '#22C55E',
        background: '#FFFFFF', surface: '#F6F8FA', text: '#24292E',
        textSecondary: '#586069', border: '#E1E4E8',
      },
      dark: {
        primary: '#C9D1D9', secondary: '#8B949E', accent: '#4ADE80',
        background: '#0D1117', surface: '#161B22', text: '#C9D1D9',
        textSecondary: '#8B949E', border: '#30363D',
      },
    },
    typography: {
      headingFont: "'JetBrains Mono', monospace",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 15,
      lineHeight: 1.65, letterSpacing: 0,
    },
    spacing: { sectionPadding: 64, contentMaxWidth: 960, cardGap: 24 },
    borderShadow: { borderRadius: 8, borderWidth: 1, shadowIntensity: 'medium' },
  },

  'dev-minimal': {
    id: 'dev-minimal',
    family: 'developer',
    name: 'Clean Code',
    description: 'Clean single-column with code-block-inspired dividers.',
    animationLevel: 'low',
    defaultSections: ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact'],
    sectionOverrides: {},
    colors: {
      light: {
        primary: '#1E293B', secondary: '#64748B', accent: '#3B82F6',
        background: '#FAFAFA', surface: '#FFFFFF', text: '#1E293B',
        textSecondary: '#64748B', border: '#E2E8F0',
      },
      dark: {
        primary: '#F1F5F9', secondary: '#94A3B8', accent: '#60A5FA',
        background: '#0F172A', surface: '#1E293B', text: '#F1F5F9',
        textSecondary: '#94A3B8', border: '#334155',
      },
    },
    typography: {
      headingFont: "'Inter', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.6, letterSpacing: -0.01,
    },
    spacing: { sectionPadding: 64, contentMaxWidth: 960, cardGap: 24 },
    borderShadow: { borderRadius: 12, borderWidth: 1, shadowIntensity: 'subtle' },
  },

  // ===================== STUDENT FAMILY =====================
  'student-modern': {
    id: 'student-modern',
    family: 'student',
    name: 'Campus Modern',
    description: 'Card-based layout with floating achievement badges.',
    animationLevel: 'medium',
    defaultSections: ['hero', 'about', 'skills', 'projects', 'education', 'experience', 'certifications', 'timeline', 'contact'],
    sectionOverrides: {
      hero: 'minimal-centered',
    },
    colors: {
      light: {
        primary: '#1E1B4B', secondary: '#6366F1', accent: '#8B5CF6',
        background: '#FAFAFE', surface: '#FFFFFF', text: '#1E1B4B',
        textSecondary: '#6B7280', border: '#E5E7EB',
      },
      dark: {
        primary: '#E0E7FF', secondary: '#A5B4FC', accent: '#A78BFA',
        background: '#0F0D1A', surface: '#1E1B2E', text: '#E0E7FF',
        textSecondary: '#9CA3AF', border: '#374151',
      },
    },
    typography: {
      headingFont: "'Outfit', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.65, letterSpacing: -0.01,
    },
    spacing: { sectionPadding: 56, contentMaxWidth: 980, cardGap: 20 },
    borderShadow: { borderRadius: 16, borderWidth: 1, shadowIntensity: 'medium' },
  },

  'student-campus': {
    id: 'student-campus',
    family: 'student',
    name: 'Campus Fresh',
    description: 'Timeline spine with alternating content panels.',
    animationLevel: 'medium',
    defaultSections: ['hero', 'about', 'education', 'skills', 'projects', 'experience', 'certifications', 'contact'],
    sectionOverrides: {
      hero: 'split',
    },
    colors: {
      light: {
        primary: '#0F172A', secondary: '#475569', accent: '#06B6D4',
        background: '#F8FFFE', surface: '#FFFFFF', text: '#0F172A',
        textSecondary: '#64748B', border: '#E2E8F0',
      },
      dark: {
        primary: '#F0FDFA', secondary: '#94A3B8', accent: '#22D3EE',
        background: '#0A1628', surface: '#152238', text: '#F0FDFA',
        textSecondary: '#94A3B8', border: '#1E3A5F',
      },
    },
    typography: {
      headingFont: "'Outfit', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 600, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.7, letterSpacing: 0,
    },
    spacing: { sectionPadding: 56, contentMaxWidth: 1000, cardGap: 22 },
    borderShadow: { borderRadius: 14, borderWidth: 1, shadowIntensity: 'medium' },
  },

  // ===================== UI/UX DESIGNER FAMILY =====================
  'designer-casestudy': {
    id: 'designer-casestudy',
    family: 'uiux-designer',
    name: 'Case Study',
    description: 'Full-width hero, case study cards, design process flow.',
    animationLevel: 'medium-high',
    defaultSections: ['hero', 'about', 'case-studies', 'skills', 'experience', 'projects', 'contact'],
    sectionOverrides: {
      hero: 'fullscreen',
    },
    colors: {
      light: {
        primary: '#18181B', secondary: '#71717A', accent: '#EC4899',
        background: '#FAFAFA', surface: '#FFFFFF', text: '#18181B',
        textSecondary: '#71717A', border: '#E4E4E7',
      },
      dark: {
        primary: '#FAFAFA', secondary: '#A1A1AA', accent: '#F472B6',
        background: '#09090B', surface: '#18181B', text: '#FAFAFA',
        textSecondary: '#A1A1AA', border: '#27272A',
      },
    },
    typography: {
      headingFont: "'DM Sans', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.65, letterSpacing: -0.02,
    },
    spacing: { sectionPadding: 80, contentMaxWidth: 1100, cardGap: 28 },
    borderShadow: { borderRadius: 20, borderWidth: 0, shadowIntensity: 'medium' },
  },

  'designer-showcase': {
    id: 'designer-showcase',
    family: 'uiux-designer',
    name: 'Showcase',
    description: 'Grid-based with overlapping elements and bold typography.',
    animationLevel: 'medium-high',
    defaultSections: ['hero', 'about', 'projects', 'case-studies', 'skills', 'experience', 'contact'],
    sectionOverrides: {
      hero: 'split',
    },
    colors: {
      light: {
        primary: '#1C1917', secondary: '#78716C', accent: '#F97316',
        background: '#FFFBF5', surface: '#FFFFFF', text: '#1C1917',
        textSecondary: '#78716C', border: '#F5E6D3',
      },
      dark: {
        primary: '#FAFAF9', secondary: '#A8A29E', accent: '#FB923C',
        background: '#1C1917', surface: '#292524', text: '#FAFAF9',
        textSecondary: '#A8A29E', border: '#44403C',
      },
    },
    typography: {
      headingFont: "'Space Grotesk', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.6, letterSpacing: -0.01,
    },
    spacing: { sectionPadding: 72, contentMaxWidth: 1100, cardGap: 24 },
    borderShadow: { borderRadius: 16, borderWidth: 1, shadowIntensity: 'subtle' },
  },

  // ===================== GRAPHIC DESIGNER FAMILY =====================
  'graphic-masonry': {
    id: 'graphic-masonry',
    family: 'graphic-designer',
    name: 'Masonry Grid',
    description: 'Masonry gallery layout with minimal text and full-bleed images.',
    animationLevel: 'medium',
    defaultSections: ['hero', 'gallery', 'about', 'projects', 'skills', 'contact'],
    sectionOverrides: {
      hero: 'gallery-hero',
    },
    colors: {
      light: {
        primary: '#1A1A1A', secondary: '#737373', accent: '#171717',
        background: '#FFFFFF', surface: '#FAFAFA', text: '#1A1A1A',
        textSecondary: '#737373', border: '#E5E5E5',
      },
      dark: {
        primary: '#FAFAFA', secondary: '#A3A3A3', accent: '#FAFAFA',
        background: '#0A0A0A', surface: '#171717', text: '#FAFAFA',
        textSecondary: '#A3A3A3', border: '#262626',
      },
    },
    typography: {
      headingFont: "'Playfair Display', serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.7, letterSpacing: 0,
    },
    spacing: { sectionPadding: 48, contentMaxWidth: 1200, cardGap: 16 },
    borderShadow: { borderRadius: 4, borderWidth: 0, shadowIntensity: 'none' },
  },

  'graphic-spotlight': {
    id: 'graphic-spotlight',
    family: 'graphic-designer',
    name: 'Spotlight',
    description: 'Single-column with full-bleed artwork sections and gold accents.',
    animationLevel: 'medium',
    defaultSections: ['hero', 'gallery', 'about', 'projects', 'experience', 'contact'],
    sectionOverrides: {
      hero: 'fullscreen',
    },
    colors: {
      light: {
        primary: '#1C1917', secondary: '#57534E', accent: '#D97706',
        background: '#FFFDF7', surface: '#FFFFFF', text: '#1C1917',
        textSecondary: '#57534E', border: '#E7E5E4',
      },
      dark: {
        primary: '#FAFAF9', secondary: '#D6D3D1', accent: '#FBBF24',
        background: '#1C1917', surface: '#292524', text: '#F5F5F4',
        textSecondary: '#A8A29E', border: '#44403C',
      },
    },
    typography: {
      headingFont: "'Syne', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 17,
      lineHeight: 1.7, letterSpacing: 0,
    },
    spacing: { sectionPadding: 64, contentMaxWidth: 1100, cardGap: 20 },
    borderShadow: { borderRadius: 8, borderWidth: 0, shadowIntensity: 'subtle' },
  },

  // ===================== FREELANCER FAMILY =====================
  'freelancer-convert': {
    id: 'freelancer-convert',
    family: 'freelancer',
    name: 'Conversion Pro',
    description: 'CTA-heavy layout optimized for client acquisition.',
    animationLevel: 'low',
    defaultSections: ['hero', 'about', 'services', 'projects', 'testimonials', 'social-proof', 'skills', 'contact'],
    sectionOverrides: {
      hero: 'split',
    },
    colors: {
      light: {
        primary: '#0F172A', secondary: '#475569', accent: '#0EA5E9',
        background: '#FAFBFC', surface: '#FFFFFF', text: '#0F172A',
        textSecondary: '#64748B', border: '#E2E8F0',
      },
      dark: {
        primary: '#F1F5F9', secondary: '#94A3B8', accent: '#38BDF8',
        background: '#020617', surface: '#0F172A', text: '#F1F5F9',
        textSecondary: '#94A3B8', border: '#1E293B',
      },
    },
    typography: {
      headingFont: "'Inter', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.6, letterSpacing: -0.01,
    },
    spacing: { sectionPadding: 72, contentMaxWidth: 1060, cardGap: 24 },
    borderShadow: { borderRadius: 12, borderWidth: 1, shadowIntensity: 'medium' },
  },

  'freelancer-agency': {
    id: 'freelancer-agency',
    family: 'freelancer',
    name: 'Agency',
    description: 'Professional services-first layout with sidebar contact.',
    animationLevel: 'low',
    defaultSections: ['hero', 'services', 'about', 'projects', 'testimonials', 'experience', 'skills', 'contact'],
    sectionOverrides: {},
    colors: {
      light: {
        primary: '#0D3B66', secondary: '#5B8BA0', accent: '#14B8A6',
        background: '#FAFCFE', surface: '#FFFFFF', text: '#0D3B66',
        textSecondary: '#5B8BA0', border: '#D8E6EF',
      },
      dark: {
        primary: '#E0F2FE', secondary: '#7DD3FC', accent: '#2DD4BF',
        background: '#0A1929', surface: '#132F4C', text: '#E0F2FE',
        textSecondary: '#7DD3FC', border: '#1E3A5F',
      },
    },
    typography: {
      headingFont: "'Outfit', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 600, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.65, letterSpacing: 0,
    },
    spacing: { sectionPadding: 64, contentMaxWidth: 1060, cardGap: 22 },
    borderShadow: { borderRadius: 10, borderWidth: 1, shadowIntensity: 'subtle' },
  },

  // ===================== FOUNDER FAMILY =====================
  'founder-executive': {
    id: 'founder-executive',
    family: 'founder',
    name: 'Executive',
    description: 'Premium corporate with sidebar metrics and navy palette.',
    animationLevel: 'low',
    defaultSections: ['hero', 'about', 'timeline', 'social-proof', 'experience', 'projects', 'skills', 'contact'],
    sectionOverrides: {
      hero: 'minimal-centered',
    },
    colors: {
      light: {
        primary: '#1E3A5F', secondary: '#64748B', accent: '#1E3A5F',
        background: '#FAFBFC', surface: '#FFFFFF', text: '#1E293B',
        textSecondary: '#64748B', border: '#D1D5DB',
      },
      dark: {
        primary: '#F1F5F9', secondary: '#CBD5E1', accent: '#93C5FD',
        background: '#0F172A', surface: '#1E293B', text: '#F1F5F9',
        textSecondary: '#CBD5E1', border: '#334155',
      },
    },
    typography: {
      headingFont: "'Outfit', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.65, letterSpacing: 0,
    },
    spacing: { sectionPadding: 64, contentMaxWidth: 1040, cardGap: 18 },
    borderShadow: { borderRadius: 6, borderWidth: 1, shadowIntensity: 'subtle' },
  },

  'founder-timeline': {
    id: 'founder-timeline',
    family: 'founder',
    name: 'Visionary',
    description: 'Vertical timeline spine with milestone markers and authority design.',
    animationLevel: 'low',
    defaultSections: ['hero', 'about', 'timeline', 'experience', 'projects', 'social-proof', 'skills', 'contact'],
    sectionOverrides: {},
    colors: {
      light: {
        primary: '#3B0764', secondary: '#6B21A8', accent: '#7C3AED',
        background: '#FAF5FF', surface: '#FFFFFF', text: '#1C1917',
        textSecondary: '#6B7280', border: '#E9D5FF',
      },
      dark: {
        primary: '#F3E8FF', secondary: '#C084FC', accent: '#A78BFA',
        background: '#0C0A1A', surface: '#1E1B2E', text: '#F3E8FF',
        textSecondary: '#A78BFA', border: '#3B0764',
      },
    },
    typography: {
      headingFont: "'Playfair Display', serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 17,
      lineHeight: 1.7, letterSpacing: 0,
    },
    spacing: { sectionPadding: 72, contentMaxWidth: 1060, cardGap: 24 },
    borderShadow: { borderRadius: 12, borderWidth: 1, shadowIntensity: 'medium' },
  },

  // ===================== PHOTOGRAPHER FAMILY =====================
  'photo-gallery': {
    id: 'photo-gallery',
    family: 'photographer',
    name: 'Gallery',
    description: 'Full-width zero-padding gallery grid, image-first.',
    animationLevel: 'medium',
    defaultSections: ['hero', 'gallery', 'about', 'projects', 'contact'],
    sectionOverrides: {
      hero: 'gallery-hero',
    },
    colors: {
      light: {
        primary: '#18181B', secondary: '#71717A', accent: '#18181B',
        background: '#FFFFFF', surface: '#F4F4F5', text: '#18181B',
        textSecondary: '#71717A', border: '#E4E4E7',
      },
      dark: {
        primary: '#FAFAFA', secondary: '#A1A1AA', accent: '#FFFFFF',
        background: '#09090B', surface: '#18181B', text: '#FAFAFA',
        textSecondary: '#A1A1AA', border: '#27272A',
      },
    },
    typography: {
      headingFont: "'Inter', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 300, bodyWeight: 300, baseSize: 15,
      lineHeight: 1.7, letterSpacing: 0.02,
    },
    spacing: { sectionPadding: 40, contentMaxWidth: 1400, cardGap: 8 },
    borderShadow: { borderRadius: 0, borderWidth: 0, shadowIntensity: 'none' },
  },

  'photo-story': {
    id: 'photo-story',
    family: 'photographer',
    name: 'Visual Story',
    description: 'Scroll-driven story with full-screen image sections and cinematic feel.',
    animationLevel: 'medium',
    defaultSections: ['hero', 'gallery', 'about', 'projects', 'contact'],
    sectionOverrides: {
      hero: 'fullscreen',
    },
    colors: {
      light: {
        primary: '#1C1917', secondary: '#44403C', accent: '#78716C',
        background: '#FAFAF9', surface: '#FFFFFF', text: '#1C1917',
        textSecondary: '#57534E', border: '#D6D3D1',
      },
      dark: {
        primary: '#F5F5F4', secondary: '#D6D3D1', accent: '#A8A29E',
        background: '#0C0A09', surface: '#1C1917', text: '#F5F5F4',
        textSecondary: '#A8A29E', border: '#292524',
      },
    },
    typography: {
      headingFont: "'Playfair Display', serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 400, bodyWeight: 300, baseSize: 17,
      lineHeight: 1.8, letterSpacing: 0.01,
    },
    spacing: { sectionPadding: 80, contentMaxWidth: 1200, cardGap: 12 },
    borderShadow: { borderRadius: 0, borderWidth: 0, shadowIntensity: 'none' },
  },

  // ===================== CONTENT CREATOR FAMILY =====================
  'creator-media': {
    id: 'creator-media',
    family: 'content-creator',
    name: 'Media Hub',
    description: 'Featured video hero, grid of content cards, YouTube-inspired.',
    animationLevel: 'medium',
    defaultSections: ['hero', 'about', 'media-showcase', 'projects', 'social-proof', 'skills', 'contact'],
    sectionOverrides: {
      hero: 'fullscreen',
    },
    colors: {
      light: {
        primary: '#18181B', secondary: '#71717A', accent: '#EF4444',
        background: '#FAFAFA', surface: '#FFFFFF', text: '#18181B',
        textSecondary: '#71717A', border: '#E4E4E7',
      },
      dark: {
        primary: '#FAFAFA', secondary: '#A1A1AA', accent: '#F87171',
        background: '#09090B', surface: '#18181B', text: '#FAFAFA',
        textSecondary: '#A1A1AA', border: '#27272A',
      },
    },
    typography: {
      headingFont: "'Outfit', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 800, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.6, letterSpacing: -0.02,
    },
    spacing: { sectionPadding: 64, contentMaxWidth: 1100, cardGap: 20 },
    borderShadow: { borderRadius: 16, borderWidth: 1, shadowIntensity: 'medium' },
  },

  'creator-hub': {
    id: 'creator-hub',
    family: 'content-creator',
    name: 'Creator Hub',
    description: 'Channel-style layout with category tabs and platform aesthetic.',
    animationLevel: 'medium',
    defaultSections: ['hero', 'about', 'media-showcase', 'social-proof', 'projects', 'skills', 'contact'],
    sectionOverrides: {
      hero: 'split',
    },
    colors: {
      light: {
        primary: '#1E1B4B', secondary: '#6366F1', accent: '#6366F1',
        background: '#FAFAFE', surface: '#FFFFFF', text: '#1E1B4B',
        textSecondary: '#6B7280', border: '#E5E7EB',
      },
      dark: {
        primary: '#E0E7FF', secondary: '#A5B4FC', accent: '#818CF8',
        background: '#0F0D1A', surface: '#1E1B2E', text: '#E0E7FF',
        textSecondary: '#A5B4FC', border: '#312E81',
      },
    },
    typography: {
      headingFont: "'Space Grotesk', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.6, letterSpacing: -0.01,
    },
    spacing: { sectionPadding: 64, contentMaxWidth: 1100, cardGap: 20 },
    borderShadow: { borderRadius: 14, borderWidth: 1, shadowIntensity: 'medium' },
  },

  // ===================== RESEARCHER FAMILY =====================
  'researcher-academic': {
    id: 'researcher-academic',
    family: 'researcher',
    name: 'Academic CV',
    description: 'Traditional academic CV with dense two-column publication layout.',
    animationLevel: 'very-low',
    defaultSections: ['hero', 'about', 'publications', 'experience', 'education', 'skills', 'certifications', 'contact'],
    sectionOverrides: {
      hero: 'standard',
    },
    colors: {
      light: {
        primary: '#1E3A5F', secondary: '#475569', accent: '#1E40AF',
        background: '#FAFBFC', surface: '#FFFFFF', text: '#1E293B',
        textSecondary: '#64748B', border: '#CBD5E1',
      },
      dark: {
        primary: '#DBEAFE', secondary: '#94A3B8', accent: '#60A5FA',
        background: '#0C1222', surface: '#1E293B', text: '#DBEAFE',
        textSecondary: '#94A3B8', border: '#334155',
      },
    },
    typography: {
      headingFont: "'EB Garamond', serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.7, letterSpacing: 0,
    },
    spacing: { sectionPadding: 48, contentMaxWidth: 920, cardGap: 16 },
    borderShadow: { borderRadius: 4, borderWidth: 1, shadowIntensity: 'none' },
  },

  'researcher-modern': {
    id: 'researcher-modern',
    family: 'researcher',
    name: 'Modern Scholar',
    description: 'Clean single-column with emerald accents and modern typography.',
    animationLevel: 'very-low',
    defaultSections: ['hero', 'about', 'publications', 'projects', 'experience', 'education', 'skills', 'contact'],
    sectionOverrides: {},
    colors: {
      light: {
        primary: '#064E3B', secondary: '#6B7280', accent: '#059669',
        background: '#FAFDFB', surface: '#FFFFFF', text: '#1C1917',
        textSecondary: '#6B7280', border: '#D1FAE5',
      },
      dark: {
        primary: '#D1FAE5', secondary: '#9CA3AF', accent: '#34D399',
        background: '#0C1A14', surface: '#132A20', text: '#D1FAE5',
        textSecondary: '#9CA3AF', border: '#064E3B',
      },
    },
    typography: {
      headingFont: "'Inter', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.65, letterSpacing: 0,
    },
    spacing: { sectionPadding: 56, contentMaxWidth: 960, cardGap: 20 },
    borderShadow: { borderRadius: 8, borderWidth: 1, shadowIntensity: 'subtle' },
  },

  // ===================== HYBRID FAMILY =====================
  'hybrid-flex': {
    id: 'hybrid-flex',
    family: 'hybrid',
    name: 'Flex',
    description: 'Dynamic grid that adapts based on content and professional mix.',
    animationLevel: 'medium',
    defaultSections: ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'],
    sectionOverrides: {},
    colors: {
      light: {
        primary: '#18181B', secondary: '#71717A', accent: '#7C3AED',
        background: '#FAFAFA', surface: '#FFFFFF', text: '#18181B',
        textSecondary: '#71717A', border: '#E4E4E7',
      },
      dark: {
        primary: '#FAFAFA', secondary: '#A1A1AA', accent: '#A78BFA',
        background: '#09090B', surface: '#18181B', text: '#FAFAFA',
        textSecondary: '#A1A1AA', border: '#27272A',
      },
    },
    typography: {
      headingFont: "'Inter', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: 700, bodyWeight: 400, baseSize: 16,
      lineHeight: 1.6, letterSpacing: -0.01,
    },
    spacing: { sectionPadding: 64, contentMaxWidth: 1060, cardGap: 24 },
    borderShadow: { borderRadius: 12, borderWidth: 1, shadowIntensity: 'medium' },
  },
};

// ---- Legacy Backward Compatibility ----
export const LEGACY_TEMPLATE_MAP = {
  notion: 'dev-minimal',
  minimal: 'dev-minimal',
  developer: 'dev-terminal',
  modern: 'student-modern',
  creative: 'designer-showcase',
  editorial: 'researcher-academic',
  neon: 'dev-terminal',
  executive: 'founder-executive',
};

// ---- Helper Functions ----

/** Get a template config by its ID; falls back to legacy mapping then hybrid-flex. */
export function getTemplateConfig(templateId) {
  if (TEMPLATE_REGISTRY[templateId]) {
    return TEMPLATE_REGISTRY[templateId];
  }
  const mapped = LEGACY_TEMPLATE_MAP[templateId];
  if (mapped && TEMPLATE_REGISTRY[mapped]) {
    return TEMPLATE_REGISTRY[mapped];
  }
  return TEMPLATE_REGISTRY['hybrid-flex'];
}

/** Get all template variants for a given family ID. */
export function getTemplatesByFamily(familyId) {
  return Object.values(TEMPLATE_REGISTRY).filter((t) => t.family === familyId);
}

/** Get the union of section types used by every variant in a family. */
export function getAllowedSectionTypesForFamily(familyId) {
  const familyTemplates = getTemplatesByFamily(familyId);
  return [...new Set(familyTemplates.flatMap((template) => template.defaultSections))];
}

/** Get all family definitions. */
export function getAllFamilies() {
  return TEMPLATE_FAMILIES;
}

/** Get the default section list for a template ID. */
export function getDefaultSectionsForTemplate(templateId) {
  const config = getTemplateConfig(templateId);
  return config.defaultSections;
}

/** Get all template IDs. */
export function getAllTemplateIds() {
  return Object.keys(TEMPLATE_REGISTRY);
}

/** Resolve a section type through any template-specific overrides. */
export function resolveSectionType(sectionType, templateId) {
  const config = getTemplateConfig(templateId);
  return config.sectionOverrides?.[sectionType] ?? sectionType;
}
