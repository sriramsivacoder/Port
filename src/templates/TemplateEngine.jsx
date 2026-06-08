import { motion } from 'motion/react';
import { designColorKey } from '@/lib/design';
import { designToCssVars, getAnimationEase, getAnimationVariants, normalizeAnimation } from './utils';
import { getTemplateConfig } from './templateRegistry';
import { TemplateContext } from './templateContext';
import { LAYOUT_MAP } from './layouts/index';

// ---- Section Components ----
import { HeroSection } from './sections/HeroSection';
import {
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  EducationSection,
  CertificationsSection,
  ContactSection,
} from './sections/ContentSections';
import { GitHubStatsSection } from './sections/GitHubStatsSection';
import { TechStackSection } from './sections/TechStackSection';
import { CaseStudySection } from './sections/CaseStudySection';
import { GallerySection } from './sections/GallerySection';
import { ServicesSection } from './sections/ServicesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { PublicationsSection } from './sections/PublicationsSection';
import { TimelineSection } from './sections/TimelineSection';
import { MediaShowcaseSection } from './sections/MediaShowcaseSection';
import { SocialProofSection } from './sections/SocialProofSection';

// ---- Section Component Map ----
const SECTION_COMPONENTS = {
  hero: HeroSection,
  about: AboutSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  education: EducationSection,
  certifications: CertificationsSection,
  contact: ContactSection,
  'github-stats': GitHubStatsSection,
  'tech-stack': TechStackSection,
  'case-studies': CaseStudySection,
  gallery: GallerySection,
  services: ServicesSection,
  testimonials: TestimonialsSection,
  publications: PublicationsSection,
  timeline: TimelineSection,
  'media-showcase': MediaShowcaseSection,
  'social-proof': SocialProofSection,
};

/**
 * Resolve the correct section component for a given section type
 * and template configuration. The template's sectionOverrides can
 * swap one section type for another (e.g., skills → tech-stack).
 */
function resolveSectionComponent(sectionType, templateConfig) {
  // Check if the template overrides this section to a different component
  const overriddenType = templateConfig?.sectionOverrides?.[sectionType];
  if (overriddenType && SECTION_COMPONENTS[overriddenType]) {
    return { Component: SECTION_COMPONENTS[overriddenType], resolvedType: overriddenType };
  }
  // Fall back to the default component for this section type
  if (SECTION_COMPONENTS[sectionType]) {
    return { Component: SECTION_COMPONENTS[sectionType], resolvedType: sectionType };
  }
  return { Component: null, resolvedType: sectionType };
}

function renderSection(section, props, templateConfig) {
  const { Component, resolvedType } = resolveSectionComponent(section.type, templateConfig);
  if (!Component) return null;

  const common = {
    animation: section.animation,
    editable: props.editable,
    onContentChange: props.onContentChange,
    content: props.content,
    profileImageUrl: props.profileImageUrl,
  };

  // For hero sections, pass the variant from the template config
  if (section.type === 'hero') {
    const heroVariant = templateConfig?.sectionOverrides?.hero ?? 'standard';
    return <Component key={section.id} {...common} variant={heroVariant} />;
  }

  return <Component key={section.id} {...common} />;
}

export function TemplateEngine({
  content,
  design,
  sections,
  templateId,
  themeMode = 'light',
  profileImageUrl,
  editable = false,
  onContentChange,
}) {
  // Resolve template configuration (supports both new and legacy IDs)
  const templateConfig = getTemplateConfig(templateId);
  const Layout = LAYOUT_MAP[templateId] ?? LAYOUT_MAP['hybrid-flex'];
  const cssVars = designToCssVars(design);
  const previewKey = designColorKey(design);
  const { colors, typography } = design;

  const visibleSections = [...sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  // Safe dark-mode detection — avoid SSR/matchMedia crash
  let isDark = false;
  if (themeMode === 'dark') {
    isDark = true;
  } else if (themeMode === 'auto') {
    try {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      isDark = false;
    }
  }

  // Template context value
  const templateCtx = {
    templateId: templateConfig.id,
    family: templateConfig.family,
    sectionOverrides: templateConfig.sectionOverrides ?? {},
  };

  const wrapperClassName = `pf-portfolio pf-template-${templateId} pf-family-${templateConfig.family} min-h-full ${isDark ? 'pf-dark' : ''}`;
  const wrapperStyle = {
    ...cssVars,
    backgroundColor: colors.background,
    color: colors.text,
    fontFamily: typography.bodyFont,
    fontSize: `${typography.baseSize}px`,
    lineHeight: typography.lineHeight,
  };

  if (visibleSections.length === 0) {
    return (
      <div key={previewKey} className={wrapperClassName} style={wrapperStyle}>
        <Layout>
          <div className="flex min-h-[40vh] items-center justify-center text-center opacity-40 py-12">
            <p style={{ color: 'var(--pf-text-secondary)' }}>No sections visible. Enable sections in the sidebar.</p>
          </div>
        </Layout>
      </div>
    );
  }

  return (
    <TemplateContext.Provider value={templateCtx}>
      <div key={previewKey} className={wrapperClassName} style={wrapperStyle}>
        <Layout>
          {visibleSections.map((section, index) => {
            const animation = normalizeAnimation(section.animation, index);
            const variants = getAnimationVariants(animation.type, animation.distance);
            const duration = animation.duration / 1000;
            const delay = animation.delay / 1000;

            return (
              <motion.div
                key={section.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: !animation.repeatOnScroll, margin: '-50px' }}
                variants={variants}
                transition={{ duration, delay, ease: getAnimationEase(animation.easing) }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {renderSection(section, {
                  content,
                  design,
                  profileImageUrl,
                  editable,
                  onContentChange,
                }, templateConfig)}
              </motion.div>
            );
          })}
        </Layout>
      </div>
    </TemplateContext.Provider>
  );
}
