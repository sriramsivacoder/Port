export function SocialProofSection({ content }) {
  const socialProof = content.socialProof ?? {};
  const clients = Array.isArray(socialProof.clients) ? socialProof.clients : [];
  const metrics = Array.isArray(socialProof.metrics) ? socialProof.metrics : [];
  const press = Array.isArray(socialProof.press) ? socialProof.press : [];
  const awards = Array.isArray(socialProof.awards) ? socialProof.awards : [];

  const hasContent = clients.length || metrics.length || press.length || awards.length;
  if (!hasContent) return null;

  return (
    <section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      {/* Metrics strip */}
      {metrics.length > 0 && (
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-4 text-center"
              style={{ boxShadow: 'var(--pf-shadow)' }}
            >
              <p className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--pf-accent)' }}>
                {metric.value}
              </p>
              <p className="mt-1 text-xs text-[var(--pf-text-secondary)]">{metric.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Client logos */}
      {clients.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-[var(--pf-text-secondary)]">
            Trusted By
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {clients.map((client, i) => (
              <div key={i} className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100">
                {client.logoUrl ? (
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="h-8 max-w-[120px] object-contain grayscale transition-all hover:grayscale-0"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-sm font-medium text-[var(--pf-text-secondary)]">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Press mentions */}
      {press.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--pf-text-secondary)]">
            Featured In
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {press.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[var(--pf-radius)] border border-[var(--pf-border)] p-3 transition-colors hover:border-[var(--pf-accent)]"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-xs font-bold"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--pf-accent) 12%, transparent)',
                    color: 'var(--pf-accent)',
                  }}
                >
                  📰
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="truncate text-xs text-[var(--pf-text-secondary)]">{item.source}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {awards.length > 0 && (
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--pf-text-secondary)]">
            Awards & Recognition
          </h3>
          <div className="flex flex-wrap gap-3">
            {awards.map((award, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] px-3 py-2"
                style={{ boxShadow: 'var(--pf-shadow)' }}
              >
                <span style={{ color: 'var(--pf-accent)' }}>🏆</span>
                <div>
                  <p className="text-sm font-medium">{award.title}</p>
                  {award.year && <p className="text-xs text-[var(--pf-text-secondary)]">{award.year}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
