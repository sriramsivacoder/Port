import { InlineEditable } from '@/components/common/InlineEditable';
import { getInitials } from '@/lib/utils';

function StandardHero({ hero, profileImageUrl, editable, onContentChange }) {
  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
      {(profileImageUrl || hero.title) && (
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] text-xl font-bold sm:h-24 sm:w-24 sm:text-2xl"
          style={{ boxShadow: 'var(--pf-shadow)' }}
        >
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={hero.title ? `${hero.title} profile photo` : 'Profile photo'}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span style={{ color: 'var(--pf-primary)' }}>
              {getInitials(hero.title || 'Portfolio')}
            </span>
          )}
        </div>
      )}
      <div className="space-y-2 sm:space-y-3 min-w-0">
        <InlineEditable
          as="h1"
          value={hero.title}
          onChange={(title) => onContentChange?.({ hero: { ...hero, title } })}
          disabled={!editable}
          className="text-3xl font-[var(--pf-heading-weight)] tracking-tight text-[var(--pf-primary)] sm:text-4xl md:text-5xl"
        />
        <InlineEditable
          as="p"
          value={hero.subtitle}
          onChange={(subtitle) => onContentChange?.({ hero: { ...hero, subtitle } })}
          disabled={!editable}
          className="text-base text-[var(--pf-text-secondary)] sm:text-lg md:text-xl"
        />
        {hero.tagline && (
          <InlineEditable
            as="p"
            value={hero.tagline}
            onChange={(tagline) => onContentChange?.({ hero: { ...hero, tagline } })}
            disabled={!editable}
            className="text-sm text-[var(--pf-accent)]"
          />
        )}
      </div>
    </div>
  );
}

