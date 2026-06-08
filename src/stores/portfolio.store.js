import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { generateId } from '@/lib/utils';
import { SECTION_LABELS } from '@/lib/constants';
import { getTemplateConfig, getDefaultSectionsForTemplate } from '@/templates/templateRegistry';

function createDefaultDesign(templateId = 'dev-minimal') {
    const config = getTemplateConfig(templateId);
    const colors = config.colors.light;
    const typography = { ...config.typography };
    return {
        colors,
        typography,
        spacing: { ...config.spacing },
        borderShadow: { ...config.borderShadow },
        animations: {},
    };
}

function createDefaultSections(templateId = 'dev-minimal') {
    const sectionTypes = getDefaultSectionsForTemplate(templateId);
    return sectionTypes.map((type, index) => ({
        id: generateId(),
        type,
        title: SECTION_LABELS[type] ?? type,
        visible: true,
        order: index,
        animation: { type: 'rise', duration: 650, delay: index * 60, distance: 28, easing: 'smooth', repeatOnScroll: false },
    }));
}

export const usePortfolioStore = create()(immer((set) => ({
    portfolioId: null,
    content: null,
    design: createDefaultDesign(),
    sections: createDefaultSections(),
    selectedTemplate: 'dev-minimal',
    templateFamily: 'developer',
    professionalCategory: null,
    themeMode: 'light',
    profileImageUrl: null,
    isDirty: false,

    setPortfolioId: (id) => set((s) => {
        s.portfolioId = id;
    }),

    loadPortfolio: (portfolio) => set((s) => {
        s.portfolioId = portfolio._id ?? null;
        s.content = portfolio.generatedContent;
        const tplId = portfolio.selectedTemplate ?? 'dev-minimal';
        const config = getTemplateConfig(tplId);
        s.design = portfolio.designSettings ?? createDefaultDesign(tplId);
        s.sections = portfolio.sections?.length
            ? portfolio.sections
            : createDefaultSections(tplId);
        s.selectedTemplate = tplId;
        s.templateFamily = config.family;
        s.professionalCategory = portfolio.professionalCategory ?? null;
        s.themeMode = portfolio.themeMode ?? 'light';
        s.profileImageUrl = portfolio.profileImageUrl ?? null;
        s.isDirty = false;
    }),

    updateContent: (patch) => set((s) => {
        if (s.content) {
            Object.assign(s.content, patch);
            s.isDirty = true;
        }
    }),

    updateDesign: (patch) => set((s) => {
        if (!s.design) {
            s.design = createDefaultDesign(s.selectedTemplate);
        }
        if (patch.colors) {
            s.design.colors = { ...s.design.colors, ...patch.colors };
        }
        if (patch.typography) {
            s.design.typography = { ...s.design.typography, ...patch.typography };
        }
        if (patch.spacing) {
            s.design.spacing = { ...s.design.spacing, ...patch.spacing };
        }
        if (patch.borderShadow) {
            s.design.borderShadow = { ...s.design.borderShadow, ...patch.borderShadow };
        }
        if (patch.animations !== undefined) {
            s.design.animations = patch.animations;
        }
        s.isDirty = true;
    }),

    setSelectedTemplate: (template) => set((s) => {
        const config = getTemplateConfig(template);
        s.selectedTemplate = template;
        s.templateFamily = config.family;
        // Apply template default colors and typography
        s.design.colors = config.colors[s.themeMode === 'dark' ? 'dark' : 'light'];
        s.design.typography = { ...config.typography };
        s.design.spacing = { ...config.spacing };
        s.design.borderShadow = { ...config.borderShadow };
        // Update sections to match the new template's default set
        const currentTypes = new Set(s.sections.map((sec) => sec.type));
        const newDefaults = getDefaultSectionsForTemplate(template);
        // Add any new section types that this template needs but aren't present
        for (const type of newDefaults) {
            if (!currentTypes.has(type)) {
                s.sections.push({
                    id: generateId(),
                    type,
                    title: SECTION_LABELS[type] ?? type,
                    visible: true,
                    order: s.sections.length,
                    animation: { type: 'rise', duration: 650, delay: 0, distance: 28, easing: 'smooth', repeatOnScroll: false },
                });
            }
        }
        s.isDirty = true;
    }),

    setThemeMode: (mode) => set((s) => {
        s.themeMode = mode;
        const colorMode = mode === 'dark' ? 'dark' : 'light';
        const config = getTemplateConfig(s.selectedTemplate);
        s.design.colors = config.colors[colorMode];
        s.isDirty = true;
    }),

    setProfessionalCategory: (category) => set((s) => {
        s.professionalCategory = category;
    }),

    setProfileImageUrl: (url) => set((s) => {
        s.profileImageUrl = url;
        s.isDirty = true;
    }),

    reorderSections: (fromIndex, toIndex) => set((s) => {
        const item = s.sections[fromIndex];
        if (!item)
            return;
        s.sections.splice(fromIndex, 1);
        s.sections.splice(toIndex, 0, item);
        s.sections.forEach((sec, i) => {
            sec.order = i;
        });
        s.isDirty = true;
    }),

    toggleSection: (sectionId) => set((s) => {
        const sec = s.sections.find((sec) => sec.id === sectionId);
        if (sec) {
            sec.visible = !sec.visible;
            s.isDirty = true;
        }
    }),

    duplicateSection: (sectionId) => set((s) => {
        const idx = s.sections.findIndex((sec) => sec.id === sectionId);
        const original = s.sections[idx];
        if (idx !== -1 && original) {
            const dup = {
                ...original,
                id: generateId(),
                title: `${original.title} (Copy)`,
                order: idx + 1,
            };
            s.sections.splice(idx + 1, 0, dup);
            s.sections.forEach((sec, i) => {
                sec.order = i;
            });
            s.isDirty = true;
        }
    }),

    addSection: (type) => set((s) => {
        const newSection = {
            id: generateId(),
            type,
            title: SECTION_LABELS[type] ?? type,
            visible: true,
            order: s.sections.length,
            animation: { type: 'rise', duration: 650, delay: s.sections.length * 60, distance: 28, easing: 'smooth', repeatOnScroll: false },
        };
        s.sections.push(newSection);
        s.isDirty = true;
    }),

    replaceSectionsForTemplate: (templateId, sectionTypes) => set((s) => {
        const nextTypes = Array.isArray(sectionTypes) && sectionTypes.length
            ? sectionTypes
            : getDefaultSectionsForTemplate(templateId);
        const existingByType = new Map(s.sections.map((section) => [section.type, section]));
        s.sections = nextTypes.map((type, index) => {
            const existing = existingByType.get(type);
            return {
                id: existing?.id ?? generateId(),
                type,
                title: SECTION_LABELS[type] ?? type,
                visible: existing?.visible ?? true,
                order: index,
                animation: existing?.animation ?? {
                    type: 'rise',
                    duration: 650,
                    delay: index * 60,
                    distance: 28,
                    easing: 'smooth',
                    repeatOnScroll: false,
                },
            };
        });
        s.isDirty = true;
    }),

    removeSection: (sectionId) => set((s) => {
        s.sections = s.sections.filter((sec) => sec.id !== sectionId);
        s.sections.forEach((sec, i) => {
            sec.order = i;
        });
        s.isDirty = true;
    }),

    markClean: () => set((s) => {
        s.isDirty = false;
    }),
})));
