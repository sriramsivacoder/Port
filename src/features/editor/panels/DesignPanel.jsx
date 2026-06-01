import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { HEADING_FONT_OPTIONS } from '@/lib/constants';
import { COLOR_FIELDS, ensureColorSettings } from '@/lib/design';
export function DesignPanel() {
    const design = usePortfolioStore((s) => s.design);
    const selectedTemplate = usePortfolioStore((s) => s.selectedTemplate);
    const themeMode = usePortfolioStore((s) => s.themeMode);
    const updateDesign = usePortfolioStore((s) => s.updateDesign);
    const themeKey = themeMode === 'dark' ? 'dark' : 'light';
    const colors = ensureColorSettings(design.colors, selectedTemplate, themeKey);
    const setColor = (key, value) => {
        updateDesign({
            colors: { [key]: value },
        });
    };
    return (<div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-semibold">Colors</h3>
        <p className="mb-3 text-xs text-muted-foreground">
          Changes apply instantly in the preview.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {COLOR_FIELDS.map(({ key, label }) => (<div key={key} className="space-y-1.5">
              <Label className="text-xs">{label}</Label>
              <div className="flex gap-2">
                <input type="color" value={colors[key]} onChange={(e) => setColor(key, e.target.value)} className="h-9 w-12 shrink-0 cursor-pointer rounded border border-border"/>
                <input type="text" value={colors[key]} onChange={(e) => setColor(key, e.target.value)} className="min-w-0 flex-1 rounded-md border border-input bg-background px-2 text-xs"/>
              </div>
            </div>))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">Typography</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Heading font</Label>
            <Select value={design.typography.headingFont} onValueChange={(v) => updateDesign({
            typography: { headingFont: v },
        })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {HEADING_FONT_OPTIONS.map((f) => (<SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Base size ({design.typography.baseSize}px)</Label>
            <Slider value={[design.typography.baseSize]} min={12} max={20} step={1} onValueChange={([v]) => updateDesign({
            typography: { baseSize: v ?? 16 },
        })}/>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">Spacing & Layout</h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Section padding ({design.spacing.sectionPadding}px)</Label>
            <Slider value={[design.spacing.sectionPadding]} min={32} max={120} step={4} onValueChange={([v]) => updateDesign({
            spacing: { sectionPadding: v ?? 64 },
        })}/>
          </div>
          <div className="space-y-1.5">
            <Label>Content max width ({design.spacing.contentMaxWidth}px)</Label>
            <Slider value={[design.spacing.contentMaxWidth]} min={640} max={1200} step={20} onValueChange={([v]) => updateDesign({
            spacing: { contentMaxWidth: v ?? 960 },
        })}/>
          </div>
          <div className="space-y-1.5">
            <Label>Border radius ({design.borderShadow.borderRadius}px)</Label>
            <Slider value={[design.borderShadow.borderRadius]} min={0} max={24} step={2} onValueChange={([v]) => updateDesign({
            borderShadow: { borderRadius: v ?? 12 },
        })}/>
          </div>
          <div className="space-y-1.5">
            <Label>Shadow</Label>
            <Select value={design.borderShadow.shadowIntensity} onValueChange={(v) => updateDesign({
            borderShadow: {
                shadowIntensity: v,
            },
        })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="subtle">Subtle</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="strong">Strong</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>);
}
