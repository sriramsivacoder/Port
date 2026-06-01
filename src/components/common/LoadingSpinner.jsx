import { cn } from '@/lib/utils';
const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
};
export function LoadingSpinner({ size = 'md', label, className }) {
    return (<div className={cn('flex flex-col items-center gap-3', className)} role="status">
      <div className={cn('animate-spin rounded-full border-primary border-t-transparent', sizeClasses[size])}/>
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>);
}
