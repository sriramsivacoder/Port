import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortfolioStore } from '@/stores/portfolio.store';
const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'auto', label: 'Auto', icon: Monitor },
];
export function ThemePanel() {
    const themeMode = usePortfolioStore((s) => s.themeMode);
    const setThemeMode = usePortfolioStore((s) => s.setThemeMode);
    return (<div className="space-y-4">
      <h3 className="text-sm font-semibold">Theme Mode</h3>
      <div className="grid grid-cols-3 gap-2">
        {themes.map(({ id, label, icon: Icon }) => (<button key={id} type="button" onClick={() => setThemeMode(id)} className={cn('flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors', themeMode === id
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-primary/50')}>
            <Icon className="h-5 w-5"/>
            <span className="text-xs font-medium">{label}</span>
          </button>))}
      </div>
    </div>);
}
