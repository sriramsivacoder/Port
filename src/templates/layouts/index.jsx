// ============================================================================
// Template Layouts — Structurally unique layout wrappers per template variant
// ============================================================================

// ===================== DEVELOPER FAMILY =====================
export function DevTerminalLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] border-x-0 sm:border-x border-[var(--pf-border)] px-4 sm:px-6">
      {children}
    </div>
  );
}

export function DevMinimalLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 py-4 sm:px-6 md:px-8">
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ===================== STUDENT FAMILY =====================
export function StudentModernLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6 md:px-8">
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function StudentCampusLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6">
      <div className="relative">
        {/* Center spine for desktop */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[var(--pf-border)] lg:block" />
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

// ===================== UI/UX DESIGNER FAMILY =====================
export function DesignerCaseStudyLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6 md:px-10">
      <div className="space-y-0">{children}</div>
    </div>
  );
}

export function DesignerShowcaseLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6 md:px-8">
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// ===================== GRAPHIC DESIGNER FAMILY =====================
export function GraphicMasonryLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-2 sm:px-4">
      {children}
    </div>
  );
}

export function GraphicSpotlightLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6 md:px-10">
      <div className="space-y-0">{children}</div>
    </div>
  );
}

// ===================== FREELANCER FAMILY =====================
export function FreelancerConvertLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6 md:px-8">
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function FreelancerAgencyLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6 md:px-8">
      <div className="space-y-1">{children}</div>
    </div>
  );
}

// ===================== FOUNDER FAMILY =====================
export function FounderExecutiveLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-3 py-4 sm:px-6 md:px-8">
      <div
        className="border border-[var(--pf-border)] bg-[var(--pf-surface)] px-4 sm:px-6 md:px-10"
        style={{ boxShadow: 'var(--pf-shadow)' }}
      >
        {children}
      </div>
    </div>
  );
}

export function FounderTimelineLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6 md:px-10">
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ===================== PHOTOGRAPHER FAMILY =====================
export function PhotoGalleryLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-0 sm:px-2">
      {children}
    </div>
  );
}

export function PhotoStoryLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-0 sm:px-4 md:px-6">
      <div className="space-y-0">{children}</div>
    </div>
  );
}

// ===================== CONTENT CREATOR FAMILY =====================
export function CreatorMediaLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6">
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export function CreatorHubLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6 md:px-8">
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// ===================== RESEARCHER FAMILY =====================
export function ResearcherAcademicLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6">
      {children}
    </div>
  );
}

export function ResearcherModernLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 py-4 sm:px-6 md:px-8">
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ===================== HYBRID FAMILY =====================
export function HybridFlexLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 sm:px-6 md:px-8">
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ===================== LEGACY COMPAT =====================
// Keep the old names around for backward compat in case
// any saved portfolio still references them directly.
export const NotionTemplate = DevMinimalLayout;
export const MinimalTemplate = DevMinimalLayout;
export const DeveloperTemplate = DevTerminalLayout;
export const ModernTemplate = StudentModernLayout;
export const CreativeTemplate = DesignerShowcaseLayout;
export const EditorialTemplate = ResearcherAcademicLayout;
export const NeonTemplate = DevTerminalLayout;
export const ExecutiveTemplate = FounderExecutiveLayout;

// ===================== LAYOUT MAP =====================
export const LAYOUT_MAP = {
  // New template IDs
  'dev-terminal': DevTerminalLayout,
  'dev-minimal': DevMinimalLayout,
  'student-modern': StudentModernLayout,
  'student-campus': StudentCampusLayout,
  'designer-casestudy': DesignerCaseStudyLayout,
  'designer-showcase': DesignerShowcaseLayout,
  'graphic-masonry': GraphicMasonryLayout,
  'graphic-spotlight': GraphicSpotlightLayout,
  'freelancer-convert': FreelancerConvertLayout,
  'freelancer-agency': FreelancerAgencyLayout,
  'founder-executive': FounderExecutiveLayout,
  'founder-timeline': FounderTimelineLayout,
  'photo-gallery': PhotoGalleryLayout,
  'photo-story': PhotoStoryLayout,
  'creator-media': CreatorMediaLayout,
  'creator-hub': CreatorHubLayout,
  'researcher-academic': ResearcherAcademicLayout,
  'researcher-modern': ResearcherModernLayout,
  'hybrid-flex': HybridFlexLayout,
  // Legacy template IDs
  notion: DevMinimalLayout,
  minimal: DevMinimalLayout,
  developer: DevTerminalLayout,
  modern: StudentModernLayout,
  creative: DesignerShowcaseLayout,
  editorial: ResearcherAcademicLayout,
  neon: DevTerminalLayout,
  executive: FounderExecutiveLayout,
};
