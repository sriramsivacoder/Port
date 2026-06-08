export function TimelineSection({ content }) {
  const timeline = Array.isArray(content.timeline) ? content.timeline : [];
  if (!timeline.length) return null;

  return (
    <section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <h2
        className="mb-8 text-xl font-[var(--pf-heading-weight)] sm:text-2xl"
        style={{ fontFamily: 'var(--pf-heading-font)', color: 'var(--pf-primary)' }}
      >
        Journey
      </h2>

      <div className="relative">
        {/* Vertical spine */}
        <div
          className="absolute left-4 top-0 h-full w-0.5 sm:left-6"
          style={{ backgroundColor: 'var(--pf-border)' }}
        />

        <div className="space-y-6 sm:space-y-8">
          {timeline.map((item, i) => (
            <div key={item.id ?? i} className="relative flex gap-4 sm:gap-6">
              {/* Dot marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold sm:h-12 sm:w-12 sm:text-sm"
                  style={{
                    borderColor: 'var(--pf-accent)',
                    backgroundColor: item.highlight
                      ? 'var(--pf-accent)'
                      : 'var(--pf-bg)',
                    color: item.highlight
                      ? 'var(--pf-bg)'
                      : 'var(--pf-accent)',
                  }}
                >
                  {item.icon || (item.year ?? String(i + 1))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                {/* Date */}
                {item.date && (
                  <p className="mb-1 text-xs font-medium text-[var(--pf-text-secondary)]">
                    {item.date}
                  </p>
                )}

                <h3
                  className="text-sm font-semibold sm:text-base"
                  style={{ fontFamily: 'var(--pf-heading-font)' }}
                >
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="mt-0.5 text-xs font-medium" style={{ color: 'var(--pf-accent)' }}>
                    {item.subtitle}
                  </p>
                )}

                {item.description && (
                  <p className="mt-2 text-sm text-[var(--pf-text-secondary)]">
                    {item.description}
                  </p>
                )}

                {/* Metrics / achievements */}
                {item.metrics && item.metrics.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.metrics.map((metric, mi) => (
                      <span
                        key={mi}
                        className="rounded-full border border-[var(--pf-border)] bg-[var(--pf-surface)] px-2.5 py-0.5 text-xs"
                        style={{ boxShadow: 'var(--pf-shadow)' }}
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
