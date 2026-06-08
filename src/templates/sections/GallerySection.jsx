import { useState } from 'react';

export function GallerySection({ content }) {
  const gallery = Array.isArray(content.gallery) ? content.gallery : [];
  if (!gallery.length) return null;

  const [lightbox, setLightbox] = useState(null);

  const categories = [...new Set(gallery.map((item) => item.category).filter(Boolean))];
  const [activeCategory, setActiveCategory] = useState(null);
  const filtered = activeCategory
    ? gallery.filter((item) => item.category === activeCategory)
    : gallery;

  return (
    <section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <h2
        className="mb-6 text-xl font-[var(--pf-heading-weight)] sm:text-2xl"
        style={{ fontFamily: 'var(--pf-heading-font)', color: 'var(--pf-primary)' }}
      >
        Gallery
      </h2>

      {/* Category filter */}
      {categories.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !activeCategory
                ? 'bg-[var(--pf-primary)] text-[var(--pf-bg)]'
                : 'border border-[var(--pf-border)] text-[var(--pf-text-secondary)] hover:border-[var(--pf-accent)]'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-[var(--pf-primary)] text-[var(--pf-bg)]'
                  : 'border border-[var(--pf-border)] text-[var(--pf-text-secondary)] hover:border-[var(--pf-accent)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Masonry grid */}
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3" style={{ gap: 'var(--pf-card-gap)' }}>
        {filtered.map((item, i) => (
          <button
            key={item.id ?? i}
            type="button"
            onClick={() => setLightbox(item)}
            className="group mb-3 block w-full overflow-hidden rounded-[var(--pf-radius)] border border-[var(--pf-border)] break-inside-avoid transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pf-accent)]"
          >
            <div className="relative overflow-hidden">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title || `Gallery item ${i + 1}`}
                  className="w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex aspect-square items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, var(--pf-accent), color-mix(in srgb, var(--pf-accent) 40%, var(--pf-primary)))`,
                  }}
                >
                  <span className="text-4xl font-bold text-white/40">{String(i + 1).padStart(2, '0')}</span>
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <div className="p-3 text-left">
                  {item.title && <p className="text-sm font-semibold text-white">{item.title}</p>}
                  {item.category && <p className="text-xs text-white/70">{item.category}</p>}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            {lightbox.imageUrl ? (
              <img
                src={lightbox.imageUrl}
                alt={lightbox.title || 'Gallery image'}
                className="max-h-[85vh] max-w-full rounded object-contain"
              />
            ) : (
              <div className="flex h-64 w-96 items-center justify-center rounded bg-gray-800 text-white">
                No image available
              </div>
            )}
            {lightbox.title && (
              <p className="mt-3 text-center text-sm text-white/80">{lightbox.title}</p>
            )}
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
