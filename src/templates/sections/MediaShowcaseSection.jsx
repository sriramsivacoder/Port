export function MediaShowcaseSection({ content }) {
  const media = Array.isArray(content.mediaShowcase) ? content.mediaShowcase : [];
  if (!media.length) return null;

  const categories = [...new Set(media.map((m) => m.type).filter(Boolean))];

  return (
    <section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <h2
        className="mb-6 text-xl font-[var(--pf-heading-weight)] sm:text-2xl"
        style={{ fontFamily: 'var(--pf-heading-font)', color: 'var(--pf-primary)' }}
      >
        Featured Content
      </h2>

      {/* Category counts */}
      {categories.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-[var(--pf-border)] px-3 py-1 text-xs text-[var(--pf-text-secondary)]"
            >
              {cat}: {media.filter((m) => m.type === cat).length}
            </span>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--pf-card-gap)' }}>
        {media.map((item, i) => (
          <a
            key={item.id ?? i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] transition-all hover:border-[var(--pf-accent)] hover:shadow-lg"
            style={{ boxShadow: 'var(--pf-shadow)' }}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-[var(--pf-border)]">
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title || `Content ${i + 1}`}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, var(--pf-accent), color-mix(in srgb, var(--pf-accent) 50%, var(--pf-primary)))`,
                  }}
                >
                  <span className="text-2xl text-white/60">
                    {item.type === 'video' ? '▶' : item.type === 'podcast' ? '🎙' : '📝'}
                  </span>
                </div>
              )}

              {/* Play button overlay for videos */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
                    <span className="ml-0.5 text-white">▶</span>
                  </div>
                </div>
              )}

              {/* Duration badge */}
              {item.duration && (
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  {item.duration}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-3 sm:p-4">
              <h3
                className="text-sm font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-[var(--pf-accent)]"
                style={{ fontFamily: 'var(--pf-heading-font)' }}
              >
                {item.title}
              </h3>

              <div className="mt-1.5 flex items-center gap-2 text-xs text-[var(--pf-text-secondary)]">
                {item.type && (
                  <span className="rounded-full border border-[var(--pf-border)] px-2 py-0.5 capitalize">
                    {item.type}
                  </span>
                )}
                {item.date && <span>{item.date}</span>}
              </div>

              {item.description && (
                <p className="mt-2 text-xs text-[var(--pf-text-secondary)] line-clamp-2">
                  {item.description}
                </p>
              )}

              {/* View count */}
              {item.views != null && (
                <p className="mt-2 text-xs text-[var(--pf-text-secondary)]">
                  {item.views.toLocaleString()} views
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
