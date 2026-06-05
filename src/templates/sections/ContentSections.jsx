import { InlineEditable } from '@/components/common/InlineEditable';
function SectionHeading({ title }) {
    return (<h2 className="mb-6 text-xl font-[var(--pf-heading-weight)] sm:text-2xl" style={{ fontFamily: 'var(--pf-heading-font)', color: 'var(--pf-primary)' }}>
      {title}
    </h2>);
}
export function AboutSection({ content, editable, onContentChange }) {
    const about = content.about ?? { heading: 'About Me', paragraphs: [] };
    return (<section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <InlineEditable as="h2" value={about.heading} onChange={(heading) => onContentChange?.({ about: { ...about, heading } })} disabled={!editable} className="mb-4 text-xl font-[var(--pf-heading-weight)] text-[var(--pf-primary)] sm:mb-6 sm:text-2xl"/>
      <div className="space-y-3 text-[var(--pf-text-secondary)] sm:space-y-4">
        {(about.paragraphs ?? []).map((para, i) => (<InlineEditable key={i} as="p" value={para} onChange={(text) => {
                const paragraphs = [...about.paragraphs];
                paragraphs[i] = text;
                onContentChange?.({ about: { ...about, paragraphs } });
            }} disabled={!editable} multiline/>))}
      </div>
      {about.highlights && about.highlights.length > 0 && (<ul className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-2">
          {about.highlights.map((item, i) => (<li key={i} className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] px-3 py-2 text-sm sm:px-4" style={{ boxShadow: 'var(--pf-shadow)' }}>
              {item}
            </li>))}
        </ul>)}
    </section>);
}
export function SkillsSection({ content }) {
    const skills = Array.isArray(content.skills) ? content.skills : [];
    if (!skills.length)
        return null;
    return (<section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <SectionHeading title="Skills"/>
      <div className="grid gap-4 sm:gap-6" style={{ gap: 'var(--pf-card-gap)' }}>
        {skills.map((cat, ci) => (<div key={cat.id ?? ci}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--pf-text-secondary)] sm:mb-3">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {cat.skills.map((skill, si) => (<span key={si} className="rounded-full border border-[var(--pf-border)] bg-[var(--pf-surface)] px-2.5 py-1 text-xs sm:px-3 sm:text-sm" style={{ boxShadow: 'var(--pf-shadow)' }}>
                  {skill}
                </span>))}
            </div>
          </div>))}
      </div>
    </section>);
}
export function ExperienceSection({ content }) {
    const experience = Array.isArray(content.experience) ? content.experience : [];
    if (!experience.length)
        return null;
    return (<section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <SectionHeading title="Experience"/>
      <div className="space-y-4 sm:space-y-6" style={{ gap: 'var(--pf-card-gap)' }}>
        {experience.map((exp) => (<div key={exp.id} className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-4 sm:p-6" style={{ boxShadow: 'var(--pf-shadow)' }}>
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-2">
              <h3 className="font-semibold" style={{ fontFamily: 'var(--pf-heading-font)' }}>
                {exp.position}
              </h3>
              <span className="text-xs text-[var(--pf-text-secondary)] sm:text-sm">
                {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            <p className="mb-2 text-sm font-medium text-[var(--pf-accent)] sm:mb-3">{exp.company}</p>
            <p className="text-sm text-[var(--pf-text-secondary)] sm:text-base">{exp.description}</p>
            {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech, ti) => (
                        <span key={ti} className="rounded-full border border-[var(--pf-border)] bg-[var(--pf-surface)] px-2 py-0.5 text-xs" style={{ boxShadow: 'var(--pf-shadow)' }}>
                            {tech}
                        </span>
                    ))}
                </div>
            )}
          </div>))}
      </div>
    </section>);
}
export function ProjectsSection({ content }) {
    const projects = Array.isArray(content.projects) ? content.projects : [];
    if (!projects.length)
        return null;
    return (<section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <SectionHeading title="Projects"/>
      {/* Single column on mobile, 2 columns at sm (640px+) */}
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4" style={{ gap: 'var(--pf-card-gap)' }}>
        {projects.map((project) => (<div key={project.id} className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-4 sm:p-5" style={{ boxShadow: 'var(--pf-shadow)' }}>
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-snug" style={{ fontFamily: 'var(--pf-heading-font)' }}>
                {project.title}
              </h3>
              <div className="flex shrink-0 gap-1">
                {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--pf-accent)] underline hover:opacity-80">
                        Live
                    </a>
                )}
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--pf-text-secondary)] underline hover:opacity-80">
                        GitHub
                    </a>
                )}
              </div>
            </div>
            <p className="text-sm text-[var(--pf-text-secondary)]">{project.description}</p>
            {project.technologies && project.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, ti) => (
                        <span key={ti} className="rounded-full border border-[var(--pf-border)] px-2 py-0.5 text-xs">
                            {tech}
                        </span>
                    ))}
                </div>
            )}
          </div>))}
      </div>
    </section>);
}
export function EducationSection({ content }) {
    const education = Array.isArray(content.education) ? content.education : [];
    if (!education.length)
        return null;
    return (<section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <SectionHeading title="Education"/>
      <div className="space-y-3 sm:space-y-4">
        {education.map((edu) => (<div key={edu.id} className="flex flex-col gap-1 border-b border-[var(--pf-border)] pb-3 last:border-0 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-2 sm:pb-4">
            <div>
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-sm text-[var(--pf-accent)]">{edu.institution}</p>
              {edu.field && <p className="text-xs text-[var(--pf-text-secondary)]">{edu.field}</p>}
            </div>
            <span className="text-xs text-[var(--pf-text-secondary)] sm:text-sm">
              {edu.startDate} — {edu.endDate}
            </span>
          </div>))}
      </div>
    </section>);
}
export function CertificationsSection({ content }) {
    const certifications = Array.isArray(content.certifications) ? content.certifications : [];
    if (certifications.length === 0)
        return null;
    return (<section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <SectionHeading title="Certifications"/>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
        {certifications.map((cert) => (<div key={cert.id} className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] px-3 py-2.5 sm:px-4 sm:py-3">
            <h3 className="text-sm font-medium sm:text-base">{cert.name}</h3>
            <p className="text-xs text-[var(--pf-text-secondary)] sm:text-sm">{cert.issuer}</p>
            {cert.date && <p className="mt-0.5 text-xs text-[var(--pf-text-secondary)]">{cert.date}</p>}
            {cert.url && (
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-[var(--pf-accent)] underline hover:opacity-80">
                    View credential
                </a>
            )}
          </div>))}
      </div>
    </section>);
}

