import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { ANIMATION_OPTIONS } from '@/lib/constants';
export function AnimationsPanel() {
    const sections = usePortfolioStore((s) => s.sections);
    const updateSectionAnimation = (sectionId, type, duration) => {
        const updatedSections = sections.map((s) => s.id === sectionId
            ? { ...s, animation: { ...s.animation, type: type, duration } }
            : s);
        usePortfolioStore.setState({ sections: updatedSections, isDirty: true });
    };
    return (<div className="space-y-4">
      <h3 className="text-sm font-semibold">Section Animations</h3>
      <p className="text-xs text-muted-foreground">Configure entrance animation per section.</p>

      <div className="space-y-4">
        {[...sections]
            .sort((a, b) => a.order - b.order)
            .map((section) => (<div key={section.id} className="space-y-2 rounded-lg border border-border p-3">
              <Label className="text-xs">{section.title}</Label>
              <Select value={section.animation.type} onValueChange={(v) => updateSectionAnimation(section.id, v, section.animation.duration)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ANIMATION_OPTIONS.map((opt) => (<SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>))}
                </SelectContent>
              </Select>
              {section.animation.type !== 'none' && (<div className="space-y-1">
                  <Label className="text-xs">Duration ({section.animation.duration ?? 500}ms)</Label>
                  <Slider value={[section.animation.duration ?? 500]} min={100} max={1500} step={50} onValueChange={([v]) => updateSectionAnimation(section.id, section.animation.type, v)}/>
                </div>)}
            </div>))}
      </div>
    </div>);
}
