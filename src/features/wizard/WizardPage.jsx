import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'motion/react';
import { Upload, Github, Linkedin, ArrowRight, ArrowLeft, FileText, Loader2, AlertCircle, CheckCircle2, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWizardStore } from '@/stores/wizard.store';
import { useCreatePortfolio, useUploadResume, useEnrichGitHub, useGeneratePortfolio, useUpdatePortfolio, } from '@/hooks/usePortfolio';
import { WIZARD_STEPS, ACCEPTED_RESUME_TYPES, MAX_RESUME_SIZE } from '@/lib/constants';
import { formatFileSize, isGitHubUrlOrUsername, isLinkedInUrlOrHandle, normalizeGitHubUrl, normalizeLinkedInUrl, } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
export function WizardPage() {
    const navigate = useNavigate();
    const { currentStep, resumeFile, resumeData, githubUrl, linkedinUrl, githubFromResume, linkedinFromResume, isParsingResume, processingPhase, processingError, portfolioId, setStep, setResumeFile, applyParsedResume, setGithubUrl, setLinkedinUrl, setIsParsingResume, setProcessingPhase, setProcessingError, setPortfolioId, } = useWizardStore();
    const createPortfolio = useCreatePortfolio();
    const uploadResume = useUploadResume();
    const enrichGitHub = useEnrichGitHub();
    const generatePortfolio = useGeneratePortfolio();
    const updatePortfolio = useUpdatePortfolio();
    useEffect(() => {
        if (!portfolioId && !createPortfolio.isPending) {
            createPortfolio.mutate(undefined, {
                onSuccess: (data) => setPortfolioId(data.portfolioId),
                onError: (err) => {
                    toast({ title: 'Error', description: err.message, variant: 'destructive' });
                },
            });
        }
    }, [portfolioId, createPortfolio, setPortfolioId]);
    const onDrop = useCallback((files) => {
        const file = files[0];
        if (file)
            setResumeFile(file);
    }, [setResumeFile]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ACCEPTED_RESUME_TYPES,
        maxSize: MAX_RESUME_SIZE,
        multiple: false,
    });
    const stepIndex = WIZARD_STEPS.findIndex((s) => s.id === currentStep);
    const handleResumeContinue = async () => {
        if (!resumeFile) {
            setStep('github');
            return;
        }
        if (!portfolioId)
            return;
        setIsParsingResume(true);
        try {
            const data = await uploadResume.mutateAsync({ portfolioId, file: resumeFile });
            applyParsedResume(data);
            setStep('github');
        }
        catch (err) {
            toast({
                title: 'Resume parsing failed',
                description: err instanceof Error ? err.message : 'Could not parse resume',
                variant: 'destructive',
            });
        }
        finally {
            setIsParsingResume(false);
        }
    };
    const runGeneration = async () => {
        if (!portfolioId)
            return;
        if (githubUrl && !isGitHubUrlOrUsername(githubUrl)) {
            toast({
                title: 'Invalid GitHub profile',
                description: 'Enter a valid GitHub URL or username, or leave it blank.',
                variant: 'destructive',
            });
            setStep('github');
            return;
        }
        if (linkedinUrl && !isLinkedInUrlOrHandle(linkedinUrl)) {
            toast({
                title: 'Invalid LinkedIn profile',
                description: 'Enter a valid LinkedIn URL or handle, or leave it blank.',
                variant: 'destructive',
            });
            return;
        }
        setStep('processing');
        setProcessingError(null);
        try {
            if (!resumeData && resumeFile) {
                setProcessingPhase('parsing');
                const data = await uploadResume.mutateAsync({ portfolioId, file: resumeFile });
                applyParsedResume(data);
            }
            const gh = normalizeGitHubUrl(githubUrl);
            if (gh) {
                setProcessingPhase('github');
                await enrichGitHub.mutateAsync({ portfolioId, githubUrl: gh });
            }
            const li = normalizeLinkedInUrl(linkedinUrl);
            if (li) {
                await updatePortfolio.mutateAsync({
                    portfolioId,
                    updates: { linkedinData: { url: li } },
                });
            }
            setProcessingPhase('generating');
            await generatePortfolio.mutateAsync({ portfolioId, templateId: 'notion' });
            setProcessingPhase('complete');
            setTimeout(() => navigate(`/editor/${portfolioId}`), 800);
        }
        catch (err) {
            setProcessingPhase('error');
            setProcessingError(err instanceof Error ? err.message : 'Generation failed');
        }
    };
    return (<div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold">PortfolioForge</h1>
          <div className="flex gap-1">
            {WIZARD_STEPS.map((step, i) => (<div key={step.id} className={`h-1.5 w-8 rounded-full transition-colors ${i <= stepIndex ? 'bg-primary' : 'bg-muted'}`}/>))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        {currentStep === 'resume' && (<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Add Resume</CardTitle>
                <CardDescription>
                  Required — PDF or DOCX. We extract your profile, experience, and contact links
                  (including GitHub and LinkedIn when present).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div {...getRootProps()} className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <input {...getInputProps()}/>
                  <Upload className="mx-auto mb-4 h-10 w-10 text-muted-foreground"/>
                  {resumeFile ? (<div className="flex items-center justify-center gap-2">
                      <FileText className="h-5 w-5 text-primary"/>
                      <span className="font-medium">{resumeFile.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ({formatFileSize(resumeFile.size)})
                      </span>
                    </div>) : (<>
                      <p className="font-medium">Drop your resume here or click to browse</p>
                      <p className="mt-1 text-sm text-muted-foreground">PDF or DOCX, max 10MB</p>
                    </>)}
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleResumeContinue} disabled={!portfolioId || isParsingResume}>
                    {isParsingResume ? (<>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        Parsing resume...
                      </>) : (<>
                        {resumeFile ? 'Parse & Continue' : 'Skip Resume'}
                        <ArrowRight className="ml-2 h-4 w-4"/>
                      </>)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>)}

        {currentStep === 'github' && (<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5"/>
                  GitHub Profile
                </CardTitle>
                <CardDescription>
                  {githubFromResume
                ? 'We found a GitHub link in your resume. Confirm or edit it below.'
                : 'We did not find a GitHub URL in your resume. Add one to enrich your portfolio (optional).'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {githubFromResume && (<div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary"/>
                    <span>Detected from your resume</span>
                    <Badge variant="secondary" className="ml-auto">
                      Auto-filled
                    </Badge>
                  </div>)}
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL or username</Label>
                  <Input id="github" placeholder="https://github.com/yourusername" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)}/>
                  {githubUrl && !isGitHubUrlOrUsername(githubUrl) && (<p className="text-sm text-destructive">Enter a valid GitHub URL or username</p>)}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep('resume')}>
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back
                  </Button>
                  <Button onClick={() => setStep('linkedin')}>
                    {githubUrl ? 'Continue' : 'Skip'}
                    <ArrowRight className="ml-2 h-4 w-4"/>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>)}

        {currentStep === 'linkedin' && (<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5"/>
                  LinkedIn Profile
                </CardTitle>
                <CardDescription>
                  {linkedinFromResume
                ? 'We found a LinkedIn link in your resume. Confirm or edit it below.'
                : 'We did not find a LinkedIn URL in your resume. Add your profile URL (optional).'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {linkedinFromResume && (<div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary"/>
                    <span>Detected from your resume</span>
                    <Badge variant="secondary" className="ml-auto">
                      Auto-filled
                    </Badge>
                  </div>)}
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)}/>
                  {linkedinUrl && !isLinkedInUrlOrHandle(linkedinUrl) && (<p className="text-sm text-destructive">Enter a valid LinkedIn URL</p>)}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep('github')}>
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back
                  </Button>
                  <Button onClick={runGeneration} disabled={generatePortfolio.isPending}>
                    Generate Portfolio
                    <SparklesIcon />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>)}

        {currentStep === 'processing' && (<div className="flex flex-col items-center justify-center py-20 text-center">
            {processingPhase === 'error' ? (<>
                <AlertCircle className="mb-4 h-12 w-12 text-destructive"/>
                <h2 className="text-xl font-semibold">Generation failed</h2>
                <p className="mt-2 max-w-md text-muted-foreground">{processingError}</p>
                <Button className="mt-6" onClick={() => setStep('linkedin')}>
                  Try again
                </Button>
              </>) : processingPhase === 'complete' ? (<>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
                  ✓
                </div>
                <h2 className="text-xl font-semibold">Portfolio ready!</h2>
                <p className="mt-2 text-muted-foreground">Redirecting to editor...</p>
              </>) : (<>
                <LoadingSpinner size="lg" label={phaseLabel(processingPhase)}/>
                <p className="mt-6 text-sm text-muted-foreground">
                  This usually takes 15–30 seconds
                </p>
              </>)}
          </div>)}
      </main>
    </div>);
}
function SparklesIcon() {
    return <Loader2 className="ml-2 h-4 w-4 animate-spin"/>;
}
function phaseLabel(phase) {
    switch (phase) {
        case 'parsing':
            return 'Parsing your resume...';
        case 'github':
            return 'Fetching GitHub profile...';
        case 'generating':
            return 'AI is building your portfolio...';
        default:
            return 'Processing...';
    }
}
