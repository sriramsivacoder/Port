import { InlineEditable } from '@/components/common/InlineEditable';
function SectionHeading({ title }) {
    return (<h2 className="mb-6 text-2xl font-[var(--pf-heading-weight)]" style={{ fontFamily: 'var(--pf-heading-font)', color: 'var(--pf-primary)' }}>
      {title}
    </h2>);
}
export function AboutSection({ content, editable, onContentChange }) {
    const about = content.about ?? { heading: 'About Me', paragraphs: [] };
    return (<section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <InlineEditable as="h2" value={about.heading} onChange={(heading) => onContentChange?.({ about: { ...about, heading } })} disabled={!editable} className="mb-6 text-2xl font-[var(--pf-heading-weight)] text-[var(--pf-primary)]"/>
      <div className="space-y-4 text-[var(--pf-text-secondary)]">
        {(about.paragraphs ?? []).map((para, i) => (<InlineEditable key={i} as="p" value={para} onChange={(text) => {
                const paragraphs = [...about.paragraphs];
                paragraphs[i] = text;
                onContentChange?.({ about: { ...about, paragraphs } });
            }} disabled={!editable} multiline/>))}
      </div>
      {about.highlights && about.highlights.length > 0 && (<ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {about.highlights.map((item, i) => (<li key={i} className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] px-4 py-2 text-sm" style={{ boxShadow: 'var(--pf-shadow)' }}>
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
      <div className="grid gap-6" style={{ gap: 'var(--pf-card-gap)' }}>
        {skills.map((cat, ci) => (<div key={cat.id ?? ci}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--pf-text-secondary)]">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, si) => (<span key={si} className="rounded-full border border-[var(--pf-border)] bg-[var(--pf-surface)] px-3 py-1 text-sm" style={{ boxShadow: 'var(--pf-shadow)' }}>
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
      <div className="space-y-6" style={{ gap: 'var(--pf-card-gap)' }}>
        {experience.map((exp) => (<div key={exp.id} className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-6" style={{ boxShadow: 'var(--pf-shadow)' }}>
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold" style={{ fontFamily: 'var(--pf-heading-font)' }}>
                {exp.position}
              </h3>
              <span className="text-sm text-[var(--pf-text-secondary)]">
                {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            <p className="mb-3 text-sm font-medium text-[var(--pf-accent)]">{exp.company}</p>
            <p className="text-[var(--pf-text-secondary)]">{exp.description}</p>
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
      <div className="grid gap-4 sm:grid-cols-2" style={{ gap: 'var(--pf-card-gap)' }}>
        {projects.map((project) => (<div key={project.id} className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-5" style={{ boxShadow: 'var(--pf-shadow)' }}>
            <h3 className="mb-2 font-semibold" style={{ fontFamily: 'var(--pf-heading-font)' }}>
              {project.title}
            </h3>
            <p className="mb-3 text-sm text-[var(--pf-text-secondary)]">{project.description}</p>
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
      <div className="space-y-4">
        {education.map((edu) => (<div key={edu.id} className="flex flex-wrap justify-between gap-2 border-b border-[var(--pf-border)] pb-4 last:border-0">
            <div>
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-sm text-[var(--pf-accent)]">{edu.institution}</p>
            </div>
            <span className="text-sm text-[var(--pf-text-secondary)]">
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
      <div className="grid gap-3 sm:grid-cols-2">
        {certifications.map((cert) => (<div key={cert.id} className="rounded-[var(--pf-radius)] border border-[var(--pf-border)] px-4 py-3">
            <h3 className="font-medium">{cert.name}</h3>
            <p className="text-sm text-[var(--pf-text-secondary)]">{cert.issuer}</p>
          </div>))}
      </div>
    </section>);
}
export function ContactSection({ content }) {
    const contact = content.contact ?? {};
    const items = [
        { label: 'Email', value: contact.email },
        { label: 'Phone', value: contact.phone },
        { label: 'Location', value: contact.location },
        { label: 'Website', value: contact.website },
        { label: 'GitHub', value: contact.github },
        { label: 'LinkedIn', value: contact.linkedin },
    ].filter((i) => i.value);
    return (<section className="border-t border-[var(--pf-border)] py-[var(--pf-section-padding)]">
      <SectionHeading title="Contact"/>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (<div key={item.label} className="rounded-[var(--pf-radius)] bg-[var(--pf-surface)] px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-[var(--pf-text-secondary)]">{item.label}</p>
            <p className="mt-1 font-medium">{item.value}</p>
          </div>))}
      </div>
    </section>);
}
