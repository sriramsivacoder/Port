import { create } from 'zustand';
import { extractSocialUrlsFromResume } from '@/lib/utils';

const initialState = {
    currentStep: 'resume',
    resumeFile: null,
    resumeData: null,
    githubUrl: '',
    linkedinUrl: '',
    githubFromResume: false,
    linkedinFromResume: false,
    isParsingResume: false,
    processingPhase: 'idle',
    processingError: null,
    portfolioId: null,
    // Template classification
    classificationResult: null, // { primaryCategory, confidence, secondaryCategory, recommendedTemplates }
    selectedTemplateId: null,
};

export const useWizardStore = create()((set, get) => ({
    ...initialState,
    setStep: (step) => set({ currentStep: step }),
    setResumeFile: (file) => set({ resumeFile: file }),
    setResumeData: (data) => set({ resumeData: data }),
    applyParsedResume: (data) => {
        const { github, linkedin } = extractSocialUrlsFromResume(data.contact);
        set({
            resumeData: data,
            githubUrl: github,
            linkedinUrl: linkedin,
            githubFromResume: Boolean(github),
            linkedinFromResume: Boolean(linkedin),
        });
    },
    setGithubUrl: (url) => set({ githubUrl: url, githubFromResume: false }),
    setLinkedinUrl: (url) => set({ linkedinUrl: url, linkedinFromResume: false }),
    setIsParsingResume: (parsing) => set({ isParsingResume: parsing }),
    setProcessingPhase: (phase) => set({ processingPhase: phase }),
    setProcessingError: (error) => set({ processingError: error }),
    setPortfolioId: (id) => set({ portfolioId: id }),
    // Template classification
    setClassificationResult: (result) => set({
        classificationResult: result,
        selectedTemplateId: result?.recommendedTemplates?.[0] ?? null,
    }),
    setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
    get recommendedTemplates() {
        return get().classificationResult?.recommendedTemplates ?? [];
    },
    reset: () => set(initialState),
}));
