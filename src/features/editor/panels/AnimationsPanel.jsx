import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { ANIMATION_EASING_OPTIONS, ANIMATION_OPTIONS, ANIMATION_PRESETS } from '@/lib/constants';
import { normalizeAnimation } from '@/templates/utils';
export function AnimationsPanel() {
    const sections = usePortfolioStore((s) => s.sections);
    const updateSectionAnimation = (sectionId, patch) => {
        const updatedSections = sections.map((s) => s.id === sectionId
            ? { ...s, animation: { ...normalizeAnimation(s.animation), ...patch } }
            : s);
        usePortfolioStore.setState({ sections: updatedSections, isDirty: true });
    };
    const applyPreset = (preset) => {
        const updatedSections = [...sections]
            .sort((a, b) => a.order - b.order)
            .map((section, index) => ({
            ...section,
            animation: {
                ...preset.animation,
                type: preset.id === 'kinetic' && index % 2 ? 'slideRight' : preset.animation.type,
                delay: index * 70,
            },
        }));
        usePortfolioStore.setState({ sections: updatedSections, isDirty: true });
    };
    return (<div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold">Animation Studio</h3>
        <p className="mt-1 text-xs text-muted-foreground">Apply a collection or tune each section.</p>
      </div>

      <div className="grid gap-2">
        {ANIMATION_PRESETS.map((preset) => (<button key={preset.id} type="button" onClick={() => applyPreset(preset)} className="rounded-lg border border-border p-3 text-left transition-colors hover:border-primary/60 hover:bg-primary/5">
            <div className="text-xs font-semibold">{preset.name}</div>
            <p className="mt-1 text-xs text-muted-foreground">{preset.description}</p>
          </button>))}
      </div>

      <div className="space-y-4">
        {[...sections]
            .sort((a, b) => a.order - b.order)
            .map((section, index) => {
            const animation = normalizeAnimation(section.animation, index);
            return (<div key={section.id} className="space-y-3 rounded-lg border border-border p-3">
              <Label className="text-xs">{section.title}</Label>
              <Select value={animation.type} onValueChange={(v) => updateSectionAnimation(section.id, { type: v })}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ANIMATION_OPTIONS.map((opt) => (<SelectItem key={opt.value} value={opt.value}>
                      {opt.label} <span className="text-muted-foreground">({opt.category})</span>
                    </SelectItem>))}
                </SelectContent>
              </Select>
              {animation.type !== 'none' && (<>
                  <div className="space-y-1">
                    <Label className="text-xs">Easing</Label>
                    <Select value={animation.easing} onValueChange={(v) => updateSectionAnimation(section.id, { easing: v })}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ANIMATION_EASING_OPTIONS.map((opt) => (<SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Duration ({animation.duration}ms)</Label>
                    <Slider value={[animation.duration]} min={150} max={1800} step={50} onValueChange={([v]) => updateSectionAnimation(section.id, { duration: v ?? 650 })}/>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Delay ({animation.delay}ms)</Label>
                    <Slider value={[animation.delay]} min={0} max={900} step={25} onValueChange={([v]) => updateSectionAnimation(section.id, { delay: v ?? 0 })}/>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Travel ({animation.distance}px)</Label>
                    <Slider value={[animation.distance]} min={8} max={96} step={4} onValueChange={([v]) => updateSectionAnimation(section.id, { distance: v ?? 28 })}/>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-md bg-muted/40 px-3 py-2">
                    <Label className="text-xs">Replay on scroll</Label>
                    <Switch checked={animation.repeatOnScroll} onCheckedChange={(checked) => updateSectionAnimation(section.id, { repeatOnScroll: checked })}/>
                  </div>
                </>)}
            </div>);
        })}
      </div>
    </div>);
}
