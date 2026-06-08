export function CaseStudySection({ content }) {
  const caseStudies = Array.isArray(content.caseStudies) ? content.caseStudies : [];
  if (!caseStudies.length) return null;

  return (
    <section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <h2
        className="mb-8 text-xl font-[var(--pf-heading-weight)] sm:text-2xl"
        style={{ fontFamily: 'var(--pf-heading-font)', color: 'var(--pf-primary)' }}
      >
        Case Studies
      </h2>

      <div className="space-y-8 sm:space-y-12">
        {caseStudies.map((study, i) => (
          <article
            key={study.id ?? i}
            className="group rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] overflow-hidden transition-shadow hover:shadow-lg"
            style={{ boxShadow: 'var(--pf-shadow)' }}
          >
            {/* Hero image or gradient */}
            {study.imageUrl ? (
              <div className="aspect-video overflow-hidden">
                <img
                  src={study.imageUrl}
                  alt={study.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            ) : (
              <div
                className="flex aspect-[3/1] items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, var(--pf-accent), color-mix(in srgb, var(--pf-accent) 60%, var(--pf-primary)))`,
                }}
              >
                <span className="text-3xl font-bold text-white/80">{String(i + 1).padStart(2, '0')}</span>
              </div>
            )}

            <div className="p-5 sm:p-8">
              {/* Title & Role */}
              <h3
                className="text-lg font-bold sm:text-xl"
                style={{ fontFamily: 'var(--pf-heading-font)' }}
              >
                {study.title}
              </h3>
              {study.role && (
                <p className="mt-1 text-sm font-medium" style={{ color: 'var(--pf-accent)' }}>
                  {study.role}
                </p>
              )}

              {/* Problem / Solution */}
              {study.problem && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--pf-text-secondary)]">
                    Challenge
                  </h4>
                  <p className="mt-1 text-sm text-[var(--pf-text-secondary)]">{study.problem}</p>
                </div>
              )}

              {study.solution && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--pf-text-secondary)]">
                    Solution
                  </h4>
                  <p className="mt-1 text-sm text-[var(--pf-text-secondary)]">{study.solution}</p>
                </div>
              )}

              {/* Outcome / Metrics */}
              {study.outcome && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--pf-text-secondary)]">
                    Outcome
                  </h4>
                  <p className="mt-1 text-sm text-[var(--pf-text-secondary)]">{study.outcome}</p>
                </div>
              )}

              {/* Process steps */}
              {study.process && study.process.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--pf-text-secondary)]">
                    Process
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {study.process.map((step, si) => (
                      <div
                        key={si}
                        className="flex items-center gap-1.5 rounded-full border border-[var(--pf-border)] px-3 py-1 text-xs"
                      >
                        <span className="font-semibold" style={{ color: 'var(--pf-accent)' }}>{si + 1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools used */}
              {study.tools && study.tools.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {study.tools.map((tool, ti) => (
                    <span
                      key={ti}
                      className="rounded-full border border-[var(--pf-border)] px-2.5 py-0.5 text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}

              {/* Link */}
              {study.url && (
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-medium underline transition-colors hover:text-[var(--pf-accent)]"
                >
                  View Full Case Study →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
