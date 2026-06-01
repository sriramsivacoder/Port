import { motion } from 'motion/react';
import { designColorKey } from '@/lib/design';
import { designToCssVars, getAnimationVariants } from './utils';
import { HeroSection } from './sections/HeroSection';
import { AboutSection, SkillsSection, ExperienceSection, ProjectsSection, EducationSection, CertificationsSection, ContactSection, } from './sections/ContentSections';
import { NotionTemplate, MinimalTemplate, DeveloperTemplate, ModernTemplate, CreativeTemplate, } from './layouts/index';
const LAYOUTS = {
    notion: NotionTemplate,
    minimal: MinimalTemplate,
    developer: DeveloperTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate,
};
function renderSection(section, props) {
    const common = {
        animation: section.animation,
        editable: props.editable,
        onContentChange: props.onContentChange,
        content: props.content,
        profileImageUrl: props.profileImageUrl,
    };
    switch (section.type) {
        case 'hero':
            return <HeroSection key={section.id} {...common}/>;
        case 'about':
            return <AboutSection key={section.id} {...common}/>;
        case 'skills':
            return <SkillsSection key={section.id} {...common}/>;
        case 'experience':
            return <ExperienceSection key={section.id} {...common}/>;
        case 'projects':
            return <ProjectsSection key={section.id} {...common}/>;
        case 'education':
            return <EducationSection key={section.id} {...common}/>;
        case 'certifications':
            return <CertificationsSection key={section.id} {...common}/>;
        case 'contact':
            return <ContactSection key={section.id} {...common}/>;
        default:
            return null;
    }
}
export function TemplateEngine({ content, design, sections, templateId, themeMode = 'light', profileImageUrl, editable = false, onContentChange, }) {
    const Layout = LAYOUTS[templateId] ?? LAYOUTS.minimal;
    const cssVars = designToCssVars(design);
    const previewKey = designColorKey(design);
    const { colors, typography } = design;
    const visibleSections = [...sections]
        .filter((s) => s.visible)
        .sort((a, b) => a.order - b.order);
    const isDark = themeMode === 'dark' ||
        (themeMode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    return (<div key={previewKey} className={`pf-portfolio min-h-full ${isDark ? 'pf-dark' : ''}`} style={{
            ...cssVars,
            backgroundColor: colors.background,
            color: colors.text,
            fontFamily: typography.bodyFont,
            fontSize: `${typography.baseSize}px`,
            lineHeight: typography.lineHeight,
        }}>
      <Layout>
        {visibleSections.map((section) => {
            const variants = getAnimationVariants(section.animation.type);
            const duration = (section.animation.duration ?? 500) / 1000;
            const delay = (section.animation.delay ?? 0) / 1000;
            return (<motion.div key={section.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={variants} transition={{ duration, delay, ease: 'easeOut' }}>
              {renderSection(section, {
                    content,
                    design,
                    profileImageUrl,
                    editable,
                    onContentChange,
                })}
            </motion.div>);
        })}
      </Layout>
    </div>);
}
