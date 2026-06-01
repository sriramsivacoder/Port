import { memo } from 'react';
import { TemplateEngine } from '@/templates/TemplateEngine';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { designColorKey } from '@/lib/design';
export const PortfolioPreview = memo(function PortfolioPreview({ editable = false }) {
    const content = usePortfolioStore((s) => s.content);
    const design = usePortfolioStore((s) => s.design);
    const sections = usePortfolioStore((s) => s.sections);
    const selectedTemplate = usePortfolioStore((s) => s.selectedTemplate);
    const themeMode = usePortfolioStore((s) => s.themeMode);
    const profileImageUrl = usePortfolioStore((s) => s.profileImageUrl);
    const updateContent = usePortfolioStore((s) => s.updateContent);
    if (!content) {
        return (<div className="flex h-64 items-center justify-center text-muted-foreground">
        No content to preview yet.
      </div>);
    }
    return (<TemplateEngine key={designColorKey(design)} content={content} design={design} sections={sections} templateId={selectedTemplate} themeMode={themeMode} profileImageUrl={profileImageUrl} editable={editable} onContentChange={editable ? updateContent : undefined}/>);
});
