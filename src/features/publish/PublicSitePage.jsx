import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePublishedSite } from '@/hooks/usePortfolio';
import { TemplateEngine } from '@/templates/TemplateEngine';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
export function PublicSitePage() {
    const { slug } = useParams();
    const { data, isLoading, error } = usePublishedSite(slug ?? '');
    useEffect(() => {
        if (!data?.seo)
            return;
        document.title = data.seo.title;
        const setMeta = (name, content, property = false) => {
            const attr = property ? 'property' : 'name';
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, name);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };
        setMeta('description', data.seo.description);
        setMeta('og:title', data.seo.title, true);
        setMeta('og:description', data.seo.description, true);
        setMeta('og:type', 'website', true);
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', data.seo.title);
        setMeta('twitter:description', data.seo.description);
        if (data.seo.ogImage) {
            setMeta('og:image', data.seo.ogImage, true);
            setMeta('twitter:image', data.seo.ogImage);
        }
    }, [data]);
    if (isLoading) {
        return (<div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" label="Loading portfolio..."/>
      </div>);
    }
    if (error || !data) {
        return (<div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-semibold">Portfolio not found</h1>
        <p className="text-muted-foreground">This site may have been unpublished or removed.</p>
      </div>);
    }
    return (<TemplateEngine content={data.content} design={data.design} sections={data.sections} templateId={data.template} themeMode={data.themeMode} profileImageUrl={data.profileImageUrl} editable={false}/>);
}
