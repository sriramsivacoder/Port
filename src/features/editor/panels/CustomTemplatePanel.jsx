import { useState } from 'react';
import { Sparkles, Loader2, Wand2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

const EXAMPLE_PROMPTS = [
  'Cyberpunk developer portfolio with neon accents',
  'Apple-inspired minimalist with lots of white space',
  'Bold agency portfolio with dark theme and orange accents',
  'Academic CV with elegant serif headings',
  'Playful creative portfolio with rounded cards and pastel colors',
];

export function CustomTemplatePanel() {
  const portfolioId = usePortfolioStore((s) => s.portfolioId);
  const setSelectedTemplate = usePortfolioStore((s) => s.setSelectedTemplate);
  const replaceSectionsForTemplate = usePortfolioStore((s) => s.replaceSectionsForTemplate);
  const updateDesign = usePortfolioStore((s) => s.updateDesign);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedConfig(null);
    try {
      const { data } = await api.post('/portfolio/generate-custom-template', {
        portfolioId,
        prompt: prompt.trim(),
      });
      if (data.success && data.data) {
        setGeneratedConfig(data.data);
      } else {
        throw new Error(data.error ?? 'Generation failed');
      }
    } catch (err) {
      toast({
        title: 'Template Generation Failed',
        description: err instanceof Error ? err.message : 'Could not generate template',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const applyGeneratedTemplate = () => {
    if (!generatedConfig) return;
    // Apply as hybrid-flex base with custom design overrides
    setSelectedTemplate('hybrid-flex');
    replaceSectionsForTemplate('hybrid-flex', generatedConfig.suggestedSections);
    updateDesign({
      colors: generatedConfig.colors,
      typography: generatedConfig.typography,
      spacing: generatedConfig.spacing,
      borderShadow: generatedConfig.borderShadow,
    });
    toast({
      title: 'Custom template applied!',
      description: 'Your AI-generated design has been applied. Tweak it further in the Design panel.',
    });
    setGeneratedConfig(null);
    setPrompt('');
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="flex items-center gap-1.5 text-sm font-semibold">
          <Wand2 className="h-4 w-4" />
          Generate Custom Template
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Describe the look and feel you want, and AI will generate a custom design.
        </p>
      </div>

      {/* Prompt input */}
      <div className="space-y-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your ideal portfolio style..."
          className="w-full rounded-lg border border-border bg-background p-3 text-sm outline-none transition-colors focus:border-primary/50 resize-none"
          rows={3}
        />
        <div className="flex flex-wrap gap-1.5">
          {EXAMPLE_PROMPTS.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setPrompt(example)}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Template
          </>
        )}
      </Button>

      {/* Preview generated config */}
      {generatedConfig && (
        <div className="space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="text-sm font-semibold">Generated Design Preview</div>

          {/* Color swatches */}
          <div className="space-y-1.5">
            <div className="text-xs text-muted-foreground">Colors</div>
            <div className="flex gap-1.5">
              {['primary', 'secondary', 'accent', 'background', 'surface'].map((key) => (
                <div key={key} className="text-center">
                  <div
                    className="h-8 w-8 rounded-lg border border-border"
                    style={{ backgroundColor: generatedConfig.colors?.[key] }}
                  />
                  <div className="mt-0.5 text-[9px] text-muted-foreground">{key}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          {generatedConfig.typography && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Typography</div>
              <div className="text-sm" style={{ fontFamily: generatedConfig.typography.headingFont }}>
                Heading Font Preview
              </div>
              <div className="text-xs" style={{ fontFamily: generatedConfig.typography.bodyFont }}>
                Body text font preview
              </div>
            </div>
          )}

          {Array.isArray(generatedConfig.suggestedSections) && generatedConfig.suggestedSections.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Suggested Sections</div>
              <div className="flex flex-wrap gap-1.5">
                {generatedConfig.suggestedSections.map((section) => (
                  <span
                    key={section}
                    className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>
          )}

          {generatedConfig.designNotes && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Design Notes</div>
              <p className="text-xs text-muted-foreground">{generatedConfig.designNotes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={applyGeneratedTemplate} className="flex-1">
              <Check className="mr-1.5 h-3.5 w-3.5" />
              Apply
            </Button>
            <Button size="sm" variant="outline" onClick={() => setGeneratedConfig(null)}>
              <X className="mr-1.5 h-3.5 w-3.5" />
              Discard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
