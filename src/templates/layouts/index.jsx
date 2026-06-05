export function NotionTemplate({ children }) {
    return <div className="mx-auto w-full max-w-[var(--pf-max-width)] px-6">{children}</div>;
}
export function MinimalTemplate({ children }) {
    return (<div className="mx-auto w-full max-w-[var(--pf-max-width)] px-8 py-4">
      <div className="space-y-2">{children}</div>
    </div>);
}
export function DeveloperTemplate({ children }) {
    return (<div className="mx-auto w-full max-w-[var(--pf-max-width)] border-x border-[var(--pf-border)] px-6">
      {children}
    </div>);
}
export function ModernTemplate({ children }) {
    return (<div className="mx-auto w-full max-w-[var(--pf-max-width)] px-6">
      <div className="space-y-1">{children}</div>
    </div>);
}
export function CreativeTemplate({ children }) {
    return (<div className="mx-auto w-full max-w-[var(--pf-max-width)] px-6 md:px-10">
      <div className="space-y-4">{children}</div>
    </div>);
}
export function EditorialTemplate({ children }) {
    return (<div className="mx-auto grid w-full max-w-[var(--pf-max-width)] gap-0 px-6 md:px-10 lg:grid-cols-[220px_1fr]">
      <aside className="hidden border-r border-[var(--pf-border)] py-12 pr-8 text-xs uppercase tracking-[0.18em] text-[var(--pf-text-secondary)] lg:block">
        Portfolio
      </aside>
      <div className="lg:pl-10">{children}</div>
    </div>);
}
export function NeonTemplate({ children }) {
    return (<div className="mx-auto w-full max-w-[var(--pf-max-width)] px-4 py-4 md:px-6">
      <div className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)]/80 px-5 md:px-8">
        {children}
      </div>
    </div>);
}
export function ExecutiveTemplate({ children }) {
    return (<div className="mx-auto w-full max-w-[var(--pf-max-width)] px-6 py-6 md:px-8">
      <div className="border border-[var(--pf-border)] bg-[var(--pf-surface)] px-6 md:px-10" style={{ boxShadow: 'var(--pf-shadow)' }}>
        {children}
      </div>
    </div>);
}
