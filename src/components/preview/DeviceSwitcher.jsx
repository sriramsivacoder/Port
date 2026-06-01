import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const devices = [
    { id: 'desktop', icon: Monitor, label: 'Desktop' },
    { id: 'tablet', icon: Tablet, label: 'Tablet' },
    { id: 'mobile', icon: Smartphone, label: 'Mobile' },
];
export function DeviceSwitcher({ device, onChange }) {
    return (<div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
      {devices.map(({ id, icon: Icon, label }) => (<Button key={id} variant={device === id ? 'default' : 'ghost'} size="sm" onClick={() => onChange(id)} className={cn('gap-1.5', device === id && 'shadow-sm')}>
          <Icon className="h-4 w-4"/>
          <span className="hidden sm:inline">{label}</span>
        </Button>))}
    </div>);
}
