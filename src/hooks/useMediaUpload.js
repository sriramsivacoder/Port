import { useState, useCallback } from 'react';
import { useUploadMedia } from '@/hooks/usePortfolio';
import { toast } from '@/components/ui/use-toast';
export function useMediaUpload({ portfolioId, onSuccess }) {
    const [progress, setProgress] = useState(0);
    const uploadMutation = useUploadMedia();
    const upload = useCallback(async (file) => {
        setProgress(0);
        try {
            const result = await uploadMutation.mutateAsync({
                portfolioId,
                file,
                onProgress: (percent) => setProgress(percent),
            });
            setProgress(100);
            onSuccess?.(result.url);
            toast({
                title: 'Upload complete',
                description: 'Your image has been uploaded successfully.',
                variant: 'success',
            });
            return result.url;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Upload failed';
            toast({
                title: 'Upload failed',
                description: message,
                variant: 'destructive',
            });
            return null;
        }
    }, [portfolioId, onSuccess, uploadMutation]);
    const reset = useCallback(() => {
        setProgress(0);
    }, []);
    return {
        upload,
        progress,
        isUploading: uploadMutation.isPending,
        error: uploadMutation.error?.message ?? null,
        reset,
    };
}
