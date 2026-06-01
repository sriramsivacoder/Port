import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error('[ErrorBoundary]', error, info.componentStack);
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback)
                return this.props.fallback;
            return (<div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertTriangle className="h-7 w-7 text-destructive"/>
          </div>
          <div className="max-w-md space-y-2">
            <h1 className="text-xl font-semibold">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
          </div>
          <Button onClick={() => window.location.reload()}>Reload page</Button>
        </div>);
        }
        return this.props.children;
    }
}
