export function TechStackSection({ content }) {
  const skills = Array.isArray(content.skills) ? content.skills : [];
  if (!skills.length) return null;

  return (
    <section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <h2
        className="mb-6 text-xl font-[var(--pf-heading-weight)] sm:text-2xl"
        style={{ fontFamily: 'var(--pf-heading-font)', color: 'var(--pf-primary)' }}
      >
        Tech Stack
      </h2>

      <div className="grid gap-6 sm:gap-8" style={{ gap: 'var(--pf-card-gap)' }}>
        {skills.map((cat, ci) => (
          <div key={cat.id ?? ci}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--pf-text-secondary)]"
                style={{ fontFamily: 'var(--pf-heading-font)', letterSpacing: '0.12em' }}>
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {(cat.skills ?? []).map((skill, si) => (
                <div
                  key={si}
                  className="group relative flex items-center gap-2 rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] px-3 py-2 text-sm transition-all hover:border-[var(--pf-accent)] hover:shadow-md"
                  style={{ boxShadow: 'var(--pf-shadow)' }}
                >
                  {/* Colored dot indicator */}
                  <span
                    className="h-2 w-2 shrink-0 rounded-full transition-transform group-hover:scale-125"
                    style={{ backgroundColor: 'var(--pf-accent)' }}
                  />
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
