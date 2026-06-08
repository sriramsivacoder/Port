import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronRight, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { TEMPLATE_FAMILIES } from '@/templates/templateRegistry';
import { getAllTemplateIds, getTemplatesByFamily, getTemplateConfig } from '@/templates/templateRegistry';

const FAMILY_ICONS = {
  developer: '💻',
  student: '🎓',
  'uiux-designer': '🎨',
  'graphic-designer': '🖌️',
  freelancer: '💼',
  founder: '🚀',
  photographer: '📷',
  'content-creator': '🎬',
  researcher: '📚',
  hybrid: '⚡',
};

export function TemplatePanel() {
  const selectedTemplate = usePortfolioStore((s) => s.selectedTemplate);
  const setSelectedTemplate = usePortfolioStore((s) => s.setSelectedTemplate);
  const professionalCategory = usePortfolioStore((s) => s.professionalCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFamilies, setExpandedFamilies] = useState(() => {
    // Auto-expand the recommended family
    const config = getTemplateConfig(selectedTemplate);
    return new Set([config.family]);
  });

  const toggleFamily = (familyId) => {
    setExpandedFamilies((prev) => {
      const next = new Set(prev);
      if (next.has(familyId)) {
        next.delete(familyId);
      } else {
        next.add(familyId);
      }
      return next;
    });
  };

  const filteredFamilies = useMemo(() => {
    if (!searchQuery.trim()) return TEMPLATE_FAMILIES;
    const q = searchQuery.toLowerCase();
    return TEMPLATE_FAMILIES.filter((family) => {
      const variants = getTemplatesByFamily(family.id);
      return (
        family.name.toLowerCase().includes(q) ||
        family.description.toLowerCase().includes(q) ||
        family.targetAudience.some((a) => a.toLowerCase().includes(q)) ||
        variants.some((v) => v.name.toLowerCase().includes(q) || v.description.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Choose Template</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {TEMPLATE_FAMILIES.length} families, {getAllTemplateIds().length} templates. Your content is preserved when switching.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by profession or style..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-2 pl-8 pr-3 text-sm outline-none transition-colors focus:border-primary/50"
        />
      </div>

      {/* Template families */}
      <div className="space-y-1.5">
        {filteredFamilies.map((family) => {
          const variants = getTemplatesByFamily(family.id);
          const isExpanded = expandedFamilies.has(family.id);
          const isRecommended = professionalCategory === family.id;
          const hasSelectedVariant = variants.some((v) => v.id === selectedTemplate);
          const icon = FAMILY_ICONS[family.id] || '📄';

          return (
            <div key={family.id} className="overflow-hidden rounded-xl border border-border">
              {/* Family header */}
              <button
                type="button"
                onClick={() => toggleFamily(family.id)}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-muted/50',
                  hasSelectedVariant && 'bg-primary/5',
                  isRecommended && 'border-l-2 border-l-primary',
                )}
              >
                <span className="text-base">{icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold truncate">{family.name}</span>
                    {isRecommended && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                        <Star className="h-2.5 w-2.5" />
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-tight truncate">
                    {family.description}
                  </p>
                </div>
                <span className="text-muted-foreground">
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </span>
              </button>

              {/* Variant list */}
              {isExpanded && (
                <div className="border-t border-border bg-muted/20 p-1.5 space-y-1">
                  {variants.map((variant) => {
                    const isSelected = selectedTemplate === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedTemplate(variant.id)}
                        className={cn(
                          'w-full rounded-lg px-3 py-2.5 text-left transition-all',
                          isSelected
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'hover:bg-background border border-transparent hover:border-border',
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className={cn('text-sm font-medium', isSelected && 'text-primary-foreground')}>
                            {variant.name}
                          </span>
                          {/* Color preview dots */}
                          <div className="flex gap-1">
                            <span
                              className="h-3 w-3 rounded-full border border-black/10"
                              style={{ backgroundColor: variant.colors.light.accent }}
                            />
                            <span
                              className="h-3 w-3 rounded-full border border-black/10"
                              style={{ backgroundColor: variant.colors.light.primary }}
                            />
                          </div>
                        </div>
                        <p className={cn(
                          'mt-0.5 text-[11px] leading-tight',
                          isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground',
                        )}>
                          {variant.description}
                        </p>
                        {/* Typography + animation preview */}
                        <div className={cn(
                          'mt-1.5 flex items-center gap-2 text-[10px]',
                          isSelected ? 'text-primary-foreground/60' : 'text-muted-foreground/70',
                        )}>
                          <span style={{ fontFamily: variant.typography.headingFont }}>
                            Aa
                          </span>
                          <span>•</span>
                          <span>{variant.animationLevel} motion</span>
                          <span>•</span>
                          <span>{variant.defaultSections.length} sections</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Family audience tags */}
      {professionalCategory && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AI Recommendation
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Based on your profile, we recommend the <strong>{TEMPLATE_FAMILIES.find((f) => f.id === professionalCategory)?.name}</strong> template family.
          </p>
        </div>
      )}
    </div>
  );
}
