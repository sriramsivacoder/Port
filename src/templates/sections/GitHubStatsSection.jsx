import { InlineEditable } from '@/components/common/InlineEditable';

export function GitHubStatsSection({ content }) {
  const github = content.githubStats ?? content.github ?? {};
  const repos = Array.isArray(github.repos) ? github.repos : [];
  const languages = github.languages ?? {};

  const topLangs = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const totalLangValue = topLangs.reduce((sum, [, v]) => sum + v, 0) || 1;

  return (
    <section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <h2
        className="mb-6 text-xl font-[var(--pf-heading-weight)] sm:text-2xl"
        style={{ fontFamily: 'var(--pf-heading-font)', color: 'var(--pf-primary)' }}
      >
        GitHub
      </h2>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {github.totalStars != null && (
          <div className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-3 text-center" style={{ boxShadow: 'var(--pf-shadow)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--pf-accent)' }}>{github.totalStars}</p>
            <p className="text-xs text-[var(--pf-text-secondary)]">Total Stars</p>
          </div>
        )}
        {repos.length > 0 && (
          <div className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-3 text-center" style={{ boxShadow: 'var(--pf-shadow)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--pf-accent)' }}>{repos.length}</p>
            <p className="text-xs text-[var(--pf-text-secondary)]">Repositories</p>
          </div>
        )}
        {github.totalContributions != null && (
          <div className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-3 text-center" style={{ boxShadow: 'var(--pf-shadow)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--pf-accent)' }}>{github.totalContributions}</p>
            <p className="text-xs text-[var(--pf-text-secondary)]">Contributions</p>
          </div>
        )}
        {topLangs.length > 0 && (
          <div className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-3 text-center" style={{ boxShadow: 'var(--pf-shadow)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--pf-accent)' }}>{topLangs.length}</p>
            <p className="text-xs text-[var(--pf-text-secondary)]">Languages</p>
          </div>
        )}
      </div>

      {/* Language bar */}
      {topLangs.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--pf-text-secondary)]">
            Top Languages
          </h3>
          <div className="flex h-3 overflow-hidden rounded-full">
            {topLangs.map(([lang, val], i) => (
              <div
                key={lang}
                className="h-full transition-all"
                style={{
                  width: `${(val / totalLangValue) * 100}%`,
                  backgroundColor: `var(--pf-accent)`,
                  opacity: 1 - i * 0.1,
                }}
                title={`${lang}: ${Math.round((val / totalLangValue) * 100)}%`}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {topLangs.map(([lang, val]) => (
              <span key={lang} className="text-xs text-[var(--pf-text-secondary)]">
                {lang} <span className="font-medium">{Math.round((val / totalLangValue) * 100)}%</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top Repos */}
      {repos.length > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--pf-text-secondary)]">
            Top Repositories
          </h3>
          <div className="grid gap-3 sm:grid-cols-2" style={{ gap: 'var(--pf-card-gap)' }}>
            {repos.slice(0, 6).map((repo, i) => (
              <a
                key={repo.name ?? i}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-4 transition-colors hover:border-[var(--pf-accent)]"
                style={{ boxShadow: 'var(--pf-shadow)' }}
              >
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="font-semibold group-hover:text-[var(--pf-accent)] transition-colors" style={{ fontFamily: 'var(--pf-heading-font)' }}>
                    {repo.name}
                  </h4>
                  <span className="text-xs text-[var(--pf-text-secondary)]">
                    ⭐ {repo.stars ?? 0}
                  </span>
                </div>
                <p className="text-sm text-[var(--pf-text-secondary)] line-clamp-2">{repo.description || 'No description'}</p>
                {repo.language && (
                  <span className="mt-2 inline-block rounded-full border border-[var(--pf-border)] px-2 py-0.5 text-xs">
                    {repo.language}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
