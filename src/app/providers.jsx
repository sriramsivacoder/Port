import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 1,
        },
    },
});
export function Providers({ children }) {
    return (<QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
        <Toaster />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>);
}
