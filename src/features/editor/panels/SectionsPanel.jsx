import { useState } from 'react';
import { GripVertical, Eye, EyeOff, Copy, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { SECTION_LABELS, DEFAULT_SECTION_ORDER } from '@/lib/constants';
export function SectionsPanel() {
    const sections = usePortfolioStore((s) => s.sections);
    const reorderSections = usePortfolioStore((s) => s.reorderSections);
    const toggleSection = usePortfolioStore((s) => s.toggleSection);
    const duplicateSection = usePortfolioStore((s) => s.duplicateSection);
    const addSection = usePortfolioStore((s) => s.addSection);
    const removeSection = usePortfolioStore((s) => s.removeSection);
    const [dragIndex, setDragIndex] = useState(null);
    const [newType, setNewType] = useState('about');
    const sorted = [...sections].sort((a, b) => a.order - b.order);
    const handleDrop = (toIndex) => {
        if (dragIndex !== null && dragIndex !== toIndex) {
            reorderSections(dragIndex, toIndex);
        }
        setDragIndex(null);
    };
    return (<div className="space-y-4">
      <h3 className="text-sm font-semibold">Manage Sections</h3>
      <p className="text-xs text-muted-foreground">Drag to reorder, toggle visibility, or duplicate.</p>

      <div className="space-y-2">
        {sorted.map((section, index) => (<div key={section.id} draggable onDragStart={() => setDragIndex(index)} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(index)} className="flex items-center gap-2 rounded-lg border border-border bg-background p-2">
            <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground"/>
            <span className="flex-1 truncate text-sm">{section.title}</span>
            <Switch checked={section.visible} onCheckedChange={() => toggleSection(section.id)}/>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleSection(section.id)}>
              {section.visible ? <Eye className="h-3.5 w-3.5"/> : <EyeOff className="h-3.5 w-3.5"/>}
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => duplicateSection(section.id)}>
              <Copy className="h-3.5 w-3.5"/>
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeSection(section.id)}>
              <Trash2 className="h-3.5 w-3.5"/>
            </Button>
          </div>))}
      </div>

      <div className="flex gap-2 pt-2">
        <Select value={newType} onValueChange={(v) => setNewType(v)}>
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_SECTION_ORDER.map((type) => (<SelectItem key={type} value={type}>
                {SECTION_LABELS[type]}
              </SelectItem>))}
          </SelectContent>
        </Select>
        <Button size="sm" onClick={() => addSection(newType)}>
          <Plus className="h-4 w-4"/>
        </Button>
      </div>
    </div>);
}
