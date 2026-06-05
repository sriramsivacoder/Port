import { InlineEditable } from '@/components/common/InlineEditable';
import { getInitials } from '@/lib/utils';
export function HeroSection({ content, profileImageUrl, editable, onContentChange, }) {
    const hero = content.hero ?? { title: 'Your Name', subtitle: 'Professional Portfolio' };
    return (<section className="py-[var(--pf-section-padding)]" style={{ fontFamily: 'var(--pf-heading-font)' }}>
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        {(profileImageUrl || hero.title) && (<div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] text-2xl font-bold" style={{ boxShadow: 'var(--pf-shadow)' }}>
            {profileImageUrl ? (<img src={profileImageUrl} alt="" className="h-full w-full object-cover"/>) : (<span style={{ color: 'var(--pf-primary)' }}>{getInitials(hero.title || 'Portfolio')}</span>)}
          </div>)}
        <div className="space-y-3">
          <InlineEditable as="h1" value={hero.title} onChange={(title) => onContentChange?.({ hero: { ...hero, title } })} disabled={!editable} className="text-4xl font-[var(--pf-heading-weight)] tracking-tight text-[var(--pf-primary)] md:text-5xl"/>
          <InlineEditable as="p" value={hero.subtitle} onChange={(subtitle) => onContentChange?.({ hero: { ...hero, subtitle } })} disabled={!editable} className="text-lg text-[var(--pf-text-secondary)] md:text-xl"/>
          {hero.tagline && (<InlineEditable as="p" value={hero.tagline} onChange={(tagline) => onContentChange?.({ hero: { ...hero, tagline } })} disabled={!editable} className="text-sm text-[var(--pf-accent)]"/>)}
        </div>
      </div>
    </section>);
}