function FullscreenHero({ hero, profileImageUrl, editable, onContentChange }) {
  return (
    <div className="relative flex min-h-[60vh] items-center justify-center text-center sm:min-h-[70vh]">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, var(--pf-accent) 15%, var(--pf-bg)), var(--pf-bg) 60%, color-mix(in srgb, var(--pf-primary) 8%, var(--pf-bg)))`,
        }}
      />
      <div className="relative z-10 max-w-3xl px-4">
        {profileImageUrl && (
          <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-2 border-[var(--pf-border)] sm:h-32 sm:w-32">
            <img src={profileImageUrl} alt="Profile" className="h-full w-full object-cover" loading="lazy" />
          </div>
        )}
        <InlineEditable
          as="h1"
          value={hero.title}
          onChange={(title) => onContentChange?.({ hero: { ...hero, title } })}
          disabled={!editable}
          className="text-4xl font-[var(--pf-heading-weight)] tracking-tight text-[var(--pf-primary)] sm:text-5xl md:text-6xl"
        />
        <InlineEditable
          as="p"
          value={hero.subtitle}
          onChange={(subtitle) => onContentChange?.({ hero: { ...hero, subtitle } })}
          disabled={!editable}
          className="mx-auto mt-4 max-w-xl text-base text-[var(--pf-text-secondary)] sm:text-lg md:text-xl"
        />
        {hero.tagline && (
          <InlineEditable
            as="p"
            value={hero.tagline}
            onChange={(tagline) => onContentChange?.({ hero: { ...hero, tagline } })}
            disabled={!editable}
            className="mx-auto mt-3 text-sm text-[var(--pf-accent)]"
          />
        )}
        {hero.ctaText && (
          <a
            href={hero.ctaUrl || '#projects'}
            className="mt-6 inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold transition-transform hover:scale-105"
            style={{
              backgroundColor: 'var(--pf-accent)',
              color: 'var(--pf-bg)',
            }}
          >
            {hero.ctaText}
          </a>
        )}
      </div>
    </div>
  );
}

function SplitHero({ hero, profileImageUrl, editable, onContentChange }) {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
      <div className="flex-1 space-y-4">
        <InlineEditable
          as="h1"
          value={hero.title}
          onChange={(title) => onContentChange?.({ hero: { ...hero, title } })}
          disabled={!editable}
          className="text-3xl font-[var(--pf-heading-weight)] tracking-tight text-[var(--pf-primary)] sm:text-4xl md:text-5xl"
        />
        <InlineEditable
          as="p"
          value={hero.subtitle}
          onChange={(subtitle) => onContentChange?.({ hero: { ...hero, subtitle } })}
          disabled={!editable}
          className="text-base text-[var(--pf-text-secondary)] sm:text-lg"
        />
        {hero.tagline && (
          <InlineEditable
            as="p"
            value={hero.tagline}
            onChange={(tagline) => onContentChange?.({ hero: { ...hero, tagline } })}
            disabled={!editable}
            className="text-sm text-[var(--pf-accent)]"
          />
        )}
        {hero.ctaText && (
          <a
            href={hero.ctaUrl || '#projects'}
            className="mt-2 inline-flex items-center rounded-[var(--pf-radius)] px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--pf-accent)', color: 'var(--pf-bg)' }}
          >
            {hero.ctaText}
          </a>
        )}
      </div>
      {profileImageUrl && (
        <div className="flex-shrink-0 sm:w-1/3">
          <div className="overflow-hidden rounded-[var(--pf-radius)] border border-[var(--pf-border)]" style={{ boxShadow: 'var(--pf-shadow)' }}>
            <img src={profileImageUrl} alt="Profile" className="w-full object-cover" loading="lazy" />
          </div>
        </div>
      )}
    </div>
  );
}

function TerminalHero({ hero, profileImageUrl, editable, onContentChange }) {
  return (
    <div className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] overflow-hidden" style={{ boxShadow: 'var(--pf-shadow)' }}>
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-[var(--pf-border)] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
        <span className="ml-2 text-xs text-[var(--pf-text-secondary)]" style={{ fontFamily: 'var(--pf-heading-font)' }}>
          portfolio.sh
        </span>
      </div>
      {/* Terminal body */}
      <div className="p-4 sm:p-6" style={{ fontFamily: 'var(--pf-heading-font)' }}>
        <div className="flex items-start gap-2">
          <span style={{ color: 'var(--pf-accent)' }}>❯</span>
          <div className="min-w-0">
            <InlineEditable
              as="h1"
              value={hero.title}
              onChange={(title) => onContentChange?.({ hero: { ...hero, title } })}
              disabled={!editable}
              className="text-2xl font-[var(--pf-heading-weight)] text-[var(--pf-primary)] sm:text-3xl md:text-4xl"
            />
          </div>
        </div>
        <div className="mt-2 flex items-start gap-2">
          <span className="text-[var(--pf-text-secondary)]">#</span>
          <InlineEditable
            as="p"
            value={hero.subtitle}
            onChange={(subtitle) => onContentChange?.({ hero: { ...hero, subtitle } })}
            disabled={!editable}
            className="text-sm text-[var(--pf-text-secondary)] sm:text-base"
          />
        </div>
        {hero.tagline && (
          <div className="mt-1 flex items-start gap-2">
            <span className="text-[var(--pf-text-secondary)]">//</span>
            <InlineEditable
              as="p"
              value={hero.tagline}
              onChange={(tagline) => onContentChange?.({ hero: { ...hero, tagline } })}
              disabled={!editable}
              className="text-xs text-[var(--pf-accent)]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function MinimalCenteredHero({ hero, profileImageUrl, editable, onContentChange }) {
  return (
    <div className="text-center py-8 sm:py-12">
      {profileImageUrl && (
        <div className="mx-auto mb-6 h-20 w-20 overflow-hidden rounded-full border border-[var(--pf-border)] sm:h-28 sm:w-28">
          <img src={profileImageUrl} alt="Profile" className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
      <InlineEditable
        as="h1"
        value={hero.title}
        onChange={(title) => onContentChange?.({ hero: { ...hero, title } })}
        disabled={!editable}
        className="text-3xl font-[var(--pf-heading-weight)] tracking-tight text-[var(--pf-primary)] sm:text-4xl md:text-5xl"
      />
      <InlineEditable
        as="p"
        value={hero.subtitle}
        onChange={(subtitle) => onContentChange?.({ hero: { ...hero, subtitle } })}
        disabled={!editable}
        className="mx-auto mt-3 max-w-xl text-base text-[var(--pf-text-secondary)] sm:text-lg"
      />
      {hero.tagline && (
        <InlineEditable
          as="p"
          value={hero.tagline}
          onChange={(tagline) => onContentChange?.({ hero: { ...hero, tagline } })}
          disabled={!editable}
          className="mx-auto mt-2 text-sm text-[var(--pf-accent)]"
        />
      )}
    </div>
  );
}

function GalleryHeroVariant({ hero, profileImageUrl, editable, onContentChange }) {
  return (
    <div className="relative -mx-4 flex min-h-[50vh] items-end sm:-mx-6 sm:min-h-[60vh] md:-mx-8 lg:-mx-10">
      {/* Background image */}
      <div className="absolute inset-0 bg-[var(--pf-surface)]">
        {profileImageUrl && (
          <img src={profileImageUrl} alt="" className="h-full w-full object-cover opacity-80" loading="lazy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      <div className="relative z-10 w-full px-6 pb-8 sm:px-10 sm:pb-12">
        <InlineEditable
          as="h1"
          value={hero.title}
          onChange={(title) => onContentChange?.({ hero: { ...hero, title } })}
          disabled={!editable}
          className="text-3xl font-[var(--pf-heading-weight)] tracking-tight text-white sm:text-4xl md:text-5xl"
        />
        <InlineEditable
          as="p"
          value={hero.subtitle}
          onChange={(subtitle) => onContentChange?.({ hero: { ...hero, subtitle } })}
          disabled={!editable}
          className="mt-2 max-w-xl text-base text-white/80 sm:text-lg"
        />
      </div>
    </div>
  );
}

const HERO_VARIANTS = {
  standard: StandardHero,
  fullscreen: FullscreenHero,
  split: SplitHero,
  terminal: TerminalHero,
  'minimal-centered': MinimalCenteredHero,
  'gallery-hero': GalleryHeroVariant,
};

export function HeroSection({ content, profileImageUrl, editable, onContentChange, variant = 'standard' }) {
  const hero = content.hero ?? { title: 'Your Name', subtitle: 'Professional Portfolio' };
  const HeroVariant = HERO_VARIANTS[variant] || HERO_VARIANTS.standard;

  return (
    <section className="py-[var(--pf-section-padding)]" style={{ fontFamily: 'var(--pf-heading-font)' }}>
      <HeroVariant
        hero={hero}
        profileImageUrl={profileImageUrl}
        editable={editable}
        onContentChange={onContentChange}
      />
    </section>
  );
}
