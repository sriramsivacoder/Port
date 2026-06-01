import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { MAX_IMAGE_SIZE } from '@/lib/constants';
export function MediaPanel() {
    const portfolioId = usePortfolioStore((s) => s.portfolioId);
    const profileImageUrl = usePortfolioStore((s) => s.profileImageUrl);
    const setProfileImageUrl = usePortfolioStore((s) => s.setProfileImageUrl);
    const { upload, isUploading, progress } = useMediaUpload({
        portfolioId: portfolioId ?? '',
        onSuccess: setProfileImageUrl,
    });
    const onDrop = useCallback((files) => {
        const file = files[0];
        if (file)
            upload(file);
    }, [upload]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'] },
        maxSize: MAX_IMAGE_SIZE,
        multiple: false,
        disabled: !portfolioId || isUploading,
    });
    return (<div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-semibold">Profile Image</h3>
        <div className="mb-4 flex justify-center">
          {profileImageUrl ? (<div className="relative">
              <img src={profileImageUrl} alt="Profile" className="h-24 w-24 rounded-xl object-cover"/>
              <Button variant="destructive" size="icon" className="absolute -right-2 -top-2 h-6 w-6" onClick={() => setProfileImageUrl(null)}>
                <X className="h-3 w-3"/>
              </Button>
            </div>) : (<div className="flex h-24 w-24 items-center justify-center rounded-xl bg-muted">
              <User className="h-8 w-8 text-muted-foreground"/>
            </div>)}
        </div>
      </div>

      <div {...getRootProps()} className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center ${isDragActive ? 'border-primary bg-primary/5' : 'border-border'}`}>
        <input {...getInputProps()}/>
        <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground"/>
        <p className="text-sm font-medium">{isUploading ? `Uploading ${progress}%...` : 'Upload image'}</p>
        <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, WebP up to 5MB</p>
      </div>
    </div>);
}
