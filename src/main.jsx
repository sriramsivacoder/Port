import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from '@/app/providers';
import { App } from '@/app/App';
import './index.css';
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found. Ensure index.html contains a <div id="root">.');
}
createRoot(rootElement).render(<StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>);
