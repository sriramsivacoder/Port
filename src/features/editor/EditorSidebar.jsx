import { Type, Palette, LayoutList, Image, Sun, Zap, LayoutTemplate, Wand2, } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/stores/editor.store';
import { ContentPanel } from './panels/ContentPanel';
import { DesignPanel } from './panels/DesignPanel';
import { SectionsPanel } from './panels/SectionsPanel';
import { MediaPanel } from './panels/MediaPanel';
import { ThemePanel } from './panels/ThemePanel';
import { AnimationsPanel } from './panels/AnimationsPanel';
import { TemplatePanel } from './panels/TemplatePanel';
import { CustomTemplatePanel } from './panels/CustomTemplatePanel';
const panels = [
    { id: 'content', label: 'Content', icon: Type },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'sections', label: 'Sections', icon: LayoutList },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'theme', label: 'Theme', icon: Sun },
    { id: 'animations', label: 'Animations', icon: Zap },
    { id: 'template', label: 'Template', icon: LayoutTemplate },
    { id: 'custom', label: 'AI Template', icon: Wand2 },
];
export function EditorSidebar() {
    const activePanel = useEditorStore((s) => s.activePanel);
    const setActivePanel = useEditorStore((s) => s.setActivePanel);
    return (<aside className="flex w-80 shrink-0 border-r border-border bg-card">
      <nav className="flex w-14 flex-col items-center gap-1 border-r border-border py-3">
        {panels.map(({ id, label, icon: Icon }) => (<button key={id} type="button" title={label} onClick={() => setActivePanel(id)} className={cn('flex h-10 w-10 items-center justify-center rounded-lg transition-colors', activePanel === id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground')}>
            <Icon className="h-4 w-4"/>
          </button>))}
      </nav>
      <div className="flex-1 overflow-y-auto p-4">
        {activePanel === 'content' && <ContentPanel />}
        {activePanel === 'design' && <DesignPanel />}
        {activePanel === 'sections' && <SectionsPanel />}
        {activePanel === 'media' && <MediaPanel />}
        {activePanel === 'theme' && <ThemePanel />}
        {activePanel === 'animations' && <AnimationsPanel />}
        {activePanel === 'template' && <TemplatePanel />}
        {activePanel === 'custom' && <CustomTemplatePanel />}
      </div>
    </aside>);
}
