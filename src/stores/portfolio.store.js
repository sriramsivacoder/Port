import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { generateId } from '@/lib/utils';
import { DEFAULT_SECTION_ORDER, SECTION_LABELS } from '@/lib/constants';
import { TEMPLATE_COLORS, TEMPLATE_TYPOGRAPHY } from '@/shared/template.js';
function createDefaultDesign(templateId = 'notion') {
    const colors = (TEMPLATE_COLORS[templateId] ?? TEMPLATE_COLORS.notion).light;
    const typography = TEMPLATE_TYPOGRAPHY[templateId] ?? TEMPLATE_TYPOGRAPHY.notion;
    return {
        colors,
        typography,
        spacing: {
            sectionPadding: 64,
            contentMaxWidth: templateId === 'creative' || templateId === 'editorial' ? 1100 : templateId === 'executive' ? 1040 : 960,
            cardGap: templateId === 'executive' ? 18 : 24,
        },
        borderShadow: {
            borderRadius: templateId === 'notion' || templateId === 'neon' ? 8 : templateId === 'executive' ? 6 : 12,
            borderWidth: templateId === 'neon' ? 2 : 1,
            shadowIntensity: templateId === 'minimal' || templateId === 'executive' ? 'subtle' : 'medium',
        },
        animations: {},
    };
}
function createDefaultSections() {
    return DEFAULT_SECTION_ORDER.map((type, index) => ({
        id: generateId(),
        type,
        title: SECTION_LABELS[type],
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
    selectedTemplate: 'notion',
    themeMode: 'light',
    profileImageUrl: null,
    isDirty: false,
    setPortfolioId: (id) => set((s) => {
        s.portfolioId = id;
    }),
    loadPortfolio: (portfolio) => set((s) => {
        s.portfolioId = portfolio._id ?? null;
        s.content = portfolio.generatedContent;
        s.design =
            portfolio.designSettings ??
                createDefaultDesign(portfolio.selectedTemplate ??
                    'notion');
        s.sections =
            portfolio.sections?.length
                ? portfolio.sections
                : createDefaultSections();
        s.selectedTemplate =
            portfolio.selectedTemplate ??
                'notion';
        s.themeMode =
            portfolio.themeMode ?? 'light';
        s.profileImageUrl =
            portfolio.profileImageUrl ?? null;
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
        s.selectedTemplate = template;
        // Apply template default colors and typography
        const templateColors = TEMPLATE_COLORS[template] ?? TEMPLATE_COLORS.notion;
        s.design.colors = templateColors[s.themeMode === 'dark' ? 'dark' : 'light'];
        s.design.typography = TEMPLATE_TYPOGRAPHY[template] ?? TEMPLATE_TYPOGRAPHY.notion;
        s.design.spacing = createDefaultDesign(template).spacing;
        s.design.borderShadow = createDefaultDesign(template).borderShadow;
        s.isDirty = true;
    }),
    setThemeMode: (mode) => set((s) => {
        s.themeMode = mode;
        const colorMode = mode === 'dark' ? 'dark' : 'light';
        const templateColors = TEMPLATE_COLORS[s.selectedTemplate] ?? TEMPLATE_COLORS.notion;
        s.design.colors = templateColors[colorMode];
        s.isDirty = true;
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
            title: SECTION_LABELS[type],
            visible: true,
            order: s.sections.length,
            animation: { type: 'rise', duration: 650, delay: s.sections.length * 60, distance: 28, easing: 'smooth', repeatOnScroll: false },
        };
        s.sections.push(newSection);
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
