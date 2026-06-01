import { cn } from '@/lib/utils';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { TEMPLATE_INFO, TEMPLATE_IDS } from '@/lib/constants';
export function TemplatePanel() {
    const selectedTemplate = usePortfolioStore((s) => s.selectedTemplate);
    const setSelectedTemplate = usePortfolioStore((s) => s.setSelectedTemplate);
    return (<div className="space-y-4">
      <h3 className="text-sm font-semibold">Choose Template</h3>
      <p className="text-xs text-muted-foreground">
        Switch templates instantly. Your content is preserved.
      </p>

      <div className="space-y-2">
        {TEMPLATE_IDS.map((id) => {
            const info = TEMPLATE_INFO[id];
            return (<button key={id} type="button" onClick={() => setSelectedTemplate(id)} className={cn('w-full rounded-xl border p-4 text-left transition-colors', selectedTemplate === id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50')}>
              <div className="flex items-center justify-between">
                <span className="font-medium">{info.name}</span>
                <span className="text-xs text-muted-foreground">{info.category}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{info.description}</p>
            </button>);
        })}
      </div>
    </div>);
}
