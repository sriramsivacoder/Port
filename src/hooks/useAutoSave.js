import { useRef, useEffect, useCallback } from 'react';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { useEditorStore } from '@/stores/editor.store';
import { useUpdatePortfolio } from '@/hooks/usePortfolio';
import { AUTOSAVE_DEBOUNCE_MS } from '@/lib/constants';
export function useAutoSave() {
    const portfolioId = usePortfolioStore((s) => s.portfolioId);
    const isDirty = usePortfolioStore((s) => s.isDirty);
    const content = usePortfolioStore((s) => s.content);
    const design = usePortfolioStore((s) => s.design);
    const sections = usePortfolioStore((s) => s.sections);
    const selectedTemplate = usePortfolioStore((s) => s.selectedTemplate);
    const themeMode = usePortfolioStore((s) => s.themeMode);
    const profileImageUrl = usePortfolioStore((s) => s.profileImageUrl);
    const markClean = usePortfolioStore((s) => s.markClean);
    const setIsSaving = useEditorStore((s) => s.setIsSaving);
    const setLastSaved = useEditorStore((s) => s.setLastSaved);
    const updateMutation = useUpdatePortfolio();
    const timerRef = useRef(undefined);
    const save = useCallback(() => {
        if (!portfolioId || !isDirty || !content)
            return;
        setIsSaving(true);
        updateMutation.mutate({
            portfolioId,
            updates: {
                generatedContent: content,
                designSettings: design,
                sections,
                selectedTemplate,
                themeMode,
                profileImageUrl: profileImageUrl ?? undefined,
            },
        }, {
            onSuccess: () => {
                markClean();
                setLastSaved(new Date().toISOString());
                setIsSaving(false);
            },
            onError: () => {
                setIsSaving(false);
            },
        });
    }, [portfolioId, isDirty, content, design, sections, selectedTemplate, themeMode, profileImageUrl, markClean, setIsSaving, setLastSaved, updateMutation]);
    useEffect(() => {
        if (!isDirty)
            return;
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(save, AUTOSAVE_DEBOUNCE_MS);
        return () => clearTimeout(timerRef.current);
    }, [isDirty, save]);
    return { save, isSaving: updateMutation.isPending };
}
