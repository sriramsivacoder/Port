import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Globe, PanelLeftClose, PanelLeft, Loader2, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { useEditorStore } from '@/stores/editor.store';
import { usePreviewStore } from '@/stores/preview.store';
import { usePortfolio, usePublishPortfolio, useSaveDraft } from '@/hooks/usePortfolio';
import { useAutoSave } from '@/hooks/useAutoSave';
import { PortfolioPreview } from '@/components/preview/PortfolioPreview';
import { PreviewFrame, DeviceSwitcher } from '@/components/preview/PreviewFrame';
import { EditorSidebar } from './EditorSidebar';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { slugify } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
export function EditorPage() {
    const { portfolioId } = useParams();
    const navigate = useNavigate();
    const { data: portfolio, isLoading, error } = usePortfolio(portfolioId ?? null);
    const loadPortfolio = usePortfolioStore((s) => s.loadPortfolio);
    const content = usePortfolioStore((s) => s.content);
    const isSidebarOpen = useEditorStore((s) => s.isSidebarOpen);
    const toggleSidebar = useEditorStore((s) => s.toggleSidebar);
    const isSaving = useEditorStore((s) => s.isSaving);
    const lastSaved = useEditorStore((s) => s.lastSaved);
    const device = usePreviewStore((s) => s.device);
    const setDevice = usePreviewStore((s) => s.setDevice);
    const publishMutation = usePublishPortfolio();
    const saveDraftMutation = useSaveDraft();
    const { save } = useAutoSave();
    const [publishOpen, setPublishOpen] = useState(false);
    const [slug, setSlug] = useState('');
    const [publishedUrl, setPublishedUrl] = useState(null);
    useEffect(() => {
        if (portfolio) {
            loadPortfolio(portfolio);
            if (portfolio.generatedContent?.hero?.title) {
                setSlug(slugify(portfolio.generatedContent.hero.title));
            }
        }
    }, [portfolio, loadPortfolio]);
    const handlePublish = async () => {
        if (!portfolioId || !slug.trim())
            return;
        try {
            const result = await publishMutation.mutateAsync({ portfolioId, slug: slug.trim() });
            setPublishedUrl(result.url);
            toast({ title: 'Published!', description: `Your site is live at ${result.url}`, variant: 'success' });
        }
        catch (err) {
            toast({
                title: 'Publish failed',
                description: err instanceof Error ? err.message : 'Unknown error',
                variant: 'destructive',
            });
        }
    };
    const handleSaveDraft = async () => {
        if (!portfolioId)
            return;
        save();
        try {
            await saveDraftMutation.mutateAsync({ portfolioId });
            toast({ title: 'Draft saved', variant: 'success' });
        }
        catch (err) {
            toast({
                title: 'Save failed',
                description: err instanceof Error ? err.message : 'Unknown error',
                variant: 'destructive',
            });
        }
    };
    if (isLoading) {
        return (<div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" label="Loading editor..."/>
      </div>);
    }
    if (error || !content) {
        return (<div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{error?.message ?? 'Portfolio not found'}</p>
        <Button onClick={() => navigate('/wizard')}>Start over</Button>
      </div>);
    }
    return (<div className="flex h-screen flex-col overflow-hidden bg-background">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarOpen ? <PanelLeftClose className="h-4 w-4"/> : <PanelLeft className="h-4 w-4"/>}
          </Button>
          <span className="font-semibold">PortfolioForge Editor</span>
          {isSaving && (<span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin"/> Saving...
            </span>)}
          {lastSaved && !isSaving && (<span className="text-xs text-muted-foreground">
              Saved {new Date(lastSaved).toLocaleTimeString()}
            </span>)}
        </div>

        <DeviceSwitcher device={device} onChange={setDevice}/>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSaveDraft} disabled={saveDraftMutation.isPending}>
            <Save className="mr-1.5 h-4 w-4"/>
            Save Draft
          </Button>
          <Button size="sm" onClick={() => setPublishOpen(true)}>
            <Globe className="mr-1.5 h-4 w-4"/>
            Publish
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && <EditorSidebar />}
        <PreviewFrame device={device}>
          <PortfolioPreview editable/>
        </PreviewFrame>
      </div>

      <Dialog open={publishOpen} onOpenChange={setPublishOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish your portfolio</DialogTitle>
          </DialogHeader>
          {publishedUrl ? (<div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">Your portfolio is live!</p>
              <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                {publishedUrl}
              </a>
            </div>) : (<div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="slug">URL slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/p/</span>
                  <Input id="slug" value={slug} onChange={(e) => setSlug(slugify(e.target.value))} placeholder="your-name"/>
                </div>
              </div>
            </div>)}
          <DialogFooter>
            {publishedUrl ? (<Button onClick={() => setPublishOpen(false)}>Done</Button>) : (<>
                <Button variant="outline" onClick={() => setPublishOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePublish} disabled={!slug || publishMutation.isPending}>
                  {publishMutation.isPending ? 'Publishing...' : 'Publish'}
                </Button>
              </>)}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);
}
