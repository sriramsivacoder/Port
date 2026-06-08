export function TestimonialsSection({ content }) {
  const testimonials = Array.isArray(content.testimonials) ? content.testimonials : [];
  if (!testimonials.length) return null;

  return (
    <section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <h2
        className="mb-8 text-xl font-[var(--pf-heading-weight)] sm:text-2xl"
        style={{ fontFamily: 'var(--pf-heading-font)', color: 'var(--pf-primary)' }}
      >
        Testimonials
      </h2>

      <div className="grid gap-4 sm:grid-cols-2" style={{ gap: 'var(--pf-card-gap)' }}>
        {testimonials.map((testimonial, i) => (
          <div
            key={testimonial.id ?? i}
            className="flex flex-col rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-5 sm:p-6"
            style={{ boxShadow: 'var(--pf-shadow)' }}
          >
            {/* Quote mark */}
            <span
              className="mb-3 text-3xl leading-none font-serif"
              style={{ color: 'var(--pf-accent)', opacity: 0.5 }}
              aria-hidden="true"
            >
              "
            </span>

            {/* Quote text */}
            <blockquote className="flex-1 text-sm italic text-[var(--pf-text-secondary)] sm:text-base">
              {testimonial.quote}
            </blockquote>

            {/* Attribution */}
            <div className="mt-4 flex items-center gap-3 border-t border-[var(--pf-border)] pt-4">
              {testimonial.avatarUrl ? (
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--pf-accent) 15%, transparent)',
                    color: 'var(--pf-accent)',
                  }}
                >
                  {(testimonial.name || 'A').charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold">{testimonial.name}</p>
                {(testimonial.title || testimonial.company) && (
                  <p className="text-xs text-[var(--pf-text-secondary)]">
                    {testimonial.title}{testimonial.title && testimonial.company ? ' · ' : ''}{testimonial.company}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
