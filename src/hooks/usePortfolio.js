import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, uploadResume, uploadMedia } from '@/lib/api';
export const portfolioKeys = {
    all: ['portfolios'],
    detail: (id) => ['portfolios', id],
    published: (slug) => ['published', slug],
    templates: ['templates'],
};
export function usePortfolio(id) {
    return useQuery({
        queryKey: portfolioKeys.detail(id ?? ''),
        queryFn: async () => {
            const { data } = await api.get(`/portfolio/${id}`);
            if (!data.success || !data.data) {
                throw new Error(data.error ?? 'Failed to load portfolio');
            }
            return data.data;
        },
        enabled: !!id,
    });
}
export function usePublishedSite(slug) {
    return useQuery({
        queryKey: portfolioKeys.published(slug),
        queryFn: async () => {
            const { data } = await api.get(`/publish/${slug}`);
            if (!data.success || !data.data) {
                throw new Error(data.error ?? 'Site not found');
            }
            return data.data;
        },
        enabled: !!slug,
        retry: 1,
    });
}
export function useTemplates() {
    return useQuery({
        queryKey: portfolioKeys.templates,
        queryFn: async () => {
            const { data } = await api.get('/templates');
            if (!data.success || !data.data) {
                throw new Error(data.error ?? 'Failed to load templates');
            }
            return data.data;
        },
        staleTime: 30 * 60 * 1000,
    });
}
export function useCreatePortfolio() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { data } = await api.post('/portfolio/create');
            if (!data.success || !data.data) {
                throw new Error(data.error ?? 'Failed to create portfolio');
            }
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: portfolioKeys.all });
        },
    });
}
export function useUploadResume() {
    return useMutation({
        mutationFn: async ({ portfolioId, file, onProgress, }) => {
            const result = (await uploadResume(portfolioId, file, onProgress));
            if (!result.success || !result.data) {
                throw new Error(result.error ?? 'Resume upload failed');
            }
            return result.data;
        },
    });
}
export function useEnrichGitHub() {
    return useMutation({
        mutationFn: async ({ portfolioId, githubUrl, }) => {
            const { data } = await api.post('/portfolio/enrich-github', {
                portfolioId,
                githubUrl,
            });
            if (!data.success || !data.data) {
                throw new Error(data.error ?? 'GitHub enrichment failed');
            }
            return data.data;
        },
    });
}
export function useGeneratePortfolio() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ portfolioId, templateId, }) => {
            const { data } = await api.post('/portfolio/generate', {
                portfolioId,
                templateId,
            });
            if (!data.success || !data.data) {
                throw new Error(data.error ?? 'Generation failed');
            }
            return data.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: portfolioKeys.detail(variables.portfolioId) });
        },
    });
}
export function useUpdatePortfolio() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ portfolioId, updates, }) => {
            const { data } = await api.put(`/portfolio/${portfolioId}`, updates);
            if (!data.success) {
                throw new Error(data.error ?? 'Update failed');
            }
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: portfolioKeys.detail(variables.portfolioId) });
        },
    });
}
export function usePublishPortfolio() {
    return useMutation({
        mutationFn: async ({ portfolioId, slug, }) => {
            const { data } = await api.post(`/publish/portfolio/${portfolioId}`, { slug });
            if (!data.success || !data.data) {
                throw new Error(data.error ?? 'Publish failed');
            }
            return data.data;
        },
    });
}
export function useSaveDraft() {
    return useMutation({
        mutationFn: async ({ portfolioId }) => {
            const { data } = await api.post(`/drafts/${portfolioId}`);
            if (!data.success) {
                throw new Error(data.error ?? 'Save draft failed');
            }
            return data.data;
        },
    });
}
export function useUploadMedia() {
    return useMutation({
        mutationFn: async ({ portfolioId, file, onProgress, }) => {
            const result = (await uploadMedia(portfolioId, file, onProgress));
            if (!result.success || !result.data) {
                throw new Error(result.error ?? 'Upload failed');
            }
            return result.data;
        },
    });
}
