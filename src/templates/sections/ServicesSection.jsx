export function ServicesSection({ content }) {
  const services = Array.isArray(content.services) ? content.services : [];
  if (!services.length) return null;

  return (
    <section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <h2
        className="mb-2 text-xl font-[var(--pf-heading-weight)] sm:text-2xl"
        style={{ fontFamily: 'var(--pf-heading-font)', color: 'var(--pf-primary)' }}
      >
        Services
      </h2>
      <p className="mb-8 text-sm text-[var(--pf-text-secondary)]">
        What I can help you with
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--pf-card-gap)' }}>
        {services.map((service, i) => (
          <div
            key={service.id ?? i}
            className="group flex flex-col rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-5 sm:p-6 transition-all hover:border-[var(--pf-accent)] hover:shadow-md"
            style={{ boxShadow: 'var(--pf-shadow)' }}
          >
            {/* Icon / number */}
            <div
              className="mb-4 flex h-10 w-10 items-center justify-center rounded-[var(--pf-radius)] text-sm font-bold"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--pf-accent) 12%, transparent)',
                color: 'var(--pf-accent)',
              }}
            >
              {service.icon || String(i + 1).padStart(2, '0')}
            </div>

            <h3
              className="mb-2 text-base font-semibold sm:text-lg"
              style={{ fontFamily: 'var(--pf-heading-font)' }}
            >
              {service.title}
            </h3>

            <p className="flex-1 text-sm text-[var(--pf-text-secondary)]">
              {service.description}
            </p>

            {/* Pricing */}
            {service.price && (
              <p className="mt-4 text-lg font-bold" style={{ color: 'var(--pf-accent)' }}>
                {service.price}
              </p>
            )}

            {/* Features list */}
            {service.features && service.features.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {service.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-xs text-[var(--pf-text-secondary)]">
                    <span className="mt-0.5 text-[var(--pf-accent)]">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            {service.ctaUrl && (
              <a
                href={service.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-[var(--pf-radius)] border border-[var(--pf-accent)] px-4 py-2 text-xs font-medium transition-colors hover:bg-[var(--pf-accent)] hover:text-white"
                style={{ color: 'var(--pf-accent)' }}
              >
                {service.ctaText || 'Get Started'}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
