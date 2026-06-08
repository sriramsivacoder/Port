import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'motion/react';
import { Upload, Github, Linkedin, ArrowRight, ArrowLeft, FileText, Loader2, AlertCircle, CheckCircle2, Sparkles, Star, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useWizardStore } from '@/stores/wizard.store';
import { useCreatePortfolio, useUploadResume, useEnrichGitHub, useGeneratePortfolio, useUpdatePortfolio, useClassifyProfile, } from '@/hooks/usePortfolio';
import { WIZARD_STEPS, ACCEPTED_RESUME_TYPES, MAX_RESUME_SIZE } from '@/lib/constants';
import { formatFileSize, isGitHubUrlOrUsername, isLinkedInUrlOrHandle, normalizeGitHubUrl, normalizeLinkedInUrl, } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { TEMPLATE_FAMILIES, getTemplatesByFamily, getTemplateConfig } from '@/templates/templateRegistry';

const FAMILY_ICONS = {
  developer: '💻', student: '🎓', 'uiux-designer': '🎨', 'graphic-designer': '🖌️',
  freelancer: '💼', founder: '🚀', photographer: '📷', 'content-creator': '🎬',
  researcher: '📚', hybrid: '⚡',
};

export function WizardPage() {
    const navigate = useNavigate();
    const {
        currentStep, resumeFile, resumeData, githubUrl, linkedinUrl,
        githubFromResume, linkedinFromResume, isParsingResume,
        processingPhase, processingError, portfolioId,
        classificationResult, selectedTemplateId,
        setStep, setResumeFile, applyParsedResume, setGithubUrl, setLinkedinUrl,
        setIsParsingResume, setProcessingPhase, setProcessingError, setPortfolioId,
        setClassificationResult, setSelectedTemplateId,
    } = useWizardStore();

    const createPortfolio = useCreatePortfolio();
    const uploadResume = useUploadResume();
    const enrichGitHub = useEnrichGitHub();
    const generatePortfolio = useGeneratePortfolio();
    const updatePortfolio = useUpdatePortfolio();
    const classifyProfile = useClassifyProfile();

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

    const handleLinkedinContinue = async () => {
        if (!portfolioId) return;

        // Save LinkedIn data if provided
        const li = normalizeLinkedInUrl(linkedinUrl);
        if (li) {
            try {
                await updatePortfolio.mutateAsync({
                    portfolioId,
                    updates: { linkedinData: { url: li } },
                });
            } catch { /* best effort */ }
        }

        // Run classification
        try {
            const result = await classifyProfile.mutateAsync({ portfolioId });
            setClassificationResult(result);
        } catch {
            // Classification is optional — proceed without it
            setClassificationResult(null);
        }

        setStep('template');
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
            const templateId = selectedTemplateId ?? 'dev-minimal';
            await generatePortfolio.mutateAsync({ portfolioId, templateId });
            setProcessingPhase('complete');
            setTimeout(() => navigate(`/editor/${portfolioId}`), 800);
        }
        catch (err) {
            setProcessingPhase('error');
            setProcessingError(err instanceof Error ? err.message : 'Generation failed');
        }
    };

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <h1 className="text-lg font-semibold">PortfolioForge</h1>
            <div className="flex gap-1">
              {WIZARD_STEPS.map((step, i) => (
                <div key={step.id} className={`h-1.5 w-8 rounded-full transition-colors ${i <= stepIndex ? 'bg-primary' : 'bg-muted'}`} />
              ))}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12">
          {currentStep === 'resume' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
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
                    <input {...getInputProps()} />
                    <Upload className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-medium">{resumeFile.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ({formatFileSize(resumeFile.size)})
                        </span>
                      </div>
                    ) : (
                      <>
                        <p className="font-medium">Drop your resume here or click to browse</p>
                        <p className="mt-1 text-sm text-muted-foreground">PDF or DOCX, max 10MB</p>
                      </>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleResumeContinue} disabled={!portfolioId || isParsingResume}>
                      {isParsingResume ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Parsing resume...
                        </>
                      ) : (
                        <>
                          {resumeFile ? 'Parse & Continue' : 'Skip Resume'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'github' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    GitHub Profile
                  </CardTitle>
                  <CardDescription>
                    {githubFromResume
                      ? 'We found a GitHub link in your resume. Confirm or edit it below.'
                      : 'We did not find a GitHub URL in your resume. Add one to enrich your portfolio (optional).'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {githubFromResume && (
                    <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      <span>Detected from your resume</span>
                      <Badge variant="secondary" className="ml-auto">Auto-filled</Badge>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub URL or username</Label>
                    <Input id="github" placeholder="https://github.com/yourusername" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
                    {githubUrl && !isGitHubUrlOrUsername(githubUrl) && (
                      <p className="text-sm text-destructive">Enter a valid GitHub URL or username</p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep('resume')}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={() => setStep('linkedin')}>
                      {githubUrl ? 'Continue' : 'Skip'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'linkedin' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Linkedin className="h-5 w-5" />
                    LinkedIn Profile
                  </CardTitle>
                  <CardDescription>
                    {linkedinFromResume
                      ? 'We found a LinkedIn link in your resume. Confirm or edit it below.'
                      : 'We did not find a LinkedIn URL in your resume. Add your profile URL (optional).'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {linkedinFromResume && (
                    <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      <span>Detected from your resume</span>
                      <Badge variant="secondary" className="ml-auto">Auto-filled</Badge>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
                    {linkedinUrl && !isLinkedInUrlOrHandle(linkedinUrl) && (
                      <p className="text-sm text-destructive">Enter a valid LinkedIn URL</p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep('github')}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleLinkedinContinue} disabled={classifyProfile.isPending}>
                      {classifyProfile.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing profile...
                        </>
                      ) : (
                        <>
                          Continue to Templates
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'template' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Choose Your Template
                  </CardTitle>
                  <CardDescription>
                    {classificationResult ? (
                      <>
                        Based on your profile, we think you're a{' '}
                        <strong className="text-foreground">
                          {TEMPLATE_FAMILIES.find((f) => f.id === classificationResult.primaryCategory)?.name ?? classificationResult.primaryCategory}
                        </strong>
                        {classificationResult.confidence > 0 && (
                          <> ({classificationResult.confidence}% confidence)</>
                        )}
                        . Pick a template below, or browse all options.
                      </>
                    ) : (
                      'Select the template family that best matches your profession.'
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Recommended templates */}
                  {classificationResult?.recommendedTemplates?.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-sm font-semibold">
                        <Star className="h-4 w-4 text-primary" />
                        Recommended for you
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {classificationResult.recommendedTemplates.map((tplId) => {
                          const config = getTemplateConfig(tplId);
                          const isSelected = selectedTemplateId === tplId;
                          return (
                            <button
                              key={tplId}
                              type="button"
                              onClick={() => setSelectedTemplateId(tplId)}
                              className={cn(
                                'rounded-xl border-2 p-4 text-left transition-all',
                                isSelected
                                  ? 'border-primary bg-primary/5 shadow-sm'
                                  : 'border-border hover:border-primary/40',
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{FAMILY_ICONS[config.family] ?? '📄'}</span>
                                <div>
                                  <div className="font-semibold text-sm">{config.name}</div>
                                  <div className="text-xs text-muted-foreground capitalize">{config.family.replace(/-/g, ' ')}</div>
                                </div>
                                {isSelected && <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />}
                              </div>
                              <p className="mt-2 text-xs text-muted-foreground">{config.description}</p>
                              <div className="mt-2 flex gap-1">
                                <span className="h-3 w-3 rounded-full border" style={{ backgroundColor: config.colors.light.accent }} />
                                <span className="h-3 w-3 rounded-full border" style={{ backgroundColor: config.colors.light.primary }} />
                                <span className="h-3 w-3 rounded-full border" style={{ backgroundColor: config.colors.light.surface }} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Browse all families */}
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">All Template Families</div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {TEMPLATE_FAMILIES.map((family) => {
                        const variants = getTemplatesByFamily(family.id);
                        const isRecommended = classificationResult?.primaryCategory === family.id;
                        const familyHasSelection = variants.some((v) => v.id === selectedTemplateId);

                        return (
                          <div key={family.id} className={cn(
                            'rounded-xl border p-3 transition-all',
                            familyHasSelection ? 'border-primary bg-primary/5' : 'border-border',
                          )}>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-base">{FAMILY_ICONS[family.id] ?? '📄'}</span>
                              <span className="text-sm font-semibold">{family.name}</span>
                              {isRecommended && (
                                <Badge variant="secondary" className="ml-auto text-[10px]">
                                  <Star className="mr-0.5 h-2.5 w-2.5" />
                                  Match
                                </Badge>
                              )}
                            </div>
                            <div className="space-y-1">
                              {variants.map((variant) => {
                                const isSelected = selectedTemplateId === variant.id;
                                return (
                                  <button
                                    key={variant.id}
                                    type="button"
                                    onClick={() => setSelectedTemplateId(variant.id)}
                                    className={cn(
                                      'flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors',
                                      isSelected
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted',
                                    )}
                                  >
                                    <span className="h-2.5 w-2.5 rounded-full border" style={{
                                      backgroundColor: variant.colors.light.accent,
                                      borderColor: isSelected ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)',
                                    }} />
                                    <span className="font-medium">{variant.name}</span>
                                    {isSelected && <CheckCircle2 className="ml-auto h-3.5 w-3.5" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button variant="outline" onClick={() => setStep('linkedin')}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={runGeneration} disabled={generatePortfolio.isPending}>
                      Generate Portfolio
                      <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'processing' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              {processingPhase === 'error' ? (
                <>
                  <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
                  <h2 className="text-xl font-semibold">Generation failed</h2>
                  <p className="mt-2 max-w-md text-muted-foreground">{processingError}</p>
                  <Button className="mt-6" onClick={() => setStep('template')}>
                    Try again
                  </Button>
                </>
              ) : processingPhase === 'complete' ? (
                <>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
                    ✓
                  </div>
                  <h2 className="text-xl font-semibold">Portfolio ready!</h2>
                  <p className="mt-2 text-muted-foreground">Redirecting to editor...</p>
                </>
              ) : (
                <>
                  <LoadingSpinner size="lg" label={phaseLabel(processingPhase)} />
                  <p className="mt-6 text-sm text-muted-foreground">
                    This usually takes 15–30 seconds
                  </p>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    );
}

function phaseLabel(phase) {
    switch (phase) {
        case 'parsing':
            return 'Parsing your resume...';
        case 'github':
            return 'Fetching GitHub profile...';
        case 'classifying':
            return 'Analyzing your profession...';
        case 'generating':
            return 'AI is building your portfolio...';
        default:
            return 'Processing...';
    }
}
