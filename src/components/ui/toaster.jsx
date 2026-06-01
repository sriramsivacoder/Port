import { ToastProvider, ToastViewport, ToastRoot, ToastTitle, ToastDescription, ToastClose, } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
export function Toaster() {
    const { toasts } = useToast();
    return (<ToastProvider>
      {toasts.map(({ id, title, description, variant }) => (<ToastRoot key={id} variant={variant === 'success' ? 'success' : variant === 'destructive' ? 'destructive' : 'default'}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <ToastClose />
        </ToastRoot>))}
      <ToastViewport />
    </ToastProvider>);
}
