import { AppRouter } from './router';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
export function App() {
    return (<ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>);
}
