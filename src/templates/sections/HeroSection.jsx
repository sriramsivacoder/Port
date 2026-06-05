import { InlineEditable } from '@/components/common/InlineEditable';
import { getInitials } from '@/lib/utils';
export function HeroSection({ content, profileImageUrl, editable, onContentChange, }) {
    const hero = content.hero ?? { title: 'Your Name', subtitle: 'Professional Portfolio' };
    return (<section className="py-[var(--pf-section-padding)]" style={{ fontFamily: 'var(--pf-heading-font)' }}>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        {(profileImageUrl || hero.title) && (<div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] text-xl font-bold sm:h-24 sm:w-24 sm:text-2xl" style={{ boxShadow: 'var(--pf-shadow)' }}>
            {profileImageUrl ? (<img
                src={profileImageUrl}
                alt={hero.title ? `${hero.title} profile photo` : 'Profile photo'}
                className="h-full w-full object-cover"
                loading="lazy"
              />) : (<span style={{ color: 'var(--pf-primary)' }}>{getInitials(hero.title || 'Portfolio')}</span>)}
          </div>)}
        <div className="space-y-2 sm:space-y-3 min-w-0">
          <InlineEditable as="h1" value={hero.title} onChange={(title) => onContentChange?.({ hero: { ...hero, title } })} disabled={!editable} className="text-3xl font-[var(--pf-heading-weight)] tracking-tight text-[var(--pf-primary)] sm:text-4xl md:text-5xl"/>
          <InlineEditable as="p" value={hero.subtitle} onChange={(subtitle) => onContentChange?.({ hero: { ...hero, subtitle } })} disabled={!editable} className="text-base text-[var(--pf-text-secondary)] sm:text-lg md:text-xl"/>
          {hero.tagline && (<InlineEditable as="p" value={hero.tagline} onChange={(tagline) => onContentChange?.({ hero: { ...hero, tagline } })} disabled={!editable} className="text-sm text-[var(--pf-accent)]"/>)}
        </div>
      </div>
    </section>);
}
