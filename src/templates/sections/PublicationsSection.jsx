export function PublicationsSection({ content }) {
  const publications = Array.isArray(content.publications) ? content.publications : [];
  if (!publications.length) return null;

  return (
    <section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <h2
        className="mb-6 text-xl font-[var(--pf-heading-weight)] sm:text-2xl"
        style={{ fontFamily: 'var(--pf-heading-font)', color: 'var(--pf-primary)' }}
      >
        Publications
      </h2>

      <div className="space-y-4">
        {publications.map((pub, i) => (
          <article
            key={pub.id ?? i}
            className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-4 sm:p-5"
            style={{ boxShadow: 'var(--pf-shadow)' }}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="flex-1">
                {/* Title */}
                <h3
                  className="text-sm font-semibold leading-snug sm:text-base"
                  style={{ fontFamily: 'var(--pf-heading-font)' }}
                >
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-[var(--pf-accent)]"
                    >
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                </h3>

                {/* Authors */}
                {pub.authors && (
                  <p className="mt-1 text-xs text-[var(--pf-text-secondary)]">
                    {pub.authors}
                  </p>
                )}

                {/* Journal / Conference */}
                <p className="mt-1 text-xs italic text-[var(--pf-text-secondary)]">
                  {pub.venue || pub.journal || pub.conference}
                  {pub.year && <span> · {pub.year}</span>}
                </p>
              </div>

              {/* Citation count */}
              {pub.citations != null && (
                <div className="flex items-center gap-1 self-start sm:self-center">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--pf-accent) 12%, transparent)',
                      color: 'var(--pf-accent)',
                    }}
                  >
                    {pub.citations} cited
                  </span>
                </div>
              )}
            </div>

            {/* Abstract (truncated) */}
            {pub.abstract && (
              <p className="mt-2 text-xs text-[var(--pf-text-secondary)] line-clamp-2">
                {pub.abstract}
              </p>
            )}

            {/* Tags / Keywords */}
            {pub.keywords && pub.keywords.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {pub.keywords.map((kw, ki) => (
                  <span
                    key={ki}
                    className="rounded-full border border-[var(--pf-border)] px-2 py-0.5 text-[10px]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}

            {/* DOI link */}
            {pub.doi && (
              <a
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-[var(--pf-accent)] underline hover:opacity-80"
              >
                DOI: {pub.doi}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
