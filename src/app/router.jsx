import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
const LandingPage = lazy(() => import('@/features/landing/LandingPage').then((m) => ({ default: m.LandingPage })));
const WizardPage = lazy(() => import('@/features/wizard/WizardPage').then((m) => ({ default: m.WizardPage })));
const EditorPage = lazy(() => import('@/features/editor/EditorPage').then((m) => ({ default: m.EditorPage })));
const PublicSitePage = lazy(() => import('@/features/publish/PublicSitePage').then((m) => ({ default: m.PublicSitePage })));
function PageLoader() {
    return (<div className="flex h-screen w-screen items-center justify-center bg-background">
      <LoadingSpinner size="lg" label="Loading..."/>
    </div>);
}
export function AppRouter() {
    return (<Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/wizard" element={<WizardPage />}/>
        <Route path="/editor/:portfolioId" element={<EditorPage />}/>
        <Route path="/p/:slug" element={<PublicSitePage />}/>
      </Routes>
    </Suspense>);
}