function makeLink(label, value) {
    // Determine href based on label type
    if (!value) return null;
    let href = value;
    if (label === 'Email') href = `mailto:${value}`;
    else if (label === 'Phone') href = `tel:${value}`;
    else if (!value.startsWith('http')) href = `https://${value}`;
    return { href, label, value };
}

export function ContactSection({ content }) {
    const contact = content.contact ?? {};
    const rawItems = [
        { label: 'Email', value: contact.email },
        { label: 'Phone', value: contact.phone },
        { label: 'Location', value: contact.location },
        { label: 'Website', value: contact.website },
        { label: 'GitHub', value: contact.github },
        { label: 'LinkedIn', value: contact.linkedin },
    ].filter((i) => i.value);
    return (<section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <SectionHeading title="Contact"/>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
        {rawItems.map((item) => {
            const link = makeLink(item.label, item.value);
            return (
                <div key={item.label} className="rounded-[var(--pf-radius)] bg-[var(--pf-surface)] px-3 py-2.5 sm:px-4 sm:py-3">
                    <p className="text-xs uppercase tracking-wide text-[var(--pf-text-secondary)]">{item.label}</p>
                    {link && item.label !== 'Location' ? (
                        <a href={link.href} target={item.label === 'Email' || item.label === 'Phone' ? '_self' : '_blank'} rel="noopener noreferrer" className="mt-1 block truncate text-sm font-medium hover:text-[var(--pf-accent)] hover:underline transition-colors sm:text-base">
                            {item.value}
                        </a>
                    ) : (
                        <p className="mt-1 truncate text-sm font-medium sm:text-base">{item.value}</p>
                    )}
                </div>
            );
        })}
      </div>
    </section>);
}
