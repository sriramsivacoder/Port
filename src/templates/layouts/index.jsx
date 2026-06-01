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
